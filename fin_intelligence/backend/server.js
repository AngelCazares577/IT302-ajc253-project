//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     2/23/25

import express from 'express'
import cors from 'cors'
import intelligence from './api/intelligence.router.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/ajc253/intelligence", intelligence)

//if the above path unavailable, a default not found endpoint will appear

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app
