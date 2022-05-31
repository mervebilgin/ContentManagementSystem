const express = require('express') 
const exphbs  = require('express-handlebars')
const app = express()
const port = 3000 
const hostname = '127.0.0.1'
// Using Node.js `require()`
const mongoose = require('mongoose')
const bodyParser = require('body-parser') //body-parser import ediyoruz. 
const fileUpload = require('express-fileUpload')
const generateDate = require('./helpers/generateDate').generateDate
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const mongoStore = connectMongo(expressSession)

//Middleware
app.use(expressSession({
  secret: 'testotesto',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}))


//Flash - Message Middleware
app.use((req, res, next)=> {
  res.locals.sessionFlash = req.session.sessionFlash 
  delete req.sessionFlash
  next()
})

app.use(fileUpload()) //middleware

app.use(express.static('public')) //static dosyalarda kullanabilmek için gerekli olan middleware

app.use(methodOverride('_method'))
 

//app.engine('handlebars', exphbs({helpers:{generateDate: generateDate}}))
app.engine('handlebars', exphbs({helpers:{generateDate:generateDate}}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false })) //middleware
 
// parse application/json
app.use(bodyParser.json())

app.use((req, res, next)=> {
  const {userId} = req.session
  if(userId) {
    res.locals = {
      displayLink: true
    } 
  }
  else {
    res.locals = {
      displayLink: false
    }

  }
  next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')
const contact = require('./routes/contact')

app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)
app.use('/contact', contact)


app.listen(port, hostname, () => {
    console.log(`Server çalışıyor, http://${hostname}:${port}/`)
})
