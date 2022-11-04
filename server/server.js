import express from "express"
import session from "express-session"
import morgan from "morgan"
import "dotenv/config"
import MongoStore from "connect-mongo"

const HTTP_PORT = 7000

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());