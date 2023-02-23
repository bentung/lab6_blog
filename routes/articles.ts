import Router, { RouterContext } from "koa-router";
import bodyParser from 'koa-bodyparser';

const articles = [
  {
    title: 'Hello article',
    fullText: 'some text to fill the body',
    creationDate: new Date()
  },
  {
    title: 'Another article',
    fullText: 'again some text to fill the body',
    creationDate: new Date()
  },
  {
    title: 'Coventry article',
    fullText: 'some coventry details to fill the body',
    creationDate: new Date()
  },
  {
    title: 'smart campus',
    fullText: 'smart campus ...',
    creationDate: new Date()
  },
]

const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles;
  await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
  let { title, fullText } = ctx.request.body;
  let newArticle = { title: title, fullText: fullText, creationDate: new Date() };
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if ((id < articles.length + 1) && (id > 0)) {
    ctx.status = 200;
    ctx.body = articles[id - 1];
  } else {
    ctx.status = 404;
  }
  await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let { title, fullText } = ctx.request.body;
  let updateArticle = { title: title ?? '', fullText: fullText ?? '', editedDate: new Date() };

  if (id < articles.length + 1 && id > 0) {
    articles[id - 1] = {
      ...articles[id - 1],
      ...updateArticle
    };
    ctx.status = 200;
    ctx.body = updateArticle;
  } else {
    ctx.status = 404;
  }
  await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;

  if (id < articles.length + 1 && id > 0) {
    articles.splice(id - 1, 1);
    ctx.status = 200;
    ctx.body = { message: "deleted" };
  } else {
    ctx.status = 404;
  }

  await next();
}

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };