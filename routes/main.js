const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('site/index')
})

router.get('/blog', (req, res) => {

    Post.find({}).sort({$natural:-1}).lean().then(posts => {
        res.render('site/blog', {posts:posts})
        /* Category.find({}).then(categories => {
            res.render('site/blog', {posts:posts, categories: categories})
        }) */
    }) 
})

router.get('/contact', (req, res) => {
    res.render('site/contact')
})

module.exports = router