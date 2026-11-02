/**
 * BRO BIRYANI - ENTERPRISE MERN PLATFORM ENGINE
 * Inspired by:
 * - Restaurant PRD & Tech Stack (Reservations, Modifiers, Ordering Pipeline, Admin CRUD)
 * - Burrito Madre Design System (Editorial Tokens, 30px Pill Geometry, Defined States)
 */

// ==========================================================================
// 1. DATA STORES & DEFAULT STATE
// ==========================================================================

let MENU_ITEMS = [
  {
    id: 'hyd-chicken-dum',
    name: 'Royal Hyderabadi Chicken Dum',
    category: 'hyderabadi',
    price: 380,
    oldPrice: 450,
    spice: 3,
    veg: false,
    portion: 'Serves 1-2 (2 Juicy Bone-in Cuts + 1 Egg)',
    desc: 'The gold standard Nizami recipe. 12-hour marinated chicken layered with 24-month aged basmati, roasted birista, and hand-ground 21-spice potli masala.',
    badge: "Bestseller",
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'luck-gosht-dum',
    name: 'Awadhi Shahi Mutton Dum',
    category: 'lucknowi',
    price: 490,
    oldPrice: 580,
    spice: 1,
    veg: false,
    portion: 'Serves 1-2 (Tender Baby Goat Shank)',
    desc: 'Subtle, aromatic Awadhi royalty. Melt-in-mouth mutton cuts slow-cooked with kewra, sweet mace, green cardamom, and rich saffron-infused cow ghee.',
    badge: "Chef Signature",
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'kolk-spicy-bro',
    name: 'Kolkata Bro Special with Royal Aloo',
    category: 'kolkata',
    price: 360,
    oldPrice: 420,
    spice: 2,
    veg: false,
    portion: 'Serves 1-2 (Tender Meat + Colossal Spiced Aloo + Egg)',
    desc: 'Legendary Kolkata heritage. Slow dum cooked with juicy meat, farm-fresh spiced egg, and the iconic velvety melt-in-mouth potato infused with gravy.',
    badge: "Must Try",
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'veg-shahi-paneer',
    name: 'Royal Malai Paneer Dum Biryani',
    category: 'veg',
    price: 330,
    oldPrice: 390,
    spice: 2,
    veg: true,
    portion: 'Serves 1-2 (Generous Chargrilled Paneer)',
    desc: 'Not a pulao, real dum! Fresh malai paneer cubes marinated in spiced hung curd, layered with saffron basmati, caramelized cashews, and golden raisins.',
    badge: "Pure Veg King",
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'hyd-spicy-mutton',
    name: 'Hyderabadi Ustaad Mutton Dum',
    category: 'hyderabadi',
    price: 520,
    oldPrice: 620,
    spice: 3,
    veg: false,
    portion: 'Serves 1-2 (Prime Mutton Cuts)',
    desc: 'Intense spicy kick featuring crushed black pepper, fiery Guntur red chilies, fresh mint purée, and slow-rendered bone marrow jus.',
    badge: "Fiery Bro",
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sides-burani-raita',
    name: 'Burani Garlic Raita & Mirchi Salan Duo',
    category: 'sides',
    price: 90,
    oldPrice: 130,
    spice: 2,
    veg: true,
    portion: 'Serves 2-3 (250ml each)',
    desc: 'Roasted garlic-infused thick hung curd raita paired with our slow-simmered peanut, sesame, and bhavnagri chili salan gravy.',
    badge: "Essential Side",
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80'
  }
];

// Outlet Directory
const OUTLETS = {
  indiranagar: {
    city: 'Bengaluru',
    name: 'Bro Biryani — Indiranagar Flagship Kitchen',
    address: 'Plot 422, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038',
    hours: '11:30 AM – 3:30 AM',
    radius: '8.5 km Express',
    phone: '+91 98860 99000',
    hubId: 'Hub #01'
  },
  koramangala: {
    city: 'Bengaluru',
    name: 'Bro Biryani — Koramangala Cloud Kitchen',
    address: '80ft Road, 5th Block, Opposite Sony World Signal, Koramangala, Bengaluru - 560095',
    hours: '11:00 AM – 4:00 AM',
    radius: '7.0 km Express',
    phone: '+91 98860 99001',
    hubId: 'Hub #02'
  },
  hsr: {
    city: 'Bengaluru',
    name: 'Bro Biryani — HSR Layout Sector 2 Hub',
    address: '27th Main, Sector 2, HSR Layout, Bengaluru - 560102',
    hours: '11:30 AM – 3:00 AM',
    radius: '9.0 km Express',
    phone: '+91 98860 99002',
    hubId: 'Hub #03'
  },
  jubilee: {
    city: 'Hyderabad',
    name: 'Bro Biryani — Jubilee Hills Heritage Kitchen',
    address: 'Road No. 36, Near Peddamma Temple Metro, Jubilee Hills, Hyderabad - 500033',
    hours: '11:00 AM – 4:30 AM',
    radius: '10.0 km Express',
    phone: '+91 98860 99003',
    hubId: 'Hub #04'
  },
  gachibowli: {
    city: 'Hyderabad',
    name: 'Bro Biryani — Gachibowli IT Corridor Kitchen',
    address: 'Financial District, Near WaveRock, Gachibowli, Hyderabad - 500032',
    hours: '24 Hours Open',
    radius: '12.0 km Express',
    phone: '+91 98860 99004',
    hubId: 'Hub #05'
  },
  bandra: {
    city: 'Mumbai',
    name: 'Bro Biryani — Bandra West Pali Naka Hub',
    address: '16 Pali Hill Road, Bandra West, Mumbai - 400050',
    hours: '11:30 AM – 4:00 AM',
    radius: '7.5 km Express',
    phone: '+91 98860 99005',
    hubId: 'Hub #06'
  }
};

// Application State
let cart = [];
let activeCategory = 'all';
let selectedOutletKey = 'indiranagar';
let activePromo = null; // 'BRO15'
let cartOrderType = 'delivery'; // 'delivery' or 'pickup'
let storeOnline = true; // Admin ordering pause flag
let soundEnabled = false;
let audioCtx = null;
let sizzleNode = null;
let steamParticlesHero = [];
let steamParticlesUnlock = [];

// Customizer Active Item
let customizingItem = null;

// User Profile & Authentication (PRD Data Model)
let currentUser = {
  id: 'usr-101',
  name: 'Aditya Sharma',
  email: 'aditya.sharma@example.com',
  phone: '+91 98860 12345',
  role: 'customer', // 'customer' | 'admin' | 'staff'
  address: '#402, Royal Residency, 12th Main HAL 2nd Stage, Indiranagar, Bengaluru'
};

