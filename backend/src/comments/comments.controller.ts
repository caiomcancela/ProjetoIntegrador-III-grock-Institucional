// src/comments/comments.controller.ts

import {
    Controller,
    Post,
    Body,
    UseGuards, // 1. Importe o UseGuards
    Req,      // 2. Importe o decorator @Req
  } from '@nestjs/common';
  import { Request } from 'express'; // 3. Importe o TIPO Request do express
  import { CommentsService } from './comments.service';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // 4. Importe o nosso Guarda de Segurança
  
  @Controller('comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    /**
     * Cria um novo comentário.
     * Rota protegida: Apenas utilizadores autenticados podem aceder.
     */
    @UseGuards(JwtAuthGuard) // 5. Aplique o Guarda de Segurança aqui
    @Post()
    create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
      // 6. Extraímos o ID do utilizador a partir do token (que a JwtStrategy validou)
      const userId = (req.user as any).id;
      
      // 7. Chamamos o serviço, passando o ID do utilizador dinâmico
      return this.commentsService.create(createCommentDto, userId);
    }
    
  }
  