import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * This is the UsersModule, it is a NestJS Module
 * that exports the UsersService and registers the UsersController
 *
 * The @Module decorator tells NestJS that this is a Module
 *
 * The controllers array is the list of Controllers that this module exports
 *
 * The providers array is the list of providers that this module exports
 *
 * The imports array is the list of Modules that this module depends on
 *
 * The exports array is the list of what this module exports to other modules
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
