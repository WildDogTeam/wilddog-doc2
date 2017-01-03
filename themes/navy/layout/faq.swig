{{ partial('partial/help_sub_header') }}
<div id="content-wrap">
  <div id="content" class="wrapper help-wrapper">
    <div id="content-inner">
      <article class="article-container" itemscope itemtype="http://schema.org/Article">
        <div class="article-inner">
          <div class="article">
            <div class="inner">
              <h1 class="article-title faq-airticle-title" itemprop="name">{{page.title}}</h1>
              <div class="article-content" itemprop="articleBody">
                {{help_tags(page.tag)}}
              </div>
            </div>
          </div>
        </div>
      </article>
      {{ partial('partial/help_sidebar') }}
    </div>
    <div class="back-top-content">
      <div class="back-top"></div>
    </div>
  </div>
</div>
{{ partial('partial/after_footer') }}
