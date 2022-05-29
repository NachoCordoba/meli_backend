import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import { config as envConfig } from 'dotenv';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('Main');
envConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(json({}));
  app.use(urlencoded({ extended: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('MELI API ITEM')
    .setDescription('API para prueba técnica de Meli.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  

  await app.listen(process.env.PORT);
  logger.log(`Server Running on Port: ${process.env.PORT}`);
}
bootstrap();
