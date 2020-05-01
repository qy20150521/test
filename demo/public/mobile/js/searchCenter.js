$(function () {
    let list = localStorage.getItem('keyword') || '[]'
    let listArr = JSON.parse(list)
    initRecord()
    //搜索添加记录
    $('.btn').on('tap', function () {
        let val = $('.search').val()
        if (val.trim() == '') return mui.toast('请输入关键字')
        location.href = 'searchList.html?key=' + val
        //判断数组里有没有这个值，若有删掉，再添加到开头
        $(listArr).each(function (i, v) {
            if (val == v) {
                listArr.splice(i, 1)
            }
        })
        listArr.unshift(val)
        localStorage.setItem('keyword', JSON.stringify(listArr))
        //如果数据超过10条，删掉最后一条
        if (listArr.length > 10) {
            listArr.pop()
        }
        initRecord()
        $('.search').val('')
    })
    //清除单个记录
    $('.record_list').on('tap', '.close', function () {
        let i = $(this).parent().index()
        listArr.splice(i, 1)
        localStorage.setItem('keyword', JSON.stringify(listArr))
        initRecord()
    })
    //清除所有记录
    $('.clear').on('tap', function () {
        localStorage.setItem('keyword', '[]')
        initRecord()
    })

    //创建记录
    function initRecord() {
        let str = template('temp', {obj: listArr})
        $('.record_list').html(str)
    }
})

