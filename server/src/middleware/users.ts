import { Middleware } from "koa";
import { Authtype } from "../enums/Authtype";
import { number, object, string } from "joi";

export const index: Middleware = (ctx) => {
  const schema = object({
    _id: string(),
    firstName: string(),
    lastName: string(),
    type: number().valid(Authtype.Admin, Authtype.Free, Authtype.Pro, Authtype.Unauthenticated),
    email: string().email(),
    team: string(),
  });

  // Todo: validate schema
  schema;

  // Todo: respond according to auth type
  switch (ctx.auth.type) {
    case Authtype.Admin:
      break;
    case Authtype.Free | Authtype.Pro:
      break;
    case Authtype.Unauthenticated:
      break;
  }
};

export const update: Middleware = () => {};

export const register: Middleware = () => {};

export const login: Middleware = () => {};

export const invite: Middleware = () => {};

export const destroy: Middleware = () => {};