// Initial Orders (PRD Requirement 7)
let orders = [
  {
    id: '#BRO-88492',
    userId: 'usr-101',
    customerName: 'Aditya Sharma',
    customerPhone: '+91 98860 12345',
    outlet: 'Indiranagar Flagship',
    orderType: 'delivery',
    items: [
      { name: 'Royal Hyderabadi Chicken Dum (Regular)', qty: 1, price: 380, modifiers: 'Spice: Fiery Nizami, +Extra Egg' }
    ],
    address: '#402 Royal Residency, Indiranagar',
    subtotal: 410,
    tax: 21,
    deliveryFee: 39,
    total: 470,
    paymentStatus: 'Paid (UPI)',
    status: 'Preparing', // 'Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled'
    createdAt: '12 mins ago'
  },
  {
    id: '#BRO-88480',
    userId: 'usr-102',
    customerName: 'Kunal Verma',
    customerPhone: '+91 98765 11223',
    outlet: 'Indiranagar Flagship',
    orderType: 'pickup',
    items: [
      { name: 'Awadhi Shahi Mutton Dum (Jumbo Pack)', qty: 1, price: 710, modifiers: 'Spice: Classic Dum, +Extra Birista' },
      { name: 'Burani Garlic Raita Duo', qty: 1, price: 90, modifiers: 'None' }
    ],
    address: 'Counter Pickup (Order #BRO-88480)',
    subtotal: 800,
    tax: 40,
    deliveryFee: 0,
    total: 840,
    paymentStatus: 'Paid (Card)',
    status: 'Ready',
    createdAt: '28 mins ago'
  }
];

// Initial Reservations (PRD Requirement 6)
let reservations = [
  {
    id: '#RES-77291',
    name: 'Sameer Verma',
    email: 'sameer.verma@example.com',
    phone: '+91 98450 99881',
    outlet: 'Indiranagar Flagship',
    date: '2026-10-26',
    timeSlot: '7:30 PM',
    guests: 4,
    specialRequest: 'Corner table, celebrating brother birthday',
    status: 'Confirmed' // 'Confirmed', 'Seated', 'Cancelled', 'No-Show'
  },
  {
    id: '#RES-77292',
    name: 'Priyanka Nair',
    email: 'priyanka.nair@example.com',
    phone: '+91 98110 55443',
    outlet: 'Koramangala 5th Block',
    date: '2026-10-26',
    timeSlot: '8:30 PM',
    guests: 6,
    specialRequest: 'Need 1 high chair for toddler',
    status: 'Confirmed'
  }
];

// Active order being tracked
let activeTrackedOrderId = '#BRO-88492';

// Load stored state
try {
  const savedCart = localStorage.getItem('bro_biryani_cart');
  if (savedCart) cart = JSON.parse(savedCart);

  const savedOrders = localStorage.getItem('bro_biryani_orders');
  if (savedOrders) orders = JSON.parse(savedOrders);

  const savedRes = localStorage.getItem('bro_biryani_reservations');
  if (savedRes) reservations = JSON.parse(savedRes);

  const savedMenu = localStorage.getItem('bro_biryani_menu');
  if (savedMenu) MENU_ITEMS = JSON.parse(savedMenu);
} catch (e) {
  console.warn('LocalStorage error or unavailable');
}

// ==========================================================================
// 2. INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initParallaxSpices();
  initSteamCanvases();
  initPotUnlocking();
  initLayerAnatomy();
  renderMenu();
  initMenuFilters();
  initCartListeners();
  updateCartUI();
  initReviewsSlider();
  initOutletSelector();
  initForms();
  initAudioToggle();
  initReservationSystem();
  initCustomizerListeners();
  initAdminDashboard();
  initUserProfile();
  updateAdminCounters();
});

// ==========================================================================
// 3. STICKY HEADER
// ==========================================================================
function initStickyHeader() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('header-shrunk');
    } else {
      header.classList.remove('header-shrunk');
    }
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Copy promo banner
  const copyPromoBtn = document.getElementById('copy-promo-banner');
  if (copyPromoBtn) {
    copyPromoBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('BRO15');
      showToast('Promo code BRO15 copied! 15% discount ready at checkout.');
    });
  }

  // Header Nav buttons
  document.getElementById('track-order-nav-btn')?.addEventListener('click', openTrackOrderModal);
  document.getElementById('admin-portal-btn')?.addEventListener('click', openAdminModal);
  document.getElementById('auth-nav-btn')?.addEventListener('click', openAuthModal);
}

// ==========================================================================
// 4. PARALLAX SPICES
// ==========================================================================
function initParallaxSpices() {
  const spices = document.querySelectorAll('.spice-item');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    spices.forEach(spice => {
      const speed = parseFloat(spice.dataset.speed || '0.2');
      const yPos = -(scrollY * speed);
      spice.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
    spices.forEach((spice, index) => {
      const factor = (index % 3 + 1) * 0.4;
      spice.style.transform += ` translate(${mouseX * factor}px, ${mouseY * factor}px)`;
    });
  }, { passive: true });
}

// ==========================================================================
// 5. STEAM CANVAS PARTICLES
// ==========================================================================
function initSteamCanvases() {
  const heroCanvas = document.getElementById('hero-steam-canvas');
  const unlockCanvas = document.getElementById('unlock-steam-canvas');

  if (heroCanvas) setupCanvas(heroCanvas, steamParticlesHero, 28, 0.4);
  if (unlockCanvas) setupCanvas(unlockCanvas, steamParticlesUnlock, 45, 0.2);
}

