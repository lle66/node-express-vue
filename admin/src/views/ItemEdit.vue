<!--
 * @Author: zhoule
 * @Date: 2021-11-02 15:45:08
 * @Description: 物品
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <!-- 提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="(item,index) in parents" :key="index" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- upload使用的插件自带的请求处理 没用axios -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.uploadURL"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`item/${this.id}`, this.model)
      } else {
        await this.$http.post('item', this.model)
      }
      this.$router.push('/item/list')
      this.$message.success('保存成功')
    },
    // 通过id查询
    async fetch() {
      const res = await this.$http.get(`item/${this.id}`, this.model)
      this.model = res.data
    },
    handleAvatarSuccess(res){
      console.info('res',res)
      // 处理 数据响应式 问题
      this.$set(this.model,'icon')
      this.model.icon=res.url
    }
    
  },
  created() {
    this.id && this.fetch()
  },
}
</script>
<style>
</style>
