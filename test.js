const mongoose = require('mongoose') 

const Post = require('./models/Post')

/*mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})*/

mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true

})

Post.findByIdAndDelete('6110e392d21b0b58c4cb860a', (error, post) => {
  console.log(error, post)
})

/*Post.findById('6110e237920315547063b5a2', (error, post) => {
  console.log(error, post)
})*/

//Yukarıdaki yorum satırındaki postu update edebilmek için

/* Post.findByIdAndUpdate('6110e237920315547063b5a2', {
  title: 'Benim 1. Postum'
}, (error, post) => {
  console.log(error, post)
}) */



/* Post.find({ }, (error, post) => {
  console.log(error, post)
})  */

/*
Ctrl+c ile kodu tekrarrdan başlatabiliriz. 
Post.find({
  title: 'İkinci post başlığım'
}, (error, post) => {
  console.log(error, post)
})*/

/*
Post.create({
    title: 'İkinci post başlığım', 
    content: 'İkinci post içeriği, lorem ipsum text'
}, (error, post) => {
    console.log(error, post)
})*/

