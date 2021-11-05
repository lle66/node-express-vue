
<!--
 * @Author: zhoule
 * @Date: 2021-11-02 11:18:09
 * @Description: file content
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <!-- 提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.cats">
          <el-option v-for="(item,index) in cats" :key="index" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" 
        useCustomImageHandler
        @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {VueEditor} from 'vue2-editor'
export default {
  props: {
    id: {},
  },
  components:{
    VueEditor
  },
  data() {
    return {
      model: {},
      cats:[],
    }
  },
  methods: {
    // 富文本图片自定义处理
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post(this.$http.defaults.uploadURL,formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
     // 获取英雄分类列表数据
    async fetchCats() {
      const res = await this.$http.get('cat')
      this.cats = res.data
    },
    async save() {
      // let res
      if (this.id) {
        await this.$http.put(`article/${this.id}`, this.model)
      } else {
        await this.$http.post('article', this.model)
      }
      this.$router.push('/article/list')
      this.$message.success('保存成功')
    },
    // 通过id查询
    async fetch() {
      const res = await this.$http.get(`article/${this.id}`, this.model)
      this.model = res.data
    },
  },
  created() {
    
    this.fetchCats()
    this.id && this.fetch()
  },
}
</script>
