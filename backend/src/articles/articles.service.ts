// src/articles/articles.service.ts
import { Prisma } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, autorId: string) {
    const { tags, ...articleData } = createArticleDto;
    return this.prisma.article.create({
      data: {
        ...articleData,
        autor: { connect: { id: autorId } },
        tags: {
          connectOrCreate: tags?.map((tagName) => ({
            where: { nome: tagName },
            create: { nome: tagName },
          })),
        },
      },
    });
  }

  // **** INÍCIO DA MODIFICAÇÃO ****
  async findAll(tag?: string) {
    const queryOptions: Prisma.ArticleFindManyArgs = {
      include: {
        autor: { select: { nome: true } },
        tags: true,
      },
      orderBy: {
        dataPublicacao: 'desc',
      },
      where: {},
    };

    if (tag) {
      queryOptions.where = {
        tags: {
          some: {
            nome: tag,
          },
        },
      };
    }

    return this.prisma.article.findMany(queryOptions);
  }
  // **** FIM DA MODIFICAÇÃO ****

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        autor: true,
        tags: true,
        comments: {
          include: {
            autor: {
              select: { nome: true }
            }
          }
        },
      },
    });
    if (!article) {
      throw new NotFoundException(`Artigo com o ID '${id}' não foi encontrado.`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto, userId: string) {
    // Lógica de update existente
  }

  async remove(id: string, userId: string) {
    // Lógica de remove existente
  }
}