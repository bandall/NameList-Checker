import express from "express";
import { home } from "../controllers/defaultController";
const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;