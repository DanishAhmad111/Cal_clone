import { db } from '../config/database';
import { Booking } from '@prisma/client';

export class BookingService {
  async getBookings(userId: string, type: 'upcoming' | 'past'): Promise<Booking[]> {
    const user = await db.user.findFirst();
    if (!user) return [];

    const now = new Date();
    const dateFilter = type === 'past' ? { lt: now } : { gte: now };

    return await db.booking.findMany({
      where: {
        eventType: { userId: user.id },
        startTime: dateFilter
      },
      include: { eventType: true },
      orderBy: { startTime: type === 'past' ? 'desc' : 'asc' }
    });
  }

  async createBooking(data: any): Promise<Booking> {
    const { eventTypeId, bookerName, bookerEmail, startTime, endTime, notes } = data;
    const start = new Date(startTime);
    const end = new Date(endTime);

    const existing = await db.booking.findFirst({
      where: {
        eventTypeId,
        status: 'CONFIRMED',
        OR: [
          { startTime: { lt: end }, endTime: { gt: start } }
        ]
      }
    });

    if (existing) throw new Error('SLOT_TAKEN');

    return await db.booking.create({
      data: {
        eventTypeId,
        bookerName,
        bookerEmail,
        startTime: start,
        endTime: end,
        notes: notes || null,
        status: 'CONFIRMED'
      },
      include: { eventType: true }
    });
  }

  async cancelBooking(id: string): Promise<Booking> {
    const booking = await db.booking.findUnique({ where: { id } });
    if (!booking) throw new Error('NOT_FOUND');

    return await db.booking.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });
  }
}
