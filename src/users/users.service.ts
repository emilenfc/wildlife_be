import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

/**
 * UsersService is the service that handles all the business logic
 * for the users. This includes
 * - Creating a new user
 * - Finding all users
 * - Finding a single user
 * - Updating a user's information
 * - Deleting a user
 */

const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user and hashes their password before saving it to the database
   * @param createUserDto The data for the new user
   */
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing
    );

    createUserDto.password = hashedPassword;
    return this.prisma.user.create({ data: createUserDto });
  }

  /**
   * Finds all the users in the database
   */
  findAll() {
    return this.prisma.user.findMany();
  }

  /**
   * Finds a single user by their id
   * @param id The id of the user to find
   */
  async findOne(id: string) {

    // return `This action returns a #${id} user`;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Updates a user's information. If the password is included in the update,
   * it will be hashed before being saved.
   * @param id The id of the user to update
   * @param updateUserDto The new information for the user
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing
      );
    }
 
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  /**
   * Deletes a user by their id
   * @param id The id of the user to delete
   */
  async remove(id: string) {
       let user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
