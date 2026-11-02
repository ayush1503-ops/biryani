/**
 * BRO BIRYANI — ORDERING PLATFORM
 * Data, cart, reservations, menu rendering, modals.
 */

// ==========================================================================
// 1. DATA
// ==========================================================================

const MENU_ITEMS = [
  {
    id: 'hyd-chicken-dum',
    name: 'Royal Hyderabadi Chicken Dum',
    category: 'hyderabadi',
    price: 380,
    oldPrice: 450,
    spice: 3,
    veg: false,
    portion: 'Serves 1-2',
    desc: '12-hour marinated chicken layered with 24-month aged basmati, roasted birista, and 21-spice potli masala.',
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
    portion: 'Serves 1-2',
    desc: 'Tender baby goat shank slow-cooked with kewra, mace, green cardamom, and saffron-infused cow ghee.',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'kolk-spicy-bro',
    name: 'Kolkata Special with Royal Aloo',
    category: 'kolkata',
    price: 360,
    oldPrice: 420,
    spice: 2,
    veg: false,
    portion: 'Serves 1-2',
    desc: 'Slow dum cooked with meat, spiced egg, and velvety melt-in-mouth potato infused with gravy.',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'veg-shahi-paneer',
    name: 'Royal Malai Paneer Dum',
    category: 'veg',
    price: 330,
    oldPrice: 390,
    spice: 2,
    veg: true,
    portion: 'Serves 1-2',
    desc: 'Fresh malai paneer layered with saffron basmati, caramelized cashews, and golden raisins.',
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
    portion: 'Serves 1-2',
    desc: 'Crushed black pepper, Guntur chilies, mint purée, and bone marrow jus.',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sides-burani-raita',
    name: 'Burani Garlic Raita & Mirchi Salan',
    category: 'sides',
    price: 90,
    oldPrice: 130,
    spice: 2,
    veg: true,
    portion: 'Serves 2-3',
    desc: 'Roasted garlic hung curd raita with peanut, sesame, and bhavnagri chili salan.',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80'
  }
];

const OUTLETS = {
  indiranagar: {
    city: 'Bengaluru',
    name: 'Bro Biryani — Indiranagar',
    address: 'Plot 422, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038',
    hours: '11:30 AM – 3:30 AM',
    phone: '+91 98860 99000'
  },
  koramangala: {
    city: 'Bengaluru',
    name: 'Bro Biryani — Koramangala',
    address: '80ft Road, 5th Block, Koramangala, Bengaluru - 560095',
    hours: '11:00 AM – 4:00 AM',
    phone: '+91 98860 99001'
  },
  hsr: {
    city: 'Bengaluru',
    name: 'Bro Biryani — HSR Layout',
    address: '27th Main, Sector 2, HSR Layout, Bengaluru - 560102',
    hours: '11:30 AM – 3:00 AM',
    phone: '+91 98860 99002'
  },
  jubilee: {
    city: 'Hyderabad',
    name: 'Bro Biryani — Jubilee Hills',
    address: 'Road No. 36, Near Peddamma Temple Metro, Jubilee Hills, Hyderabad - 500033',
    hours: '11:00 AM – 4:30 AM',
    phone: '+91 98860 99003'
  },
  gachibowli: {
    city: 'Hyderabad',
    name: 'Bro Biryani — Gachibowli',
    address: 'Financial District, Near WaveRock, Gachibowli, Hyderabad - 500032',
    hours: '24 Hours Open',
    phone: '+91 98860 99004'
  },
  bandra: {
    city: 'Mumbai',
    name: 'Bro Biryani — Bandra West',
    address: '16 Pali Hill Road, Bandra West, Mumbai - 400050',
    hours: '11:30 AM – 4:00 AM',
    phone: '+91 98860 99005'
  }
};

let cart = [];
let activeCategory = 'all';
let selectedOutletKey = 'indiranagar';
let activePromo = null;
let cartOrderType = 'delivery';
let storeOnline = true;
let currentUser = {
  id: 'usr-101',
  name: 'Aditya Sharma',
  email: 'aditya@example.com',
  phone: '+91 98860 12345',
  role: 'customer',
  address: '#402, Royal Residency, 12th Main HAL 2nd Stage, Indiranagar, Bengaluru'
};

