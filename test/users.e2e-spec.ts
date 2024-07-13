import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import seed from '../prisma/seed';

describe('Users e2e', () => {
  let app: INestApplication;
  let server;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let authToken: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    await app.init();
    server = app.getHttpServer();

    // Create a user for testing
    const password = await bcrypt.hash('Testing@123', 10);
    await prisma.user.create({
      data: {
        email: 'testuser@test.com',
        password
      }
    });

    // Authenticate user
    const user = await prisma.user.findUnique({
      where: { email: 'testuser@test.com' }
    });
    authToken = jwtService.sign({ userId: user.id });
  });

  afterAll(async () => {
    await seed;
  });

  describe('Create user', () => {
    it('Should create a new user', async () => {
      const newUser = {
        email: 'newuser@test.com',
        password: 'Testing@123'
      };
      const res = await request(server)
        .post('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newUser);
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('email', newUser.email);
    });
  });

  describe('Get users', () => {
    it('Should return an array of users', async () => {
      const res = await request(server)
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('Get single user', () => {
    it('Should return a single user', async () => {
      const users = await prisma.user.findMany();
      const userId = users[0].id;
      const res = await request(server)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('email', 'testuser@test.com');
    });

    it('Should return 200 for non-existent user', async () => {
      const res = await request(server)
        .get('/users/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('Update user', () => {
    it('Should update an existing user', async () => {
      const users = await prisma.user.findMany();
      const userId = users[0].id;
      const updatedUserData = { email: 'updatedemail@test.com' };
      const res = await request(server)
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedUserData);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('email', updatedUserData.email);
    });
  });

  describe('Delete user', () => {
    it('Should delete an existing user', async () => {
      const users = await prisma.user.findMany();
      const userId = users[0].id;
      const res = await request(server)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toEqual(200);
    });

    it('Should return 404 for deleting non-existent user', async () => {
      const res = await request(server)
        .delete('/users/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toEqual(404);
    });
  });
});
