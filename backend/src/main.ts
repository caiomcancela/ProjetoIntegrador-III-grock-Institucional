// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para permitir requisições do seu front-end na Vercel.
  app.enableCors();

  // Habilita a validação automática de dados de entrada em todas as rotas.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Usa a porta definida pelo Render ou a 3001 como padrão local.
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Aplicação rodando na porta: ${port}`);
}
bootstrap();