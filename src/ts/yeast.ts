import { database } from './mongodb'
export interface MongoYeast {
    name: string;
    yType: string;
    templo: string; //F
    temphi: string; //F
    attenuation: string;
    flocculation: string;
    note: string | undefined;
    bestfor: string | undefined;
}

export async function getYeastNamesAsync(): Promise<string[] | undefined> {
    const collection = database.collection<MongoYeast>("yeast");
    if(await collection.countDocuments({}) <= 0) {
        return undefined;
    }
    const yeasts = await collection.find({}).toArray();
    var yeastNames: string[] = [];
    yeasts.forEach(element => {
        yeastNames.push(element.name);
    });
    return yeastNames;
}

export async function getYeastAsync(Name: string): Promise<MongoYeast | undefined> {
    const collection = database.collection<MongoYeast>("yeast");
    if(await collection.countDocuments({}) <= 0) {
        return undefined;
    }
    const yeast = await collection.findOne({name: Name}) as MongoYeast;
    return yeast;
}