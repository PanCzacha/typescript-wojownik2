import {Router} from "express";

export const homeRouter: Router = Router();

homeRouter
.get("/", async (req, res) => {
    res.render("home/home.hbs");
})
