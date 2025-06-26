// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // <-- Exporta o serviço para ser usado em outros módulos.
})
export class UsersModule {}