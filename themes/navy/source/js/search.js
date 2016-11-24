//搜索功能
var searchbar = getClass('searchbar')[0];
var mainNav = document.getElementById('main-nav');
var closeSearch = getClass('close-search')[0];
var searchInput = getClass('searchbar-inputting')[0];
searchbar.addEventListener('click', function () {
  addClass(searchInput, 'searchShow')
  addClass(mainNav, 'fadeHide')
  addClass(userProfile, 'fadeHide')
  addClass(loginTab, 'fadeHide')
  addClass(this, 'fadeHide');
});
closeSearch.addEventListener('click', function (e) {
  e.stopPropagation();
  removeClass(searchInput, 'searchShow');
  removeClass(mainNav, 'fadeHide');
  removeClass(userProfile, 'fadeHide');
  removeClass(loginTab, 'fadeHide');
  removeClass(searchbar, 'fadeHide');
})

getClass('search-input')[0].addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    window.location.href = '/result/index.html?keyword=' + encodeURIComponent(this.value.split('').slice(0, 19).join(''));
  }
})
