import { Db, MongoClient } from "mongodb";
import { Grain } from './grain'
import { Hop } from './hops'
import { Yeast } from './yeast'

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

    async connect() {
        this.#client = new MongoClient(`mongodb://${this.user}:${this.passwd}@${this.host}:${this.port}/${this.db}`);
        this.#database = await this.#client.db(this.db);
    }

    async disconnect() {
        if(this.#client) {
            await this.#client.close();
        }
    }

    async getGrainNamesAsync(): Promise<string[]> {
        if(!this.#database) throw new Error('database not yet connected');
        const collection = this.#database.collection<Grain>("grain");
        var grainNames: string[] = [];
        (await collection.find({}).toArray()).forEach(element => {
            grainNames.push(element.name);
        });
        return grainNames;
    }

    async getGrainAsync(Name: string): Promise<Grain> {
        if(!this.#database) throw new Error('database not yet connected');
        return await this.#database.collection<Grain>("grain").findOne({name: Name}) as Grain;
    }

    async getHopNamesAsync(): Promise<string[]> {
        if(!this.#database) throw new Error('database not yet connected');
        const collection = this.#database.collection<Hop>("hop");
        var hopNames: string[] = [];
        (await collection.find({}).toArray()).forEach(element => {
            hopNames.push(element.name);
        });
        return hopNames;
    }

    async getHopAsync(Name: string): Promise<Hop> {
        if(!this.#database) throw new Error('database not yet connected');
        return await this.#database.collection<Hop>("hop").findOne({name: Name}) as Hop;
    }

    async getYeastNamesAsync(): Promise<string[]> {
        if(!this.#database) throw new Error('database not yet connected');
        const collection = this.#database.collection<Yeast>("yeast");
        var yeastNames: string[] = [];
        (await collection.find({}).toArray()).forEach(element => {
            yeastNames.push(element.name);
        });
        return yeastNames;
    }

    async getYeastAsync(Name: string): Promise<Yeast> {
        if(!this.#database) throw new Error('database not yet connected');
        return await this.#database.collection<Yeast>("yeast").findOne({name: Name}) as Yeast;
    }
}