import { database } from './mongodb'
export interface MongoGrain {
    name: string;
    colorSRM: string;
    type: string;
    potential: string;
    notes: string;
    uses: string;
}

export async function getGrainNamesAsync(): Promise<string[] | undefined> {
    const collection = database.collection<MongoGrain>("grain");
    if(await collection.countDocuments({}) <= 0) {
        return undefined;
    }
    const grains = await collection.find({}).toArray();
    var grainNames: string[] = [];
    grains.forEach(element => {
        grainNames.push(element.name);
    });
    return grainNames;
}

export async function getGrainAsync(Name: string): Promise<MongoGrain | undefined> {
    const collection = database.collection<MongoGrain>("grain");
    if(await collection.countDocuments({}) <= 0) {
        return undefined;
    }
    const grain = await collection.findOne({name: Name}) as MongoGrain;
    return grain;
}