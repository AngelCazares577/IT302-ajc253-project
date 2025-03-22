//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     2/23/25



import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import intelligenceDAO from './dao/intelligenceDAO.js'
import pulseDAO from './dao/pulseDAO.js'


async function main() {

  dotenv.config()

  //Connecting to my mongodb server 
  const client = new mongodb.MongoClient( process.env.SENTIMENTS_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await intelligenceDAO.injectDB(client)
    await pulseDAO.injectDB(client)

    app.listen(port, () => {
        console.log('server is running on port:' + port);
        })
    
      } catch (e) {
        console.error(e);
        process.exit(1)
      }
    }
main().catch(console.error);