// src/comments/comments.module.ts

import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  // 1. Adicione a linha 'exports' abaixo.
  // Isto permite que qualquer outro módulo que importe o CommentsModule
  // possa usar o CommentsService.
  exports: [CommentsService],
})
export class CommentsModule {}
