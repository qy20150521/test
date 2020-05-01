$(function () {
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //不显示滚动条
    })
    //获取购物车数据
    let cartData = function (callback) {
        getLogin({
            url: '/cart/queryCart',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                callback && callback(data)
            }
        })
    }

    //计算总价
    function getTotal() {
        let total = 0
        $('.checked:checked').each(function (i, v) {
            let price = $(this).data('price')
            let num = $(this).data('num')
            total += price * num
        })
        $('.total').text('￥' + total.toFixed(2))
    }

    $('body').on('change', '.checked', function () {
        getTotal()
    })
    //初始化页面，自动刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function () {
                    let that = this
                    setTimeout(function () {
                        cartData(function (data) {
                            // console.log(data)
                            $('.con').html(template('temp', {list: data}))
                            //释放下拉刷新
                            that.endPulldownToRefresh()
                            getTotal()
                        })
                    }, 700)
                }
            }
        }
    })
    //点击刷新按钮刷新
    $('.fa-refresh').on('tap', function () {
        mui('#refreshContainer').pullRefresh().pulldownLoading()
    })
    //删除弹出提示框
    $('.con').on('tap', '.del', function () {
        let id = $(this).data('id')
        let that = $(this)
        mui.confirm('确定删除吗？', '温馨提示', ['是', '否'], function (e) {
            //点击是，删除数据库和页面中的
            if (e.index == 0) {
                getLogin({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        // console.log(res)
                        if (res.success) {
                            that.parents('li').remove()
                            mui.toast('删除成功')
                            getTotal()
                        }
                    }
                })
            } else {
                //点击否, 关掉当前js对象中的li节点的滑动操作
                mui.swipeoutClose(that.parents('li')[0])
            }
        })
    })
    //编辑弹出提示框
    $('.con').on('tap', '.edit', function () {
        let obj = this.dataset
        let $li = $(this).parents('li')
        console.log(obj)
        let str = template('edit', obj).replace(/\n/g, '')
        mui.confirm(str, '温馨提示', ['是', '否'], function (e) {
            if (e.index == 0) {
                let size = $('.sp_size.now').text()
                let count = $('.num').text()
                let productnum = $('.reCount').text()
                getLogin({
                    url: '/cart/updateCart',
                    type: 'post',
                    datatype: 'json',
                    data: {
                        id: obj.id,
                        size: obj.size,
                        num: obj.num
                    },
                    success: function (res) {
                        if (res.success) {
                            obj.num = count
                            obj.size = size
                            obj.productnum = productnum
                            $li.find('.size').text('鞋码：' + size)
                            $li.find('.count').text(count + '双')
                            $li.find('.checked').data('num', count)
                            mui.toast("编辑成功");
                            //关键滑动的状态
                            mui.swipeoutClose($li[0])
                            // let price = $li.find('.price').data('price')
                            // $li.find('.price').text('￥' + (price * count).toFixed(2))
                            getTotal()
                        }
                    }
                })
            } else {
                //关键滑动的状态
                mui.swipeoutClose($li[0])
            }
        })
    })
    //尺码
    $('body').on('tap', '.se span', function () {
        $(this).addClass('now').siblings().removeClass('now')
    })
    $('body').on('tap', '.add', function () {
        //数量
        let count = $('.num').text()
        //剩余数量
        let reCount = $('.reCount').text()
        if (reCount <= 0) {
            return mui.toast('库存不够啦')
        }
        $('.num').text(++count)
        $('.reCount').text(--reCount)
    })
    $('body').on('tap', '.minus', function () {
        //数量
        let count = $('.num').text()
        //剩余数量
        let reCount = $('.reCount').text()
        if (count <= 1) {
            return mui.toast('商品数目不能小于1')
        }
        $('.num').text(--count)
        $('.reCount').text(++reCount)
    })


})