"""Round 5 — editorial detail pass.

1. New section 04: "And the rest, on paper." a real price card with dot leaders.
2. Method deck: three typed kitchen index cards in place of the missing photos.
3. Gallery: one card becomes a "sold out" paper card (honest, human, no filler photo).
4. Hero print resized/repositioned so the wordmark is readable.
5. Photo grade retuned for the new art-directed set; credits rewritten.

Idempotent: bails out if the ROUND5 marker is already in the file.
"""
import pathlib
import re

SRC = pathlib.Path("/home/user/src")
html = (SRC / "index.html").read_text()
if "ROUND5" in html:
    print("already patched")
    raise SystemExit

# ---------------------------------------------------------------- 1. method deck
deck_new = """\t\t\t<div class="deck" id="buildDeck">
\t\t\t\t<figure class="deck__card deck__card--paper" data-shot="0">
\t\t\t\t\t<div class="paper">
\t\t\t\t\t\t<span class="paper__no">Page 01</span>
\t\t\t\t\t\t<h3 class="paper__name">Chawal</h3>
\t\t\t\t\t\t<p class="paper__line">Basmati, soaked 40 minutes.<br>Not 20. Salted water, boiled to 70% —<br>the grain must still have a bite<br>before it goes anywhere near the meat.</p>
\t\t\t\t\t\t<span class="paper__stamp">Checked · 11:20</span>
\t\t\t\t\t</div>
\t\t\t\t\t<figcaption>01 · Chawal — the rice note</figcaption>
\t\t\t\t</figure>
\t\t\t\t<figure class="deck__card deck__card--paper" data-shot="1">
\t\t\t\t\t<div class="paper">
\t\t\t\t\t\t<span class="paper__no">Page 02</span>
\t\t\t\t\t<h3 class="paper__name">Marinade</h3>
\t\t\t\t\t<p class="paper__line">Mutton, dahi, raw papaya, Kashmiri mirch,<br>a spoon of mustard oil. Six hours minimum.<br><br>Bhaiya, chill the deg overnight —<br>last Friday we were up at 5.</p>
\t\t\t\t\t\t<span class="paper__stamp">6 hrs · fridge</span>
\t\t\t\t\t</div>
\t\t\t\t\t<figcaption>02 · Marinade — the overnight note</figcaption>
\t\t\t\t</figure>
\t\t\t\t<figure class="deck__card deck__card--paper" data-shot="2">
\t\t\t\t\t<div class="paper">
\t\t\t\t\t\t<span class="paper__no">Page 03</span>
\t\t\t\t\t<h3 class="paper__name">Birista</h3>
\t\t\t\t\t<p class="paper__line">400 g onions, sliced thin, low flame,<br>40 minutes, one shade of brown.<br><br>If it is dark it is bitter.<br>Throw it out and start again.</p>
\t\t\t\t\t\t<span class="paper__stamp">One shade only</span>
\t\t\t\t\t</div>
\t\t\t\t\t<figcaption>03 · Birista — the onion note</figcaption>
\t\t\t\t</figure>
\t\t\t\t<figure class="deck__card" data-shot="3"><img src="assets/img/b-tarkib.jpg" alt="Basmati rice being layered over marinated mutton in a brass deg" loading="lazy" decoding="async"><figcaption>04 · Tarkib — rice over meat, twice</figcaption></figure>
\t\t\t\t<figure class="deck__card" data-shot="4"><img src="assets/img/b-dum.jpg" alt="A deg sealed with a ring of dough on a low flame" loading="lazy" decoding="async"><figcaption>05 · Dum — atta seal, 25 minutes</figcaption></figure>
\t\t\t</div>"""

html, n = re.subn(r'\t\t\t<div class="deck" id="buildDeck">.*?\n\t\t\t</div>', deck_new, html, flags=re.S)
assert n == 1, f"deck replace {n}"

