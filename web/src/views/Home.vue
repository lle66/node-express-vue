<!--
 * @Author: zhoule
 * @Date: 2021-11-03 17:22:52
 * @Description: file content
-->
<template>
  <div class="home">
   <swiper ref="mySwiper" :options="swiperOptions" class="mySwiper">
     <!-- web/src/assets/images/1.png -->
    <swiper-slide class="w-100"><img class="w-100" src="../assets/images/1.png"></swiper-slide>
    <swiper-slide class="w-100"><img class="w-100" src="../assets/images/2.png"></swiper-slide>
    <swiper-slide class="w-100"><img class="w-100" src="../assets/images/3.png"></swiper-slide>
    <swiper-slide class="w-100"><img class="w-100" src="../assets/images/4.png"></swiper-slide>
    <div class="swiper-pagination pagination-home" slot="pagination"></div>
  </swiper>
  </div>
</template>


<script>

export default {
  name: 'Home',
  data(){
    return{
      swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        }
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  .mySwiper{
    img{
      height: 200px;
    }
  }
}
.pagination-home{
  text-align: right;
  padding-right: 10px;
  /deep/ .swiper-pagination-bullet{
    background: #fff;
  }
  &.swiper-pagination-bullet-active{
     background: #4b67f4;
  }
}
</style>

