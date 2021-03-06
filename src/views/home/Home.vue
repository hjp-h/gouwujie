<template>
   <div id="home">
       <nav-bar class="home-nav">
           <div slot="center">购物街</div>
       </nav-bar>
       <tab-control :titles="['流行','新款','精选']"
                        @tabClick="tabClick" ref="tabControl1"
                        class="tab-control" v-show="isTabShow"></tab-control>
       <scroll class="content" ref="scroll" :probe-type="3" 
               :pull-up-load="true" @scroll="contentScroll"
               @pullingUp="loadMore">
            <home-swipper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swipper>
            <recommend-view :recommend="recommend"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']"
                        @tabClick="tabClick" ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
       </scroll>
       <back-top @click.native="backTop" v-show="isShow"></back-top>
    </div> 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import HomeSwipper from './childComps/HomeSwipper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata,getHomeGoods} from 'network/home';
import {itemListenerMixin,backTopMixin} from 'common/mixin'
export default {
    name:'Home',
    components: {
        NavBar,
        HomeSwipper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll
    },
    data(){
        return {
            banner:[],
            recommend:[],
            //商品的数据
            goods: {
                pop: {page: 0,list:[]},
                new: {page: 0,list:[]},
                sell: {page: 0,list:[]},
            },
            type:'pop',
            tabOffsetTop:0,
            isTabShow:false,
            saveY: 0,
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created(){
        //调用函数
        this.getHomeMultidata();
        //请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    mounted(){
    },
    activated() {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0,this.saveY,0);
       
    },
    deactivated() {
        //1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY();
        //2.取消全局事件的监听  需要说明的是取消的是哪个函数的事件，不说明的话就是取消所有的该事件
        this.$bus.$off('itemImageLoad',this.itemImageListener);
    },
    destroyed() {
        console.log('destroy');
    },
    methods:{
        /**
         * 事件监听相关的方法
         */

        tabClick(index) {
            switch(index){
                case 0:
                    this.type = 'pop';
                    break;
                case 1:
                    this.type = 'new';
                    break;
                 case 2:
                    this.type = 'sell';
                    break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        contentScroll(position){
            //1.判断BackTop是否显示
            this.isShow = (-position.y) > 1000;
            //2.决定tabControl是否吸顶 position：fixed
            //只要滚动了offsetTop的高度就吸顶
            this.isTabShow = (-position.y) > this.offsetTop;
        },
        loadMore() {
            this.getHomeGoods(this.type);
        },
        swiperImageLoad() {
            //2.获取tabControl的offsetTop
        //所有的组件都有一个属性叫$el,直接拿到的offsetTop是不准确的，要等到图片加载完成
            this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
            getHomeMultidata().then(res => {
            this.banner = res.data.banner.list;
            this.recommend = res.data.recommend.list;
        }).catch(err => {
            console.log(err);
        });
        },

         //2.请求商品数据
        getHomeGoods(type){
            //调用一次就加载一页
            const page = this.goods[type].page  + 1;
            getHomeGoods(type,page).then(res => {
                //console.log(res);
                this.goods[type].page = res.data.page;  
                this.goods[type].list.push(...res.data.list);
                /*
                ...res.data.list相当于将list中的所有数据进行一个拆分
                 */
                this.$refs.scroll.finishPullUp();
            }).catch(err => {
                console.log(err);
            });
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.type].list;
        }
    }
}
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
        /*
        vh 是 CSS 中的相对长度单位，相对视口高度（Viewport Height），1vh = 1% * 视口高度 
        也就是说：height:100vh == height:100% 
        但是元素没有内容的时候，设置 height:100%，该元素不会被撑开，此时高度为0 
        但是设置 height:100vh，该元素会被撑开跟屏幕高度一致*/
    }
    .home-nav{
        background-color: var(--color-tint);
        color:#fff;
        /*在使用我们的原生滚动时，为了不让导航栏一起跟着滚，我们设置了它脱离文档流 */
        /* position: fixed;
        left:0;
        right:0;
        top:0;
        z-index:9; */
    }
   /*.tab-control {
        距离顶部多少就固定
        原理：
            本来 position:static
            距离顶部44px后，position:fix
         
        position:sticky;
        top:44px;
        background-color: #fff;
        z-index:9;
    }*/
    .tab-control {
        background-color: #fff;
        position: relative;
        z-index: 9;

    }
    .content {
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
        position: absolute;
    }
    /* .content{
        height:cal(100%-93px);
        overflow: hidden;
    } */
</style>