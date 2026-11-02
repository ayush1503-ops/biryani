import sys, asyncio
from playwright.async_api import async_playwright
async def main(url, out, w=1440, h=900, scroll="0", clip=None):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":int(w),"height":int(h)})
        await pg.goto(url)
        try:
            await pg.wait_for_function("!document.querySelector('.intro')", timeout=15000)
        except Exception as e:
            print("intro still present:", e)
        await pg.wait_for_timeout(400)
        s = float(scroll)
        if s:
            await pg.evaluate(f"window.scrollTo(0,{s})")
            await pg.wait_for_timeout(900)
        await pg.screenshot(path=out)
        await b.close()
asyncio.run(main(*sys.argv[1:]))
