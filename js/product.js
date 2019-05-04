$(function () {
    //   尺码选择  
    $('#choice1 li').click(function () {
        $(this).addClass('checked')
        $(this).siblings().removeClass('checked');
    })
    //  颜色选择
    $('#choice2 li').click(function () {
        $(this).addClass('checked')
        $(this).siblings().removeClass('checked');
    })
    //   数量加减
    var $per = $('.j_nums').find('.n_ipt'),
        num = $per.val();
    $('.j_nums .n_btn_1').click(function () {
        num++;
        $per.val(num);
    })
    $('.j_nums .n_btn_2').click(function () {
        num--;
        if (num < 1) {
            num = 1
        };
        $per.val(num);
    })
    // 推荐搭配  组合购买 部分
    //   商品单价
    var $pars = $('.team_list .price').find('span'),
        $inp = $('.team_list .price').find('input'),
        num = $('.sum_ipt').val() - 0, //   保存  数量
        myArr = []; //   保存 每个单价
    //   
    //  输入框数值改变时
    $('.sum_ipt').keyup(function () {
        num = $(this).val() - 0;
        Sum(num);
    })

    $inp.click(function () {
        Sum(num);

    })

    function Sum(index) {
        if (isNaN(index)) {
            return false;
        } else if (index < 1) {
            index = 1
            $('.sum_ipt').val(index)

        }
        var $teamsum = 0; //   总价
        $pars.each(function () {
            myArr.push($(this).text().slice(1) - 0)
        })
        $.each($inp, function (i) {
            if ($inp.eq(i).is(':checked')) {
                $teamsum += myArr[i] * index
                console.log($teamsum, i, index)
                $('.team_sum  span').text($teamsum)
            }
        })

    }






})