import express from 'express'
import * as handler from './controllers/crudController.js'
const router = express.Router();

router.post('/insert', handler.insert);
router.get('/select', handler.select);

export default router;