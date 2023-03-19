const request = require('supertest')
const app = require('../app')
require('../models')

let directorsId;
test("POST /directors create directors", async() => {
  const newDirector = {
    firstName:"Taiki",
    lastName: "Waititi",
    nacionality:"New Zeland",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZg0LkjpQXlziSr5_EWuBHfWWAgshRU0TNVQ&usqp=CAU",
    birthday:"1978-08-16"
  }
  const res = await request(app)
  .post("/directors")
  .send(newDirector);
  directorsId = res.body.id
  // console.log(res.body);
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newDirector.firstName)
})

test('GET /directors return all directors', async()=>{
  const res= await request(app)
  .get('/directors')
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("PUT /directors  update a directors", async()=>{
  const body ={
    firstName:"Taiki update"
  }
  const res = await request(app)
  .put(`/directors/${directorsId}`)
  .send(body);
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(body.firstName)

})

test("DELETE /directors  detroy", async()=> {
  const res = await request(app)
  .delete(`/directors/${directorsId}`)
  expect(res.status).toBe(204)
})