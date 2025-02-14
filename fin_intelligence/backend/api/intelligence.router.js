import express from 'express'
import MoviesController from './intelligence.js'


const router = express.Router()

router.route('/').get(MoviesController.apiGetMovies)

export default router











