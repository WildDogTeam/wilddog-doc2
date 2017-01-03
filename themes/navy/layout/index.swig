  <script>
    var path = window.location.pathname;
    if(path === '/') {
      window.location.href = '/overview/index.html'
    }
  </script>
<div id="content" class="wrapper">
  <div id="content-inner">
    <div class="article-container">
      <div class="article-inner">
        {% if page.path === 'result/index.html' %}
        {{ partial('partial/search-content') }}
        {% endif %}
        {{ partial('partial/novice') }}
      </div>
    </div>
  </div>
</div>
{% if page.path === 'result/index.html' %}
{{ partial('partial/search') }}
{% endif %}