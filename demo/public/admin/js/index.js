$(function () {
    initHistogram()
    initPieChart()
})

function initHistogram() {
    //准备数据
    let data = [
        {
            name: '一月',
            value: '200'
        },
        {
            name: '二月',
            value: '400'
        },
        {
            name: '三月',
            value: '300'
        },
        {
            name: '四月',
            value: '500'
        },
        {
            name: '五月',
            value: '600'
        }
    ]
    let xAxisData = [], seriesData = []
    data.forEach(function (v, i) {
        xAxisData.push(v.name)
        seriesData.push(v.value)
    })
    // 基于准备好的dom，初始化echarts实例
    let myHistogram = echarts.init(document.getElementById('histogram'))
    // 指定图表的配置项和数据
    let option = {
        //表格标题
        title: {
            text: '2020年注册人数'
        },
        //悬浮上去所显示的信息
        tooltip: {},
        //配置状态图的说明
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: xAxisData
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: seriesData
        }]
    }

    // 使用刚指定的配置项和数据显示图表
    myHistogram.setOption(option)
}

function initPieChart() {
    let myPieChart = echarts.init(document.getElementById('pieChart'))
    option = {
        title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            // a  : name名
            // b  : data中的name
            // c  : data中的value
            // d  : 占比
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    myPieChart.setOption(option)
}