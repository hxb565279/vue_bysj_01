<template>
  <div id="dd" class="accordion-body" onload="this">
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
          <!--          <tr th:each="DataBean:${data}">-->
          <!--            <td  class="number"  style="color: rgba(238,26,26,0.3)" th:text="${DataBean['nowConfirm']}">nowConfirm</td>-->
          <!--            <td  class="number"  style="color: #d25040" th:text="${DataBean['confirm']}">confirm</td>-->
          <!--            <td class="number"   style="color: #065be3" th:text="${DataBean['heal']}">heal</td>-->
          <!--            <td  class="number"   style="color: #9f191f"    th:text="${DataBean['dead']}">dead</td>-->
          <!--          </tr>-->
          </tbody>
        </table>

      </div>
    </div>
    <div class="row " style="border: 0px solid #000000;margin: 0 auto;">
      <div class="col-12 col-sm-12 " style="height: 500px" id="graph1"></div>
      <div class="col-12 col-sm-12 " style="height: 500px" id="graph2"></div>
      <div class="col-12 col-sm-12 " style="height: 500px" id="graph3"></div>
      <div class="col-12 col-sm-12 " style="height: 500px" id="graph4"></div>
      <div class="col-12 col-sm-12" style="height: 400px" id="graph5"></div>


    </div>

  </div>
</template>

<script type="text/javascript">
import axios from "axios";

