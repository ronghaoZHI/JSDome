/**
 * A simple slider ui
 * @ ver 0.1.1
 */

(function($){

    $.fn.slider = function(options, callback){
        var isTouch = 'createTouch' in document;
        var eventstart, eventmove, eventend;
        if(isTouch){
            eventstart = "touchstart"; eventmove = "touchmove"; eventend = "touchend";
        }else{
            eventstart = "mousedown"; eventmove =  "mousemove"; eventend = "mouseup";
        }
        var diffX, diffY, moveX, moveY, totalX, totalY;

        var ps = $.extend({from: 0, to: 100, step: 1, value: 0, vertical: false, style: 'slider'}, options);

        if(!ps.mid){ps.mid = ps.to / 2;}
        if(ps.vertical){ps.style += '_v';}

        var sliderbar = $('<div><div></div></div>');
        this.append( sliderbar.addClass(ps.style) );
        var slider = sliderbar.find('div');
        var slider_handle = slider[0];

        var getElementLeft = function(element){
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null){
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        };
        var getElementTop = function(element){
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            while (current !== null){
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        };

        setTimeout(function(){
            totalX = sliderbar.width() - slider.width(); totalY = sliderbar.height() - slider.height();
            diffX = getElementLeft(sliderbar[0]) + slider_handle.offsetWidth/2;
            diffY = getElementTop(sliderbar[0]) + slider_handle.offsetHeight/2;
            if(ps.vertical){
                moveY = totalY - (ps.value - ps.from) / (ps.to - ps.from) * totalY;
            }else{
                if(ps.value <= ps.mid){
                    moveX = (ps.value - ps.from) / (ps.mid - ps.from) * totalX/2;
                }else{
                    moveX = (ps.value - ps.mid) / (ps.to - ps.mid) * totalX/2 + totalX/2;
                }
            }

            moveit(moveX, moveY);
        }, 20);

        var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            function(callback){return setTimeout(function(){callback();}, 1000 / 60);};

        var moveX_old;
        var moveY_old;
        var moveit = function(x, y){
            if(moveX !== moveX_old || moveY !== moveY_old){
                x = moveX;
                y = moveY;
                moveX_old = moveX;
                moveY_old = moveY;
                var val, move;

                if(ps.vertical){
                    if(y < 0){y = 0;}
                    if(y > totalY){y = totalY;}

                    x = 0;
                    val = ps.to - (ps.to - ps.from) * (y / totalY);
                    mov = y;
                }else{
                    if(x < 0){x = 0;}
                    if(x > totalX){x = totalX;}
                    y = 0;
                    if(x <= totalX/2){
                        val = ps.from + (ps.mid - ps.from) * (x / totalX *2);
                    }else{
                        val = ps.mid + (ps.to - ps.mid) * ((x - totalX/2)/ totalX *2);
                    }
                    move = x;
                }
                slider_handle.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';

                val = Math.ceil(val);
                var r = (val - ps.from) % ps.step;
                if(r <= ps.step/2){
                    val = val - r;
                    if(val + ps.step/2 > ps.to){val = ps.to;}
                } else {
                    val = val - r + ps.step;
                    if(val > ps.to){
                        val = ps.to;
                    }
                }
                if(callback){
                    callback.call(this, val);
                }
            }

            rAF(moveit);
        };

        var drag = function(e){
            e.preventDefault();
            if(isTouch){
                moveX = e.targetTouches[0].pageX - diffX;
                moveY = e.targetTouches[0].pageY - diffY;
            }else{
                moveX = e.pageX - diffX;
                moveY = e.pageY - diffY;
            }
        };

        var drop=function(){
            slider_handle.removeEventListener(eventmove, drag);
            document.removeEventListener(eventend ,drop);
        };

        slider_handle.addEventListener(eventstart, function(){
            slider_handle.addEventListener(eventmove, drag);
            document.addEventListener(eventend, drop);
        });
        // handleEvent
        return this;
    };

})($);



