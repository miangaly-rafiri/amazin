require('dotenv').config();
const { testConnection } = require('./src/services/mysql'); // Importer la fonction de test de connexion
const userRoutes = require('./src/routes/users');
const pokemonRoutes = require('./src/routes/pokemons');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware CORS
app.use(cors());

// Middleware pour analyser le JSON
app.use(express.json());

// Définition des routes
app.use(userRoutes);
app.use(pokemonRoutes);

// Démarrage du serveur
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        await testConnection(); // Test de la connexion
        console.log('Database connection successful.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Quitter le processus en cas d'erreur
    }
});
