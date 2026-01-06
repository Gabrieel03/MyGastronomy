import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURAÇÃO DO SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('My Gastronomy API')
    .setDescription('API de delivery e gestão de restaurante')
    .setVersion('1.0')
    .setContact("Gabriel Andrade", "https://github.com/Gabrieel03/MyGastronomy", "gabriel_.brito@hotmail.com")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  process.env.TZ = '-03:00';

  //---CONFIGURAÇÕES DE VALIDAÇÕES--//
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
