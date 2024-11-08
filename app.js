const express = require("express");
const app = express();
const flash = require("connect-flash");
const expressSession = require("express-session");


const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const db = require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownerRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(flash());
app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);