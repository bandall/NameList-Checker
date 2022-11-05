import express from "express";
import { home } from "../controllers/defaultController";
import { loginOnlyMiddleWare } from "../middleware";
const rootRouter = express.Router();

rootRouter.route("/").all(loginOnlyMiddleWare).get(home);

export default rootRouter;