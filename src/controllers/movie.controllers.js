const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Actor, Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id,{include: [Genre, Actor, Director]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setMovieGenre = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movie.findByPk(id)
    await movies.setGenres(req.body);
    const genres = await movies.getGenres()
    return res.json(genres)
});
const setMovieActors = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movie.findByPk(id)
    await movies.setActors(req.body);
    const actors = await movies.getActors()
    return res.json(actors)
});
const setMovieDirectors = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movie.findByPk(id)
    await movies.setDirectors(req.body);
    const directors = await movies.getDirectors()
    return res.json(directors)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovieGenre,
    setMovieActors,
    setMovieDirectors
}