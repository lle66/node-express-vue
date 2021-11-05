<!--
import { constants } from 'http2';
 * @Author: zhoule
 * @Date: 2021-11-02 11:18:09
 * @Description: file content
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <!-- 提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="(item,index) in parents" :key="index" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents:[],//父级数组
    }
  },
  methods: {
    async save() {
      // let res
      if (this.id) {
        await this.$http.put(`cat/${this.id}`, this.model)
      } else {
        await this.$http.post('cat', this.model)
      }
      this.$router.push('/cat/list')
      this.$message.success('保存成功')
    },
    // 通过id查询
    async fetch() {
      const res = await this.$http.get(`cat/${this.id}`, this.model)
      this.model = res.data
    },
    async fetchParents() {
      const res = await this.$http.get(`cat`)
      this.parents = res.data
    },
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  },
}
</script>
