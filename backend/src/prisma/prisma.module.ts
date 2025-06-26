// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o módulo disponível globalmente para toda a aplicação.
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o serviço para ser usado em outros módulos.
})
export class PrismaModule {}