require('dotenv').config();
const { pool, testConnection } = require('./src/services/mysql'); // Connexion et fonction de test
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware CORS et pour analyser le JSON
app.use(cors());
app.use(express.json());

// Route de login pour vérifier les informations de l'utilisateur
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Requête pour trouver l'utilisateur correspondant
        const [rows] = await pool.execute(
            'SELECT * FROM User WHERE email = ? AND password = ?',
            [email, password]
        );

        if (rows.length === 0) {
            // Si aucun utilisateur trouvé
            return res.status(400).send('Please create an account!');
        }

        // Utilisateur trouvé
        const user = rows[0];
        res.json({ message: 'Login successful', user });
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).send('An error occurred during login.');
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
