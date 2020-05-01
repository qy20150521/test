$(function () {
    //初始化
    firstData(function (first) {
        let firstHtml = template('firstData', first)
        $('.lt ul').html(firstHtml)
        let cateId = $('ul li a.now').data('id')
        secondData(cateId, function (second) {
            let secondHtml = template('secondData', second)
            $('.rt ul').html(secondHtml)
        })
    })
    //点击渲染对应的商品信息
    $('.lt ul').on('tap', 'a', function () {
        if ($(this).hasClass('now')) return
        $('.lt a').removeClass('now')
        $(this).addClass('now')
        let cateId = $(this).data('id')
        secondData(cateId, function (second) {
            let secondHtml = template('secondData', second)
            $('.rt ul').html(secondHtml)
        })
    })
})

//请求商品分类的数据
function firstData(callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (data) {
            callback && callback(data)
        }
    })
}

//请求分类对应商品的数据
function secondData(id, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: {id: id},
        success: function (data) {
            callback && callback(data)
        }
    })
}