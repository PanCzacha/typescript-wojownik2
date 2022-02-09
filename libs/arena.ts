import {random} from "../utils/random";
import {WarriorRecord} from "../records/warrior.record";

export class Arena {
    private attackingWarrior: number = random(1, 2);

    constructor(public warrior1: WarriorRecord, public warrior2: WarriorRecord) {}

    async fight(): Promise<string[] | null> {
        const fightLog: string[] = [];


        fightLog.push(`Fight between ${this.warrior1.name} and ${this.warrior2.name} begins`);

        do {
            let attacker: WarriorRecord = this.attackingWarrior === 1 ? this.warrior1 : this.warrior2;
            let defender: WarriorRecord = this.attackingWarrior === 1 ? this.warrior2 : this.warrior1;


            if(attacker.strength <= defender.dp) {
                defender.dp -= attacker.strength
                fightLog.push(`${attacker.name} strikes ${defender.name} for ${attacker.strength} and leaves him with ${defender.dp} shield`);
            }
            else if(attacker.strength > defender.dp && defender.dp > 0) {
                let cont = defender.dp - attacker.strength;
                defender.dp -= defender.strength;
                defender.hp += cont;
                defender.dp <= 0 ? defender.dp = 0 : null;
                fightLog.push(`${attacker.name} strikes ${defender.name} for ${attacker.strength} and leaves him with ${defender.hp} HP and zero shield`);
            }
            else if(attacker.strength > defender.dp && defender.dp === 0) {
                defender.hp -= attacker.strength;
                defender.hp <= 0 ? defender.hp = 0 : null;
                fightLog.push(`${attacker.name} strikes ${defender.name} for ${attacker.strength} and leaves him with ${defender.hp} HP`);
            }

            if(defender.hp <= 0) {
                attacker === this.warrior1 ? await this.warrior1.update() : await this.warrior2.update()
                fightLog.push(`Fight has ended. ${attacker.name} wins!`)
                return fightLog;
            }

            this.attackingWarrior = this.attackingWarrior === 1 ? 2 : 1;

        } while (this.warrior1.hp > 0 && this.warrior2.hp > 0)
    }
}
