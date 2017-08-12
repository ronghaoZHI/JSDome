/**
 * Created by wq on 13-12-23.
 */

var my_cards = [];//存放卡牌
var  myCards;
this.ll=['没牛','牛丁','牛二','牛三','牛四','牛五','牛六','牛七','牛八','牛九','牛牛'];
var sys_result;
var user_result;
var user_clip;
var sys_clip;

//生成卡牌
this.cards = function(){
    my_cards=[];
    var flower = "a";
    //判断花色
    for(var i = 1;i<=4;i++){
        if(i == 2){
            flower = "b";
        }
        if(i == 3){
            flower = "c";
        }
        if(i == 4){
            flower = "d";
        }
        for(var j = 1; j<=13;j++){
            var Name ="";
            if(j == 1){
                Name = 1 + flower;
            }
            else if(j == 2){
                Name = 2 + flower;
            }else{
                Name = j + flower;
            }
            my_cards.push(Name);

        }
    }console.log("my_cards:", my_cards);

}
//渲染卡牌
this.putCard = function(){
    for(var i = 0;i <my_cards.length;i++){
        var card;
        var cardNumber;
        if(my_cards[i].length == 2){
            cardNumber = my_cards[i].substr(0,1);
            card = $("<img class='card' src='./images/cards/"+my_cards[i]+".png' point='"+cardNumber+"'name='"+my_cards[i]+"' alt='"+my_cards[i]+"'>"  );
        }
        if(my_cards[i].length == 3){
            cardNumber = my_cards[i].substr(0,2);
            if(cardNumber >=10){
                cardNumber=10;
            }
        card = $("<img class='card' src=' ./images/cards/"+my_cards[i]+".png' point='"+cardNumber+"' name='"+my_cards[i]+"' alt='"+my_cards[i]+"'> ");
    }$("#container").append(card);
    }
    var self_card = $("#container .card");
    myCards = getNumb();
    console.log("getNumb:",myCards);
    var index;
    for(var j = 0;j<myCards.length;j++){
        index = myCards[j];
        $(".operateUI").append(self_card[index]);
        self_card[index].style.display = "block";
        self_card[index].style.position = "absolute";
        self_card[index].style.left = 57*j + "px";
        self_card[index].style.bottom = "0px";
        self_card[index].style.zIndex = j * 10;

        $(".operateUI .card").addClass("noSelect");
        var count = 0;//定义次数，判断下面你点了多少张牌
        var cardPiontSum = 0;//点击3张牌之后的总和
        $(self_card[index]).bind("click",function(){
            var cardUI = $(this);//把你当前点击的牌赋给cardUI
            if(cardUI.hasClass("select")){//判断是否第二次点击
                count--;//第二次点击时就-1
                cardUI.css("bottom","0px");//离底部为0px，向下移动
                cardUI.removeClass("select").addClass("noSelect");
                //第二次点击时加上noSelect没选中样式，取消选中样式select


                var num = parseInt($(this).attr("point"));
                $(".num_poker").text("");
                cardPiontSum -=num;
                $(".select").each(function(index){
                    var cnum = parseInt($(this).attr("point"));
                    $(".num_poker").each(function(index2){
                        if(index == index2){
                            if(isNaN(cnum)){
                                $(this).text("");
                            }else{
                                $(this).text(cnum);
                            }
                        }
                    });
                });
                $("#num_pokerSum").html(cardPiontSum);
            }else{//第一次点击
            if(count >=3){//如果点击的牌超过3张就return，不执行下面的代码
                return;
            }
            count++;//每点击一张牌就+1记录起来
            cardUI.css("bottom","20px");//点击牌时向上移动20px
            cardUI.addClass("select").removeClass("noSelect");

                var num = cardUI.attr("point");
                num = parseInt(num);
                cardPiontSum +=num;

                $(".select").each(function(index){
                    var cnum = parseInt($(this).attr("point"));
                    $(".num_poker").each(function(index2){
                        if(index == index2){
                        if(isNaN(cnum)){
                            $(this).text("");
                        }else{
                            $(this).text(cnum);
                        }
                        }
                    });
                });
                $("#num_pokerSum").html(cardPiontSum)
            }
//            判断有牛没牛
            var dealResult = parseInt($("#num_pokerSum").html());
            if((dealResult % 10 == 0)&& $(".select").length == 3){
                $("#txt_cattle").html("有牛");
            }
            else if(dealResult == 0){
                $("#num_pokerSum").html();
                $("#txt_cattle").html();
            }
            else{
                $("#txt_cattle").html("没牛");
            }
        });
    }
}
this.sys_putCard=function(){
    var allCards=my_cards;
    var userCards=myCards;
    for(var i=0;i<userCards.length;i++){
        allCards.remove(userCards[i]);
    }
    var sysShowCards=$("#container .card");
    var sysCards=getNumb_next();
    var sysIndex;
    for(var a=0;a<sysCards.length;a++){
        sysIndex=sysCards[a];
        $(".p3Card").append(sysShowCards[sysIndex]);
        sysShowCards[sysIndex].style.display="block";
        sysShowCards[sysIndex].style.left=30*a+"px";
        sysShowCards[sysIndex].style.bottom="0px";
        sysShowCards[sysIndex].style.zIndex=a*10;
    }
    sysResult();
}

