import express from "express";
import { getList, getLoginInfo, getSearchBoth, getSearchName, getSearchPhone, postAddList, postDeleteList, postLogin, postLogout } from "../controllers/apiController";
import { loginOnlyMiddleWare } from "../middleware";
const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.route("/loggedin").get(getLoginInfo);
apiRouter.route("/logout").all(loginOnlyMiddleWare).post(postLogout);
apiRouter.route("/addlist").all(loginOnlyMiddleWare).post(postAddList);
apiRouter.route("/deletelist").all(loginOnlyMiddleWare).post(postDeleteList);
apiRouter.route("/serachName").all(loginOnlyMiddleWare).get(getSearchName);
apiRouter.route("/searchPhone").all(loginOnlyMiddleWare).get(getSearchPhone);
apiRouter.route("/searchBoth").all(loginOnlyMiddleWare).get(getSearchBoth);
apiRouter.route("/list").all(loginOnlyMiddleWare).get(getList);
export default apiRouter;