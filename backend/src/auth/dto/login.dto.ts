// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Por favor, forneça um email válido.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  senha!: string;
}
