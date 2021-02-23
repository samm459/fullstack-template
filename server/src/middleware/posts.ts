import { Middleware } from "koa";
import { Authtype } from "../enums/Authtype";
import { object, string } from "joi";
import { Post } from "../db";

export const index: Middleware = async (ctx) => {
  const schema = object({
    title: string(),
    body: string(),
    category: string(),
  });

  try {
    await schema.validateAsync(ctx.query);
  } catch {
    ctx.status = 422;
    ctx.body = "Invalid query";
    return;
  }

  const result = await Post.find(ctx.query).limit(100).toArray();
  return result;
};

export const find: Middleware = async (ctx) => {
  const { id } = ctx.params;

  const schema = string();

  await schema.validateAsync(id);

  // await Post.findOne({ _id: id })

  ctx.body = id;
};

export const create: Middleware = (ctx) => {
  if (ctx.auth.type !== Authtype.Admin) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  }

  // validate body
  // create post
};

export const update: Middleware = (ctx) => {
  if (ctx.auth.type !== Authtype.Admin) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  }

  // Find post from url
  // validate body
  // create post
};

export const destroy: Middleware = (ctx) => {
  if (ctx.auth.type !== Authtype.Admin) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  }

  // Find post from url
  // delete post
};
