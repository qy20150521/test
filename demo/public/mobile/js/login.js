$(function () {
    let url = location.search.replace('?returnUrl=', '')
    // console.log(url)
    $('.login').on('tap', function () {
        let data = {}
        let username = $('.username').val()
        let password = $('.password').val()
        data.username = username
        data.password = password
        if (username.trim() == '' || password.trim() == '') {
            return mui.toast('用户名和密码不能为空')
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                //登陆成功
                //跳回去 : 截取传过来的地址
                if (res.success) {
                    if (url) {
                        //判断有拼接地址, 才跳回去
                        location.href = url
                    } else {
                        //没地址跳转个人中心
                        location.href = indexUrl
                    }
                } else {
                    //登录失败
                    mui.toast(res.message)
                }
            }
        })
    })
})