//计算系统显示牛几的结果
function sysResult(){
    var sys_cards=$(".p3Card .card");//获取player3用户所有的牌
    var pointList=[];
    for(var b=0;b<sys_cards.length;b++){
        var sysPoint=$(sys_cards[b]).attr("point");
        pointList.push(sysPoint);
    }
    var pokerResult=$("<div class='pokerResult'></div>");
    $(".p3Card").append(pokerResult);
    var sys_num1=parseInt(pointList[0]);
    var sys_num2=parseInt(pointList[1]);
    var sys_num3=parseInt(pointList[2]);
    var sys_num4=parseInt(pointList[3]);
    var sys_num5=parseInt(pointList[4]);

    if((sys_num1+sys_num2+sys_num3)%10==0){
        var result=sys_num4+sys_num5;
        sysResultCount(result);
        return;
        }
    if((sys_num1+sys_num2+sys_num4)%10==0){
        var result=sys_num3+sys_num4;
        sysResultCount(result);
        return;
    }
    if((sys_num1+sys_num2+sys_num5)%10==0){
        var result=sys_num3+sys_num4;
        sysResultCount(result);
        return;
    }
    if((sys_num1+sys_num3+sys_num4)%10==0){
        var result=sys_num2+sys_num5;
        sysResultCount(result);
        return;
    }
    if((sys_num1+sys_num4+sys_num5)%10==0){
        var result=sys_num2+sys_num3;
        sysResultCount(result);
        return;
    }
    if((sys_num1+sys_num3+sys_num4)%10==0){
        var result=sys_num4+sys_num5;
        sysResultCount(result);
        return;
    }
    if((sys_num2+sys_num3+sys_num4)%10==0){
        var result=sys_num1+sys_num5;
        sysResultCount(result);
        return;
    }
    if((sys_num2+sys_num3+sys_num5)%10==0){
        var result=sys_num1+sys_num4;
        sysResultCount(result);
        return;
    }
    if((sys_num2+sys_num4+sys_num5)%10==0){
        var result=sys_num1+sys_num3;
        sysResultCount(result);
        return;
    }
    if((sys_num3+sys_num4+sys_num5)%10==0){
        var result=sys_num1+sys_num2;
        sysResultCount(result);
        return;
    }
    else{
        sys_result=0;
        $(".p3Card .pokerResult").html(this.ll[sys_result]);
    }
    }

function sysResultCount(result){
    console.log("dsidh:",result);
    if(result<10){
        sys_result=result;

        $(".p3Card .pokerResult").html( this.ll[sys_result]);
    }else if(result%10==0){
        sys_result=10;
        $(".p3Card .pokerResult").html( this.ll[sys_result]);

    }else{
        var result=result.toString();
        sys_result=result.substring(result.length-1);//
        $(".p3Card .pokerResult").html( this.ll[sys_result]);
    }
}

