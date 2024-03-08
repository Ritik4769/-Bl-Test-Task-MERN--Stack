import express from 'express';
import { candidateRegistrationController,showcandidateController,candidateLoginController } from '../controller/candidateController.js';
import dotenv from 'dotenv';

dotenv.config();
var secret_key = process.env.CANDIDATE_SECRET_KEY;

var candidateRouter = express.Router();

candidateRouter.post("/candidateRegister",candidateRegistrationController);
candidateRouter.post("/candidateLogin",candidateLoginController);
candidateRouter.get("/UserList",showcandidateController);

export default candidateRouter;