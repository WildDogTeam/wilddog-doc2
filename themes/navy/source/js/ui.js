// getClass('line').forEach(function(ele) {
//     ele.style.opacity = '0';
// })

$(function() {
    //右侧目录判断是否显示
    var airticleContent = document.querySelector('.article .inner');
    var toc = getClass('toc-content')[0];
    var platformsArr = [];
    var platformsLink = []
    if (getClass('toc-item').length < 1 && airticleContent) {
        airticleContent.removeChild(toc)
    }

    //  切换头部选中状态
    var type = window.location.pathname.split('/')[1]
    // var type = type.split('.')[0]
    var headerNavs = getClass('main-nav-link');
    if (type === 'overview') {
        addClass(headerNavs[0], 'current')
    } else if (type === 'sync') {
        addClass(headerNavs[1], 'current')
    } else if (type === 'conversation') {
        addClass(headerNavs[2], 'current')
    } else if (type === 'conference') {
        addClass(headerNavs[3], 'current')
    } else if (type === 'sms') {
        addClass(headerNavs[4], 'current')
    } else if (type === 'auth') {
        addClass(headerNavs[5], 'current')
    }
    // 侧边栏收起
    var sidebarTitle = getClass('sidebar-title');
    sidebarTitle.forEach(function(ele) {
        ele.addEventListener('mouseup', function(event) {
            // event.stopPropagation();
            toggleClass(ele, 'select');
            if (getSiblings(ele)[0]) {
                toggleClass(getSiblings(ele)[0], 'current');
            }
            getSiblings(ele.parentElement).forEach(function(item, itemIndex) {
                [].slice.call(item.getElementsByClassName('sidebar-title')).forEach(function(title) {
                    removeClass(title, 'select')
                });
                [].slice.call(item.getElementsByClassName('sublist')).forEach(function(list) {
                    removeClass(list, 'current')
                })
            })
        })
    });

    //滚屏时右侧边栏根据当前标题高亮对应目录项
    var headings = getClass('article-heading');
    var tocLinks = getClass('toc-link');
    var tocLinksHref = [];
    var headingTops = [];
    var titleContent = document.getElementsByClassName('toc-link-title')[0];
    tocLinks.forEach(function(ele, index) {
        var id = ele.getAttribute('href').replace('#', '');
        ele.setAttribute('title', ele.textContent);
        tocLinksHref.push(id);
        ele.addEventListener('mouseenter', function(e) {
            var title = ele.getAttribute('title');
            titleContent.textContent = title;
            titleContent.style.display = 'block';
            titleContent.style.left = e.clientX + 'px';
            titleContent.style.top = e.clientY - 40 + 'px';
        });
        ele.addEventListener('mousemove', function(e) {
            titleContent.style.left = e.clientX + 'px';
            titleContent.style.top = e.clientY - 40 + 'px';
        });
        ele.addEventListener('mouseleave', function(e) {
            titleContent.style.display = 'none';
        })
    });
    headings.forEach(function(ele) {
        var actualTop = ele.offsetTop;
        var current = ele.offsetParent;
        while (current) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        actualTop -= 102;
        headingTops.push(actualTop);
    });
    var currentRangeStart = 0;
    var currentRangeEnd = headingTops[1];
    var currentIndex = 0;

    function getCurrentHeading(top) {
        for (var i = 0; i < headingTops.length; i++) {
            if (top >= headingTops[i] && top <= headingTops[i + 1]) {
                currentRangeStart = headingTops[i];
                currentRangeEnd = headingTops[i + 1];
                currentIndex = i;
                return headings[i]
            }
        }
    };

    function currentLinkSelect(heading) {
        var id = heading ? heading.id : tocLinksHref[0];
        var index = tocLinksHref.indexOf(id);
        if (index !== -1) {
            addClass(tocLinks[index], 'current');
        }
        tocLinks.forEach(function(ele, eleIndex) {
            if (eleIndex === index) return;
            removeClass(ele, 'current')
        })
    };

    // var feedBack = getClass('feed-back')[0];
    var backTop = document.getElementsByClassName('back-top')[0];
    var scrollStart = 0;
    currentLinkSelect(headings[0]);

    function windowScrollHandle() {
        var scrollTop = window.scrollY;
        if (scrollTop >= window.innerHeight) {
            addClass(backTop, 'back-top-show')
        } else {
            removeClass(backTop, 'back-top-show')
        };
        // if (scrollTop > scrollStart) {
        //     addClass(feedBack, 'scrollHide')
        // } else {
        //     removeClass(feedBack, 'scrollHide')
        // }
        scrollStart = scrollTop;

        if (scrollTop > currentRangeEnd || scrollTop < currentRangeStart) {
            var currentHeading = getCurrentHeading(scrollTop) || (scrollTop > headingTops[headingTops.length - 1] ? headings[headings.length - 1] : headings[0]);
            currentLinkSelect(currentHeading);
        } else {
            currentLinkSelect(getCurrentHeading(scrollTop))
        }
    };
    windowScrollHandle();
    window.addEventListener('scroll', windowScrollHandle);

    backTop.addEventListener('click', function() {
        window.scrollTo(0, 0);
    });

    $('.slide').each(function(index, el) {
        $(el).find('.slide-tab').click(function(event) {
            var index = $(this).index()
            var eq = (index - 1) / 2
            $('.slide').each(function(index, el) {
                $(el).find('.slide-tab').eq(eq).addClass('tab-current').siblings('.slide-tab').removeClass('tab-current')
                $(el).find('.slide-content').eq(eq).addClass('slide-content-show').siblings('.slide-content').removeClass('slide-content-show')
            });
        });
    });

    if ($('#sidebar .outer').find('input').val()) {
        platformsArr = $('#sidebar .outer').find('input').val().split(',');
        //动态生成目录
        $('#sidebar .inner .sidebar-nav .sidebar-nav-item').each(function(index, el) {
            var href = $(el).children('.sublist').find('.sublist-item').eq(0).children('a').attr('href');
            platformsLink.push(href)
        })

        platformsArr.forEach(function(ele, index) {
            var aEle = '<a class="platform-links" href=' + platformsLink[index] + '>' + ele + '</a>'
            var liEle = '<li class="item"> ' + aEle + '</li>';

            $('#sidebar .outer .platforms').append(liEle);
        });

        $('#sidebar .outer .selected').click(function(event) {
            event.stopPropagation();
            $(this).siblings('.platforms').slideToggle(100);
            $(this).toggleClass('ui');
        });

        $(document).click(function(e) {
            var _con = $('.platforms');
            if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                _con.slideUp(100)
                $('#sidebar .outer .selected').removeClass('ui')
            }

        });
    }

    //wilddog部分
    var config = {
        syncURL: "https://wd-download.wilddogio.com" //输入节点 URL
    };
    wilddog.initializeApp(config);
    var ref = wilddog.sync().ref();

    ref.on('value', function(snap) {
        //获取节点
        //auth
        var auth_web = snap.val().wilddog.auth.web;
        var auth_ios = snap.val().wilddog.auth.ios;
        var auth_java = snap.val().wilddog.auth.java;
        var auth_android = snap.val().wilddog.auth.android;

        //media
        var media_web = snap.val().wilddog.media.web;
        var media_ios = snap.val().wilddog.media.ios;
        var media_android = snap.val().wilddog.media.android;

        //room
        var room_web = snap.val().wilddog.room.web;
        var room_web_preview = snap.val().wilddog.room.web.preview;
        var room_ios = snap.val().wilddog.room.ios;
        var room_ios_preview = snap.val().wilddog.room.ios.preview;
        var room_android = snap.val().wilddog.room.android;
        var room_android_preview = snap.val().wilddog.room.android.preview;

        //sync
        var sync_c = snap.val().wilddog.sync.c;
        var sync_android = snap.val().wilddog.sync.android;

        var sync_web = snap.val().wilddog.sync.web;
        var sync_ios = snap.val().wilddog.sync.ios;
        var sync_java = snap.val().wilddog.sync.java;
        var sync_core = snap.val().wilddog.sync.core;
        var sync_embedded = snap.val().wilddog.sync.embedded;
        var sync_embed_rtos = snap.val().wilddog.sync.embed_rtos;
        var sync_embed_arduino = snap.val().wilddog.sync.embed_arduino;
        var sync_embed_openwrt = snap.val().wilddog.sync.embed_openwrt;

        //location
        var location_ios = snap.val().wilddog.location.ios;
        var location_android = snap.val().wilddog.location.android;
        var location_web = snap.val().wilddog.location.web;

        //sms
        var sms_java = snap.val().wilddog.sms.java;
        var sms_nodejs = snap.val().wilddog.sms.node;
        var sms_net = snap.val().wilddog.sms.net;
        var sms_php = snap.val().wilddog.sms.php;
        var sms_python = snap.val().wilddog.sms.python;


        //赋值
        //auth_start
        $('.auth_web_v').text(auth_web.version);
        $('.auth_ios_v').text(auth_ios.version);
        $('.auth_android_v').text(auth_android.version);
        $('.auth_java_v').text(auth_java.version);

        $("#auth_android_d").attr("href", auth_android.cdn);
        $("#auth_ios_d").attr("href", auth_ios.cdn);
        $("#auth_java_d").attr("href", auth_java.cdn);

        $("#auth_android-md5").text(auth_android.checksum.md5sum);
        $("#auth_android-sha1").text(auth_android.checksum.sha1sum);
        $("#auth_android-sha256").text(auth_android.checksum.sha256sum);

        $("#auth_ios-md5").text(auth_ios.checksum.md5sum);
        $("#auth_ios-sha1").text(auth_ios.checksum.sha1sum);
        $("#auth_ios-sha256").text(auth_ios.checksum.sha256sum);

        $("#auth_java-md5").text(auth_java.checksum.md5sum);
        $("#auth_java-sha1").text(auth_java.checksum.sha1sum);
        $("#auth_java-sha256").text(auth_java.checksum.sha256sum);
        //auth_end

        //media_start
        $('.media_web_v').text(media_web.version);
        $('.media_ios_v').text(media_ios.version);
        $('.media_android_v').text(media_android.version);
        //media_end

        //room_start
        $('.room_web_v').text(room_web.version);
        $('.room_web_preview_v').text(room_web_preview.version);
        $('.room_ios_v').text(room_ios.version);
        $('.room_ios_preview_v').text(room_ios_preview.version);
        $('.room_android_v').text(room_android.version);
        $('.room_android_preview_v').text(room_android_preview.version);
        //room_end

        //sync_start
        $('.sync_web_v').text(sync_web.version);
        $('.sync_ios_v').text(sync_ios.version);
        $('.sync_android_v').text(sync_android.version);
        $('.sync_c_v').text(sync_c.version);
        $('.sync_java_v').text(sync_java.version);
        $('.sync_embedded_v').text(sync_embed_rtos.version);
        $('.sync_core_v').text(sync_core.version);
        $(".sync_embed_rtos_v").text(sync_embed_rtos.version);
        $(".sync_embed_arduino_v").text(sync_embed_arduino.version);
        $(".sync_embed_openwrt_v").text(sync_embed_openwrt.version);

        $("#sync_android_d").attr("href", sync_android.cdn);
        $("#sync_ios_d").attr("href", sync_ios.cdn);
        $("#sync_core_d").attr("href", sync_core.cdn);
        $("#sync_java_d").attr("href", sync_java.cdn);
        $("#sync_embed_rtos_d").attr("href", sync_embed_rtos.cdn);
        $("#sync_embed_arduino_d").attr("href", sync_embed_arduino.cdn);
        $("#sync_embed_openwrt_d").attr("href", sync_embed_openwrt.cdn);

        $("#sync_android-md5").text(sync_android.checksum.md5sum);
        $("#sync_android-sha1").text(sync_android.checksum.sha1sum);
        $("#sync_android-sha256").text(sync_android.checksum.sha256sum);

        $("#sync_c-md5").text(sync_c.checksum.md5sum);
        $("#sync_c-sha1").text(sync_c.checksum.sha1sum);
        $("#sync_c-sha256").text(sync_c.checksum.sha256sum);

        $("#sync_java-md5").text(sync_java.checksum.md5sum);
        $("#sync_java-sha1").text(sync_java.checksum.sha1sum);
        $("#sync_java-sha256").text(sync_java.checksum.sha256sum);

        $("#sync_rtos-md5").text(sync_embed_rtos.checksum.md5sum);
        $("#sync_rtos-sha1").text(sync_embed_rtos.checksum.sha1sum);
        $("#sync_rtos-sha256").text(sync_embed_rtos.checksum.sha256sum);

        $("#sync_arduino-md5").text(sync_embed_arduino.checksum.md5sum);
        $("#sync_arduino-sha1").text(sync_embed_arduino.checksum.sha1sum);
        $("#sync_arduino-sha256").text(sync_embed_arduino.checksum.sha256sum);

        $("#sync_openwrt-md5").text(sync_embed_openwrt.checksum.md5sum);
        $("#sync_openwrt-sha1").text(sync_embed_openwrt.checksum.sha1sum);
        $("#sync_openwrt-sha256").text(sync_embed_openwrt.checksum.sha256sum);


        $("#sync_ios-md5").text(sync_ios.checksum.md5sum);
        $("#sync_ios-sha1").text(sync_ios.checksum.sha1sum);
        $("#sync_ios-sha256").text(sync_ios.checksum.sha256sum);

        $("#sync_core-md5").text(sync_core.checksum.md5sum);
        $("#sync_core-sha1").text(sync_core.checksum.sha1sum);
        $("#sync_core-sha256").text(sync_core.checksum.sha256sum);
        //sync_end

        //location_start
        $("#location_ios_d").attr("href", location_ios.cdn);
        $("#location_android_d").attr("href", location_android.cdn);
        $("#location_web_d").attr("href", location_web.cdn);

        $('.location_ios_v').text(location_ios.version);
        $('.location_android_v').text(location_android.version);
        $('.location_web_v').text(location_web.version);

        $("#location_ios-md5").text(location_ios.checksum.md5sum);
        $("#location_ios-sha1").text(location_ios.checksum.sha1sum);
        $("#location_ios-sha256").text(location_ios.checksum.sha256sum);
        //location_end

        //sms_start
        $('.sms_java_v').text(sms_java.version);
        $('.sms_nodejs_v').text(sms_nodejs.version);
        $('.sms_net_v').text(sms_net.version);
        $('.sms_php_v').text(sms_php.version);
        $('.sms_python_v').text(sms_python.version);
        //sms_end
    });
})
