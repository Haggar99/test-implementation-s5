import express from 'express';
const etudiantRouter = express.Router();
const EtudiantController = require('../controllers/etudiant.controllers');


etudiantRouter.post('/create', EtudiantController.creeEtudiant);
etudiantRouter.post('/login', EtudiantController.loginEtudiant);
etudiantRouter.get('/', EtudiantController.getEtudiants);
etudiantRouter.get('/filtre', EtudiantController.filtrerEtudiant);

etudiantRouter.delete('/delete', EtudiantController.deleteAll);

// La route pour changer le status de l'etudiant 
etudiantRouter.put('/change-status/:matricule', EtudiantController.changeStatusEtudiant);

// La route pour changer le mot de passe 
etudiantRouter.put('/change-password/:userId', EtudiantController.updatePasswordEtudiant);

// La route pour mettre a jour les informations de l'etudiant
etudiantRouter.put('/update/:userId', EtudiantController.updateEtudiant);

etudiantRouter.get('/:matricule', EtudiantController.getEtudiantByMatricule);


module.exports = etudiantRouter;
