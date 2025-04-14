//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     4/14/25

import { ObjectId } from 'mongodb'  // Import ObjectId from mongodb
let intelligence

export default class intelligenceDAO {
  static async injectDB(conn) {
    if (intelligence) { 
      return
    }
    try {
      intelligence = await conn
        .db(process.env.SENTIMENTS_NS)
        .collection('AlphaIntelligence_ajc253')
    } catch (e) {
      console.error(`unable to connect in intelligenceDAO: ${e}`)
    }
  }

  static async getintelligence({
    filters = null,
    page = 0,
    intelligencePerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters['title'] } }
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
      return { intelligenceList, totalNumintelligence }
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      console.error(e)
      return { intelligenceList: [], totalNumintelligence: 0 }
    }
  }

  // New method to fetch a single record by its ID.
  static async getintelligenceByID(id) {
    try {
      const objId = new ObjectId(id)
      // Query the collection for a document with _id equal to the provided id.
      const record = await intelligence.findOne({ _id: objId })
      return record
    } catch (e) {
      console.error(`Unable to fetch intelligence record by ID: ${e}`)
      throw e
    }
  }
}
