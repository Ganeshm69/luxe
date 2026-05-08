// ── FOOTER LINKS FUNCTIONALITY ─────────────────────────────
document.querySelectorAll('.footer-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.getAttribute('data-footer');
    // Shop links scroll to products and filter
    if (["Women", "Men", "Premium"].includes(section)) {
      filterCategory(section);
      scrollToSection('collections');
    } else if (["Contact", "Returns", "Shipping", "FAQ", "Size Guide"].includes(section)) {
      openSupport(section);
    } else if (section === "Order Tracking") {
      window.location.href = 'orders.html';
    } else if (["About", "Careers", "Press", "Sustainability", "Our Story", "Showrooms"].includes(section)) {
      showToast(section + ' page coming soon!');
    }
  });
});

// ── NAVBAR LINKS ──────────────────────────────────────────────
const navContact = document.getElementById('navContact');
if (navContact) {
  navContact.addEventListener('click', e => {
    e.preventDefault();
    openSupport('Contact');
  });
}
/* ============================================================
   LUXE — Luxury Fashion | app.js
   Firebase: Auth + Firestore | Cart | Products | UI Logic
   ============================================================ */

// ── FIREBASE CONFIGURATION ──────────────────────────────────
// 🔧 Replace with your own Firebase project config from:
//    https://console.firebase.google.com → Project Settings → Web App
const firebaseConfig = {
  apiKey: "AIzaSyDplPEhRHrnkSil5JBJCVUfuMabWouRetQ",

  authDomain: "noire-5c963.firebaseapp.com",

  databaseURL: "https://noire-5c963-default-rtdb.firebaseio.com",

  projectId: "noire-5c963",

  storageBucket: "noire-5c963.firebasestorage.app",

  messagingSenderId: "627797881852",

  appId: "1:627797881852:web:1fb7c83e6d0e8f7271f879",

  measurementId: "G-KKGDDET0XJ"

};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ── PRODUCT CATALOGUE ───────────────────────────────────────
let PRODUCTS = [
  {
    id: 'p1',
    name: ' Breasted Trench Coat',
    category: 'Women',
    price: 12999,
    oldPrice: 13599,
    img: 'https://i.pinimg.com/736x/fd/fb/95/fdfb95a602fbf9f8950d2c3553579e92.jpg',
    tag: 'New',
    desc: 'Double-breasted wool-blend trench with obsidian hardware. Timeless silhouette, uncompromising quality.'
  },
  {
    id: 'p2',
    name: ' Elegance Chiffon Gown',
    category: 'Women',
    price: 17800,
    oldPrice: null,
    img: 'https://i.pinimg.com/736x/9f/35/ce/9f35ce7d76fbec6cbccba744425568f2.jpg',
    tag: 'New',
    desc: 'Deep rich blue hue that exudes quiet luxury. The bodice is fully adorned with intricate stonework in a deep brown tone, creating a mesmerizing shimmer against the soft chiffon base. The gown features gracefully flared full sleeves and a covered neckline without a collar.'
  },
  {
    id: 'p4',
    name: 'Velvet Evening Gown',
    category: 'Women',
    price: 38000,
    oldPrice: null,
    img: 'https://i.pinimg.com/1200x/e2/41/d7/e241d7e9f1b7964772d2b949dbba3e56.jpg',
    tag: 'New',
    desc: 'Floor-length midnight velvet with an open back. Worn by women who command rooms.'
  },
  {
    id: 'p12',
    name: 'Vintage Black Velour Long Gowns',
    category: 'Women',
    price: 17000,
    oldPrice: null,
    img: 'https://i.pinimg.com/736x/8d/49/29/8d49298f7c505d9fd51ea39deeec32fe.jpg',
    tag: 'New',
    desc: 'Floor-length midnight velvet with an open back. Worn by women who command rooms.'
  },
  {
    id: 'p3',
    name: 'Shadow Tailored Suit',
    category: 'Men',
    price: 13000,
    oldPrice: 19999,
    img: 'https://i.pinimg.com/1200x/51/ab/0f/51ab0f4b609e5fc9d7e9d89db70594c7.jpg',
    tag: null,
    desc: 'Peak lapel suit in charcoal wool. A masterclass in understated masculine luxury.'
  },

  {
    id: 'p5',
    name: 'Italianvega Gurkha Trousers',
    category: 'men',
    price: 18500,
    oldPrice: null,
    img: 'https://i.pinimg.com/736x/a3/25/7e/a3257ee392ac83fd36de4bb790388a0e.jpg',
    tag: null,
    desc: 'talianVega’s Old Money Gurkha Pants – now made for the modern Indian gentleman. Crafted from premium fabrics with a heritage-inspired high-waist silhouette and signature side buckles, these trousers embody quiet luxury and refined tailoring. The pleated front and tapered leg create a timeless look that pairs effortlessly with blazers or knitwear. Whether dressing for work or weekend, these Gurkha pants offer unparalleled comfort and style for the discerning'
  },
  {
    id: 'p6',
    name: ' Pinstripe Suit',
    category: 'Men',
    price: 14000,
    oldPrice: null,
    img: 'https://i.pinimg.com/1200x/bc/01/9f/bc019fed366ab47773b71e2314291339.jpg',
    tag: 'New',
    desc: 'A white pocket square completes the polished, professional look--ideal for weddings, business, formal events, and special occasions. Features Slim-fit tailored cut for a sleek profile Black fabric with subtle white pinstripes Blazer: two-button closure, notch lapels, breast pocket with pocket square, flap pockets Waistcoat: single-breasted, tailored fit Trousers: slim, flat-front design for a clean finish Brand: Amanique Attire -- refined craftsmanship and attention to detail Made to your exa'

  },
  {
    id: 'p7',
    name: 'men’s black wool blazer',
    category: 'men',
    price: 15600,
    oldPrice: 19000,
    img: 'https://i.pinimg.com/1200x/e1/5b/8e/e15b8ec8a5bffb274b5b80b66eacbb68.jpg',
    tag: null,
    desc: 'A tailored black wool blazer with a sleek silhouette, featuring a single-button closure and classic notch lapels. The blazer is designed to provide a sharp and sophisticated look, perfect for formal occasions or elevating everyday attire. Crafted from high-quality wool, it offers both comfort and durability, making it a timeless addition to any wardrobe.'
  },
  {
    id: 'p8',
    name: 'modest mermaid skirt premium gown',
    category: 'premium',
    price: 25200,
    oldPrice: null,
    img: 'https://i.pinimg.com/736x/3a/77/7b/3a777bccb7f9f1de2d368d0d3f82427a.jpg',
    tag: 'premium',
    desc: 'Modest Mermaid Off The Shoulder One Shoulder Dark Green Long Formal Gown Slit Prom Dresses Evening Gowns HZ0311 Flowing wide-leg trousers in black crepe. Designed for women who move with intention.'
  },
  {
    id: 'p11',
    name: 'modest suit',
    category: 'premium',
    price: 22999,
    oldPrice: null,
    img: 'https://i.pinimg.com/736x/85/38/8a/85388a915c3e210316ee8abbab9c2920.jpg',
    tag: 'premium',
    desc: 'Discover the latest in men’s fashion, style, and outfits. Explore men’s clothing, wardrobe essentials, and modern trends to elevate your look.'
  },
  {
    id: 'p9',
    name: 'Light Grey Wool Suit',
    category: 'premium',
    price: 28700,
    oldPrice: null,
    img: 'https://www.nightbubo.com/cdn/shop/files/6_c76ad3be-5c91-43be-998f-e1b9407a9f0e.jpg?v=1774591748&width=832',
    tag: 'Premium',
    desc: 'High-quality wool fabric that is breathable, wrinkle-resistant, and soft to the touch. The fabric drapes beautifully, providing a sleek and polished look while ensuring comfort throughout the day.'
  },
  {
    id: 'p10',
    name: 'Handcrafted Embroidered Cape Suit',
    category: 'premium',
    price: 25600,
    oldPrice: null,
    img: 'https://i.pinimg.com/1200x/4a/39/21/4a392165cc67166ea41479abf2ff759e.jpg',
    tag: 'Premium',
    desc: 'handcrafted black embroidered cape suit, designed for those who command attention. Featuring intricate silver thread embroidery on the sleeves and back, this regal outfit blends Victorian sophistication with a modern gothic flair.'
  },

];

