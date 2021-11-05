<!--
 * @Author: zhoule
 * @Date: 2021-11-02 15:45:08
 * @Description: 物品
-->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <!-- 提交不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs :value="activeTab" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="英雄类型">
            <el-select v-model="model.cats" multiple>
              <el-option
                v-for="(item, index) in cats"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="(item, index) in items"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.defficult"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="model.scores.skills"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              v-model="model.scores.attack"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="model.scores.survive"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.uploadURL"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})"
            ><i class="el-icon-plus">添加技能</i></el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="$http.defaults.uploadURL"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips" placeholder=""></el-input>
              </el-form-item>
              <el-form-item >
                <el-button @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
      model: {
        name: '',
        avatar: '',
        cats: [],
        scores: {
          defficult: 0,
        },
        skills:[]
      },
      cats: [], //英雄类型列表
      items: [], // 出装列表
      activeTab: 'basic',
    }
  },
  methods: {
    async fetchItems() {
      const res = await this.$http.get('item')
      this.items = res.data
    },
    // 获取英雄分类列表数据
    async fetchCats() {
      const res = await this.$http.get('cat')
      this.cats = res.data
    },
    async save() {
      if (this.id) {
        await this.$http.put(`hero/${this.id}`, this.model)
      } else {
        await this.$http.post('hero', this.model)
      }
      this.$router.push('/hero/list')
      this.$message.success('保存成功')
    },
    // 通过id查询
    async fetch() {
      const res = await this.$http.get(`hero/${this.id}`, this.model)
      this.model = Object.assign({}, this.model, res.data)
    },
    handleAvatarSuccess(res) {
      this.model.avatar = res.url
    },
  },
  created() {
    this.fetchItems()
    this.fetchCats()
    this.id && this.fetch()
  },
}
</script>
<style>

</style>
