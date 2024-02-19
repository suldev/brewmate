import { Db, MongoClient } from "mongodb";
import { Grain } from './grain'
import { Hop } from './hops'
import { Yeast } from './yeast'
var mongoUser = "brewmate";
var mongoPasswd = "password";
var mongoHost = "192.168.1.10";
var mongoDb = "brewmate";
var mongoPort = 27017;

const uri = `mongodb://${mongoUser}:${mongoPasswd}@${mongoHost}:${mongoPort}/${mongoDb}`;
const client = new MongoClient(uri);
export const database = client.db(mongoDb);

export class BMMongo {
    user: string;
    passwd: string;
    host: string;
    db: string;
    port: number = 27017;
    #client?: MongoClient;
    #database?: Db;

    constructor(user: string, passwd: string, host: string, db: string, port?: number) {
        this.user = user;
        this.passwd = passwd;
        this.host = host;
        this.db = db;
        if(port) {
            this.port = port;
        }
    }

    connect() {
        this.#client = new MongoClient(`mongodb://${this.user}:${this.passwd}@${this.host}:${this.port}/${this.db}`);
        this.#database = this.#client.db(this.db);
    }

    disconnect() {
        if(this.#client) {
            this.#client.close();
        }
    }

    async getGrainNamesAsync(): Promise<string[] | undefined> {
        const collection = database.collection<Grain>("grain");
        return new Promise<string[] | undefined>(async(resolve, reject) => {
            if(await collection.countDocuments({}) <= 0) {
                reject('grains were not found at this location');
            }
            var grainNames: string[] = [];
            const grains = await collection.find({}).toArray();
            grains.forEach(element => {
                grainNames.push(element.name);
            });
            resolve(grainNames);
        });
    }

    async getGrainAsync(Name: string): Promise<Grain | undefined> {
        const collection = database.collection<Grain>("grain");
        return new Promise<Grain | undefined>(async(resolve, reject) => {
            if(await collection.countDocuments({}) <= 0) {
                reject('grain request failed: grain could not be found')
            }
            resolve(await collection.findOne({name: Name}) as Grain);
        });
    }

    async getHopNamesAsync(): Promise<string[] | undefined> {
        const collection = database.collection<Hop>("hop");
        return new Promise<string[] | undefined>(async(resolve, reject) => {
            if(await collection.countDocuments({}) <= 0) {
                reject('hops were not found at this location')
            }
            const hops = await collection.find({}).toArray();
            var hopNames: string[] = [];
            hops.forEach(element => {
                hopNames.push(element.name);
            });
            resolve(hopNames);
        });
    }

    async getHopAsync(Name: string): Promise<Hop | undefined> {
        const collection = database.collection<Hop>("hop");
        return new Promise<Hop | undefined>(async(resolve, reject) => {
            if(await collection.countDocuments({}) <= 0) {
                reject('hop request failed: hop could not be found');
            }
            resolve(await collection.findOne({name: Name}) as Hop);
        });
    }

    async getYeastNamesAsync(): Promise<string[] | undefined> {
        const collection = database.collection<Yeast>("yeast");
        return new Promise<string[] | undefined>(async(resolve, reject) => {
            if(await collection.countDocuments({}) <= 0) {
                reject('yeasts were not found at this location');
            }
            const yeasts = await collection.find({}).toArray();
            var yeastNames: string[] = [];
            yeasts.forEach(element => {
                yeastNames.push(element.name);
            });
            resolve(yeastNames);
        });
    }

    async getYeastAsync(Name: string): Promise<Yeast | undefined> {
        const collection = database.collection<Yeast>("yeast");
        return new Promise<Yeast | undefined>(async(resolve,reject) => {
            if(await collection.countDocuments({}) <= 0) {
                reject('yeast request failed: yeast could not be found')
            }
            resolve(await collection.findOne({name: Name}) as Yeast);
        });
    }
}