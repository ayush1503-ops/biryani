import random, math

def blob(cx, cy, rx, ry, rnd, jitter=0.2, n=8):
    pts=[]
    for i in range(n):
        a = 2*math.pi*i/n
        rj = 1 + rnd.uniform(-jitter, jitter)
        pts.append((cx + math.cos(a)*rx*rj, cy + math.sin(a)*ry*rj))
    d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(n):
        p0=pts[(i-1)%n]; p1=pts[i]; p2=pts[(i+1)%n]; p3=pts[(i+2)%n]
        c1=(p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6)
        c2=(p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6)
        d += f"C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
    return d+"Z"

def leaf(cx, cy, L, W, rot, fill):
    return (f'<path transform="translate({cx:.1f},{cy:.1f}) rotate({rot:.0f})" fill="{fill}" '
            f'd="M0,{-L/2:.1f} C{W*.62:.1f},{-L*.22:.1f} {W*.5:.1f},{L*.22:.1f} 0,{L/2:.1f} '
            f'C{-W*.5:.1f},{L*.22:.1f} {-W*.62:.1f},{-L*.22:.1f} 0,{-L/2:.1f}Z"/>')

RICE = {
    "white":   (["#FDFAF0","#F7EFD8","#EADCB6","#FFFDF7","#E1D2A6"], "#EFE3C0"),
    "saffron": (["#F8D071","#F2B63F","#FBE7B4","#E79E2B","#FFF0C8"], "#F4CE72"),
    "mixed":   (["#FDFAF0","#F7EFD8","#F6C757","#E9A02F","#FFFDF7","#E4D6AC"], "#F0DCA8"),
    "red":     (["#EBD8AE","#E3BE79","#D07E42","#C75B2A","#F2E4C2"], "#E7C88E"),
    "cream":   (["#FEFCF4","#F8F0D8","#EDDFBE","#FFFEFA","#E3D4AC"], "#F4EBCF"),
}
DISHES = [
    dict(id="kacchi", rice="mixed", prot="#6B2A13", prot2="#8F4420", dark="#3E1508", fib="#A85C31", saffron=1.0,
         onion=1.0, egg=False, potato=False, cashew=.5, chilli=2, mint=1.0, seed=11),
    dict(id="awadhi", rice="cream", prot="#753414", prot2="#9B4C21", dark="#421A0A", fib="#B36A3A", saffron=.55,
         onion=1.0, egg=False, potato=False, cashew=1.0, chilli=0, mint=1.0, seed=23),
    dict(id="kolkata", rice="white", prot="#5E260F", prot2="#833A19", dark="#37130A", fib="#9C5A32", saffron=.45,
         onion=.8, egg=True, potato=True, cashew=.4, chilli=1, mint=.7, seed=37),
    dict(id="ambur", rice="red", prot="#4F1E0B", prot2="#722A11", dark="#301006", fib="#8C4423", saffron=.85,
         onion=1.0, egg=False, potato=False, cashew=.3, chilli=3, mint=.8, seed=51),
    dict(id="bhatkali", rice="red", prot="#59220D", prot2="#7C3314", dark="#331107", fib="#984C26", saffron=.7,
         onion=1.0, egg=False, potato=False, cashew=.6, chilli=2, mint=1.0, seed=67),
    dict(id="malabar", rice="saffron", prot="#7A3613", prot2="#9C4E1E", dark="#451B09", fib="#B4703C", saffron=1.0,
         onion=1.0, egg=False, potato=False, cashew=1.0, chilli=1, mint=1.0, seed=83),
    dict(id="kathal", rice="saffron", prot="#B96C14", prot2="#D89A34", dark="#7A420A", fib="#EFC173", saffron=.8,
         onion=1.0, egg=False, potato=True, cashew=1.0, chilli=1, mint=1.2, seed=97),
    dict(id="murgh", rice="mixed", prot="#84421A", prot2="#A85C28", dark="#4C2109", fib="#C07C42", saffron=.9,
         onion=1.0, egg=False, potato=False, cashew=.7, chilli=2, mint=1.0, seed=113),
]

CX, CY, RX, RY = 160, 158, 138, 106

