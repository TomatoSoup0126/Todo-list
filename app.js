const express = require('express')
const app = express()
const mongoose = require('mongoose')                    // 載入 mongoose

// 引用 body-parser
const bodyParser = require('body-parser');

// 引用 method-override
const methodOverride = require('method-override')

// 引用 express-handlebars
const exphbs = require('express-handlebars');

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))

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

// 設定路由
//載入路由器
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))

app.listen(3000, () => {
  console.log('App is running!')
})