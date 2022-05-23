//Video 11 Template Engine - Handlebars Express****************
/*
Template Engine : bizim html sayfalarını daha kolay bir şekilde oluşturmamıza yarıyor.

Install using npm:
$ npm install express-handlebars

(https://www.npmjs.com/package/express-handlebars)

  
 */
const path = require('path')
const express = require('express') 
const exphbs  = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
// Using Node.js `require()`
const mongoose = require('mongoose')

/*mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true

})
*/

await mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(express.static('public')) //static dosyalarda kullanabilmek için gerekli olan middleware

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('site/index')
})

app.get('/about', (req, res) => {
    res.render('site/about')
})

app.get('/blog', (req, res) => {
    res.render('site/blog')
})

app.get('/contact', (req, res) => {
    res.render('site/contact')
})

app.get('/login', (req, res) => {
    res.render('site/login')
})

app.get('/register', (req, res) => {
    res.render('site/register')
})

app.listen(port, hostname, () => {
    console.log(`Server çalışıyor, http://${hostname}:${port}/`)
})
