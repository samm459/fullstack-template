import { Middleware } from "koa";
import { Authtype } from "src/enums/Authtype";
import { object, string } from "joi";
import { Post } from "src/db";

export const index: Middleware = async (ctx) => {
  const schema = object({
    title: string(),
    body: string(),
    category: string(),
  });

  await schema.validateAsync(ctx.query);

  const result = await Post.find(ctx.query).limit(100).toArray();
  return result;
};

export const find: Middleware = () => {
  // Get by id
  // await Post.findOne({ _id: "" });
  // return post
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
