import express from 'express';
import { candidateRegistrationController,showcandidateController,candidateLoginController } from '../controller/candidateController.js';

var candidateRouter = express.Router();
candidateRouter.post("/candidateRegister",candidateRegistrationController);
candidateRouter.post("/candidateLogin",candidateLoginController);
candidateRouter.get("/UserList",showcandidateController);

export default candidateRouter;