// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    // ConfigModule.forRoot() carrega as variáveis do .env e as torna disponíveis.
    // isGlobal: true faz com que isso funcione em toda a aplicação.
    ConfigModule.forRoot({ isGlobal: true }),

    // Registramos nossos módulos aqui.
    PrismaModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
  ],
  controllers: [], // Removemos o AppController padrão.
  providers: [],   // Removemos o AppService padrão.
})
export class AppModule {}