$(function () {
    let productId = getParam().productId
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: productId
        },
        success: function (res) {
            // console.log(res);
            // console.log(res.proName)
            $('.mui-scroll').html(template('temp', res))
            //初始化区域滚动
            mui('.mui-scroll-wrapper').scroll({
                indicators: false, //不显示滚动条
            });

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            $('.warp').on('tap', '.size span', function () {
                $(this).addClass('now').siblings().removeClass('now')
            })
            //数量
            let count = $('.num').text()
            //剩余数量
            let reCount = $('.reCount').text()
            //尺码
            let size = 0
            $('.warp').on('tap', '.add', function () {
                if (reCount <= 0) {
                    //移动端击穿bug，利用setTimeOut或把tap改成click解决
                    setTimeout(function () {
                        mui.toast('库存不够啦')
                    }, 300)
                    return false
                }
                $('.num').text(++count)
                $('.reCount').text(--reCount)
            })
            $('.warp').on('tap', '.minus', function () {
                if (count <= 0) {
                    return mui.toast('商品数目不能小于0')
                }
                $('.num').text(--count)
                $('.reCount').text(++reCount)
            })
            $('.add_cart').on('tap', function () {
                let flag = true
                $('.size span').each(function (i, v) {
                    if ($(v).hasClass('now')) {
                        flag = false
                        size = $(v).text()
                    }
                })
                if (count == 0 || flag) {
                    mui.toast('请选择尺码和数量')
                } else {
                    getLogin({
                        url: '/cart/addCart',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            productId: productId,
                            num: count,
                            size: size
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.success) {
                                mui.confirm('添加成功，去看看？', '温馨提示', ['是', '否'], function (e) {
                                    if (e.index == 0) {
                                        location.href = cartUrl
                                    }
                                })
                            }
                        }
                    })
                }

            })

        }
    })
})