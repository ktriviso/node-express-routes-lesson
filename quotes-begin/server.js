// import dependencies
const express = require('express')
// set up logger
const logger = require('morgan')
// require the database
const quotes = require('./db/quotes-data')

const bodyParser = require('body-parser')
// set up port and listen (good practice to place it all the way at the bottow of the file)
const PORT = 3000;
// initialize app
const app = express();
// set up logger middleware to be used in dev environment
app.use(logger('dev'))
// use body parser
app.use(bodyParser.json())

// *** CREATE ONE ***
// part of posting is returning the new id
app.post('/quotes', (req, res) => {
    const newObject = req.body
    newObject.id = String(Date.now())
    quotes.push(newObject)
    res.json({id: newObject.id})
})
// just one quote
app.get('/quotes/:id', (req, res) => {
    const chosen = quotes.find(item => item.id === req.params.id)
    if(!chosen){
        return res.sendStatus(404)
    }
    res.json({data: chosen})
})

app.put('/quotes/:id', (req, res) => {
    const chosen = quotes.findIndex(item => item.id === req.params.id)
    if(!chosen){
        return res.sendStatus(404)
    }
    quotes[chosen].conent = req.body.content
    quotes[chosen].author = req.body.author
    quotes[chosen].genre_type = req.body.genre_type

    res.json({data: quotes[chosen]})
})
// delete one
app.delete('/quotes/:id', (req, res) => {
    // let position
    // quotes.forEach((item, i) => {
    //     if(item.id === req.params.id){
    //         position = i
    //     }
    // })
    // quotes.splice(position, 1)
    // res.send('super cool, i did it: 202')
    const idx = quotes.findIndex(item => {
        item.id = req.params.id
    })
    quotes.splice(index, 1)
})
// set up a special ruotes for quotes
// when you come here, you get the quotes in the db back
app.get('/quotes', (req, res) => {
    // res.send('heres the quotes')
    res.json({data: quotes})
})
// index route
app.get('/', (req, res) => {
  res.send('HELLO WORLD! We are Hamilton');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
