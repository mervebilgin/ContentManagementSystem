const mongoose = require('mongoose') 

const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true

})

//İkinci postu MongoDB compass da silmek için
Post.findByIdAndDelete('6110e392d21b0b58c4cb860a', (error, post) => {
  console.log(error, post)
})
