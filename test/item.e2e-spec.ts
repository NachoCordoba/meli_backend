import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { ItemModule } from '../src/modules/Item/item.module';
import { config } from 'dotenv';

describe('ItemController (e2e)', () => {
  let app: INestApplication;
  config();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ItemModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/items (GET LISTADO)', () => {
    return supertest(app.getHttpServer())
      .get('/items')
      .expect(200);
  });

  it('/api/items/MLA919458461 (GET DETALLE)', () => {
    return supertest(app.getHttpServer())
      .get('/items/MLA919458461')
      .expect(200);
  });

  it('/api/items/MLA91945846 (GET DETALLE ERROR)', () => {
    return supertest(app.getHttpServer())
      .get('/items/MLA91945846')
      .expect(500);
  });
});
