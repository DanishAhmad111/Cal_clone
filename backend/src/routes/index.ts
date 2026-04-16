import { Router } from 'express';
import eventTypeRoutes from './eventType.routes';
import availabilityRoutes from './availability.routes';
import bookingRoutes from './booking.routes';
import slotRoutes from './slot.routes';

const router = Router();

router.use('/event-types', eventTypeRoutes);
router.use('/availability', availabilityRoutes);
router.use('/bookings', bookingRoutes);
router.use('/slots', slotRoutes);

export default router;
