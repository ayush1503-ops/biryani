import re,json
h=open("index.bak.html").read()
def cut(h,start_marker):
    s=h.index(start_marker); depth=0
    for m in re.finditer(r"<div\b|</div>",h[s:]):
        depth+= 1 if m.group()=="<div" else -1
        if depth==0: return s,s+m.end()
s,e=cut(h,'<div class="deg-scene" id="degScene"')
h=h[:s]+'''<div class="deg-scene" id="degScene" aria-hidden="true">
			<div class="deg-scene__inner" id="degInner">
				<div class="deg-scene__shadow"></div>
				<figure class="hshot hshot--back"><img src="assets/img/b-dum.jpg" alt="" decoding="async"></figure>
				<figure class="hshot hshot--main"><img src="assets/img/hero.jpg" alt="" decoding="async"><figcaption>murgh dum · table 6 · 9:42 pm</figcaption></figure>
			</div>
		</div>'''+h[e:]
h=re.sub(r'\s*<svg class="plate-illu plate-illu--[ab]"[^>]*><use href="#dish-\w+"/></svg>','',h)
alts={"kacchi":"Hyderabadi kacchi biryani on a white plate","awadhi":"Biryani in a copper handi with the lid set aside","kolkata":"Kolkata mutton biryani with potato and egg","ambur":"Ambur mutton biryani on a banana leaf","bhatkali":"Close-up of chicken biryani","malabar":"Thalassery biryani on a steel platter","kathal":"Saffron vegetable biryani","murgh":"Bengali-style chicken biryani with a leg piece"}
h=re.sub(r'<div class="card__plate"><svg viewBox="0 0 320 320"><use href="#dish-(\w+)"/></svg></div>',lambda m:f'<img class="card__img" src="assets/img/g-{m.group(1)}.jpg" alt="{alts[m.group(1)]}" loading="lazy" decoding="async">',h)
s,e=cut(h,'<div class="build-scene"')
shots=[("chawal","Saffron and white basmati, layered"),("marinade","Masala going into the pot"),("birista","Birista on top, mint and coriander"),("tarkib","The layers, steaming"),("dum","The seal comes off at the table")]
cards="\n".join(f'\t\t\t\t<figure class="deck__card" data-shot="{i}"><img src="assets/img/b-{n}.jpg" alt="{a}" loading="lazy" decoding="async"><figcaption>0{i+1} · {a}</figcaption></figure>' for i,(n,a) in enumerate(shots))
h=h[:s]+f'<div class="build-scene">\n\t\t\t<div class="deck" id="buildDeck">\n{cards}\n\t\t\t</div>\n\t\t</div>'+h[e:]
h=re.sub(r'\s*<svg class="build-arrow" id="buildArrow".*?</svg>','',h,flags=re.S)
h=re.sub(r'\s*<p class="build-label" id="buildLabel">.*?</p>','',h,flags=re.S)
s,e=cut(h,'<div class="duo__illustration"')
h=h[:s]+'<div class="duo__illustration duo__photo"><img src="assets/img/table.jpg" alt="A home table with mutton biryani, potato and chicken kosha" loading="lazy" decoding="async"></div>'+h[e:]
s,e=cut(h,'<div class="pola__illu"')
h=h[:s]+'<div class="pola__illu pola__photo"><img src="assets/img/chai.jpg" alt="A chaiwala pouring masala chai in Old Delhi" loading="lazy" decoding="async"></div>'+h[e:]
s,e=cut(h,'<div class="disc-wrap"')
h=h[:s]+'<div class="disc-wrap" aria-hidden="true">\n\t\t\t<div class="disc disc--photo">\n\t\t\t\t<div class="disc__face"><img src="assets/img/disc.jpg" alt="" loading="lazy" decoding="async"></div>\n\t\t\t</div>\n\t\t</div>'+h[e:]
cr=json.load(open("credits.json")); seen=set(); items=[]
for n,a,l,u in cr:
    if u in seen: continue
    seen.add(u); items.append(f'<a href="{u}" target="_blank" rel="noopener">{a or "Wikimedia"}</a> ({l})')
h=h.replace("</footer>",f'\t<p class="s-end__credits">Photos: Wikimedia Commons — {", ".join(items)}. Stand-ins until the house shoot.</p>\n</footer>',1)
open("index.html","w").write(h)
print(h.count("<div"),h.count("</div>"))
