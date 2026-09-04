import { betterAuth } from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb"
import {MongoClient} from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
        transaction: false,
    }),
    emailAndPassword: {
        enabled:true
    }
});
