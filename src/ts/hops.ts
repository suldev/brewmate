import { database } from './mongodb'
interface MongoHop {
    name: string;
    description: string;
    alpha: number;
    beta: number;
    profile: string;
    purpose: string;
}

export async function getHopNamesAsync(): Promise<string[] | undefined> {
    const collection = database.collection<MongoHop>("hop");
    if(await collection.countDocuments({}) <= 0) {
        return undefined;
    }
    const hops = await collection.find({}).toArray();
    var hopNames: string[] = [];
    hops.forEach(element => {
        hopNames.push(element.name);
    });
    return hopNames;
}

export async function getHopAsync(Name: string): Promise<MongoHop | undefined> {
    const collection = database.collection<MongoHop>("hop");
    if(await collection.countDocuments({}) <= 0) {
        return undefined;
    }
    const hop = await collection.findOne({name: Name}) as MongoHop;
    return hop;
}