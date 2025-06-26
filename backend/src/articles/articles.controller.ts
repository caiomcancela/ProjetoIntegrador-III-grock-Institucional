// src/articles/articles.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CommentsService } from 'src/comments/comments.service';
import { RolesGuard } from 'src/auth/roles.guard'; // 1. Importe o RolesGuard
import { Roles } from 'src/auth/decorators/roles.decorator'; // 2. Importe o decorator Roles
import { Role } from 'src/auth/enums/role.enum'; // 3. Importe o Enum de Role

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) {}

  // A criação de artigos também pode ser restrita a admins, se desejado.
  // Por enquanto, deixamos como estava: qualquer utilizador logado pode criar.
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.articlesService.create(createArticleDto, userId);
  }

  @Get()
  findAll(@Query('tag') tag?: string) { // Modifique esta linha
    return this.articlesService.findAll(tag); // E esta linha
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  /**
   * ATUALIZADO: Agora protegido por cargo (role).
   * Apenas administradores podem editar qualquer artigo.
   */
  @Roles(Role.Admin) // 4. Define que apenas a role 'Admin' é permitida
  @UseGuards(JwtAuthGuard, RolesGuard) // 5. Aplica os dois guardas
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req: Request,
  ) {
    // Como agora é uma rota de admin, a verificação de propriedade
    // dentro do serviço pode ser ajustada ou removida, pois um admin pode editar tudo.
    // Vamos manter a lógica como está, mas o ideal seria refatorar o serviço
    // para não exigir o userId se a role for ADMIN.
    const userId = (req.user as any).id;
    return this.articlesService.update(id, updateArticleDto, userId);
  }

  /**
   * ATUALIZADO: Agora protegido por cargo (role).
   * Apenas administradores podem apagar qualquer artigo.
   */
  @Roles(Role.Admin) // 6. Define que apenas a role 'Admin' é permitida
  @UseGuards(JwtAuthGuard, RolesGuard) // 7. Aplica os dois guardas
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as any).id;
    return this.articlesService.remove(id, userId);
  }

  @Get(':id/comments')
  findComments(@Param('id') id: string) {
    return this.commentsService.findAllByArticle(id);
  }
}
