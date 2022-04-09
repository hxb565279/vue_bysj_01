<template>
  <el-table :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
    <el-table-column
      prop="baseId"
      label="id">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column> <el-table-column
    prop="id"
    label="身份证"
    width="180">
  </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="180">
    </el-table-column>

    <el-table-column
      prop="elephone"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="hospital"
      label="医院">
    </el-table-column>


    <el-table-column
      prop="onsetDate"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="symptoms"
      label="核酸">
    </el-table-column>


  </el-table>
</template>

<script>const axios = require('axios')
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


  name: "MessageManager",
  data() {
    return {
      tableData: [{
        id: '2016-05-02',
        area: '王小虎',
        nowConfirm: '上海市普陀区金沙江路 1518 弄',
        confirm: "",
        heal: "",
        dead: ""
      }]
    }
  },


  created() {
    const _this = this;
    console.log(1212)
    axios.get('http://localhost:85/patient/patientfindall').then(function (resp) {
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
