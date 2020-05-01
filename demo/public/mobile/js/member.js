$(function () {
    //初始化账户个人信息
    getLogin({
        url: '/user/queryUserMessage',
        type: 'get',
        success: function (res) {
            console.log(res)
            $('.person').html(template('temp', res))
        }
    })
    //退出登录操作
    $('.logout a').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (res) {
                console.log(res)
                if (res.success) {
                    location.href = loginUrl
                }
            }
        })
    })
})