import { Router } from 'express';
import { getBookings, createBooking, cancelBooking } from '../controllers/booking.controller';

const router = Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.put('/:id/cancel', cancelBooking);

export default router;
