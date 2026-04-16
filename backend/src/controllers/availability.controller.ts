import { Request, Response, NextFunction } from 'express';
import { AvailabilityService } from '../services/availability.service';
import { sendSuccess } from '../utils/responseUtils';

const availabilityService = new AvailabilityService();

export const getAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id'] as string || 'default-user-id';
    const availability = await availabilityService.getAvailability(userId);
    return sendSuccess(res, availability);
  } catch (error) { next(error); }
};

export const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id'] as string || 'default-user-id';
    await availabilityService.updateAvailability(userId, req.body);
    return sendSuccess(res, { success: true });
  } catch (error) { next(error); }
};
