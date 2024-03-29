import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

/**
 * The UserEntity class is a plain JavaScript object (POJO) that defines the shape of a user.
 * This class is used by NestJS's class-transformer to map database records to this class
 * and vice versa. The class also implements the Prisma Client User interface from '@prisma/client'
 * to make sure that it has all the properties that a user should have.
 *
 * The constructor of this class takes a partial user (an object that may have any
 * subset of the properties of a user) and uses the Object.assign() method
 * to copy the properties from the partial to a new UserEntity instance.
 *
 * The @ApiProperty decorator is used by NestJS's Swagger module to make sure
 * that these properties are visible in the generated Swagger documentation.
 *
 * The @Exclude() decorator is used by NestJS's class-transformer to make sure
 * that the password property is not exposed in any API responses.
 */
export class UserEntity implements User {
  /**
   * The constructor of this class takes a partial user (an object that may have any
   * subset of the properties of a user) and uses the Object.assign() method
   * to copy the properties from the partial to a new UserEntity instance.
   * @param partial A partial user (an object that may have any
   * subset of the properties of a user)
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  /**
   * The unique identifier of a user.
   * This property is a part of the Prisma Client User interface
   * and is required by Prisma to work properly.
   */
  @ApiProperty()
  id: string;

  /**
   * The date and time when this user was created.
   */
  @ApiProperty()
  createdAt: Date;

  /**
   * The date and time when this user was last updated.
   */
  @ApiProperty()
  updatedAt: Date;

  /**
   * The name of this user.
   */
  @ApiProperty()
  name: string;

  /**
   * The email of this user.
   */
  @ApiProperty()
  email: string;

  /**
   * The password of this user.
   * This property is not exposed in any API responses
   * because it is sensitive information.
   */
  @Exclude()
  password: string;
}