def dish_svg(d, plate=True):
    rnd = random.Random(d["seed"])
    pal, base = RICE[d["rice"]]
    o = []
    # --- plate ---
    if plate:
        o.append(f'<ellipse cx="{CX}" cy="{CY+9}" rx="{RX+16}" ry="{RY+15}" fill="rgba(28,8,4,.18)"/>')
        o.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{RX+13}" ry="{RY+12}" fill="#F2ECDA"/>')
        o.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{RX+13}" ry="{RY+12}" fill="none" stroke="#CFC3A2" stroke-width="1.6"/>')
        o.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{RX+4}" ry="{RY+3}" fill="#FBF7EC"/>')
    # rim ticks
    for i in (range(52) if plate else []):
        a = 2*math.pi*i/52
        x1 = CX + math.cos(a)*(RX+7); y1 = CY + math.sin(a)*(RY+6)
        x2 = CX + math.cos(a)*(RX+11); y2 = CY + math.sin(a)*(RY+10)
        o.append(f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" stroke="#DACDAB" stroke-width="2.2" stroke-linecap="round"/>')
    # --- rice mound ---
    o.append(f'<path d="{blob(CX, CY, RX-14, RY-14, random.Random(d["seed"]+5), .035, 10)}" fill="{base}"/>')
    o.append(f'<path d="{blob(CX-6, CY+8, RX-26, RY-30, random.Random(d["seed"]+6), .05, 9)}" fill="#000" opacity=".07"/>')
    o.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{RX-14}" ry="{RY-14}" fill="none" stroke="rgba(120,90,40,.22)" stroke-width="4"/>')
    # saffron patches
    for i in range(7):
        a = rnd.uniform(0, 2*math.pi); r = math.sqrt(rnd.uniform(0, 1)) * .82
        x = CX + math.cos(a)*(RX-34)*r; y = CY + math.sin(a)*(RY-30)*r
        o.append(f'<path d="{blob(x, y, rnd.uniform(16,30), rnd.uniform(10,18), rnd, .22, 7)}" fill="#F5B93F" opacity="{rnd.uniform(.28,.5):.2f}"/>')
    # --- grains ---
    for i in range(430):
        a = rnd.uniform(0, 2*math.pi); r = math.sqrt(rnd.uniform(0, 1))
        x = CX + math.cos(a)*(RX-22)*r; y = CY + math.sin(a)*(RY-22)*r
        # grains near edges are less visible (depth)
        L = rnd.uniform(4.6, 8.4); W = rnd.uniform(1.9, 3.0)
        o.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{L/2:.1f}" ry="{W/2:.1f}" fill="{rnd.choice(pal)}" transform="rotate({rnd.uniform(0,180):.0f} {x:.1f} {y:.1f})"/>')
    # --- protein ---
    nprot = 4
    for i in range(nprot):
        a = 2*math.pi*i/nprot + rnd.uniform(-.3,.3)
        r = rnd.uniform(.62, .92)
        x = CX + math.cos(a)*(RX-56)*r; y = CY + math.sin(a)*(RY-50)*r
        rx = rnd.uniform(25, 34); ry = rnd.uniform(18, 25)
        base = blob(x, y+4, rx, ry, rnd, .18, 10)
        o.append(f'<path d="{base}" fill="rgba(28,8,4,.3)"/>')
        o.append(f'<path d="{blob(x, y, rx, ry, rnd, .2, 10)}" fill="{d["prot"]}" stroke="{d["dark"]}" stroke-width="1.3" opacity=".98"/>')
        o.append(f'<path d="{blob(x-rx*.1, y-ry*.24, rx*.72, ry*.52, rnd, .26, 8)}" fill="{d["prot2"]}"/>')
        for k in range(9):
            fx = x + rnd.uniform(-rx*.62, rx*.62); fy = y + rnd.uniform(-ry*.55, ry*.55)
            o.append(f'<path d="M{fx:.1f},{fy:.1f} q{rnd.uniform(3,7):.1f},{rnd.uniform(-4,4):.1f} {rnd.uniform(7,15):.1f},{rnd.uniform(-5,5):.1f}" fill="none" stroke="{rnd.choice([d["fib"], d["dark"]])}" stroke-width="{rnd.uniform(1.2,2.1):.1f}" stroke-linecap="round" opacity=".55"/>')
        # crevice + sheen
        o.append(f'<path d="M{x-rx*.4:.1f},{y+ry*.1:.1f} q{rx*.4:.1f},{ry*.34:.1f} {rx*.8:.1f},{ry*.02:.1f}" fill="none" stroke="{d["dark"]}" stroke-width="1.8" stroke-linecap="round" opacity=".45"/>')
        o.append(f'<ellipse cx="{x-rx*.3:.1f}" cy="{y-ry*.35:.1f}" rx="{rx*.3:.1f}" ry="{ry*.16:.1f}" fill="#FFF1C8" opacity=".13" transform="rotate(-18 {x-rx*.3:.1f} {y-ry*.35:.1f})"/>')
    # small shredded bits
    for i in range(9):
        a = rnd.uniform(0,2*math.pi); r = rnd.uniform(.3,.95)
        x = CX + math.cos(a)*(RX-30)*r; y = CY + math.sin(a)*(RY-26)*r
        o.append(f'<path d="{blob(x,y,rnd.uniform(6,11),rnd.uniform(4,7),rnd,.3,7)}" fill="{rnd.choice([d["prot"],d["prot2"]])}" opacity=".9"/>')
    # --- potato / egg ---
    if d["potato"]:
        for i in range(3):
            a = rnd.uniform(0,2*math.pi); r = rnd.uniform(.45,.78)
            x = CX + math.cos(a)*(RX-58)*r; y = CY + math.sin(a)*(RY-52)*r
            s = rnd.uniform(15,19)
            o.append(f'<path d="{blob(x,y+2,s,s*.78,rnd,.12,7)}" fill="rgba(28,8,4,.25)"/>')
            o.append(f'<path d="{blob(x,y,s,s*.78,rnd,.12,7)}" fill="#E8B24A"/>')
            o.append(f'<path d="{blob(x-s*.15,y-s*.2,s*.5,s*.34,rnd,.2,6)}" fill="#F5CF7C"/>')
    if d["egg"]:
        for i in range(2):
            a = -0.5 + i*1.9
            x = CX + math.cos(a)*78; y = CY + math.sin(a)*62
            o.append(f'<ellipse cx="{x:.0f}" cy="{y+3:.0f}" rx="22" ry="18" fill="rgba(28,8,4,.25)"/>')
            o.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="22" ry="18" fill="#FDFBF3" stroke="#DCD0AE" stroke-width="1.4"/>')
            o.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="12.5" ry="10" fill="#FEB914"/>')
            o.append(f'<ellipse cx="{x-3:.0f}" cy="{y-3:.0f}" rx="5" ry="3.4" fill="#FFD75E" opacity=".8"/>')
    # --- fried onion (birista) ---
    for i in range(int(56 * d["onion"])):
        a = rnd.uniform(0,2*math.pi); r = math.sqrt(rnd.uniform(0,1))
        x = CX + math.cos(a)*(RX-24)*r; y = CY + math.sin(a)*(RY-24)*r
        L = rnd.uniform(6,15)
        o.append(f'<path d="M{x:.0f},{y:.0f} q{L/2:.1f},{-L*.55:.1f} {L:.1f},{rnd.uniform(-3,3):.1f}" fill="none" stroke="{rnd.choice(["#C25A10","#A8480B","#DE7C1F","#8E3A08"])}" stroke-width="{rnd.uniform(1.7,2.6):.1f}" stroke-linecap="round" opacity=".8"/>')
    # --- nuts & raisins ---
    for i in range(int(11*d["cashew"])):
        a = rnd.uniform(0,2*math.pi); r = rnd.uniform(.28,.92)
        x = CX + math.cos(a)*(RX-30)*r; y = CY + math.sin(a)*(RY-26)*r
        o.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="7.5" ry="4.8" fill="#F5E2B6" stroke="#D9BE85" stroke-width="1" transform="rotate({rnd.uniform(0,180):.0f} {x:.0f} {y:.0f})"/>')
    for i in range(7):
        a = rnd.uniform(0,2*math.pi); r = rnd.uniform(.3,.9)
        x = CX + math.cos(a)*(RX-32)*r; y = CY + math.sin(a)*(RY-28)*r
        o.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="4.6" ry="3.8" fill="#3E150C"/>')
    # --- saffron strands ---
    for i in range(int(34*d["saffron"])):
        a = rnd.uniform(0,2*math.pi); r = math.sqrt(rnd.uniform(0,1))*.92
        x = CX + math.cos(a)*(RX-30)*r; y = CY + math.sin(a)*(RY-26)*r
        o.append(f'<path d="M{x:.0f},{y:.0f} q{rnd.uniform(-7,7):.1f},{rnd.uniform(-7,7):.1f} {rnd.uniform(-11,11):.1f},{rnd.uniform(-9,9):.1f}" fill="none" stroke="{rnd.choice(["#F03812","#FF6A2E"])}" stroke-width="{rnd.uniform(1.1,1.9):.1f}" stroke-linecap="round" opacity=".92"/>')
    # --- herbs ---
    for i in range(int(7*d["mint"])):
        a = rnd.uniform(0,2*math.pi); r = rnd.uniform(.36,.94)
        x = CX + math.cos(a)*(RX-34)*r; y = CY + math.sin(a)*(RY-30)*r
        L = rnd.uniform(16,24); rot = rnd.uniform(0,180); g = rnd.choice(["#2E8C64","#256F51","#3AA077"])
        o.append(leaf(x,y,L,L*.52,rot,g))
        o.append(f'<path d="M0,{-L/2:.1f} L0,{L/2:.1f}" stroke="rgba(12,60,44,.45)" stroke-width="1.1" transform="translate({x:.1f},{y:.1f}) rotate({rot:.0f})"/>')
    for i in range(22):
        a = rnd.uniform(0,2*math.pi); r = rnd.uniform(.28,.96)
        x = CX + math.cos(a)*(RX-30)*r; y = CY + math.sin(a)*(RY-26)*r
        o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.uniform(1.3,2.6):.1f}" fill="{rnd.choice(["#2E8C64","#256F51"])}" opacity=".85"/>')
    # --- green chilli: tapered, with stem ---
    for i in range(d["chilli"]):
        a = rnd.uniform(0,2*math.pi)
        x = CX + math.cos(a)*(RX-30); y = CY + math.sin(a)*(RY-26)
        rot = rnd.uniform(0,360)
        o.append(f'<g transform="translate({x:.0f},{y:.0f}) rotate({rot:.0f})">'
                 f'<path d="M0,-5 C13,-6 24,4 30,18 C22,14 12,9 0,5 Z" fill="#2F7D33"/>'
                 f'<path d="M0,-5 C10,-5 20,2 26,12" fill="none" stroke="#5CA85C" stroke-width="1.6" opacity=".7"/>'
                 f'<path d="M0,-5 q-6,-1 -8,-8" fill="none" stroke="#3F6B2A" stroke-width="2.4" stroke-linecap="round"/></g>')
    # --- lemon wedge + raita, on the rim ---
    if not plate:
        return "".join(o)
    lx, ly = CX + RX - 16, CY + RY - 4
    seg = "".join(f'<line x1="0" y1="0" x2="{math.cos(math.pi + math.pi*i/5)*19:.1f}" y2="{math.sin(math.pi + math.pi*i/5)*19:.1f}" stroke="#FFF6D8" stroke-width="1.5"/>' for i in range(1,5))
    o.append(f'<g transform="translate({lx:.0f},{ly:.0f}) rotate(-24)"><path d="M-21,0 A21,21 0 0 1 21,0 Z" fill="#FEB914" stroke="#D99A0A" stroke-width="1.5"/>{seg}</g>')
    bx, by = CX - RX - 2, CY + RY - 6
    o.append((f'<g><ellipse cx="{bx:.0f}" cy="{by+4:.0f}" rx="31" ry="25" fill="rgba(28,8,4,.22)"/>'
              f'<ellipse cx="{bx:.0f}" cy="{by:.0f}" rx="29" ry="23" fill="#EFE9D6"/>'
              f'<ellipse cx="{bx:.0f}" cy="{by-1:.0f}" rx="23" ry="18" fill="#FDFBF3"/>'
              f'<ellipse cx="{bx:.0f}" cy="{by:.0f}" rx="29" ry="23" fill="none" stroke="#CFC3A2" stroke-width="1.4"/>'
              + leaf(bx-4,by-2,10,5.4,-30,"#2C9FA2")
              + f'<circle cx="{bx+8:.0f}" cy="{by+4:.0f}" r="1.7" fill="#F03812"/>'
              f'<circle cx="{bx-10:.0f}" cy="{by+6:.0f}" r="1.5" fill="#F03812"/></g>'))
    return "".join(o)

sprite = ['<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">']
for d in DISHES:
    sprite.append(f'<symbol id="dish-{d["id"]}" viewBox="0 0 320 320">{dish_svg(d)}</symbol>')
sprite.append('<symbol id="degfill" viewBox="60 20 200 200">' + dish_svg(DISHES[0], plate=False) + '</symbol>')
sprite.append('</svg>')
open("assets/plates.svg","w").write("\n".join(sprite))
print("plates ok", sum(len(x) for x in sprite)//1024, "KB")
