<template>
  <div>
    <p>国内疫情如下</p>
    <p>
      <button type="button" onclick="">爬取</button>
    </p>
    <el-table :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="area"
        label="地区"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nowConfirm"
        label="现存确诊">
      </el-table-column>
      <el-table-column
        prop="confirm"
        label="累计确诊">
      </el-table-column>
      <el-table-column
        prop="heal"
        label="累计治愈">
      </el-table-column>
      <el-table-column
        prop="dead"
        label="死亡">
      </el-table-column>


    </el-table>
  </div>

</template>

<script>
const axios = require('axios')
export default {
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },


  name: "MessagePQ",
  data() {
    return {
      tableData: [{
        id: '',
        area: '',
        nowConfirm: '',
        confirm: "",
        heal: "",
        dead: ""
      }]
    }
  },


  created() {
    const _this = this;
    axios.get('http://localhost:85/data/findAllData').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  }
}
</script>

<style scoped>
body {
  background-color: #e3e329;
}
</style>
