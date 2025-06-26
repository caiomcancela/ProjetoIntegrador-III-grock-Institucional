// src/users/users.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users') // <-- Garante que todas as rotas aqui começam com /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // <-- Este decorator diz: "Este método responde a requisições POST"
  create(@Body() body: any) { // O @Body() captura os dados enviados
    // A lógica para chamar o serviço virá aqui.
    return 'Endpoint de criação de usuário atingido!';
  }



  // Outros métodos como GET virão aqui...
}