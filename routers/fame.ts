import {WarriorRecord} from "../records/warrior.record";
import {Router} from "express";

export const fameRouter: Router = Router();

fameRouter
    .get("/", async  (req, res) => {
        const allWarriors = await WarriorRecord.listAll();
        res.render("hall-of-fame/hall-of-fame.hbs", {
            allWarriors,
            msg: "Wróć do strony głównej."
        })
    })

