! function(global, $, M) {
    var win = global,
        m = M(),
        _type = function(a){
            return Object.prototype.toString.call(a).replace(/^\[\w+\s(\w*)\]$/, '$1').toLowerCase();
        },
        // 构造函数
        AmapLog = function(compUrlArray, options, callback) {

            //return this.init.apply(this, [].slice.call(arguments));
        };
    AmapLog.rangeDateStart = m.subtract('day',7).format('YYYY-MM-DD');
    AmapLog.rangeDateEnd = m.subtract('day', 1).format('YYYY-MM-DD');   

    //实现类继承
   /* MapApiLog.classExtend = function(subClass, superClass) {
        var Fn = function() {};
        Fn.prototype = superClass;
        subClass.prototype = this.objExtend(subClass.prototype, new Fn());
        subClass.prototype.constructor = subClass;
        subClass.__super__ = superClass;
        return subClass;
    };*/

    // 基于某个对象为原型创造新对象
    /*MapApiLog.create =  function() {
        var Fn = function() {},
            arg = [].slice.call(arguments, 0);
        //Fn.prototype = this.objExtend.apply(this, [false].concat(arg));
        Fn.prototype = $.extend(true, Fn.prototype, arg);
        return new Fn();
    };*/

    /*MapApiLog.bind = function(fn, that) {
        if (typeof fn !== 'function') {
            throw new Error('the first argument must be function');
        }
        var args = [].slice.call(arguments, 2),
            result,
            bound = function() {
                if (fn instanceof bound) {
                    result = fn.apply(this, args.concat([].slice.call(arguments)));
                    if (Object(result) === result) {
                        return result;
                    }
                    return this;
                } else {
                    return fn.apply(that, args.concat([].slice.call(arguments)));
                }

            };
        if (fn.prototype) {
            bound.prototype = this.create(fn.prototype)
        }
        return bound;
    };*/

    AmapLog.prototype = {

        constructor: AmapLog,

        defaultOpt : {
            serviceURL: '',
            renderTo : '',
            date: '',
            fromdate: '',
            todate: '',
            fromplat: '',
            catogery : '',
            type : '',
            callback : function(){}
        },

        rangeDateStart :  m.subtract('day',1).format('YYYY-MM-DD'),

        rangeDateEnd : m.subtract('day',7).format('YYYY-MM-DD'),

        init: function(compUrlArray, options, callback) {
            var _this = this;
            this.loadComponent(compUrlArray, function(){
                _this.makeRequest(options);
                callback();
            });
        },

        

        //异步加载CSS
        loadCss : function(src, target, callback){
            var node = document.createElement('link'),outEl;
            var callback = callback || function(){};
            switch (target) {
                case 'body':
                    outEl = document.body;
                    break;
                case 'head':
                    outEl = document.getElementsByTagName('head')[0];
                    break;
                default:
                    outEl = document.getElementsByTagName('head')[0];
            }
            node.rel = "stylesheet";
            node.type = 'text/css';
            if (node.addEventListener) {
                node.addEventListener('load', callback, false);
                node.addEventListener('error', function () {
                    //error function
                    //callback();
                }, false);
            }
            else { // for IE6-8
                node.onreadystatechange = function () {
                    var rs = node.readyState;
                    if (rs === 'loaded' || rs === 'complete') {
                        node.onreadystatechange = null;
                        callback();
                    }
                };
            }
            node.href = src;
            outEl.appendChild(node);
        },

        //异步加载js
        loadScript : function(src,callback){
            var script = document.createElement('script');
            script.src = src;
            script.type = 'text/javascript';
            script.defer = 'defer';
            if(script.onload){
                script.addEventListener('load', callback, false);
            }else if(script.onreadystatechange){
                script.onreadystatechange = function(){
                    if(this.readyState == 'complete' || this.readyState == 'loaded'){
                        callback();
                    }
                }
            }
            document.body.appendChild(script);
        },
        
        loadComponent : function(compUrlArray, callback){
            for(var i=0, len = compUrlArray.length; i<len; i++){
                this.loadScript(compUrlArray[i]);
            }
            _type(callback) === 'function' && callback();
        },
        
        //格式化数字  https://github.com/kvz/phpjs/blob/master/functions/strings/number_format.js
        numberFormat : function(number, decimals, dec_point, thousands_sep){
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        
        makeRequest : function(ajaxSetting){
            for(var i=0,l=ajaxSetting.length;i<l;i++){
                this.getData(ajaxSetting[i]);
            }
        },

        /*subscribe : function(msg, handle) {
            if(_observer[msg] == undefined) {
                _observer[msg] = [];   
            }
            _observer[msg].push(handle);
            return this;
        },

        publish : function(msg) {
            if(_observer[msg] == undefined ) {
                return this;
            }
            var l = _observer[msg].length;
            while(l--){
                _observer[msg][l].apply(this,[msg]);
            }
            return this;
        },*/
/*
        unsubscribe : function(msg, handle) {
            if(_observer[msg] == undefined ) {
                return this;
            }
            var msgData = _observer[msg],
                index = $.inArray(handle, msgData , 0);
            if ( index !== -1) {
                msgData.splice(index, 1);
            }
            return this;
        },*/

        getData : function(options){
            var options = $({}, defaultOpt, options),
                setting = [],
                param = '',
                url = options.serviceURL,
                target = $('#'+options.renderTo),
                success = options.callback,
                _this = this,
                name ;
            for(name in options){
                if( name !== '' && name !== 'serviceURL' && name !== 'renderTo' && name !== 'callback' && options.hasOwnProperty(name) ){
                    setting.push({name : options[name]});
                }
            }
            param = $.param(setting);
            $.ajax(url+param,{
                global : false,
                beforeSend : function(){
                    _this.loading(target);
                },
                dataType : 'json',
                type : 'get',
                timeout : 5000,
                success : function(){
                    return success(target);
                },
                error : function(){
                    return _this.warn(target);
                }
            })
        },

        loading : function(target){
            var html = '<div class="loader rspin"><span class="c"></span><span class="d spin"><span class="e"></span></span><span class="r r1"></span><span class="r r2"></span><span class="r r3"></span><span class="r r4"></span></div>';
            target.html(html);
            return ;
        },

        warn : function(target){
            target.html('<div class="alert alert-danger">暂没有相关数据</div>');
            return;
        },
        createDataTable : function(){
        },

        createHighChart : function(){
            
        }


        

    };
    win['AmapLog'] = AmapLog;
}(window, jQuery, moment);

/*if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = MapApiLog;
} else if (typeof define === 'function' && define.amd) {
    define('MapApiLog', [], function() {
        return MapApiLog;
    });
}
*/

