// initial for tools function
function query(str) {
  return document.querySelector(str);
}

function queryAll(str) {
  return document.querySelectorAll(str);
}

// initial for carousel
function initCarousel() {
  var startX;
  var endX;
  var more = query('.more');
  var lis = queryAll('.carousel-inner img');
  for(var i = 0; i < lis.length; i++) {
    var li = lis[i];
    li.addEventListener('touchstart', start, false);
    li.addEventListener('mousedown', start, false);
    li.addEventListener('touchmove', move, false);
    li.addEventListener('mousemove', move, false);
    li.addEventListener('touchend', end, false);
    li.addEventListener('mouseup', end, false);
  }
  function start(e) {
    e.preventDefault();
    e = e.targetTouches ? e.targetTouches[0] : e;
    startX = e.pageX;
  }
  function move(e) {
    e.preventDefault();
    e = e.targetTouches ? e.targetTouches[0] : e;
    endX = e.pageX;
  }
  function end(e) {
    var x = endX - startX;
    if(x < -20) {
      $('.carousel').carousel('next');
    } else if(x > 20) {
      $('.carousel').carousel('prev');
    }
    e.preventDefault();
  }
}

// initial for tablist
function initTablist() {
  var listIcon = query('.tablist-icon');
  var list = query('.tablist');
  var lis = queryAll('.tablist-item');
  var fa = query('.tablist-fa');
  list.style.left = '-' + list.offsetWidth + 'px';
  listIcon.onclick = listOut;
  listIcon.style.top = lis[3].offsetTop + 'px';

  function listOut() {
    listIcon.style.left = list.offsetWidth + 'px';
    listIcon.style.opacity = '.8';
    list.style.left = '0';
    fa.classList.toggle('fa-th-list');
    fa.classList.toggle('fa-angle-left');
    listIcon.onclick = listIn;
  }

  function listIn() {
    listIcon.style.left = '0';
    listIcon.style.opacity = '.5';
    list.style.left = '-' + list.offsetWidth + 'px';
    fa.classList.toggle('fa-th-list');
    fa.classList.toggle('fa-angle-left');
    listIcon.onclick = listOut;
  }
}

// initial for search
function initSearch() {
  var searchBtn = query('.btn-search');
  var searchBox = query('.search-box');
  var section = query('.search-box + section');
  searchBtn.onclick = function() {
    var cla = searchBtn.classList;
    if(cla.contains('active')) {
      searchBox.style.top = '5px';
      section.style.marginTop = '0px';
    } else {
      searchBox.style.top = '59px';
      section.style.marginTop = '54px';
    }
    cla.toggle('active');
  };
}

// initial for nav
function initNav() {
  var back = query('.nav-back');
  back.onclick = function() {
    history.back();
  }
}

function initDetailTab() {
  var startX, endX,
      tri = query('.triangle'),
      left = query('.detail-tab .left'),
      right = query('.detail-tab .right'),
      wid = (left.offsetWidth - tri.offsetWidth) / 2,
      brief = query('.inner-detail > .brief'),
      comment = query('.inner-detail > .comment');
  tri.style.left = wid + 'px';
  setTimeout(function() {
    tri.classList.add('left-transition');
    clearTimeout();
  }, 1);
  left.onclick = swiptLeft;
  right.onclick = swiptRight;
  
  function start(e) {
    e.preventDefault();
    e = e.targetTouches ? e.targetTouches[0] : e;
    startX = e.pageX;
  }
  function move(e) {
    e.preventDefault();
    e = e.targetTouches ? e.targetTouches[0] : e;
    endX = e.pageX;
  }
  function end(e) {
    var x = endX - startX;
    if(x < -20) {
      swiptLeft();
    } else if(x > 20) {
      swiptRight();
    }
    e.preventDefault();
  }

  function swiptLeft() {
    wid = (left.offsetWidth - tri.offsetWidth) / 2;
    tri.style.left = wid + 'px';
    brief.style.left = '0';
    comment.style.left = '100%';
  };
  function swiptRight() {
    wid = (left.offsetWidth + tri.offsetWidth) / 2;
    tri.style.left = (document.body.offsetWidth - wid) + 'px';
    brief.style.left = '-100%';
    comment.style.left = '0%';
  }
}

// initial for link
function initLink() {
  var links = queryAll('.link-detail');
  for(var i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
      e.preventDefault();
      var id = this.getAttribute('data-id');
      location.href = '/detail/' + id;
    }
  }
}

// initial for cart
function initCart() {
  var checkboxs = queryAll('input[type=checkbox]');
  var imgs = queryAll('.book-in-cart img');
  var balance = query('.balance');
  var balanceInner = query('.balance span');
  for(var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    img.onclick = function() {
      var id = this.attributes.getNamedItem('data-id').nodeValue;
      query('#no-' + id).click();
    };
  }
  for(var i = 0; i < checkboxs.length; i++) {
    var checkbox = checkboxs[i];
    checkbox.onclick = function() {
      var price = this.attributes.getNamedItem('data-price').nodeValue - 0;
      if(isNaN(price)) {
        return;
      }
      if(this.checked === true) {
        addPrice(price);
        addNum(1);
      } else {
        addPrice(price * -1);
        addNum(-1);
      }
    };
  }
  balance.onclick = function() {
    var total = parseInt(balanceInner.innerText, 10);
    if(total === 0) {
      return;
    } else {
      var cus = query('.cus-inform');
      cus.classList.toggle('active');
      if(cus.classList.contains('active')) {
        cus.style.bottom = '53px';
      } else {
        cus.style.bottom = '-273px';
      }
    }
  };

  function addPrice(price) {
    var sumUp = query('.sum-up span');
    var sum = parseFloat(sumUp.innerText);
    sum += price;
    sum = sum.toFixed(2);
    sumUp.innerText = sum.toString();
  }
  
  function addNum(num) {
    var total = parseInt(balanceInner.innerText, 10);
    total += num;
    total = parseInt(total, 10);
    if(total === 0) {
      balance.style.background = 'rgb(255,187,155)';
      balance.style.cursor = 'initial';
    } else {
      balance.style.background = 'rgb(215,68,1)';
      balance.style.cursor = 'pointer';
    }
    balanceInner.innerText = total.toString();
  }
}

function initCity() {
  function makeList(str, id) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    var text = document.createTextNode(str);
    a.setAttribute('href', 'javascript:void(0)');
    a.setAttribute('data-no', id + '');
    a.appendChild(text);
    li.appendChild(a);
    return li;
  }
  var names = queryAll('.group-name');
  var uls = queryAll('.group-list');
  var groups = queryAll('.dropup');
  for(var i = 0; i < groups.length; i++) {
    groups[i].style.display = 'none';
  }
  initList(0, arrCity);
  function initList(x, a) {
    function listClick() {
      name.innerHTML = this.innerHTML;
      var no = this.attributes.getNamedItem('data-no').nodeValue - 0;
      var start = x + 1;
      if(a[no].sub && a[no].sub.length) {
        initList(x + 1, a[no].sub);
        start ++;
      }
      for(var i = start; i < groups.length; i++) {
        console.log(i);
        groups[i].style.display = 'none';
      }
    }
    var name = names[x];
    var ul = uls[x];
    name.innerHTML = a[0].name;
    ul.innerHTML = '';
    for(var i = 0; i < a.length; i++) {
      var li = makeList(a[i].name, i);
      li.childNodes[0].onclick = listClick;
      ul.appendChild(li);
    }
    groups[x].style.display = '';
  }
}