let orders = [
  {
    id: '#BRO-88492',
    userId: 'usr-101',
    customerName: 'Aditya Sharma',
    customerPhone: '+91 98860 12345',
    outlet: 'Indiranagar',
    orderType: 'delivery',
    items: [{ name: 'Royal Hyderabadi Chicken Dum (Regular)', qty: 1, price: 380, modifiers: 'Spice: Hot, +Extra Egg' }],
    address: '#402 Royal Residency, Indiranagar',
    subtotal: 410,
    tax: 21,
    deliveryFee: 39,
    total: 470,
    paymentStatus: 'Paid (UPI)',
    status: 'Preparing',
    createdAt: '12 mins ago'
  }
];

let reservations = [];
let activeTrackedOrderId = '#BRO-88492';
let customizingItem = null;

try {
  const savedCart = localStorage.getItem('bro_biryani_cart');
  if (savedCart) cart = JSON.parse(savedCart);
  const savedOrders = localStorage.getItem('bro_biryani_orders');
  if (savedOrders) orders = JSON.parse(savedOrders);
  const savedRes = localStorage.getItem('bro_biryani_reservations');
  if (savedRes) reservations = JSON.parse(savedRes);
} catch (e) {}

// ==========================================================================
// 2. MENU
// ==========================================================================

function spiceLabel(item) {
  const labels = { 1: 'Mild', 2: 'Medium', 3: 'Hot' };
  return labels[item.spice] || 'Medium';
}

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
                         item.desc.toLowerCase().includes(query);
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

  grid.innerHTML = filtered.map(item => `
    <article class="menu-card border border-border rounded-[24px] overflow-hidden flex flex-col group bg-surface/5">
      <div class="relative h-48 overflow-hidden bg-surface">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition duration-500">
        <div class="absolute top-3 left-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full ${item.veg ? 'bg-emerald-500' : 'bg-vermilion-500'}"></span>
          <span class="text-[10px] font-bold uppercase tracking-wider ${item.veg ? 'text-emerald-400' : 'text-vermilion-400'} bg-${item.veg ? 'emerald' : 'vermilion'}-500/10 px-2 py-0.5 rounded-full border border-${item.veg ? 'emerald' : 'vermilion'}-500/20">${item.veg ? 'VEG' : 'NON-VEG'}</span>
        </div>
        <div class="absolute top-3 right-3 text-[10px] font-bold text-saffron bg-saffron/10 px-2.5 py-0.5 rounded-full border border-saffron/20">${spiceLabel(item)}</div>
      </div>
      <div class="p-5 flex-1 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-display font-bold text-lg text-offwhite">${item.name}</h3>
          <span class="text-xs font-bold text-saffron">₹${item.price}</span>
        </div>
        <p class="text-muted text-sm mb-4 flex-1 leading-relaxed">${item.desc}</p>
        <p class="text-xs text-offwhite/60 mb-4">${item.portion}</p>
        <div class="mt-auto flex items-center justify-between gap-3">
          <button onclick="openCustomizer('${item.id}')" ${!item.isAvailable || !storeOnline ? 'disabled' : ''} class="flex-1 btn-outline text-xs font-bold py-2">Customize</button>
          <button onclick="quickAddToCart('${item.id}')" ${!item.isAvailable || !storeOnline ? 'disabled' : ''} class="btn-primary text-xs font-bold py-2 px-4">Add</button>
        </div>
      </div>
    </article>
  `).join('');

  lucide.createIcons();
}

function initMenuFilters() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const searchInput = document.getElementById('menu-search-input');
  const dietarySelect = document.getElementById('dietary-select');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'bg-saffron', 'text-ink');
        t.classList.add('text-muted');
      });
      tab.classList.add('active', 'bg-saffron', 'text-ink');
      tab.classList.remove('text-muted');
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
      t.classList.add('active', 'bg-saffron', 'text-ink');
      t.classList.remove('text-muted');
    } else {
      t.classList.remove('active', 'bg-saffron', 'text-ink');
      t.classList.add('text-muted');
    }
  });
  renderMenu();
};

// ==========================================================================
// 3. CUSTOMIZER
// ==========================================================================

window.openCustomizer = function(dishId) {
  const item = MENU_ITEMS.find(m => m.id === dishId);
  if (!item) return;
  customizingItem = item;

  document.getElementById('cust-modal-img').src = item.image;
  document.getElementById('cust-modal-title').innerText = item.name;
  document.getElementById('cust-modal-desc').innerText = item.desc;

  const vegEl = document.getElementById('cust-modal-veg');
  vegEl.innerText = item.veg ? 'VEG' : 'NON-VEG';
  vegEl.className = item.veg
    ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-vermilion-500/20 text-vermilion-400 border border-vermilion-500/30';

  document.getElementById('cust-modal-spice').innerText = spiceLabel(item);

  document.querySelectorAll('input[name="cust-size"]').forEach((r, i) => r.checked = (i === 0));
  document.querySelectorAll('input[name="cust-addon"]').forEach(cb => cb.checked = false);
  document.getElementById('cust-note')?.value = '';

  recalcCustomizerPrice();
  document.getElementById('dish-customizer-modal').classList.remove('hidden');
};

