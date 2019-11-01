const express = require('express')
const router = express.Router()
const controller = require('../controllers/filmesController')

//Método GET
router.get('/', controller.get)
router.get('/buscar/:diretor', controller.getByDiretor)
router.get('/:genero/buscar', controller.getMovieByGenre)

//Método POST
router.post('/', controller.post)
router.post("/:titulo/add/genero", controller.postNewGenreForMovie);

module.exports = router