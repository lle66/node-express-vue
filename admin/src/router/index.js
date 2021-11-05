/*
 * @Author: zhoule
 * @Date: 2021-11-02 11:03:39
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/CatEdit.vue'
import CategoriesList from '../views/CatList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path:'/cat/create',
        component:CategoriesEdit
      },
      {
        path:'/cat/edit/:id',
        component:CategoriesEdit,
        props:true //表示把路径上到任何参数都注入到页面里面-->把_id-->传id
      },
      {
        path:'/cat/list',
        component:CategoriesList
      },
      ///////物品
      {
        path:'/item/create',
        component:ItemEdit
      },
      {
        path:'/item/edit/:id',
        component:ItemEdit,
        props:true 
      },
      {
        path:'/item/list',
        component:ItemList
      },
      // 英雄
      {
        path:'/hero/create',
        component:HeroEdit
      },
      {
        path:'/hero/edit/:id',
        component:HeroEdit,
        props:true 
      },
      {
        path:'/hero/list',
        component:HeroList
      },
      // 文章
      {
        path:'/article/create',
        component:ArticleEdit
      },
      {
        path:'/article/edit/:id',
        component:ArticleEdit,
        props:true 
      },
      {
        path:'/article/list',
        component:ArticleList
      },
      // 广告
      {
        path:'/ads/create',
        component:AdsEdit
      },
      {
        path:'/ads/edit/:id',
        component:AdsEdit,
        props:true 
      },
      {
        path:'/ads/list',
        component:AdsList
      },
      // 账号
      {
        path:'/adminUser/create',
        component:AdminUserEdit
      },
      {
        path:'/adminUser/edit/:id',
        component:AdminUserEdit,
        props:true 
      },
      {
        path:'/adminUser/list',
        component:AdminUserList
      }
    ]
  },
    {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{isPublic:true}
  },
]

const router = new VueRouter({
  routes
})

// next表示要不要进去 去那
router.beforeEach((to,from,next)=>{
  // 页面不公开👎token不存在
  console.info('to',to)
  if(!to.meta.isPublic&&!localStorage.token){
    return next('/login')
  }
  next()
})

export default router
