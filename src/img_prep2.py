"""Round 6: crops for the photographs that fill the empty bands."""
import pathlib
from PIL import Image, ImageEnhance, ImageOps

RAW = pathlib.Path("/home/user/assets/raw")
OUT = pathlib.Path("/home/user/assets/img")

def make(src, size, name, focus=0.5, contrast=1.04, color=1.0, q=80):
    im = Image.open(RAW / src).convert("RGB")
    im = ImageOps.fit(im, size, method=Image.LANCZOS, centering=(focus, 0.5))
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Color(im).enhance(color)
    im.save(OUT / name, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {name:16s} {size[0]}x{size[1]}  {(OUT / name).stat().st_size // 1024} KB")

make("hands-seal.jpg", (900, 1200), "k-seal.jpg", contrast=1.06)
make("chef-fire.jpg", (900, 1200), "k-lid.jpg", contrast=1.05)
make("saffron.jpg", (900, 900), "k-saffron.jpg", contrast=1.04, color=1.04)
make("pass.jpg", (1200, 800), "k-pass.jpg", contrast=1.05)
make("lane.jpg", (1200, 800), "k-lane.jpg", contrast=1.02, color=1.08)
