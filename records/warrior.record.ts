import {WarriorEntity} from "../types/warrior-entity";
import {pool, uuid} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/error";
type WarriorRecordResults = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord implements WarriorEntity{
    public id?: string;
    public name: string;
    public strength: number;
    public defense: number;
    public endurance: number;
    public agility: number;
    public hp?: number;
    public dp?: number;
    public victories?: number;

    constructor(obj: WarriorEntity) {

        this.id = obj.id;
        this.name = obj.name;
        this.strength = Number(obj.strength);
        this.defense = Number(obj.defense);
        this.endurance = Number(obj.endurance);
        this.agility = Number(obj.agility);
        this.hp = this.endurance * 10;
        this.dp = this.defense;
        this.victories = obj.victories;

    }

    private async _verify(): Promise<void> {
        if(this.strength < 1 || this.agility < 1 || this.defense < 1 || this.endurance < 1) {
            throw new ValidationError("Każda ze statystyk musi mieć minimum 1")
        }
        if(this.strength + this.agility + this.defense + this.endurance !== 10) {
            throw new ValidationError("Suma punktów w statystykach musi wynosić 10")
        }
        const warriors = await WarriorRecord.listAll();
        const foundName =  warriors
            .map(warrior => warrior.name)
            .indexOf(this.name);
        if(foundName > -1) {
            throw new ValidationError("Imiona nie mogą się powtarzać. Wybierz inne imię!")
        }
    }

    async insert(): Promise<string> {
        await this._verify();

        if(!this.id) {
            this.id = uuid();
        }

        if (!this.victories) {
            this.victories = 0;
        }

        await pool.execute("INSERT INTO `warriors` VALUES(:id, :name, :strength, :defense, :endurance, :agility, :hp, :dp, :victories)", {
            id: this.id,
            name: this.name,
            strength: this.strength,
            defense: this.defense,
            endurance: this.endurance,
            agility: this.agility,
            hp: this.hp,
            dp: this.dp,
            victories: this.victories,
        })
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `victories` = :victories WHERE `id` = :id", {
            id: this.id,
            victories: this.victories + 1,
        })
    }

    static async findOne(id: string): Promise<null | WarriorRecord> {
        const [result] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResults;
        return result.length === 0 ? null : new WarriorRecord(result[0]);
    }

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `victories` DESC") as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

}
