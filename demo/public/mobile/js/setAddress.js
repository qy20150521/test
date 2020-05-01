$(function () {
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //不显示滚动条
    })
    //初始化收货地址
    getLogin({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            $('.address').html(template('address', {data: res}))
        }
    })
    //删除收货地址
    $('.address').on('tap', '.del', function () {
        let id = $(this).data('id')
        let $obj = $(this).parents('li')
        getLogin({
            url: '/address/deleteAddress',
            type: 'post',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    $obj.remove()
                    mui.toast('删除成功')
                }
            }
        })
    })
})