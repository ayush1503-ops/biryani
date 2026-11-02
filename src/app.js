/* ==========================================================================
   DUM — interactions, powered by GSAP + ScrollTrigger (vendored inline).
   Real pinning, scrubbed 3D scenes, split-text reveals, steam particles.
   Everything degrades: no-JS / reduced-motion still shows full content.
   ========================================================================== */
(function () {
	'use strict';

	var root = document.documentElement;
	var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
	var lerp = function (a, b, t) { return a + (b - a) * t; };
	var $ = function (s, c) { return (c || document).querySelector(s); };
	var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
	var hasGsap = typeof window.gsap !== 'undefined';
	var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
	var animate = hasGsap && !reduced;

	root.classList.add('js');
	if (hasST) gsap.registerPlugin(ScrollTrigger);

	/* ================================================================ intro */
	var intro = $('#intro');
	var bar = $('#introBar');
	var heroIn = null;

	function killIntro() {
		if (!intro || intro.classList.contains('is-open')) return;
		intro.classList.add('is-done');
		intro.classList.add('is-open');
		document.body.classList.add('is-ready');
		if (heroIn) heroIn.play();
		setTimeout(function () { if (intro.parentNode) intro.remove(); intro = null; }, 1100);
	}
	function runIntro() {
		if (!intro || intro.classList.contains('is-run')) return;
		intro.classList.add('is-run');
		if (!animate) { setTimeout(killIntro, 350); return; }
		var prog = { v: 0 };
		gsap.to(prog, {
			v: 100, duration: 1.6, ease: 'power2.inOut',
			onUpdate: function () { if (bar) bar.style.width = prog.v.toFixed(1) + '%'; },
			onComplete: function () { setTimeout(killIntro, 420); }
		});
	}
	window.addEventListener('wheel', killIntro, { passive: true, once: true });
	window.addEventListener('touchstart', killIntro, { passive: true, once: true });
	window.addEventListener('keydown', function (e) { if (e.key === 'Escape') killIntro(); });
	window.addEventListener('load', runIntro);
	setTimeout(runIntro, 900);

	/* ============================================================ countdown */
	var OPEN_H = 12, OPEN_M = 30;
	function kolkataNow() {
		var now = new Date();
		var utc = now.getTime() + now.getTimezoneOffset() * 60000;
		return new Date(utc + 5.5 * 3600000);
	}
	function pad(n) { return (n < 10 ? '0' : '') + n; }
	function state() {
		var now = kolkataNow();
		var day = now.getDay();
		var mins = now.getHours() * 60 + now.getMinutes();
		var openMins = OPEN_H * 60 + OPEN_M;
		var closeM = ((day === 5 || day === 6) ? 24 * 60 + 30 : 23 * 60);
		var open = false, target = null, v = '';
		if (day !== 1 && mins >= openMins && mins < closeM) {
			open = true;
			var mid = new Date(now.getTime());
			mid.setHours(0, 0, 0, 0);
			target = new Date(mid.getTime() + closeM * 60000);
			v = 'till ' + pad(Math.floor(closeM / 60) % 24) + ':' + pad(closeM % 60);
		} else {
			var d = new Date(now.getTime());
			d.setHours(OPEN_H, OPEN_M, 0, 0);
			if (mins >= openMins) d = new Date(d.getTime() + 86400000);
			while (d.getDay() === 1) d = new Date(d.getTime() + 86400000);
			target = d;
			var sameDay = d.toDateString() === now.toDateString();
			v = (sameDay ? 'aaj ' : '') + '12:30';
		}
		return { open: open, target: target, v: v, now: now };
	}
	function paintCountdown() {
		var s = state();
		$$('.countdown').forEach(function (cd) {
			var lab = $('.countdown__label', cd);
			if (lab) lab.innerHTML = (s.open ? 'Khula hai' : 'Dum is on') + ' · <time data-open-at>' + (s.open ? 'bandh hone tak' : 'opens 12:30') + '</time>';
			var k = $('[data-open-k]', cd), v = $('[data-open-v]', cd);
			if (k) k.textContent = s.open ? 'Aaj' : 'Khulta hai';
			if (v) v.textContent = s.v;
			var diff = Math.max(0, s.target.getTime() - s.now.getTime()) / 1000;
			var dd = Math.floor(diff / 86400);
			var set = function (sel, val) { var e = $('[data-' + sel + ']', cd); if (e) e.textContent = val; };
			cd.classList.toggle('no-days', dd === 0);
			set('d', pad(dd)); set('h', pad(Math.floor((diff % 86400) / 3600)));
			set('m', pad(Math.floor((diff % 3600) / 60))); set('s', pad(Math.floor(diff % 60)));
		});
		var pill = $('#status');
		if (pill) {
			pill.classList.toggle('is-open', s.open);
			pill.classList.toggle('is-closed', !s.open);
			var txt = $('[data-status-text]', pill);
			if (txt) txt.textContent = s.open ? 'Khula hai · till ' + s.v.replace('till ', '') : 'Bandh · ' + s.v;
		}
		var today = s.now.getDay();
		$$('#hours .hours__row').forEach(function (row) {
			var d = parseInt(row.getAttribute('data-day'), 10);
			row.classList.toggle('is-today',
				(d === 2 && (today === 2 || today === 3 || today === 4)) ||
				(d === 5 && (today === 5 || today === 6)) ||
				(d === 0 && today === 0) || (d === 1 && today === 1));
		});
		// aaj ka deg — fewer handis as the evening wears on
		var degLeft = $('#degLeft');
		if (degLeft) {
			var n = 14;
			if (s.open) {
				var elapsed = (s.now.getHours() * 60 + s.now.getMinutes() - (OPEN_H * 60 + OPEN_M)) / 60;
				n = clamp(Math.round(14 - elapsed * 2.2), 2, 14);
			}
			degLeft.textContent = String(n);
		}
	}
	paintCountdown();
	setInterval(paintCountdown, 1000);

	/* ====================================================== split text utils */
	function splitWords(el) {
		var out = [];
		function walk(node, host) {
			Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
				if (ch.nodeType === 3) {
					ch.textContent.split(/(\s+)/).forEach(function (part) {
						if (!part) return;
						if (/^\s+$/.test(part)) { host.appendChild(document.createTextNode(' ')); return; }
						var w = document.createElement('span'); w.className = 'w';
						var wi = document.createElement('span'); wi.className = 'wi';
						wi.textContent = part; w.appendChild(wi); host.appendChild(w);
						out.push(wi);
					});
				} else if (ch.nodeType === 1) {
					if (ch.tagName === 'BR') { host.appendChild(document.createElement('br')); return; }
					var c = ch.cloneNode(false);
					host.appendChild(c); walk(ch, c);
				}
			});
		}
		el.innerHTML = '';
		// rebuild from original: re-parse stored html
		var tmp = document.createElement('div');
		tmp.innerHTML = el.getAttribute('data-orig');
		walk(tmp, el);
		return out;
	}
	$$('[data-split]').forEach(function (el) {
		el.setAttribute('data-orig', el.innerHTML);
		el.isSplit = splitWords(el);
	});
	// hero word: letter masks
	(function () {
		var word = $('.s-hero__word');
		if (!word) return;
		var nodes = Array.prototype.slice.call(word.childNodes);
		word.innerHTML = '';
		nodes.forEach(function (n) {
			var txt = n.textContent;
			for (var i = 0; i < txt.length; i++) {
				var ch = document.createElement('span'); ch.className = 'ch';
				var chi = document.createElement('span'); chi.className = 'chi';
				chi.textContent = txt[i]; ch.appendChild(chi); word.appendChild(ch);
			}
		});
	})();

	/* ============================================================ no-motion */
	if (!animate) {
		$$('[data-split]').forEach(function (el) { el.classList.add('is-split'); });
		var pin = $('.s-gallery__pin');
		if (pin) pin.style.overflowX = 'auto';
		var deckCards0 = $$('.deck__card');
		deckCards0.forEach(function (el, i) {
			el.style.opacity = i === 0 ? '1' : '0';
			el.style.transform = 'translate3d(' + (i * 6) + '%,' + (-i * 5) + '%,' + (-i * 90) + 'px)';
		});
		var gal = $('#galleryTrack');
		if (gal) gal.parentNode.insertBefore(gal, gal.nextSibling); // noop keep order
		return;
	}

	/* ============================================================ hero intro */
	heroIn = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
	heroIn
		.from('.topbar', { y: -80, opacity: 0, duration: .8 }, 0)
		.from('.s-hero__kicker', { y: -26, opacity: 0, duration: .8 }, .05)
		.from('.s-hero__word .chi', { yPercent: 118, rotation: 7, duration: 1.15, stagger: .08 }, .1)
		.from('.hshot--main', { y: '+=260', rotation: -13, scale: .85, opacity: 0, duration: 1.25 }, .35)
		.from('.hshot--back', { y: '+=200', rotation: 17, opacity: 0, duration: 1.1 }, .45)
		.from('.orbit, .burst', { scale: 0, opacity: 0, duration: .8, ease: 'back.out(1.9)', stagger: .1 }, .8)
		.from('.s-hero__stamp', { scale: 0, rotation: -140, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, .85)
		.from('.s-hero__scrawl', { opacity: 0, y: 24, duration: .7 }, 1)
		.from(['.s-hero__tagline', '.countdown--hero'], { y: 44, opacity: 0, duration: .9, stagger: .12 }, 1.05)
		.from('.s-hero__scroll', { opacity: 0, duration: .7 }, 1.2)
		.add(function () {
			gsap.set('.hshot, .orbit, .burst', { clearProps: 'transform,opacity' });
			gsap.set('.s-hero__word .chi, .s-hero__kicker, .s-hero__stamp, .s-hero__scrawl, .s-hero__tagline, .countdown--hero, .s-hero__scroll, .topbar', { clearProps: 'all' });
		});

	/* ================================================== hero: 3D tilt + scrub */
	var degInner = $('#degInner');
	var badges = $$('.orbit, .burst');
	var mx = 0, my = 0, cmx = 0, cmy = 0;
	window.addEventListener('pointermove', function (e) {
		mx = (e.clientX / window.innerWidth) * 2 - 1;
		my = (e.clientY / window.innerHeight) * 2 - 1;
	}, { passive: true });
	gsap.ticker.add(function () {
		cmx = lerp(cmx, mx, 0.06);
		cmy = lerp(cmy, my, 0.06);
		if (degInner) gsap.set(degInner, { rotationY: cmx * 15, rotationX: -cmy * 11 });
		badges.forEach(function (b) {
			var depth = parseFloat(b.getAttribute('data-depth') || '80') / 100;
			gsap.set(b, { x: cmx * 26 * depth, y: cmy * 20 * depth });
		});
	});

	gsap.timeline({
		scrollTrigger: { trigger: '.s-hero', start: 'top top', end: 'bottom top', scrub: true }
	})
		.to('.s-hero__bg', { yPercent: 22, ease: 'none' }, 0)
		.to('.s-hero__word', { yPercent: 36, scale: .93, opacity: .2, transformOrigin: '50% 100%', ease: 'none' }, 0)
		.to('.deg-scene', { y: -140, rotation: -4, ease: 'none' }, 0)
		.to('.s-hero__stamp', { rotation: 140, scale: .8, opacity: 0, ease: 'none' }, 0)
		.to('.s-hero__scrawl', { y: 60, opacity: 0, ease: 'none' }, 0)
		.to('.s-hero__foot', { y: 80, opacity: 0, ease: 'none' }, 0)
		.to('.s-hero__scroll', { opacity: 0, ease: 'none' }, 0);

	/* ================================================================ steam */
	(function () {
		var cv = $('#steam');
		if (!cv) return;
		var ctx = cv.getContext('2d');
		var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
		var parts = [], live = true;
		function size() {
			W = cv.clientWidth; H = cv.clientHeight;
			cv.width = Math.max(1, W * dpr); cv.height = Math.max(1, H * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		function spawn(p) {
			p.x = W * (0.3 + Math.random() * 0.4);
			p.y = H * (0.86 + Math.random() * 0.14);
			p.r = 8 + Math.random() * 22;
			p.vy = 0.5 + Math.random() * 0.9;
			p.ph = Math.random() * Math.PI * 2;
			p.sw = 8 + Math.random() * 22;
			p.a = 0;
			p.max = 0.10 + Math.random() * 0.12;
			return p;
		}
		for (var i = 0; i < 46; i++) { var p = spawn({}); p.y = Math.random() * H; p.a = p.max * Math.random(); parts.push(p); }
		ScrollTrigger.create({ trigger: '.s-hero', start: 'top bottom', end: 'bottom top', onToggle: function (s) { live = s.isActive; } });
		window.addEventListener('resize', size); size();
		var t = 0;
		gsap.ticker.add(function () {
			if (!live) return;
			t += 0.016;
			ctx.clearRect(0, 0, W, H);
			for (var i = 0; i < parts.length; i++) {
				var q = parts[i];
				q.y -= q.vy; q.ph += 0.02;
				var life = 1 - q.y / H;
				q.a = q.max * Math.sin(clamp(life, 0, 1) * Math.PI);
				if (q.y < -q.r * 2) spawn(q);
				var x = q.x + Math.sin(q.ph + q.y * 0.012) * q.sw * (0.4 + life);
				var g = ctx.createRadialGradient(x, q.y, 0, x, q.y, q.r);
				g.addColorStop(0, 'rgba(255,250,238,' + q.a.toFixed(3) + ')');
				g.addColorStop(1, 'rgba(255,250,238,0)');
				ctx.fillStyle = g;
				ctx.beginPath(); ctx.arc(x, q.y, q.r, 0, 6.283); ctx.fill();
			}
		});
	})();

	/* ==================================================== split-title reveals */
	$$('[data-split]').forEach(function (el) {
		gsap.to(el.isSplit, {
			y: 0, rotation: 0, duration: 1, ease: 'power4.out', stagger: 0.045,
			scrollTrigger: { trigger: el, start: 'top 82%', once: true }
		});
	});
	// initial hidden state for split words (CSS handles .js transform; make sure)
	gsap.set('[data-split] .wi', { yPercent: 0 });

	/* generic reveals */
	$$('[data-reveal]').forEach(function (el) {
		// fromTo, not from: a mid-tween ScrollTrigger.refresh() can otherwise bake the
		// zero state in as the "natural" value and the block never fades back in.
		gsap.fromTo(el,
			{ y: 56, opacity: 0, rotation: el.classList.contains('pola') ? 4 : 0 },
			{
				y: 0, opacity: 1, rotation: 0,
				duration: 1.1, ease: 'power3.out', overwrite: 'auto',
				scrollTrigger: { trigger: el, start: 'top 86%', once: true }
			});
	});
	// stamp card: tilt-in
	gsap.fromTo('.stamp-card',
		{ rotationX: 14, y: 90, opacity: 0, transformOrigin: '50% 100%' },
		{
			rotationX: 0, y: 0, opacity: 1,
			duration: 1.3, ease: 'power3.out', overwrite: 'auto',
			scrollTrigger: { trigger: '.s-def', start: 'top 70%', once: true }
		});

	/* ================================================== build: pinned scrub */
	var deckCards = $$('.deck__card');
	var buildSteps = $$('.s-build__step');
	var buildProgress = $('#buildProgress');
	var buildCount = $('#buildCount');
	var deck = $('#buildDeck');
	function setStep(i) {
		buildSteps.forEach(function (s, k) {
			s.classList.toggle('is-active', k === i);
			s.classList.toggle('is-done', k < i);
		});
		if (buildCount) buildCount.textContent = pad(i + 1);
	}
	function drawBuild(p) {
		var n = deckCards.length;
		var c = clamp(p * 1.04, 0, 1) * (n - 1);
		deckCards.forEach(function (el, i) {
			var d = i - c, tf, op = 1;
			if (d < 0) {
				var t = clamp(-d, 0, 1), e = t * t * (3 - 2 * t);
				tf = 'translate3d(' + (-e * 70).toFixed(1) + '%,' + (e * 8).toFixed(1) + '%,' + (e * 120).toFixed(0) + 'px) rotateY(' + (-e * 38).toFixed(1) + 'deg) rotateZ(' + (-e * 9).toFixed(1) + 'deg)';
				op = 1 - e;
			} else {
				var k = Math.min(d, 3);
				tf = 'translate3d(' + (k * 6).toFixed(1) + '%,' + (-k * 5).toFixed(1) + '%,' + (-k * 90).toFixed(0) + 'px) rotateZ(' + (k * 3.2 * (i % 2 ? 1 : -1)).toFixed(1) + 'deg)';
				op = d > 3 ? 0 : 1 - k * 0.12;
			}
			if (el.classList.contains('deck__card--paper')) op = d > 3 ? 0 : 1;
			el.style.transform = tf;
			el.style.opacity = op.toFixed(3);
			el.style.zIndex = String(100 - i);
			el.classList.toggle('is-front', Math.abs(d) < 0.5);
		});
		if (deck) deck.style.transform = 'rotateX(' + lerp(10, 4, p).toFixed(1) + 'deg) rotateY(' + lerp(-16, -6, p).toFixed(1) + 'deg)';
		setStep(clamp(Math.round(c), 0, 4));
		if (buildProgress) buildProgress.style.height = (p * 100).toFixed(1) + '%';
	}
	var buildST = ScrollTrigger.create({
		trigger: '.s-build', start: 'top top',
		end: function () { return '+=' + Math.round(window.innerHeight * (window.innerWidth < 860 ? 2.4 : 3.4)); },
		pin: true, scrub: 0.6, onUpdate: function (s) { drawBuild(s.progress); }
	});
	drawBuild(0);
	buildSteps.forEach(function (step, i) {
		step.addEventListener('click', function () {
			var y = buildST.start + (i / (buildSteps.length - 1)) * (buildST.end - buildST.start);
			window.scrollTo({ top: y, behavior: 'smooth' });
		});
	});

	/* ============================================ gallery: pinned horizontal */
	var track = $('#galleryTrack');
	var cards = $$('.card');
	var galCount = $('#galCount');
	var galDist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 60); };
	var galTween = gsap.to(track, {
		x: function () { return -galDist(); },
		ease: 'none',
		scrollTrigger: {
			trigger: '.s-gallery', start: 'top top',
			end: function () { return '+=' + (galDist() + window.innerHeight * 0.4); },
			pin: true, scrub: 1, invalidateOnRefresh: true,
			onUpdate: function (s) {
				if (galCount) galCount.textContent = pad(Math.min(8, Math.round(s.progress * 7) + 1));
			}
		}
	});
	gsap.to('.s-gallery__giant', {
		x: function () { return -galDist() * 0.35; }, ease: 'none',
		scrollTrigger: {
			trigger: '.s-gallery', start: 'top top',
			end: function () { return '+=' + (galDist() + window.innerHeight * 0.4); },
			scrub: 1, invalidateOnRefresh: true
		}
	});
	cards.forEach(function (card) {
		var img = $('.card__img', card);
		if (img) gsap.fromTo(img, { xPercent: -7 }, {
			xPercent: 7, ease: 'none',
			scrollTrigger: { trigger: card, containerAnimation: galTween, start: 'left right', end: 'right left', scrub: true }
		});
		gsap.from(card, {
			y: 110, opacity: 0, rotation: 4, duration: .9, ease: 'power3.out',
			scrollTrigger: { trigger: card, containerAnimation: galTween, start: 'left 96%', toggleActions: 'play none none reverse' }
		});
	});
	// 3D tilt on gallery cards
	if (fine) cards.forEach(function (card) {
		var media = $('.card__media', card);
		card.addEventListener('pointermove', function (e) {
			var r = card.getBoundingClientRect();
			var px = (e.clientX - r.left) / r.width - 0.5;
			var py = (e.clientY - r.top) / r.height - 0.5;
			gsap.to(card, { rotationY: px * 12, rotationX: -py * 10, transformPerspective: 900, duration: .5, ease: 'power2.out' });
			if (media) gsap.to(media, { x: px * -14, y: py * -10, duration: .5 });
		});
		card.addEventListener('pointerleave', function () {
			gsap.to([card, media], { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: .9, ease: 'elastic.out(1,.5)' });
		});
	});

	/* ==================================================== rest of the page */
	// marquees: constant drift + scroll-velocity skew
	var veloTracks = [];
	function loopTrack(el, dir, speed) {
		var g = el.children[0];
		var st = { el: el, dir: dir, speed: speed, w: 0, x: 0 };
		st.measure = function () { st.w = g ? g.getBoundingClientRect().width : 0; };
		st.measure(); veloTracks.push(st);
		return st;
	}
	$$('.marquee__track').forEach(function (el) { loopTrack(el, parseFloat(el.getAttribute('data-marquee') || '1'), 0.9); });
	if ($('#endTrack')) loopTrack($('#endTrack'), -1, 0.7);
	var lastY = window.scrollY, vel = 0, skew = 0;
	gsap.ticker.add(function () {
		var y = window.scrollY;
		vel = lerp(vel, y - lastY, 0.18); lastY = y;
		skew = lerp(skew, clamp(vel * 0.35, -14, 14), 0.12);
		veloTracks.forEach(function (m) {
			if (!m.w) return;
			m.x += (m.speed + Math.min(Math.abs(vel) * 0.05, 4)) * m.dir;
			if (m.x <= -m.w) m.x += m.w;
			if (m.x > 0) m.x -= m.w;
			m.el.style.transform = 'translate3d(' + m.x.toFixed(1) + 'px,0,0) skewX(' + (-skew * 0.5 * m.dir).toFixed(2) + 'deg)';
		});
	});
	window.addEventListener('resize', function () { veloTracks.forEach(function (m) { m.measure(); }); });

	// dastarkhwan photo parallax
	gsap.fromTo('.duo__photo img', { yPercent: -8 }, {
		yPercent: 8, ease: 'none',
		scrollTrigger: { trigger: '.s-amigos__grid', start: 'top bottom', end: 'bottom top', scrub: true }
	});
	gsap.from('.s-amigos__how > span', {
		x: -40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .12,
		scrollTrigger: { trigger: '.s-amigos__how', start: 'top 80%', once: true }
	});
	// hours rows + disc
	gsap.from('.hours__row', {
		x: -60, opacity: 0, duration: .9, ease: 'power3.out', stagger: .09,
		scrollTrigger: { trigger: '#hours', start: 'top 78%', once: true }
	});
	gsap.from('.deg-ticket', {
		rotation: -8, y: 30, opacity: 0, duration: 1, ease: 'back.out(1.6)',
		scrollTrigger: { trigger: '.deg-ticket', start: 'top 88%', once: true }
	});
	gsap.to('.disc--photo', {
		rotation: 24, ease: 'none',
		scrollTrigger: { trigger: '.s-hours', start: 'top bottom', end: 'bottom top', scrub: 1 }
	});
	// visit: pin drop + poi pop
	gsap.from('.vmap__pin-wrap', {
		y: -320, opacity: 0, duration: 1.1, ease: 'bounce.out',
		scrollTrigger: { trigger: '.vmap', start: 'top 72%', once: true }
	});
	gsap.from('.vmap__poi', {
		scale: 0, opacity: 0, duration: .6, ease: 'back.out(2)', stagger: .07,
		scrollTrigger: { trigger: '.vmap', start: 'top 65%', once: true }
	});
	gsap.from('.s-visit__actions .btn', {
		y: 34, opacity: 0, duration: .8, ease: 'power3.out', stagger: .08,
		scrollTrigger: { trigger: '.s-visit__actions', start: 'top 88%', once: true }
	});
	// footer
	gsap.from('.s-end__big span', {
		yPercent: 60, opacity: 0, duration: 1.1, ease: 'power4.out', stagger: .1,
		scrollTrigger: { trigger: '.s-end__big', start: 'top 88%', once: true }
	});

	// topbar follows the surface
	var lightSections = $$('.s-def, .s-gallery, .s-card, .s-amigos');
	var lightRanges = [];
	function measureLight() {
		lightRanges = lightSections.map(function (el) {
			var r = el.getBoundingClientRect();
			return [r.top + window.scrollY, r.bottom + window.scrollY];
		});
	}
	measureLight();
	// pins and lazy images move sections around: re-measure whenever layout settles
	if (hasST) ScrollTrigger.addEventListener('refresh', measureLight);
	window.addEventListener('resize', measureLight);
	window.addEventListener('load', function () { setTimeout(measureLight, 900); });
	// measure the live rects: pinned sections are position:fixed while pinned, so
	// cached page offsets go stale the moment a pin engages.
	var lightTick = 0;
	var lightSel = '.s-def, .s-gallery, .s-card, .s-amigos';
	gsap.ticker.add(function () {
		if ((lightTick++ % 5) !== 0) return;
		// ask the browser what is actually painted under the bar — sections overlap
		// each other with masks and negative margins, so rect maths lies.
		var stack = document.elementsFromPoint(window.innerWidth * 0.5, 46) || [];
		var onLight = false;
		for (var i = 0; i < stack.length; i++) {
			var node = stack[i];
			if (node.closest('.topbar, .cursor, .intro, .s-card__sign')) continue;
			onLight = !!node.closest(lightSel);
			break;
		}
		if (onLight !== document.body.classList.contains('on-light')) {
			document.body.classList.toggle('on-light', onLight);
		}
	});

	/* ==================================================== cursor + magnetic */
	if (fine) {
		document.body.classList.add('has-cursor');
		var cur = $('.cursor');
		var dotLabel = $('.cursor__label');
		var qx = gsap.quickTo(cur, 'x', { duration: .22, ease: 'power3.out' });
		var qy = gsap.quickTo(cur, 'y', { duration: .22, ease: 'power3.out' });
		window.addEventListener('pointermove', function (e) { qx(e.clientX); qy(e.clientY); }, { passive: true });
		$$('[data-cursor]').forEach(function (el) {
			el.addEventListener('pointerenter', function () {
				dotLabel.textContent = el.getAttribute('data-cursor');
				cur.classList.add('is-hot');
			});
			el.addEventListener('pointerleave', function () { cur.classList.remove('is-hot'); });
		});
		// magnetic buttons
		$$('.btn, .topbar__link, .s-build__step').forEach(function (el) {
			el.addEventListener('pointermove', function (e) {
				var r = el.getBoundingClientRect();
				gsap.to(el, {
					x: (e.clientX - r.left - r.width / 2) * 0.22,
					y: (e.clientY - r.top - r.height / 2) * 0.28,
					duration: .4, ease: 'power2.out'
				});
			});
			el.addEventListener('pointerleave', function () {
				gsap.to(el, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.45)' });
			});
		});
	}

	/* map poi hover tint */
	$$('.vmap__poi').forEach(function (poi) {
		poi.addEventListener('pointerenter', function () { poi.style.color = '#C03A17'; });
		poi.addEventListener('pointerleave', function () { poi.style.color = ''; });
	});

	window.addEventListener('load', function () {
		measureLight();
		ScrollTrigger.refresh();
	});

	/* failsafe: never leave real content invisible because a trigger misfired */
	(function () {
		var rescue = function () {
			$$('[data-reveal], .stamp-card').forEach(function (el) {
				var r = el.getBoundingClientRect();
				var inView = r.top < window.innerHeight * 1.1 && r.bottom > -window.innerHeight * 0.1;
				if (!inView) return;
				if (parseFloat(getComputedStyle(el).opacity) > 0.05) return;
				gsap.set(el, { opacity: 1, y: 0, rotation: 0, rotationX: 0 });
			});
		};
		window.addEventListener('load', function () { setTimeout(rescue, 1200); });
		window.addEventListener('scroll', function () { clearTimeout(window.__rescueT); window.__rescueT = setTimeout(rescue, 400); }, { passive: true });
	})();

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
				if (!img) return;
				// settle the frame in; the print itself scales down into place
				gsap.fromTo(img,
					{ scale: 1.14 },
					{
						scale: 1, duration: 1.6, ease: 'power3.out',
						scrollTrigger: { trigger: frame, start: 'top 88%', once: true }
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


	/* ==================================================================
	   ROUND 6 — the prints in the empty bands drift a little as you pass
	   ================================================================== */
	(function () {
		if (!animate) return;
		var prints = $$('.print[data-tilt]');
		prints.forEach(function (el, i) {
			gsap.fromTo(el,
				{ rotation: i % 2 ? -7 : 7, y: 26, scale: .94 },
				{
					rotation: i % 2 ? -3.2 : 3.4, y: 0, scale: 1,
					duration: 1.2, ease: 'power3.out',
					scrollTrigger: { trigger: el, start: 'top 96%', once: true }
				});
			if (hasST) gsap.to(el, {
				yPercent: -5, ease: 'none',
				scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true }
			});
		});
	})();
	/* ROUND 6 */

})();
