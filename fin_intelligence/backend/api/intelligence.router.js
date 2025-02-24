//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     2/23/25



import express from 'express'
import intelligenceController from './intelligence.js'


const router = express.Router()

router.route('/').get(intelligenceController.apiGetintelligence)

export default router











