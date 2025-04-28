//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let pulses;
export default class pulseDAO {

  // Establishes a connection to the 'pulses' collection, if not already connected
  static async injectDB(conn) {
    if (pulses) return;
    try {
      pulses = await conn
        .db(process.env.SENTIMENTS_NS)
        .collection('pulses');
    } catch (e) {
      console.error(`unable to establish connection handle in pulseDAO: ${e}`);
    }
  }

  // Inserts a new pulse document into the database
  static async addpulse(articleId, user, pulse, lastModified) {
    try {
      const pulseDoc = {
        name          : user.user_name,
        user_id       : user._id,
        lastModified  : lastModified,
        pulse         : pulse,
        article_id    : new ObjectId(articleId),
      };
      return await pulses.insertOne(pulseDoc);
    } catch (e) {
      console.error(`unable to post pulse: ${e}`);
      console.error(e);
      return { error: e };
    }
  }

  // Retrieves all pulses for a specific article, sorted by last modified date
  static async getPulsesByArticle(articleId) {
    try {
      const query = { article_id: new ObjectId(articleId) };
      return await pulses
        .find(query)
        .sort({ lastModified: -1 })
        .toArray();
    } catch (e) {
      console.error(`unable to get pulses: ${e}`);
      return [];
    }
  }

  // Updates an existing pulse by its ID and user ID
  static async updatepulse(pulseId, userId, pulse, lastModified) {
    try {
      const updateResponse = await pulses.updateOne(
        { user_id: userId, _id: new ObjectId(pulseId) },
        { $set: { pulse: pulse, lastModified: lastModified } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update pulse: ${e}`);
      console.error(e);
      return { error: e };
    }
  }

  // Deletes a pulse if user is authorized
  static async deletepulse(pulseId, userId) {
    try {
      const deleteResponse = await pulses.deleteOne({
        _id: new ObjectId(pulseId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete pulse: ${e}`);
      console.error(e);
      return { error: e.message };
    }
  }

}
