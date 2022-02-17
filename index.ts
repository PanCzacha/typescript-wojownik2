import * as express from 'express';
import "express-async-errors";
import {engine} from "express-handlebars";
import {handleError} from "./utils/error";
import "./utils/db";
import {warriorRouter} from "./routers/warrior";
import {homeRouter} from "./routers/home";
import {arenaRouter} from "./routers/arena";
import {fameRouter} from "./routers/fame";

const app = express();
const port: number = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.engine(".hbs", engine({
    extname: ".hbs",
}));
app.set("view engine", ".hbs");

app.use("/", homeRouter);
app.use("/arena", arenaRouter);
app.use("/warrior", warriorRouter);
app.use("/fame", fameRouter);
app.use(handleError);

app.listen(port, "localhost", () => {
    console.log(`Listening on port ${port}`);
});
