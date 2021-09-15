
const { Router } = require('express');
const teamGet = require('../controller/team.controller');

const route = Router();




route.post('/', teamGet)



module.exports = route