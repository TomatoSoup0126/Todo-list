const express = require('express')
const app = express()
const mongoose = require('mongoose')                    // 載入 mongoose

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })   // 設定連線到 mongoDB

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 todo model
const Todo = require('./models/todo')

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log('App is running!')
})