const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/register', (req, res) => {
    res.render('site/register')
})

router.post('/register', (req, res) => {
    User.create(req.body, (error, user) => {
        req.session.sessionFlash  = {
            type: "alert alert-danger",
            message: `Başarılı bir şekilde kayıt oldunuz ${user.username}`
        }
        res.redirect("/users/login")
      
    })
})

router.get('/login', (req, res) => {
    res.render('site/login')
})

router.post('/login', (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (error, user) => {
        if (user) {
            if(user.password == password) {
                req.session.userId = user._id //kullanıcımızı session ımıza kayıt edelim
                res.redirect('/')
            } 
            else {
            res.redirect('/users/login')
            } 
            //res.redirect('/users/login')
        } 
        else {
            res.redirect('/users/register')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(()=> { //sessionun kapatılması istenilmektedir
        res.redirect('/')
    })
})

module.exports = router