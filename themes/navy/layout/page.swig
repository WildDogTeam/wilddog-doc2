<div id="content-wrap">
  <div id="content" class="wrapper">
    <div id="content-inner">
      <article class="article-container" itemscope itemtype="http://schema.org/Article">
        <div class="article-inner">
          <div class="article">
            <div class="inner">
              <header class="article-header">
                <h1 class="article-title" itemprop="name">
                  {{ page.title }}
                  <span class="edit-doc-source">
                    <a href="{{ raw_link(page.source) }}" class="edit-doc-link" title="{{ __('page.improve') }}">
                    <svg version="1.1" width="16px" height="16px" viewBox="200.38 -94.272 16 16">
                      <path fill="#999999" class="github" d="M208.38-94.272c-4.42,0-8,3.671-8,8.202c0,3.63,2.29,6.695,5.47,7.782c0.4,0.072,0.55-0.174,0.55-0.39
                      c0-0.195-0.01-0.841-0.01-1.528c-2.01,0.379-2.53-0.502-2.69-0.964c-0.09-0.236-0.48-0.964-0.82-1.159
                      c-0.28-0.154-0.68-0.533-0.01-0.543c0.63-0.01,1.08,0.595,1.23,0.841c0.72,1.241,1.87,0.892,2.33,0.677
                      c0.07-0.533,0.28-0.892,0.51-1.097c-1.78-0.205-3.64-0.913-3.64-4.05c0-0.892,0.31-1.63,0.82-2.204
                      c-0.08-0.205-0.36-1.046,0.08-2.174c0,0,0.67-0.215,2.2,0.841c0.64-0.185,1.32-0.277,2-0.277s1.36,0.092,2,0.277
                      c1.53-1.066,2.2-0.841,2.2-0.841c0.44,1.128,0.16,1.969,0.08,2.174c0.51,0.574,0.82,1.302,0.82,2.204c0,3.148-1.87,3.845-3.65,4.05
                      c0.29,0.256,0.54,0.748,0.54,1.517c0,1.097-0.01,1.979-0.01,2.256c0,0.215,0.15,0.472,0.55,0.39c3.256-1.127,5.449-4.258,5.45-7.782
                      C216.38-90.601,212.8-94.272,208.38-94.272z"/>
                    </svg><span class="article-edit-link">编辑文档</span></a>
                  </span>
                </h1>
              </header>
              <div class="article-content" itemprop="articleBody">
                {{ page_anchor(page.content) }}
                <time class="article-footer-updated" datetime="{{ date_xml(page.updated) }}" itemprop="dateModified">{{ __('page.last_updated', date(page.updated)) }}</time>
              </div>
              <div class="toc-content">
                <aside id="article-toc" role="navigation">
                  <div class="toc-scroll-content">
                    <div class="toc-inner">
                      <span class="slide-dot"></span>
                      <div id="article-toc-inner">
                        <strong class="sidebar-title">{{ __('page.contents') }}</strong>
                        {{ toc(page.content, {list_number: false}) }}
                      </div>
                    </div>
                  </div>
                </aside>
                <div class="toc-link-title"></div>
              </div>
              <footer class="article-footer">
                {{ page_nav() }}
              </footer>
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
      </article>
      {{ partial('partial/sidebar') }}
    </div>
    <div class="back-top-content">
      <div class="back-top"></div>
    </div>
  </div>
</div>
<div class="feed-back">
  <img src="/images/feed-bg.svg" class="feed-bg" alt="">
  <div class="feed-content">
    <div class="feed-text-content clearfix">
      <img src="/images/feed-icon.svg" alt="">
      <span class="feed-text">期待收到你的反馈，帮助我们改进文档。</span>
    </div>
    <a href="https://www.wenjuan.com/s/jQN7Bj/" class="feed-link">参与调研</a>
  </div>
  <span class="close-feed"><img src="/images/close.svg" alt=""></span>
</div>
{{ partial('partial/after_footer') }}
