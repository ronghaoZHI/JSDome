/**
 * Created by c on 13-12-20.
 */
var showLoadMsg=function(html,isload){
    if(!$("#_loadWindow")[0]){
        var msg=$("<div id='_loadWindow'style='position: absolute;text-align: center;top: 0px;left: 0px;right: 0px;width: 100%;height:100%;z-index: 888;'>" +
            "<div style='position: relative;top: 40%;border-radius: 10px;background:rgba(0,0,0,0.2);color: #ffffff;font-weight: bold;display: inline-block;padding: 10px;text-align: center;'>"+
            "<div id='img'><img src='./images/load.gif' alt='' width='40px;'> </div><span style='margin: 20px;line-height: 60px;'>"+html+"</span> "+
            "</div>"+
            "</div> ");
        $("body").append(msg);
    }else{
        $("#_loadWindow div span").html(html);
        if(isload){
            $("#_loadWindow #img").css({display:"block"});
        }else{
            $("#_loadWindow #img").css({display:"none"});
        }
        $("#_loadWindow").css({display:"block"});
        $("#_loadWindow").removeClass("bounceOut").addClass("bounceIn");

    }

}

this.hideLoadMsg=function(time){
    if(!time){
        time=1000;
    }
    setTimeout(function(){
        $("#_loadWindow").removeClass("bounceIn").addClass("animated bounceOut");
        setTimeout(function(){
            $("#_loadWindow").css({display:"none"});
        },500);
        },time);


}
//移除索引的数组（dx为索引下标值
Array.prototype.remove=function(dx){
    if(isNaN(dx)||dx>this.length){
        return false;
    }
    for(var i= 0,n= 0;i<this.length;i++){
        if(this[i]!=this[dx]){
            this[n++]=this[i];
        }
    }
    this.length-=1;
}