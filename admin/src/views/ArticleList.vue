<!--
 * @Author: zhoule
 * @Date: 2021-11-02 12:47:39
 * @Description: 列表
-->
<template>
  <div>
   <h1>文章列表</h1> 
   <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <el-table-column prop="cats.name" label="分类" width="220"></el-table-column>
        <el-table-column prop="title" label="标题" width="120"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small" @click="$router.push(`/article/edit/${scope.row._id}`)">编辑</el-button>
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
       const res =await this.$http.get('article')
       this.items= res.data
     },
     async remove(row){
       this.$confirm(`是否确定删除文章?${row.title}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`article/${row._id}`)
          console.info('dele',res)
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
