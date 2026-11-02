import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    name, y = sys.argv[1], int(sys.argv[2])
    w = int(sys.argv[3]) if len(sys.argv)>3 else 1440
    h = int(sys.argv[4]) if len(sys.argv)>4 else 900
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":w,"height":h})
        errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("file:///home/user/index.html"); await pg.wait_for_timeout(4200)
        await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=f"/home/user/shots/{name}.png")
        print(name, "errors:", errs[:3])
        await b.close()
asyncio.run(main())
