import { Request, Response, NextFunction } from 'express';
import { SlotService } from '../services/slot.service';
import { sendSuccess, sendError } from '../utils/responseUtils';

const slotService = new SlotService();

export const getSlots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug, date } = req.query;
    if (!slug || !date) return sendError(res, 'Missing slug or date parameter', 400);

    const slots = await slotService.getAvailableSlots(slug as string, date as string);
    return sendSuccess(res, slots);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND') return sendError(res, 'Event type not found', 404);
    next(error);
  }
};
