/**
 * DUM — BIRYANI & BAR, NIZAMUDDIN
 * Premium editorial site with GSAP motion design & Three.js 3D biryani experience.
 */

// ==========================================================================
// 1. GSAP REGISTRATION
// ==========================================================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 2. INTRO SEQUENCE
// ==========================================================================
const introMsgs = [
  'Bhuna masala, dheere dheere…',
  'Chawal bhig rahe hain. Bheegne do.',
  'Sealing the deg with atta. Tight.',
  'Saffron is soaking. Don\'t rush it.',
  'Onions have been browning for 3 hours.',
  'Dum pe hai. Bilkul chup.',
  'Thoda sa sab kuch, bohot sa loading…',
];
let msgIndex = 0;
const introMsgEl = document.getElementById('introMsg');
const introBar = document.getElementById('introBar');
const intro = document.getElementById('intro');
const skipIntro = document.getElementById('skipIntro');

function cycleIntroMsg() {
  if (!introMsgEl) return;
  introMsgEl.style.opacity = '0';
  setTimeout(() => {
    msgIndex = (msgIndex + 1) % introMsgs.length;
    introMsgEl.textContent = introMsgs[msgIndex];
    introMsgEl.style.opacity = '1';
  }, 300);
}
setInterval(cycleIntroMsg, 2200);

skipIntro?.addEventListener('click', () => {
  gsap.to('#introBar', { width: '100%', duration: 0.3, onComplete: finishIntro });
});

function finishIntro() {
  gsap.to('#intro', {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      intro.style.display = 'none';
      startAnimations();
    }
  });
}

// Auto-finish intro after ~5 seconds
setTimeout(finishIntro, 5000);

function startAnimations() {
  initCursor();
  initHero();
  initBuild();
  initMenu();
  initGallery();
  initNames();
  initVisit();
  initThreeJS();
  initUnseal();
  initMobileMenu();
  lucide.createIcons();
}

// ==========================================================================
// 3. CUSTOM CURSOR
// ==========================================================================
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.body.classList.add('cursor-active');
  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  const label = document.querySelector('.cursor-label');
  const links = document.querySelectorAll('a, button, [data-cursor]');

  window.addEventListener('mousemove', (e) => {
    gsap.to(dot, { x: e.clientX - 6, y: e.clientY - 6, duration: 0.15, ease: 'power2.out' });
    gsap.to(label, { x: e.clientX - 40, y: e.clientY - 34, duration: 0.3, ease: 'power2.out' });
  });

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      dot.style.transform = 'scale(2.5)';
      dot.style.background = 'var(--vermilion)';
      const text = link.getAttribute('data-cursor') || link.textContent.trim().slice(0, 12);
      label.textContent = text;
      label.style.opacity = '1';
      label.style.transform = 'translateY(0)';
    });
    link.addEventListener('mouseleave', () => {
      dot.style.transform = 'scale(1)';
      dot.style.background = 'var(--saffron)';
      label.style.opacity = '0';
      label.style.transform = 'translateY(10px)';
    });
  });
}

// ==========================================================================
// 4. HERO ANIMATIONS
// ==========================================================================
function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
  tl.from('.s-hero-kicker', { y: 40, opacity: 0, duration: 1 })
    .from('h1', { y: 40, opacity: 0, duration: 1.2 }, '-=0.6')
    .from('.s-hero p', { y: 30, opacity: 0, duration: 1 }, '-=0.6')
    .from('.btn-primary', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.btn-outline', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.deg-hero img', { scale: 1.2, opacity: 0, duration: 1.4 }, '-=0.8')
    .from('#unsealBtn', { scale: 0, opacity: 0, duration: 0.8 }, '-=0.6');
}

