const express = require('express')
const router = express.Router()
const controller = require('../controllers/filmesController')

router.get('/', controller.get)
router.get('/buscar/:diretor', controller.getByDiretor)
router.get('/:genero/buscar', controller.getMovieByGenre)

module.exports = router