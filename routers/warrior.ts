import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";

export const warriorRouter: Router = Router();

warriorRouter
    .get("/", async (req, res) => {
        res.render("warrior/warrior.hbs")
    })
    .post("/", async (req, res) => {
        const {strength, endurance, agility, defense} = req.body;
        const warriorToAdd = new WarriorRecord({
            ...req.body,
            strength: Number(strength),
            endurance: Number(endurance),
            agility: Number(agility),
            defense: Number(defense),
        });
        await warriorToAdd.insert();
        res.render("partials/back", {
            msg: "Dodano nowego wojownika!"
        });
    })
