/*
  Server testing file
*/

const request = require('supertest');
const app = require('../server/app');

describe('Server file test', () => {
  test('It should return 200', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
  });
});
