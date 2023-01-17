import request from 'supertest'
import { describe, expect, test, beforeAll } from '@jest/globals'
import createUsersServer from '../modules/servers/users.js'
import { updateUsersData } from '../modules/database/database.js'

const server = createUsersServer()

const user = {
  username: 'Anna',
  age: 24,
  hobbies: ['ski', 'codding'],
}

beforeAll(async () => {
  await updateUsersData([])
});

describe('1 scenario', () => {
  test('Get empty list', async() => {
      const response = await request(server).get('/api/users')
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual([])
  })
  test('Create User', async () => {
    const response = await request(server).post('/api/users').send(user)
    expect(response.statusCode).toBe(201)
    expect(response.body.username).toStrictEqual(user.username)
    expect(response.body.age).toStrictEqual(user.age)
    expect(response.body.hobbies).toStrictEqual(user.hobbies)
    expect(response.body.id).toBeDefined()
})

  test('Get user by id', async() => {
    const response = await request(server).get('/api/users')
    const userResponse = await request(server).get(`/api/users/${response.body[0].id}`)
    expect(userResponse.body.username).toStrictEqual(user.username)
    expect(userResponse.body.age).toStrictEqual(user.age)
    expect(userResponse.body.hobbies).toStrictEqual(user.hobbies)
    expect(userResponse.body.id).toBeDefined()
})
  test('Update user', async() => {
    const response = await request(server).get('/api/users')
    const userResponse = await request(server).put(`/api/users/${response.body[0].id}`).send({
      username: "baby",
      age: user.age,
      hobbies: user.hobbies
    })
    expect(userResponse.statusCode).toBe(200)
    expect(userResponse.body.username).toStrictEqual("baby")
    expect(userResponse.body.age).toStrictEqual(user.age)
    expect(userResponse.body.hobbies).toStrictEqual(user.hobbies)
    expect(userResponse.body.id).toBeDefined()
})

test('Delete user', async() => {
  const response = await request(server).get('/api/users')
  const userResponse = await request(server).delete(`/api/users/${response.body[0].id}`)
  expect(userResponse.statusCode).toBe(204)
})

test('Get empty list', async() => {
  const response = await request(server).get('/api/users')
  expect(response.statusCode).toBe(200)
  expect(response.body).toStrictEqual([])
})
})