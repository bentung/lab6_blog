import Router, { RouterContext } from "koa-router";
import bodyParser from 'koa-bodyparser';
import * as model from "../models/articles";

// const articles = [
//   {
//     title: 'Hello article',
//     fullText: 'some text to fill the body',
//     creationDate: new Date()
//   },
//   {
//     title: 'Another article',
//     fullText: 'again some text to fill the body',
//     creationDate: new Date()
//   },
//   {
//     title: 'Coventry article',
//     fullText: 'some coventry details to fill the body',
//     creationDate: new Date()
//   },
//   {
//     title: 'smart campus',
//     fullText: 'smart campus ...',
//     creationDate: new Date()
//   },
// ]

const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  // ctx.body = articles;
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  } else {
    ctx.body = {};
  }
  await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
  // let { title, fullText } = ctx.request.body;
  // let newArticle = { title: title, fullText: fullText, creationDate: new Date() };
  // articles.push(newArticle);
  // ctx.status = 201;
  // ctx.body = newArticle;

  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }

  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  // if ((id < articles.length + 1) && (id > 0)) {
  //   ctx.status = 200;
  //   ctx.body = articles[id - 1];
  // } else {
  //   ctx.status = 404;
  // }
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 400;
  }
  await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  // let { title, fullText } = ctx.request.body;
  // let updateArticle = { title: title ?? '', fullText: fullText ?? '', editedDate: new Date() };

  // if (id < articles.length + 1 && id > 0) {
  //   articles[id - 1] = {
  //     ...articles[id - 1],
  //     ...updateArticle
  //   };
  //   ctx.status = 200;
  //   ctx.body = updateArticle;
  // } else {
  //   ctx.status = 404;
  // }

  const body = ctx.request.body;
  let result = await model.update(body, id);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }

  await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;

  // if (id < articles.length + 1 && id > 0) {
  //   articles.splice(id - 1, 1);
  //   ctx.status = 200;
  //   ctx.body = { message: "deleted" };
  // } else {
  //   ctx.status = 404;
  // }
  let result = await model.deleteArticle(id);
  if (result) {
    ctx.body = { msg: `${id} deleted` };
  } else {
    ctx.status = 400;
  }


  await next();
}

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };