$(function () {
    window.page = 1
    //初始化页面
    let render = function () {
        getSecondData(function (data) {
            // console.log(data)
            $('tbody').html(template('temp', data))
            getPage(data)
        })
    }
    //获取分页内容
    let getPage = function (data) {
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
    //初始化下拉列表内容
    getFirstData(function (data) {
        console.log(data)
        $('.dropdown-menu').html(template('first', data)).find('a').click(function () {
            let str = $(this).html()
            $('.sp_text').html(str)
            $('.categoryId').val($(this).data('id'))
            //更新表单校验状态
            $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
        })
    })
    //初始化上传插件
    $('#fileupload').fileupload({
        //上传地址
        url: '/category/addSecondCategoryPic',
        //返回格式
        dataType: 'json',
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data)
            $('.imgUrl').attr('src', data.result.picAddr)
            $('.brandLogo').val(data.result.picAddr)
            //更新表单校验状态
            $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    })
    //表单验证
    $('form').bootstrapValidator({
        //重置校验
        excluded: [],
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //通过name指定需要校验的元素
            brandName: {
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            },
            categoryId: {
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '二级分类名称不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            }
        }
    })//触发submit按钮  添加一级分类
        .on('success.form.bv', function (e) {
            e.preventDefault()
            let data = $('form').serialize()
            data = decodeURI(data)
            $.ajax({
                url: '/category/addSecondCategory',
                type: 'post',
                data: data,
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
        $('.categoryId').val('')
        $('.form-control').val('')
        $('.brandLogo').val('')
        $('form').data('bootstrapValidator').resetForm()
    })
})

//获取二级分类数据
let getSecondData = function (callback) {
    $.ajax({
        url: '/category/querySecondCategoryPaging',
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
//获取一级分类数据
let getFirstData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100,
        },
        success: function (data) {
            callback && callback(data)
        }
    })
}