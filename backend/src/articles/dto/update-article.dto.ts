// src/articles/dto/update-article.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

// A classe UpdateArticleDto herda todas as propriedades da CreateArticleDto,
// mas o PartialType as torna todas opcionais.
// Isso significa que o cliente pode enviar apenas os campos que deseja atualizar.
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
