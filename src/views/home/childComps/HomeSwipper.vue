<template>
    <div>
        <swiper>
           <swiper-item v-for="(item,index) in banner" :key="index">
               <a :href="item.link">
                   <img :src="item.image" alt="" @load="imageLoad">
               </a>
           </swiper-item>
       </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name:'HomeSwipper',
    props:{
        banner:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            isLoad:false
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods:{
        imageLoad(){
            //只需要发出一次就行，因为加载好一张图片就能计算准确的高度了
            if(!this.isLoad){
                this.$emit('swiperImageLoad');
                this.isLoad = true;
            }
            
        }
    }
}
</script>

<style scoped>

</style>