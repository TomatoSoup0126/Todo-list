const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,               // 資料型別是字串
    required: true          // 這是個必填欄位
  },
  done: {                             // 「完成狀態」
    type: Boolean,
    default: false               // 預設完成狀態為 false
  },
  // 加入 userId，建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)