<template>
    <div id='detail'>
        <detail-nav-bar ref="detailNav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="2">
            <detail-swipper :topImages="topImages"></detail-swipper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
            <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShow"></back-top>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <!-- <toast :message="message" :show="show"></toast> -->
    </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwipper from './childComps/DetailSwipper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import Scroll from 'components/common/scroll/Scroll'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'
export default {
    name:'Detail',
    components: {
        DetailNavBar,
        DetailSwipper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // Toast
    },
    data() {
        return {
            iid: null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs:[],
            getThemeTopY: null,
            contentIndex: 0,
            // message:'',
            // show:false
        }
    },
    methods:{
        ...mapActions(['addCart']),
        imgLoad() {
            this.$refs.scroll.refresh();
            //获得正确的主题offsetTop
            this.getThemeTopY();
        },
        titleClick(index){
            //点击标题使它滚动到相应的位置
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000);
        },
        contentScroll(position){
            //themeTopYs[0, 2670, 4035, 4230]
            //y: 0-2670 index = 0
            //y: 2670-4035 index = 1
            //y: 4035-4230 index = 2
            //y: 4230-? index = 3
            //在for（let i of array）中 i 是字符串  小心数组下标越界的问题(分两种情况0-2 3)
            this.isShow = (-position.y) > 1000;
            const length = this.themeTopYs.length;
            const positionY = -position.y;
            //方法一：没有push一个最大值
            /*for(let i=0;i<length;i++){
                if(i !== this.contentIndex && ((i<(length-1) && positionY>this.themeTopYs[i] && positionY<=this.themeTopYs[i+1]) || (i === (length-1) && positionY>=this.themeTopYs[i]))){
                    //防止多次打印 i !== this.contentIndex
                    this.contentIndex = i;
                    //console.log(this.contentIndex);
                    this.$refs.detailNav.currentIndex = this.contentIndex;
                }
            }*/

            //方法二：push一个最大值在this.themeTopYs
            for(let i=0;i<length-1;i++){
                if(i !== this.contentIndex && (positionY>this.themeTopYs[i] && positionY<=this.themeTopYs[i+1])){
                    //防止多次打印 i !== this.contentIndex
                    this.contentIndex = i;
                    //console.log(this.contentIndex);
                    this.$refs.detailNav.currentIndex = this.contentIndex;
                }
            }
        },
        addToCart(){
            //获取购物车中商品所需的信息
            const cartGoods = {};
            cartGoods.image = this.topImages[0];
            cartGoods.name = this.goods.title;
            cartGoods.desc = this.goods.desc;
            cartGoods.price = this.goods.realPrice;
            cartGoods.iid = this.iid;
            // this.$store.dispatch('addCart',cartGoods).then(res => {
            //     console.log(res);
            // });
            this.addCart(cartGoods).then(res => {
                // this.show = true;
                // this.message = res;
                // setTimeout(() => {
                //     this.show = false;
                //     this.messgae = '';
                // },1000);
                this.$toast.show(res,2000);
            });
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created(){
        //1.保存存入的iid
        this.iid = this.$route.params.iid;
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            //console.log(res);
            const data = res.result;
            //1.详情页的轮播图
            this.topImages = data.itemInfo.topImages;
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            //3.创建店铺消息对象
            this.shop = new Shop(data.shopInfo);
            //4.详细信息对象
            this.detailInfo = data.detailInfo;
            //5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            //6.取出我们的评论信息
            if(data.rate.CRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
            //这里可以有数据了，但是要等一会儿，等数据完全渲染
            //this.$nextTick 下一帧就可以了 但是这里只是渲染了dom，dom里面的图片数据没包括在内
            //offsetTop值不对的时候一般都是图片的问题
            /*
            this.$nextTick(() => {
                //商品
                this.themeTopYs.push(0);
                //参数
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                //评论
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                //推荐
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.themeTopYs);
            });*/
           
        });
        //3.请求推荐的数据
        getRecommend().then(res => {
            //console.log(res);
            this.recommends = res.data.list;
        });
        //4.getThemeTopY赋值
        this.getThemeTopY = debounce(() => {
            //商品
            this.themeTopYs.push(0);
            //参数
            this.themeTopYs.push(this.$refs.params.$el.offsetTop-50);
            //评论
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop-50);
            //推荐
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-50);
            this.themeTopYs.push(Number.MAX_VALUE);
            //console.log(this.themeTopYs);
        },100);
    },
    mounted(){
       //在mounted里面数据不一定完全加载出来了，所以$el并不一定有值
       //要在updated获取相应组件的offsetTop

    },
    updated() {
        /*
        //因为数据会更新多次，只需要拿到最后一次更新的值就可以了
        this.themeTopYs = [];
        //商品
        this.themeTopYs.push(0);
        //参数
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //评论
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //推荐
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);*/
    },
    //因为detail组件不在keep-alive 里面所以它没有deactiviated方法
    destroyed() {
        this.$bus.$off('imageLoad',this.itemImageListener)
    },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px - 49px);
}
</style>