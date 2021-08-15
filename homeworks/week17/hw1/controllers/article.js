const db = require('../models')

const { Article, Category } = db

const articleController = {
  index: (req, res) => {
    Article.findAll({
      include: Category,
      order: [['createdAt', 'DESC']],
      limit: 5
    }).then(articles => {
      res.render('index', {
        articles
      })
    })
  },
  about: (req, res) => {
    res.render('article/about')
  },
  getAll: (req, res) => {
    Article.findAll({
      include: Category,
      order: [['createdAt', 'DESC']]
    }).then(articles => {
      res.render('article/articleList', {
        articles
      })
    })
  },
  admin: (req, res) => {
    Article.findAll({
      include: Category,
      order: [['createdAt', 'DESC']]
    }).then(articles => {
      res.render('article/admin', {
        articles
      })
    })
  },
  get: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id
      },
      include: Category
    }).then(article => {
      res.render('article/read', {
        article
      })
    })
  },
  add: (req, res, next) => {
    Category.findAll({
      order: [['createdAt', 'DESC']]
    }).then(categories => {
      res.render('article/add_article', {
        categories
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleAdd: (req, res, next) => {
    const { categoryId, title, content } = req.body
    if (!categoryId || !title || !content) {
      req.flash('errorMessage', '錯誤：請輸入資料')
      return next()
    }
    Article.create({
      CategoryId: categoryId,
      title,
      content
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update: (req, res, next) => {
    Article.findOne({
      where: {
        id: req.params.id
      },
      include: Category
    }).then(article => {
      Category.findAll(
      ).then(categories => {
        res.render('article/update_article', {
          article,
          categories
        })
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleUpdate: (req, res, next) => {
    const { categoryId, title, content } = req.body
    if (!categoryId || !title || !content) {
      req.flash('errorMessage', '錯誤：請輸入資料')
      return next()
    }
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then(article => {
      return article.update({
        CategoryId: categoryId,
        title,
        content
      })
    }).then(() => {
      res.redirect(`/read/${req.params.id}`)
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleDelete: (req, res, next) => {
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then(article => {
      return article.destroy()
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  }
}

module.exports = articleController
