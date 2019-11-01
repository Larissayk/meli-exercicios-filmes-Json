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
exports.getMovieByGenre = (req, res) => {
  const generoEscolhido = req.params.genero;
  let filmesDoGenero = [];

  for (let i = 0; i < movies.length; i++) {
    //1ª interação está entrando dentro de cada objeto(filme) da array (lista de filmes)
    for (let j = 0; j < movies[i].genre.length; j++) {
      //2ª interação, está percorrendo dentro de cada objeto(filme) para entrar dentro da propriedade "genre"
      if (movies[i].genre[j] === generoEscolhido) {
        // percorre a array "genre" de cada filme e se encontrar o genero escolhido dentro dele, retorna "true"
        filmesDoGenero.push(movies[i]); // Monta uma array nova de "filmes que contém o gênero selecionado"
      }
    }
  }
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

//CÓDIGO "REDUZIDO" PARA FAZER A BUSCA POR GÊNERO
// exports.getMovieByGenre = (req, res) => {
//   const generoEscolhido = req.params.genero;
//   let filmesDoGenero = [];
//   novoIndice = 0;
//   const mapa = filmes.map(filme => filme.genre);  //trouxe a array de genre de cada filme

//   function procurarGenero(item, indice) {
//     if (mapa[indice].includes(generoEscolhido) == true) { //dentro dos gêneros de cada filme eu verifiquei se o gênero selecionado existia
//       filmesDoGenero[novoIndice] = filmes[indice];  // se o gênero existisse, eu coloquei os objetos Filme dentro dessa nova array de "filmes do genero"
//       novoIndice++;  // incremento de 1 no índice da array nova, para que os filmes nao fosse sobrepostos
//     }
//   }

// mapa.forEach(procurarGenero);

// console.log(filmesDoGenero)

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

//------------------------------------------------------------------------------------------------------------------------------------------------

// MÉTODO POST

//ADICIONA NOVOS FILMES A LISTA
exports.post = (req, res) => {
  const { title, year, director, duration, rate, genre } = req.body;
  filmes.push({ title, year, director, duration, rate, genre });
  // const novofilme = {
  //     title: req.body.title,
  //     year: req.body.year,
  //     director: req.body.director,
  //     duration: req.body.duration,
  //     rate: req.body.rate,
  //     genre: [req.body.rate]
  // }
  // console.log(filmes)

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
    const {genre} = req.body;
    const newGenreArr = []
    novoIndice = 0;

    const buscaTitulo = filmes.filter(filme => filme.title === titulo)
    const selecionarGenres = buscaTitulo.map(filme => filme.genre)
    // console.log(selecionarGenres);
    // console.log(genero);

    
    function procurarGenero(item, indice) {
    if (selecionarGenres[indice].includes(genre) == false) {
      //dentro dos gêneros de cada filme eu verifiquei se o gênero selecionado existia
      selecionarGenres[indice] = genre; // se o gênero existisse, eu coloquei os objetos Filme dentro dessa nova array de "filmes do genero"
      novoIndice++; // incremento de 1 no índice da array nova, para que os filmes nao fosse sobrepostos
    }
  }
selecionarGenres.forEach(procurarGenero);
   console.log(selecionarGenres);

}

// var array = [
//   {
//     name: "foo1",
//     value: "val1"
//   },
//   {
//     name: "foo1",
//     value: ["val2", "val3"]
//   },
//   {
//     name: "foo2",
//     value: "val4"
//   }
// ];

// var output = [];

// filmes.forEach(function(item) {
//   let existing = newGenreArr.filter(filme => filme.genre);
//   if (existing.length) {
//     let existingIndex = newGenreArr.indexOf(existing[0]);
//     newGenreArr[existingIndex].value = newGenreArr[existingIndex].value.concat(
//       item.value
//     );
//   } else {
//     if (typeof item.value == "string") item.value = [item.value];
//     newGenreArr.push(item);
//   }
// });

// console.dir(newGenreArr);