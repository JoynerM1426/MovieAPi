const Movie = require("./Movie")
const Genre = require("./Genre")
const Director = require('./Director')
const Actor =  require('./Actor')
const { BelongsTo } = require('sequelize')

Movie.belongsToMany(Actor, {through:"MovieActorsId"})
Actor.belongsToMany(Movie,{through:"MovieActorsId"})

Movie.belongsToMany(Genre, {through:'MovieGenresId'})
Genre.belongsToMany(Movie, {through:'MovieGenresId'})

Movie.belongsToMany(Director, {through:'MovieDirectorsId'})
Director.belongsToMany(Movie, {through:'MovieDirectorsId'})



