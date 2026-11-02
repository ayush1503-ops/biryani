"""Round 7: (1) new own-brand palette (deg green + turmeric + chili on atta paper),
(2) night photography in the hours + visit dead bands. Bails if already applied."""
import json
import pathlib

ROOT = pathlib.Path("/home/user")
SRC = ROOT / "src"
RAW = ROOT / "assets" / "raw"
OUT = ROOT / "assets" / "img"

IDX = SRC / "index.html"
if "<!-- ROUND7 -->" in IDX.read_text():
    print("ROUND7 already applied, bailing")
    raise SystemExit

# ---------------------------------------------------------------- images ---
from PIL import Image, ImageEnhance, ImageOps  # noqa: E402

def prep_chowk():
    im = Image.open(RAW / "u-chowk.jpg").convert("RGB")
    g = im.convert("L")
    w, h = im.size
    top, bot = 0, h
    for y in range(h):  # find letterbox bars
        if sum(g.crop((0, y, w, y + 1)).getdata()) / w > 12:
            top = y
            break
    for y in range(h - 1, -1, -1):
        if sum(g.crop((0, y, w, y + 1)).getdata()) / w > 12:
            bot = y + 1
            break
    print(f"  chowk bars: top={top} bottom={h - bot}")
    im = im.crop((0, top + 6, w, bot - 6))
    im = ImageOps.fit(im, (1200, 880), method=Image.LANCZOS, centering=(0.5, 0.55))
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.02)
    r, g_, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.04)))
    im = Image.merge("RGB", (r, g_, b))
    im.save(OUT / "k-chowk.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    print(f"  k-chowk.jpg {(OUT / 'k-chowk.jpg').stat().st_size // 1024} KB")

def prep_jama():
    im = Image.open(RAW / "u-jama.jpg").convert("RGB")
    im = ImageOps.fit(im, (900, 1200), method=Image.LANCZOS, centering=(0.5, 0.5))
    im = ImageEnhance.Brightness(im).enhance(1.07)
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im.save(OUT / "k-jama.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    print(f"  k-jama.jpg {(OUT / 'k-jama.jpg').stat().st_size // 1024} KB")

prep_chowk()
prep_jama()

# ---------------------------------------------------------------- recolor --
CSS = SRC / "styles.css"
css = CSS.read_text()
if not (SRC / "styles.css.r6bak").exists():
    (SRC / "styles.css.r6bak").write_text(css)

HEX = {  # old -> new (nothing on the right may equal an old key)
    "#B21236": "#1F4A38", "#8A0E2A": "#143325",
    "#EFEFE3": "#F6EDD8", "#EDEAE0": "#EBDCBC",
    "#FEB914": "#E8A013", "#FFD75E": "#F7CE5B",
    "#FE8826": "#DE6A1F", "#F03812": "#C03A17", "#A8320B": "#8C2A10",
    "#7C1820": "#5C2A15", "#1E7073": "#14655A", "#601508": "#33200F",
    "#EDE6D2": "#E7DAB6", "#1a0c08": "#101F18", "#2a120c": "#12291F",
    "#f7f2e4": "#FAF3DE", "#fbf7ec": "#FDF8E9",
    "#f2ebd8": "#F0E2C2", "#efe7d2": "#EAD9B4",
    "#2C9FA2": "#17806F", "#1F7D80": "#14655A", "#C9600F": "#8C2A10",
    "#F7F2E2": "#FCF5E3",
}
RGB = {
    "178, 18, 54": "31, 74, 56", "254, 185, 20": "232, 160, 19",
    "239, 239, 227": "246, 237, 216", "254, 136, 38": "222, 106, 31",
    "60, 8, 20": "26, 16, 10", "96, 21, 8": "51, 32, 15",
    "124, 24, 32": "92, 42, 21", "20, 60, 60": "10, 52, 46",
    "16, 54, 54": "8, 46, 40", "60, 20, 8": "46, 28, 12",
    "120, 78, 26": "146, 98, 18", "237, 230, 210": "231, 218, 182",
}
n = 0
for old, new in {**HEX, **RGB}.items():
    c = css.count(old)
    n += c
    css = css.replace(old, new)
print(f"  styles.css: {n} color replacements")

ROUND7_CSS = """
/* ==========================================================================
   ROUND 7 — night prints in the hours + visit dead bands
   ========================================================================== */
.s-hours__plate {
\tposition: absolute; right: var(--gutter); bottom: clamp(30px, 4vw, 58px);
\twidth: clamp(230px, 23vw, 340px); z-index: 5; transform: rotate(2.6deg);
}
.s-visit__plate {
\tposition: absolute; right: var(--gutter); bottom: clamp(34px, 4vw, 64px);
\twidth: clamp(190px, 18vw, 260px); z-index: 5; transform: rotate(-2.4deg);
}
@media (max-width: 1080px) {
\t.s-hours__plate, .s-visit__plate {
\t\tposition: relative; right: auto; bottom: auto;
\t\twidth: min(70vw, 330px); margin: 26px auto 0;
\t}
}
"""
if "ROUND 7" not in css:
    css = css.rstrip() + "\n" + ROUND7_CSS
CSS.write_text(css)

# ------------------------------------------------------------------ markup -
html = IDX.read_text()
for old, new in HEX.items():
    html = html.replace(old, new)
html = html.replace("%23B21236", "%23143325").replace("%23FEB914", "%23E8A013").replace("%23EFEFE3", "%23F6EDD8")
# compass pin on the map reads better in chili than in deep green
html = html.replace('<path d="M0-18 5 4 0-1-5 4Z" fill="#1F4A38"/>',
                    '<path d="M0-18 5 4 0-1-5 4Z" fill="#C03A17"/>')

HOURS_PRINT = """<!-- ROUND7 -->
\t\t<figure class="print s-hours__plate" data-tilt="1">
\t\t\t<img src="assets/img/k-chowk.jpg" alt="Chandni Chowk at night, all lit up" loading="lazy" decoding="async">
\t\t\t<figcaption>23:40 · the chowk, still awake</figcaption>
\t\t</figure>
"""
anchor = '\t<div class="s-hours__sign">'
assert html.count(anchor) == 1
html = html.replace(anchor, HOURS_PRINT + anchor)

VISIT_PRINT = """\t\t<figure class="print s-visit__plate" data-tilt="1">
\t\t\t<img src="assets/img/k-jama.jpg" alt="Jama Masjid lit up at night" loading="lazy" decoding="async">
\t\t\t<figcaption>pados · follow the minarets</figcaption>
\t\t</figure>

"""
anchor2 = "</section>\n\n</main>"
assert html.count(anchor2) == 1
html = html.replace(anchor2, VISIT_PRINT + anchor2)

old_cred = "nothing loading from anywhere."
assert html.count(old_cred) == 1
html = html.replace(old_cred, old_cred + " Two night frames: Stuti B, Striving tranquil (CC&nbsp;BY-SA, Wikimedia Commons).")
IDX.write_text(html)
print("  index.html: recolored + 2 prints + credit line")

# ---------------------------------------------------------------------- js -
JS = SRC / "app.js"
js = JS.read_text()
assert js.count("'#B21236'") == 1
JS.write_text(js.replace("'#B21236'", "'#C03A17'"))
print("  app.js: POI hover -> chili")

# ---------------------------------------------------------------- credits --
credits = [
    {"file": "k-chowk.jpg", "title": "Chandni Chowk", "author": "Stuti B",
     "license": "CC BY 3.0", "source": "https://commons.wikimedia.org/wiki/File:Chandni_Chowk_(93969355).jpeg"},
    {"file": "k-jama.jpg", "title": "Jama Masjid, Old Delhi, Delhi", "author": "Striving tranquil",
     "license": "CC BY-SA 4.0", "source": "https://commons.wikimedia.org/wiki/File:Jama_Masjid,_Old_Delhi,_Delhi.jpg"},
]
(ROOT / "assets" / "credits.json").write_text(json.dumps(credits, indent=2))
(SRC / "credits.json").write_text(json.dumps(credits, indent=2))
print("  credits.json: 2 entries")

print("ROUND7 done")
