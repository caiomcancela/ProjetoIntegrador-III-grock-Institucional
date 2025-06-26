// src/articles/articles.module.ts

import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { CommentsModule } from 'src/comments/comments.module'; // 1. Importe o CommentsModule

@Module({
  // 2. Adicione o CommentsModule ao array de 'imports'.
  // Isto permite que qualquer componente dentro do ArticlesModule (como o ArticlesController)
  // possa usar os serviços exportados pelo CommentsModule (como o CommentsService).
  imports: [CommentsModule],

  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
