// Fonction pour ouvrir la modale du produit
function openModal(imageSrc, title, description, price, productId) {
    // Mettre à jour le contenu de la modale
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;

    // Afficher la modale
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex'; // Affiche la modale

    // Ajouter un écouteur d'événement pour fermer la modale lorsqu'on clique en dehors
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Enregistrer l'ID du produit pour l'ajouter au panier
    const addToCartButton = document.getElementById('addToCartButton');
    addToCartButton.dataset.productId = productId;
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none'; // Cache la modale
}

// Liste des produits dans le panier
let cart = [];

// Fonction pour ajouter un produit au panier
function addToCart(productId, quantity) {
    // Chercher si le produit est déjà dans le panier
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        // Si le produit existe déjà, augmenter la quantité
        existingProduct.quantity += quantity;
    } else {
        // Sinon, ajouter le produit au panier
        cart.push({ productId, quantity });
    }

    // Mettre à jour la modale du panier
    updateCartModal();
}

// Ouvrir la modale du panier
function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'flex';
}

// Fermer la modale du panier
function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

// Mettre à jour la modale du panier avec les produits
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Réinitialiser la liste

    cart.forEach(item => {
        // Créer un élément pour chaque produit dans le panier
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>Produit ${item.productId}</span>
            <span>Quantité: ${item.quantity}</span>
            <button onclick="removeFromCart(${item.productId})">Supprimer</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Fonction de paiement (passer à la caisse)
function checkout() {
 
    // Implémenter la logique de paiement ici, par exemple :
    window.location.href = 'p.html'; // Rediriger vers la page de paiement
}

// Fonction pour supprimer un produit du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId); // Retirer le produit du panier
    updateCartModal(); // Mettre à jour l'affichage du panier
}

// Ajouter un événement pour le bouton "Ajouter au panier" dans la modale produit
document.getElementById('addToCartButton').addEventListener('click', function () {
    const productId = this.dataset.productId;
    addToCart(productId, 1); // Ajout de 1 produit au panier
    closeModal(); // Fermer la modale après l'ajout
});

// Ajouter un événement pour l'icône du panier
document.querySelector('.ri-shopping-bag-line').addEventListener('click', openCartModal);

// Récupérer les produits à afficher
document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
    try {
        const response = await fetch('products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
    }
}

function displayProducts(products) {
    const container = document.querySelector('.product-container');
    container.innerHTML = '';  // Vider la liste actuelle

    products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.onclick = () => openModal(product.image, product.name, product.description, product.price, product.id);
        productElement.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">€${product.price}</p>
            </div>
        `;
        container.appendChild(productElement);
    });
}
