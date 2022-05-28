const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')

router.get('/new', (req, res) => {
    if(req.session.userId) {
        return res.render('site/addpost')
    }else {
        res.redirect('/users/login')
    }
})

router.get('/:id', (req, res) => {

    Post.findById(req.params.id).lean().then(post => {
        res.render('site/post', {post:post})
    })  

})

router.post('/test', (req, res) => {

    let post_image = req.files.post_image
    //yüklenilen post_image dosyasını değişkene atıyoruz. 

    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))
    //Bu değişken üzerinde post_image dosyamızı move(mv) ediyoruz, bu fonksiyon dosyayı kendi serverımızda istediğimiz yere yüklememeize yarıyor.
    //req.files.foo.mv: Dosyayı sunucunuzda başka bir yere taşıma işlevi. 

    /*
     * Amacımız post_image.name görselimizi veri tabanın da görmek,
    veri tabanında ise o görselimizin adresini görmek. 
    */

    Post.create({
        ...req.body,
        post_image:`/img/postimages/${post_image.name}`,
        //Post.create denildiğinde postimages klasörü içerisindeki image.name yi ataması gerekiyor. 
        author: req.session.userId
    }, )
    //console.log(req.files.post_image.name) 
    //res.redirect('/') //post eklendikten sonra anasayfa yönlendiriyor
    //Bizi anasayfaya değilde blog'a yönlendirmesini istersek
    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }
    res.redirect('/blog') 
})

module.exports = router