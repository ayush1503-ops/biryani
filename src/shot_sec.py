import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    sel, off, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto("file:///home/user/index.html"); await pg.wait_for_timeout(3200)
        await pg.evaluate("(s)=>document.querySelector(s).scrollIntoView()", sel)
        await pg.wait_for_timeout(1200)
        await pg.evaluate("(a)=>{const r=document.querySelector(a[0]).getBoundingClientRect(); scrollBy(0, r.top+a[1]);}", [sel, off])
        await pg.wait_for_timeout(1600)
        await pg.screenshot(path=f"/home/user/shots/{out}.png")
        print(out, await pg.evaluate("Math.round(scrollY)"))
        await b.close()
asyncio.run(main())
