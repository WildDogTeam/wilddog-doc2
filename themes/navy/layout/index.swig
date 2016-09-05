  <script>
    var path = window.location.pathname;
    if(path === '/') {
      window.location.href = '/overview/index.html'
    }  
  </script>
<header id="banner" class="wrapper">
  <div class="inner">
    <h2 id="banner-title">{{ page.subtitle }}</h2>

  </div>
</header>
<div id="content-wrap">
  <div class="wrapper" style="height:400px">
    <div class="inner">
      {{ page.content }}

      <div id="intro-get-started-wrap">
        <a href="/overview/" id="intro-get-started-link">阅读文档</a>
      </div>
    </div>
  </div>
</div>