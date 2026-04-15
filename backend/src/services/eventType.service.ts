import { db } from '../config/database';
import { EventType } from '../../prisma/node_modules/@prisma/client/default';

export class EventTypeService {
  async getEventTypesForUser(userId: string): Promise<EventType[]> {
    // In a real app we'd filter by userId, but since we have a single user here:
    const user = await db.user.findFirst();
    if (!user) return [];
    return await db.eventType.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createEventType(data: any, userId: string): Promise<EventType> {
    const user = await db.user.findFirst();
    if (!user) throw new Error('NO_USER');

    const existing = await db.eventType.findUnique({ where: { slug: data.slug } });
    if (existing) throw new Error('SLUG_EXISTS');

    return await db.eventType.create({
      data: {
        title: data.title,
        description: data.description || null,
        duration: Number(data.duration),
        slug: data.slug,
        userId: user.id
      }
    });
  }

  async getEventTypeBySlug(slug: string): Promise<any> {
    return await db.eventType.findUnique({
      where: { slug },
      include: { user: true }
    });
  }

  async updateEventType(id: string, data: any): Promise<EventType> {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description || null;
    if (data.duration !== undefined) updateData.duration = Number(data.duration);
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return await db.eventType.update({ where: { id }, data: updateData });
  }

  async deleteEventType(id: string): Promise<void> {
    await db.eventType.delete({ where: { id } });
  }
}