// ---- FIRESTORE PRODUCTS ----
async function fetchProductsFromFirestore() {
  try {
    console.log('Fetching products from project: ' + firebaseConfig.projectId);
    const snapshot = await db.collection('products').orderBy('category').get();

    if (snapshot.empty) {
      console.log('No products found. Seeding database...');
      showToast('Initializing database with default products...');
      await seedProductsToFirestore();
      // Re-fetch now that data exists
      const newSnapshot = await db.collection('products').orderBy('category').get();
      if (!newSnapshot.empty) processSnapshot(newSnapshot);
    } else {
      processSnapshot(snapshot);
    }
  } catch (error) {
    console.error('Firestore Fetch Error:', error);
    handleFirestoreError(error);
  }
}

function processSnapshot(snapshot) {
  PRODUCTS = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      price: Number(data.price),
      oldPrice: data.oldPrice ? Number(data.oldPrice) : null
    };
  });
  console.log('Loaded ' + PRODUCTS.length + ' products from Firestore.');
  renderProducts();
}

async function seedProductsToFirestore() {
  console.log('Seeding products to: ' + firebaseConfig.projectId);
  const batch = db.batch();
  PRODUCTS.forEach(product => {
    const docRef = db.collection('products').doc(product.id);
    batch.set(docRef, product);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully!');
    showToast('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding Error:', error);
    handleFirestoreError(error);
  }
}

function handleFirestoreError(error) {
  if (error.code === 'permission-denied') {
    alert('FIREBASE ALERT: Permission Denied. Please set your Firestore Rules to "Test Mode" in the console.');
  } else if (error.message.includes('not been enabled') || error.message.includes('consumer invalid')) {
    alert('FIREBASE ALERT: Cloud Firestore is not enabled. Please go to Firebase Console -> Firestore -> Create Database.');
  } else {
    alert('FIREBASE ERROR: ' + error.message);
  }
}

// ── STATE ────────────────────────────────────────────────────
let cart = [];
let currentUser = null;
let activeFilter = 'All';
let tempQty = 1;

// ── LOADER ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initReveal();
  }, 2000);
});

