import asyncio
from playwright.async_api import async_playwright
TARGETS = [("hero", None), ("def", "#def"), ("build", ".s-build"), ("gallery", ".s-gallery"), ("card", ".s-card"), ("names", ".s-names"), ("amigos", ".s-amigos"), ("hours", ".s-hours"), ("visit", ".s-visit"), ("end", ".s-end")]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":390,"height":844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        await pg.goto("file:///home/user/index.html")
        await pg.wait_for_function("!document.querySelector('.intro')", timeout=15000)
        await pg.wait_for_timeout(600)
        for name, sel in TARGETS:
            if sel:
                await pg.evaluate("(sel)=>{const e=document.querySelector(sel); const r=e.getBoundingClientRect(); window.scrollTo(0, r.top+window.scrollY-60);}", sel)
                await pg.wait_for_timeout(800)
            await pg.screenshot(path=f"/home/user/shots/m-{name}.png")
        await b.close()
asyncio.run(main())
