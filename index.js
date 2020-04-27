const express = require('express')
const app = express()
const path = require('path')
const indexRouter = require('./routes/index')

app.use('/', indexRouter)




app.listen(3000)
console.log('Server is running on Port 3000...')