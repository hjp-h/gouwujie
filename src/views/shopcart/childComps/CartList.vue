<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item 
                v-for="(item,index) in cartList" 
                :key="index"
                :item-info="item"></cart-list-item>
        </scroll>
    </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
export default {
    name:'CartList',
    components:{
        Scroll,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated() {
        this.$refs.scroll.refresh();
    },
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
    /* position: relative; */
}
/* .content {
        top: 0px;
        bottom: 0px;
        left: 0;
        right: 0;
        overflow: hidden;
        position: absolute;
    } */

.content{
    height:100%;
    overflow: hidden;
}
</style>