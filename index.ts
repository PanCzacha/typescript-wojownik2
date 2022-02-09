import * as express from 'express';
import "express-async-errors";
import {engine} from "express-handlebars";
import {warriorRouter} from "./routers/warrior-router";
import {handleError} from "./utils/error";
import "./utils/db";

const app = express();
const port: number = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.engine(".hbs", engine({
    extname: ".hbs",
}));
app.set("view engine", ".hbs");

app.use("/", warriorRouter);
app.use(handleError);

app.listen(port, "localhost", () => {
    console.log(`Listening on port ${port}`);
});
