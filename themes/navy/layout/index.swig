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
        <div class="novice novice-register text-center">
          <span class="close-novice"></span>
          <img src="/images/light.svg" width="52" height="56" alt="" class="light">
          <div class="novice-title">野狗新手？</div>
          <div class="register-text">立即注册，为你提供安全可靠的实时通信云服务。</div>
          <div class="btn-group">
            <a href="https://www.wilddog.com/my-account/signup?next=https://docs.wilddog.com" class="btn btn-org-full register-link">免费注册</a>
          </div>
        </div>
        <div class="novice novice-help text-center">
          <span class="close-novice"></span>
          <img src="/images/light.svg" width="52" height="56" alt="" class="light">
          <div class="novice-title">没找到需要的文档？</div>
          <div class="register-text">你可以提交工单反馈 或 阅读常见问题</div>
          <div class="btn-group">
            <a href="https://www.wilddog.com/account/kf5" target="_blank" class="btn btn-org-empty service-link">客服工单</a><a href="https://wilddog.kf5.com/hc" target="_blank" class="btn btn-gray question-link">常见问题</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{{ partial('partial/search') }}