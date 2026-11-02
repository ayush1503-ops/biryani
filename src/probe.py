import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w,h in [(390,844),(768,1024),(1440,900)]:
            pg = await b.new_page(viewport={"width":w,"height":h})
            errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto("file:///home/user/index.html"); await pg.wait_for_timeout(3800)
            sw, iw = await pg.evaluate("[document.documentElement.scrollWidth, window.innerWidth]")
            lh = await pg.evaluate("document.querySelector('.topbar__logo').getBoundingClientRect().width")
            print(f"{w}x{h} scrollWidth={sw} innerWidth={iw} overflow={'YES' if sw>iw+1 else 'no'} errors={errs[:2]}")
            await pg.close()
        # reduced motion + keyboard focus
        ctx = await b.new_context(viewport={"width":1440,"height":900}, reduced_motion="reduce")
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("file:///home/user/index.html"); await pg.wait_for_timeout(2500)
        await pg.screenshot(path="/home/user/shots/final-reduced.png")
        print("reduced-motion errors:", errs[:3])
        await b.close()
asyncio.run(main())
