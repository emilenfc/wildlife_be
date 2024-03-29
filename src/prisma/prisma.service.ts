import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // Method to clear the database
  async clearDatabase() {
    // Perform any necessary cleanup, such as deleting all records from tables
    await this.user.deleteMany({});
    await this.article.deleteMany({});
    // Add more deleteMany calls for other tables if needed
  }
}
