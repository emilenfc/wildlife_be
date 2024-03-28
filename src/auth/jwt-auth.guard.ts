//src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// so in this file, we are checking if the user is authenticated or not by using jwt strategy
// hanyuma if user is not authenticated, it will throw an error,
// we will use this guard as a decorator to protect our endpoints
