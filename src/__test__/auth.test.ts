import supertest from 'supertest'
import app from '../app'
import mongoose from '../database'

let request = supertest(app)

test('Prueba de logout', async () => {
    await request
    .get('/logout')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('Prueba de logout', async () => {
    await request
    .get('/error')
    .expect(401)
    .expect('Content-type', /application\/json/)
})


afterAll(() => {
    mongoose.connection.close()
})