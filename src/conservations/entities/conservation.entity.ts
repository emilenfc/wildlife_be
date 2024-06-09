import { Prisma } from '@prisma/client';

export class Conservation implements Prisma.ConservationGetPayload<{}> {
  id: string;
  place: string;
  image: string;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
