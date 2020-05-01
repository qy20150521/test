$(function () {
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //不显示滚动条
    })
    /*
* 1. 页面初始化时, 关键字在输入框内
* 2. 页面初始化完成之后, 根据关键字渲染第一页的数据4条
* 3. 点击搜索根据新关键字重新渲染
* 4. 点击排序, 根据排序的选项, 重新进行排序, 选中时默认是升序, 再点击同一个是降序
* 5. 当用户下拉时要刷新, 根据当时的条件重置排序功能
* 6. 当用户上拉的时候, 加载下一页, 没有数据要友好的提醒用户
* */
    window.page = 0
    let getData = function (obj, callback) {
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: obj,
            success: function (data) {
                window.page = data.page
                callback && callback(data)
            }
        })
    }
    //1.关键字在搜素框内
    let urlKey = getParam()
    $('.search').val(urlKey.key)

    //2. 页面初始化完成之后, 根据关键字渲染第一页的数据4条
    // getData({
    //     proName: urlKey.key,
    //     page: 1,
    //     pageSize: 4
    // }, function (data) {
    //     $('.product').html(template('temp', data))
    // })

    //3. 点击搜索根据新关键字重新渲染
    $('.btn').on('tap', function () {
        // let val = $('.search').val()
        // if (val.trim() == '') return mui.toast('请输入关键字')
        // getData({
        //     proName: val,
        //     page: 1,
        //     pageSize: 4
        // }, function (data) {
        //     $('.product').html(template('temp', data))
        // })
        //直接触发下拉刷新
        mui('#refreshContainer').pullRefresh().pulldownLoading()
    })

    //4. 点击排序, 根据排序的选项, 重新进行排序, 选中时默认是升序, 再点击同一个是降序
    $('.tab a').on('tap', function () {
        if ($(this).hasClass('now')) {
            if ($(this).children('span').hasClass('fa-angle-down')) {
                $(this).children('span').removeClass('fa-angle-down').addClass('fa-angle-up')
            } else {
                $(this).children('span').removeClass('fa-angle-up').addClass('fa-angle-down')
            }
        } else {
            $(this).addClass('now').siblings().removeClass('now').children('span').removeClass("fa-angle-up").addClass('fa-angle-down')
        }
        let type = $(this).data('type')
        let value = $(this).children('span').hasClass('fa-angle-down') ? 2 : 1
        let val = $('.search').val()
        if (val.trim() == '') return mui.toast('请输入关键字')
        let obj = {
            proName: val,
            page: 1,
            pageSize: 4
        }
        obj[type] = value
        getData(obj, function (data) {
            $('.product').html(template('temp', data))
        })
        //重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true)
        //直接触发下拉刷新
        // mui('#refreshContainer').pullRefresh().pulldownLoading()
    })

    //5. 当用户下拉时要刷新, 根据当时的条件重置排序功能
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    let that = this
                    let type = $(this).data('type')
                    let value = $(this).children('span').hasClass('fa-angle-down') ? 2 : 1
                    let val = $('.search').val()
                    if (!val) {
                        //释放下拉刷新
                        that.endPulldownToRefresh();
                        $(".product").html('');
                        return mui.toast("请输入关键字");
                    }
                    let obj = {
                        proName: val,
                        page: 1,
                        pageSize: 4
                    }
                    obj[type] = value
                    setTimeout(function () {
                        getData(obj, function (data) {
                            $('.product').html(template('temp', data))
                        })
                        that.endPulldownToRefresh()
                        that.refresh(true);
                    }, 500)
                }
            },
            up: {
                callback: function () {
                    let that = this
                    window.page++
                    let type = $(this).data('type')
                    let value = $(this).children('span').hasClass('fa-angle-down') ? 2 : 1
                    let val = $('.search').val()
                    if (val.trim() == '') return mui.toast('请输入关键字')
                    let obj = {
                        proName: val,
                        page: window.page,
                        pageSize: 4
                    }
                    obj[type] = value
                    setTimeout(function () {
                        getData(obj, function (data) {
                            $('.product').append(template('temp', data))
                            //判断 : 根据data里面有没有数据而显示对应的提示语
                            if (data.data.length) {
                                //结束上拉加载, 默认值: false
                                that.endPullupToRefresh();
                            } else {
                                that.endPullupToRefresh(true);
                            }
                        })
                    }, 500)
                }
            }
        }
    })
    $('.product').on('tap', '.product_item', function () {
        let href = $(this).data('href')
        location.href = href
    })
})