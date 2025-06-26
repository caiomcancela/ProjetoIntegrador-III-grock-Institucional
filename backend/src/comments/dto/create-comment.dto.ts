// src/comments/dto/create-comment.dto.ts

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

// Esta classe define o formato dos dados que a API espera
// receber para criar um novo comentário.
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  conteudo!: string;

  @IsUUID()
  @IsNotEmpty()
  articleId!: string;

  // O ID do autor (autorId) não virá aqui.
  // Ele será extraído do token do usuário logado.
}
