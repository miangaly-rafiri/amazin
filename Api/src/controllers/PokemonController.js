const Pokemon = require('../models/pokemon');

exports.creatProduct = async (req, res, next) => {
    const pokemon = new Pokemon(req.body);
    try {
        if (req.user.isAdmin) {
            const savePokemon = await pokemon.save();
            res.status(201).send(savePokemon);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const pokemons = await Pokemon.find({});
        res.send(pokemons);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getProductById = async (req, res, next) => {
    const pokemonId = req.params.id;

    try {
        const pokemon = await Pokemon.findById(pokemonId);
        if (!pokemon) return res.status(404).send('Pokemon not found! ');
        res.send(pokemon);
    } catch (e) {
        res.status(500).send(e);
    }
};


exports.putProductById = async (req, res, next) => {
    const pokemonId = req.params.id;

    try {
        if (req.user.isAdmin) {
            const pokemon = await Pokemon.findByIdAndUpdate(pokemonId, req.body, {
                new: true, // pour que le document modifié soit renvoyé dans la réponse
                runValidators: true, // pour valider les champs avant de mettre à jour
            });
            if (!pokemon) return res.status(404).send('Pokemon not found! ');
            res.send(pokemon);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


exports.deleteProductsById = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            const pokemonId = req.params.id;
            const pokemon = await Pokemon.findByIdAndDelete(pokemonId);
            if (!pokemon) return res.status(404).send('Pokemon not found! ');
            res.send(pokemon);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};




