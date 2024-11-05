require('dotenv').config();
const { connectDb } = require('./src/services/mongoose');
const { initDb } = require('./src/databases/myApi');
const userRoutes = require('./src/routes/users');
const pokemonRoutes = require('./src/routes/pokemons');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


// Middleware CORS
app.use(cors());


//connexion à la base de donnée
connectDb().catch(err => console.log(err));
//création de la base avec un script si elle n'exsiste pas avec deux users et deux produit
//initDb();

app.use(express.json());
app.use(userRoutes);
app.use(pokemonRoutes);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});