// ==========================================================================
// 5. BUILD / DUM PUKHT SECTION
// ==========================================================================
function initBuild() {
  const steps = document.querySelectorAll('.step-item');
  const visual = document.getElementById('buildVisual');
  const count = document.getElementById('buildCount');
  const progress = document.getElementById('buildProgress');

  const stepData = {
    1: { num: '01', name: 'Chawal', desc: 'Basmati, soaked 40 minutes. Not 20. Layered half-cooked, never fully.', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', caption: 'The seal goes on · 11:40 AM' },
    2: { num: '02', name: 'Marinade', desc: 'Dahi, raw papaya, Kashmiri mirch, a spoon of mustard oil. Overnight.', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', caption: 'Resting overnight · fridge' },
    3: { num: '03', name: 'Birista', desc: 'Onions, three hours, low flame, no shortcuts.', img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80', caption: 'One shade of amber · 3 hours' },
    4: { num: '04', name: 'Tarkib', desc: 'Rice over meat. Saffron milk, mint, kewra, ghee. Then the same again.', img: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80', caption: 'Layered twice · 12:15 PM' },
    5: { num: '05', name: 'Dum', desc: 'Atta seal. 25 minutes on low, no peeking. Then opened in front of you.', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80', caption: 'Sealed & cooking · 12:40 PM' },
  };

  steps.forEach(step => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 40%',
      end: 'bottom 60%',
      onEnter: () => activateStep(step.dataset.step),
      onEnterBack: () => activateStep(step.dataset.step),
    });
  });

  function activateStep(num) {
    steps.forEach(s => {
      s.classList.toggle('active', s.dataset.step === String(num));
      const numEl = s.querySelector('.step-num');
      if (s.dataset.step === String(num)) {
        numEl.className = 'step-num w-10 h-10 rounded-full bg-saffron text-ink flex items-center justify-center font-bold text-lg shrink-0';
      } else {
        numEl.className = 'step-num w-10 h-10 rounded-full bg-border flex items-center justify-center font-bold text-lg shrink-0 text-muted';
      }
    });
    const d = stepData[num];
    if (d && count) {
      gsap.to(count, { textContent: d.num, duration: 0.3 });
      gsap.to(progress, { width: `${(num / 5) * 100}%`, duration: 0.6 });
      if (visual) {
        const img = visual.querySelector('img');
        if (img) {
          gsap.to(img, { opacity: 0, scale: 0.95, duration: 0.3, onComplete: () => {
            img.src = d.img;
            img.alt = d.desc;
            gsap.to(img, { opacity: 0.85, scale: 1, duration: 0.6 });
          } });
        }
        const caption = visual.querySelector('p');
        if (caption) {
          gsap.to(caption, { opacity: 0, duration: 0.3, onComplete: () => {
            caption.textContent = d.caption;
            gsap.to(caption, { opacity: 1, duration: 0.4 });
          } });
        }
      }
    }
  }

  // Stagger reveal for build section
  gsap.from('.build-intro > *', {
    y: 40, opacity: 0, duration: 1, stagger: 0.2,
    scrollTrigger: { trigger: '.build-intro', start: 'top 70%' }
  });
}

// ==========================================================================
// 6. MENU EXPERIENCE
// ==========================================================================
const MENU_ITEMS = [
  {
    id: 'hyd-chicken-dum',
    name: 'Royal Hyderabadi Chicken Dum',
    category: 'hyderabadi',
    price: 380,
    spice: 3,
    veg: false,
    portion: 'Serves 1-2',
    desc: '12-hour marinated chicken layered with 24-month aged basmati, roasted birista, and 21-spice potli masala.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    tag: 'bestseller'
  },
  {
    id: 'luck-gosht-dum',
    name: 'Awadhi Shahi Mutton Dum',
    category: 'lucknowi',
    price: 490,
    spice: 1,
    veg: false,
    portion: 'Serves 1-2',
    desc: 'Tender baby goat shank slow-cooked with kewra, mace, green cardamom, and saffron-infused cow ghee.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80',
    tag: 'chef signature'
  },
  {
    id: 'kolk-spicy-bro',
    name: 'Kolkata Special with Royal Aloo',
    category: 'kolkata',
    price: 360,
    spice: 2,
    veg: false,
    portion: 'Serves 1-2',
    desc: 'Slow dum cooked with meat, spiced egg, and velvety melt-in-mouth potato infused with gravy.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80',
    tag: 'must try'
  },
  {
    id: 'veg-shahi-paneer',
    name: 'Royal Malai Paneer Dum',
    category: 'veg',
    price: 330,
    spice: 2,
    veg: true,
    portion: 'Serves 1-2',
    desc: 'Fresh malai paneer layered with saffron basmati, caramelized cashews, and golden raisins.',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=700&q=80',
    tag: 'pure veg'
  },
  {
    id: 'hyd-spicy-mutton',
    name: 'Hyderabadi Ustaad Mutton Dum',
    category: 'hyderabadi',
    price: 520,
    spice: 3,
    veg: false,
    portion: 'Serves 1-2',
    desc: 'Crushed black pepper, Guntur chilies, mint purée, and bone marrow jus.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    tag: 'fiery'
  },
  {
    id: 'sides-burani-raita',
    name: 'Burani Garlic Raita & Mirchi Salan',
    category: 'sides',
    price: 90,
    spice: 2,
    veg: true,
    portion: 'Serves 2-3',
    desc: 'Roasted garlic hung curd raita with peanut, sesame, and bhavnagri chili salan.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    tag: 'essential side'
  }
];

function initMenu() {
  const grid = document.getElementById('menuGrid');
  const tabs = document.querySelectorAll('.menu-tab');
  let activeCategory = 'all';

  function render(category) {
    const filtered = category === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(i => i.category === category);

    grid.innerHTML = filtered.map((item, i) => `
      <article class="menu-card group" style="animation-delay: ${i * 0.1}s">
        <div class="menu-card__media relative overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover object-center" loading="lazy">
          ${item.tag ? `<span class="menu-card__tag">${item.tag.toUpperCase()}</span>` : ''}
        </div>
        <div class="menu-card__body">
          <div class="flex justify-between items-start">
            <h3 class="menu-card__name">${item.name}</h3>
            <span class="menu-card__price">₹${item.price}</span>
          </div>
          <p class="menu-card__desc">${item.desc}</p>
          <p class="text-[10px] font-bold uppercase tracking-wider text-muted">${item.portion} · ${item.spice > 2 ? 'Hot' : item.spice === 2 ? 'Medium' : 'Mild'} · ${item.veg ? 'Veg' : 'Non-veg'}</p>
        </div>
        <div class="menu-card__footer">
          <button class="text-xs font-bold uppercase tracking-wider text-saffron hover:text-saffron/80 transition-colors">Add to order</button>
          <i data-lucide="chevron-right" class="w-4 h-4 text-muted group-hover:text-saffron transition-colors"></i>
        </div>
      </article>
    `).join('');
    lucide.createIcons();
    // Reveal animation
    gsap.from('.menu-card', {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '#menu', start: 'top 75%', once: true }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-saffron', 'text-ink', 'border-saffron');
        t.classList.add('border-border', 'text-muted');
      });
      tab.classList.remove('border-border', 'text-muted');
      tab.classList.add('bg-saffron', 'text-ink');
      activeCategory = tab.textContent.toLowerCase().trim();
      render(activeCategory);
    });
  });

  render('all');
}

