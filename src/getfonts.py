import re, base64, urllib.request, os, json
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=40).read().decode()

queries = {
 "fraunces": "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900&display=swap",
 "archivo": "https://fonts.googleapis.com/css2?family=Archivo:wght@400..900&display=swap",
 "barlow": "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap",
 "kalam": "https://fonts.googleapis.com/css2?family=Kalam:wght@400&display=swap",
 "deva": "https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@700&text=%E0%A4%A6%E0%A4%AE%E0%A4%AC%E0%A4%BF%E0%A4%B0%E0%A4%AF%E0%A4%BE%E0%A4%A8%E0%A5%80%E0%A4%B9%E0%A4%82%E0%A4%A1%E0%A5%80",
}
out = []
total = 0
for name, url in queries.items():
    css = fetch(url)
    blocks = re.findall(r"@font-face\s*\{(.*?)\}", css, re.S)
    for b in blocks:
        if "unicode-range" in b and "U+0000-00FF" not in b and name != "deva":
            continue  # keep latin only
        src = re.search(r"url\((https://[^)]+\.woff2)\)", b)
        if not src: continue
        data = urllib.request.urlopen(urllib.request.Request(src.group(1), headers={"User-Agent": UA}), timeout=60).read()
        total += len(data)
        family = re.search(r"font-family:\s*'([^']+)'", b).group(1)
        style = re.search(r"font-style:\s*([^;]+);", b)
        weight = re.search(r"font-weight:\s*([^;]+);", b)
        ur = re.search(r"unicode-range:\s*([^;]+);", b)
        b64 = base64.b64encode(data).decode()
        out.append("@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:%s;src:url(data:font/woff2;base64,%s) format('woff2');%s}" % (
            family, style.group(1).strip() if style else "normal", weight.group(1).strip() if weight else "400",
            "swap", b64, ("unicode-range:%s;" % ur.group(1).strip()) if ur else ""))
        print(name, family, weight.group(1) if weight else "?", round(len(data)/1024), "KB")
open("fonts.css","w").write("\n".join(out))
print("TOTAL", round(total/1024), "KB -> fonts.css", round(os.path.getsize("fonts.css")/1024), "KB")
