import intelligenceDAO from '../dao/intelligenceDAO.js'

export default class intelligenceController {
    
  static async apiGetintelligence(req,res,next) {
    const intelligencePerPage = req.query.intelligencePerPage ? parseInt(req.query.intelligencePerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.rated){
      filters.rated = req.query.rated
    } else if(req.query.title){
      filters.title = req.query.title
    }

    const { intelligenceList, totalNumintelligence } = await intelligenceDAO.getintelligence({
        filters, page, intelligencePerPage})
    
        let response = {
          intelligence: intelligenceList,
          page: page,
          filters: filters,
          entries_per_page: intelligencePerPage,
          total_results: totalNumintelligence,
        }
        res.json(response)
       }
    }
    