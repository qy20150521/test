$(function () {
    //修改密码操作
    $('.affirm').on('tap', function () {
        let data = {
            oldPassword: $('.oldPwd').val().trim(),
            newPassword: $('.newPwd').val().trim(),
            vCode: $('.vCode').val().trim()
        }
        if (!data.oldPassword) return mui.toast('密码不能为空')
        if (!data.newPassword) return mui.toast('新密码不能为空')
        let reNewPwd = $('.reNewPwd').val().trim()
        if (!reNewPwd) return mui.toast('确认新密码不能为空')
        if (data.newPassword !== reNewPwd) return mui.toast('两次输入的密码不一致')
        if (!data.vCode) return mui.toast('验证码不能为空')
        getLogin({
            url: '/user/updatePassword',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.success) {
                    mui.toast('修改成功')
                    // location.href = loginUrl
                } else {
                    mui.toast(res.message)
                }
            }
        })
    })

    //获取验证码
    $('.getVCode').on('tap', function () {
        let that = $(this)
        that.addClass('disabled')
        getLogin({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                $('.vCode').val(res.vCode)
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