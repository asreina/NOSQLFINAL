//Connection (CRUD format)
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databasename = 'myinfo'

MongoClient.connect(connectionURL, { useNewUrlParser: true} , (error, client) => {
    if (error){
      return console.log('Sorry not able to connect to the database');
    }

    //console.log('Connected Successfully');
    const db = client.db(databasename)

db.collection('users').insertMany([
   {
       name: 'Tony reina',
       job_one: 'Staples Print and Marketing Supervisor',
       worked_for: "2 Years",
       job_two: 'US Army Reserves',
       college: 'Point Park Univerity',
       start: 'Fall of 2015',
       finish: 'Spring of 2020'
  }
], (error, result) => {
   if (error) {
      return console.log('Unable to insert documents!')
  }
  console.log(result.ops)
})
})
