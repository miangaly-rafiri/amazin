document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    // Exemple de produits (à remplacer par les données réelles depuis le backend)
    const productsInCart = [
        {
            id: 1,
            name: "Produit 1",
            price: 20.00,
            quantity: 1,
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Produit 2",
            price: 30.00,
            quantity: 2,
            image: "https://via.placeholder.com/150"
        }
    ];

    // Fonction pour afficher les articles du panier
    function displayCartItems() {
        cartItemsContainer.innerHTML = ""; // Réinitialiser l'affichage du panier
        let total = 0;

        productsInCart.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");

            // Créer l'élément pour l'image
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.classList.add("cart-item-img");

            // Créer l'élément pour les détails du produit
            const detailsElement = document.createElement("div");
            detailsElement.classList.add("cart-item-details");

            // Nom du produit
            const productName = document.createElement("p");
            productName.classList.add("product-name");
            productName.textContent = product.name;

            // Prix du produit
            const productPrice = document.createElement("p");
            productPrice.classList.add("product-price");
            productPrice.textContent = `€${product.price.toFixed(2)}`;

            // Quantité du produit
            const quantityContainer = document.createElement("div");
            quantityContainer.classList.add("product-quantity");
            const quantityLabel = document.createElement("label");
            quantityLabel.setAttribute("for", `quantity-${product.id}`);
            quantityLabel.textContent = "Quantité :";
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.id = `quantity-${product.id}`;
            quantityInput.value = product.quantity;
            quantityInput.min = 1;
            quantityInput.addEventListener("change", (e) => updateQuantity(product.id, e.target.value));

            // Bouton Supprimer
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-btn");
            removeButton.textContent = "Supprimer";
            removeButton.addEventListener("click", () => removeProduct(product.id));

            // Ajouter les éléments dans le conteneur
            quantityContainer.appendChild(quantityLabel);
            quantityContainer.appendChild(quantityInput);
            detailsElement.appendChild(productName);
            detailsElement.appendChild(productPrice);
            detailsElement.appendChild(quantityContainer);
            detailsElement.appendChild(removeButton);

            productElement.appendChild(productImage);
            productElement.appendChild(detailsElement);

            cartItemsContainer.appendChild(productElement);

            // Calcul du total
            total += product.price * product.quantity;
        });

        // Affichage du total
        totalPriceElement.innerHTML = `Total: <span id="total-amount">€${total.toFixed(2)}</span>`;
    }

    // Fonction pour mettre à jour la quantité d'un produit
    function updateQuantity(productId, quantity) {
        const product = productsInCart.find(p => p.id === productId);
        if (product) {
            product.quantity = Math.max(1, parseInt(quantity));
            displayCartItems();
        }
    }

    // Fonction pour supprimer un produit du panier
    function removeProduct(productId) {
        const index = productsInCart.findIndex(p => p.id === productId);
        if (index !== -1) {
            productsInCart.splice(index, 1);
            displayCartItems();
        }
    }

    // Fonction pour simuler la validation de la commande
    checkoutButton.addEventListener("click", () => {
        if (productsInCart.length === 0) {
            alert("Votre panier est vide. Ajoutez des produits avant de valider la commande.");
        } else {
            alert("Commande validée ! Merci pour votre achat.");
        }
    });

    // Afficher les articles du panier au chargement de la page
    displayCartItems();
});
