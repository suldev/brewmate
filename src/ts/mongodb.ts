import { MongoClient } from "mongodb";
var mongoUser = "brewmate";
var mongoPasswd = "password";
var mongoHost = "192.168.1.10";
var mongoDb = "brewmate";
var mongoPort = 27017;

const uri = `mongodb://${mongoUser}:${mongoPasswd}@${mongoHost}:${mongoPort}/${mongoDb}`;
const client = new MongoClient(uri);
export const database = client.db(mongoDb);

