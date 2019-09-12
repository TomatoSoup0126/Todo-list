const express = require('express')
const app = express()
const mongoose = require('mongoose')                    // 載入 mongoose

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const session = require('express-session')

// 引用 body-parser
const bodyParser = require('body-parser');

// 引用 method-override
const methodOverride = require('method-override')

// 引用 express-handlebars
const exphbs = require('express-handlebars');

// 載入 passport
const passport = require('passport')

//設定express-session
app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()      // 辨識使用者是否已經登入的變數，讓 view 可以使用
  next()
})

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))



// mongoDB 連線
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useCreateIndex: true })

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
app.use('/users', require('./routes/user'))        // 新增的 user 路由器 
app.use('/auth', require('./routes/auths'))

app.listen(3000, () => {
  console.log('App is running!')
})