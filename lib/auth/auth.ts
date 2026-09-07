import { betterAuth } from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb"
import {MongoClient} from "mongodb";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {initializeUserBoard} from "@/lib/init-user-board";

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
    session:{
      cookieCache:{
          enabled:true,
          maxAge: 60*60
      }
    },
    emailAndPassword: {
        enabled:true
    },
    databaseHooks:{
        user: {
            create: {
                after: async(user)=>{
                    if(user.id){
                        await initializeUserBoard(user.id);
                    }
                }
            }
        }
    }
});

export async function getSession(){
    const result = await auth.api.getSession({
        headers: await headers()
    });
    return result;
}

export async function signOut(){
    const result = await auth.api.signOut({
        headers: await headers()
    });
    if(result.success){
        redirect("/sign-in");
    }
}