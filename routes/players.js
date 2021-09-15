

const { Router } = require('express');
const playersPost = require('../controller/players.controller');

const router = Router();


router.get('/', playersPost);



module.exports = router;