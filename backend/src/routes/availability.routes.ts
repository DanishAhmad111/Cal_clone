import { Router } from '../../prisma/node_modules/@types/express';
import { getAvailability, updateAvailability } from '../controllers/availability.controller';

const router = Router();

router.get('/', getAvailability);
router.put('/', updateAvailability);

export default router;
