
	/* ==================================================================
	   ROUND 5 — paper detail: print reveals, menu stagger, magnetics,
	   and a refresh once the real photographs have decoded.
	   ================================================================== */
	(function () {
		if (!hasGsap) return;

		/* --- picture framerate: layout depends on image height, so refresh --- */
		if (hasST) {
			var pending = 0, timer = null;
			var later = function () {
				clearTimeout(timer);
				timer = setTimeout(function () { ScrollTrigger.refresh(); }, 180);
			};
			$$('img').forEach(function (img) {
				if (img.complete) return;
				pending++;
				img.addEventListener('load', function () {
					if (--pending <= 0) later();
				}, { once: true });
			});
			window.addEventListener('load', function () { setTimeout(function () { ScrollTrigger.refresh(); }, 60); });
			if (document.fonts && document.fonts.ready) document.fonts.ready.then(later);
		}

		if (!animate) return;

		/* --- photographs uncover like a print coming up in the tray --- */
		if (hasST) {
			$$('.duo__photo, .pola__photo').forEach(function (frame) {
				var img = $('img', frame);
				gsap.fromTo(frame,
					{ clipPath: 'inset(0% 0% 100% 0%)' },
					{
						clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'power3.inOut',
						scrollTrigger: { trigger: frame, start: 'top 84%', once: true }
					});
				if (img) gsap.fromTo(img,
					{ scale: 1.16, yPercent: -4 },
					{
						scale: 1.02, yPercent: 0, duration: 1.7, ease: 'power3.out',
						scrollTrigger: { trigger: frame, start: 'top 84%', once: true }
					});
			});

			/* slow drift on the same prints, so the page never sits still */
			$$('.duo__photo img, .pola__photo img').forEach(function (img) {
				gsap.fromTo(img, { yPercent: -2.5 }, {
					yPercent: 2.5, ease: 'none',
					scrollTrigger: { trigger: img.closest('section') || img, start: 'top bottom', end: 'bottom top', scrub: true }
				});
			});

			/* --- the price card: rows set down one column at a time --- */
			$$('.menu').forEach(function (col) {
				var rows = $$('.menu__row', col);
				if (!rows.length) return;
				gsap.from(rows, {
					y: 16, opacity: 0, duration: .55, ease: 'power2.out', stagger: .055,
					scrollTrigger: { trigger: col, start: 'top 88%', once: true }
				});
				gsap.from($('.menu__h', col), {
					y: 10, opacity: 0, duration: .5, ease: 'power2.out',
					scrollTrigger: { trigger: col, start: 'top 92%', once: true }
				});
			});
		}

		/* --- magnetic CTAs: the button leans toward the cursor, then lets go --- */
		if (fine) {
			$$('.topbar__link, .s-hero__scroll').forEach(function (el) {
				var xTo = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' });
				var yTo = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3.out' });
				el.addEventListener('pointermove', function (e) {
					var r = el.getBoundingClientRect();
					xTo((e.clientX - (r.left + r.width / 2)) * .22);
					yTo((e.clientY - (r.top + r.height / 2)) * .3);
				});
				el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
			});
		}

		/* --- paper cards get a hair of independent tilt while pinned --- */
		var papers = $$('.deck__card--paper .paper');
		if (papers.length && fine) {
			window.addEventListener('pointermove', function (e) {
				var dx = (e.clientX / window.innerWidth - .5), dy = (e.clientY / window.innerHeight - .5);
				papers.forEach(function (p, i) {
					gsap.to(p, {
						x: dx * (6 + i * 2), y: dy * (5 + i * 2),
						rotate: dx * 1.2, duration: .8, ease: 'power2.out', overwrite: true
					});
				});
			});
		}
	})();
