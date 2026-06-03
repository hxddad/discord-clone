import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

describe('Auth API', () => {
  test('register success', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  test('register missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: '',
      email: '',
      password: '',
    });
    expect(res.statusCode).toBe(400);
  });

  test('login success', async () => {
    const hashed = await bcrypt.hash('password123', 10);
    await User.create({ username: 'loginuser', email: 'login@example.com', password: hashed });

    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('username', 'loginuser');
  });

  test('login invalid creds', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nope@example.com',
      password: 'wrong',
    });
    expect(res.statusCode).toBe(401);
  });  
});
