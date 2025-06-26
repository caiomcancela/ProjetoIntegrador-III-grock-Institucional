// src/comments/comments.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  // Lógica para criar um novo comentário
  async create(createCommentDto: CreateCommentDto, autorId: string) {
    const { articleId, conteudo } = createCommentDto;

    // A operação 'create' do Prisma é usada para adicionar um novo registro.
    // Usamos 'connect' para criar as relações com o User (autor)
    // e o Article existentes, com base nos IDs fornecidos.
    return this.prisma.comment.create({
      data: {
        conteudo,
        autor: {
          connect: { id: autorId },
        },
        article: {
          connect: { id: articleId },
        },
      },
    });
  }

    async findAllByArticle(articleId: string) {
    return this.prisma.comment.findMany({
      where: {
        articleId: articleId,
      },
      // Trazemos também o nome do autor do comentário.
      include: {
        autor: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        data: 'asc', // Ordena os comentários do mais antigo para o mais novo
      },
    });
  }
}

  // A lógica para 'findAll', 'findOne', 'update' e 'remove'
  // pode ser adicionada aqui no futuro, se necessário.

