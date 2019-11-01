const filmes = require('../models/filmes.json')

exports.get = (req, res) => {
    // console.log("req",req.url);
    res.status(200).send(filmes)
}

//buscar pelo diretor
exports.getByDiretor = (req, res) => {
    const diretor = req.params.diretor.toLowerCase()
    const busca = filmes.filter(filme => filme.director.toLowerCase() === diretor)
    if (busca !== diretor) {
        res.status(404).send(`Nenhum filme com o diretor ${diretor} foi encontrado!`)
    }else{
        res.status(200).send(busca)
    }
    console.log(diretor)
}
// buscar filmes por gênero
exports.getMovieByGenre = (req, res) => {
    const generoEscolhido = req.params.genero
    let filmesDoGenero = []
    
  
}
