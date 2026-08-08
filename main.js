

        (function() {
            'use strict';

            // ━━━ DATA LAYER ━━━

            const navItems = [
                { label: 'Inicio', href: '#inicio' },
                { label: 'Menú', href: '#menu' },
                { label: 'Promociones', href: '#promociones' },
                { label: 'Domicilios', href: '#domicilios' },
                { label: 'Contacto', href: '#contacto' }
            ];

            const menuItems = [
                {
                    id: 1,
                    name: '🍗 Pollo Especial',
                    desc: 'Pollo con nuestro toque especial y deliciosos complementos.',
                    price: 18000,
                    img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop&q=80',
                    alt: 'Pollo Especial - Plato de pollo con complementos'
                },
                {
                    id: 2,
                    name: '🍛 Almuerzo Casero',
                    desc: 'Comida completa, abundante y preparada como en casa.',
                    price: 15000,
                    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80',
                    alt: 'Almuerzo Casero - Plato de comida completa'
                },
                {
                    id: 3,
                    name: '🍖 Carne Especial',
                    desc: 'Carne preparada con deliciosa sazón y guarniciones.',
                    price: 22000,
                    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80',
                    alt: 'Carne Especial - Plato de carne con guarniciones'
                },
                {
                    id: 4,
                    name: '🍚 Arroz Especial',
                    desc: 'Arroz preparado con ingredientes seleccionados.',
                    price: 12000,
                    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80',
                    alt: 'Arroz Especial - Plato de arroz con ingredientes'
                },
                {
                    id: 5,
                    name: '🍝 Plato del Día',
                    desc: 'Consulta nuestra comida disponible.',
                    price: 14000,
                    img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop&q=80',
                    alt: 'Plato del Día - Comida disponible del día'
                },
                {
                    id: 6,
                    name: '🥤 Soda',
                    desc: 'Refrescante bebida para acompañar tu comida.',
                    price: 3000,
                    img: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop&q=80',
                    alt: 'Soda - Bebida refrescante'
                }
            ];

            const whyItems = [
                { icon: '🍳', title: 'Preparado al momento' },
                { icon: '❤️', title: 'Hecho con amor' },
                { icon: '🛵', title: 'Domicilios' },
                { icon: '🥤', title: 'Soda GRATIS' }
            ];

            // ━━━ STATE ━━━

            let cart = [];
            let checkoutOpen = false;

            // ━━━ DOM REFS ━━━

            const $ = (sel) => document.querySelector(sel);
            const $$ = (sel) => document.querySelectorAll(sel);

            const navList = document.getElementById('nav-list');
            const mobileNavList = document.getElementById('mobileNavList');
            const menuGrid = document.getElementById('menuGrid');
            const whyGrid = document.getElementById('whyGrid');
            const cartItems = document.getElementById('cartItems');
            const cartBadge = document.getElementById('cartBadge');
            const subtotalEl = document.getElementById('subtotal');
            const totalEl = document.getElementById('total');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const clearCartBtn = document.getElementById('clearCartBtn');
            const cartToggle = document.getElementById('cartToggle');
            const cartClose = document.getElementById('cartClose');
            const cartOverlay = document.getElementById('cartOverlay');
            const cartPanel = document.getElementById('cartPanel');
            const menuToggle = document.getElementById('menuToggle');
            const mobileClose = document.getElementById('mobileClose');
            const mobileMenu = document.getElementById('mobileMenu');
            const checkoutForm = document.getElementById('checkoutForm');
            const sendOrderBtn = document.getElementById('sendOrderBtn');
            const cancelOrderBtn = document.getElementById('cancelOrderBtn');
            const toastContainer = document.getElementById('toastContainer');
            const navbar = document.getElementById('navbar');

            // ━━━ RENDER FUNCTIONS ━━━

            function renderNav(items) {
                return items.map(i =>
                    `<li><a href="${i.href}" class="nav-link">${i.label}</a></li>`
                ).join('');
            }

            function renderMobileNav(items) {
                return items.map(i =>
                    `<li><a href="${i.href}" class="text-white text-2xl font-semibold hover:text-yellow-400 transition">${i.label}</a></li>`
                ).join('');
            }

            function renderMenuItems(items) {
                return items.map(i => {
                    const safeName = i.name.replace(/["']/g, '');
                    const safeDesc = i.desc.replace(/["']/g, '');
                    return `
                        <article class="card fade-up">
                            <img class="card-img" src="${i.img}" alt="${i.alt}" loading="lazy">
                            <div class="card-body">
                                <h3 class="card-title">${i.name}</h3>
                                <p class="card-desc">${i.desc}</p>
                                <div class="card-price">$${i.price.toLocaleString('es-CO')} <small>COP</small></div>
                                <div class="card-actions">
                                    <button class="btn btn-yellow btn-sm add-to-cart" data-id="${i.id}">
                                        <i class="fas fa-plus"></i> Agregar
                                    </button>
                                    <a href="https://wa.me/573113378336?text=¡Hola!%20Quiero%20pedir%20${encodeURIComponent(safeName)}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-sm">
                                        <i class="fab fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </article>
                    `;
                }).join('');
            }

            function renderWhyItems(items) {
                return items.map(i =>
                    `<div class="why-card fade-up">
                        <span class="why-icon">${i.icon}</span>
                        <h3 class="why-title">${i.title}</h3>
                    </div>`
                ).join('');
            }

            function renderCartItems() {
                if (!cart.length) {
                    return `
                        <div class="cart-empty">
                            <i class="fas fa-shopping-bag"></i>
                            <p>Tu carrito está vacío</p>
                            <p class="text-sm mt-1">Agrega productos del menú para empezar.</p>
                        </div>
                    `;
                }
                return cart.map(item => {
                    const imgSrc = menuItems.find(m => m.id === item.id)?.img || '';
                    const altText = menuItems.find(m => m.id === item.id)?.alt || 'Producto';
                    return `
                        <div class="cart-item" data-id="${item.id}">
                            <img class="cart-item-img" src="${imgSrc}" alt="${altText}" loading="lazy">
                            <div class="cart-item-info">
                                <div class="cart-item-name">${item.name}</div>
                                <div class="cart-item-price">$${(item.price * item.qty).toLocaleString('es-CO')}</div>
                                <div class="cart-item-qty">
                                    <button class="qty-minus" data-id="${item.id}">−</button>
                                    <span>${item.qty}</span>
                                    <button class="qty-plus" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <button class="cart-item-remove remove-item" data-id="${item.id}" title="Eliminar">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `;
                }).join('');
            }

            function updateCartUI() {
                cartItems.innerHTML = renderCartItems();
                const count = cart.reduce((sum, i) => sum + i.qty, 0);
                cartBadge.textContent = count;
                if (count > 0) {
                    cartBadge.classList.add('pulse');
                    setTimeout(() => cartBadge.classList.remove('pulse'), 400);
                }
                const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
                subtotalEl.textContent = '$' + subtotal.toLocaleString('es-CO');
                totalEl.textContent = '$' + subtotal.toLocaleString('es-CO');
                checkoutBtn.disabled = cart.length === 0;
                if (cart.length === 0 && checkoutOpen) {
                    closeCheckout();
                }
            }

            // ━━━ CART OPERATIONS ━━━

            function addToCart(id) {
                const item = menuItems.find(m => m.id === id);
                if (!item) return;
                const existing = cart.find(c => c.id === id);
                if (existing) {
                    existing.qty += 1;
                } else {
                    cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
                }
                updateCartUI();
                showToast('✅ ' + item.name + ' agregado al pedido');
            }

            function removeFromCart(id) {
                cart = cart.filter(c => c.id !== id);
                updateCartUI();
                if (cart.length === 0 && checkoutOpen) closeCheckout();
            }

            function updateQty(id, delta) {
                const item = cart.find(c => c.id === id);
                if (!item) return;
                item.qty += delta;
                if (item.qty <= 0) {
                    removeFromCart(id);
                } else {
                    updateCartUI();
                }
            }

            function clearCart() {
                if (cart.length === 0) return;
                cart = [];
                updateCartUI();
                if (checkoutOpen) closeCheckout();
                showToast('🗑️ Carrito vaciado');
            }

            // ━━━ TOAST ━━━

            function showToast(message) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
                toastContainer.appendChild(toast);
                setTimeout(() => {
                    if (toast.parentNode) toast.remove();
                }, 3000);
            }

            // ━━━ CART PANEL ━━━

            function openCart() {
                cartPanel.classList.add('open');
                cartOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            function closeCart() {
                cartPanel.classList.remove('open');
                cartOverlay.classList.remove('open');
                document.body.style.overflow = '';
                if (checkoutOpen) closeCheckout();
            }

            // ━━━ CHECKOUT ━━━

            function openCheckout() {
                checkoutOpen = true;
                checkoutForm.classList.add('open');
                checkoutBtn.textContent = '📋 COMPLETAR DATOS';
                // Reset form
                document.getElementById('ord-name').value = '';
                document.getElementById('ord-whatsapp').value = '';
                document.getElementById('ord-address').value = '';
                document.getElementById('ord-neighborhood').value = '';
                document.getElementById('ord-reference').value = '';
                document.getElementById('ord-payment').value = '';
                document.getElementById('ord-notes').value = '';
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
            }

            function closeCheckout() {
                checkoutOpen = false;
                checkoutForm.classList.remove('open');
                checkoutBtn.textContent = '💳 FINALIZAR PEDIDO';
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
            }

            // ━━━ FORM VALIDATION ━━━

            function sanitize(str) {
                const div = document.createElement('div');
                div.textContent = str;
                return div.textContent.trim();
            }

            function validateForm() {
                let valid = true;
                const fields = [
                    { id: 'ord-name', group: 'fg-name', test: v => v.length >= 2 },
                    { id: 'ord-whatsapp', group: 'fg-whatsapp', test: v => /^[\d\s\-\+]{7,20}$/.test(v) },
                    { id: 'ord-address', group: 'fg-address', test: v => v.length >= 5 },
                    { id: 'ord-neighborhood', group: 'fg-neighborhood', test: v => v.length >= 2 },
                    { id: 'ord-payment', group: 'fg-payment', test: v => v !== '' }
                ];
                fields.forEach(f => {
                    const el = document.getElementById(f.id);
                    const group = document.getElementById(f.group);
                    const val = el.value.trim();
                    if (!f.test(val)) {
                        group.classList.add('invalid');
                        valid = false;
                    } else {
                        group.classList.remove('invalid');
                    }
                });
                return valid;
            }

            function getFormData() {
                return {
                    name: sanitize(document.getElementById('ord-name').value),
                    whatsapp: sanitize(document.getElementById('ord-whatsapp').value),
                    address: sanitize(document.getElementById('ord-address').value),
                    neighborhood: sanitize(document.getElementById('ord-neighborhood').value),
                    reference: sanitize(document.getElementById('ord-reference').value),
                    payment: document.getElementById('ord-payment').value,
                    notes: sanitize(document.getElementById('ord-notes').value)
                };
            }

            function generateWhatsAppMessage(data) {
                let msg = '🍽️ *NUEVO PEDIDO - DELICIAS DE LA NEGRA* 🍽️\n\n';
                msg += '━━━ PRODUCTOS ━━━\n';
                cart.forEach(item => {
                    const totalItem = item.price * item.qty;
                    msg += `• ${item.name} x${item.qty} = $${totalItem.toLocaleString('es-CO')}\n`;
                });
                msg += '━━━━━━━━━━━━━━\n';
                const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
                msg += `*TOTAL: $${total.toLocaleString('es-CO')}*\n\n`;
                msg += '━━━ DATOS DEL CLIENTE ━━━\n';
                msg += `👤 *Nombre:* ${data.name}\n`;
                msg += `📱 *WhatsApp:* ${data.whatsapp}\n`;
                msg += `📍 *Dirección:* ${data.address}\n`;
                msg += `🏘️ *Barrio:* ${data.neighborhood}\n`;
                if (data.reference) msg += `📌 *Referencia:* ${data.reference}\n`;
                msg += `💳 *Pago:* ${data.payment}\n`;
                if (data.notes) msg += `📝 *Observaciones:* ${data.notes}\n`;
                msg += '\n✅ _Gracias por tu pedido. Te contactaremos pronto._';
                return encodeURIComponent(msg);
            }

            // ━━━ MOUNT ━━━

            function init() {
                // Nav
                navList.innerHTML = renderNav(navItems);
                mobileNavList.innerHTML = renderMobileNav(navItems);
                // Menu
                menuGrid.innerHTML = renderMenuItems(menuItems);
                // Why
                whyGrid.innerHTML = renderWhyItems(whyItems);
                // Cart
                updateCartUI();

                // ━━━ EVENT DELEGATION ━━━

                document.addEventListener('click', function(e) {
                    // --- Smooth scroll for anchor links ---
                    const link = e.target.closest('a[href^="#"]');
                    if (link) {
                        e.preventDefault();
                        const target = document.querySelector(link.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        // Close mobile menu if open
                        mobileMenu.classList.remove('open');
                    }

                    // --- Add to cart ---
                    const addBtn = e.target.closest('.add-to-cart');
                    if (addBtn) {
                        e.preventDefault();
                        const id = parseInt(addBtn.dataset.id);
                        addToCart(id);
                        // Open cart panel on desktop
                        if (window.innerWidth >= 768) openCart();
                    }

                    // --- Cart toggle ---
                    if (e.target.closest('#cartToggle')) {
                        e.preventDefault();
                        if (cartPanel.classList.contains('open')) {
                            closeCart();
                        } else {
                            openCart();
                        }
                    }

                    // --- Cart close ---
                    if (e.target.closest('#cartClose') || e.target.closest('#cartOverlay')) {
                        closeCart();
                    }

                    // --- Mobile menu toggle ---
                    if (e.target.closest('#menuToggle')) {
                        mobileMenu.classList.add('open');
                    }
                    if (e.target.closest('#mobileClose')) {
                        mobileMenu.classList.remove('open');
                    }
                    // Close mobile menu on backdrop click
                    if (e.target === mobileMenu) {
                        mobileMenu.classList.remove('open');
                    }

                    // --- Qty minus/plus ---
                    const minus = e.target.closest('.qty-minus');
                    if (minus) {
                        const id = parseInt(minus.dataset.id);
                        updateQty(id, -1);
                    }
                    const plus = e.target.closest('.qty-plus');
                    if (plus) {
                        const id = parseInt(plus.dataset.id);
                        updateQty(id, 1);
                    }

                    // --- Remove item ---
                    const remove = e.target.closest('.remove-item');
                    if (remove) {
                        const id = parseInt(remove.dataset.id);
                        removeFromCart(id);
                    }

                    // --- Clear cart ---
                    if (e.target.closest('#clearCartBtn')) {
                        clearCart();
                    }

                    // --- Checkout button ---
                    if (e.target.closest('#checkoutBtn')) {
                        e.preventDefault();
                        if (cart.length === 0) {
                            showToast('🛒 Agrega productos al carrito primero');
                            return;
                        }
                        if (!checkoutOpen) {
                            openCheckout();
                            // Scroll to form
                            setTimeout(() => {
                                checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                        } else {
                            // Submit form
                            if (validateForm()) {
                                const data = getFormData();
                                const msg = generateWhatsAppMessage(data);
                                const url = 'https://wa.me/573113378336?text=' + msg;
                                window.open(url, '_blank', 'noopener,noreferrer');
                                showToast('✅ Pedido enviado por WhatsApp');
                                // Clear cart after sending
                                cart = [];
                                updateCartUI();
                                closeCheckout();
                                closeCart();
                            } else {
                                showToast('⚠️ Por favor corrige los campos marcados');
                            }
                        }
                    }

                    // --- Cancel order ---
                    if (e.target.closest('#cancelOrderBtn')) {
                        e.preventDefault();
                        closeCheckout();
                    }

                    // --- Send order (duplicate safety) ---
                    if (e.target.closest('#sendOrderBtn')) {
                        // handled by checkoutBtn logic above
                    }

                    // --- Brand link scroll ---
                    if (e.target.closest('#brandLink')) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }

                    // --- Hero order button ---
                    if (e.target.closest('#heroOrderBtn')) {
                        e.preventDefault();
                        const target = document.querySelector('#menu');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }
                });

                // ━━━ NAVBAR SCROLL EFFECT ━━━

                let lastScroll = 0;
                window.addEventListener('scroll', function() {
                    const current = window.pageYOffset;
                    if (current > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    lastScroll = current;

                    // Active nav link based on scroll position
                    const sections = ['inicio', 'menu', 'promociones', 'domicilios', 'contacto'];
                    let currentSection = 'inicio';
                    sections.forEach(id => {
                        const el = document.getElementById(id);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.top <= 200) currentSection = id;
                        }
                    });
                    document.querySelectorAll('.nav-link').forEach(a => {
                        a.classList.toggle('active', a.getAttribute('href') === '#' + currentSection);
                    });
                }, { passive: true });

                // ━━━ KEYBOARD ESC ━━━

                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        if (cartPanel.classList.contains('open')) closeCart();
                        if (mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open');
                    }
                });

                // ━━━ INTERSECTION OBSERVER FOR ANIMATIONS ━━━

                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('visible');
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
                    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
                } else {
                    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
                }

                // ━━━ FORM INPUT SANITIZATION ━━━

                document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
                    el.addEventListener('input', function() {
                        const group = this.closest('.form-group');
                        if (group) group.classList.remove('invalid');
                        // Prevent XSS by blocking HTML tags
                        if (/<[^>]*>/.test(this.value)) {
                            this.value = this.value.replace(/<[^>]*>/g, '');
                        }
                    });
                    el.addEventListener('blur', function() {
                        // Trim whitespace
                        this.value = this.value.trim();
                    });
                });

                // ━━━ PREVENT CONTEXT MENU ON SENSITIVE ELEMENTS (optional) ━━━
                // Not needed, but keeping security in mind

                console.log('🍽️ Delicias de la Negra - Web cargada correctamente');
                console.log('📱 Pedidos por WhatsApp: +57 311 3378336');
            }

            // ━━━ INIT ━━━
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }

        })();
