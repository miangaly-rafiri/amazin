function openModal(imageSrc, title, description, price) {
    // Update modal content
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;

    // Display the modal
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex'; // Show the modal

    // Add an event listener to close the modal when clicked outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none'; // Hide the modal
}

// Fonction pour ajouter un produit au panier
async function addToCart(productId, quantity) {
    try {
        const userId = 1;  // faut le remplacer par le vraix utulisateur
        const response = await fetch('http://localhost:3000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, productId, quantity })
        });


        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert('Erreur: ' + data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

        
// Ajout des événements pour les boutons "Ajouter au panier" et "Supprimer du panier"
document.addEventListener('DOMContentLoaded', () => {
    // Ajoutez l'événement pour le bouton d'ajout au panier
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const quantity = 1; // Par défaut, on ajoute 1 produit
            addToCart(productId, quantity);
        });
    });
});


//panier
// Liste des produits dans le panier
let cart = [];


// Fonction pour fermer la modale du produit
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Ajouter un produit au panier
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
        // Créer un élément pour chaque produit
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
    alert('Passage à la caisse');
    // Vous pouvez implémenter la logique de paiement ici
}

// Ajouter un événement pour le bouton d'ajout au panier dans la modale produit
document.getElementById('addToCartButton').addEventListener('click', function () {
    const productId = this.dataset.productId;
    addToCart(productId, 1); // Ajout de 1 produit au panier
    closeModal(); // Fermer la modale après l'ajout
});

// Ajouter un événement pour l'icône du panier
document.querySelector('.ri-shopping-bag-line').addEventListener('click', openCartModal);

