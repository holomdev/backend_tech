import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';

describe('[Feature] Authentication - /authentication (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('sign-up [POST /]: should register user', async () => {
    const user: SignUpDto = {
      name: 'test_name',
      email: 'test@example.com',
      username: 'username_test',
      password: 'password123',
    };
    return await request(app.getHttpServer())
      .post('/authentication/sign-up')
      .send(user)
      .expect(HttpStatus.CREATED);
  });

  it('sign-up [POST /]: should throw an error for a duplicate email', async () => {
    const user: SignUpDto = {
      name: 'test_name',
      email: 'test@example.com',
      username: 'username_test',
      password: 'password123',
    };
    return await request(app.getHttpServer())
      .post('/authentication/sign-up')
      .send(user)
      .then(({ body }) => {
        expect(body).toEqual({
          message: 'Conflict',
          statusCode: 409,
        });
        expect(HttpStatus.CONFLICT);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});