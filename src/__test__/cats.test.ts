import supertest from 'supertest'
import app from '../app'
import mongoose from '../database'
import { getCats } from '../utils/getCats'

let request = supertest(app)

/* Siempre deberia de dar 100 por el valor limit en el endpoint de the cat api */
test("Prueba", async () => {
    let cats = await getCats()
    expect(cats.data.length).toBe(100)
})

/* Comprueba si no hay sesion activa para pasar por el middleware */
test('Prueba de logout', async () => {
    await request
    .get('/cats')
    .expect(302)
})


test('Prueba de logout', async () => {
    await request
    .get('/categories')
    .expect(302)
})

test('Prueba de logout', async () => {
    await request
    .get('/filtercats')
    .expect(302)
})

afterAll(() => {
    mongoose.connection.close()
})