import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";

export const warriorRouter: Router = Router();

warriorRouter
    .get("/", async (req, res) => {
        res.render("warrior/warrior.hbs")
    })
    .post("/", async (req, res) => {
        const warriorToAdd = new WarriorRecord(req.body);
        await warriorToAdd.insert();
        res.render("partials/back", {
            msg: "Dodano nowego wojownika!"
        });
    })
