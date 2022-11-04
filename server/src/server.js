import express from "express"
import session from "express-session"
import morgan from "morgan"
import cors from "cors";
import MongoStore from "connect-mongo"
import "dotenv/config"
import "./db"
import rootRouter from "./routers/rootRouter";

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
        httpOnly: true,
        secure: true
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        next();
    })
});

app.use(cors({ 
    origin: ['http://bandallgom.com:4000'],
    credentials: true,
}));

app.use("/", rootRouter);

app.listen(HTTP_PORT , () => console.log(`Server Listening on Port http://localhost:${HTTP_PORT}`));