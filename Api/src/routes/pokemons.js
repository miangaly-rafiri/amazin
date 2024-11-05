const express = require('express');
const authentification = require('../middlewares/authentification');
const router = new express.Router();
const productController = require('../controllers/PokemonController');



router.post('/pokemon/add', authentification, productController.creatProduct);  // ajouter un pokemon
router.get('/pokemon',  productController.getAllProducts);  //récupere tout les pokemon
router.get('/pokemon/:id', productController.getProductById);  //recuperer un pokemon par son id
router.put('/pokemon/:id', authentification, productController.putProductById);  //modifier un pokemon
router.delete('/pokemon/:id', authentification, productController.deleteProductsById);  // supprimer un pokemon


module.exports = router;