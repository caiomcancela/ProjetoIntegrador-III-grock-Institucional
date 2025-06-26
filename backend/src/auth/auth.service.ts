// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  // Injetamos os serviços que vamos precisar:
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida as credenciais do usuário.
   * @param email O email fornecido pelo usuário.
   * @param pass A senha fornecida pelo usuário.
   * @returns O objeto do usuário sem a senha, ou null se inválido.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // Compara a senha fornecida com a senha criptografada no banco.
    if (user && (await bcrypt.compare(pass, user.senha))) {
      const { senha, ...result } = user; // Remove a propriedade 'senha' do objeto.
      return result;
    }
    return null;
  }

  /**
   * Gera um token JWT após o usuário ser validado com sucesso.
   * @param user O objeto do usuário validado.
   * @returns Um objeto contendo o token de acesso.
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
