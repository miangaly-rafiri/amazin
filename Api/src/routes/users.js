const express = require('express');
const authentification = require('../middlewares/authentification');
const router = new express.Router();
const userController = require('../controllers/UserController');


router.post('/register', userController.registerUser);  // ajouter un utilisateur
router.post('/users/login', userController.login);  //se connecter avec un utilisateur
router.post('/users/logout', authentification, userController.logout);  //se deconnecter 
router.post('/users/logout/all', authentification, userController.logoutAll);  //se déconnecter de tout les appareils pour l'utilisateurs en cours
router.get('/users', authentification, userController.getAllUsers);  //récupere tout les utilisateurs 
router.get('/users/me', authentification, userController.getUserConnected);  //récuperer les information de l'utilisateur connecter
router.get('/users/:id', authentification, userController.getUserById);  //recuperer un utilisateur par son id pour l'admin ou seulemnt pour l'user connecter pour lui même
router.put('/users/me', authentification, userController.putUserConnected);  //modifier l'utilisateur connecter 
router.put('/users/:id', authentification, userController.putUserById);  //modifier un utilisateur par son id SEULEMENT POUR L'ADMINE PEUT etre changer la route en /admin/user:id
router.delete('/users/me', authentification, userController.deleteUserConnected);  //supprimer son propre profile 
router.delete('/users/:id', authentification, userController.deleteUserById);  // supprimer un utilisateur par l'admin changement de route possible comme  pour le put


module.exports = router;