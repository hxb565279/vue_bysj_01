<template>
  <div id="dd" class="accordion-body1">
    <div class="row" style="height: 145px">
      <div class="showTime   col-md-4" style=" padding-left: 60px"></div>
      <div class="col-md-8" style="float: left">
        <table class="table table-hover"
               style="border: 0px solid #ffffff; border-collapse: collapse;  padding-right: 120px;border-radius: 10px ;size: 15px; ">
          <thead>
          <tr>
            <td><p class="number" style="color: rgb(83,141,225)" th:text="现有确诊">现有确诊</p></td>
            <td><p class="number" style="color: rgba(238,26,26,0.3)" th:text="累计确诊">累计确诊</p></td>
            <td><p class="number" style="color: rgba(129,10,10,0.3)" th:text="治愈">治愈</p></td>
            <td><p class="number" style="color: rgba(238,26,26,0.3)" th:text="死亡">死亡</p></td>
          </tr>
          </thead>
          <tbody>
          <tr th:each="DataBean:${data_total}">
            <td class="number" style="color: rgba(238,26,26,0.3)" th:text="${DataBean['nowConfirm']}">nowConfirm</td>
            <td class="number" style="color: #d25040" th:text="${DataBean['confirm']}">confirm</td>
            <td class="number" style="color: #065be3" th:text="${DataBean['heal']}">heal</td>
            <td class="number" style="color: #9f191f" th:text="${DataBean['dead']}">dead</td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div class="row " style="border: 0px solid #000000;margin: 0 auto;">
      <div class="col-12 col-sm-12 " style="height: 400px" id="graph1"></div>
      <div class="col-12 col-sm-12 " style="height: 400px" id="graph2"></div>
      <div class="col-6 col-sm-6 " style="height: 400px" id="graph3"></div>
      <div class="col-6 col-sm-6 " style="height: 400px" id="graph4"></div>
      <div class="col-12 col-sm-12 " style="height: 400px" id="graph5"></div>


    </div>

  </div>
</template>

<script type="text/javascript">
import axios from "axios";

