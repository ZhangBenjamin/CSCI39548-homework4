const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://benjaminzhang76:gHtc54HBhlWaZ10D@cluster0.x9c1t3m.mongodb.net/?retryWrites=true&w=majority'


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

app.set('view engine', 'ejs')
    

app.use(bodyParser.urlencoded({ extended: true }))
// We normally abbreviate `request` to `req` and `response` to `res`.
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    db.collection('quotes')
      .find()
      .toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
        .catch(error => console.error(error))
        
        
    })
app.post('/quotes', (req, res) => {
    quotesCollection
        .insertOne(req.body)
        .then(result => {
        res.redirect('/')
        })
        .catch(error => console.error(error))
    })
app.delete('/quotes', (req, res) => {
quotesCollection
.deleteOne({ name: req.body.name })
.then(result => {
    if (result.deletedCount === 0) {
        return res.json('No quote to delete')
    }
    res.json(`Deleted Darth Vader's quote`)
    })
    .catch(error => console.error(error))
})
app.put('/quotes', (req, res) => {
quotesCollection
.findOneAndUpdate(
    { name: 'Yoda' },
    {
    $set: {
        name: req.body.name,
        quote: req.body.quote,
    },
    },
    {
    upsert: true,
    }
)
.then(result => {
    res.json('Success')
    })
.catch(error => console.error(error))
})

app.listen(3000, function () {
    console.log('listening on 3000')
})
})

.catch(error => console.error(error))

  