// ── CUSTOM CURSOR ────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  dotX += (mouseX - dotX) * 0.32;
  dotY += (mouseY - dotY) * 0.32;
  ringX += (mouseX - ringX) * 0.10;
  ringY += (mouseY - ringY) * 0.10;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Grow effect on interactive elements
document.querySelectorAll('a, button, .cat-card, .product-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
});

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .cat-card, .product-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
});


// ── NAVBAR SCROLL ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (document.getElementById('home')) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  } else {
    nav.classList.add('scrolled');
  }
});
// Set initial state
if (!document.getElementById('home')) {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.add('scrolled');
}

// ---- HEADER NAVIGATION FIX ----
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const text = link.textContent.trim().toLowerCase();
    if (text === 'collections') {
      e.preventDefault();
      scrollToSection('collections');
      // Show first collection's items after scroll
      setTimeout(() => filterCategory('Women'), 400);
    } else if (text === 'lookbook') {
      e.preventDefault();
      scrollToSection('lookbook-section');
    } else if (text === 'home') {
      e.preventDefault();
      window.location.href = 'index.html';
    } else if (text === 'orders') {
      e.preventDefault();
      window.location.href = 'orders.html';
    }
  });
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Make Explore Collection button show first collection
document.querySelectorAll('.btn-primary').forEach(btn => {
  if (btn.textContent.trim().toLowerCase().includes('explore collection')) {
    btn.addEventListener('click', () => {
      scrollToSection('collections');
      setTimeout(() => filterCategory('Women'), 400);
    });
  }
});

// ---- PRODUCTS (with images for collections) ----
function openModal(pid) {
  const p = PRODUCTS.find(x => x.id == pid);
  if (!p) return;

  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');

  modal.innerHTML = `
    <div class="modal-product">
      <div class="modal-img">
        ${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;" />` : p.emoji || ''}
      </div>
      <div class="modal-info">
        <p class="product-cat">${p.category}</p>
        <h2>${p.name}</h2>
        <p class="modal-price">₹${p.price.toLocaleString('en-IN')}</p>
        <p class="modal-desc">Exquisite craftsmanship and premium materials come together in this signature piece from our latest collection.</p>
        
        <div class="size-label">Select Size</div>
        <div class="size-grid">
          ${['S', 'M', 'L', 'XL'].map(s => `<button class="size-btn ${selectedSize === s ? 'active' : ''}" onclick="selectSize(this, '${s}')">${s}</button>`).join('')}
        </div>

        <div class="size-label">Quantity</div>
        <div class="quantity-control" style="margin-bottom: 2rem;">
          <button class="quantity-btn" onclick="updateTempQty(-1)"><i class="fas fa-minus"></i></button>
          <div class="quantity-val" id="tempQtyVal">1</div>
          <button class="quantity-btn" onclick="updateTempQty(1)"><i class="fas fa-plus"></i></button>
        </div>

        <button class="btn-primary full-width" onclick="addToCart('${p.id}', selectedSize, tempQty)">Add to Bag</button>
        <button class="btn-secondary full-width" style="margin-top:1rem;" onclick="window.location.href='product.html?id=${p.id}'">View Details</button>
      </div>
    </div>
  `;

  tempQty = 1; // Reset for new modal

  overlay.classList.add('active');
  document.getElementById('productModal').classList.add('open');
  toggleBodyScroll(true);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.getElementById('productModal').classList.remove('open');
  toggleBodyScroll(false);
}

function toggleBodyScroll(lock) {
  if (lock) {
    document.body.classList.add('no-scroll');
  } else {
    // Only remove if no other modals/overlays are active
    const activeOverlays = document.querySelectorAll('.modal-overlay.active, .cart-overlay.active, .checkout-overlay.active');
    if (activeOverlays.length === 0) {
      document.body.classList.remove('no-scroll');
    }
  }
}

function renderProducts(filter = 'All') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filtered = filter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category && p.category.toLowerCase() === filter.toLowerCase());

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.transitionDelay = (i * 0.06) + 's';
    // Add image support: expects p.img (URL) or fallback to emoji
    card.innerHTML = `
      <div class="product-img-wrap" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-img" style="background: var(--bg-3)">
          ${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />` : p.emoji || ''}
        </div>
        ${p.tag ? `<div class="product-tag">${p.tag}</div>` : ''}
        <div class="product-actions" onclick="event.stopPropagation()">
          <button class="product-action-btn" onclick="window.location.href='product.html?id=${p.id}'">View Details</button>
          <button class="product-action-btn" onclick="addToCart('${p.id}')">Add to Bag</button>
        </div>
      </div>
      <div class="product-info" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
          ${p.oldPrice ? `<span class="product-price-old">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  setTimeout(initReveal, 50);
}