function setupCanvas(canvas, particleArray, maxCount, initialIntensity) {
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.parentElement.clientWidth || 300;
    canvas.height = canvas.parentElement.clientHeight || 300;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < maxCount; i++) {
    particleArray.push({
      x: canvas.width * (0.35 + Math.random() * 0.3),
      y: canvas.height * (0.6 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(1 + Math.random() * 1.5),
      radius: 12 + Math.random() * 18,
      alpha: Math.random() * initialIntensity,
      maxAlpha: 0.15 + Math.random() * 0.25,
      hue: Math.random() > 0.4 ? 40 : 25
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particleArray.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.radius += 0.25;

      if (p.y > canvas.height * 0.5) {
        p.alpha = Math.min(p.alpha + 0.01, p.maxAlpha);
      } else {
        p.alpha = Math.max(p.alpha - 0.008, 0);
      }

      if (p.y < 20 || p.alpha <= 0) {
        p.x = canvas.width * (0.35 + Math.random() * 0.3);
        p.y = canvas.height * (0.65 + Math.random() * 0.2);
        p.radius = 10 + Math.random() * 15;
        p.alpha = 0.01;
      }

      const grad = ctx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, 85%, ${p.alpha})`);
      grad.addColorStop(0.5, `hsla(${p.hue}, 70%, 75%, ${p.alpha * 0.5})`);
      grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }
  render();
}

// ==========================================================================
// 6. POT UNLOCKING
// ==========================================================================
function initPotUnlocking() {
  const slider = document.getElementById('pot-unlock-slider');
  const lid = document.getElementById('handi-lid');
  const seal = document.getElementById('dough-seal-band');
  const sealLabel = document.getElementById('dough-seal-label');
  const statusBadge = document.getElementById('unlock-status-badge');
  const percentageLabel = document.getElementById('slider-percentage');
  const quickCrackBtn = document.getElementById('quick-crack-btn');
  const quickResealBtn = document.getElementById('quick-reseal-btn');

  function updateUnlock(val) {
    const percent = Math.min(Math.max(val, 0), 100);
    slider.value = percent;
    percentageLabel.innerText = `${percent}% Unlocked`;

    const translateY = -(percent * 0.85);
    const rotate = -(percent * 0.16);
    lid.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;

    if (percent > 15) {
      seal.classList.add('cracked');
      sealLabel.innerText = 'Dough Seal Cracked!';
    } else {
      seal.classList.remove('cracked');
      sealLabel.innerText = 'Dough Sealed';
    }

    if (percent === 0) {
      statusBadge.innerText = '100% SEALED';
      statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30';
    } else if (percent < 70) {
      statusBadge.innerText = 'STEAM ESCAPING 🔥';
      statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-black bg-vermilion-500/30 text-vermilion-400 border border-vermilion-500/40 animate-pulse';
    } else {
      statusBadge.innerText = 'AROMA UNLEASHED! ✨';
      statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-black bg-saffron-500/30 text-saffron-400 border border-saffron-500/50';
    }

    steamParticlesUnlock.forEach(p => {
      p.maxAlpha = 0.1 + (percent / 100) * 0.45;
    });

    if (soundEnabled && sizzleNode) {
      const gain = Math.min(percent / 100 * 0.4, 0.4);
      sizzleNode.gain.setValueAtTime(gain, audioCtx.currentTime);
    }
  }

  slider.addEventListener('input', (e) => updateUnlock(parseInt(e.target.value)));

  if (quickCrackBtn) {
    quickCrackBtn.addEventListener('click', () => {
      let current = parseInt(slider.value);
      const interval = setInterval(() => {
        current += 5;
        if (current >= 100) {
          current = 100;
          clearInterval(interval);
        }
        updateUnlock(current);
      }, 16);
      showToast('Pot cracked! Saffron & kewra aromas at 100%.');
    });
  }

  if (quickResealBtn) {
    quickResealBtn.addEventListener('click', () => {
      let current = parseInt(slider.value);
      const interval = setInterval(() => {
        current -= 5;
        if (current <= 0) {
          current = 0;
          clearInterval(interval);
        }
        updateUnlock(current);
      }, 16);
      showToast('Dum pot resealed hermetically with fresh wheat dough.');
    });
  }
}

// ==========================================================================
// 7. LAYER ANATOMY STORY
// ==========================================================================
function initLayerAnatomy() {
  const layerCards = document.querySelectorAll('.layer-card');
  const indicator = document.getElementById('active-layer-indicator');
  const layerVisuals = {
    4: document.getElementById('vis-layer-4'),
    3: document.getElementById('vis-layer-3'),
    2: document.getElementById('vis-layer-2'),
    1: document.getElementById('vis-layer-1'),
  };

  const titles = {
    4: 'LAYER 4: SAFFRON & GIR COW GHEE',
    3: 'LAYER 3: CRISPY BIRISTA & 21-SPICE POTLI',
    2: 'LAYER 2: 12-HR MARINATED TENDER PROTEIN',
    1: 'LAYER 1: 2-YEAR AGED ROYAL BASMATI'
  };

  function selectLayer(num) {
    layerCards.forEach(c => {
      if (parseInt(c.dataset.layer) === num) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    Object.keys(layerVisuals).forEach(k => {
      const vis = layerVisuals[k];
      if (parseInt(k) === num) {
        vis.style.transform = 'scale(1.04) translateX(-4px)';
        vis.style.boxShadow = '0 10px 25px -5px rgba(245, 158, 11, 0.4)';
        vis.style.borderColor = '#F59E0B';
      } else {
        vis.style.transform = 'scale(1)';
        vis.style.boxShadow = 'none';
        vis.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });

    if (indicator) indicator.innerText = titles[num] || `LAYER ${num}`;
  }

  layerCards.forEach(card => {
    card.addEventListener('click', () => selectLayer(parseInt(card.dataset.layer)));
  });

  selectLayer(4);
}

// ==========================================================================
// 8. MENU RENDERING & MODIFIERS (PRD REQ 5 & 7)
// ==========================================================================
function renderMenu() {
  const grid = document.getElementById('menu-grid');
  const emptyState = document.getElementById('menu-empty-state');
  const searchInput = document.getElementById('menu-search-input');
  const dietarySelect = document.getElementById('dietary-select');

  const query = (searchInput?.value || '').toLowerCase().trim();
  const dietary = dietarySelect?.value || 'all';

  const filtered = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(query) || 
                         item.desc.toLowerCase().includes(query) ||
                         item.category.toLowerCase().includes(query);
    const matchesDiet = dietary === 'all' || 
                        (dietary === 'veg' && item.veg) || 
                        (dietary === 'non-veg' && !item.veg);
    return matchesCategory && matchesQuery && matchesDiet;
  });

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = filtered.map(item => {
    const spiceIcons = '🌶️'.repeat(item.spice || 2);
    const vegBadge = item.veg 
      ? `<span class="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> VEG</span>`
      : `<span class="flex items-center gap-1 text-[11px] font-bold text-vermilion-400 bg-vermilion-500/10 border border-vermilion-500/30 px-2.5 py-0.5 rounded-full"><span class="w-2 h-2 rounded-full bg-vermilion-500"></span> NON-VEG</span>`;

    const outOfStockOverlay = !item.isAvailable 
      ? `<div class="absolute inset-0 bg-charcoal-950/85 backdrop-blur-sm z-30 flex items-center justify-center"><span class="px-4 py-1.5 bg-vermilion-700 text-white font-bold rounded-full text-xs">Temporarily Sold Out</span></div>` 
      : '';

    return `
      <div class="menu-card bg-charcoal-900 border border-charcoal-750 rounded-[30px] overflow-hidden flex flex-col group relative">
        ${outOfStockOverlay}
        
        <!-- Dish Thumbnail Container -->
        <div class="relative w-full h-52 overflow-hidden bg-charcoal-800">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover" 
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent"></div>
          
          <div class="absolute top-3 left-3 flex items-center gap-2">
            ${vegBadge}
            ${item.badge ? `<span class="text-[10px] font-black uppercase tracking-wider bg-saffron-500 text-charcoal-950 px-2.5 py-0.5 rounded-full shadow">${item.badge}</span>` : ''}
          </div>

          <div class="absolute top-3 right-3 bg-charcoal-900/90 backdrop-blur-md border border-charcoal-700 px-3 py-1 rounded-full text-xs font-bold text-cream-200 flex items-center gap-1 shadow">
            <span>${spiceIcons}</span>
          </div>

          <div class="absolute bottom-3 left-3 bg-charcoal-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-gray-300 font-medium">
            ${item.portion}
          </div>
        </div>

        <!-- Dish Card Details -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <h3 class="font-display font-black text-xl text-offwhite group-hover:text-cream-200 transition-colors">
              ${item.name}
            </h3>
            <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              ${item.desc}
            </p>
          </div>

          <div class="pt-4 border-t border-charcoal-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Dum Price</span>
              <div class="flex items-baseline gap-2">
                <span class="font-display font-black text-2xl text-saffron-400">₹${item.price}</span>
                ${item.oldPrice ? `<span class="text-xs line-through text-gray-500 font-normal">₹${item.oldPrice}</span>` : ''}
              </div>
            </div>

            <!-- Action buttons: Quick Add & Customize Modal -->
            <div class="flex items-center gap-2">
              <button 
                onclick="openCustomizer('${item.id}')"
                ${!item.isAvailable || !storeOnline ? 'disabled' : ''}
                class="btn-pill btn-pill-outline px-3.5 py-2.5 text-xs font-bold"
                title="Customize portion, spices & add-ons"
              >
                <span>Customize</span>
                <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
              </button>

              <button 
                onclick="quickAddToCart('${item.id}')"
                ${!item.isAvailable || !storeOnline ? 'disabled' : ''}
                class="btn-pill btn-pill-primary px-3.5 py-2.5 text-xs font-black shadow-md"
                aria-label="Add ${item.name} to cart"
              >
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function initMenuFilters() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const searchInput = document.getElementById('menu-search-input');
  const dietarySelect = document.getElementById('dietary-select');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'bg-saffron-500', 'text-charcoal-950', 'shadow-md');
        t.classList.add('bg-charcoal-800', 'text-gray-300');
      });

      tab.classList.add('active', 'bg-saffron-500', 'text-charcoal-950', 'shadow-md');
      tab.classList.remove('bg-charcoal-800', 'text-gray-300');

      activeCategory = tab.dataset.category;
      renderMenu();
    });
  });

  if (searchInput) searchInput.addEventListener('input', renderMenu);
  if (dietarySelect) dietarySelect.addEventListener('change', renderMenu);
}

window.resetMenuFilters = function() {
  activeCategory = 'all';
  const searchInput = document.getElementById('menu-search-input');
  const dietarySelect = document.getElementById('dietary-select');
  if (searchInput) searchInput.value = '';
  if (dietarySelect) dietarySelect.value = 'all';

  document.querySelectorAll('.menu-tab-btn').forEach((t, i) => {
    if (i === 0) {
      t.classList.add('active', 'bg-saffron-500', 'text-charcoal-950', 'shadow-md');
      t.classList.remove('bg-charcoal-800', 'text-gray-300');
    } else {
      t.classList.remove('active', 'bg-saffron-500', 'text-charcoal-950', 'shadow-md');
      t.classList.add('bg-charcoal-800', 'text-gray-300');
    }
  });

  renderMenu();
};

// ==========================================================================
// 9. DISH CUSTOMIZER MODAL (PRD REQ 5 & 7)
// ==========================================================================
window.openCustomizer = function(dishId) {
  const item = MENU_ITEMS.find(m => m.id === dishId);
  if (!item) return;

  customizingItem = item;
  const modal = document.getElementById('dish-customizer-modal');
  document.getElementById('cust-modal-img').src = item.image;
  document.getElementById('cust-modal-title').innerText = item.name;
  document.getElementById('cust-modal-desc').innerText = item.desc;
  
  const vegEl = document.getElementById('cust-modal-veg');
  vegEl.innerText = item.veg ? '100% PURE VEG' : 'AUTHENTIC NON-VEG';
  vegEl.className = item.veg 
    ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
    : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-vermilion-500/20 text-vermilion-400 border border-vermilion-500/30';

  document.getElementById('cust-modal-spice').innerText = '🌶️'.repeat(item.spice || 2);

  // Reset form controls
  document.querySelectorAll('input[name="cust-size"]').forEach((r, i) => r.checked = (i === 0));
  document.querySelectorAll('input[name="cust-spice"]').forEach((r, i) => r.checked = (i === 1));
  document.querySelectorAll('input[name="cust-addon"]').forEach(cb => cb.checked = false);
  document.getElementById('cust-note').value = '';

  recalcCustomizerPrice();
  modal.classList.remove('hidden');
};

window.closeCustomizer = function() {
  document.getElementById('dish-customizer-modal').classList.add('hidden');
  customizingItem = null;
};

function recalcCustomizerPrice() {
  if (!customizingItem) return;
  let total = customizingItem.price;

  // Size option
  const sizeRadio = document.querySelector('input[name="cust-size"]:checked');
  if (sizeRadio && sizeRadio.value === 'jumbo') {
    total += 220;
  }

  // Addons
  document.querySelectorAll('input[name="cust-addon"]:checked').forEach(cb => {
    total += parseInt(cb.dataset.price || '0');
  });

  const priceEl = document.getElementById('cust-modal-total-price');
  if (priceEl) priceEl.innerText = `₹${total}`;
  return total;
}

function initCustomizerListeners() {
  const modal = document.getElementById('dish-customizer-modal');
  modal?.querySelectorAll('input[name="cust-size"], input[name="cust-addon"]').forEach(input => {
    input.addEventListener('change', recalcCustomizerPrice);
  });

  document.getElementById('cust-add-to-cart-btn')?.addEventListener('click', () => {
    if (!customizingItem) return;
    const finalPrice = recalcCustomizerPrice();
    const size = document.querySelector('input[name="cust-size"]:checked')?.value === 'jumbo' ? 'Jumbo Pack (3-4)' : 'Regular (1-2)';
    const spice = document.querySelector('input[name="cust-spice"]:checked')?.value || '2';
    
    const addons = [];
    document.querySelectorAll('input[name="cust-addon"]:checked').forEach(cb => {
      addons.push(cb.parentElement.textContent.trim().split('+')[0].trim());
    });

    const note = document.getElementById('cust-note')?.value.trim();

    const cartItem = {
      id: `${customizingItem.id}-${Date.now()}`,
      baseId: customizingItem.id,
      name: `${customizingItem.name} (${size})`,
      price: finalPrice,
      spice: parseInt(spice),
      veg: customizingItem.veg,
      customizations: {
        size,
        spice,
        addons,
        note
      },
      qty: 1
    };

    cart.push(cartItem);
    saveCart();
    updateCartUI();
    closeCustomizer();
    showToast(`Added custom feast "${cartItem.name}" to cart!`);
  });
}

// Quick Add Without Customizing
window.quickAddToCart = function(dishId) {
  const item = MENU_ITEMS.find(m => m.id === dishId);
  if (!item) return;

  const existing = cart.find(i => i.baseId === item.id && !i.customizations?.addons?.length);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: `${item.id}-${Date.now()}`,
      baseId: item.id,
      name: `${item.name} (Regular)`,
      price: item.price,
      spice: item.spice,
      veg: item.veg,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${item.name}" to cart!`);
};

// ==========================================================================
// 10. CART SYSTEM & PICKUP VS DELIVERY (PRD REQ 7)
// ==========================================================================
window.updateQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  updateCartUI();
};

