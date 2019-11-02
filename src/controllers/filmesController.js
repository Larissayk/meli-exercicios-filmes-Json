const filmes = require("../models/filmes.json");
const fs = require("fs");

// MÉTODO GET

//BUSCAR LISTA DE TODOS OS FILMES
exports.get = (req, res) => {
  // console.log("req",req.url);
  res.status(200).send(filmes);
};

//BUSCAR PELO NOME DO DIRETOR
//Passar Frank%20Darabont  %20 quando tiver espaço nos nomes
exports.getByDiretor = (req, res) => {
  const diretor = req.params.diretor.toLowerCase();
  const busca = filmes.filter(
    filme => filme.director.toLowerCase() === diretor
  );
  if (busca.length === 0) {
    res
      .status(404)
      .send(`Nenhum filme com o diretor ${diretor} foi encontrado!`);
  } else {
    res.status(200).send(busca);
  }
};

//BUSCAR FILMES POR GÊNERO (FOR LOOP)
// exports.getMovieByGenre = (req, res) => {
//   const generoEscolhido = req.params.genero;
//   let filmesDoGenero = [];

//   for (let i = 0; i < filmes.length; i++) {
//     //1ª interação está entrando dentro de cada objeto(filme) da array (lista de filmes)
//     for (let j = 0; j < filmes[i].genre.length; j++) {
//       //2ª interação, está percorrendo dentro de cada objeto(filme) para entrar dentro da propriedade "genre"
//       if (filmes[i].genre[j] === generoEscolhido) {
//         // percorre a array "genre" de cada filme e se encontrar o genero escolhido dentro dele, retorna "true"
//         filmesDoGenero.push(filmes[i]); // Monta uma array nova de "filmes que contém o gênero selecionado"
//       }
//     }
//   }
//   if (filmesDoGenero.length === 0) {
//     // caso não encontre nenhum filme com o gênero selecionado, a array de "filmes do gênero" ficará vazia, retorna um status code de 404
//     return res
//       .status(404)
//       .send(
//         `Não foi possível encontrar filmes para o gênero ${generoEscolhido}.`
//       );
//   } else {
//     res.status(200).send(filmesDoGenero);
//   }
// };

//CÓDIGO "REDUZIDO" PARA FAZER A BUSCA POR GÊNERO
exports.getMovieByGenre = (req, res) => {
  const generoEscolhido = req.params.genero;
  let filmesDoGenero = [];
  novoIndice = 0;
  const mapa = filmes.map(filme => filme.genre);  //trouxe a array de genre de cada filme

  function procurarGenero(item, indice) {
    if (mapa[indice].includes(generoEscolhido) == true) { //dentro dos gêneros de cada filme eu verifiquei se o gênero selecionado existia
      filmesDoGenero[novoIndice] = filmes[indice];  // se o gênero existisse, eu coloquei os objetos Filme dentro dessa nova array de "filmes do genero"
      novoIndice++;  // incremento de 1 no índice da array nova, para que os filmes nao fosse sobrepostos
    }
  }

mapa.forEach(procurarGenero);

console.log(filmesDoGenero)

  if (filmesDoGenero.length === 0) {
    // caso não encontre nenhum filme com o gênero selecionado, a array de "filmes do gênero" ficará vazia, retorna um status code de 404
    return res
      .status(404)
      .send(
        `Não foi possível encontrar filmes para o gênero ${generoEscolhido}.`
      );
  } else {
    res.status(200).send(filmesDoGenero);
  }
};

//------------------------------------------------------------------------------------------------------------------------------------------------

// MÉTODO POST

//ADICIONA NOVOS FILMES A LISTA
exports.post = (req, res) => {
  const { title, year, director, duration, rate, genre } = req.body;
  filmes.push({ title, year, director, duration, rate, genre });

  fs.writeFile(
    "./src/model/filmes.json",
    JSON.stringify(filmes),
    "utf8",
    function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    }
  );
  return res.status(201).send(filmes);
};

//ADICIONA UM NOVO GÊNERO A UM FILME EXISTENTE
exports.postNewGenreForMovie = (req, res) => {
    const titulo = req.params.titulo;
    const buscarFilme = filmes.find(filme => filme.title === titulo)
    if(!buscarFilme){
      return res.status(404).send(
        `Não foi possível encontrar filmes para o gênero ${generoEscolhido}.`);
    }
      const {genre} = req.body;
      //console.log(buscarFilme.genre);
      buscarFilme.genre.push(genre)
      console.log(buscarFilme)
  }
    
    



    // for (let i = 0; i < buscaTitulo.genre; i++) {
    //     if (buscaTitulo.genre[i].contain(genre) == false) {
    //       buscaTitulo.push(genre); // Monta uma array nova de "filmes que contém o gênero selecionado"
    //     console.log(genre)
    //     console.log(buscaTitulo)
        
    //   }
    // }



