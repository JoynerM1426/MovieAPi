const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require('../models')
require('../models/Genre')
require('../models/Actor')
require('../models/Director')
let moviesId;
test("POST /movies create movies", async() => {
  const newMovie = {
    name:"Thor",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZg0LkjpQXlziSr5_EWuBHfWWAgshRU0TNVQ&usqp=CAU",
    synopsis:"Odien will dead and Thor with your brother Loky save Asgard",
    releaseYear:2018
  }
  const res = await request(app)
  .post("/movies")
  .send(newMovie);
  moviesId = res.body.id
  // console.log(res.body);
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newMovie.firstName)
})

test('GET /movies return all movies', async()=>{
  const res= await request(app)
  .get('/movies')
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("PUT /movies  update a movies", async()=>{
  const body ={
    name:"Thor Ragnarok"
  }
  const res = await request(app)
  .put(`/movies/${moviesId}`)
  .send(body);
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(body.firstName)

})

test("POST /movies/:id/genres set movie genres ", async()=>{
  const genres = await Genre.create({
    name:"Action"
  })
  const res = await request(app)
  .post(`/movies/${moviesId}/genres`)
  .send([genres.id])
  // console.log(res.body);
  await genres.destroy();
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})
test("POST /movies/:id/actors set movie actors ", async()=>{
  const actors = await Actor.create({
    firstName:"Taiki",
    lastName: "Deep",
    nacionality:"Usa",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZg0LkjpQXlziSr5_EWuBHfWWAgshRU0TNVQ&usqp=CAU",
    birthday:"1980-02-08"
  })
  const res = await request(app)
  .post(`/movies/${moviesId}/actors`)
  .send([actors.id])
  console.log(res.body);
  await actors.destroy();
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("POST /movies/:id/directors set movie directors ", async()=>{
  const directors = await Director.create({
    firstName:"Taiki",
    lastName: "Waititi",
    nacionality:"New Zeland",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZg0LkjpQXlziSr5_EWuBHfWWAgshRU0TNVQ&usqp=CAU",
    birthday:"1978-08-16"
  })
  const res = await request(app)
  .post(`/movies/${moviesId}/directors`)
  .send([directors.id])
  console.log(res.body);
  await directors.destroy();
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})


test("DELETE /movies  detroy", async()=> {
  const res = await request(app)
  .delete(`/movies/${moviesId}`)
  expect(res.status).toBe(204)
})
