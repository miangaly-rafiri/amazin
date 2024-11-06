require('dotenv').config();
const { pool, testConnection } = require('./src/services/mysql'); // Connexion et fonction de test
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware CORS et pour analyser le JSON
app.use(cors());
app.use(express.json());

// Route de login pour vérifier les informations de l'utilisateur et récupérer les produits associés
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Requête pour trouver l'utilisateur correspondant
        const [userRows] = await pool.execute(
            'SELECT * FROM User WHERE email = ? AND password = ?',
            [email, password]
        );

        if (userRows.length === 0) {
            // Si aucun utilisateur trouvé
            return res.status(400).json({ message: 'Please create an account!' });
        }

        // Utilisateur trouvé
        const user = userRows[0];

        // Requête pour récupérer les produits associés à l'utilisateur
        const [products] = await pool.execute(`
            SELECT p.id AS product_id, p.name AS product_name, p.price, s.name AS store_name
            FROM Product p
            JOIN Store s ON p.store_id = s.id
            WHERE s.user_id = ?
        `, [user.id]);

        // Réponse avec les informations de l'utilisateur et les produits associés
        res.json({
            message: 'Login successful',
            user,
            products
        });
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).send('An error occurred during login.');
    }
});

// Nouvelle route pour récupérer le panier de l'utilisateur
app.get('/users/cart', async (req, res) => {
    const { userId } = req.query; // L'ID de l'utilisateur est passé en paramètre de la requête

    try {
        // Requête pour récupérer le panier de l'utilisateur (si existant)
        const [cart] = await pool.execute(`
            SELECT c.id AS cart_id, c.created_at, ci.product_id, ci.quantity, p.name AS product_name, p.price
            FROM Cart c
            JOIN CartItem ci ON c.id = ci.cart_id
            JOIN Product p ON ci.product_id = p.id
            WHERE c.user_id = ?
        `, [userId]);

        if (cart.length === 0) {
            return res.status(404).json({ message: 'No cart found for this user.' });
        }

        // Retourne le panier avec les produits associés
        res.json({
            message: 'Cart retrieved successfully',
            cart
        });
    } catch (e) {
        console.error('Error retrieving cart:', e);
        res.status(500).send('An error occurred while retrieving the cart.');
    }
});


// Démarrage du serveur avec test de connexion
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        await testConnection(); // Test de la connexion à la BDD
        console.log('Database connection successful.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Quitter en cas d'erreur
    }
});
