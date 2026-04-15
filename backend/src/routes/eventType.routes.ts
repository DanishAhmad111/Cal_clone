import { Router } from '../../prisma/node_modules/@types/express';
import { getEventTypes, createEventType, getEventTypeBySlug, updateEventType, deleteEventType } from '../controllers/eventType.controller';

const router = Router();

router.get('/', getEventTypes);
router.post('/', createEventType);
router.get('/:slug/public', getEventTypeBySlug);
router.put('/:id', updateEventType);
router.delete('/:id', deleteEventType);

export default router;
