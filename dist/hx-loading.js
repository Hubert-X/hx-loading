﻿!function ($) {
    "use strict"; // jshint ;_;

    var Loading = function (element, options) {
        this.init(element, options);
    };

    Loading.prototype = {
        constructor: Loading,
        init: function (element, options) {
            var that = this;

            this.options = options;
            this.$element = $(element);

            var $template = $(this.options.template);
            $template.find(".text").css({
                "color": "rgba(255,255,255,1)",
                "text-align": "center"
            }).html(this.options.text);
            $template.find(".process").css({
                "height": 20
            });

            $template.css({
                "display": "inline-block",
                "width": 150,
                "text-align": "left"
            });
            if (this.options.position == "before") {
                this.$element.appendBefore($template);
            }
            else if (this.options.position == "after") {
                this.$element.appendAfter($template);
            }
            else if (this.options.position == "mask") {
                this.$element.css({
                    "position": "relative"
                });
                var $mask = $("<div class='mask'></div>").css({
                    "background-color": "rgba(0,0,0,.5)",
                    "position": "absolute",
                    "width": this.$element.width(),
                    "height": this.$element.height(),
                    "left": 0,
                    "top": 0,
                    "text-align": "center",
                    "vertical-align": "middle",
                    "z-index": 999
                });
                $template.css({
                    "margin-top": 10
                })
                $mask.append($template)
                this.$element.append($mask);
            }

            this.$process = $(".process > *", this.$template).css({
                "background-color": this.options.bgcolor,
                "margin-right": 5,
                "width": 20,
                "height": 5,
                "display": "none"
            });
        },
        loading: function () {
            var $process = this.$process;
            if (this.options.position == "mask")
                this.$process.closest(".mask").show();
            var length = $process.length;
            var index = 0;
            this.interval = setInterval(function () {
                if (index == length) {
                    $process.hide();
                    index = 0;
                    return;
                }
                index = index % length;
                $($process[index]).css("display", "inline-block");
                index++

            }, 500);
        },
        stop: function () {
            if (this.interval) {
                clearInterval(this.interval);
                delete (this.interval);
            }

            this.$process.hide();
            if (this.options.position == "mask")
                this.$process.closest(".mask").hide();
        },
        destroy: function () {
            if (this.interval)
                clearInterval(this.interval);
            this.$element
               .removeData('loading');
            this.$process.parent().remove();
        }
    };

    $.fn.loading = function (option, args) {
        return this.each(function () {
            var $this = $(this),
				data = $this.data('loading'),
				options = $.extend({}, $.fn.loading.defaults, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('loading', (data = new Loading(this, options)));
            if (typeof option == 'string') data[option].apply(data, [].concat(args));
            else if (options.loading) data.loading()
        })
    };

    $.fn.loading.defaults = {
        loading: true,
        bgcolor: "orange",
        position: "mask",
        text: "loading...",
        template: "<div class='loading'>" +
                        "<div class='process'>" +
                        "<section style='opacity: 1; filter: alpha(opacity=100);'></section>" +
                        "<section style='opacity: .85; filter: alpha(opacity=85);'></section>" +
                        "<section style='opacity: .70; filter: alpha(opacity=70);'></section>" +
                        "<section style='opacity: .55; filter: alpha(opacity=55);'></section>" +
                        "<section style='opacity: .40; filter: alpha(opacity=40);'></section>" +
                        "<section style='opacity: .25; filter: alpha(opacity=25);'></section>" +
                        "</div>" +
                        "<div class='text text-info'>" +
                        "</div>" +
                    "</div>"
    };

    $.fn.modal.Constructor = Loading;


}(window.jQuery)
