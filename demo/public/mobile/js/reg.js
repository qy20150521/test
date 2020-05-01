$(function () {
    //注册
    $('.reg').on('tap', function () {
        let data = {
            username: $('.username').val().trim(),
            password: $('.pwd').val().trim(),
            mobile: $('.tel').val().trim(),
            vCode: $('.vCode').val().trim()
        }
        //非空，两次密码一致，手机号格式验证
        if (!data.username) return mui.toast('请输入用户名')
        if (!data.mobile) return mui.toast('请输入手机号码')
        if (!/^1[\d]{10}$/.test(data.mobile)) return mui.toast('请输入合法的手机号码')
        if (!data.password) return mui.toast('请输入密码')
        let rePwd = $('.rePwd').val().trim()
        if (!rePwd) return mui.toast('请输入确认密码')
        if (data.password !== rePwd) return mui.toast('两次密码不一致')
        if (!data.vCode) return mui.toast('请输入验证码')

        getLogin({
            url: '/user/register',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.success) {
                    mui.toast('注册成功')
                    location.href = loginUrl
                } else {
                    mui.toast(res.message)
                }
            }
        })
    })
    //获取验证码
    $('.getVcode').on('tap', function () {
        let that = $(this)
        getLogin({
            url: '/user/vCode',
            type: 'get',
            success: function (res) {
                console.log(res)
                $('.vCode').val(res.vCode)
                that.addClass('disabled')
                let time = 60
                that.text('倒计时60秒')
                let timer = setInterval(function () {
                    if (time <= 0) {
                        clearInterval(timer)
                        that.removeClass('disabled').text('获取验证码')
                        return false
                    }
                    time--
                    that.text('倒计时' + time + '秒')
                }, 1000)
            }
        })
    })
})