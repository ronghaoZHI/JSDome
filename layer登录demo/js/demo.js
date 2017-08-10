/// <reference path="jquery-1.10.2.min.js" />

function showLoginbox() {
    $("#txtTel").val("");
    $("#txtPwd").val("");
    $("#txtCode").val("");
    layer.open({
        type: 1,//表示弹出的是一个div
        title: "登录",
        area: ["393px", "320px"],//设置弹窗的高度和宽度，注意：不能在css里面设置
        content: $("#loginbox")
    });
}

function login() {
    var tel = $.trim($("#txtTel").val());//获取到手机号
    var pwd = $.trim($("#txtPwd").val());//获取到密码
    var code = $.trim($("#txtCode").val());//获取到验证码
    var rtel = /^(13|14|15|16|17|18)\d{9}$/;//验证手机号的正则表达式
    var rpwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/; //验证密码，由数字和字母组成长度为6~12
    var rcode = /^[0-9a-zA-Z]{4}$/; //验证验证码
    if (!rtel.test(tel))
    {
        layer.msg("手机号格式不正确", {
            time: 1000,
            icon:5
        });
        return;
    }
    if (!rpwd.test(pwd)) {
        layer.msg("密码格式不正确", {
            time: 1000,
            icon: 5
        });
        return;
    }
    if (!rcode.test(code)) {
        layer.msg("验证码格式不正确", {
            time: 1000,
            icon: 5
        });
        return;
    }
    if (tel == "13800000000" && pwd == "admin123") {
        layer.msg("登录成功", {
            time: 1000,
            icon: 6
        }, function () {
            location.href = "http://www.ruanmou.net";
        });
    }
    else {
        layer.msg("手机号或者密码错误", {
            time: 1000,
            icon: 5
        });
    }
}