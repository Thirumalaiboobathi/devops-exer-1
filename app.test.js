const request = require('supertest');
const express = require('express');
const apiRoute = require('../routes/api');

const app = express();
app.use(express.json());
app.use('/api', apiRoute);

describe('GET /api', () => {
  it('should return welcome message and timestamp', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Welcome to the API!');
    expect(res.body).toHaveProperty('timestamp');
  });
});
