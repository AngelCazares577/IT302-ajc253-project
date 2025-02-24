import express from 'express'
import intelligenceController from './intelligence.js'


const router = express.Router()

router.route('/').get(intelligenceController.apiGetintelligence)

export default router











