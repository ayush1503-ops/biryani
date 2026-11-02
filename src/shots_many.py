import asyncio
from playwright.async_api import async_playwright
TARGETS = [
 ("def", "#def", "0"),
 ("build1", "#buildPin", "0.15"),
 ("build2", "#buildPin", "0.5"),
 ("build3", "#buildPin", "0.95"),
 ("gallery1", "#galleryPin", "0.0"),
 ("gallery2", "#galleryPin", "0.65"),
 ("names", "#names-title", "0"),
 ("amigos", "#amigos-title", "0"),
 ("hours", "#hours-title", "0"),
 ("visit", "#visit-title", "0"),
 ("map", ".vmap", "0"),
 ("end", ".s-end__big", "0"),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("file:///home/user/index.html")
        await pg.wait_for_function("!document.querySelector('.intro')", timeout=15000)
        await pg.wait_for_timeout(500)
        for name, sel, frac in TARGETS:
            info = await pg.evaluate("""([sel, frac]) => {
              const el = document.querySelector(sel);
              if (!el) return null;
              const sec = el.closest('section') || el.parentElement;
              const r = el.getBoundingClientRect();
              let top = r.top + window.scrollY;
              let target = top - 80;
              if (frac !== "0") {
                // pinned wrapper: use parent section
                const wrap = sel === '#buildPin' ? document.querySelector('.s-build') : document.querySelector('.s-gallery');
                const wr = wrap.getBoundingClientRect();
                const topAbs = wr.top + window.scrollY;
                target = topAbs + (wr.height - window.innerHeight) * parseFloat(frac);
              }
              window.scrollTo(0, Math.max(0, target));
              return Math.round(target);
            }""", [sel, frac])
            await pg.wait_for_timeout(700)
            await pg.screenshot(path=f"/home/user/shots/{name}.png")
            print(name, info)
        await b.close()
asyncio.run(main())