// ── FILTER BUTTONS ───────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

function filterCategory(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  renderProducts(cat);
  scrollToSection('collections');
}

// ── CART ─────────────────────────────────────────────────────
function addToCart(productId, size = 'M', qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, size, qty: qty });
  }

  updateCartUI();
  showToast(`${product.name} added to bag`);

  if (currentUser) saveCartToFirestore();
}

function removeFromCart(productId, size) {
  cart = cart.filter(i => !(i.id === productId && i.size === size));
  updateCartUI();
  if (currentUser) saveCartToFirestore();
}

function updateQuantity(productId, size, delta) {
  const item = cart.find(i => i.id === productId && i.size === size);
  if (!item) return;

  item.qty += delta;
  if (item.qty < 1) {
    removeFromCart(productId, size);
  } else {
    updateCartUI();
    if (currentUser) saveCartToFirestore();
  }
}

function updateTempQty(delta) {
  tempQty += delta;
  if (tempQty < 1) tempQty = 1;
  const val = document.getElementById('tempQtyVal');
  if (val) val.textContent = tempQty;
  const valPDP = document.getElementById('pdpQtyVal');
  if (valPDP) valPDP.textContent = tempQty;
}

function updateCartUI() {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-bag-shopping"></i>
        <p>Your bag is empty</p>
      </div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.img ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" />` : item.emoji || ''}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.category} · Size ${item.size}</div>
        <div class="cart-item-qty-row">
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="quantity-control">
            <button class="quantity-btn" onclick="updateQuantity('${item.id}','${item.size}', -1)"><i class="fas fa-minus"></i></button>
            <div class="quantity-val">${item.qty}</div>
            <button class="quantity-btn" onclick="updateQuantity('${item.id}','${item.size}', 1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}','${item.size}')">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
  cartFooter.style.display = 'block';
}

document.getElementById('cartBtn').addEventListener('click', openCart);

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  toggleBodyScroll(true);
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  toggleBodyScroll(false);
}

async function checkout() {
  if (!currentUser) {
    closeCart();
    openAuth();
    showToast('Sign in to complete your purchase');
    return;
  }

  if (cart.length === 0) {
    showToast('Your bag is empty');
    return;
  }

  closeCart();
  openCheckout();
}

function openCheckout() {
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const totalEl = document.getElementById('checkoutTotalVal');
  if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');

  // Pre-fill name if available
  const nameInput = document.getElementById('shipName');
  if (nameInput && currentUser) nameInput.value = currentUser.displayName || '';

  document.getElementById('checkoutOverlay').classList.add('active');
  document.getElementById('checkoutModal').classList.add('open');
  toggleBodyScroll(true);
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('active');
  document.getElementById('checkoutModal').classList.remove('open');
  toggleBodyScroll(false);
}

async function confirmOrder() {
  const name = document.getElementById('shipName').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const city = document.getElementById('shipCity').value.trim();
  const pin = document.getElementById('shipPin').value.trim();

  if (!name || !phone || !address || !city || !pin) {
    showToast('Please fill in all shipping details');
    return;
  }

  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const orderData = {
    userId: currentUser.uid,
    userName: currentUser.displayName || 'Guest',
    userEmail: currentUser.email,
    shippingDetails: { name, phone, address, city, pin },
    items: cart,
    total: total,
    status: 'Pending',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    showToast('Placing your order…');
    const docRef = await db.collection('orders').add(orderData);

    cart = [];
    updateCartUI();
    if (currentUser) await saveCartToFirestore();

    closeCheckout();
    showToast('Order placed successfully!');

    setTimeout(() => {
      window.location.href = 'orders.html';
    }, 2000);
  } catch (e) {
    console.error('Checkout error:', e);
    showToast('Failed to place order.');
  }
}

