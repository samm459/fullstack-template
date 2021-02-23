import KoaRouter from "koa-router";
import * as Users from "./middleware/users";
import * as Posts from "./middleware/posts";

const router = new KoaRouter();

router.get("/users", Users.index);
router.post("/users", Users.register);
router.post("/users/login", Users.login);
router.put("/users/invite", Users.update);
router.put("/users", Users.update);
router.delete("/users", Users.destroy);

router.get("/posts", Posts.index);
router.get("/posts/:id", Posts.find);
router.post("/posts", Posts.create);
router.put("/posts", Posts.update);
router.delete("/posts", Posts.destroy);

export const routes = router.routes();
