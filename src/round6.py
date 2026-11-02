"""Round 6 — photography in the empty bands.

1. Method scene: a taped print in the dead space top-right ("11:40 · the seal goes on").
2. Between the plates and the price card: a contact-sheet strip of the day on the pass.
3. Dastarkhwan: a print beside the headline ("pass karo").

Idempotent: bails if ROUND6 is already in the file.
"""
import pathlib

SRC = pathlib.Path("/home/user/src")
html = (SRC / "index.html").read_text()
if "ROUND6" in html:
    print("already patched")
    raise SystemExit

# ---------------------------------------------------------------- 1. method print
build_plate = """<!-- ROUND6 -->
\t\t<figure class="print s-build__plate" data-tilt="1">
\t\t\t<img src="assets/img/k-seal.jpg" alt="Hands pressing a rope of dough onto the rim of a deg to seal it" loading="lazy" decoding="async">
\t\t\t<figcaption>11:40 · the seal goes on</figcaption>
\t\t</figure>

\t\t<div class="s-build__progress" aria-hidden="true">"""
assert '\t\t<div class="s-build__progress" aria-hidden="true">' in html
html = html.replace('\t\t<div class="s-build__progress" aria-hidden="true">', build_plate, 1)

# ---------------------------------------------------------------- 2. contact strip
strip = """\t<div class="s-card__wrap">
\t\t<div class="strip" aria-label="The day, on the pass">
\t\t\t<p class="strip__k"><span>On the pass</span> <span class="strip__rule" aria-hidden="true"></span> <span>Tuesday, before service</span></p>
\t\t\t<div class="strip__row">
\t\t\t\t<figure class="strip__shot" data-reveal>
\t\t\t\t\t<img src="assets/img/k-lid.jpg" alt="A cook lifting the brass lid off a steaming deg on a low flame" loading="lazy" decoding="async">
\t\t\t\t\t<figcaption>12:24 · lid off, first look</figcaption>
\t\t\t\t</figure>
\t\t\t\t<figure class="strip__shot" data-reveal>
\t\t\t\t\t<img src="assets/img/k-saffron.jpg" alt="Saffron threads blooming in warm milk beside basmati grains" loading="lazy" decoding="async">
\t\t\t\t\t<figcaption>12:06 · saffron, blooming</figcaption>
\t\t\t\t</figure>
\t\t\t\t<figure class="strip__shot" data-reveal>
\t\t\t\t\t<img src="assets/img/b-tarkib.jpg" alt="Basmati being layered over marinated mutton in a brass deg" loading="lazy" decoding="async">
\t\t\t\t\t<figcaption>12:31 · rice over meat, again</figcaption>
\t\t\t\t</figure>
\t\t\t\t<figure class="strip__shot" data-reveal>
\t\t\t\t\t<img src="assets/img/k-lane.jpg" alt="A narrow Old Delhi lane at dusk with a small restaurant glowing" loading="lazy" decoding="async">
\t\t\t\t\t<figcaption>19:40 · the lane fills up</figcaption>
\t\t\t\t</figure>
\t\t\t</div>
\t\t</div>
"""
assert '<div class="s-card__wrap">\n' in html
html = html.replace('<div class="s-card__wrap">\n', strip, 1)

# ---------------------------------------------------------------- 3. dastarkhwan print
amigos_plate = """\t\t<figure class="print s-amigos__plate" data-tilt="1">
\t\t\t<img src="assets/img/k-pass.jpg" alt="A plate of biryani being passed from one hand to another across the table" loading="lazy" decoding="async">
\t\t\t<figcaption>pass karo · don't stand on ceremony</figcaption>
\t\t</figure>
\t</header>
"""
anchor = '\t\t<h2 data-split class="s-amigos__title" id="amigos-title">Khaana <span class="serif-i">share karna</span> hota hai.</h2>\n\t</header>\n'
assert anchor in html
html = html.replace(anchor,
                    '\t\t<h2 data-split class="s-amigos__title" id="amigos-title">Khaana <span class="serif-i">share karna</span> hota hai.</h2>\n'
                    + amigos_plate, 1)

(SRC / "index.html").write_text(html)
print("index.html patched")
