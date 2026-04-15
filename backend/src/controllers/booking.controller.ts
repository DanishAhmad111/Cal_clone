import { Request, Response, NextFunction } from '../../prisma/node_modules/@types/express';
import { BookingService } from '../services/booking.service';
import { sendSuccess, sendError } from '../utils/responseUtils';

const bookingService = new BookingService();

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = req.query.type as 'upcoming' | 'past';
    const userId = req.headers['x-user-id'] as string || 'default-user-id';
    const bookings = await bookingService.getBookings(userId, type);
    return sendSuccess(res, bookings);
  } catch (error) { next(error); }
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    return sendSuccess(res, booking, 201);
  } catch (error: any) {
    if (error.message === 'SLOT_TAKEN') return sendError(res, 'This time slot is no longer available', 409);
    next(error);
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);
    return sendSuccess(res, booking);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND') return sendError(res, 'Booking not found', 404);
    next(error);
  }
};
