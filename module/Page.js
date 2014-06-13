var db = require('./db');
var setting = require('../setting');
var tools = require('./tools.js');

function Page(type) {
  this.type = type;
}

module.exports = Page;

function render(value, cb) {
  var type = this.type;
  if(typeof value === 'function') {
    cb = value;
  }
  var res = {};
  if(type === 'index') {
    var sql = 'select id, title, img from book where id mod 4 = 0 order by id desc limit 0, 6'; 
    db.query(sql, function(err, rows, fields) {
      if(err) throw err;
      res.recommand = rows;
      sql = 'select id, title, img from book where id mod 4 = 3 order by id desc limit 0, 6';
      db.query(sql, function(err, rows, fields) {
        if(err) throw err;
        res['new'] = rows;
        cb(err, res);
      });
    });
  } else if(type === 'list') {
    var index,
        typeArray = ['recommand', 'special', 'hot', 'new', 'list'];
    for(var i = 0; i < typeArray.length; i++) {
      if(value.type === typeArray[i]) {
        index = i;
      }
    }
    value.page = tools.checkPage(value.page);
    var sql = 'select id, title, author, content, img, price from book where id mod 4 = ' + index + ' order by id desc limit ' + ((value.page - 1) * setting.defaultPage) + ', ' + setting.defaultPage;
    db.query(sql, function(err, rows, fields) {
      if(err) throw err;
      rows = rows.map(function(li) {
        li.author = tools.upgradeAuthor(li.author);
        li.content = tools.upgradeContentForList(li.content);
        return li;
      });
      res['list'] = rows;
      res['page'] = value.page;
      res['maxPage'] = parseInt(setting.counts / 4 / setting.defaultPage, 10);
      cb(err, res);
    });
  } else if(type === 'catagory') {
    value.id = tools.checkCatagoryId(value.id);
    value.page = tools.checkPage(value.page);
    var cataArray = setting.cataArray;
    var sql = 'select id, title, author, content, img, price from book where id mod ' + cataArray.length + ' = ' + value.id + ' order by id desc limit ' + ((value.page - 1) * setting.defaultPage) + ', ' + setting.defaultPage;
    db.query(sql, function(err, rows, fields) {
      if(err) throw err;
      rows = rows.map(function(li) {
        li.author = tools.upgradeAuthor(li.author);
        li.content = tools.upgradeContentForList(li.content);
        return li;
      });
      res['list'] = rows;
      res['page'] = value.page;
      res['maxPage'] = parseInt(setting.counts / cataArray.length / setting.defaultPage, 10);
      cb(err, res);
    });
  } else if(type === 'detail') {
    value.id = tools.checkId(value.id);
    var sql = 'select * from book where id = ' + value.id;
    db.query(sql, function(err, rows, fields) {
      if(err) throw err;
      rows = rows.map(function(li) {
        li.author = tools.upgradeAuthor(li.author);
        li.content = tools.upgradeContentForDetail(li.content);
        li.section = tools.upgradeSection(li.section);
        li.brief = tools.upgradeBrief(li.brief);
        li.tag = tools.upgradeTag(li.tag);
        return li;
      });
      res['detail'] = rows;
      cb(err, res);
    })
  }
}

Page.prototype.render = render;