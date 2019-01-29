require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const session = require('express-session')

//Middleware
const {userExist} = require('./middlewares/checkForSession')

//Controllers
const {read} = require('./controllers/swag_controller')
const {login, signout, getUser, register} = require('./controllers/auth_controller')
const {add, deleteCart, checkout} = require('./controllers/cart_controller')
const {search} = require('./controllers/search_controller')

const app = express()

app.use(json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(userExist)
app.use(express.static(`${__dirname}/../build`))

//Swag
app.get('/api/swag', read)

//Auth
app.get('/api/user', getUser)
app.post('/api/login', login)
app.post('/api/register', register)
app.post('/api/signout', signout)

//Cart
app.post('/api/cart', add)
app.post('/api/cart/checkout', checkout)
app.delete('/api/cart', deleteCart)

//Search
app.get('/api/search', search)

const port = process.env.SERVER_PORT
app.listen(port, console.log(`Listening on port ${port}`))