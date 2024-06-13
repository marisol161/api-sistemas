const Joi = require('joi');

const id_amistad = Joi.string().uuid();
const id_amigo1= Joi.string().min(3).max(15);
const id_amigo2 = Joi.string().min(3).max(15);
const fecha_amistad = Joi.date();

const createAmigoSchema = Joi.object({
  id_amigo1:id_amigo1.required(),
  id_amigo2:id_amigo2.required(),
  fecha_amistad: fecha_amistad.required(),
});

const updateAmigoSchema = Joi.object({
  id_amigo1:id_amigo1,
  id_amigo2:id_amigo2,
  fecha_amistad:fecha_amistad,
});

const getAmigoSchema = Joi.object({
  id_amistad:id_amistad.required(),
});

module.exports = {createAmigoSchema, updateAmigoSchema, getAmigoSchema}
