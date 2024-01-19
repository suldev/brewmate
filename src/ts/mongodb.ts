import { MongoClient } from "mongodb";
var mongoUser = "user";
var mongoPasswd = "password";
var mongoHost = "mongodb://192.168.1.10";
var mongoDb = "brewmate";
var mongoPort = 27017;

const uri = `mongodb://${mongoUser}:${mongoPasswd}@${mongoHost}:${mongoPort}`;
const client = new MongoClient(uri);

function fetchFromMongoYeast(yeastName: string) {
    console.log("fetchFromMongoYeast");
    const database = client.db(mongoDb);
    const collection = database.collection<Yeast>("yeast");
    const yeast = collection.findOne<Yeast>(
        {name: yeastName}
    );
    console.log(yeast);
    return;
}
function fetchFromMongoHops(hopName: string) {
    console.log("fetchFromMongoYeast");
    const database = client.db(mongoDb);
    const collection = database.collection<Hop>("hop");
    const hop = collection.findOne<Hop>(
        {name: hopName}
    );
    console.log(hop);
    return;
}
function fetchFromMongoGrain(grainName: string) {
    console.log("fetchFromMongoGrain");
    const database = client.db(mongoDb);
    const collection = database.collection<Grain>("grain");
    const grain = collection.findOne<Grain>(
        {name: grainName}
    );
    console.log(grain);
    return;
}
