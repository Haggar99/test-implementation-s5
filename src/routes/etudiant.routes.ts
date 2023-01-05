import express from 'express';
const etudiantRouter = express.Router();
const EtudiantController = require('../controllers/etudiant.controllers');


etudiantRouter.post('/create', EtudiantController.creeEtudiant);
etudiantRouter.post('/login', EtudiantController.loginEtudiant);
etudiantRouter.get('/', EtudiantController.getEtudiants);


module.exports = etudiantRouter;
