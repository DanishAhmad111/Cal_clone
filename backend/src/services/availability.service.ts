import { db } from '../config/database';
import { Availability } from '../../prisma/node_modules/@prisma/client/default';

export class AvailabilityService {
  async getAvailability(userId: string): Promise<Availability[]> {
    const user = await db.user.findFirst();
    if (!user) return [];

    return await db.availability.findMany({
      where: { userId: user.id },
      orderBy: { dayOfWeek: 'asc' }
    });
  }

  async updateAvailability(userId: string, data: any[]): Promise<void> {
    const user = await db.user.findFirst();
    if (!user) throw new Error('User not found');

    for (const item of data) {
      await db.availability.upsert({
        where: {
          userId_dayOfWeek: { userId: user.id, dayOfWeek: item.dayOfWeek }
        },
        update: {
          startTime: item.startTime,
          endTime: item.endTime,
          isAvailable: item.isAvailable
        },
        create: {
          userId: user.id,
          dayOfWeek: item.dayOfWeek,
          startTime: item.startTime,
          endTime: item.endTime,
          isAvailable: item.isAvailable
        }
      });
    }
  }
}
