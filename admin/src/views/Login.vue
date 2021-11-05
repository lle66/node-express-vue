<!--
 * @Author: zhoule
 * @Date: 2021-11-02 23:26:04
 * @Description: file content
-->
<template>
  <div class="container">
    <!-- <h1>Login</h1> -->
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码">
           <el-input type="password" v-model="model.password" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label-width="45%">
           <el-button native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      model:{}
    }
  },
  methods: {
    async login(){
      const res =await this.$http.post(`http://${window.location.host}/admin/api/login`,this.model)
      localStorage.token=res.data.token //在浏览器关闭后还能访问到 sessionStorage 关闭后无了
      this.$router.push('/')
      this.$message.success('登录成功')
    },
  },
}
</script>
<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card{
  width: 40vw;
}
</style>

