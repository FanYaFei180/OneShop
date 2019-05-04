$(function () {
    //顶部导航栏
    $(".ss_list").on("mouseenter",function () {
        $(".ss_list_bg").show()
    }).on("mouseleave",function () {
        $(".ss_list_bg").hide()
    });
    //左侧边栏
    $(".leftNav").find("li").on("mouseenter",function () {
        $(this).find(".zj").show();
    }).on("mouseleave",function () {
        $(this).find(".zj").hide();
    });
    //轮播图
    function aply() {
        var num = 0;
        var timer=null;
        var $imgLi=$(".slide_box>li");
        var $numLi=$(".num>li");
        $numLi.on("mouseenter",function () {
            clearInterval(timer);
            $(this).addClass("active").siblings().removeClass("active")
        }).on("mouseleave",function () {
            timer=setInterval(time1,1000);
            num= $(this).index()
        });
        timer=setInterval(time1,1000);
        function time1() {
            num++;
            if (num>$imgLi.length) num=0;
            $imgLi.eq(num).fadeIn().siblings().fadeOut();
            $numLi.eq(num).addClass("active").siblings().removeClass("active");
        }
    }
    aply();
    //右侧向上滚
    $(function(){
        function movedown(){
            var marginTop = 0 ;
            var stop =false;
            var interval = setInterval(function(){
                if(stop) return;
                $('#express').children('li').first().animate({
                        'margin-top':marginTop--},
                    0,
                    function(){
                        var $first =$(this);
                        if(!$first.is(':animated')){
                            if((-marginTop)>$first.height()){
                                $first.css({'margin-top':0}).appendTo($('#express'));
                                marginTop = 0;
                            }
                        }
                    });
            },50);
            $('#express').mouseover(function(){
                stop = true;
            }).mouseout(function(){
                stop = false;
            });
        }
        movedown();
    });
//购物车
    $(function() {
        //** 展示交互
        var timeoutId
        var $last = $('.last')
        function fadeOut() {
            timeoutId = setTimeout(function () {
                $last.fadeOut('slow');
            }, 500)
        }
        $('.car_t').hover(function () {
            clearTimeout(timeoutId)
            $last.fadeIn('slow');
        }, fadeOut)
        $last.hover(function () {
            clearTimeout(timeoutId)
        }, fadeOut)
    });
    //1数据
    var shopdata={
        J_totalPrice:0,
        J_totalCount:0,
        shopList:[]
    };
    //2初始化

    $('.shop li').each(function (index,item) {
        console.log(index,item)
        var price= $(item).find(".J_smallTotalPrice").text().slice(1)-0;
        console.log(price);
        var num= $(item).find("input").val()-0;
        console.log(num);
        shopdata.shopList.push({
            num:num,
            price:price,
            to_p:num*price
        })
    });
    //点击加号
    $(".J_btnAddCount").on("click",function () {//点击加加
        var C_index=$(this).parents("li").index();
        var shop_num=++shopdata.shopList[C_index].num;
        shopData(C_index,shop_num);
    });
    //减号
    $(".J_btnDelCount").on("click",function () {
        var C_index=$(this).parents("li").index();
        var shop_num=shopdata.shopList[C_index].num;
        if (shop_num<=1) {
            alert("确定删除吗");
            $(this).parents("li").remove();
            return false;
        }
        --shop_num;
        shopData(C_index,shop_num);
    });
    //删除
    $(".J_btnDelete").on("click",function () {
        var C_index=$(this).parents("li").index();
        $(this).parents("li").remove();
        shopdata.shopList.splice(C_index,1);
        console.log(shopdata.shopList);
        shopData(-1);
        show_data(-1);
        if (shopdata.shopList.length===0) {
            $(".total_price").parent(".last").hide();
            document.write("空空如也")
        }
    });
    function shopData(index,num) {//改变数据
        //修改单个商品价格
        if (index>-1) {
            shopdata.shopList[index].num=num;
            shopdata.shopList[index].to_p=num*shopdata.shopList[index].price;
        }
        //修改总的商品价格、、数量
        shopdata.J_totalPrice=0;
        shopdata.J_totalCount=0;
        $.each(shopdata.shopList,function (index,item) {
            console.log(index,item)
            shopdata.J_totalPrice+=item.to_p;
            shopdata.J_totalCount+=item.num;
            console.log(shopdata.J_totalPrice,shopdata.J_totalCount)
        });
        show_data(index);
    }
    function show_data(index) {//输出页面
        if (index>-1){
            $(".shop li").eq(index).find(".J_smallTotalPrice").text(shopdata.shopList[index].to_p);
            $(".shop li").eq(index).find(".J_inputCount").val(shopdata.shopList[index].num);
        }
        $(".J_totalCount").text(shopdata.J_totalCount);
        $(".J_totalPrice").text(shopdata.J_totalPrice);
    }



})