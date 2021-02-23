import Koa from "koa";
import KoaBodyParser from "koa-bodyparser";
import { routes } from "./router";

const bodyparser = KoaBodyParser();
const app = new Koa();

app.use(bodyparser);
app.use(routes);
