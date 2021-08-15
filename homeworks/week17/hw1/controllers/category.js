const db = require('../models')

const { Category } = db

const categoryController = {
  getAll: (req, res) => {
    Category.findAll({
      order: [['createdAt', 'DESC']]
    }).then(categories => {
      res.render('category/categoryList', {
        categories
      })
    })
  },
  add: (req, res, next) => {
    const { categoryName } = req.body
    if (!categoryName) {
      req.flash('errorMessage', '錯誤：請輸入資料')
      return next()
    }
    Category.create({
      categoryName
    }).then(category => {
      res.redirect('/categoryList')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update: (req, res, next) => {
    Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(category => {
      res.render('category/update_category', {
        category
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleUpdate: (req, res, next) => {
    const { categoryName } = req.body
    if (!categoryName) {
      req.flash('errorMessage', '錯誤：請輸入資料')
      return next()
    }
    Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(category => {
      return category.update({
        categoryName
      })
    }).then(() => {
      res.redirect('/categoryList')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleDelete: (req, res, next) => {
    Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(category => {
      return category.destroy()
    }).then(() => {
      res.redirect('/categoryList')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  }
}

module.exports = categoryController
