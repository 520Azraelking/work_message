/**
 * Created by Administrator on 2017/9/28.
 */
;(function ($, window, document, undefined) {
    /**
     * 默认参数
     * opacity[动画起始的透明度]
     * speed[动画的过渡时间,单位为ms]
     * moveX[动画起始偏移位置translateX 单位为px]
     */
    $.fn.animateLeft = function (option) {
        this.default = {
            'opacity': 0,
            'speed': 1000,
            'moveX': -500
        }
        this.options = $.extend({}, this.default, option);
        this.reset = function () {
            var $this = this;
            this.each(function () {
                var that = $(this);
                that.css({
                    'transform': "translateX(" + $this.options.moveX + "px)",
                    'opacity': $this.options.opacity,
                    "overflow": "hidden"
                })
            })
        }
        this.start = function () {
            this.reset();
            this.animat();
        }
        this.animat = function () {
            var $this = this;
            this.scrolls($this);
            // //有时候页面会出现bug,刷新页面时,透明度不会变化
            $(window).scroll(function () {
                $this.scrolls($this, "scroll");
            });
        };
        this.getTop = function (e) {
            var offset = e.offsetTop;
            if (e.offsetParent != null) {
                offset += this.getTop(e.offsetParent);
            }
            return offset;
        }
        this.scrolls = function (that, type) {
            var $this = this;
            var scrollTop = $(window).scrollTop();
            var winH = $(window).height() * 0.8;
            $.each(that, function (key, value) {
                if ($(value).position().top < $(window).height()) {
                    $(value).css({
                        "transition": "all ease 1.5s",
                        'transform': "translateX(0)",
                        'opacity': "1",
                        "overflow": "inherit"
                    })
                }
                if (type) {
                    if (scrollTop >= $(value).position().top - winH) {
                        $(value).css({
                            "transition": "all ease 1.5s",
                            'transform': "translateX(0)",
                            'opacity': "1",
                            "overflow": "inherit"
                        })
                    }
                }

            })
        }
        return this.start();
    }
})(jQuery, window, document);
