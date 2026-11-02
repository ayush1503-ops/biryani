"""Round 5: turn the art-directed masters in assets/raw into the site's photo set.

One look for everything: same warm-shadow grade, same crop ratios, no filters
that scream "generated". Masters are only touched once, at build-prep time.
"""
import json
import pathlib

from PIL import Image, ImageEnhance

RAW = pathlib.Path("/home/user/assets/raw")
OUT = pathlib.Path("/home/user/assets/img")
OUT.mkdir(parents=True, exist_ok=True)


def crop(src, box, size):
    im = Image.open(RAW / src).convert("RGB")
    if box:
        im = im.crop(box)
    im = im.resize(size, Image.LANCZOS)
    return im


def grade(im, contrast=1.05, color=0.97, warm=1.0):
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Color(im).enhance(color)
    if warm != 1.0:
        r, g, b = im.split()
        r = r.point(lambda v: min(255, int(v * warm)))
        im = Image.merge("RGB", (r, g, b))
    return im


def save(im, name, q=80):
    im = grade(im)
    im.save(OUT / name, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {name:18s} {im.size[0]}x{im.size[1]}  {(OUT / name).stat().st_size // 1024} KB")


print("building photo set ->", OUT)

# --- hero: the opened deg, sealed deg behind it -------------------------------
save(crop("hero.jpg", (0, 0, 1536, 1024), (1500, 1000)), "hero.jpg")
save(crop("seal.jpg", (60, 0, 1476, 944), (1200, 800)), "b-dum.jpg")
save(crop("layers.jpg", (60, 10, 1476, 954), (1200, 800)), "b-tarkib.jpg")

# --- dastarkhwan + chai ------------------------------------------------------
save(crop("table.jpg", None, (1500, 1000)), "table.jpg")
save(crop("chai.jpg", (60, 0, 1476, 944), (1200, 800)), "chai.jpg")

# --- hours disc: a plate, dead-on, because it spins --------------------------
save(crop("table.jpg", (420, 20, 1020, 620), (860, 860)), "disc.jpg")

# --- the eight plates: uniform 4:5 ------------------------------------------
save(crop("hero.jpg", (300, 90, 1180, 1190), (900, 1125)), "g-kacchi.jpg")
save(crop("awadhi.jpg", (60, 40, 1080, 1315), (900, 1125)), "g-awadhi.jpg")
save(crop("kolkata.jpg", (60, 40, 1080, 1315), (900, 1125)), "g-kolkata.jpg")
save(crop("ambur.jpg", (60, 40, 1080, 1315), (900, 1125)), "g-ambur.jpg")
save(crop("veg.jpg", (40, 20, 1000, 1220), (900, 1125)), "g-kathal.jpg")
# three plates lifted straight out of the dastarkhwan frame
save(crop("table.jpg", (930, 220, 1530, 970), (900, 1125)), "g-bhatkali.jpg")
save(crop("table.jpg", (450, 0, 1050, 750), (900, 1125)), "g-malabar.jpg")
save(crop("table.jpg", (470, 274, 1070, 1024), (900, 1125)), "g-murgh.jpg")

# --- retire the mid-quality stand-ins ---------------------------------------
for dead in ("b-chawal.jpg", "b-marinade.jpg", "b-birista.jpg"):
    p = OUT / dead
    if p.exists():
        p.unlink()
        print("  removed", dead)

total = sum(p.stat().st_size for p in OUT.glob("*.jpg"))
print(f"total {total // 1024} KB across {len(list(OUT.glob('*.jpg')))} files")

# --- credits: the last set was Wikimedia; this one is not --------------------
(OUT.parent / "credits.json").write_text(json.dumps([], indent=2))
old = pathlib.Path("/home/user/src/credits.json")
if old.exists():
    old.write_text("[]\n")
