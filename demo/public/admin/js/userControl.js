$(function () {
    window.page = 1
    let render = function () {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: window.page,
                pageSize: 2
            },
            success: function (data) {
                console.log(data)
                $('tbody').html(template('temp', data))
                getPagination(data)
            }
        })
    }
    //获取分页内容
    let getPagination = function (data) {
        $('.pagination').bootstrapPaginator({
            //bootstrap对应的版本
            bootstrapMajorVersion: 3,
            //设置分页的文本
            itemTexts: function (type, page, current) {
                switch (type) {
                    case 'first':
                        return '首页'
                        break
                    case 'last':
                        return '尾页'
                        break
                    case 'next':
                        return '下一页'
                        break
                    case 'prev':
                        return '上一页'
                        break
                    case 'page':
                        return page
                }
            },
            //显示提示信息
            tooltipTitles: function (type, page, current) {
                switch (type) {
                    case 'first':
                        return '首页'
                        break
                    case 'last':
                        return '尾页'
                        break
                    case 'next':
                        return '下一页'
                        break
                    case 'prev':
                        return '上一页'
                        break
                    case 'page':
                        return page
                }
            },
            //当前页码
            currentPage: window.page,
            //显示的按钮数量
            numberOfPages: 2,
            //总页数
            totalPages: Math.ceil(data.total / data.size),
            //监听点击按钮改变事件 newPage改变后的页码
            onPageChanged: function (event, oldPage, newPage) {
                window.page = newPage
                render()
            }
        })
    }
    render()
    //禁用
    $('body').on('click', '.btn-danger', function () {
        let id = $(this).data('id')
        setUser(id, 0, function (data) {
            // console.log(data)
            if (data.success) {
                render()
            }
        })
    })
    //启用
    $('body').on('click', '.btn-primary', function () {
        let id = $(this).data('id')
        setUser(id, 1, function (data) {
            if (data.success) {
                render()
            }
        })
    })
    //设置用户状态
    let setUser = function (id, isDelete, callback) {
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (data) {
                callback && callback(data)
            }
        })
    }
})