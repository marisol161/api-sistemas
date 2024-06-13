const express = require('express');

const AmigosService = require('./../services/amigo.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createAmigoSchema, updateAmigoSchema, getAmigoSchema } = require('./../schemas/amigo.schema');

const router = express.Router();
const service = new AmigosService();

router.get('/', async (req, res) => {
  const amigos = await service.find();
  res.json(amigos);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getAmigoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amigo = await service.findOne(id);
      res.json(amigo);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createAmigoSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newAmigo = await service.create(body);
    res.status(201).json(newAmigo);
  }
);

router.patch('/:id',
  validatorHandler(getAmigoSchema, 'params'),
  validatorHandler(updateAmigoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const amigo = await service.update(id, body);
      res.json(amigo);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
