import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from 'koa-bodyparser';
import passport from "koa-passport";

import { router as articlesRouter } from './routes/articles';
import { router as specialRouter } from './routes/special';

import serve from 'koa-static-folder';

const app: Koa = new Koa();
// const router: Router = new Router();

// const welcomeAPI = async (ctx: RouterContext, next: any) => {
//   ctx.body = { message: "Welcome to the blog API" };
//   await next();
// }

// router.get('/api/v1', welcomeAPI);

app.use(serve('./docs'));

app.use(logger());
app.use(json());
app.use(passport.initialize());
// app.use(router.routes());
app.use(bodyParser());
app.use(articlesRouter.routes());
app.use(specialRouter.routes());

app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    if (ctx.status === 404)
      ctx.body = { err: "No such endpoint existed" }
  }
  catch {

  }
})

app.listen(10888);