<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="编号">
      <el-input v-model="ruleForm.id" readOnly></el-input>
    </el-form-item>

    <el-form-item label="用户" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '图书名称不能为空', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:85/user/update',this.ruleForm).then(function(resp){
            if(resp.data == 'success'){
              _this.$alert('《'+_this.ruleForm.username+'》修改成功！', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/userManager')
                }
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:85/user/findById/'+this.$route.query.id).then(function(resp){
      alert(_this.$route.query.id)
      _this.ruleForm = resp.data
    })
  }
}
</script>
