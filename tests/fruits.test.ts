import app from '../src/app'
import supertest from 'supertest'

const api = supertest(app)

describe('GET /fruits', () => {
  it('should return all fruits', async () => {
    const body = {
      id: 1,
      name: 'manga',
      price: 1200
    }
    await api.post('/fruits').send(body)
    const result = await api.get('/fruits')
    expect(result.status).toEqual(200)
    expect(result.body).toEqual([body])
  })
  it('should return a fruit given an id', async () => {
    const body = {
      id: 1,
      name: 'manga',
      price: 1200
    }
    const result = await api.get('/fruits/1')
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(body)
  })
  it("should return 404 when trying to get a fruit that doesn't exists", async () => {
    const result = await api.get('/fruits/100')
    expect(result.status).toEqual(404)
  })
  it("should return 400 when trying to get a fruit that doesn't exists", async () => {
    const result = await api.get('/fruits/fruta')
    expect(result.status).toEqual(400)
  })
})

describe('POST /fruits', () => {
  it('should return 201 when inserting fruit', async () => {
    const body = {
      name: 'morango',
      price: 1200
    }
    const result = await api.post('/fruits').send(body)
    expect(result.status).toEqual(201)
  })
  it('should return 409 when inserting fruit with same name', async () => {
    const body = {
      name: 'morango',
      price: 1200
    }
    const result = await api.post('/fruits').send(body)
    expect(result.status).toEqual(409)
  })
  it('should return 422 when inserting fruit with data missing', async () => {
    const body = {
      name: 'manga'
    }
    const result = await api.post('/fruits').send(body)
    expect(result.status).toEqual(422)
  })
  it('should return 422 when inserting fruit with data missing', async () => {
    const body = {
      price: 1200
    }
    const result = await api.post('/fruits').send(body)
    expect(result.status).toEqual(422)
  })
})
