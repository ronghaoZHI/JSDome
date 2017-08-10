/// <reference path="jquery-1.10.2.min.js" />

$(function () {
    var iNum = Math.floor(Math.random() * 4 + 1);//获取到1~4之间的随机整数
    var icount = 0;
    $(".egg").mouseover(function () {//鼠标移到蛋上之后
        var left = $(this).offset().left + 110;//获取到当前鼠标放上去的蛋的left+蛋和锤子之间的间距=锤子距离浏览器的left
        $("#t").css("left", left);
    });

    $(".egg").click(function () {
        if (icount == 4) {//蛋砸完了
            document.getElementById("a3").play();
            return;
        }
        if ($(this).attr("data-isbreak") == "false") {
            icount++;
            $(this).css("background-image", "url(img/egg_2.png)");

            var i = $(this).index() + 1;//获取到当前点击的蛋是第几个蛋
            if (i == iNum) {//中奖
                document.getElementById("a2").play();
            }
            else {//没有中奖
                document.getElementById("a1").play();
            }
            $(this).attr("data-isbreak", "true");
        }
    });


});