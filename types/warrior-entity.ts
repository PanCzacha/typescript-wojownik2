export interface WarriorEntity {
    id?:string,
    name: string,
    strength: number,
    defense: number,
    endurance: number,
    agility: number,
    hp?: number
    dp?: number;
    victories?: number,
}
