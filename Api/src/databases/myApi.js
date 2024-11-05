const User = require('../models/user');
const Pokemon = require('../models/pokemon');

async function initDb() {
    try {
        // Créez deux utilisateurs (admin et utilisateur)
        const adminUser = new User({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'adminpassword',
            isAdmin: true
        });
        await adminUser.save();

        const regularUser = new User({
            name: 'User',
            email: 'user@example.com',
            password: 'userpassword',
            isAdmin: false
        });
        await regularUser.save();

        // Créez quelques pokemons;
        const pokmon1 = new Pokemon({
            name: "Bulbizarre",
            hp: 25,
            cp: 5,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
            types: ["Plante", "Poison"]
        });
        await pokmon1.save();

        const pokemon2 = new Pokemon({
            name: "Salamèche",
            hp: 28,
            cp: 6,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
            types: ["Feu"]
        });
        await pokemon2.save();

        const pokemon3 = new Pokemon({
            name: "Carapuce",
            hp: 21,
            cp: 4,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
            types: ["Eau"]
        });
        await pokemon3.save();


        const pokemon4 = new Pokemon({
            name: "Aspicot",
            hp: 16,
            cp: 2,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
            types: ["Insecte", "Poison"]
        });
        await pokemon4.save();

        

        const pokemon5 = new Pokemon({
            name: "Roucool",
            hp: 30,
            cp: 7,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
            types: ["Normal", "Vol"]
        });
        await pokemon5.save();

        

        const pokemon6 = new Pokemon({
            name: "Rattata",
            hp: 18,
            cp: 6,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
            types: ["Normal"]
        });
        await pokemon6.save();

        

        const pokemon7 = new Pokemon({
            name: "Piafabec",
            hp: 14,
            cp: 5,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
            types: ["Normal", "Vol"]
        });
        await pokemon7.save();

        

        const pokemon8 = new Pokemon({
            name: "Abo",
            hp: 16,
            cp: 4,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
            types: ["Poison"]
        });
        await pokemon8.save();

        

        const pokemon9 = new Pokemon({
            name: "Pikachu",
            hp: 21,
            cp: 7,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
            types: ["Electrik"]
        });
        await pokemon9.save();

        

        const pokemon10 = new Pokemon({
            name: "Sabelette",
            hp: 19,
            cp: 3,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
            types: ["Normal"]
        });
        await pokemon10.save();

        

        const pokemon11 = new Pokemon({
            name: "Mélofée",
            hp: 25,
            cp: 5,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
            types: ["Fée"]
        });
        await pokemon11.save();

        

        const pokemon12 = new Pokemon({
            name: "Groupix",
            hp: 17,
            cp: 8,
            picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
            types: ["Feu"]
        });
        await pokemon12.save();

        
        console.log('Initialisation de la base de données terminée.');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    }
}

module.exports = {
    initDb
}