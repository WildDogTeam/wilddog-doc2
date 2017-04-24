window.addEventListener('load', function () {
  var keyword = getQueryStringByName('keyword');
  var currentPage = 1, pageCount, searchHistory = {}, totalResult;
  getClass('search-input')[0].value = keyword;
  var searchbar = getClass('searchbar')[0];
  searchbar.click();
  addClass(getClass('mask')[0], 'fadeHide');
  var searchContents = getClass('search-edge');
  var flag = 0;

  var timer = setInterval(function () {
    for (var i = 0; i < searchContents.length; i++) {
      var index = (i + flag) % searchContents.length;
      searchContents[i].className = 'search-edge';
      addClass(searchContents[i], ('search-edge-' + index))
    }
    flag ++
  }, 1000);

  var searchFailed = function (word, err) {
    clearInterval(timer);
    searchContents.forEach(function(element, index){
      addClass(element, 'search-failed');
      element.textContent = 'CAN NOT FIND';
    });
    addClass(getClass('search-tips-text')[0], 'search-failed-text');
    if (word) {
      getClass('search-header')[0].innerHTML = '“<em>' + word + '</em>”的搜索结果';
      getClass('search-tips-text')[0].innerHTML = '抱歉，未找到“<em>' + word + '</em>”的相关结果，请尝试其他关键词搜索';
    } else {
      getClass('search-header')[0].innerHTML = '“<em>' + keyword + '</em>”的搜索结果';
      getClass('search-tips-text')[0].textContent = '抱歉，由于网络原因搜索失败，请稍后尝试搜索。';
    }
    getClass('searching')[0].style.display = 'block';
    getClass('search-result')[0].style.display = 'none';
    getClass('scale-finding')[0].style.display = 'none';
    getClass('scale-failed')[0].style.display = 'block';
  }

  var searchSuccess = function () {
    clearInterval(timer);
    getClass('search-header')[0].innerHTML = '“<em>' + keyword + '</em>”的搜索结果，共'+ totalResult +'个';
    getClass('searching')[0].style.display = 'none';
    getClass('search-result')[0].style.display = 'block';
  }

  var pagesContent = getClass('pages')[0];
  function createOmit () {
    var pageOmit = document.createElement('span');
    pageOmit.className = 'page-omit';
    pageOmit.textContent = '...';
    return pageOmit
  }
  var createPageNumber = function () {
    pagesContent.innerHTML = '';
    for (var i = 0; i < pageCount; i++) {
      var j = i + 1;
      var pageNumber = document.createElement('span');
      pageNumber.className = 'page-number';
      pageNumber.id = 'page-' + j;
      if (j === currentPage) {
        pageNumber.className = 'page-number page-current';
      }
      pageNumber.textContent = j;
      pagesContent.appendChild(pageNumber);
    }
    if (currentPage < 7 && pageCount > 10) {
      for (var page = ((currentPage + 2) < 7 ? 7 : (currentPage + 2)); page < pageCount; page ++) {
        pagesContent.removeChild(document.getElementById('page-' + page));
      }
      pagesContent.insertBefore(createOmit(), document.getElementById('page-' + pageCount))
    }
    if (currentPage > 6 && currentPage < (pageCount - 2) && pageCount > 10) {
      for (var p = 4; p < (currentPage - 1); p++) {
        pagesContent.removeChild(document.getElementById('page-' + p));
      }
      pagesContent.insertBefore(createOmit(), document.getElementById('page-' + (currentPage - 1)));
      for (var m = (currentPage + 2); m < pageCount; m++) {
        pagesContent.removeChild(document.getElementById('page-' + m));
      }
      pagesContent.insertBefore(createOmit(), document.getElementById('page-' + pageCount));
    }
    if (currentPage > (pageCount - 3) && pageCount > 10) {
        for (var n = 6; n < (currentPage - 1); n++) {
          pagesContent.removeChild(document.getElementById('page-' + n));
        }
        pagesContent.insertBefore(createOmit(), document.getElementById('page-' + (currentPage - 1)));
    }
    if (currentPage === pageCount) {
      addClass(getClass('page-next')[0], 'page-gray');
    } else {
      removeClass(getClass('page-next')[0], 'page-gray');
    }
    if (currentPage === 1) {
      addClass(getClass('page-pre')[0], 'page-gray');
    } else {
      removeClass(getClass('page-pre')[0], 'page-gray');
    }
  }
  getClass('page-next')[0].addEventListener('click', function () {
    currentPage++;
    if (currentPage > pageCount) {
      return
    } else {
      doSearch(keyword, currentPage)
    }
  })
  getClass('page-pre')[0].addEventListener('click', function () {
    currentPage--;
    if (currentPage < 1) {
      return
    } else {
      doSearch(keyword, currentPage)
    }
  })

  function createResultList (list) {
    getClass('search-result-list')[0].innerHTML = '';
    createPageNumber();
    list.forEach(function (ele) {
      var li = document.createElement('li');
      li.className = 'search-result-item';
      var liContent = '<div class="result-title"><a href="' + ele.uri + '" class="result-link">' + (ele.title == '' ? ele.uri : ele.title) + '</a></div><div class="result-content">' + ele.content + '</div>';
      li.innerHTML = liContent;
      [].slice.call(li.getElementsByClassName('result-content')[0].getElementsByTagName('a'), 0).forEach(function (e) {
        e.setAttribute('target', '_self');
        e.setAttribute('href', 'javascript:;');
      })
      getClass('search-result-list')[0].appendChild(li);
    })
    getClass('page-number').forEach(function (element) {
      element.addEventListener('click', function () {
        currentPage = parseInt(this.id.replace('page-', ''));
        doSearch(keyword, currentPage)
      })
    });
    searchSuccess(keyword);
  }

  var doSearch = function (keyword, page) {
    if (searchHistory[page]) {
      createResultList(searchHistory[page]);
      document.body.scrollTop = 0;
      return
    }
    ajax({
      url: '/search?keyword=' + keyword + '&page=' + page,
      type: 'get',
      success: function (data, err) {
        if (data.code == 0) {
          if (data.total == 0) {
            searchFailed(keyword);
            return false
          }
          var timer1 = setTimeout(function () {
            var hits = data.hits;
            totalResult = data.total;
            searchHistory[page] = hits;
            pageCount = Math.ceil(totalResult / 10);
            createResultList(hits);
            clearTimeout(timer1)
            document.body.scrollTop = 0;
          }, 1000);
        } else {
          searchFailed(null, data.message);
          document.body.scrollTop = 0;
        }
      },
      failed: function (err) {
        searchFailed(null, err)
      }
    })
  }

  doSearch(keyword, currentPage);
})
