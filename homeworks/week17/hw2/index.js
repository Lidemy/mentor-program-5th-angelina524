const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

const app = express()
const port = process.env.PORT || 5001

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectLogin(req, res) {
  res.redirect('/login')
}

function redirectBack(req, res) {
  res.redirect('back')
}

function checkPermission(req, res, next) {
  if (!res.locals.username) {
    return redirectLogin
  }
  return next()
}

// 前台
app.get('/', (req, res) => { res.render('index') })

// user
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.handleLogout)

// 後台
app.get('/api', prizeController.api)
app.get('/dashboard', checkPermission, prizeController.getAll)
app.get('/addPrize', checkPermission, prizeController.add)
app.post('/addPrize', checkPermission, prizeController.handleAdd, redirectBack)
app.get('/updatePrize/:id', checkPermission, prizeController.update, redirectBack)
app.post('/updatePrize/:id', checkPermission, prizeController.handleUpdate, redirectBack)
app.get('/deletePrize/:id', checkPermission, prizeController.handleDelete, redirectBack)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
