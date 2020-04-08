const express = require('express');

const OngController = require('./controllers/OngController.js');
const SessionController = require('./controllers/SessionController.js');
const ProfileController = require('./controllers/ProfileController.js');
const IncidentController = require('./controllers/IncidentController.js');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;