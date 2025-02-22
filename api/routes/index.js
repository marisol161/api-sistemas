const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const amigosRouter = require('./amigo.router')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/amigos',amigosRouter );
}

module.exports = routerApi;
