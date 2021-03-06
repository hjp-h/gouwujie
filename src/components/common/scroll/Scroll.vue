<template>
   <div class="wrapper" ref="wrapper">
       <div class="content">
           <slot></slot>
       </div>
    </div> 
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad: {
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        //创建scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,//允许点击
            probeType:this.probeType, //允许监听,
            pullUpLoad:this.pullUpLoad //允许上拉加载更多
        });

        //监听滚动的位置
        if(this.probeType===2 || this.probeType===3) {
                this.scroll.on("scroll",(position) => {
                //console.log(position);
                this.$emit('scroll',position);
            });
        }
        
        //监听上拉加载更多
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() => {
                //console.log('监听到滚动到底部');
                this.$emit('pullingUp');
            });
        }
        //刷新可滚动的高度
        this.scroll.refresh();
    },
    methods:{
        scrollTo(x,y,time=500) {
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            //完成一次拉倒底部，才能进行下一次下拉加载更多
            this.scroll && this.scroll.finishPullUp();
        },
        refresh(){
            //console.log('----');
            this.scroll && this.scroll.refresh();
        },
        getScrollY() {
            return this.scroll?this.scroll.y:0;
        }
    }
}
</script>

<style scoped>

</style>