$(function () {
    //二级菜单
    $('.change_toggle').click(function () {
        $('.toggle').slideToggle()
    })
    //进度条
    NProgress.configure({showSpinner: false})
    $(window).ajaxStart(function () {
        NProgress.start()
    }).ajaxComplete(function () {
        NProgress.done()
    })
    //退出登录
    $('.affirm').click(function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (res) {
                if (res.success) {
                    location.href = '/admin/login.html'
                }
            }
        })
    })
})