window.closeCustomizer = function() {
  document.getElementById('dish-customizer-modal').classList.add('hidden');
  customizingItem = null;
};

function recalcCustomizerPrice() {
  if (!customizingItem) return 0;
  let total = customizingItem.price;
  const sizeRadio = document.querySelector('input[name="cust-size"]:checked');
  if (sizeRadio && sizeRadio.value === 'jumbo') total += 220;
  document.querySelectorAll('input[name="cust-addon"]:checked').forEach(cb => {
    total += parseInt(cb.dataset.price || '0');
  });
  return total;
}

function initCustomizerListeners() {
  const modal = document.getElementById('dish-customizer-modal');
  modal?.querySelectorAll('input[name="cust-size"], input[name="cust-addon"]').forEach(input => {
    input.addEventListener('change', () => {
      const el = document.getElementById('cust-modal-total-price');
      if (el) el.innerText = `₹${recalcCustomizerPrice()}`;
    });
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
      customizations: { size, spice, addons, note },
      qty: 1
    };

    cart.push(cartItem);
    saveCart();
    updateCartUI();
    closeCustomizer();
    showToast(`Added "${cartItem.name}" to cart.`);
  });
}

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
  showToast(`Added "${item.name}" to cart.`);
};

// ==========================================================================
// 4. CART
// ==========================================================================

window.updateQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
};

window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
};

function saveCart() {
  try { localStorage.setItem('bro_biryani_cart', JSON.stringify(cart)); } catch (e) {}
}

function updateCartUI() {
  const container = document.getElementById('cart-items');
  const emptyView = document.querySelector('#cart-items > div');
  const footer = document.querySelector('#cart-drawer > div:last-child');

  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (cart.length === 0) {
    if (container) container.innerHTML = '<div class="text-center py-12 text-muted text-sm">Your cart is empty.<br class="hidden sm:block">Start your feast from the menu.</div>';
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (footer) footer.classList.remove('hidden');

  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="bg-surface/30 border border-border/30 p-4 rounded-[18px] flex items-start justify-between gap-3">
        <div class="flex-1">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${item.veg ? 'bg-emerald-500' : 'bg-vermilion-500'}"></span>
            <h4 class="font-bold text-sm text-offwhite">${item.name}</h4>
          </div>
          ${item.customizations?.note ? `<p class="text-[10px] text-saffron italic mt-1">Note: "${item.customizations.note}"</p>` : ''}
          <span class="text-xs font-semibold text-saffron mt-1 block">₹${item.price} each</span>
        </div>
        <div class="flex items-center gap-2 bg-surface border border-border/30 px-2 py-1 rounded-full">
          <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-muted hover:text-offwhite font-bold text-base">-</button>
          <span class="text-xs font-black text-offwhite px-1.5">${item.qty}</span>
          <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-saffron hover:text-saffron/80 font-bold text-base">+</button>
        </div>
        <button onclick="removeFromCart('${item.id}')" class="text-muted hover:text-vermilion p-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    `).join('');
    lucide.createIcons();
  }

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let discount = 0;
  let delivery = cartOrderType === 'pickup' ? 0 : 39;

  if (activePromo === 'BRO15') discount = Math.round(subtotal * 0.15);
  else if (activePromo === 'FREEDEL' || subtotal >= 800) delivery = 0;

  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal - discount + tax + delivery;

  const els = {
    'cart-subtotal': `₹${subtotal}`,
    'cart-tax': `₹${tax}`,
    'cart-delivery': delivery === 0 ? 'Free' : `₹${delivery}`,
    'cart-grand-total': `₹${grandTotal}`
  };
  Object.entries(els).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  });
}

