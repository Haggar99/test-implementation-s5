import express from 'express';
import *as enseignantController from '../controllers/enseignant.controllers';

const enseignantRouter = express.Router();

enseignantRouter.post('/create', enseignantController.creeEnseignant);
enseignantRouter.post('/login', enseignantController.loginEnseignant);



module.exports = enseignantRouter;