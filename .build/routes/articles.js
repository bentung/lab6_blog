"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var articles_exports = {};
__export(articles_exports, {
  router: () => router
});
module.exports = __toCommonJS(articles_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
const articles = [
  {
    title: "Hello article",
    fullText: "some text to fill the body"
  },
  {
    title: "Another article",
    fullText: "again some text to fill the body"
  },
  {
    title: "Coventry article",
    fullText: "some coventry details to fill the body"
  },
  {
    title: "smart campus",
    fullText: "smart campus ..."
  }
];
const router = new import_koa_router.default({ prefix: "/api/v1/articles" });
const getAll = async (ctx, next) => {
  ctx.body = articles;
  await next();
};
const createArticle = async (ctx, next) => {
  let { title, fullText } = ctx.request.body;
  let newArticle = { title, fullText };
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
  await next();
};
const getById = async (ctx, next) => {
  await next();
};
const updateArticle = async (ctx, next) => {
  await next();
};
const deleteArticle = async (ctx, next) => {
  await next();
};
router.get("/", getAll);
router.post("/", (0, import_koa_bodyparser.default)(), createArticle);
router.get("/:id", getById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=articles.js.map