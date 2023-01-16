import request from 'supertest'
import { describe, expect, test } from '@jest/globals'
import createUsersServer from '../modules/servers/users.js'

const server = createUsersServer()

const user = {
  name: 'Anna',
  age: 24,
  hobbies: ['ski', 'codding'],
}

describe('POST/api/users', () => {
  describe('given a user data', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(server).post('/api/users').send(user)
      expect(response.statusCode).toBe(201)
    })
    test('should specify json in the content type header', async () => {
      const response = await request(server).post('/api/users').send(user)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('response has id', async () => {
      const response = await request(server).post('/api/users').send(user)
      expect(response.body.id).toBeDefined()
    })
  })

  describe('when the data is missing', () => {
    test('should respond with a status code of 400', async () => {
      const bodyData = [
        {
          name: 'Anna',
          age: 24,
        },
        {
          name: 'Anna',
          hobbies: ['ski', 'codding'],
        },
        {
          age: 24,
          hobbies: ['ski', 'codding'],
        },
        {},
      ]
      for (const body of bodyData) {
        const response = await request(server).post('/api/users').send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
})