window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
};

function saveCart() {
  try {
    localStorage.setItem('bro_biryani_cart', JSON.stringify(cart));
  } catch (e) {}
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const countLabel = document.getElementById('drawer-item-count');
  const container = document.getElementById('cart-items-container');
  const emptyView = document.getElementById('cart-empty-view');
  const footer = document.getElementById('cart-footer');

  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  if (badge) badge.innerText = totalCount;
  if (countLabel) countLabel.innerText = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

  if (cart.length === 0) {
    if (container) container.innerHTML = '';
    if (emptyView) emptyView.classList.remove('hidden');
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (emptyView) emptyView.classList.add('hidden');
  if (footer) footer.classList.remove('hidden');

  if (container) {
    container.innerHTML = cart.map(item => {
      const addonsText = item.customizations?.addons?.length 
        ? `<p class="text-[10px] text-gray-400 mt-0.5">• Add-ons: ${item.customizations.addons.join(', ')}</p>` 
        : '';
      const noteText = item.customizations?.note 
        ? `<p class="text-[10px] text-saffron-400 italic">• Note: "${item.customizations.note}"</p>` 
        : '';

      return `
        <div class="bg-charcoal-850 border border-charcoal-750 p-4 rounded-[18px] flex items-start justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full ${item.veg ? 'bg-emerald-400' : 'bg-vermilion-500'}"></span>
              <h4 class="font-bold text-sm text-offwhite">${item.name}</h4>
            </div>
            ${addonsText}
            ${noteText}
            <span class="text-xs font-semibold text-saffron-400 mt-1 block">₹${item.price} each</span>
          </div>

          <div class="flex items-center gap-2 bg-charcoal-900 border border-charcoal-700 px-2 py-1 rounded-full">
            <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-offwhite font-bold text-base">-</button>
            <span class="text-xs font-black text-offwhite px-1.5">${item.qty}</span>
            <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-saffron-400 hover:text-saffron-300 font-bold text-base">+</button>
          </div>

          <button onclick="removeFromCart('${item.id}')" class="text-gray-500 hover:text-vermilion-400 p-1 transition" title="Remove Item">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
    }).join('');
    lucide.createIcons();
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let discount = 0;
  let delivery = cartOrderType === 'pickup' ? 0 : 39;

  if (activePromo === 'BRO15') {
    discount = Math.round(subtotal * 0.15);
  } else if (activePromo === 'FREEDEL' || subtotal >= 800) {
    delivery = 0;
  }

  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal - discount + tax + delivery;

  const billSubtotal = document.getElementById('bill-subtotal');
  const billDiscount = document.getElementById('bill-discount');
  const discountRow = document.getElementById('discount-row');
  const billTax = document.getElementById('bill-tax');
  const billDelivery = document.getElementById('bill-delivery');
  const billGrandTotal = document.getElementById('bill-grand-total');

  if (billSubtotal) billSubtotal.innerText = `₹${subtotal}`;
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      billDiscount.innerText = `-₹${discount}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (billTax) billTax.innerText = `₹${tax}`;
  if (billDelivery) billDelivery.innerText = delivery === 0 ? 'FREE' : `₹${delivery}`;
  if (billGrandTotal) billGrandTotal.innerText = `₹${grandTotal}`;
}

function initCartListeners() {
  const triggerBtn = document.getElementById('cart-drawer-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('cart-promo-input');
  const promoStatus = document.getElementById('promo-status-msg');
  const whatsappCheckoutBtn = document.getElementById('cart-whatsapp-checkout-btn');
  const expressCheckoutBtn = document.getElementById('cart-express-checkout-btn');

  // Pickup vs Delivery mode switch
  const modeDelivery = document.getElementById('cart-mode-delivery');
  const modePickup = document.getElementById('cart-mode-pickup');
  const modeDesc = document.getElementById('cart-mode-desc');

  if (modeDelivery && modePickup) {
    modeDelivery.addEventListener('click', () => {
      cartOrderType = 'delivery';
      modeDelivery.className = 'flex-1 py-1.5 rounded-full font-bold bg-saffron-500 text-charcoal-950 transition flex items-center justify-center gap-1.5';
      modePickup.className = 'flex-1 py-1.5 rounded-full font-bold text-gray-400 hover:text-white transition flex items-center justify-center gap-1.5';
      modeDesc.innerText = '🚀 Piping hot delivery in 30 mins to your address';
      updateCartUI();
    });

    modePickup.addEventListener('click', () => {
      cartOrderType = 'pickup';
      modePickup.className = 'flex-1 py-1.5 rounded-full font-bold bg-saffron-500 text-charcoal-950 transition flex items-center justify-center gap-1.5';
      modeDelivery.className = 'flex-1 py-1.5 rounded-full font-bold text-gray-400 hover:text-white transition flex items-center justify-center gap-1.5';
      modeDesc.innerText = '🛍️ Ready for counter pickup in 20 mins • ₹0 Delivery Fee!';
      updateCartUI();
    });
  }

  window.toggleCart = function(show = true) {
    if (show) {
      overlay.classList.remove('hidden');
      setTimeout(() => {
        overlay.classList.remove('opacity-0');
        drawer.classList.remove('translate-x-full');
      }, 10);
    } else {
      overlay.classList.add('opacity-0');
      drawer.classList.add('translate-x-full');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
  };

  if (triggerBtn) triggerBtn.addEventListener('click', () => toggleCart(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleCart(false));
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) toggleCart(false);
    });
  }

  // Promo Code Validation
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'BRO15') {
        activePromo = 'BRO15';
        promoStatus.innerText = '✓ 15% Bro Discount Applied!';
        promoStatus.className = 'text-[11px] font-bold text-emerald-400 block';
        showToast('Code BRO15 applied! You saved 15%.');
      } else if (code === 'FREEDEL') {
        activePromo = 'FREEDEL';
        promoStatus.innerText = '✓ Free Thermal Express Delivery Applied!';
        promoStatus.className = 'text-[11px] font-bold text-emerald-400 block';
        showToast('Free delivery coupon activated.');
      } else {
        promoStatus.innerText = '✕ Invalid Promo. Use BRO15 for 15% off.';
        promoStatus.className = 'text-[11px] font-bold text-vermilion-400 block';
      }
      updateCartUI();
    });
  }

  // WhatsApp Checkout
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const outlet = OUTLETS[selectedOutletKey] || OUTLETS.indiranagar;
      const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      let discount = activePromo === 'BRO15' ? Math.round(subtotal * 0.15) : 0;
      const tax = Math.round(subtotal * 0.05);
      const delivery = cartOrderType === 'pickup' ? 0 : (activePromo === 'FREEDEL' ? 0 : 39);
      const grandTotal = subtotal - discount + tax + delivery;

      const itemsText = cart.map(i => `• ${i.name} (x${i.qty}) = ₹${i.price * i.qty}`).join('%0A');
      const text = `Hey Bro Biryani!%0A%0AI want to place an order (%2A${cartOrderType.toUpperCase()}%2A) from ${outlet.name}:%0A${itemsText}%0A%0ASubtotal: ₹${subtotal}%0ADiscount: ₹${discount}%0ATax: ₹${tax}%0ADelivery: ₹${delivery}%0AGrand Total: ₹${grandTotal}%0A%0ACustomer: ${currentUser.name} (${currentUser.phone})%0APlease confirm my order!`;

      window.open(`https://wa.me/919886099000?text=${text}`, '_blank');
      toggleCart(false);
    });
  }

  // Express Checkout Trigger
  if (expressCheckoutBtn) {
    expressCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const outlet = OUTLETS[selectedOutletKey] || OUTLETS.indiranagar;
      const grandTotalEl = document.getElementById('bill-grand-total');
      const newOrderId = '#BRO-' + Math.floor(10000 + Math.random() * 90000);

      // Create new order record
      const newOrder = {
        id: newOrderId,
        userId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        outlet: outlet.city + ' — ' + outlet.name.split('—')[1],
        orderType: cartOrderType,
        items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price, modifiers: c.customizations?.addons?.join(', ') || 'Standard' })),
        address: cartOrderType === 'delivery' ? currentUser.address : `Counter Pickup at ${outlet.name.split('—')[1]}`,
        subtotal: cart.reduce((sum, i) => sum + (i.price * i.qty), 0),
        tax: Math.round(cart.reduce((sum, i) => sum + (i.price * i.qty), 0) * 0.05),
        deliveryFee: cartOrderType === 'pickup' ? 0 : 39,
        total: parseInt(grandTotalEl.innerText.replace('₹', '')),
        paymentStatus: 'Paid (Prepaid)',
        status: 'Placed',
        createdAt: 'Just now'
      };

      orders.unshift(newOrder);
      try {
        localStorage.setItem('bro_biryani_orders', JSON.stringify(orders));
      } catch (e) {}

      activeTrackedOrderId = newOrderId;

      document.getElementById('confirmed-outlet').innerText = newOrder.outlet;
      document.getElementById('confirmed-amount').innerText = grandTotalEl ? grandTotalEl.innerText : '₹0';
      document.getElementById('confirmed-order-id').innerText = newOrderId;
      document.getElementById('confirmed-type').innerText = cartOrderType === 'delivery' ? 'Express Delivery (32 Mins)' : 'Self Pickup (Ready in 20 Mins)';

      toggleCart(false);
      document.getElementById('checkout-modal').classList.remove('hidden');

      // Clear Cart
      cart = [];
      saveCart();
      updateCartUI();
      updateAdminOrdersList();
      updateAdminCounters();
    });
  }
}

