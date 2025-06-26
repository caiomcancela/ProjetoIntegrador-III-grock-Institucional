// src/articles/dto/create-article.dto.ts

import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsArray,
    IsUrl,
  } from 'class-validator';
  
  export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    titulo!: string; // Adicionado '!' para resolver o erro TS2564
  
    @IsString()
    @IsNotEmpty()
    conteudo!: string; // Adicionado '!' para resolver o erro TS2564
  
    @IsUrl()
    @IsOptional()
    imageUrl?: string;
  
    @IsInt()
    @IsOptional()
    tempoLeitura?: number;
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
  }
  