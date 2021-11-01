const debug = require('debug')('storefront:routes:index')
const express = require('express')
const router = express.Router()
const AppController = require('../controllers/AppController')
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.index)
router.get('/health', AppController.health)

module.exports = router
