
/* ===========================================================
 * ScrollerJS v1.0.0
 * ===========================================================
 * Copyright 2017 Studio Nuages.
 *
 * License: MIT
 *
 * ========================================================== */

'use strict';

var Scroller = function(selector, options){
    var self = this;
    this.elements = document.querySelectorAll(selector);

    this.EasingFunctions = {
        linear: function(t) { return t; },
        easeInQuad: function(t) { return t * t },
        easeOutQuad: function(t) { return  t * (2 - t) },
        easeInOutQuad: function(t) {return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
        easeInCubic: function(t) { return t * t * t },
        easeOutCubic: function(t) { return (--t) * t * t + 1 },
        easeInOutCubic: function(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        easeInCirc: function(t) { return 1 - Math.sqrt( 1 - t); }, 
        easeOutCirc: function(t) { return Math.sqrt(t); },
        easeInOutCirc: function(t) { return t < 0.5 ? (1 - Math.sqrt(1 - 2 * t)) * 0.5 : (1 + Math.sqrt(2 * t - 1)) * 0.5; }
    };

    this.options = {
        easing: 'easeOutCubic',
        speed: 'default',
        min: 1,
        max: -1
    };

    for(var prop in options){
        this.options[prop] = options[prop];
    }
    if(this.options.speed == 'slow'){
        this.options.speed = 3000;
    } else if(this.options.speed == 'default' || this.options.speed == 'normal'){
        this.options.speed = 6000;
    } else if(this.options.speed == 'fast'){
        this.options.speed = 9000;
    }

    var easing = this.EasingFunctions.hasOwnProperty(this.options.easing) ?
        this.EasingFunctions[this.options.easing] : this.EasingFunctions.easeInOutQuad;

    for(var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        element.addEventListener('click', function(event){
            event.preventDefault();
            var top = 0;
            var href = this.getAttribute('href');

            if(href == '#' || href == ''){
                top = 0;
            } else if(href != null && /^#/.test(href)){
                var target = document.getElementById(href.replace(/^#/, ''));
                top = target.offsetTop;
            }
            self.scroll(top, self.options.speed, easing);
        });
    }
};

Scroller.prototype.scroll = function(top, speed, easing) {
    var self = this;
    var start = null;
    if(!speed) speed = 100;

    var scrollTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var scrollLeft = (window.pageXOffset !== undefined) ?
        window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;

    var distance = scrollTop - top;

    var duration = distance / speed * 1000;
    if(this.options.min > 0) duration = Math.max(this.options.min, duration)
    if(this.options.max > 0) duration = Math.min(this.options.max, duration);

    var loop = function(timestamp){
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var t = progress / duration;

        if(t >= 1.0){
            window.scrollTo(scrollLeft, top);
            t = 1.0;
        } else {
            t = easing(t);
            window.scrollTo(scrollLeft, top + distance * (1 - t));
            requestAnimationFrame(loop);
        }
    };

    requestAnimationFrame(loop);
};