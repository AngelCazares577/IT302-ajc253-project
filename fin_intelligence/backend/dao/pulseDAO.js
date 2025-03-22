import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let pulses
export default class pulseDAO {
  static async injectDB(conn) {
    if(pulses) {
      return
    } try {
      pulses = await conn.db(process.env.SENTIMENTS_NS).collection('pulses')
    } catch(e) {
      console.error(`unable to establish connection handle in pulseDAO: ${e}`)
    }
  }

  static async addpulse(movieId, user, pulse, lastModified) {
    try {
      const pulseDoc = {
        name: user.user_name,
        user_id: user._id,
        lastModified: lastModified,
        pulse: pulse,
        movie_id: new ObjectId(movieId)
      }
      return await pulses.insertOne(pulseDoc)
    } catch(e) {
      console.error(`unable to post pulse: ${e}`)
      console.error(e)
      return { error: e }
    }
  }

  static async updatepulse(pulseId, userId, pulse, lastModified) {
    try {
      const updateResponse = await pulses.updateOne(
        { user_id: userId, _id: new ObjectId(pulseId) },
        { $set: { pulse: pulse, lastModified: lastModified } }
      )
      return updateResponse
    } catch(e) {
      console.error(`unable to update pulse: ${e}`)
      console.error(e)
      return { error: e}
    }
  }  

  static async deletepulse(pulseId, userId) {
    try {
      const deleteResponse = await pulses.deleteOne({
        _id: new ObjectId(pulseId),
        user_id: userId,
      })
      return deleteResponse
    } catch(e) {
      console.error(`unable to delete pulse: ${e}`)
      console.error(e)
      return { error: e.message }
    }
  }  

}
