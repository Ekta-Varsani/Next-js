// POST api/new-meetup
import cli from '@angular/cli'
import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if(req.method == 'POST') {
        const data = req.body
        const { title, address, image, description } = data

        const client = await MongoClient.connect('mongodb://localhost:27017/meetup')
        const db = client.db()

        const meetupCollection = db.collection('meetup')

        const result = await meetupCollection.insertOne(data)
        client.close()
        console.log(result);

        res.status(200).json({message: 'Meetup data instered!'})
    }
}

export default handler