export default {
  watch: {
    data_map(val) {

      this.$nextTick(() => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('graph1'));
        var datastr = JSON.stringify(this.data_map)
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '疫情地图',
            subtext: '仅供参考',
            x: 'center'
          }, toolbox: {
            show: true,//是否显示工具箱开关
            feature: {
              dataView: {show: true, readOnly: false},//数据视图打开并允许编辑
              restore: {show: true},//重新加载视图
              saveAsImage: {show: true},//保存为图片
            },
          },
          tooltip: {
            show: true,
            trigger: "item",
            confine: true,
            formatter: '{a} <br/>{b} : {c} ',
            triggerOn: "mousemove|click",
            axisPointer: {
              type: "line"
            },
            "borderWidth": 0
          }, visualMap: { //左侧小导航图标
            show: true,
            x: 'left',
            y: 'bottom',
            textStyle: {
              fontSize: 15,
            },
            splitList: [
              {start: 1, end: 9},
              {start: 10, end: 99},
              {start: 100, end: 999},
              {start: 1000, end: 9999},
              {start: 10000, end: 99999},
              {start: 100000, end: 999999},
              {start: 1000000, end: 9999999},
              {start: 10000000}],

            color: ['#2F0000', '#4D0000', '#600000', '#750000', '#930000', '#AE0000', '#CE0000', '#FF9797']
          },// 去除各个国家上的小红点
          showLegendSymbol: false,
          itemStyle: {		//图形样式
            normal: {
              borderWidth: .3,//区域边框宽度
              borderColor: '#009fe8',//区域边框颜色
              areaColor: '#ffefd5',       //区域颜色
            },
            emphasis: {      //鼠标滑过地图高亮的相关设置
              borderWidth: .5,
              borderColor: '#4b0082',
              areaColor: '#fff',
            }
          },
          series: [
            {
              name: '现存确诊',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  position: 'center',
                  show: true,
                  textStyle: {
                    color: 'rgb(199,127,127)'
                  }
                },
                emphasis: {
                  show: true
                }
              },
              data: JSON.parse(datastr)
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })
    },
    echarts21() {
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('graph2'));

        var dateStr = JSON.stringify(this.echarts21[0]);
        var nowConfirmStr = JSON.stringify(this.echarts21[1]);
        var ConfirmStr = JSON.stringify(this.echarts21[2]);
        var deadStr = JSON.stringify(this.echarts21[3]);
        var healStr = JSON.stringify(this.echarts21[4]);
        // 指定图表的配置项和数据
        var option = {
          title: {  // 标题组件
            text: '全国现有趋势'
          },
          tooltip: {  // 提示框组件
            trigger: 'axis',


            triggerOn: "mousemove|click"
          },
          legend: {  // 曲线含义说明
            data: ['现有确诊', '累计确诊', '累计死亡', '累计治愈']
          }, toolbox: {
            show: true,//是否显示工具箱开关
            feature: {
              dataView: {show: true, readOnly: false},//数据视图打开并允许编辑
              restore: {show: true},//重新加载视图
              saveAsImage: {show: true},//保存为图片
            },
          },
          xAxis: {
            data: JSON.parse(dateStr)
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '现有确诊',
            data: JSON.parse(nowConfirmStr),
            type: 'line'
          }, {
            name: '累计确诊',
            data: JSON.parse(ConfirmStr),
            type: 'line'
          }, {
            name: '累计死亡',
            data: JSON.parse(deadStr),
            type: 'line'
          }, {
            name: '累计治愈',
            data: JSON.parse(healStr),
            type: 'line'
          }

          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.resize();


      })
    },
    echarts31() {
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('graph3'));

        var addDateStr = JSON.stringify(this.echarts31[0]);
        var addConfirmStr = JSON.stringify(this.echarts31[1]);
        var addSuspectStr = JSON.stringify(this.echarts31[2]);
        var addHealStr = JSON.stringify(this.echarts31[3]);
        var addDeadStr = JSON.stringify(this.echarts31[4]);
        var option = {
          title: {  // 标题组件
            text: '全国疫情新增趋势'
          },
          tooltip: {  // 提示框组件
            trigger: 'axis',
            triggerOn: 'mousemove|click'


          },
          legend: {  // 曲线含义说明
            data: ['新增确诊', '新增疑似', '新增治愈', '新增死亡']
          },
          xAxis: {

            data: JSON.parse(addDateStr)
          },
          yAxis: {
            type: 'value'
          }, toolbox: {
            show: true,//是否显示工具箱开关
            feature: {
              dataView: {show: true, readOnly: false},//数据视图打开并允许编辑
              restore: {show: true},//重新加载视图
              saveAsImage: {show: true},//保存为图片
            },
          },
          series: [{
            name: '新增确诊',
            data: JSON.parse(addConfirmStr),
            type: 'line'
          }, {
            name: '新增疑似',
            data: JSON.parse(addSuspectStr),
            type: 'line'
          }, {
            name: '新增治愈',
            data: JSON.parse(addHealStr),
            type: 'line'
          }, {
            name: '新增死亡',
            data: JSON.parse(addDeadStr),
            type: 'line'
          }

          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.resize()
      })
    },
    echarts41() {
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('graph4'));

        var str = JSON.stringify(this.echarts41);
        // 指定图表的配置项和数据
        var option = {
          title: {  // 标题组件
            text: '全国现有确诊构成',
            left: 'center'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          }, toolbox: {
            show: true,//是否显示工具箱开关
            feature: {
              dataView: {show: true, readOnly: false},//数据视图打开并允许编辑
              restore: {show: true},//重新加载视图
              saveAsImage: {show: true},//保存为图片
            },
          },
          tooltip: {  // 提示框组件
            trigger: 'axis',
            triggerOn: 'mousemove|click',
            formatter: '{a} <br/>{b} : {c} '
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: JSON.parse(str)
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.resize()
      })
    },
    echarts51() {
      this.$nextTick(() => {
          var str = this.echarts51;
          var count = 0;
          var countryName = [];
          var countryConfirm = [];
          var countryDead = [];
          for (var country of str) {
            if (count == 16) {
              break;
            } else {
              countryName[count] = country.area
              countryConfirm[count] = country.confirm
              countryDead[count] = country.dead
              count++
            }
          }
          getNightingaleRose(countryName, countryConfirm, countryDead);

          function getNightingaleRose(countryName, countryConfirm, countryDead) {  //南丁格尔玫瑰图
            var myChart = echarts.init(document.getElementById('graph5'), 'white');
            var legenddata = [
                // {name: countryName[0], Confirmed: countryConfirm[0], Dead: countryDead[0]},
                {name: countryName[1], Confirmed: countryConfirm[1], Dead: countryDead[1]},
                {name: countryName[2], Confirmed: countryConfirm[2], Dead: countryDead[2]},
                {name: countryName[3], Confirmed: countryConfirm[3], Dead: countryDead[3]},
                {name: countryName[4], Confirmed: countryConfirm[4], Dead: countryDead[4]},
                {name: countryName[5], Confirmed: countryConfirm[5], Dead: countryDead[5]},
                {name: countryName[6], Confirmed: countryConfirm[6], Dead: countryDead[6]},
                {name: countryName[7], Confirmed: countryConfirm[7], Dead: countryDead[7]},
                {name: countryName[8], Confirmed: countryConfirm[8], Dead: countryDead[8]},
                {name: countryName[9], Confirmed: countryConfirm[9], Dead: countryDead[9]},
                {name: countryName[10], Confirmed: countryConfirm[10], Dead: countryDead[10]},
                {name: countryName[11], Confirmed: countryConfirm[11], Dead: countryDead[11]},
                {name: countryName[12], Confirmed: countryConfirm[12], Dead: countryDead[12]},
                {name: countryName[13], Confirmed: countryConfirm[13], Dead: countryDead[13]},
                {name: countryName[14], Confirmed: countryConfirm[14], Dead: countryDead[14]},
                {name: countryName[15], Confirmed: countryConfirm[15], Dead: countryDead[15]},
                {name: countryName[16], Confirmed: countryConfirm[16], Dead: countryDead[16]},

              ],

              option = {
                dataset: {
                  source: [

                    ['Country', 'Confirmed', 'SQRT', 'Dead'],
                    // [countryName[0], countryConfirm[0], Math.sqrt(countryConfirm[0]), countryDead[0]],
                    [countryName[1], countryConfirm[1], Math.sqrt(countryConfirm[1]), countryDead[1]],
                    [countryName[2], countryConfirm[2], Math.sqrt(countryConfirm[2]), countryDead[2]],
                    [countryName[3], countryConfirm[3], Math.sqrt(countryConfirm[3]), countryDead[3]],
                    [countryName[4], countryConfirm[4], Math.sqrt(countryConfirm[4]), countryDead[4]],
                    [countryName[5], countryConfirm[5], Math.sqrt(countryConfirm[5]), countryDead[5]],
                    [countryName[6], countryConfirm[6], Math.sqrt(countryConfirm[6]), countryDead[6]],
                    [countryName[7], countryConfirm[7], Math.sqrt(countryConfirm[7]), countryDead[7]],
                    [countryName[8], countryConfirm[8], Math.sqrt(countryConfirm[8]), countryDead[8]],
                    [countryName[9], countryConfirm[9], Math.sqrt(countryConfirm[9]), countryDead[9]],
                    [countryName[10], countryConfirm[10], Math.sqrt(countryConfirm[10]), countryDead[10]],
                    [countryName[11], countryConfirm[11], Math.sqrt(countryConfirm[11]), countryDead[11]],
                    [countryName[12], countryConfirm[12], Math.sqrt(countryConfirm[12]), countryDead[12]],
                    [countryName[13], countryConfirm[13], Math.sqrt(countryConfirm[13]), countryDead[13]],
                    [countryName[14], countryConfirm[14], Math.sqrt(countryConfirm[14]), countryDead[14]],
                    [countryName[15], countryConfirm[15], Math.sqrt(countryConfirm[15]), countryDead[15]],
                    [countryName[16], countryConfirm[16], Math.sqrt(countryConfirm[16]), countryDead[16]],

                  ]
                },
                tooltip: {

                  trigger: 'item',

                  //提示框的数据样式显示

                  formatter: "     {c}   , (占比：{d}%)"
                },

                toolbox: {
                  show: true,
                  feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                      show: true,
                      type: ['pie', 'funnel']
                    },
                    saveAsImage: {show: true}
                  }
                },
                title: {
                  text: '国内疫情TOP',
                  x: '50%',
                  y: '50',
                  textStyle: {
                    fontSize: 27,
                    fontWeight: 'bold',
                    fontFamily: 'Microsoft YaHei',
                    color: '#000'
                  },
                  subtextStyle:
                    {
                      fontStyle: 'italic',
                      fontSize: 14
                    }
                },
                legend: {
                  x: 'right',//水平位置，【left\center\right\数字】
                  y: '150',//垂直位置，【top\center\bottom\数字】
                  align: 'left',//字在图例的左边或右边【left/right】
                  orient: 'vertical',//图例方向【horizontal/vertical】
                  icon: "circle",   //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
                  textStyle://图例文字
                    {
                      fontFamily: '微软雅黑',
                      color: '#000',

                    },
                  data: countryName,
                  formatter: function (params) {
                    for (var i = 0; i < legenddata.length; i++) {
                      if (legenddata[i].name == params) {
                        return params + "\t累计确诊:" + legenddata[i].Confirmed + "\t累计死亡:" + legenddata[i].Dead;
                      }
                    }
                  }

                },

                calculable: true,
                series: [
                  {
                    name: '半径模式',
                    type: 'pie',
                    clockWise: false,
                    radius: [50, 300],
                    center: ['25%', '65%'],
                    roseType: 'area',
                    encode: {
                      itemName: 'Country',
                      value: 'SQRT'
                    },
                    itemStyle: {
                      normal: {
                        color: function (params) {
                          var colorList = [
                            "#a71a4f", "#bc1540", "#c71b1b", "#d93824", "#ce4018", "#d15122", "#e7741b", "#e58b3d", "#e59524", "#dc9e31", "#da9c2d",
                            "#d2b130", "#bbd337", "#8cc13f", "#67b52d", "#53b440", "#48af54", "#479c7f", "#48a698", "#57868c"
                          ];
                          return colorList[params.dataIndex]
                        },
                        label: {
                          position: 'inside',
                          textStyle:
                            {
                              fontWeight: 'bold',
                              fontFamily: 'Microsoft YaHei',
                              color: '#FAFAFA',
                              fontSize: 10
                            },
                          formatter: function (params) {  //console.log('参数列表',params)

                            return params.data[0] + '\n' + params.data[1] + "例" + '\n' + "死亡" + params.data[3] + "例";

                          },
                        },
                      },
                    },

                  },
                  {
                    name: '透明圆圈',
                    type: 'pie',
                    radius: [10, 27],
                    center: ['25%', '65%'],
                    itemStyle: {
                      color: 'rgba(238,26,26,0.3)',
                    },
                    data: [
                      {value: 10, name: ''}
                    ]
                  },
                  // {
                  //   name: '透明圆圈',
                  //   type: 'pie',
                  //   radius: [10, 35],
                  //   center: ['35%', '65%'],
                  //   itemStyle: {
                  //     color: 'rgba(250, 250, 250, 0.3)',
                  //   },
                  //   data: [
                  //     {value: 10, name: ''}
                  //   ]
                  // }
                ]
              };
            myChart.setOption(option);
          }
        }
      )
    }

    ,

  },

  mounted() {

  }
  ,
  methods: {}
  ,

  created() {
    const _this = this;
    axios.get('http://localhost:85/data/gnyqmap').then(function (resp) {
      // console.log(resp)
      _this.data_map = resp.data

    });
    axios.get('http://localhost:85/data/gnyqtotal').then(function (resp) {
      console.log(resp)
      _this.data_total = resp.data

    });
    axios.get('http://localhost:85/data/gnyq2').then(function (resp) {
      _this.echarts21 = resp.data;
    });
    axios.get('http://localhost:85/data/gnyq3').then(function (resp) {
      _this.echarts31 = resp.data;
    });
    axios.get('http://localhost:85/data/gnyq4').then(function (resp) {
      _this.echarts41 = resp.data;
    });
    axios.get('http://localhost:85/data/gnyq5').then(function (resp) {
      _this.echarts51 = resp.data;
    });

  }
  ,
  data() {
    return {
      data_map: {},
      echarts21: {},
      echarts31: {},
      echarts41: {},
      echarts51: {},
      data_total: {}

    }
  }


}

</script>

<style scoped>


.accordion-body1 {
  background-color: #eeeeee;

}

#dd {

}
</style>
