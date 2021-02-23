import KoaRouter from "koa-router";
import * as Users from "./middleware/users";

const router = new KoaRouter();

router.get("/users", Users.index);
router.post("/users", Users.register);
router.post("/users/login", Users.login);
router.put("/users/invite", Users.update);
router.put("/users", Users.update);
router.delete("/users", Users.destroy);

export const routes = router.routes();
