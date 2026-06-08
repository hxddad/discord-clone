import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

describe('Auth API', () => {
  describe('Register', () => {
    
    test('register success', async () => {
      const res = await request(app).post('/api/auth/register').send({
        username: 'testregister',
        email: 'register@example.com',
        password: 'password123',
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.user).toHaveProperty('username', 'testregister');
    });

    test('register missing fields', async () => {
      const cases = [
        { username: '', email: '', password: '' },
        { username: 'testregister', email: '', password: '' },
        { username: '', email: 'register@example.com', password: '' },
        { username: '', email: '', password: 'password123' },
        { username: 'testregister', email: 'register@example.com', password: '' },
        { username: 'testregister', email: '', password: 'password123' },
        { username: '', email: 'register@example.com', password: 'password123' },
      ];

      for (const payload of cases) {
        const res = await request(app).post('/api/auth/register').send(payload);
        expect(res.statusCode).toBe(400);
      }
      });

      test('username is taken', async () => {
        await User.create({
          username: 'testregister',
          email: 'existing@example.com',
          password: 'password123',
        });

        const res = await request(app).post('/api/auth/register').send({
          username: 'testregister',
          email: 'duplicate@example.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(409);
      });

      test('email is already in use', async () => {
        await User.create({
          username: 'uniqueusername',
          email: 'register@example.com',
          password: 'password123',
        });
        const res = await request(app).post('/api/auth/register').send({
          username: 'anotherusername',
          email: 'register@example.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(409);
      });
    });

  describe('Login', () => {
      beforeEach(async () => {
        await User.deleteMany({});
        const hashedPassword = await bcrypt.hash('password123', 10);

        await User.create({
          username: 'testlogin',
          email: 'login@example.com',
          password: hashedPassword,
        });
      });

      test('login success', async () => {
        const res = await request(app).post('/api/auth/login').send({
          email: 'login@example.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('username', 'testlogin');
      });

      test('login missing fields', async () => {
        const cases = [
          { email: '', password: '' },
          { email: 'login@example.com', password: '' },
          { email: '', password: 'password123' },
        ];

        for (const payload of cases) {
          const res = await request(app).post('/api/auth/login').send(payload);
          expect(res.statusCode).toBe(400);
        }
      });

      test('login invalid credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({
          email: 'login@example.com',
          password: 'wrongpassword',
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid email or password');
      });

      test('login non-existent user', async () => {
        const res = await request(app).post('/api/auth/login').send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid email or password');
      });
    });
  });
