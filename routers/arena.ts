import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/error";
import {Arena} from "../libs/arena";

export const arenaRouter: Router = Router();

arenaRouter
    .get("/", async (req, res) => {
        const allWarriors = await WarriorRecord.listAll();
        res.render("arena/arena.hbs", {
            allWarriors,
        })
    })
    .post("/fight", async (req, res) => {
        const {war1Id, war2Id} = req.body;

        if(war1Id === war2Id) {
            throw new ValidationError("Nie można walczyć samemu ze sobą :). Wybierz dwóch różnych wojowników!");
        }
        const war1 = await WarriorRecord.findOne(war1Id);
        const war2 = await WarriorRecord.findOne(war2Id);
        if(!war1) {
            throw new ValidationError("Nie znaleziono wojownika nr 1")
        }
        if(!war2) {
            throw new ValidationError("Nie znaleziono wojownika nr 2")
        }
        const goToArena = new Arena(war1, war2);
        const log = await goToArena.fight();

        res.render("arena/results.hbs", {
            log,
            msg: "Wróć do strony głównej."
        })
    });
