import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    // the above is same as Object.assign(this, partial);
    // The constructor takes an object and uses
    //  the Object.assign() method to copy the properties
    //   from the partial object to the UserEntity instance.
    //   The type of partial is Partial<UserEntity>.This means
    //   that the partial object can contain any subset of the
    //   properties defined in the UserEntity class.
  }
  @ApiProperty() //again this is to make this propertie visible to swagger
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;
}
