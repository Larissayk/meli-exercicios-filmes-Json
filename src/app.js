const express = require('express')
const app = express()

//rotas
const index = require('./routes/index')
const filmes = require('./routes/filmesRoute')

app.use('/', index)
app.use('/filmes', filmes)

module.exports = app