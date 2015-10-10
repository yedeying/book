var setting = require('../setting');
module.exports = {
  checkPage: function(num) {
    if(typeof num === 'string') {
      num -= 0;
    }
    if(typeof num !== 'number') {
      return 1;
    } else if(num < 0) {
      return 1;
    } else {
      return num;
    }
  },
  checkCatagoryId: function(num) {
    if(typeof num === 'string') {
      num -= 0;
    }
    if(typeof num !== 'number') {
      return 0;
    } else if(num < 0) {
      return 0;
    } else {
      return num;
    }
  },
  checkId: function(num) {
    if(typeof num === 'string') {
      num -= 0;
    }
    if(typeof num !== 'number') {
      return 0;
    } else if(num < 0) {
      return 0;
    } else if(num > setting.maxId) {
      return setting.maxId;
    } else {
      return num;
    }
  },
  upgradeAuthor: function(str) {
    if(typeof str !== 'string') return '';
    return str.substring(1, str.length - 1).split(',').map(function(s) {
      return s.substring(1, s.length - 1)
    }).join(' ');
  },
  upgradeContentForList: function(str) {
    if(typeof str !== 'string') return '';
    str = str.split('\n')[0].split('。')[0].split('<br')[0];
    return str[str.length - 1] == '，' ? str.substring(0, str.length - 1) : str;
  },
  upgradeContentForDetail: function(str) {
    if(typeof str !== 'string') return '';
    return str.split('<br>');
  },
  upgradeSection: upgradeArray,
  upgradeBrief: upgradeArray,
  upgradeTag: upgradeArray
};

function upgradeArray(str) {
  if(typeof str !== 'string') return '';
  return str.substring(1, str.length - 1).split(',').map(function(s) {
    return s.substring(1, s.length - 1);
  });
}