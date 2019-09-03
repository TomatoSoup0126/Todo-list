//基本設定用常數
const express = require('express')
const app = express()
const port = 3000

//設定根目錄路由
app.get('/', (req, res) => {
  res.send('hello world')
})

//設定伺服器啟動
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})