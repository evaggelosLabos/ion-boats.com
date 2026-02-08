import cv2
import numpy as np
from PIL import Image

INPUT = "raw-image.png"
OUTPUT_WEBP = "corfu-map.webp"
OUTPUT_PNG  = "corfu-map.png"

OUT_W = 1920
OUT_H = 1080

img = cv2.imread(INPUT, cv2.IMREAD_COLOR)
if img is None:
    raise SystemExit(f"Could not read {INPUT}")

# ---- LABEL MASK ----
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, mask1 = cv2.threshold(gray, 205, 255, cv2.THRESH_BINARY)
mask2 = cv2.inRange(gray, 170, 255)
mask = cv2.bitwise_or(mask1, mask2)

mask = cv2.medianBlur(mask, 5)
kernel = np.ones((5, 5), np.uint8)
mask = cv2.dilate(mask, kernel, iterations=2)

# ---- INPAINT ----
clean = cv2.inpaint(img, mask, 5, cv2.INPAINT_TELEA)

# ---- FIT WITHOUT UPSCALING ----
h, w = clean.shape[:2]
scale = min(OUT_W / w, OUT_H / h, 1.0)  # ✅ 1.0 prevents zoom-in/upscale
new_w = int(w * scale)
new_h = int(h * scale)

resized = cv2.resize(clean, (new_w, new_h), interpolation=cv2.INTER_AREA)

# ---- SOLID BACKGROUND (NO BLUR) ----
# pick one:
# bg_color = (255,255,255)  # white
bg_color = (7, 27, 37)      # dark blue luxury
canvas = np.full((OUT_H, OUT_W, 3), bg_color, dtype=np.uint8)

# center
x = (OUT_W - new_w) // 2
y = (OUT_H - new_h) // 2
canvas[y:y + new_h, x:x + new_w] = resized

# optional thin frame
cv2.rectangle(canvas, (x-2, y-2), (x+new_w+1, y+new_h+1), (255,255,255), 1)

# ---- SAVE ----
rgb = cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB)
Image.fromarray(rgb).save(OUTPUT_WEBP, "WEBP", quality=90, method=6)
Image.fromarray(rgb).save(OUTPUT_PNG, "PNG", optimize=True)

print("DONE:")
print(" -", OUTPUT_WEBP)
print(" -", OUTPUT_PNG)
