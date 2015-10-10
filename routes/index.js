var express = require('express');
var Page = require('../module/Page');
var setting = require('../setting');
var router = express.Router();
var isLogin = false;

/* GET home page */
router.get('/', function(req, res) {
  var p = new Page('index');
  p.render(function(err, data) {
    if(err) throw err;
    res.render('index', {
      isLogin: isLogin,
      type: 'index',
      data: data
    });
  });
});

/* GET list page */
(function(){
  function renderList(str) {
    var type = str;
    function render(req, res) {
      var p = new Page('list');
      var page = 1;
      if(req.params && req.params.page) page = req.params.page;
      if(page < 1) {
        res.redirect('/' + str + '/1');
      } else if(page > parseInt(setting.counts / 4 / setting.defaultPage, 10)) {
        res.redirect('/' + str + '/' + parseInt(setting.counts / 4 / setting.defaultPage, 10));
      }
      p.render({
        type: type,
        page: page
      }, function(err, data) {
        if(err) throw err;
        res.render('list', {
          isLogin: isLogin,
          type: str,
          data: data
        });
      });
    }
    return render;
  }

  function redirectPage(url) {
    return function(req, res) {
      res.redirect('/' + url + '/1');
    }
  }

  router.get('/list', redirectPage('list'));
  router.get('/recommand', redirectPage('recommand'));
  router.get('/special', redirectPage('special'));
  router.get('/hot', redirectPage('hot'));
  router.get('/new', redirectPage('new'));
  router.get('/list/:page', renderList('list'));
  router.get('/recommand/:page', renderList('recommand'));
  router.get('/special/:page', renderList('special'));
  router.get('/hot/:page', renderList('hot'));
  router.get('/new/:page', renderList('new'));
})();

/* GET catagory list page */
(function(){
  function renderCatagoryList(req, res) {
    var p = new Page('catagory');
    var page = 1;
    var id = 1;
    if(req.params && req.params.id) id = req.params.id;
    if(req.params && req.params.page) page = req.params.page;
    if(page < 1) {
      res.redirect('/catagory/' + id + '/1');
    } else if(page > parseInt(setting.counts / setting.cataArray.length / setting.defaultPage, 10)) {
      res.redirect('/catagory/' + id + '/' + parseInt(setting.counts / setting.cataArray.length / setting.defaultPage, 10));
    }
    p.render({type: 'catagory',
      page: page,
      id: id
    }, function(err, data) {
      if(err) throw err;
      res.render('list', {
        isLogin: isLogin,
        type: 'catagory',
        id: id,
        data: data
      });
    });
  }
  router.get('/catagory/:id', function(req, res) {
    res.redirect('/catagory/' + req.params.id + '/1');
  });
  router.get('/catagory/:id/:page', renderCatagoryList);
})();

/* GET detail page */
(function(){
  router.get('/detail/:id', function(req, res) {
    var p = new Page('detail');
    var id = 0;
    if(req.params && req.params.id) id = req.params.id;
    p.render({
      type: 'detail',
      id: id
    }, function(err, data) {
      if(err) throw err;
      res.render('detail', {
        isLogin: isLogin,
        type: 'detail',
        id: id,
        data: data
      });
    });
  });
})();

/* GET cart page */
// (function(){
//   router.get('/cart', function(req, res) {
//     res.render('cart', {type: 'cart'});
//   });
// })();

(function(){
  router.get('/cart', function render(req, res) {
    var p = new Page('list');
    var page = 1;
    p.render({
      type: 'hot',
      page: page
    }, function(err, data) {
      if(err) throw err;
      res.render('cart', {
        isLogin: isLogin,
        type: 'cart',
        data: data,
        page: page
      });
    });
  });
})();

/* GET login and register page */
(function(){
  router.get('/login', function(req, res) {
    res.render('login', {
      isLogin: isLogin,
      type: 'login'
    });
  });
  router.get('/register', function(req, res) {
    res.render('register', {
      isLogin: isLogin,
      type: 'register'
    });
  });
})();

module.exports = router;