// ── ORDERS LOGIC ──────────────────────────────────────────────
async function fetchOrders() {
  const container = document.getElementById('ordersList');
  const loader = document.getElementById('ordersLoader');
  const authReq = document.getElementById('authRequired');

  if (!currentUser) {
    if (loader) loader.style.display = 'none';
    if (authReq) authReq.style.display = 'block';
    return;
  }

  if (authReq) authReq.style.display = 'none';
  if (loader) loader.style.display = 'flex';

  try {
    // Fetch user's orders (Remove orderBy to avoid needing a composite index)
    const snapshot = await db.collection('orders')
      .where('userId', '==', currentUser.uid)
      .get();

    if (loader) loader.style.display = 'none';

    if (snapshot.empty) {
      container.innerHTML = `
        <div style="text-align:center; padding: 4rem 0;">
          <p style="color: var(--muted); font-size: 1.1rem;">You haven't placed any orders yet.</p>
          <button class="btn-primary" style="margin-top: 1.5rem;" onclick="window.location.href='index.html#collections'">Start Shopping</button>
        </div>`;
      return;
    }

    // Sort in-memory to avoid index requirement
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    orders.sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeB - timeA;
    });

    renderOrders(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    if (loader) loader.style.display = 'none';
    container.innerHTML = `<p style="color: red; text-align:center;">Error loading orders. Please try again later.</p>`;
  }
}

function renderOrders(orders) {
  const container = document.getElementById('ordersList');
  if (!container) return;

  container.innerHTML = orders.map(order => {
    let dateStr = 'Processing...';
    if (order.createdAt && typeof order.createdAt.toDate === 'function') {
      dateStr = order.createdAt.toDate().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    }

    return `
      <div class="order-card reveal">
        <div class="order-header">
          <div class="order-meta">
            <span class="order-id">Order #${order.id.slice(-8).toUpperCase()}</span>
            <span class="order-date">${dateStr}</span>
          </div>
          <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
        </div>
        <div class="order-items-list">
          ${order.items.map(item => `
            <div class="order-item-row">
              <div class="order-item-img">
                ${item.img ? `<img src="${item.img}" alt="${item.name}" />` : `<div class="emoji-placeholder">${item.emoji || '🛍️'}</div>`}
              </div>
              <div class="order-item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">${item.category} · Size ${item.size} · Qty ${item.qty}</div>
              </div>
              <div class="item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>
          `).join('')}
        </div>
        <div class="order-footer">
          <div class="order-total">
            <span>Total Amount</span>
            <span class="total-val">₹${order.total.toLocaleString('en-IN')}</span>
          </div>
          <button class="btn-secondary" onclick="showToast('Order tracking available soon')">Track Order</button>
        </div>
      </div>
    `;
  }).join('');

  setTimeout(initReveal, 100);
}

