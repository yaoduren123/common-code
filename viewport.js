!function(a) {
    function b() {
        var b = e.clientWidth
          , c = '}';
        !navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && b > 1024 && (b = 640,
        c = ';max-width:' + b + 'px;margin-right:auto!important;margin-left:auto!important;}'),
        a.rem = b / 10,
        /ZTE U930_TD/.test(navigator.userAgent) && (a.rem = 1.13 * a.rem),
        g.innerHTML = 'html{font-size:' + a.rem + 'px!important;}body{font-size:' + 12 * (b / 320) + 'px' + c
    }
    var c, d, e = document.documentElement, f = document.querySelector('meta[name="viewport"]'), g = document.createElement('style');
    if (c = a.devicePixelRatio || 1,
    d = 1 / c,
    !f)
        return void console.warn('请设置默认viewport为：<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />');
    var h = e.clientWidth;
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        375 === h && f.setAttribute('content', 'user-scalable=no');
        var i = navigator.userAgent.match(/iPhone OS (\d+)\_\d+/i);
        i && (parseInt(i[1]) < 8 || 9 === parseInt(i[1])) ? f.setAttribute('content', 'width=' + c * h + ',initial-scale=' + d + ',maximum-scale=' + d + ',minimum-scale=' + d + ',user-scalable=no') : f.setAttribute('content', 'initial-scale=' + d + ',maximum-scale=' + d + ',minimum-scale=' + d + ',user-scalable=no')
    } else {
        var j = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
        !j || j && j[1] > 534 ? f.setAttribute('content', 'target-densitydpi=device-dpi,width=device-width,user-scalable=no,initial-scale=' + d + ',maximum-scale=' + d + ',minimum-scale=' + d) : c = 1
    }
    e.firstElementChild.appendChild(g),
    e.setAttribute('data-dpr', c),
    a.dpr = c,
    a.addEventListener('resize', function() {
        b()
    }, !1),
    a.addEventListener('pageshow', function(a) {
        a.persisted && b()
    }, !1),
    b()
}(window);
