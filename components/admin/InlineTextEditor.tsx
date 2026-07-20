"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type EditableTextNode = {
  node: Text;
  key: string;
  originalText: string;
  currentText: string;
};

type OverridesResponse = { ok: true; overrides: Record<string, string> } | { ok: false; error: string };

const IGNORED_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION", "NOSCRIPT"]);

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function hashText(value: string) {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

function shouldSkipNode(node: Text) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (parent.closest("[data-content-editor-ignore]")) return true;
  if (IGNORED_TAGS.has(parent.tagName)) return true;
  const text = normalizeText(node.nodeValue ?? "");
  if (text.length < 2) return true;
  if (/^[\s|•·\-–—✓]+$/.test(text)) return true;
  return false;
}

function collectTextNodes(pathname: string): EditableTextNode[] {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const counts = new Map<string, number>();
  const nodes: EditableTextNode[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (shouldSkipNode(node)) continue;

    const originalText = normalizeText((node as Text & { __ionOriginalText?: string }).__ionOriginalText ?? node.nodeValue ?? "");
    const baseKey = `${pathname}:${hashText(originalText)}`;
    const count = counts.get(baseKey) ?? 0;
    counts.set(baseKey, count + 1);

    (node as Text & { __ionOriginalText?: string; __ionContentKey?: string }).__ionOriginalText = originalText;
    (node as Text & { __ionOriginalText?: string; __ionContentKey?: string }).__ionContentKey = `${baseKey}:${count}`;

    nodes.push({
      node,
      key: `${baseKey}:${count}`,
      originalText,
      currentText: normalizeText(node.nodeValue ?? ""),
    });
  }

  return nodes;
}

function getFirstEditableTextNode(root: Node): Text | null {
  if (root.nodeType === Node.TEXT_NODE) {
    const textNode = root as Text;
    return shouldSkipNode(textNode) ? null : textNode;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    if (!shouldSkipNode(textNode)) return textNode;
  }

  return null;
}

function getClickedTextNode(event: MouseEvent, target: HTMLElement) {
  const range = document.caretRangeFromPoint?.(event.clientX, event.clientY);
  const rangeNode = range?.startContainer;
  if (rangeNode?.nodeType === Node.TEXT_NODE) {
    const textNode = rangeNode as Text;
    if (!shouldSkipNode(textNode)) return textNode;
  }

  return getFirstEditableTextNode(target);
}

