
//点击验证码，60秒倒计时
var min = 60;
var time;
$('.tableText').click(function() {
    clearInterval(time);
    time = setInterval(fn,1000);
});
function fn(){
    min = --min;
    if(min>0){
        $('.tableText').html('（'+min +'秒）重发');
    }else{
        min = 60;
        $('.tableText').html('发送验证码')
    }
}













