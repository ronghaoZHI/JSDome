/**
 * Created by acer on 13-12-19.
 */

$(function(){
    localStorage.score=5000;
    var eventType="click";//点击事件
//    var downEvent="mousedown";//显示按下事件
    var touchStart="touchstart";//手机上开始触摸事件
    var touchchend="touchend";//手机上结束触摸事件
    //判断是手机还是PC
    if(!$.os.desktop){//如果是手机
        eventType="click";//手机上开始点击事件
        touchStart="touchstart";//手机上开始触摸事件
        touchchend="touchend";//手机上结束触摸事件
    }else{//否则就是PC
        eventType="click";//PC 点击事件
        touchStart="mousedown";//鼠标开始按下
        touchchend="mouseup";//按下结束
    }
    $(".button_btn").bind(touchStart,function(){
        $(this).css({backgroundColor:"#F37737"});

    });
    $(".button_btn").bind(eventType,function(){
        $(this).css({backgroundColor:"rgba(0,0,0,0.3)"});
    });
    $(".button_btn1").bind(touchStart,function(){
        $(this).css({backgroundColor:"#F37737"});

    });
    $(".button_btn1").bind(eventType,function(){
        $(this).css({backgroundColor:"#388E8E"});
    });
    $(".button_btn2").bind(touchStart,function(){
        $(this).css({backgroundColor:"#F37737"});

    });
    $(".button_btn2").bind(eventType,function(){
        $(this).css({backgroundColor:"#708090"});
    });
    $(".button_btn3").bind(touchStart,function(){
        $(this).css({backgroundColor:"#F37737"});

    });
    $(".button_btn3").bind(eventType,function(){
        $(this).css({backgroundColor:"firebrick"});
    });
    $(".button_btn4").bind(touchStart,function(){
        $(this).css({backgroundColor:"#F37737"});

    });
    $(".button_btn4").bind(eventType,function(){
        $(this).css({backgroundColor:"#8B6914"});
    });
//    底部按钮点击效果
    $(".sx").bind(touchStart,function(){
        $(this).removeClass("l6r1").addClass("l6r2");
    });
    $(".sx").bind(eventType,function(){
        $(this).addClass("l6r1").removeClass("l6r2")
    })
//    $(".button_btn5").bind(touchStart,function(){
//        $(this).css({backgroundColor:red});
//
//    });
//    $(".button_btn5").bind(eventType,function(){
//        $(this).css({backgroundColor:"#708090"});
//    showLoadMsg("请输入用户名");
//    hideLoadMsg(1000);
    //点击快速注册，进入注册界面
        $("#l_register").bind(eventType,function(){
            $("#qh_product_l").hide();
            $("#qh_product_r").show();

        });
        $("#return_login").bind(eventType,function(){
            $("#qh_product_l").show();
            $("#qh_product_r").hide();
        });
//    点击登录
    $("#l_login").bind(eventType,function(){
         var  userName=$("#l_username").val().trim();
        var  userPwd=$("#l_userpwd").val().trim();
        if(userName==""||userName=="请输入用户名"){
            showLoadMsg("请输入用户名");
            hideLoadMsg(1000);
            return;
        }
        if(userPwd==""||userPwd=="请输入密码"){
            showLoadMsg("你的密码不能为空");
            hideLoadMsg(1000);
            return;
        }
showLoadMsg("正在登陆，请稍后···");
       console.log(localStorage.name,localStorage.pwd);
        if((userName==localStorage.name&&userPwd==localStorage.pwd)){
            login_success();
            $("#indexPage_username").text(userName);
            setTimeout(function(){
                hideLoadMsg();
            },1000)
        }else{
            showLoadMsg("用户名不存在");
            hideLoadMsg();
        }
    })
//    点击注册
    $("#r_login").bind(eventType,function(){
        var user={};
        var  r_userName=$("#r_username").val().trim();
        var  r_userPwd=$("#r_userpwd").val().trim();
        var  res_userPwd=$("#res_userpwd").val().trim();
        var regex=/^[0-9A-Z-a-z]{6,15}$/;
        if(r_userName==""||r_userName=="请输入用户名"){
            showLoadMsg("你的用户名不能为空");
            hideLoadMsg(1000);
            return;
        }

        if(r_userPwd==""||r_userPwd=="请输入密码"){

            showLoadMsg("请输入你的密码");
            hideLoadMsg(1000);
            return;
        }
        if(res_userPwd==""||res_userPwd=="请确认密码"){

            showLoadMsg("确认密码不能为空！");
            hideLoadMsg(1000);
            return;
        }
        if(r_userPwd.length<6){
            showLoadMsg("密码不能少于6个字符");
            hideLoadMsg(1000);

            return;
        }
        if(r_userName.length>18){
            showLoadMsg("用户名长度过长！");
            hideLoadMsg(1000);

            return;
        }

        if(r_userPwd!=res_userPwd){
            showLoadMsg("你两次输入的密码不相同！");
            hideLoadMsg(1000);

            return;
        }
    if(!regex.exec(r_userName)){
        showLoadMsg("用户名只能包括0-9，a-z，A-Z");
        hideLoadMsg(1000);
        return;
    }
        showLoadMsg("正在注册···");
        localStorage.name=r_userName;
        localStorage.pwd=r_userPwd;
        user.name=r_userName;
        user.paw=r_userPwd;
        if(user !=""||user !=null){
            setTimeout(function(){
                hideLoadMsg();
//                进入登陆界面进行等待登陆
                $("#qh_product_r").hide();
                $("#qh_product_l").show();
//                在登陆界面显示用户名和密码，密码字符设置为password，用户看不到
                $("#l_username").val(user.name);
                $("#l_userpwd").attr("type","password");
                $("#l_userpwd").val(user.pwd);
            },1000);
        }

    });
//    游客登陆，随机登陆
    $("#randUser").bind(eventType,function(){
        var date=new Date();
        var time=date.getTime();
        var name=""+time;
        setTimeout(function(){
            showLoadMsg("你随机的用户是："+name);
        },0);
        setTimeout(function(){

            hideLoadMsg();
            login_success();
            $("#indexPage_username").text(name);
        },1000);
    });
    $("#indexPage_home").bind(eventType,function(){
        showLoadMsg("正在注销···");
        setTimeout(function(){
            hideLoadMsg();
            $("#qh_join_game").hide();
            $("#qh_login_reg").show();
        },1000);
    });
    //进入房间
    $(".game_breakout").bind("click",function(){
        var roomType = $(this).attr("data-type");
        if(roomType ==1||roomType==2||roomType==3||roomType==4){
            showLoadMsg("正在进入房间...");
            setTimeout(function(){
                hideLoadMsg();
                joinRoom();
            },3000);
        }
    })

//    返回大厅
$("#gameMain").bind(eventType,function(){
    showLoadMsg("正在返回大厅...");
    setTimeout(function(){
        hideLoadMsg();
        clearCard();
        $("#dnIndexPage").hide();
        $("#qh_join_game").show();
        $(".cardsWrap").hide();
    },2000);
})
    $("#start").bind(eventType,function(){
        $("#start").hide();
        $(".cardsWrap").show();
         cards();//调用生成卡牌
        putCard();
        sys_putCard();
    })


    //点击亮牌
    $("#showDown").bind(eventType,function(){
        var cards=[];
        if($(".select").length<3){
            showLoadMsg("请选三张牌进行亮牌");
            hideLoadMsg();
            return;
        }
        $(".select").each(function(){
            var card=$(this);
            cards.push(card.attr("name"));
            $(".selfCard").append(card);

        });
        $(".noSelect").each(function(){
            var noCard=$(this);
            $(".selfCard").append(noCard);
        });
        $(".cardsWrap").hide();
        userResult(1);
    });

//    点击没牛
$("#noShowDown").bind(eventType,function(){
    var cards = [];
    $(".select").each(function(){
        var card=$(this);
        cards.push(card.attr("name"));
        $(".selfCard").append(card);

    });
    $(".noSelect").each(function(){
        var noCard=$(this);
        $(".selfCard").append(noCard);
    });
    $(".cardsWrap").hide();
    userResult(0);
})

    //光标进入事件
    $("input").on("focus", function() {
        var value = $(this).attr("value");
        //alert(value);
        //var value=this.value.trim();
        var value = $(this).attr("value");
        switch (this.id) {
            case "l_username":
            case "r_username":

                if (value == "请输入用户名") {
                    this.value = "";
                    this.style.color = "black";
                    this.type = "text";
                }
                break;
            case "l_userpwd":
            case "r_userpwd":
            case "res_userpwd":
                if (value == "请输入密码" || value == "请确认密码") {
                    this.value = "";
                    this.style.color = "black";
                    this.type = "password";
                }
                break;
        }
    })

    $("input").on("blur",function(){
        var value=this.value.trim();
        switch (this.id){
            case"l_username":
            case "r_username":
                if(value==""){
                    this.value="请输入用户名";
                    this.style.color="gray";
                    this.type="text";

                }
                break;
            case"l_userpwd":
            case"r_userpwd":

                if(value == ""){
                    this.value="请输入密码";
                    this.style.color="gray";
                    this.type="text";

                }
               break;
            case "res_userpwd":
                if(value == ""){
                    this.value="请确认密码";
                    this.style.color="gray";
                    this.type="text";
                }
                break;
        }

    })


})
function joinRoom(){
    $("#start").show();
    $("#dnIndexPage").show();
    $("#qh_join_game").hide();
    $("#player1 .nickName").html($("#indexPage_username").html());
    $("#player1 .score").html(localStorage.score);
}