export default function InlineTextEditor() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"info" | "success" | "error">("info");
  const [saving, setSaving] = useState(false);
  const [savingAction, setSavingAction] = useState<"save" | "reset" | null>(null);
  const [selected, setSelected] = useState<EditableTextNode | null>(null);
  const [draft, setDraft] = useState("");
  const overridesRef = useRef<Record<string, string>>({});
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const editModeRequested = searchParams.get("ionTextEdit") === "1";

  const applyOverrides = () => {
    const nodes = collectTextNodes(pathname);
    for (const item of nodes) {
      const override = overridesRef.current[item.key];
      if (override && item.node.nodeValue !== override) {
        item.node.nodeValue = override;
      }
    }
  };

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let cancelled = false;
    setSelected(null);
    setDraft("");
    setMessage("");
    setMessageTone("info");
    setIsAdmin(false);
    setEditing(false);

    async function boot() {
      try {
        const overrideRes = await fetch(`/api/content/overrides?path=${encodeURIComponent(pathname)}`, { cache: "no-store" });
        const overrideData = (await overrideRes.json().catch(() => ({ ok: false, error: "Could not load text edits" }))) as OverridesResponse;
        if (!cancelled && overrideData.ok) {
          overridesRef.current = overrideData.overrides;
          applyOverrides();
        }
      } catch {
        // Keep the hardcoded text if overrides cannot load.
      }

      if (editModeRequested) {
        try {
          const adminRes = await fetch("/api/admin/me", { cache: "no-store", credentials: "include" });
          if (cancelled) return;
          if (adminRes.ok) {
            setIsAdmin(true);
            setEditing(true);
          } else {
            window.location.href = `/admin/login?next=${encodeURIComponent(`${pathname}${search ? `?${search}` : ""}`)}`;
          }
        } catch {
          if (!cancelled) {
            window.location.href = `/admin/login?next=${encodeURIComponent(`${pathname}${search ? `?${search}` : ""}`)}`;
          }
        }
      }
    }

    void boot();
    const observer = new MutationObserver(() => applyOverrides());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [editModeRequested, pathname, search]);

  useEffect(() => {
    if (!editing) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("[data-content-editor-ignore]")) return;

      const textNode = getClickedTextNode(event, target);
      if (!textNode) {
        setMessage("Click directly on the text you want to edit.");
        setMessageTone("info");
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const item = collectTextNodes(pathname).find((entry) => entry.node === textNode);
      if (!item) return;

      setSelected(item);
      setDraft(normalizeText(textNode.nodeValue ?? ""));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [editing, pathname]);

  async function saveSelected() {
    if (!selected || saving) return;

    const next = draft.trim();
    if (!next) {
      setMessage("Text cannot be empty.");
      setMessageTone("error");
      return;
    }

    setSaving(true);
    setSavingAction("save");
    setMessage("Saving text...");
    setMessageTone("info");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          path: pathname,
          textKey: selected.key,
          originalText: selected.originalText,
          value: next,
        }),
      });

      if (!res.ok) {
        setMessage("Could not save text.");
        setMessageTone("error");
        return;
      }

      overridesRef.current[selected.key] = next;
      selected.node.nodeValue = next;
      setSelected(null);
      setDraft("");
      setMessage("Text saved successfully.");
      setMessageTone("success");
    } catch {
      setMessage("Could not save text.");
      setMessageTone("error");
    } finally {
      setSaving(false);
      setSavingAction(null);
    }
  }

  async function resetSelected() {
    if (!selected || saving) return;

    setSaving(true);
    setSavingAction("reset");
    setMessage("Resetting text...");
    setMessageTone("info");

    try {
      const res = await fetch(`/api/admin/content/${encodeURIComponent(selected.key)}?path=${encodeURIComponent(pathname)}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        setMessage("Could not reset text.");
        setMessageTone("error");
        return;
      }

      delete overridesRef.current[selected.key];
      selected.node.nodeValue = selected.originalText;
      setSelected(null);
      setDraft("");
      setMessage("Text reset successfully.");
      setMessageTone("success");
    } catch {
      setMessage("Could not reset text.");
      setMessageTone("error");
    } finally {
      setSaving(false);
      setSavingAction(null);
    }
  }

  if (pathname.startsWith("/admin")) return null;
  if (!editModeRequested) return null;
  if (!isAdmin) return null;

  return (
    <div data-content-editor-ignore style={barStyle}>
      <button type="button" onClick={() => setEditing((value) => !value)} style={{ ...buttonStyle, ...(editing ? activeButtonStyle : {}) }}>
        {editing ? "Text edit on" : "Edit page text"}
      </button>
      <span style={hintStyle}>{editing ? "Click any visible text to edit it." : "Admin text tools"}</span>
      {message ? <span style={{ ...messageStyle, ...(messageTone === "error" ? errorMessageStyle : messageTone === "success" ? successMessageStyle : {}) }}>{message}</span> : null}

      {selected ? (
        <div style={modalBackdropStyle}>
          <div style={modalStyle}>
            <div style={modalTitleStyle}>Edit text</div>
            <textarea value={draft} onChange={(event) => setDraft(event.currentTarget.value)} disabled={saving} style={{ ...textareaStyle, opacity: saving ? 0.72 : 1 }} rows={6} />
            <div style={modalActionsStyle}>
              <button type="button" onClick={saveSelected} disabled={saving} style={{ ...buttonStyle, ...activeButtonStyle, opacity: saving ? 0.65 : 1 }}>{savingAction === "save" ? "Saving..." : "Save"}</button>
              <button type="button" onClick={resetSelected} disabled={saving} style={{ ...buttonStyle, opacity: saving ? 0.65 : 1 }}>{savingAction === "reset" ? "Resetting..." : "Reset"}</button>
              <button type="button" onClick={() => setSelected(null)} disabled={saving} style={{ ...buttonStyle, opacity: saving ? 0.65 : 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const barStyle: React.CSSProperties = {
  position: "fixed",
  left: 16,
  bottom: 16,
  zIndex: 2147483647,
  display: "flex",
  alignItems: "center",
  gap: 10,
  maxWidth: "calc(100vw - 32px)",
  padding: 10,
  borderRadius: 14,
  background: "rgba(6,18,26,0.92)",
  color: "#fff",
  boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.14)",
  fontFamily: "var(--font-sans)",
};

const buttonStyle: React.CSSProperties = {
  height: 38,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontWeight: 900,
  padding: "0 12px",
  cursor: "pointer",
};

const activeButtonStyle: React.CSSProperties = {
  background: "rgba(98,208,255,0.24)",
  border: "1px solid rgba(98,208,255,0.5)",
};

const hintStyle: React.CSSProperties = { fontSize: 12, color: "rgba(255,255,255,0.72)" };
const messageStyle: React.CSSProperties = { fontSize: 12, color: "rgba(180,225,255,0.95)", fontWeight: 800 };
const successMessageStyle: React.CSSProperties = { color: "rgba(120,235,170,0.95)" };
const errorMessageStyle: React.CSSProperties = { color: "rgba(255,150,150,0.95)" };
const modalBackdropStyle: React.CSSProperties = { position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.38)", zIndex: 2147483647 };
const modalStyle: React.CSSProperties = { width: "min(620px, calc(100vw - 28px))", borderRadius: 16, padding: 16, background: "#071b25", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 30px 90px rgba(0,0,0,0.45)" };
const modalTitleStyle: React.CSSProperties = { fontSize: 18, fontWeight: 950, marginBottom: 10 };
const textareaStyle: React.CSSProperties = { width: "100%", borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", lineHeight: 1.5, font: "inherit" };
const modalActionsStyle: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", marginTop: 12 };
