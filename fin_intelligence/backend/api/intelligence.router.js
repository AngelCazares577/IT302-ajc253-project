//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     2/23/25



import express from 'express'
import intelligenceController from './intelligence.js'
import pulseController from './pulse.controller.js'//addded pulsecontroller to the router


const router = express.Router()

router.route('/').get(intelligenceController.apiGetintelligence)

//the following are CUD for pulses 
router.route('/').post(pulseController.apiPostpulse)
router.route('/').delete(pulseController.apiDeletepulse)
router.route('/').put(pulseController.apiUpdatepulse)

export default router