function initCartListeners() {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');

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

  const closeBtn = document.getElementById('close-cart-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => toggleCart(false));
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) toggleCart(false); });
  }

  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('promo-input');
  const promoStatus = document.getElementById('promo-status');

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'BRO15') {
        activePromo = 'BRO15';
        promoStatus.innerText = '15% discount applied.';
        promoStatus.className = 'text-[11px] font-bold text-emerald-400 block';
      } else if (code === 'FREEDEL') {
        activePromo = 'FREEDEL';
        promoStatus.innerText = 'Free delivery applied.';
        promoStatus.className = 'text-[11px] font-bold text-emerald-400 block';
      } else {
        activePromo = null;
        promoStatus.innerText = 'Invalid code. Use BRO15 for 15% off.';
        promoStatus.className = 'text-[11px] font-bold text-vermilion-400 block';
      }
      updateCartUI();
    });
  }

  const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
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
      const text = `Hi Bro Biryani, I want to place an order (${cartOrderType.toUpperCase()}) from ${outlet.name}:%0A${itemsText}%0A%0ASubtotal: ₹${subtotal}%0ADiscount: ₹${discount}%0ATax: ₹${tax}%0ADelivery: ₹${delivery}%0AGrand Total: ₹${grandTotal}%0A%0ACustomer: ${currentUser.name} (${currentUser.phone})%0APlease confirm!`;

      window.open(`https://wa.me/919886099000?text=${text}`, '_blank');
      toggleCart(false);
    });
  }

  const expressCheckoutBtn = document.getElementById('express-checkout-btn');
  if (expressCheckoutBtn) {
    expressCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const outlet = OUTLETS[selectedOutletKey] || OUTLETS.indiranagar;
      const grandTotalEl = document.getElementById('cart-grand-total');
      const newOrderId = '#BRO-' + Math.floor(10000 + Math.random() * 90000);

      const newOrder = {
        id: newOrderId,
        userId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        outlet: outlet.city + ' — ' + outlet.name,
        orderType: cartOrderType,
        items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price, modifiers: c.customizations?.addons?.join(', ') || 'Standard' })),
        address: cartOrderType === 'delivery' ? currentUser.address : `Counter pickup at ${outlet.name}`,
        subtotal: cart.reduce((sum, i) => sum + (i.price * i.qty), 0),
        tax: Math.round(cart.reduce((sum, i) => sum + (i.price * i.qty), 0) * 0.05),
        deliveryFee: cartOrderType === 'pickup' ? 0 : 39,
        total: parseInt(grandTotalEl.innerText.replace('₹', '')),
        paymentStatus: 'Paid (Prepaid)',
        status: 'Placed',
        createdAt: 'Just now'
      };

      orders.unshift(newOrder);
      try { localStorage.setItem('bro_biryani_orders', JSON.stringify(orders)); } catch (e) {}

      activeTrackedOrderId = newOrderId;

      document.getElementById('confirmed-outlet').innerText = newOrder.outlet;
      document.getElementById('confirmed-amount').innerText = grandTotalEl ? grandTotalEl.innerText : '₹0';
      document.getElementById('confirmed-order-id').innerText = newOrderId;
      document.getElementById('confirmed-type').innerText = cartOrderType === 'delivery' ? 'Express delivery (32 mins)' : 'Self pickup (ready in 20 mins)';

      toggleCart(false);
      document.getElementById('checkout-modal').classList.remove('hidden');

      cart = [];
      saveCart();
      updateCartUI();
    });
  }
}

window.closeCheckoutModal = function() {
  document.getElementById('checkout-modal').classList.add('hidden');
};

// ==========================================================================
// 5. RESERVATIONS
// ==========================================================================

function initReservationSystem() {
  const form = document.getElementById('reservation-form-inline');
  const dateInput = document.getElementById('res-date');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newBookingId = '#RES-' + Math.floor(70000 + Math.random() * 20000);
      const newBooking = {
        id: newBookingId,
        name: document.getElementById('res-name').value.trim(),
        email: document.getElementById('res-email')?.value.trim() || '',
        phone: document.getElementById('res-phone').value.trim(),
        outlet: OUTLETS[document.getElementById('res-outlet').value]?.name || 'Indiranagar',
        date: document.getElementById('res-date').value,
        timeSlot: document.getElementById('res-time').value,
        guests: parseInt(document.getElementById('res-guests').value),
        specialRequest: document.getElementById('res-special')?.value.trim() || 'None',
        status: 'Confirmed'
      };

      reservations.unshift(newBooking);
      try { localStorage.setItem('bro_biryani_reservations', JSON.stringify(reservations)); } catch (e) {}

      document.getElementById('reservation-form-inline').classList.add('hidden');
      document.getElementById('res-confirm').classList.remove('hidden');
    });
  }
}

window.openReservationModal = function() {
  const target = document.getElementById('reservations-section');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
};

window.submitReservation = function() {
  document.getElementById('reservation-form-inline').dispatchEvent(new Event('submit'));
};

