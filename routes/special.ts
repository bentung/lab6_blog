import Router, { RouterContext } from "koa-router";
import { basicAuth } from "../controllers/auth";

const router = new Router({ prefix: '/api/v1' });

// Just for testing
router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: 'Public API return'
  };
  await next();
})

// Add a protexted route that requires authentication
router.get("/private", basicAuth);

export { router };