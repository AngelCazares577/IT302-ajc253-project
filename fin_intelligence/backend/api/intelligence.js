//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     4/14/25

import intelligenceDAO from '../dao/intelligenceDAO.js'

export default class intelligenceController {
  
  static async apiGetintelligence(req, res, next) {
    const intelligencePerPage = req.query.intelligencePerPage ? parseInt(req.query.intelligencePerPage) : 20
    const page = req.query.page ? parseInt(req.query.page) : 0

    // Simple filtering for title for now
    let filters = {}
    if (req.query.title) {
      filters.title = req.query.title
    }

    const { intelligenceList, totalNumintelligence } = await intelligenceDAO.getintelligence({
      filters,
      page,
      intelligencePerPage
    })

    // Setting JSON response 
    let response = {
      intelligence: intelligenceList,
      page: page,
      filters: filters,
      // allowed specification of per page number instead of default of 20
      entries_per_page: intelligencePerPage,
      total_results: totalNumintelligence,
    }
    res.json(response)
  }

  // Doing a native get request by UserID
  static async apiGetintelligenceByID(req, res, next) {
    try {

      const id = req.params.id

      // Call the DAO 
      const intelligence = await intelligenceDAO.getintelligenceByID(id)

      // If no record is found
      if (!intelligence) {
        return res.status(404).json({ error: 'Intelligence record not found' })
      }

      // Return 
      res.json({ intelligence: intelligence })
    } catch (error) {
      // log error 
      console.error('Error fetching intelligence record by ID:', error)
      res.status(500).json({ error: error.message })
    }
  }
}
