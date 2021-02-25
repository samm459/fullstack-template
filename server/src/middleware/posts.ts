import { Middleware } from "koa";
import { Authtype } from "../enums/Authtype";
import { object, string } from "joi";
import { Post } from "../db";

export const index: Middleware = async (ctx) => {
  const schema = object({
    search: string(),
    category: string(),
  });

  try {
    await schema.validateAsync(ctx.query, { abortEarly: true });
  } catch (err) {
    ctx.status = 422;
    ctx.body = err.details[0].message;
    return;
  }

  if (ctx.query.search) {
    const posts = await Post.find({
      $or: [
        { title: ctx.query.search as string },
        { body: ctx.query.search as string },
      ],
    }).toArray();
    ctx.status = 200;
    ctx.body = posts;
  } else if (ctx.query.category) {
    const result = await Post.find({
      category: ctx.query.category as string,
    }).toArray();
    ctx.status = 200;
    ctx.body = result;
    return;
  } else {
    const result = await Post.find(ctx.query).limit(100).toArray();
    ctx.status = 200;
    ctx.body = result;
  }
};

export const find: Middleware = async (ctx) => {
  const { id } = ctx.params;

  const schema = string();

  try {
    await schema.validateAsync(id);
  } catch (err) {
    ctx.status = 404;
    ctx.body = "This post can not be found.";
    return;
  }
  const post = await Post.findOne({ _id: id });
  if (!post) {
    ctx.status = 404;
    ctx.body = "This post can not be found.";
  }
  ctx.status = 200;
  ctx.body = post;
};

export const create: Middleware = async (ctx) => {
  if (ctx.auth.type !== Authtype.Admin) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  }

  const schema = object({
    title: string().required(),
    body: string().required(),
    category: string().required(),
    featuredImage: string().required(),
  });
  // validate body
  try {
    await schema.validateAsync(ctx.request.body, { abortEarly: true });
  } catch (err) {
    ctx.status = 422;
    ctx.body = err.details[0].message;
    return;
  }

  // create post
  await Post.insertOne(ctx.request.body);
  ctx.status = 201;
  ctx.body = "Post created";
};

export const update: Middleware = async (ctx) => {
  if (ctx.auth.type !== Authtype.Admin) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  }

  // Find post from url
  const { id } = ctx.params;
  // validate body
  const schema = object({
    title: string(),
    body: string(),
    category: string(),
    featuredImage: string(),
  });
  try {
    await schema.validateAsync(ctx.request.body);
  } catch {
    ctx.status = 422;
    ctx.body = "Invalid request body";
    return;
  }
  // update post
  try {
    await Post.updateOne({ _id: id }, ctx.request.body);
  } catch (err) {
    ctx.status = 404;
    ctx.body = "Post not found";
    return;
  }
  ctx.status = 200;
  ctx.body = "Post updated";
};

export const destroy: Middleware = async (ctx) => {
  if (ctx.auth.type !== Authtype.Admin) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  }

  // Find post from url
  const { id } = ctx.params;
  // delete post
  try {
    await Post.deleteOne({ _id: id });
  } catch (err) {
    ctx.status = 404;
    ctx.body = "Post not found";
    return;
  }
  ctx.status = 200;
  ctx.body = "Post deleted";
};
