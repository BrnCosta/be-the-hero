const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController.js');
const SessionController = require('./controllers/SessionController.js');
const ProfileController = require('./controllers/ProfileController.js');
const IncidentController = require('./controllers/IncidentController.js');


const routes = express.Router();

// LOGIN DA ONG
routes.post('/sessions', SessionController.create);

// SELECT DE TODAS AS ONGS
routes.get('/ongs', OngController.index);

// CRIACAO DE UMA ONG
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// SELECT DE TODOS OS CASOS DE UMA ONG
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// SELECT DE TODOS OS CASOS
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

// CRIACAO DE UM CASO
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

// EXCLUIR UM CASO
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);


module.exports = routes;