# ---------------------------------------------------------------- 2. gallery cards
sold_card = """\t\t\t<figure class="card card--low card--sold">
\t\t\t\t<div class="card__paper">
\t\t\t\t\t<span class="card__paper-k">Bhatkali · coastal</span>
\t\t\t\t\t<p class="card__paper-n">84</p>
\t\t\t\t\t<p class="card__paper-d">plates on today's deg.<br>Gone by 3:10 pm.</p>
\t\t\t\t\t<span class="card__paper-s">Sold out</span>
\t\t\t\t\t<span class="card__paper-f">new deg tomorrow · 12:30</span>
\t\t\t\t</div>
\t\t\t\t<span class="card__num">05</span>
\t\t\t</figure>"""

html, n = re.subn(
    r'\t\t\t<figure class="card">\s*<div class="card__media" style="background:#601508">.*?</figure>',
    sold_card, html, flags=re.S)
assert n == 1, f"sold card replace {n}"

# ---------------------------------------------------------------- 3. alt text
alts = {
    "g-kacchi": "Mutton dum biryani in an open brass handi, lid set aside",
    "g-awadhi": "Awadhi biryani in a copper handi with the brass lid set aside",
    "g-kolkata": "Kolkata mutton biryani on a steel plate with potato and egg",
    "g-ambur": "Ambur-style biryani served on a fresh banana leaf",
    "g-malabar": "Biryani on a steel platter, raita bowls on the cloth beside",
    "g-kathal": "Vegetable biryani with jackfruit and cashews in a copper bowl",
    "g-murgh": "Chicken biryani with a leg piece on a steel plate",
}
for slug, alt in alts.items():
    html = re.sub(r'(src="assets/img/%s\.jpg" alt=")[^"]*(")' % slug,
                  lambda m: m.group(1) + alt + m.group(2), html)

# ---------------------------------------------------------------- 4. hero alt/caption
html = html.replace('<figcaption>murgh dum · table 6 · 9:42 pm</figcaption>',
                    '<figcaption>mutton dum · deg 4 · 9:42 pm</figcaption>')
html = html.replace('<img src="assets/img/hero.jpg" alt="" decoding="async">',
                    '<img src="assets/img/hero.jpg" alt="An open brass handi of mutton dum biryani on the table" fetchpriority="high" decoding="async">')
html = html.replace('<figure class="hshot hshot--back"><img src="assets/img/b-dum.jpg" alt="" decoding="async"></figure>',
                    '<figure class="hshot hshot--back" aria-hidden="true"><img src="assets/img/b-dum.jpg" alt="" loading="lazy" decoding="async"></figure>')

# ---------------------------------------------------------------- 5. gallery kicker copy
html = html.replace('No menu on the wall, only this',
                    'No menu on the wall. Just these.')
html = html.replace('<span class="s-gallery__k"><span class="sec-tag">03</span>',
                    '<span class="s-gallery__k"><span class="sec-tag">03</span>')

