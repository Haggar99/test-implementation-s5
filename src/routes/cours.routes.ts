import express from 'express'
import *as coursController from '../controllers/cours.controllers'
const coursRouter = express.Router();


coursRouter.post('/api/cours/cree-cours', coursController.creeCours);

coursRouter.put('/api/cours/affecter-enseignant/:code', coursController.affecteProf)

module.exports = coursRouter;