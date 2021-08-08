const bcrypt = require('bcrypt')
const db = require('../models')

const saltRounds = 10
const { User } = db

const userController = {
  register: (req, res) => {
    res.render('user/register')
  },
  handleRegister: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', 'Error：empty input')
      return next()
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
      User.create({
        username,
        password: hash
      }).then(user => {
        req.session.username = user.username
        res.redirect('/dashboard')
      }).catch(err => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    })
  },
  login: (req, res) => {
    res.render('user/login')
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', 'Error：empty input')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', 'Error：user does not exist')
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', 'Error：wrong input')
          return next()
        }
        req.session.username = user.username
        res.redirect('/dashboard')
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleLogout: (req, res) => {
    req.session.username = null
    res.redirect('/login')
  }
}

module.exports = userController
