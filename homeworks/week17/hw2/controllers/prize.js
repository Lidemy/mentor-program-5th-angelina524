const db = require('../models')

const { Prize } = db

function getRandomInteger(max) {
  return Math.floor(Math.random() * max)
}

function getWeightedChoice(choices, weights) {
  const sumOfWeights = weights.reduce((acc, x) => acc + x, 0)
  let randomInt = getRandomInteger(sumOfWeights) + 1
  for (const [index, weight] of weights.entries()) {
    randomInt = randomInt - weight
    if (randomInt <= 0) {
      return choices[index]
    }
  }
  throw new Error('This shouldn’t happen')
}

const prizeController = {
  api: (req, res) => {
    Prize.findAll(
    ).then(prizes => {
      const idArr = []
      const weightArr = []
      for (const prize of prizes) {
        idArr.push(prize.id)
        weightArr.push(prize.probability)
      }
      const prizeId = getWeightedChoice(idArr, weightArr)
      Prize.findOne({
        where: {
          id: prizeId
        }
      }).then(result => {
        res.json(result)
      })
    })
  },
  getAll: (req, res) => {
    Prize.findAll(
    ).then(prizes => {
      res.render('prize/dashboard', {
        prizes
      })
    })
  },
  add: (req, res) => {
    res.render('prize/add_prize')
  },
  handleAdd: (req, res, next) => {
    const { name, description, imgUrl, probability } = req.body
    if (!name || !description || !imgUrl || !probability) {
      req.flash('errorMessage', 'Error：empty input')
      return next()
    }
    Prize.create({
      name,
      description,
      imgUrl,
      probability
    }).then(() => {
      res.redirect('/dashboard')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update: (req, res, next) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      res.render('prize/update_prize', {
        prize
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleUpdate: (req, res, next) => {
    const { name, description, imgUrl, probability } = req.body
    if (!name || !description || !imgUrl || !probability) {
      req.flash('errorMessage', 'Error：empty input')
      return next()
    }
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      return prize.update({
        name,
        description,
        imgUrl,
        probability
      })
    }).then(() => {
      res.redirect('/dashboard')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleDelete: (req, res, next) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      return prize.destroy()
    }).then(() => {
      res.redirect('/dashboard')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  }
}

module.exports = prizeController
