import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import seed from '../prisma/seed';

describe('Authentication e2e', () => {
  let app: INestApplication;
  let server;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
    server = app.getHttpServer();

    // Create a user for testing
    const password = await bcrypt.hash('Testing@123', 10);
    await prisma.user.create({
      data: {
        email: 'test1@test.com',
        password,
      },
    });
  });

  afterAll(async () => {
    await prisma.clearDatabase();
    await seed;
    await app.close();
  });

  describe('LOGIN account', () => {
    const user = {
      email: 'test1@test.com',
      password: 'Testing@123',
    };

    describe('Invalid requests for login', () => {
      it('Should return 404 on invalid email', async () => {
      await request(server)
          .post('/auth/login')
          .send({ password: user.password, email: 'invalidemail' })
          .expect(404);


      }
      );

      it('Should return 401 for invalid credentials', async () => {
        await request(server)
          .post('/auth/login')
          .send({ ...user, password: 'invalidpassword' })
          .expect(401);
      });



      it('Should return 400 for empty data', async () => {
     await request(server).post('/auth/login').send({})
        .expect(400);  

      });
    });

    describe('Handling a successful LOGIN with email', () => {
      it('On Registered User, should return 201 after login with email and password', async () => {
        const res = await request(server).post('/auth/login').send(user);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('accessToken');
      });
    });
  });
});
