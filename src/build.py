import pathlib
src = pathlib.Path(".")
html = (src/"index.html").read_text()
html = html.replace("/*FONTS*/", (src/"fonts.css").read_text())
html = html.replace("/*CSS*/", (src/"styles.css").read_text())
html = html.replace("<!--SPRITE-->", "")
gsap = (src/"vendor/gsap.min.js").read_text() if (src/"vendor/gsap.min.js").exists() else ""
st = (src/"vendor/ScrollTrigger.min.js").read_text() if (src/"vendor/ScrollTrigger.min.js").exists() else ""
app = (src/"app.js").read_text()
js = "<script>\n" + gsap + "\n</script><script>\n" + st + "\n</script><script>\n" + app + "\n</script>"
html = html.replace("<script>/*JS*/</script>", js)
html = html.replace("</head>", "<script>document.documentElement.classList.add('js');</script>\n</head>")
out = pathlib.Path("/home/user/index.html")
out.write_text(html)
print("built", round(len(html)/1024), "KB ->", out, "| gsap:", bool(gsap), "| st:", bool(st))