//登录成功之后（包括游客登录）
function login_success(){
    $("#qh_login_reg").hide();
    $("#qh_join_game").show();
    $(".qh_money").text(localStorage.score);
}
//进入房间
function joinRoom(){
    $("#start").show();
    $("#dnIndexPage").show();
    $("#qh_join_game").hide();
    $("#player1 .nickName").html($("#indexPage_username").html());
    $("#player1 .score").html(localStorage.score);
}
//随机方法（随机5个数）
function getNumb(){
    var num = [];//定义一个宿主
    for(var i = 0;i<5;i++){
        var x = 51;
        var y = 0;
        var val = parseInt(Math.random()*(x-y+1)+y);
        var isEqu = false;
        for(var idx in num){
            if(num[idx] == val){
                isEqu = true;
                break;
            }
        }
        if(isEqu){
            i -- ;
        }
        else{
            num[num.length] = val;
        }
    }
    return num;
}
//第二次随机（机器人
function getNumb_next(){
    var num = [];//定义一个宿主
    for(var i = 0;i<5;i++){
        var x = 46;
        var y = 0;
        var val = parseInt(Math.random()*(x-y+1)+y);
        var isEqu = false;
        for(var idx in num){
            if(num[idx] == val){
                isEqu = true;
                break;
            }
        }
        if(isEqu){
            i -- ;
        }
        else{
            num[num.length] = val;
        }
    }
    return num;
}
//清除卡牌
function clearCard(){
    $(".card").remove();
    $("#cardWrap").hide();
    $(".num_poker").html("");
    $("#num_pokerSum").html("");
    $("#txt_cattle").html();
    $("#container").empty();
    $(".pokerResult").html("");
    $(".pokerResult").remove();
}

this.userResult=function(i){
    if(i==1){
        for(var m=0;m<$(".select").length;m++){
            var card=$(".select");
            card[m].style.left=m*20+"px";
            card[m].style.bottom="0px";
            card[m].style.zIndex=10+m;
            $(card[m]).unbind("click");
        }
        for(var n=0;n<$(".noSelect").length;n++){
            var noCard=$(".noSelect");
            noCard[n].style.left=80+n*20+"px";
            noCard[n].style.bottom="0px";
            noCard[n].style.zIndex=100+n;
            $(noCard[n]).unbind("click");
        }

        //计算牛几（自己）
        var noSelect_CardName=$(".noSelect");
        var number1,number2;
        for(var i=0;i<noSelect_CardName.length;i++){
            if(i==0){
                number1=$(noSelect_CardName[i]).attr("point");

            }
            if(i==1){
                number2=$(noSelect_CardName[i]).attr("point");
            }
        }
        var numberCount=(parseInt(number1)+parseInt(number2)).toString();
        var result=$("<div class='pokerResult'></div>");
        $(".selfCard").append(result);
        var deaResult=parseInt($("#num_pokerSum").html());
        if((deaResult %10==0)&&$(".select").length==3){
            if(numberCount%10==0){
                user_result=10;
                $(".selfCard .pokerResult").html(this.ll[user_result]);
            }else{
                if(numberCount.length==2){
                    user_result=numberCount.substring(numberCount.length-1);
                    $(".selfCard .pokerResult").html(this.ll[user_result]);
                }else{
                    user_result=parseInt(numberCount);
                    $(".selfCard .pokerResult").html(this.ll[user_result]);
                }
            }
        }else{
            user_result=0;
            $(".selfCard .pokerResult").html(this.ll[user_result]);
        }
    }else{
        if($(".selfCard .card").hasClass("select")){
            for(var m=0;m<$(".select").length;m++){
                var noCard=$(".select");
                noCard[m].style.left=m*20+"px";
                noCard[m].style.bottom="0px";
                noCard[m].style.zIndex=100+m;
                $(noCard[m]).unbind("click");
            }
            for(var n=0;n<$(".noSelect").length;n++){
                var noCard=$(".noSelect");
                noCard[n].style.left=100+n*20+"px";
                noCard[n].style.bottom="0px";
                noCard[n].style.zIndex=100+n;
                $(noCard[n]).unbind("click");
            }
        }else{
            for(var n=0;n<$(".noSelect").length;n++){
                var noCard=$(".noSelect");
                noCard[n].style.left=n*20+"px";
                noCard[n].style.bottom="0px";
                noCard[n].style.zIndex=100+n;
                $(noCard[n]).unbind("click");
            }
        }

        var result=$("<div class='pokerResult'></div>");
        $(".selfCard").append(result);
        user_result=0;
        $(".selfCard .pokerResult").html(this.ll[user_result]);
    }

    setTimeout(function(){
        resultInfo(user_result,sys_result);
    },3000)
}
function resultInfo(user_result,sys_result){
    var u_scoreInfo;
    var s_scoreInfo;
    if(user_result>sys_result){
        user_clip="胜利";
        sys_clip="失败";
        showLoadMsg("你"+user_clip+"了");
        hideLoadMsg();
    }else if(user_result==sys_result){
        user_clip="平局";
        sys_clip="平局";
        showLoadMsg("平局");
        hideLoadMsg();
    }else{
        user_clip="失败";
        sys_clip="胜利";
        showLoadMsg("你"+user_clip+"了");
        hideLoadMsg();
    }
}