// ── FIRESTORE CART ────────────────────────────────────────────
async function saveCartToFirestore() {
  if (!currentUser) return;
  try {
    await db.collection('carts').doc(currentUser.uid).set({ items: cart, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  } catch (e) { console.warn('Cart save error:', e); }
}

async function loadCartFromFirestore() {
  if (!currentUser) return;
  try {
    const snap = await db.collection('carts').doc(currentUser.uid).get();
    if (snap.exists) {
      cart = snap.data().items || [];
      updateCartUI();
    }
  } catch (e) { console.warn('Cart load error:', e); }
}

// ── PRODUCT MODAL ─────────────────────────────────────────────
let selectedSize = 'M';

function renderProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const container = document.getElementById('productDetail');
  if (!p || !container) return;

  container.innerHTML = `
    <div class="pdp-wrapper">
      <div class="pdp-image-col">
        ${p.img ? `<img src="${p.img}" alt="${p.name}" class="pdp-main-img" />` : ''}
      </div>
      <div class="pdp-info-col">
        <div class="product-cat">${p.category}</div>
        <h1 class="pdp-title">${p.name}</h1>
        <div class="pdp-price">₹${p.price.toLocaleString('en-IN')}
          ${p.oldPrice ? `<span class="product-price-old" style="margin-left: 1rem;">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
        <p class="pdp-desc">${p.desc}</p>
        
        <div class="size-label">Select Size</div>
        <div class="size-grid" style="margin-bottom: 2rem;">
          ${['XS', 'S', 'M', 'L', 'XL'].map(s => `
            <button class="size-btn${s === 'M' ? ' active' : ''}" onclick="selectSize(this,'${s}')">${s}</button>
          `).join('')}
        </div>

        <div class="size-label">Quantity</div>
        <div class="quantity-control" style="margin-bottom: 2.5rem;">
          <button class="quantity-btn" onclick="updateTempQty(-1)"><i class="fas fa-minus"></i></button>
          <div class="quantity-val" id="pdpQtyVal">1</div>
          <button class="quantity-btn" onclick="updateTempQty(1)"><i class="fas fa-plus"></i></button>
        </div>
        
        <button class="btn-primary full-width pdp-add-btn" onclick="addToCart('${p.id}', selectedSize, tempQty)">Add to Bag</button>
        
        <div class="pdp-accordion">
          <div class="accordion-item">
            <button class="accordion-header" onclick="this.parentElement.classList.toggle('active')">
              <span>Delivery & Returns</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-body">
              <p>Complimentary express shipping on all orders. Returns are accepted within 14 days of delivery. Pieces must be returned in their original condition.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" onclick="this.parentElement.classList.toggle('active')">
              <span>Material & Care</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-body">
              <p>Crafted from the finest materials. Dry clean only. Store in the provided garment bag away from direct sunlight.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
}

// ── AUTH MODAL ────────────────────────────────────────────────
document.getElementById('userBtn').addEventListener('click', () => {
  if (currentUser) {
    auth.signOut();
    showToast('Signed out');
  } else {
    openAuth();
  }
});

function openAuth() {
  document.getElementById('authOverlay').classList.add('active');
  document.getElementById('authModal').classList.add('open');
  toggleBodyScroll(true);
}

function closeAuth() {
  document.getElementById('authOverlay').classList.remove('active');
  document.getElementById('authModal').classList.remove('open');
  toggleBodyScroll(false);
}

function switchAuth(tab) {
  const isLogin = tab === 'login';
  const isRegister = tab === 'register';
  const isForgot = tab === 'forgot';
  const isReset = tab === 'reset';

  // Tabs (Only Login and Register have visible tabs)
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');

  if (loginTab) loginTab.classList.toggle('active', isLogin);
  if (registerTab) registerTab.classList.toggle('active', isRegister);

  // Forms
  document.getElementById('loginForm').style.display = isLogin ? 'block' : 'none';
  document.getElementById('registerForm').style.display = isRegister ? 'block' : 'none';
  document.getElementById('forgotForm').style.display = isForgot ? 'block' : 'none';
  document.getElementById('resetForm').style.display = isReset ? 'block' : 'none';

  // Visual Content Update
  const visualTitle = document.getElementById('authVisualTitle');
  const visualSub = document.getElementById('authVisualSub');

  if (isLogin) {
    visualTitle.innerHTML = 'Welcome<br/><em>Back</em>';
    visualSub.textContent = 'Step into the circle of exclusive luxury fashion.';
  } else if (isRegister) {
    visualTitle.innerHTML = 'Join the<br/><em>Circle</em>';
    visualSub.textContent = 'Be the first to access our most exclusive collections and events.';
  } else if (isForgot) {
    visualTitle.innerHTML = 'Secure<br/><em>Access</em>';
    visualSub.textContent = 'We will send you a secure link to reset your password.';
  } else if (isReset) {
    visualTitle.innerHTML = 'New<br/><em>Beginning</em>';
    visualSub.textContent = 'Choose a strong password to protect your account.';
  }
}


// ---- AUTH FUNCTIONS (robust) ----
async function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');
  msg.textContent = '';
  if (!email || !password) {
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  try {
    await auth.signInWithEmailAndPassword(email, password);
    msg.textContent = '';
    closeAuth();
    showToast('Welcome back');
  } catch (e) {
    if (e.code === 'auth/network-request-failed') {
      msg.textContent = 'Network error. Please check your connection.';
    } else {
      msg.textContent = friendlyAuthError(e.code);
    }
  }
}

async function sendResetLink() {
  const email = document.getElementById('forgotEmail').value.trim();
  const msg = document.getElementById('forgotMsg');
  msg.textContent = '';

  if (!email) {
    msg.textContent = 'Please enter your email address.';
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    showToast('Reset link sent to your email.');
    msg.textContent = 'A link has been sent! Check your inbox.';
    msg.style.color = '#4CAF50';
  } catch (e) {
    msg.textContent = friendlyAuthError(e.code);
    msg.style.color = 'var(--gold)';
  }
}

async function confirmReset() {
  const newPass = document.getElementById('newPassword').value;
  const confPass = document.getElementById('confirmNewPassword').value;
  const msg = document.getElementById('resetMsg');
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('oobCode');

  msg.textContent = '';

  if (!newPass || !confPass) {
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  if (newPass !== confPass) {
    msg.textContent = 'Passwords do not match.';
    return;
  }
  if (newPass.length < 6) {
    msg.textContent = 'Password must be at least 6 characters.';
    return;
  }

  try {
    await auth.confirmPasswordReset(code, newPass);
    showToast('Password updated successfully!');
    msg.textContent = 'Success! You can now sign in.';
    msg.style.color = '#4CAF50';
    setTimeout(() => {
      // Clear URL params and switch to login
      window.history.replaceState({}, document.title, window.location.pathname);
      switchAuth('login');
    }, 2500);
  } catch (e) {
    msg.textContent = friendlyAuthError(e.code);
  }
}

async function registerUser() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const msg = document.getElementById('registerMsg');
  msg.textContent = '';
  if (!name || !email || !password) {
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  if (password.length < 6) {
    msg.textContent = 'Password must be at least 6 characters.';
    return;
  }
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    await db.collection('users').doc(cred.user.uid).set({
      name, email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    msg.textContent = '';
    closeAuth();
    showToast(`Welcome, ${name}`);
  } catch (e) {
    if (e.code === 'auth/network-request-failed') {
      msg.textContent = 'Network error. Please check your connection.';
    } else {
      msg.textContent = friendlyAuthError(e.code);
    }
  }
}

function friendlyAuthError(code) {
  const map = {
    'auth/user-not-found': 'No account found',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': ' email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-not-found': 'No account exists with this email.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/expired-action-code': 'This reset link has expired.',
    'auth/invalid-action-code': 'This reset link is invalid or already used.',
    'auth/user-disabled': 'This account has been disabled.'
  };
  return map[code] || 'Something went wrong. Please try again.';
}

auth.onAuthStateChanged(user => {
  currentUser = user;
  const icon = document.querySelector('#userBtn i');
  if (icon) icon.className = user ? 'fas fa-user' : 'far fa-user';
  if (user) {
    loadCartFromFirestore();
    if (document.getElementById('ordersList')) fetchOrders();
  } else {
    if (document.getElementById('ordersList')) {
      document.getElementById('ordersList').innerHTML = '';
      document.getElementById('authRequired').style.display = 'block';
    }
  }
});

// ── NEWSLETTER ────────────────────────────────────────────────
async function subscribeNewsletter() {
  const email = document.getElementById('emailInput').value.trim();
  const msg = document.getElementById('newsletterMsg');
  if (!email || !email.includes('@')) {
    msg.textContent = 'Please enter a valid email address.';
    return;
  }
  try {
    await db.collection('newsletter').doc(email).set({
      email,
      subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    msg.textContent = 'You\'re on the list. Welcome to the circle.';
    document.getElementById('emailInput').value = '';
  } catch (e) {
    msg.textContent = 'Already subscribed or an error occurred.';
  }
}

// ── SUPPORT ───────────────────────────────────────────────────
const SUPPORT_CONTENT = {
  'Contact': `
    <div class="support-header">
      <p class="section-eyebrow">Get in touch</p>
      <h2>Contact Us</h2>
    </div>
    <div class="support-body">
      <div class="support-item">
        <i class="fas fa-location-dot"></i>
        <div>
          <h4>locates</h4>
          <p>Luxe Fashion, Richmenz Complex,<br>Coimbatore, Tamil Nadu, 641001</p>
        </div>
      </div>
      <div class="support-item">
        <i class="fas fa-phone"></i>
        <div>
          <h4>Phone</h4>
          <p>+91 9025693882</p>
          <p class="sub-text">Mon - Sat: 10:00 AM - 8:00 PM</p>
        </div>
      </div>
      <div class="support-item">
        <i class="fas fa-envelope"></i>
        <div>
          <h4>Email</h4>
          <p>contact@luxe.com</p>
          <p class="sub-text">We usually respond within 24 hours.</p>
        </div>
      </div>
    </div>
  `,
  'Returns': `
    <div class="support-header">
      <p class="section-eyebrow">Our Policy</p>
      <h2>Returns & Exchanges</h2>
    </div>
    <div class="support-body">
      <p>At LUXE, we stand behind the quality of our craftsmanship. If you are not completely satisfied with your purchase, you may return it within <strong>14 days</strong> of delivery.</p>
      <ul class="support-list">
        <li>Items must be in original condition, unworn, and with all tags attached.</li>
        <li>Custom-tailored pieces are subject to a 50% restocking fee.</li>
        <li>Return shipping is complimentary for our Premium members.</li>
      </ul>
      <button class="btn-primary" onclick="showToast('Return portal coming soon')">Start a Return</button>
    </div>
  `,
  'Shipping': `
    <div class="support-header">
      <p class="section-eyebrow">Delivery</p>
      <h2>Shipping Information</h2>
    </div>
    <div class="support-body">
      <p>We offer worldwide express shipping to ensure your LUXE pieces arrive promptly and safely.</p>
      <div class="support-grid">
        <div class="s-grid-item">
          <h4>Domestic (India)</h4>
          <p>2-4 Business Days</p>
          <p class="gold-text">Complimentary</p>
        </div>
        <div class="s-grid-item">
          <h4>International</h4>
          <p>5-8 Business Days</p>
          <p class="gold-text">₹2,500 Flat Rate</p>
        </div>
      </div>
      <p class="sub-text">All orders are shipped via DHL or FedEx and require a signature upon delivery.</p>
    </div>
  `,
  'FAQ': `
    <div class="support-header">
      <p class="section-eyebrow">Assistance</p>
      <h2>Frequently Asked Questions</h2>
    </div>
    <div class="support-body">
      <div class="faq-item">
        <h4>How do I track my order?</h4>
        <p>Once your order is shipped, you will receive an email with a tracking number. You can also view your order status in the <a href="orders.html">Orders</a> section.</p>
      </div>
      <div class="faq-item">
        <h4>Do you offer custom tailoring?</h4>
        <p>Yes, we offer bespoke tailoring services. Please contact our support team to schedule a consultation at our Coimbatore showroom.</p>
      </div>
      <div class="faq-item">
        <h4>What payment methods do you accept?</h4>
        <p>We accept all major credit/debit cards, UPI, and Net Banking through our secure payment gateway.</p>
      </div>
    </div>
  `,
  'Size Guide': `
    <div class="support-header">
      <p class="section-eyebrow">Fitting</p>
      <h2>Size Guide</h2>
    </div>
    <div class="support-body">
      <p>Please use this guide to find your perfect fit. Measurements are in inches.</p>
      <table class="size-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>Chest</th>
            <th>Waist</th>
            <th>Hips</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>XS</td><td>32-34</td><td>26-28</td><td>34-36</td></tr>
          <tr><td>S</td><td>34-36</td><td>28-30</td><td>36-38</td></tr>
          <tr><td>M</td><td>38-40</td><td>32-34</td><td>40-42</td></tr>
          <tr><td>L</td><td>42-44</td><td>36-38</td><td>44-46</td></tr>
          <tr><td>XL</td><td>46-48</td><td>40-42</td><td>48-50</td></tr>
        </tbody>
      </table>
      <p class="sub-text">If you are between sizes, we recommend selecting the larger size for a more comfortable fit.</p>
    </div>
  `
};

function openSupport(type) {
  const modal = document.getElementById('supportModal');
  const overlay = document.getElementById('supportOverlay');
  const content = document.getElementById('supportContent');

  if (SUPPORT_CONTENT[type]) {
    content.innerHTML = SUPPORT_CONTENT[type];
    modal.classList.add('open');
    overlay.classList.add('active');
    toggleBodyScroll(true);
  }
}

function closeSupport() {
  const modal = document.getElementById('supportModal');
  const overlay = document.getElementById('supportOverlay');

  modal.classList.remove('open');
  overlay.classList.remove('active');
  toggleBodyScroll(false);
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── SCROLL TO SECTION ─────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── AUTH ACTION HANDLER ───────────────────────────────────────
function checkAuthAction() {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const code = urlParams.get('oobCode');

  if (mode === 'resetPassword' && code) {
    // Open auth modal and show reset form
    setTimeout(() => {
      openAuth();
      switchAuth('reset');

      // Verify code first
      auth.verifyPasswordResetCode(code).catch(e => {
        const msg = document.getElementById('resetMsg');
        if (msg) {
          msg.textContent = 'This reset link has expired or already been used.';
          msg.style.color = 'var(--accent)';
        }
        document.getElementById('resetSubmitBtn').disabled = true;
      });
    }, 1000);
  }
}

// ── BACK TO TOP ───────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (btn) {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }
});

// ── INIT ──────────────────────────────────────────────────────
async function initApp() {
  await fetchProductsFromFirestore();
  checkAuthAction();

  if (document.getElementById('productGrid')) {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    if (filter) {
      // Slight delay to ensure DOM is ready
      setTimeout(() => filterCategory(filter), 50);
    } else {
      renderProducts();
    }
  } else if (document.getElementById('productDetail')) {
    const urlParams = new URLSearchParams(window.location.search);
    const pid = urlParams.get('id');
    if (pid) {
      renderProductDetail(pid);
    } else {
      document.getElementById('productDetail').innerHTML = '<div style="text-align:center; padding: 100px 0;"><h2>Product not found</h2><br><button class="btn-primary" onclick="window.location.href=\'index.html\'">Back to Shop</button></div>';
    }
  } else if (document.getElementById('ordersList')) {
    fetchOrders();
  }
}

initApp();
