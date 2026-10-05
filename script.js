
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const products = {

        hydra: {
            name: "Hydra Cream",
            price: 2490,
            image: "images/hydra-crem.png",
            category: "SKINCARE",
            purpose: "Глубокое увлажнение",
            volume: "50 мл",
            production: "Made in France",
            ingredients: "Гиалуроновая кислота, сквалан, витамин Е",
            description:
                "Нежный увлажняющий крем с лёгкой текстурой. Помогает поддерживать комфорт кожи и оставляет мягкое естественное сияние."
        },

        glow: {
            name: "Glow Serum",
            price: 2990,
            image: "images/Glow-Serum.png",
            category: "SKINCARE / BESTSELLER",
            purpose: "Сияние и увлажнение",
            volume: "30 мл",
            production: "Made in France",
            ingredients: "Ниацинамид, гиалуроновая кислота, витамин С",
            description:
                "Лёгкая сыворотка для кожи, которой хочется добавить свежести и сияния. Быстро впитывается и комфортно ложится под крем."
        },

        cleanser: {
            name: "Soft Cleanser",
            price: 1890,
            image: "",
            category: "CLEANSING",
            purpose: "Мягкое очищение",
            volume: "150 мл",
            production: "Made in France",
            ingredients: "Аминокислотные ПАВы, алоэ вера, пантенол",
            description:
                "Мягкое средство для ежедневного очищения без ощущения сухости и стянутости."
        },

        toner: {
            name: "Silky Toner",
            price: 1690,
            image: "images/Silky Toner .png",
            category: "SKINCARE",
            purpose: "Подготовка и увлажнение",
            volume: "150 мл",
            production: "Made in France",
            ingredients: "Розовая вода, бетаин, гиалуроновая кислота",
            description:
                "Невесомый тонер, который возвращает коже ощущение свежести и подготавливает её к дальнейшему уходу."
        },

        essence: {
            name: "Silk Essence",
            price: 1990,
            image: "images/Silk Essense .png",
            category: "SKINCARE",
            purpose: "Интенсивное увлажнение",
            volume: "100 мл",
            production: "Made in France",
            ingredients: "Пептиды, сквалан, экстракт белого чая",
            description:
                "Шёлковистая эссенция для дополнительного увлажнения и более мягкого, ухоженного вида кожи."
        },

        mask: {
            name: "Cloud Mask",
            price: 2290,
            image: "images/Cloud Mask .png",
            category: "SKINCARE",
            purpose: "Смягчение и восстановление",
            volume: "75 мл",
            production: "Made in France",
            ingredients: "Церамиды, масло ши, пантенол",
            description:
                "Комфортная маска с мягкой кремовой текстурой. Идеальна для вечера, когда хочется дать коже дополнительный уход."
        },

        blush: {
            name: "Blush Cream",
            price: 2990,
            image: "images/Blush Cream.png",
            category: "MAKEUP",
            purpose: "Естественный румянец",
            volume: "8 г",
            production: "Made in France",
            ingredients: "Сквалан, витамин Е, минеральные пигменты",
            description:
                "Кремовые румяна с естественным финишем. Легко растушёвываются пальцами и создают свежий оттенок."
        },

        balm: {
            name: "Soft Kiss",
            price: 1590,
            image: "images/Soft Kiss .png",
            category: "LIP CARE",
            purpose: "Питание и увлажнение губ",
            volume: "12 мл",
            production: "Made in France",
            ingredients: "Масло ши, сквалан, витамин Е",
            description:
                "Мягкий бальзам для губ с комфортной текстурой. Помогает сохранить ощущение увлажнённости в течение дня."
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const cart = [];
    const favorites = [];

    const cartOpen = document.getElementById("cartOpen");
    const cartClose = document.getElementById("cartClose");
    const cartSidebar = document.getElementById("cart");
    const cartOverlay = document.getElementById("cartOverlay");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const favoritesOpen = document.getElementById("favoritesOpen");
    const favoritesClose = document.getElementById("favoritesClose");
    const favoritesPanel = document.getElementById("favoritesPanel");
    const favoritesOverlay = document.getElementById("favoritesOverlay");
    const favoritesItems = document.getElementById("favoritesItems");
    const favoritesCount = document.getElementById("favoritesCount");

    const modal = document.getElementById("productModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalClose = document.getElementById("modalClose");

    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    const modalPurpose = document.getElementById("modalPurpose");
    const modalVolume = document.getElementById("modalVolume");
    const modalProduction = document.getElementById("modalProduction");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalAdd = document.getElementById("modalAdd");

    let currentProduct = null;


    /* =====================================================
       HELPERS
    ===================================================== */

    function formatPrice(price) {
        return price.toLocaleString("ru-RU") + " ₽";
    }

    function lockBody() {
        body.classList.add("lock");
    }

    function unlockBody() {
        body.classList.remove("lock");
    }


    /* =====================================================
       CART
    ===================================================== */

    function openCart() {

        favoritesPanel.classList.remove("active");
        favoritesOverlay.classList.remove("active");

        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");

        lockBody();
    }

    function closeCart() {

        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");

        unlockBody();
    }

    cartOpen.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);


    function addToCart(product) {

        const existing = cart.find(item => item.name === product.name);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        openCart();
    }


    function updateCart() {

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        cartCount.textContent = totalItems;
        cartTotal.textContent = formatPrice(totalPrice);

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-message">
                    В корзине пока ничего нет
                </div>
            `;

            return;
        }

        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            const row = document.createElement("div");
            row.className = "cart-item";

            row.innerHTML = `

                ${
                    item.image
                    ? `<img class="side-product-image" src="${item.image}" alt="${item.name}">`
                    : `<div class="side-product-image"></div>`
                }

                <div class="side-product-info">
                    <strong>${item.name}</strong>
                    <span>
                        ${formatPrice(item.price)} · ${item.quantity} шт.
                    </span>

                    <div class="quantity-controls">

                        <button
                            class="quantity-button"
                            data-action="minus"
                            data-index="${index}"
                        >−</button>

                        <span>${item.quantity}</span>

                        <button
                            class="quantity-button"
                            data-action="plus"
                            data-index="${index}"
                        >+</button>

                    </div>
                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    УДАЛИТЬ
                </button>
            `;

            cartItems.appendChild(row);
        });


        cartItems.querySelectorAll(".quantity-button").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);
                const action = button.dataset.action;

                if (action === "plus") {
                    cart[index].quantity += 1;
                }

                if (action === "minus") {
                    cart[index].quantity -= 1;

                    if (cart[index].quantity <= 0) {
                        cart.splice(index, 1);
                    }
                }

                updateCart();
            });

        });


        cartItems.querySelectorAll(".remove-item").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();
            });

        });

    }


    document.querySelectorAll(".add-button").forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            addToCart({
                name: button.dataset.name,
                price: Number(button.dataset.price),
                image: button.dataset.image
            });

        });

    });


    /* =====================================================
       PRODUCT MODAL
    ===================================================== */

    function openProduct(productId) {

        const product = products[productId];

        if (!product) return;

        currentProduct = product;

        modalTitle.textContent = product.name;
        modalPrice.textContent = formatPrice(product.price);
        modalCategory.textContent = product.category;
        modalDescription.textContent = product.description;

        modalPurpose.textContent = product.purpose;
        modalVolume.textContent = product.volume;
        modalProduction.textContent = product.production;
        modalIngredients.textContent = product.ingredients;

        if (product.image) {

            modalImage.src = product.image;
            modalImage.alt = product.name;
            modalImage.style.display = "block";

        } else {

            modalImage.style.display = "none";

        }

        modal.classList.add("active");

        lockBody();
    }


    function closeProduct() {

        modal.classList.remove("active");

        if (
            !cartSidebar.classList.contains("active") &&
            !favoritesPanel.classList.contains("active")
        ) {
            unlockBody();
        }
    }


    document.querySelectorAll(".product-open").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            openProduct(card.dataset.product);

        });

    });


    modalClose.addEventListener("click", closeProduct);
    modalOverlay.addEventListener("click", closeProduct);


    modalAdd.addEventListener("click", () => {

        if (!currentProduct) return;

        addToCart(currentProduct);

        closeProduct();

    });


    /* =====================================================
       FAVORITES
    ===================================================== */

    function openFavorites() {

        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");

        favoritesPanel.classList.add("active");
        favoritesOverlay.classList.add("active");

        lockBody();

    }


    function closeFavorites() {

        favoritesPanel.classList.remove("active");
        favoritesOverlay.classList.remove("active");

        unlockBody();

    }


    favoritesOpen.addEventListener("click", openFavorites);
    favoritesClose.addEventListener("click", closeFavorites);
    favoritesOverlay.addEventListener("click", closeFavorites);


    function updateFavorites() {

        favoritesCount.textContent = favorites.length;

        document.querySelectorAll(".product-card").forEach(card => {

            const id = card.dataset.product;
            const button = card.querySelector(".favorite-button");

            if (favorites.includes(id)) {
                button.classList.add("active");
                button.textContent = "♥";
            } else {
                button.classList.remove("active");
                button.textContent = "♡";
            }

        });


        if (favorites.length === 0) {

            favoritesItems.innerHTML = `
                <div class="empty-message">
                    Здесь пока пусто ♡
                </div>
            `;

            return;
        }


        favoritesItems.innerHTML = "";

        favorites.forEach(id => {

            const product = products[id];

            const item = document.createElement("div");

            item.className = "favorite-item";

            item.innerHTML = `

                ${
                    product.image
                    ? `<img class="side-product-image" src="${product.image}" alt="${product.name}">`
                    : `<div class="side-product-image"></div>`
                }

                <div class="side-product-info">
                    <strong>${product.name}</strong>
                    <span>${formatPrice(product.price)}</span>
                </div>

                <button
                    class="remove-item favorite-remove"
                    data-id="${id}"
                >
                    УБРАТЬ
                </button>
            `;

            favoritesItems.appendChild(item);

        });


        favoritesItems.querySelectorAll(".favorite-remove").forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.id;

                const index = favorites.indexOf(id);

                if (index !== -1) {
                    favorites.splice(index, 1);
                }

                updateFavorites();

            });

        });

    }


    document.querySelectorAll(".favorite-button").forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const card = button.closest(".product-card");
            const id = card.dataset.product;

            const index = favorites.indexOf(id);

            if (index === -1) {
                favorites.push(id);
            } else {
                favorites.splice(index, 1);
            }

            updateFavorites();

        });

    });


    /* =====================================================
       CHECKOUT
    ===================================================== */

    document.getElementById("payButton").addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Сначала добавьте товары в корзину.");

            return;
        }

        alert(
            "Спасибо за заказ ♡\n\n" +
            "Это демонстрационная версия сайта для портфолио."
        );

    });


    /* =====================================================
       SOCIAL LINKS
    ===================================================== */

    document.querySelectorAll(".fake-link").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            alert("Ссылка будет добавлена после публикации социальных сетей бренда.");

        });

    });


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        closeCart();
        closeFavorites();
        closeProduct();

    });


    /* =====================================================
       SMOOTH ANCHORS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

    /* =====================================================
       MENU
    ===================================================== */

    const menuOpen = document.getElementById("menuOpen");
    const menuClose = document.getElementById("menuClose");
    const menuSidebar = document.getElementById("menuSidebar");
    const menuOverlay = document.getElementById("menuOverlay");

    const menuCatalog = document.querySelector(".menu-catalog");
    const menuCatalogButton = document.getElementById("menuCatalogButton");

    function openMenu() {

        menuSidebar.classList.add("active");
        menuOverlay.classList.add("active");
        body.classList.add("menu-active");

        lockBody();
    }


    function closeMenu() {

        menuSidebar.classList.remove("active");
        menuOverlay.classList.remove("active");
        body.classList.remove("menu-active");

        menuCatalog.classList.remove("open");

        if (
            !cartSidebar.classList.contains("active") &&
            !favoritesPanel.classList.contains("active") &&
            !modal.classList.contains("active")
        ) {
            unlockBody();
        }
    }


    menuOpen.addEventListener("click", openMenu);

    menuClose.addEventListener("click", closeMenu);

    menuOverlay.addEventListener("click", closeMenu);


    menuCatalogButton.addEventListener("click", () => {

        menuCatalog.classList.toggle("open");

    });


    document.querySelectorAll(".menu-submenu a, .menu-link").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });
    /* =====================================================
       INIT
    ===================================================== */

    updateCart();
    updateFavorites();

});

