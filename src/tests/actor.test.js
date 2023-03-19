const request = require('supertest')
const app = require('../app')
require('../models')

let actorsId;
test("POST /actors create actors", async() => {
  const newActor = {
    firstName:"Jhonny",
    lastName: "Deep",
    nacionality:"Usa",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZg0LkjpQXlziSr5_EWuBHfWWAgshRU0TNVQ&usqp=CAU",
    birthday:"1980-02-08"
  }
  const res = await request(app)
  .post("/actors")
  .send(newActor);
  actorsId = res.body.id
  // console.log(res.body);
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newActor.firstName)
})

test('GET /actors return all actors', async()=>{
  const res= await request(app)
  .get('/actors')
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("PUT /actors  update a actors", async()=>{
  const body ={
    firstName:"Jhonny update"
  }
  const res = await request(app)
  .put(`/actors/${actorsId}`)
  .send(body);
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(body.firstName)

})

test("DELETE /actors  detroy", async()=> {
  const res = await request(app)
  .delete(`/actors/${actorsId}`)
  expect(res.status).toBe(204)
})