// ==========================================================================
// 7. GALLERY EXPERIENCE
// ==========================================================================
function initGallery() {
  const galleryItems = [
    {
      title: 'Hyderabadi Kacchi',
      sub: 'mutton · kachchi · saffron',
      price: '₹360',
      tag: 'house',
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
      film: 'TABLE 6 · 9:42 PM'
    },
    {
      title: 'Lucknowi Awadhi',
      sub: 'mutton · kewra · ittar',
      price: '₹380',
      tag: '',
      img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80',
      film: 'HANDI No.2 · DUM 25 MIN'
    },
    {
      title: 'Kolkata',
      sub: 'mutton · aloo · dim',
      price: '₹340',
      tag: 'aloo + dim',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80',
      film: 'ALOO FIRST · FIGHT LATER'
    },
    {
      title: 'Ambur',
      sub: 'short grain · red chilli',
      price: '₹320',
      tag: '',
      img: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=700&q=80',
      film: 'LEAF · EAT WITH HANDS'
    },
    {
      title: 'Malabar',
      sub: 'chicken · cashew · raisin',
      price: '₹330',
      tag: '',
      img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
      film: 'STEEL PLATE · FULL MEALS'
    },
    {
      title: 'Kathal',
      sub: 'jackfruit · ghee · sabar',
      price: '₹280',
      tag: 'veg · no meat',
      img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
      film: 'VEG · STILL DUM'
    },
    {
      title: 'Murgh',
      sub: 'chicken · three hours on dum',
      price: '₹310',
      tag: '',
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
      film: 'LEG PIECE · CALL DIBS'
    },
  ];

  const grid = document.querySelector('.gallery-grid');
  grid.innerHTML = galleryItems.map((item, i) => `
    <figure class="gallery-card group">
      <div class="gallery-card__overlay">
        <span class="gallery-card__price">${item.price}</span>
        <h3 class="gallery-card__title">${item.title}</h3>
        <p class="gallery-card__sub">${item.sub}</p>
      </div>
      ${item.tag ? `<span class="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-ink/80 text-saffron px-2 py-1 rounded border border-saffron/30 backdrop-blur">${item.tag}</span>` : ''}
      <img src="${item.img}" alt="${item.title}" class="gallery-card__img" loading="lazy">
    </figure>
  `).join('');
  lucide.createIcons();

  gsap.from('.gallery-card', {
    y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out',
    scrollTrigger: { trigger: '#gallery', start: 'top 70%', once: true }
  });
}

