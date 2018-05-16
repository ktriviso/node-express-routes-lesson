const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const logger = require('morgan')

app.listen(PORT, () => {
    console.log(`server up and running on: ${PORT}`)
})

// intercepts all requests, ports, gets, etc
// log all of the things in dev mode
app.use(logger('dev'))

app.get('/', (req, res) => {
    // on response, send back to the client...
    res.send('This is a homepage')
})

app.get('/puppies/:id', (req, res) => {
    console.log('params', req.params);
    console.log('query', req.query);
    console.log('path', req.path);
    res.send('hellos')
})
