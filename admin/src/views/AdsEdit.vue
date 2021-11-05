<!--
import { constants } from 'http2';
 * @Author: zhoule
 * @Date: 2021-11-02 11:18:09
 * @Description: file content
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <!-- 提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})"
          ><i class="el-icon-plus">添加图片</i>
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, index) in model.items" :key="index" style="margin-top:1rem">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="图标" style="margin-top:0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.uploadURL"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label-width="120px">
              <el-button type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: { items: [] },
    }
  },
  methods: {
    async save() {
      // let res
      if (this.id) {
        await this.$http.put(`ads/${this.id}`, this.model)
      } else {
        await this.$http.post('ads', this.model)
      }
      this.$router.push('/ads/list')
      this.$message.success('保存成功')
    },
    // 通过id查询
    async fetch() {
      const res = await this.$http.get(`ads/${this.id}`, this.model)
      this.model = Object.assign({}, this.model, res.data)
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>
