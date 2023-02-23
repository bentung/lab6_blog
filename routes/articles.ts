import Router, { RouterContext } from "koa-router";

const articles = [
  {
    title: 'Hello article',
    fullText: 'some text to fill the body'
  },
  {
    title: 'Another article',
    fullText: 'again some text to fill the body'
  },
  {
    title: 'Coventry article',
    fullText: 'some coventry details to fill the body'
  },
  {
    title: 'smart campus',
    fullText: 'smart campus ...'
  },
]

const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles;
  await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
  await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
  await next();
}

router.get('/', getAll);
router.post('/', createArticle);
router.get('/:id', getById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export { router };