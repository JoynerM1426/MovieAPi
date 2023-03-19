const request = require('supertest')
const app = require('../app')
require('../models')

let genresId;
test("POST /genres create genres", async() => {
  const newGenre = {
    name:"adventure",
  }
  const res = await request(app)
  .post("/genres")
  .send(newGenre);
  genresId = res.body.id
  // console.log(res.body);
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newGenre.firstName)
})

test('GET /genres return all genres', async()=>{
  const res= await request(app)
  .get('/genres')
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("PUT /genres  update a genres", async()=>{
  const body ={
    name:"adventure update"
  }
  const res = await request(app)
  .put(`/genres/${genresId}`)
  .send(body);
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(body.name)

})

test("DELETE /genres  detroy", async()=> {
  const res = await request(app)
  .delete(`/genres/${genresId}`)
  expect(res.status).toBe(204)
})