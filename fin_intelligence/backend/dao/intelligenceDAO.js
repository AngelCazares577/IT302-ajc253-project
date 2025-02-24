//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     2/23/25


let intelligence

export default class intelligenceDAO {
  static async injectDB(conn) {
    if(intelligence){ 
      return
    } try {
      intelligence = await conn.db(process.env.SENTIMENTS_NS).collection('AlphaIntelligence_ajc253')
    } catch(e) {
      console.error(`unable to connect in intelligenceDAO: ${e}`)
    }
  }

  static async getintelligence({
    filters = null,
    page = 0,
    intelligencePerPage = 20,
  } = {}) {
    let query
    if(filters) {
      if("title" in filters) {
        query = { $text: { $search: filters['title']}}
    }
 }

 let cursor
 try {
   cursor = await intelligence
     .find(query)
     .limit(intelligencePerPage)
     .skip(intelligencePerPage * page)
   const intelligenceList = await cursor.toArray()
   const totalNumintelligence = await intelligence.countDocuments(query)
   return {intelligenceList, totalNumintelligence}
 } catch(e) {
   console.error(`Unable to issue find command, ${e}`)
   console.error(e)
   return { intelligenceList: [], totalNumintelligence: 0 }
 }
}
}
