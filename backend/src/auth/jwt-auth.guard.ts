// src/auth/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Ao usar 'jwt', estamos dizendo ao Passport para usar a JwtStrategy
// que nós criamos e registramos no AuthModule.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
