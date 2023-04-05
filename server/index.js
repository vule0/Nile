// dependencies
const express = require('express')

const path = require('path')

const routes = require('./routes')

// express server setup
const app = express()

const PORT = 3001

// express server hookup
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));

app.use('/', routes()) // down to routes


