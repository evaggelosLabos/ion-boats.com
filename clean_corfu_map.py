import cv2
import numpy as np
from PIL import Image

INPUT = "corfu_raw.png"
OUTPUT = "corfu-map.webp"

# ---------- LOAD ----------
img = cv2.imread(INPUT)

# ---------- STEP 1: DETECT LABELS ----------
# Detect bright text (Google labels are light)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# threshold for bright text
_, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)

# expand mask slightly so full labels covered
kernel = np.ones((5,5), np.uint8)
mask = cv2.dilate(mask, kernel, iterations=2)

# ---------- STEP 2: INPAINT ----------
clean = cv2.inpaint(img, mask, 5, cv2.INPAINT_TELEA)

# ---------- STEP 3: CROP TO 16:9 ----------
h, w = clean.shape[:2]
target_ratio = 16/9

if w/h > target_ratio:
    new_w = int(h * target_ratio)
    x = (w - new_w)//2
    clean = clean[:, x:x+new_w]
else:
    new_h = int(w / target_ratio)
    y = (h - new_h)//2
    clean = clean[y:y+new_h, :]

# ---------- STEP 4: SAVE WEBP ----------
rgb = cv2.cvtColor(clean, cv2.COLOR_BGR2RGB)
Image.fromarray(rgb).save(OUTPUT, "WEBP", quality=85)

print("DONE →", OUTPUT)
