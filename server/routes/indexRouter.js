import express from 'express';
import { candidateRegistrationController, showcandidateController, candidateLoginController } from '../controller/candidateController.js';

var indexRouter = express.Router();
indexRouter.post("/showUser", (req, res) => {
    console.log('ttttttt')
}, showcandidateController);

export default indexRouter;