window.closeCheckoutModal = function() {
  document.getElementById('checkout-modal').classList.add('hidden');
};

// ==========================================================================
// 11. TABLE RESERVATIONS ENGINE (PRD REQUIREMENT 6)
// ==========================================================================
function initReservationSystem() {
  const form = document.getElementById('table-reservation-form');
  const dateInput = document.getElementById('res-date');
  const slotButtons = document.querySelectorAll('.time-slot-btn');
  const slotDisplay = document.getElementById('selected-slot-display');

  // Set default date to today or tomorrow
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Time slot selection
  let selectedTimeSlot = '7:30 PM';
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeSlot = btn.dataset.time;
      if (slotDisplay) slotDisplay.innerText = `${selectedTimeSlot} (${selectedTimeSlot.includes('PM') && parseInt(selectedTimeSlot) > 6 ? 'Dinner Slot' : 'Lunch Slot'})`;
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const outletVal = document.getElementById('res-outlet').value;
      const guestsVal = document.getElementById('res-guests').value;
      const dateVal = document.getElementById('res-date').value;
      const nameVal = document.getElementById('res-name').value.trim();
      const emailVal = document.getElementById('res-email').value.trim();
      const phoneVal = document.getElementById('res-phone').value.trim();
      const specialVal = document.getElementById('res-special').value.trim();

      const newBookingId = '#RES-' + Math.floor(70000 + Math.random() * 20000);

      const newBooking = {
        id: newBookingId,
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        outlet: OUTLETS[outletVal]?.name || 'Indiranagar Flagship',
        date: dateVal,
        timeSlot: selectedTimeSlot,
        guests: parseInt(guestsVal),
        specialRequest: specialVal || 'None',
        status: 'Confirmed'
      };

      reservations.unshift(newBooking);
      try {
        localStorage.setItem('bro_biryani_reservations', JSON.stringify(reservations));
      } catch (e) {}

      updateAdminReservationsList();
      updateAdminCounters();

      // Show confirmation toast & alert
      showToast(`🎉 Reservation ${newBookingId} Confirmed! We look forward to hosting you on ${dateVal}.`);
      alert(`🎉 TABLE CONFIRMED!\n\nBooking ID: ${newBookingId}\nGuests: ${guestsVal} Bros\nDate: ${dateVal} at ${selectedTimeSlot}\nBranch: ${newBooking.outlet}\n\nA confirmation SMS has been dispatched to ${phoneVal}.`);
      form.reset();
    });
  }
}

