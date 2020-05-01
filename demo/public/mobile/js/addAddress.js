$(function () {
    let data = {}
    //获取用户输入的数据
    let getAddressData = function () {
        data = {
            recipients: $('.recipients').val().trim(),
            postcode: $('.postcode').val().trim(),
            address: $('.address').val().trim(),
            addressDetail: $('.addressDetail').val().trim()
        }
        //非空校验
        if (!data.recipients) return mui.toast('请填写收货人')
        if (!data.postcode) return mui.toast('请填写邮编')
        if (!data.address) return mui.toast('请填写省市区')
        if (!data.addressDetail) return mui.toast('请填写详细地址')
    }
    //三级联动
    $('.address').on('tap', function () {
        let city = new mui.PopPicker({layer: 3})
        city.setData(cityData)
        city.show(function (data) {
            // console.log(data)
            if (data[0].text === data[1].text) {
                data[1].text = ''
            }
            let str = data[0].text + data[1].text + data[2].text
            $('.address').val(str)
        })
    })
    let addressId = getParam().id
    //根据地址栏是否传入id来判断修改还是添加
    if (addressId) {
        $('header h3').text('修改收货地址')
        getLogin({
            url: '/address/queryAddress',
            type: 'get',
            success: function (res) {
                let arr = res.filter(function (v, i) {
                    return v.id == addressId
                })
                console.log(arr)
                $('.recipients').val(arr[0].recipients)
                $('.postcode').val(arr[0].postCode)
                $('.address').val(arr[0].address)
                $('.addressDetail').val(arr[0].addressDetail)
            }
        })
        $('.affirm').on('tap', function () {
            getAddressData()
            data.id = addressId
            getLogin({
                url: '/address/updateAddress',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res) {
                    if (res.success) {
                        //修改成功，跳回设置页面
                        mui.toast('修改成功')
                        location.href = '/mobile/setAddress.html'
                    }
                }
            })
        })
    } else {
        $('header h3').text('添加收货地址')
        $('.affirm').on('tap', function () {
            getAddressData()
            getLogin({
                url: '/address/addAddress',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (res) {
                    //添加成功，跳回设置页面
                    if (res.success) {
                        mui.toast('添加成功')
                        location.href = '/mobile/setAddress.html'
                    }
                }
            })
        })
    }
})