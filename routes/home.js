// routes/home.js
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

// 設定首頁路由器
router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id })            // 只會列出登入使用者的 todo
    .sort({ name: 'asc' })
    .exec((err, todos) => {
      if (err) return console.error(err)
      return res.render('index', { todos: todos })
    })
})
module.exports = router