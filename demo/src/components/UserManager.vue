<template>
<div>
  <p style="color: #7daadc">  用户数据</p>

  <el-table :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>

</template>

<script>
const axios = require('axios');
export default {

  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    deleteUser(row){
      const _this = this
      axios.delete('http://localhost:8888/user/deleteById/'+row.id).then(function(resp){
        _this.$alert('《'+row.name+'》删除成功！', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    edit(row) {
      this.$router.push({
        path: '/userUpdate',
        query:{
          id:row.id
        }
      })
    },
  },
  data() {
    return {
      tableData: [{
        id: '2016-05-02',
        username: '王小虎',
        password: '上海市普陀区金沙江路 1518 弄',
      }, {
        id: '2016-05-04',
        username: '王小虎',
        password: '上海市普陀区金沙江路 1518 弄'
      }]
    }

    },
  created() {
    const  _this =this
    axios.get('http://localhost:85/user/findall').then(function (resp) {
      console.log(resp)
      _this.tableData=resp.data


    })
  }

}



</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
