// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Este método é do NestJS e roda automaticamente quando o módulo é iniciado.
  async onModuleInit() {
    await this.$connect();
    console.log('Conexão com o Banco de Dados estabelecida com sucesso.');
  }
}