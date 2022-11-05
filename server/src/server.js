import express from "express"
import session from "express-session"
import morgan from "morgan"
import cors from "cors";
import MongoStore from "connect-mongo"
import "dotenv/config"
import "./db"
import rootRouter from "./routers/rootRouter";
import apiRouter from "./routers/apiRouter";

const HTTP_PORT = 7000

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        next();
    })
});

app.use(cors({ 
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/api", apiRouter);
app.get("*", (req, res) => res.sendFile(process.env.ASSET_PATH + "/index.html"));

app.listen(HTTP_PORT , '0.0.0.0', () => console.log(`Server Listening on Port http://localhost:${HTTP_PORT}`));