window.openReservationModal = function() {
  const target = document.getElementById('reservations-section');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
};

window.lookupReservationModal = function() {
  const code = prompt('Enter your 8-digit Reservation Code or Phone Number:');
  if (!code) return;

  const found = reservations.find(r => r.id.toLowerCase().includes(code.toLowerCase()) || r.phone.includes(code));
  if (found) {
    const cancelPrompt = confirm(`Booking Found!\n\nID: ${found.id}\nGuest: ${found.name}\nDate: ${found.date} at ${found.timeSlot}\nGuests: ${found.guests}\nStatus: ${found.status}\n\nDo you want to cancel this reservation?`);
    if (cancelPrompt) {
      found.status = 'Cancelled';
      showToast(`Reservation ${found.id} has been cancelled.`);
      updateAdminReservationsList();
    }
  } else {
    alert('No active reservation matching that code was found.');
  }
};

// ==========================================================================
// 12. LIVE ORDER TRACKING PIPELINE (PRD REQ 7 & 10)
// ==========================================================================
window.openTrackOrderModal = function() {
  const modal = document.getElementById('order-tracking-modal');
  updateTrackingUI();
  modal?.classList.remove('hidden');
};

window.closeTrackOrderModal = function() {
  document.getElementById('order-tracking-modal')?.classList.add('hidden');
};

function updateTrackingUI() {
  const activeOrder = orders.find(o => o.id === activeTrackedOrderId) || orders[0];
  if (!activeOrder) return;

  const titleEl = document.getElementById('tracking-order-title');
  const subEl = document.getElementById('tracking-order-subtitle');
  const badgeEl = document.getElementById('tracking-status-badge');
  const progressEl = document.getElementById('pipeline-progress-bar');

  if (titleEl) titleEl.innerText = `Tracking Order ${activeOrder.id}`;
  if (subEl) subEl.innerText = `${activeOrder.outlet} • ${activeOrder.orderType.toUpperCase()}`;

  const stages = ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Completed'];
  let currentStageIndex = stages.indexOf(activeOrder.status);
  if (currentStageIndex === -1) currentStageIndex = 2;

  // Update progress bar width
  const progressPercent = Math.min((currentStageIndex / (stages.length - 1)) * 100, 100);
  if (progressEl) progressEl.style.width = `${progressPercent}%`;

  if (badgeEl) {
    badgeEl.innerText = `Status: ${activeOrder.status}`;
  }

  // Update step nodes
  for (let i = 1; i <= 6; i++) {
    const stepNode = document.getElementById(`pipe-step-${i}`);
    if (!stepNode) continue;

    stepNode.className = 'relative z-10 text-center pipeline-step';
    const dot = stepNode.querySelector('.step-dot');

    if (i - 1 < currentStageIndex) {
      stepNode.classList.add('completed');
      if (dot) {
        dot.innerText = '✓';
        dot.className = 'step-dot w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold mx-auto';
      }
    } else if (i - 1 === currentStageIndex) {
      stepNode.classList.add('active');
      if (dot) {
        dot.innerText = i;
        dot.className = 'step-dot w-7 h-7 rounded-full bg-saffron-500 text-charcoal-950 flex items-center justify-center text-xs font-bold mx-auto';
      }
    } else {
      if (dot) {
        dot.innerText = i;
        dot.className = 'step-dot w-7 h-7 rounded-full bg-charcoal-800 border border-charcoal-700 text-gray-400 flex items-center justify-center text-xs font-bold mx-auto';
      }
    }
  }
}

window.advanceOrderStatusMock = function() {
  const activeOrder = orders.find(o => o.id === activeTrackedOrderId) || orders[0];
  if (!activeOrder) return;

  const sequence = ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Completed'];
  const currentIndex = sequence.indexOf(activeOrder.status);

  if (currentIndex < sequence.length - 1) {
    activeOrder.status = sequence[currentIndex + 1];
    showToast(`Order status updated to: ${activeOrder.status}`);
  } else {
    activeOrder.status = 'Placed';
    showToast('Simulation reset back to "Placed"');
  }

  updateTrackingUI();
  updateAdminOrdersList();
};

