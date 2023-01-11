import express from 'express'

import *as AdminCtrl from '../controllers/admin.controllers';

const adminRouter = express.Router();

adminRouter.post('/create', AdminCtrl.creeAdmin);
adminRouter.post('/login', AdminCtrl.loginAdmin);

module.exports = adminRouter;