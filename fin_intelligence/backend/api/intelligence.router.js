//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import express                 from 'express';
import intelligenceController  from './intelligence.js';
import pulseController         from './pulse.controller.js';

const router = express.Router();

router.get('/', intelligenceController.apiGetintelligence);

//pulses CUD
router.get   ('/pulse', pulseController.apiGetPulses);
router.post  ('/',      pulseController.apiPostpulse);
router.put   ('/',      pulseController.apiUpdatepulse);
router.delete('/',      pulseController.apiDeletepulse);

//route for get record by ID
router.get('/:id', intelligenceController.apiGetintelligenceByID);

export default router;
