import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';
import seed  from '../prisma/seed';

const changePassword = {
  password: 'Testing@123',
  newPassword: 'New@12345678',
};

describe('Authentication e2e', () => {
  let app: INestApplication;
  let server;
  let token: string;
  let prisma: PrismaService;
  let cacheManager;
  let resetToken: string;
  let token2: string;

  beforeAll(async () => {
    await seed();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    server = await app.getHttpServer();
    prisma = app.get(PrismaService);

    // log user to be used in test
    const res = await request(server).post('/auth/login').send({
      email: 'test1@test.com',
      password: 'Testing@123',
    });
    token = res.body.token;

    // Log user to be used in the test
    const res2 = await request(server).post('/auth/login').send({
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
    });
    token2 = res2.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });


  describe('LOGIN account', () => {
    const user = {
      email: 'test1@test.com',
      password: 'Testing@123',
    };
    describe('Invalid requests for login', () => {
      it('Should return 400 on invalid email', async () => {
        await request(server)
          .post('/auth/login')
          .send({ ...user, email: 'invalidemail' })
          .expect(400);
      });
      it('Should return 400 on for missmatch passwords', async () => {
        await request(server)
          .post('/auth/login')
          .send({ ...user, password: 'unmatch' })
          .expect(400);
      });
      it('Should return 401 for invailable email or for invailable account', async () => {
        await request(server)
          .post('/auth/login')
          .send({ ...user, email: 'invailableemail@gmail.com' })
          .expect(401);
      });
      it('Should return 400 for empty data', async () => {
        await request(server).post('/auth/login').send({}).expect(400);
      });
    });
    describe('Handling a successful LOGIN with email', () => {
      it('On Registared User, he or she should login with email and password', async () => {
        const res = await request(server).post('/auth/login').send({
          email: 'attendant@tekki.rw',
          password: 'Testing@123',
        });
        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('token');
      });
      it('On Registared User, he or she should login with phone and password', async () => {
        const res = await request(server).post('/auth/login').send({
          phone: '+250788200000',
          password: 'Testing@123',
        });
        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('token');
      });
    });
  });

});