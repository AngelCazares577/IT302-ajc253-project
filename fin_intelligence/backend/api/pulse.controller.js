//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 2/23/25

import pulseDAO from '../dao/pulseDAO.js'

export default class pulseController {

  // Handles POST requests to create a new pulse (comment or reaction) for an article
  static async apiPostpulse(req, res, next) {
    try {
      const articleId = req.body.article_id
      const pulse = req.body.pulse
      const userInfo = {
        user_name: req.body.user_name,
        _id: req.body.user_id
      }

      const lastModified = new Date()

      const pulseResponse = await pulseDAO.addpulse(
        articleId,
        userInfo,
        pulse,
        lastModified
      )
      res.json(pulseResponse)
    } catch(e) {
      res.status(500).json({ error: e.message })
    }
  }

  // Handles PUT requests to update an existing pulse, with validation of author identity
  static async apiUpdatepulse(req, res, next) {
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
        res.status.json({ error })
      }

      // Check if update was successful, otherwise throw an error
      if(pulseResponse.modifiedCount === 0) {
        throw new Error("unable to update pulse. User may not be original poster")
      }
      res.json(pulseResponse)
    } catch(e) {
      res.status(500).json({ error: e.message })
    }
  }

  // Handles DELETE requests to remove a pulse, requires correct user ID
  static async apiDeletepulse(req, res, next) {
    try {
      const pulseId = req.body.pulse_id
      const userId = req.body.user_id
      const pulseResponse = await pulseDAO.deletepulse(
        pulseId,
        userId,
      )
      res.json(pulseResponse)
    } catch(e) {
      res.status(500).json({ error: e.message })
    }
  }

}
