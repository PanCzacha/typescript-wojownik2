import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/error";
import {Arena} from "../libs/arena";

export const warriorRouter: Router = Router();

warriorRouter
    .get("/", async (req, res, next) => {
       const allWarriors = await WarriorRecord.listAll();
       res.render("warrior/warrior-main.hbs", {
           allWarriors,
       })
    })
    .get("/fame", async  (req, res, next) => {
        const allWarriors = await WarriorRecord.listAll();
        res.render("warrior/hall-of-fame.hbs", {
            allWarriors,
            msg: "Wróć do strony głównej."
        })
    })
    .post("/fight", async (req, res, next) => {
        const {war1Id, war2Id} = req.body;

        if(war1Id === war2Id) {
            throw new ValidationError("Nie można walczyć samemu ze sobą :). Wybierz dwóch różnych wojowników!");
        }
        const war1 = await WarriorRecord.findOne(war1Id);
        const war2 = await WarriorRecord.findOne(war2Id);
        const goToArena = new Arena(war1, war2);
        const log = await goToArena.fight();

        res.render("warrior/results", {
            log,
            msg: "Wróć do strony głównej."
        })
    })
    .post("/add", async (req, res, next) => {
        const warriorToAdd = new WarriorRecord(req.body);
        await warriorToAdd.insert();
        res.render("partials/back", {
            msg: "Dodano nowego wojownika!"
        });
    })
