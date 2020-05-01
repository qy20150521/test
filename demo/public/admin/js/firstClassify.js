$(function () {
    window.page = 1
    //初始化页面
    let render = function () {
        getData(function (data) {
            console.log(data)
            $('tbody').html(template('temp', data))
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
        })
    }
    render()
    //表单验证
    $('form').bootstrapValidator({
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //通过name指定需要校验的元素
            firstClassify: {
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    },
                    //正则表达式
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]+$/,
                        message: '一级分类名称只能包含汉字'
                    }
                }
            }
        }
    })//触发submit按钮  添加一级分类
        .on('success.form.bv', function (e) {
            e.preventDefault()
            let val = $('.form-control').val()
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: {
                    categoryName: val
                },
                success: function (res) {
                    if (res.success) {
                        $('#addModal').modal('hide')
                        window.page = 1
                        render()
                    }
                }
            })
        })
    //模态框关闭后重置表单
    $('#addModal').on('hide.bs.modal', function () {
        $('.form-control').val('')
        $('form').data('bootstrapValidator').resetForm()
    })
})

//获取一级分类数据
let getData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: window.page,
            pageSize: 3,
        },
        success: function (data) {
            callback && callback(data)
        }
    })
}