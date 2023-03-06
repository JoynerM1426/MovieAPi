const express = require('express');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const genreRouter = require('./genre.router');
const movieRouter = require('./movie.router');
const router = express.Router();

//rutas de generos
router.use('/genres', genreRouter)

// rutas de actores
router.use('/actors', actorRouter)

// ruta de directores
router.use('/directors', directorRouter)

// ruta de las peliculas
router.use('/movies', movieRouter)


module.exports = router;