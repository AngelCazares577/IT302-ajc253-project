import pulseDAO from '../dao/pulseDAO.js'

export default class pulseController {

  static async apiPostpulse(req,res,next) {
    try {
      const movieId = req.body.movie_id
      const pulse = req.body.pulse
      const userInfo = {
        user_name: req.body.user_name,
        _id: req.body.user_id
      }

      const lastModified = new Date()

      const pulseResponse = await pulseDAO.addpulse(
        movieId,
        userInfo,
        pulse,
        lastModified
      )
    res.json(pulseResponse)
    } catch(e) {
    res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdatepulse(req,res,next) {
    try {
      const pulseId = req.body.pulse_id
      const pulse = req.body.pulse
      const lastModified = new Date()
      const pulseResponse = await pulseDAO.updatepulse(
        pulseId,
        req.body.user_id,
        pulse,
        lastModified
      )
  
      var { error } = pulseResponse
      if(error) {
        res.status.json({error})
      }
      if(pulseResponse.modifiedCount === 0) {
        throw new Error ("unable to update pulse. User may not be original poster")
      }
      res.json(pulseResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
  

  static async apiDeletepulse(req,res,next) {
    try {
      const pulseId = req.body.pulse_id
      const userId = req.body.user_id
      const pulseResponse = await pulseDAO.deletepulse(
        pulseId,
        userId,
      )
      res.json(pulseResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
    
}


