import { db } from '../config/database';

export class SlotService {
  async getAvailableSlots(slug: string, dateStr: string): Promise<any[]> {
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateForDay = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const dayOfWeek = dateForDay.getUTCDay();

    const event = await db.eventType.findUnique({
      where: { slug },
      include: { user: true }
    });
    if (!event) throw new Error('NOT_FOUND');
    if (!event.isActive) return [];

    const availability = await db.availability.findUnique({
      where: { userId_dayOfWeek: { userId: event.userId, dayOfWeek } }
    });

    if (!availability || !availability.isAvailable) return [];

    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    const existingBookings = await db.booking.findMany({
      where: {
        eventType: { userId: event.userId },
        startTime: { gte: startOfDay, lte: endOfDay },
        status: 'CONFIRMED'
      }
    });

    const slots: { startTime: string; endTime: string }[] = [];
    const [startHr, startMin] = availability.startTime.split(':').map(Number);
    const [endHr, endMin] = availability.endTime.split(':').map(Number);

    let currentMs = Date.UTC(year, month - 1, day, startHr, startMin, 0);
    const endMs = Date.UTC(year, month - 1, day, endHr, endMin, 0);
    const durationMs = event.duration * 60 * 1000;
    const stepMs = 15 * 60 * 1000;
    const nowMs = Date.now();

    while (currentMs + durationMs <= endMs) {
      const slotStart = new Date(currentMs);
      const slotEnd = new Date(currentMs + durationMs);

      if (currentMs > nowMs) {
        const isBooked = existingBookings.some((b) => {
          const bStart = b.startTime.getTime();
          const bEnd = b.endTime.getTime();
          return currentMs < bEnd && (currentMs + durationMs) > bStart;
        });

        if (!isBooked) {
          slots.push({
            startTime: slotStart.toISOString(),
            endTime: slotEnd.toISOString()
          });
        }
      }
      currentMs += stepMs;
    }
    return slots;
  }
}
