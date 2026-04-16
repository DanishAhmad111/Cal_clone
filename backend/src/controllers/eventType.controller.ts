import { Request, Response, NextFunction } from 'express';
import { EventTypeService } from '../services/eventType.service';
import { sendSuccess, sendError } from '../utils/responseUtils';

const eventTypeService = new EventTypeService();

export const getEventTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id'] as string || 'default-user-id'; // Fallback for no-auth
    const events = await eventTypeService.getEventTypesForUser(userId);
    return sendSuccess(res, events);
  } catch (error) { next(error); }
};

export const createEventType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id'] as string || 'default-user-id';
    const event = await eventTypeService.createEventType(req.body, userId);
    return sendSuccess(res, event, 201);
  } catch (error: any) {
    if (error.message === 'SLUG_EXISTS') return sendError(res, 'Slug already taken', 409);
    next(error);
  }
};

export const getEventTypeBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventTypeService.getEventTypeBySlug(req.params.slug);
    if (!event) return sendError(res, 'Not Found', 404);
    return sendSuccess(res, event);
  } catch (error) { next(error); }
};

export const updateEventType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventTypeService.updateEventType(req.params.id, req.body);
    return sendSuccess(res, event);
  } catch (error) { next(error); }
};

export const deleteEventType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await eventTypeService.deleteEventType(req.params.id);
    return res.status(204).send();
  } catch (error) { next(error); }
};