// ==========================================================================
// 6. ORDER TRACKING
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

  const stages = ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for delivery', 'Completed'];
  let currentStageIndex = stages.indexOf(activeOrder.status);
  if (currentStageIndex === -1) currentStageIndex = 2;

  const progressPercent = Math.min((currentStageIndex / (stages.length - 1)) * 100, 100);
  const pipeline = document.getElementById('order-pipeline');
  if (pipeline) {
    pipeline.innerHTML = stages.map((stage, i) => `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center ${i < currentStageIndex ? 'bg-emerald-500 text-white' : i === currentStageIndex ? 'bg-saffron text-ink' : 'bg-surface border border-border text-muted'} text-xs font-bold">
          ${i < currentStageIndex ? '✓' : i + 1}
        </div>
        <div class="text-sm ${i === currentStageIndex ? 'font-bold text-offwhite' : 'text-muted'}">${stage}</div>
        ${i < stages.length - 1 ? '<div class="h-px w-8 bg-border/30 mx-2"></div>' : ''}
      </div>
    `).join('');
  }
}

window.advanceOrderStatusMock = function() {
  const activeOrder = orders.find(o => o.id === activeTrackedOrderId) || orders[0];
  if (!activeOrder) return;
  const sequence = ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for delivery', 'Completed'];
  const currentIndex = sequence.indexOf(activeOrder.status);
  if (currentIndex < sequence.length - 1) {
    activeOrder.status = sequence[currentIndex + 1];
    showToast(`Order status: ${activeOrder.status}`);
  } else {
    activeOrder.status = 'Placed';
    showToast('Simulation reset.');
  }
  updateTrackingUI();
};

// ==========================================================================
// 7. OUTLETS
// ==========================================================================

window.selectOutlet = function(key) {
  selectedOutletKey = key;
  const outlet = OUTLETS[key];
  if (!outlet) return;
  showToast(`Outlet set to ${outlet.name}.`);
};

// ==========================================================================
// 8. USER PROFILE & AUTH
// ==========================================================================

function initUserProfile() {
  const historyContainer = document.getElementById('order-history-list');
  if (!historyContainer) return;

  historyContainer.innerHTML = orders.map(ord => `
    <div class="bg-surface/30 border border-border/30 p-3 rounded-[14px] flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-offwhite">${ord.id}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full ${ord.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-saffron-500/20 text-saffron-400'} font-bold">${ord.status}</span>
        </div>
        <p class="text-[11px] text-muted mt-0.5">${ord.items.map(i => i.name).join(', ')} • ₹${ord.total}</p>
      </div>
      <button onclick="reorderPrevious('${ord.id}')" class="btn-outline text-[11px] font-bold px-3 py-1">Reorder</button>
    </div>
  `).join('');

  document.querySelectorAll('.role-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-switch-btn').forEach(b => {
        b.classList.remove('active', 'bg-saffron', 'text-ink');
        b.classList.add('text-muted');
      });
      btn.classList.add('active', 'bg-saffron', 'text-ink');
      btn.classList.remove('text-muted');
      currentUser.role = btn.dataset.role === 'admin' ? 'admin' : 'customer';
    });
  });

  document.getElementById('user-display-name')?.innerText = currentUser.name;
  document.getElementById('user-display-email')?.innerText = currentUser.email;
  document.getElementById('user-display-address')?.innerText = currentUser.address;
}

window.openAuthModal = function() {
  document.getElementById('auth-profile-modal')?.classList.remove('hidden');
};
window.closeAuthModal = function() {
  document.getElementById('auth-profile-modal')?.classList.add('hidden');
};

window.reorderPrevious = function(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  order.items.forEach(item => {
    cart.push({
      id: `${orderId}-${item.name}-${Date.now()}`,
      baseId: 'reorder',
      name: item.name,
      price: item.price,
      qty: item.qty,
      veg: true
    });
  });
  saveCart();
  updateCartUI();
  showToast(`Reordered ${order.items.length} item(s).`);
};

// ==========================================================================
// 9. TOASTS
// ==========================================================================

function showToast(message) {
  let toast = document.getElementById('bro-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bro-toast';
    toast.className = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-ink text-offwhite px-6 py-3 rounded-full border border-border shadow-xl z-50 text-sm font-bold';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

// ==========================================================================
// 10. INIT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMenuFilters();
  initCartListeners();
  initCustomizerListeners();
  initReservationSystem();
  initUserProfile();
  renderMenu();
  updateCartUI();
});
