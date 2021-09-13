import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Stocks Sanctuary')
    .setDescription('API Documents for Stocks Sanctuary')
    .setVersion('1.0')
    .addTag('Stock Sanctuary')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

  Logger.log('stocks-sanctuary is bot @ http://localhost:3000/api-docs');
}

void bootstrap();
