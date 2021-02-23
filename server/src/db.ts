import { Collection, MongoClient } from "mongodb";
import { IUser } from "src/interfaces/IUser";
import { IPost } from "./interfaces/IPost";

export let User: Collection<IUser>;
export let Post: Collection<IPost>;

export const connectClient = async () => {
  const client = new MongoClient("mongodb://127.0.0.1/");
  await client.connect();

  const db = client.db(process.env.DB_NAME);

  User = db.collection("users");
  Post = db.collection("posts");
};
