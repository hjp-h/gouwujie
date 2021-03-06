<template>
    <div class="cart">
        <!--导航栏-->
        <nav-bar calss="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!--购物列表-->
        <cart-list></cart-list>
        <!--底部汇总栏-->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
    name:'ShopCart',
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        /*
        cartLength(){
            return this.$store.getters.cartLength;
        }
        */
        //我们想让vuex中的getters直接在这里能用，我们就得引用mapGetters
        //两种语法
        //1.名字必须和getters中相同  此时传入的是一个数组
        ...mapGetters(['cartLength'])
        //2.名字自定义 此时传入的就是一个对象
        // ...mapGetters({
        //     cl:'cartLength'
        // })
    }
}
</script>

<style scoped>
.cart{
    height:100vh;
}
.nav-bar{
    background-color: var(--color-tint);
    color:#fff;
}
</style>