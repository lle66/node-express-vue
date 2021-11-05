<!--
 * @Author: zhoule
 * @Date: 2021-11-02 15:50:41
 * @Description: file content
-->
<template>
  <div>
   <h1>物品列表</h1> 
   <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <!-- <el-table-column prop="parent.name" label="上级" width="220"></el-table-column> -->
        <el-table-column prop="name" label="名称" width="120"></el-table-column>
        <el-table-column prop="icon" label="图标" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="width:60px">
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small" @click="$router.push(`/item/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
     items:[]
    }
  },
  methods: {
    // 获取列表数据
     async fetch(){
       const res =await this.$http.get('item')
       this.items= res.data
     },
     async remove(row){
       this.$confirm(`是否确定删除分类?${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`item/${row._id}`)
          if(res.data.code===200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 刷新列表
          this.fetch()
          }
          
        })
     }
  },
  created() {
    this.fetch()
  },
}
</script>