// ==========================================================================
// 13. CUSTOMER PROFILE & AUTHENTICATION (PRD REQ 5)
// ==========================================================================
function initUserProfile() {
  const historyContainer = document.getElementById('order-history-list');
  if (!historyContainer) return;

  historyContainer.innerHTML = orders.map(ord => `
    <div class="bg-charcoal-900 border border-charcoal-750 p-3 rounded-[14px] flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-offwhite">${ord.id}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full ${ord.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-saffron-500/20 text-saffron-400'} font-bold">${ord.status}</span>
        </div>
        <p class="text-[11px] text-gray-400 mt-0.5">${ord.items.map(i => i.name).join(', ')} • ₹${ord.total}</p>
      </div>

      <button onclick="reorderPrevious('${ord.id}')" class="btn-pill btn-pill-outline px-3 py-1 text-[11px] font-bold">
        Reorder
      </button>
    </div>
  `).join('');

  // Role simulation buttons
  document.querySelectorAll('.role-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-switch-btn').forEach(b => {
        b.classList.remove('active', 'bg-saffron-500', 'text-charcoal-950');
        b.classList.add('text-gray-400');
      });
      btn.classList.add('active', 'bg-saffron-500', 'text-charcoal-950');
      btn.classList.remove('text-gray-400');

      if (btn.dataset.role === 'admin') {
        currentUser.role = 'admin';
        document.getElementById('user-display-name').innerText = 'Admin / Kitchen Master';
        document.getElementById('user-display-email').innerText = 'admin@brobiryani.com';
        showToast('Switched role to Admin & Kitchen Staff.');
      } else {
        currentUser.role = 'customer';
        document.getElementById('user-display-name').innerText = 'Aditya Sharma';
        document.getElementById('user-display-email').innerText = 'aditya.sharma@example.com';
        showToast('Switched role to Customer.');
      }
    });
  });
}

window.openAuthModal = function() {
  document.getElementById('auth-profile-modal')?.classList.remove('hidden');
};

window.closeAuthModal = function() {
  document.getElementById('auth-profile-modal')?.classList.add('hidden');
};

window.reorderPrevious = function(orderId) {
  const prevOrder = orders.find(o => o.id === orderId);
  if (!prevOrder) return;

  prevOrder.items.forEach(item => {
    cart.push({
      id: `reorder-${Date.now()}-${Math.random()}`,
      name: item.name,
      price: item.price,
      qty: item.qty,
      spice: 2,
      veg: false
    });
  });

  saveCart();
  updateCartUI();
  closeAuthModal();
  toggleCart(true);
  showToast(`Items from order ${orderId} added to your feast!`);
};

// ==========================================================================
// 14. ADMIN & KITCHEN OPERATIONS PORTAL (PRD REQ 5, ADMIN CRUD)
// ==========================================================================
function initAdminDashboard() {
  const tabs = document.querySelectorAll('.admin-nav-tab');
  const contents = {
    orders: document.getElementById('admin-tab-orders'),
    reservations: document.getElementById('admin-tab-reservations'),
    menu: document.getElementById('admin-tab-menu'),
    analytics: document.getElementById('admin-tab-analytics')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      Object.keys(contents).forEach(k => {
        if (k === tab.dataset.tab) {
          contents[k]?.classList.remove('hidden');
        } else {
          contents[k]?.classList.add('hidden');
        }
      });
    });
  });

  updateAdminOrdersList();
  updateAdminReservationsList();
  updateAdminMenuList();

  // Add Dish Form CRUD
  const addDishForm = document.getElementById('admin-add-dish-form');
  if (addDishForm) {
    addDishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('adm-dish-name').value.trim();
      const cat = document.getElementById('adm-dish-cat').value;
      const price = parseInt(document.getElementById('adm-dish-price').value);
      const desc = document.getElementById('adm-dish-desc').value.trim();
      const veg = document.getElementById('adm-dish-veg').value === 'true';

      const newDish = {
        id: `custom-dish-${Date.now()}`,
        name,
        category: cat,
        price,
        oldPrice: price + 60,
        spice: 2,
        veg,
        portion: 'Serves 1-2 (Fresh Dum Handi)',
        desc,
        badge: 'New Addition',
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80'
      };

      MENU_ITEMS.unshift(newDish);
      try {
        localStorage.setItem('bro_biryani_menu', JSON.stringify(MENU_ITEMS));
      } catch (e) {}

      renderMenu();
      updateAdminMenuList();
      addDishForm.reset();
      showToast(`Successfully added "${name}" to the live menu!`);
    });
  }
}

window.openAdminModal = function() {
  updateAdminOrdersList();
  updateAdminReservationsList();
  updateAdminMenuList();
  updateAdminCounters();
  document.getElementById('admin-dashboard-modal')?.classList.remove('hidden');
};

window.closeAdminModal = function() {
  document.getElementById('admin-dashboard-modal')?.classList.add('hidden');
};

window.toggleStoreOnline = function() {
  storeOnline = !storeOnline;
  const indicator = document.getElementById('admin-store-indicator');
  const text = document.getElementById('admin-store-status-text');

  if (storeOnline) {
    indicator.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
    text.innerText = 'Store: Accepting Orders';
    showToast('Kitchen store is now OPEN for online orders.');
  } else {
    indicator.className = 'w-2.5 h-2.5 rounded-full bg-vermilion-500';
    text.innerText = 'Store: Ordering Paused';
    showToast('Kitchen store is now PAUSED due to high demand rush.');
  }

  renderMenu();
};

function updateAdminOrdersList() {
  const container = document.getElementById('admin-orders-list');
  if (!container) return;

  container.innerHTML = orders.map(ord => `
    <div class="bg-charcoal-850 p-4 rounded-[18px] border border-charcoal-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-offwhite">${ord.id}</span>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-saffron-500/20 text-saffron-400 font-bold uppercase">${ord.orderType}</span>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-charcoal-700 text-cream-200 font-semibold">${ord.status}</span>
        </div>
        <p class="text-xs text-gray-300 font-semibold">${ord.customerName} (${ord.customerPhone})</p>
        <p class="text-[11px] text-gray-400">${ord.items.map(i => `${i.name} x${i.qty}`).join(', ')} • <strong>Total: ₹${ord.total}</strong> (${ord.paymentStatus})</p>
      </div>

      <!-- Action status buttons -->
      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="setOrderStatus('${ord.id}', 'Confirmed')" class="px-2.5 py-1.5 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-offwhite text-[11px] font-bold">Confirm</button>
        <button onclick="setOrderStatus('${ord.id}', 'Preparing')" class="px-2.5 py-1.5 rounded-lg bg-saffron-500/20 hover:bg-saffron-500/30 text-saffron-400 text-[11px] font-bold">Cook Dum</button>
        <button onclick="setOrderStatus('${ord.id}', 'Ready')" class="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold">Mark Ready</button>
        <button onclick="setOrderStatus('${ord.id}', 'Out for Delivery')" class="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[11px] font-bold">Dispatch</button>
        <button onclick="setOrderStatus('${ord.id}', 'Completed')" class="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-charcoal-950 text-[11px] font-black">Complete</button>
      </div>
    </div>
  `).join('');
}

window.setOrderStatus = function(orderId, newStatus) {
  const ord = orders.find(o => o.id === orderId);
  if (!ord) return;

  ord.status = newStatus;
  try {
    localStorage.setItem('bro_biryani_orders', JSON.stringify(orders));
  } catch (e) {}

  showToast(`Order ${orderId} marked as "${newStatus}"`);
  updateAdminOrdersList();
  updateTrackingUI();
  updateAdminCounters();
};