// ==========================================================================
// 8. NAMES MARQUEE
// ==========================================================================
function initNames() {
  const names = [
    'Hyderabadi', 'Lucknowi', 'Kolkata', 'Ambur', 'Bhatkali', 'Thalassery',
    'Memoni', 'Sindhi', 'Dindigul', 'Yakhni', 'Moradabadi', 'Kashmiri',
    'Kathal', 'Subz', 'Paneer', 'Aloo', 'Chana', 'Gobi', 'Kakori', 'Galouti',
    'Seekh', 'Shami', 'Boti', 'Nihari'
  ];
  const track = document.querySelector('.names-track');
  // Duplicate for seamless loop
  track.innerHTML = names.map(n => `<span class="name-chip">${n}</span>`).join('') +
                names.map(n => `<span class="name-chip">${n}</span>`).join('');
}

// ==========================================================================
// 9. VISIT SECTION
// ==========================================================================
function initVisit() {
  gsap.from('.visit-card', {
    x: -60, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.visit-card', start: 'top 75%', once: true }
  });
  gsap.from('.map-wrapper', {
    x: 60, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.map-wrapper', start: 'top 75%', once: true }
  });
}

// ==========================================================================
// 10. THREE.JS 3D BIRYANI EXPERIENCE
// ==========================================================================
function initThreeJS() {
  const container = document.getElementById('canvas3d');
  if (!container) return;

  // Check if Three.js is available via CDN
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => initThreeJSScene(container);
    document.head.appendChild(script);
  } else {
    initThreeJSScene(container);
  }

  const modal = document.getElementById('biryani3d');
  const closeBtn = document.getElementById('close3D');

  document.getElementById('unsealBtn')?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

function initThreeJSScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a3a2e);
  scene.fog = new THREE.Fog(0x1a3a2e, 1, 12);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(3, 5, 3);
  scene.add(dirLight);

  const spotLight = new THREE.SpotLight(0xe8a013, 3);
  spotLight.position.set(0, 4, 2);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.5;
  scene.add(spotLight);

  // Deg pot (handi)
  const potGroup = new THREE.Group();

  // Pot body
  const potGeometry = new THREE.CylinderGeometry(1, 1.2, 1.6, 32);
  const potMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.4,
    metalness: 0.3,
  });
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.y = 0;
  potGroup.add(pot);

  // Pot rim
  const rimGeometry = new THREE.TorusGeometry(1.15, 0.08, 16, 100);
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xb87a12,
    roughness: 0.2,
    metalness: 0.8,
  });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.y = 0.9;
  rim.rotation.x = Math.PI / 2;
  potGroup.add(rim);

  // Dough seal (top)
  const sealGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32);
  const sealMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a7a66,
    roughness: 0.8,
  });
  const seal = new THREE.Mesh(sealGeometry, sealMaterial);
  seal.position.y = 1.1;
  potGroup.add(seal);

  // Rice layer (visible through transparent seal or when unsealed)
  const riceGroup = new THREE.Group();
  for (let i = 0; i < 60; i++) {
    const riceGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 6);
    const riceMat = new THREE.MeshStandardMaterial({
      color: 0xf6edd8,
      roughness: 0.6,
    });
    const rice = new THREE.Mesh(riceGeo, riceMat);
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.3 + Math.random() * 0.6;
    rice.position.set(Math.cos(angle) * radius, 0.65 + Math.random() * 0.2, Math.sin(angle) * radius);
    rice.rotation.x = Math.random() * Math.PI;
    rice.rotation.z = Math.random() * Math.PI;
    riceGroup.add(rice);
  }
  riceGroup.position.y = 0.8;
  potGroup.add(riceGroup);

  // Saffron strands
  const saffronGroup = new THREE.Group();
  for (let i = 0; i < 20; i++) {
    const saffronGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.4, 4);
    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xe8a013,
      roughness: 0.5,
    });
    const strand = new THREE.Mesh(saffronGeo, saffronMat);
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.2 + Math.random() * 0.6;
    strand.position.set(Math.cos(angle) * radius, 0.9 + Math.random() * 0.4, Math.sin(angle) * radius);
    strand.rotation.x = Math.random() * Math.PI;
    strand.rotation.z = Math.random() * Math.PI;
    saffronGroup.add(strand);
  }
  saffronGroup.position.y = 0.8;
  potGroup.add(saffronGroup);

  scene.add(potGroup);

  // Steam particles
  const steamParticles = [];
  const steamCount = 40;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  const steamScale = new Float32Array(steamCount);
  steamGeo.setAttribute('position', steamPos);
  steamGeo.setAttribute('scale', new THREE.BufferAttribute(steamScale, 1));
  const steamMat = new THREE.PointsMaterial({
    color: 0xf6edd8,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });
  const steamSystem = new THREE.Points(steamGeo, steamMat);
  scene.add(steamSystem);

  // Table surface
  const tableGeo = new THREE.PlaneGeometry(20, 20);
  const tableMat = new THREE.MeshStandardMaterial({
    color: 0x143325,
    roughness: 0.8,
  });
  const table = new THREE.Mesh(tableGeo, tableMat);
  table.rotation.x = -Math.PI / 2;
  table.position.y = -0.9;
  scene.add(table);

  let isSealed = true;
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationY = 0;
  let targetRotationX = 0;

  // Mouse interaction
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    targetRotationY = mouseX * 0.5;
    targetRotationX = -mouseY * 0.3;
  });

  // Click to unseal
  container.addEventListener('click', () => {
    if (isSealed) {
      isSealed = false;
      gsap.to(seal.position, { y: 1.6, duration: 0.8, ease: 'expo.out' });
      gsap.to(seal.rotation, { x: Math.PI / 4, duration: 0.8, ease: 'expo.out' });
      gsap.to(seal.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 0.8, ease: 'expo.out' });
    }
  });

  // Animate steam
  function initSteam() {
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 0.4;
      steamPos[i * 3 + 1] = Math.random() * 1;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      steamScale[i] = Math.random() * 0.5 + 0.2;
    }
  }
  initSteam();

  function animate() {
    requestAnimationFrame(animate);

    // Auto rotate
    potGroup.rotation.y += 0.005;
    potGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;

    // Mouse interaction
    potGroup.rotation.y += (targetRotationY - potGroup.rotation.y) * 0.05;
    potGroup.rotation.x += (targetRotationX - potGroup.rotation.x) * 0.05;

    // Steam animation
    const time = Date.now() * 0.001;
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3 + 1] -= 0.015;
      if (steamPos[i * 3 + 1] < 0.8) {
        steamPos[i * 3 + 1] = 2;
        steamPos[i * 3] = (Math.random() - 0.5) * 0.4;
        steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
      steamPos[i * 3] += Math.sin(time + i) * 0.005;
    }
    steamGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();
}

// ==========================================================================
// 11. UNSEAL BUTTON INTERACTION
// ==========================================================================
function initUnseal() {
  const btn = document.getElementById('unsealBtn');
  if (!btn) return;
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn.querySelector('i'), { rotate: 360, duration: 0.8, ease: 'power2.out' });
  });
}

// ==========================================================================
// 12. MOBILE MENU
// ==========================================================================
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

// ==========================================================================
// 13. SCROLL-REVEAL UTILITY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Reveal elements with data-reveal attribute
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });
});
