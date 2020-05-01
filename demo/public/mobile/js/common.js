//获取？后面拼接的关键字
let getParam = function () {
    let obj = {}
    //解码
    let search = decodeURI(location.search)
    if (search) {
        search = search.replace('?', '')
        searchArr = search.split('&')
        searchArr.forEach(function (v, i) {
            let vArr = v.split('=')
            obj[vArr[0]] = vArr[1]
        })
    }
    return obj
}
let loginUrl = '/mobile/login.html'
let indexUrl = '/mobile/member.html'
let cartUrl = '/mobile/cart.html'
//获取登录状态
let getLogin = function (params) {
    $.ajax({
        url: params.url,
        type: params.type,
        dataType: params.dataType,
        data: params.data,
        success: function (res) {
            if (res.error === 400) {
                location.href = loginUrl + '?returnUrl=' + location.href
                return false
            } else {
                params.success && params.success(res)
            }
        },
        error: function () {
            mui.toast('服务端繁忙')
        }
    })
}