export default {
  methods: {},
  created() {
    const _this = this;
    axios.get('http://localhost:85/data/gyyqmap').then(function (resp) {
      _this.data_map = resp.data;

    });
    axios.get('http://localhost:85/data/gyyq2').then(function (resp) {
      _this.echarts21 = resp.data;
    });
    axios.get('http://localhost:85/data/gyyq3').then(function (resp) {
      _this.echarts31 = resp.data;
    });
    axios.get('').then(function (resp) {
      _this.echarts41 = resp.data;
    });

  },
  mounted() {
  },
  watch: {
    data_map() {
      this.$nextTick(() => {
        var chinaConfirm = this.data_map[1][0].confirm;
        console.log(chinaConfirm)

        var myChart = echarts.init(
          document.getElementById('graph1'), 'white', {renderer: 'canvas'});

        let nameComparison = {
          'Canada': '加拿大',
          'Russia': '俄罗斯',
          'China': '中国',
          'United States': '美国',
          'Singapore Rep.': '新加坡',
          'Dominican Rep.': '多米尼加',
          'Palestine': '巴勒斯坦',
          'Bahamas': '巴哈马',
          'Timor-Leste': '东帝汶',
          'Afghanistan': '阿富汗',
          'Guinea-Bissau': '几内亚比绍',
          "Côted'Ivoire": '科特迪瓦',
          'Siachen Glacier': '锡亚琴冰川',
          "Br. Indian Ocean Ter.": '英属印度洋领土',
          'Angola': '安哥拉',
          'Albania': '阿尔巴尼亚',
          'United Arab Emirates': '阿联酋',
          'Argentina': '阿根廷',
          'Armenia': '亚美尼亚',
          'French Southern and Antarctic Lands': '法属南半球和南极领地',
          'Australia': '澳大利亚',
          'Austria': '奥地利',
          'Azerbaijan': '阿塞拜疆',
          'Burundi': '布隆迪',
          'Belgium': '比利时',
          'Benin': '贝宁',
          'Burkina Faso': '布基纳法索',
          'Bangladesh': '孟加拉',
          'Bulgaria': '保加利亚',
          'The Bahamas': '巴哈马',
          'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
          'Belarus': '白俄罗斯',
          'Belize': '伯利兹',
          'Bermuda': '百慕大',
          'Bolivia': '玻利维亚',
          'Brazil': '巴西',
          'Brunei': '文莱',
          'Bhutan': '不丹',
          'Botswana': '博茨瓦纳',
          'Central African Rep.': '中非共和国',
          'Switzerland': '瑞士',
          'Chile': '智利',
          'Ivory Coast': '象牙海岸',
          'Cameroon': '喀麦隆',
          'Dem. Rep. Congo': '刚果（金）',
          'Congo': '刚果（布）',
          'Colombia': '哥伦比亚',
          'Costa Rica': '哥斯达黎加',
          'Cuba': '古巴',
          'N. Cyprus': '北塞浦路斯',
          'Cyprus': '塞浦路斯',
          'Czech Rep.': '捷克',
          'Germany': '德国',
          'Djibouti': '吉布提',
          'Denmark': '丹麦',
          'Algeria': '阿尔及利亚',
          'Ecuador': '厄瓜多尔',
          'Egypt': '埃及',
          'Eritrea': '厄立特里亚',
          'Spain': '西班牙',
          'Estonia': '爱沙尼亚',
          'Ethiopia': '埃塞俄比亚',
          'Finland': '芬兰',
          'Fiji': '斐济',
          'Falkland Islands': '福克兰群岛',
          'France': '法国',
          'Gabon': '加蓬',
          'United Kingdom': '英国',
          'Georgia': '格鲁吉亚',
          'Ghana': '加纳',
          'Guinea': '几内亚',
          'Gambia': '冈比亚',
          'Guinea Bissau': '几内亚比绍',
          'Eq. Guinea': '赤道几内亚',
          'Greece': '希腊',
          'Greenland': '格林纳达',
          'Guatemala': '危地马拉',
          'French Guiana': '法属圭亚那',
          'Guyana': '圭亚那',
          'Honduras': '洪都拉斯',
          'Croatia': '克罗地亚',
          'Haiti': '海地',
          'Hungary': '匈牙利',
          'Indonesia': '印度尼西亚',
          'India': '印度',
          'Ireland': '爱尔兰',
          'Iran': '伊朗',
          'Iraq': '伊拉克',
          'Iceland': '冰岛',
          'Israel': '以色列',
          'Italy': '意大利',
          'Jamaica': '牙买加',
          'Jordan': '约旦',
          'Japan': '日本本土',
          'Kazakhstan': '哈萨克斯坦',
          'Kenya': '肯尼亚',
          'Kyrgyzstan': '吉尔吉斯斯坦',
          'Cambodia': '柬埔寨',
          'Korea': '韩国',
          'Kosovo': '科索沃',
          'Kuwait': '科威特',
          'Lao PDR': '老挝',
          'Lebanon': '黎巴嫩',
          'Liberia': '利比里亚',
          'Libya': '利比亚',
          'Sri Lanka': '斯里兰卡',
          'Lesotho': '莱索托',
          'Lithuania': '立陶宛',
          'Luxembourg': '卢森堡',
          'Latvia': '拉脱维亚',
          'Morocco': '摩洛哥',
          'Moldova': '摩尔多瓦',
          'Madagascar': '马达加斯加',
          'Mexico': '墨西哥',
          'Macedonia': '马其顿',
          'Mali': '马里',
          'Myanmar': '缅甸',
          'Montenegro': '黑山',
          'Mongolia': '蒙古',
          'Mozambique': '莫桑比克',
          'Mauritania': '毛里塔尼亚',
          'Malawi': '马拉维',
          'Malaysia': '马来西亚',
          'Namibia': '纳米比亚',
          'New Caledonia': '新喀里多尼亚',
          'Niger': '尼日尔',
          'Nigeria': '尼日利亚',
          'Nicaragua': '尼加拉瓜',
          'Netherlands': '荷兰',
          'Norway': '挪威',
          'Nepal': '尼泊尔',
          'New Zealand': '新西兰',
          'Oman': '阿曼',
          'Pakistan': '巴基斯坦',
          'Panama': '巴拿马',
          'Peru': '秘鲁',
          'Philippines': '菲律宾',
          'Papua New Guinea': '巴布亚新几内亚',
          'Poland': '波兰',
          'Puerto Rico': '波多黎各',
          'Dem. Rep. Korea': '朝鲜',
          'Portugal': '葡萄牙',
          'Paraguay': '巴拉圭',
          'Qatar': '卡塔尔',
          'Romania': '罗马尼亚',
          'Rwanda': '卢旺达',
          'W. Sahara': '西撒哈拉',
          'Saudi Arabia': '沙特阿拉伯',
          'Sudan': '苏丹',
          'S. Sudan': '苏丹',
          'Senegal': '塞内加尔',
          'Solomon Is.': '所罗门群岛',
          'Sierra Leone': '塞拉利昂',
          'El Salvador': '萨尔瓦多',
          'Somaliland': '索马里兰',
          'Somalia': '索马里',
          'Serbia': '塞尔维亚',
          'Suriname': '苏里南',
          'Slovakia': '斯洛伐克',
          'Slovenia': '斯洛文尼亚',
          'Sweden': '瑞典',
          'Swaziland': '斯威士兰',
          'Syria': '叙利亚',
          'Chad': '乍得',
          'Togo': '多哥',
          'Thailand': '泰国',
          'Tajikistan': '塔吉克斯坦',
          'Turkmenistan': '土库曼斯坦',
          'East Timor': '东帝汶',
          'Trinidad and Tobago': '特里尼达和多巴哥',
          'Tunisia': '突尼斯',
          'Turkey': '土耳其',
          'Tanzania': '坦桑尼亚',
          'Uganda': '乌干达',
          'Ukraine': '乌克兰',
          'Uruguay': '乌拉圭',
          'Uzbekistan': '乌兹别克斯坦',
          'Venezuela': '委内瑞拉',
          'Vietnam': '越南',
          'Vanuatu': '瓦努阿图',
          'West Bank': '西岸',
          'Yemen': '也门',
          'South Africa': '南非',
          'Zambia': '赞比亚',
          'Zimbabwe': '津巴布韦',
          'Côte d\'\Ivoire': '科特迪瓦'
        };

        var option = {
          title: {
            text: '\n\n全球地区累计确诊分布',
            left: 'left',
            textStyle: {
              fontSize: 27,
              color: 'black'
            },
          }, toolbox: {
            show: true,//是否显示工具箱开关
            feature: {
              dataView: {show: true, readOnly: false},//数据视图打开并允许编辑
              restore: {show: true},//重新加载视图
              saveAsImage: {show: true},//保存为图片
            },
          },
          visualMap: { //左侧小导航图标
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

            color: ['rgba(238,26,26,0.3)', '#c77f7f', '#6a9be7', '#750000', '#930000', '#AE0000', '#CE0000', '#FF9797']
          },
          tooltip: {
            show: true,
            trigger: "item",
            formatter: '{a} <br/>{b} : {c} ',
            triggerOn: "mousemove|click",
            axisPointer: {
              type: "line"
            },
            textStyle: {
              "fontSize": 14
            },
            "borderWidth": 0
          },

          series: [{
            // 图标类型为 地图
            type: 'map',
            name: '累计确诊人数',
            nameMap: nameComparison,
            roam: true,
            label: {
              show: true,
              position: "top",
              margin: 8
            },
            mapType: 'world',
            "zoom": 1,
            // 去除各个国家上的小红点
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
            data: [{name: '中国', value: chinaConfirm}],
          }],
        };
        //世界个国家数据注入
        var countries = this.data_map[0];

        for (var country of countries) {
          option.series[0].data.push({
            name: country.area,
            value: country.nowConfirm
          })
        }


        myChart.setOption(option);
      })
    },
    echarts21() {
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('graph2'));
        const colors = ['#5470C6', '#91CC75', '#EE6666'];
        var nameStr = JSON.stringify(this.echarts21[0]);
        var fromAbroadStr = JSON.stringify(this.echarts21[1]);
        var deadstr = JSON.stringify(this.echarts21[2]);
        // 指定图表的配置项和数据
        var option = {
          title: {  // 标题组件
            text: '累计确诊死亡(排除美国)TOP',
            top: "10"
          },
          tooltip: {  // 提示框组件
            trigger: 'axis'
          },
          grid: {
            top: "25%",
            left: "20%",
            right: "10%",
            bottom: "15%"

          }, toolbox: {
            show: true,//是否显示工具箱开关
            feature: {
              dataView: {show: true, readOnly: false},//数据视图打开并允许编辑
              restore: {show: true},//重新加载视图
              saveAsImage: {show: true},//保存为图片
            },
          },
          legend: {
            data: ['累计确诊', '累计死亡']
          },
          xAxis: {
            // 转化为json对象
            data: JSON.parse(nameStr),
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: -30
            },
            interval: 0

          },
          yAxis: [{
            type: 'value',
            name: '累计确诊',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}人 '
            }
          },
            {
              type: 'value',
              name: '累计死亡',
              position: 'right',
              alignTicks: true,
              min: 0,
              max: 1000000,

              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} 人 '
              }
            }],
          series: [
            {
              name: '累计确诊',
              type: 'bar',
              barWidth: '30%',
              color: colors[0],
              yAxisIndex: 0,
              data: JSON.parse(fromAbroadStr)
            },
            {
              name: '累计死亡',
              type: 'bar',
              barWidth: '30%',
              color: colors[1],
              yAxisIndex: 1,
              data: JSON.parse(deadstr)
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })
    },
    echarts31() {
      this.$nextTick(() => {
          var str = this.echarts31[0];

          var count = 0;
          var countryName = [];
          var countryConfirm = [];
          var countryDead = [];
          for (var country of str) {
            if (count == 15) {
              break;
            } else {
              countryName[count] = country.area
              countryConfirm[count] = country.nowConfirm
              countryDead[count] = country.dead
              count++
            }
          }
          getNightingaleRose(countryName, countryConfirm, countryDead);

          function getNightingaleRose(countryName, countryConfirm, countryDead) {  //南丁格尔玫瑰图
            var myChart = echarts.init(document.getElementById('graph3'), 'white');
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
                {name: countryName[14], Confirmed: countryConfirm[14], Dead: countryDead[14]}


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
                    [countryName[14], countryConfirm[14], Math.sqrt(countryConfirm[14]), countryDead[14]]


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
                  text: '国外疫情前15玫瑰图',
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
                  x: '770',//水平位置，【left\center\right\数字】
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
                    center: ['40%', '65%'],
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
                    center: ['40%', '65%'],
                    itemStyle: {
                      color: 'rgba(238,26,26,0.3)',
                    },
                    data: [
                      {value: 10, name: ''}
                    ]
                  },
                  {
                    name: '透明圆圈',
                    type: 'pie',
                    radius: [10, 35],
                    center: ['40%', '65%'],
                    itemStyle: {
                      color: 'rgba(250, 250, 250, 0.3)',
                    },
                    data: [
                      {value: 10, name: ''}
                    ]
                  }
                ]

              };
            myChart.setOption(option);
          }
        }
      )
    },
    echarts41() {
      this.$nextTick(() => {
        var chartDom = document.getElementById('graph4');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: '2021年确诊人数'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['中国', '印度', '塞尔维亚', '美国']
          },
          grid: {},
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,

            data: ['一月', '2月', '3月', '4月', '5月', '6月', '7月']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              format: '{value (K)人}'
            },
          },
          series: [
            {
              name: '中国',
              type: 'line',
              stack: 'Total',
              data: [8.8301, 9.0422, 9.1082, 9.1955, 10.2203, 10.3484, 11.3088]
            },
            {
              name: '印度',
              type: 'line',
              stack: 'Total',
              data: [3.5365, 22.6670, 54.8318, 16.95988, 376.9523, 87.28795, 105.12093]
            },
            {
              name: '塞尔维亚',
              type: 'line',
              stack: 'Total',
              data: [0.150, 1.0011, 2.4528, 4.6412, 9.9886, 31.8273, 50.2622]
            },
            {
              name: '美国',
              type: 'line',
              stack: 'Total',
              data: [49.6335, 112.7733, 26.78202, 57.3557, 133.85555, 288.71556, 320.31455]
            }

          ]
        };

        option && myChart.setOption(option);
      })
    }
  },
  data() {
    return {
      data_map: {},
      echarts21: {},
      echarts31: {},
      echarts41: {}

    }
  }


}


</script>

<style scoped>
body {
  background-color: #e3e329;
}

.accordion-body {
  background-color: #eeeeee;
}
</style>
