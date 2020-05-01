$(function () {
    /*
   * 表单校验插件 : bootstrapValidator.js
   * 1. 导入五个包
   * 2. 使用插件的结构条件 : form表单 --> class : form-group  --> input控件中有name名, class: form-control  , 在label标签中设置class名 : control-label
   * 3. 初始化当前的表单验证
   * */
    $('form').bootstrapValidator({
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //通过name指定需要校验的元素
            username: {
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度限制
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: '用户名长度必须在2到10位之间'
                    },
                    //正则表达式
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
                        message: '用户名只能包含英文字母和汉字'
                    },
                    //校验规则名 : 处理后台所响应回来的数据
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度限制
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    //正则表达式
                    regexp: {
                        regexp: /^\w+$/,
                        message: '密码只能包括字母、数字、下划线'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    })//触发submit按钮
        .on('success.form.bv', function (e) {
            e.preventDefault()
            let str = $('form').serialize()
            str = decodeURI(str)
            $.ajax({
                url: '/employee/employeeLogin',
                type: 'post',
                data: str,
                dataType: 'json',
                success: function (res) {
                    // console.log(res)
                    // 四种状态 : 未校验 NOT_VALIDATED  校验失败  INVALID  校验成功 VALID, 正在校验中 VALIDATING
                    //设置校验失败的状态  updateStatus('要设置的元素name名','修改什么状态', "要验证的校验规则名"), 基于bootstrapValidator组件来调用
                    //登录成功
                    if (res.success) {
                        location.href = '/admin/index.html'
                    } else if (res.error === 1000) {
                        //用户名不存在
                        $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                    } else if (res.error === 1001) {
                        //密码错误
                        $('form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                    }
                }
            })
        })
    //重置表单验证
    $('button[type="reset"]').click(function () {
        $('#login').data('bootstrapValidator').resetForm()
    })
})