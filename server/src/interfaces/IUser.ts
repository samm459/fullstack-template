import { ObjectId } from "mongodb";
import { Authtype } from "src/enums/Authtype";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  type: Authtype;
  team: ObjectId;
}