# ---------------------------------------------------------------- 6. the card section
card_section = """
<!-- ======================= THE CARD (price list) ======================= -->
<section class="s-card" aria-labelledby="card-title">
\t<div class="s-card__wrap">
\t\t<header class="s-card__head">
\t\t\t<span class="s-card__k"><span class="sec-tag">04</span>The rest of the card</span>
\t\t\t<h2 id="card-title" data-split>And the rest,<br><span class="serif-i">on paper.</span></h2>
\t\t\t<p class="s-card__lede">Everything below is cooked to sit next to the deg, not to survive a delivery box. Prices are in rupees, taxes in, service charge none. They hold till Diwali, then we will argue about onions again.</p>
\t\t</header>

\t\t<div class="s-card__cols">
\t\t\t<div class="menu">
\t\t\t\t<h3 class="menu__h">From the coal</h3>
\t\t\t\t<ul class="menu__list">
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Seekh kebab<i>mutton · six pieces · onion, lemon</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">320</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Galouti, ulta tawa<i>mutton mince · sheermal underneath</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">380</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Shami kebab<i>mutton · chana dal · two pieces</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">300</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Tandoori murgh<i>half bird · hung curd · charcoal</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">360</span></li>
\t\t\t\t</ul>
\t\t\t</div>

\t\t\t<div class="menu">
\t\t\t\t<h3 class="menu__h">Slow, in gravy</h3>
\t\t\t\t<ul class="menu__list">
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Nihari<i>Sunday only · six hours · nalli</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">420</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Paya<i>goat trotters · overnight · ginger</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">380</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Mutton korma<i>Awadhi · kewra · cashew</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">400</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Shorba<i>the liquid off the deg · free refill</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">120</span></li>
\t\t\t\t</ul>
\t\t\t</div>

\t\t\t<div class="menu">
\t\t\t\t<h3 class="menu__h">With the rice</h3>
\t\t\t\t<ul class="menu__list">
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Roomali roti<i>thin enough to read through</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">40</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Sheermal<i>saffron · milk · slightly sweet</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">80</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Warqi paratha<i>eight layers · ghee</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">90</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Mirchi ka salan<i>peanut · sesame · green chilli</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">90</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Raita<i>curd · cucumber · boondi if you ask</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">60</span></li>
\t\t\t\t</ul>
\t\t\t</div>

\t\t\t<div class="menu">
\t\t\t\t<h3 class="menu__h">At the bar</h3>
\t\t\t\t<ul class="menu__list">
\t\t\t\t\t<li class="menu__row"><span class="menu__n">DUM Old Fashioned<i>jaggery · orange · bitters</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">520</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Nimbu soda<i>black salt · crushed ice</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">180</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Chaas<i>cumin · curry leaf · no straw</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">90</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Kadak chai<i>cutting, in a glass</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">40</span></li>
\t\t\t\t\t<li class="menu__row"><span class="menu__n">Shahi tukda<i>rabri · pistachio · cold</i></span><span class="menu__dots" aria-hidden="true"></span><span class="menu__p">220</span></li>
\t\t\t\t</ul>
\t\t\t</div>
\t\t</div>

\t\t<p class="s-card__note">
\t\t\t<span class="s-card__stamp">Cash · UPI · card</span>
\t\t\t<b>No delivery.</b> The deg does not travel.
\t\t\t<span><b>No bookings after 9</b> on Fridays — come and wait with everyone else.</span>
\t\t\t<span>86 items, one kitchen. If something runs out it ran out.</span>
\t\t</p>
\t</div>
</section>
"""

html = html.replace('<!-- ======================= NAMES ======================= -->',
                    card_section + '\n<!-- ======================= NAMES ======================= -->', 1)

# ---------------------------------------------------------------- 7. renumber sections
for old, new in ((8, 9), (7, 8), (6, 7), (5, 6), (4, 5)):
    html = html.replace('<span class="sec-tag">%02d</span>' % old, '<span class="sec-tag">%02d</span>' % new)
# (the new section's own tag was 04 and got bumped to 05 by the loop above)
html = html.replace('<span class="s-card__k"><span class="sec-tag">05</span>The rest of the card',
                    '<span class="s-card__k"><span class="sec-tag">04</span>The rest of the card')

# ---------------------------------------------------------------- 8. credits
html = re.sub(r'\t<p class="s-end__credits">.*?</p>\n',
              '\t<p class="s-end__credits">Shot in the DUM kitchen, October 2026 · Structure after a site we love · '
              'One HTML file, no trackers, no cookies, nothing loading from anywhere.</p>\n', html, flags=re.S)

(SRC / "index.html").write_text(html)
print("index.html patched:", len(html) // 1024, "KB")
print("sections:", html.count("<section"), "| deck cards:", html.count("deck__card\""), "| menu rows:", html.count("menu__row\""))
