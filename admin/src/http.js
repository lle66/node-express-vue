/*
 * @Author: zhoule
 * @Date: 2021-11-02 11:39:20
 * @Description: file content
 */
import axios from 'axios'
import Vue from "vue";
import router from './router'
const http=axios.create({
  baseURL:process.env.VUE_APP_API_URL||'/admin/api/rest', //以 VUE_APP开头
  uploadURL:process.env.VUE_APP_API_URL||'/admin/api/upload',
  // baseURL:'http://localhost:3000/admin/api/rest',
  // uploadURL:'http://localhost:3000/admin/api/upload',
})
// 拦截器
http.interceptors.request.use( (config)=> {
  localStorage.token&&(config.headers.Authorization='Bearer '+localStorage.token)
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use((res)=>{
return res
},(err)=>{
  // >= 400的状态码都会进入这里 err {name,response}
  Vue.prototype.$message?.error(err.response.data.msg)
  if(err.response.status===401){
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http