function updateAdminReservationsList() {
  const container = document.getElementById('admin-reservations-list');
  if (!container) return;

  container.innerHTML = reservations.map(res => `
    <div class="bg-charcoal-850 p-4 rounded-[18px] border border-charcoal-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-offwhite">${res.id}</span>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase">${res.status}</span>
          <span class="text-[10px] text-gray-400 font-semibold">${res.outlet}</span>
        </div>
        <p class="text-xs text-gray-300 font-bold">${res.name} • ${res.guests} Guests • ${res.date} at ${res.timeSlot}</p>
        <p class="text-[11px] text-gray-400">Phone: ${res.phone} | Note: "${res.specialRequest}"</p>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="setReservationStatus('${res.id}', 'Seated')" class="px-3 py-1.5 rounded-lg bg-emerald-500 text-charcoal-950 text-[11px] font-bold">Seat Guests</button>
        <button onclick="setReservationStatus('${res.id}', 'Cancelled')" class="px-3 py-1.5 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-vermilion-400 text-[11px] font-bold">Cancel</button>
      </div>
    </div>
  `).join('');
}

window.setReservationStatus = function(resId, status) {
  const res = reservations.find(r => r.id === resId);
  if (!res) return;

  res.status = status;
  try {
    localStorage.setItem('bro_biryani_reservations', JSON.stringify(reservations));
  } catch (e) {}

  showToast(`Reservation ${resId} marked as ${status}`);
  updateAdminReservationsList();
  updateAdminCounters();
};

function updateAdminMenuList() {
  const container = document.getElementById('admin-menu-list');
  if (!container) return;

  container.innerHTML = MENU_ITEMS.map(item => `
    <div class="bg-charcoal-850 p-3.5 rounded-[16px] border border-charcoal-750 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover">
        <div>
          <h5 class="font-bold text-xs text-offwhite">${item.name}</h5>
          <span class="text-[11px] text-saffron-400 font-semibold">₹${item.price} • ${item.category}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="toggleItemStock('${item.id}')" class="px-3 py-1 rounded-full text-xs font-bold ${item.isAvailable ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-vermilion-500/20 text-vermilion-400 border border-vermilion-500/40'}">
          ${item.isAvailable ? 'In Stock' : 'Out of Stock'}
        </button>

        <button onclick="deleteMenuItem('${item.id}')" class="text-gray-500 hover:text-vermilion-400 p-1">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

window.toggleItemStock = function(dishId) {
  const item = MENU_ITEMS.find(m => m.id === dishId);
  if (!item) return;

  item.isAvailable = !item.isAvailable;
  try {
    localStorage.setItem('bro_biryani_menu', JSON.stringify(MENU_ITEMS));
  } catch (e) {}

  showToast(`"${item.name}" is now ${item.isAvailable ? 'IN STOCK' : 'OUT OF STOCK'}`);
  updateAdminMenuList();
  renderMenu();
};

window.deleteMenuItem = function(dishId) {
  if (!confirm('Are you sure you want to remove this dish from the menu?')) return;
  MENU_ITEMS = MENU_ITEMS.filter(m => m.id !== dishId);
  try {
    localStorage.setItem('bro_biryani_menu', JSON.stringify(MENU_ITEMS));
  } catch (e) {}

  updateAdminMenuList();
  renderMenu();
  showToast('Dish removed from catalog.');
};

function updateAdminCounters() {
  const ordEl = document.getElementById('admin-orders-count');
  const resEl = document.getElementById('admin-res-count');
  if (ordEl) ordEl.innerText = orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length;
  if (resEl) resEl.innerText = reservations.filter(r => r.status === 'Confirmed').length;
}

// ==========================================================================
// 15. REVIEWS SLIDER
// ==========================================================================
function initReviewsSlider() {
  const track = document.getElementById('reviews-slider-track');
  const prevBtn = document.getElementById('prev-review-btn');
  const nextBtn = document.getElementById('next-review-btn');
  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.children;
  const total = cards.length;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % (total - 1);
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + (total - 1)) % (total - 1);
    updateSlider();
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % (total - 1);
    updateSlider();
  }, 6000);

  window.addEventListener('resize', updateSlider);
}

// ==========================================================================
// 16. OUTLETS SELECTOR & WHATSAPP GENERATOR
// ==========================================================================
function initOutletSelector() {
  const buttons = document.querySelectorAll('.outlet-btn');
  const nameEl = document.getElementById('outlet-name');
  const addressEl = document.getElementById('outlet-address');
  const whatsappBtn = document.getElementById('whatsapp-order-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active', 'bg-saffron-500', 'text-charcoal-950');
        b.classList.add('bg-charcoal-800', 'text-gray-300');
      });

      btn.classList.add('active', 'bg-saffron-500', 'text-charcoal-950');
      btn.classList.remove('bg-charcoal-800', 'text-gray-300');

      const key = btn.dataset.outlet;
      selectedOutletKey = key;
      const outlet = OUTLETS[key];

      if (outlet) {
        if (nameEl) nameEl.innerText = outlet.name;
        if (addressEl) addressEl.innerText = outlet.address;
        if (whatsappBtn) {
          whatsappBtn.href = `https://wa.me/919886099000?text=Hey%20Bro%20Biryani!%20I%20want%20to%20order%20from%20your%20${encodeURIComponent(outlet.name)}%20hub.`;
        }
      }
    });
  });
}

// ==========================================================================
// 17. FORMS & NEWSLETTER
// ==========================================================================
function initForms() {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const partyForm = document.getElementById('party-booking-form');
  const partyConfirm = document.getElementById('booking-confirmation-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (!email) return;
      showToast(`Welcome to the Bro Circle! Your code is BRO15 for 15% off.`);
      newsletterEmail.value = '';
    });
  }

  if (partyForm) {
    partyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      partyConfirm.classList.remove('hidden');
      partyForm.reset();
      showToast('Party inquiry submitted! Expect a WhatsApp ping in 10 mins.');
    });
  }
}

// ==========================================================================
// 18. SYNTHESIZED WEB AUDIO DUM SIZZLE
// ==========================================================================
function initAudioToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundOnIcon = soundBtn?.querySelector('.sound-on-icon');
  const soundOffIcon = soundBtn?.querySelector('.sound-off-icon');

  function startSizzleSound() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const bufferSize = audioCtx.sampleRate * 2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 1.2;

      sizzleNode = audioCtx.createGain();
      sizzleNode.gain.value = 0.15;

      noise.connect(filter);
      filter.connect(sizzleNode);
      sizzleNode.connect(audioCtx.destination);
      noise.start();
    } catch (e) {
      console.warn('AudioContext not supported');
    }
  }

  function stopSizzleSound() {
    if (sizzleNode && audioCtx) {
      sizzleNode.gain.setValueAtTime(0, audioCtx.currentTime);
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundOnIcon?.classList.remove('hidden');
        soundOffIcon?.classList.add('hidden');
        startSizzleSound();
        showToast('Dum charcoal sizzle sound enabled 🔥');
      } else {
        soundOnIcon?.classList.add('hidden');
        soundOffIcon?.classList.remove('hidden');
        stopSizzleSound();
        showToast('Sound muted');
      }
    });
  }
}

// ==========================================================================
// 19. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg bg-charcoal-850 border border-saffron-500/50 text-offwhite text-xs font-bold py-3 px-4 rounded-full shadow-2xl flex items-center gap-2.5 backdrop-blur-md max-w-sm pointer-events-auto';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-saffron-500 animate-ping shrink-0"></span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('dismissing');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
