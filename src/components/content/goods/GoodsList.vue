<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    name:'GoodsList',
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods {
    display: flex;
    /* 默认flex-wrap: nowrap，不包裹  
    包裹：wrap 根据宽度一行显示几个*/
    flex-wrap: wrap;
    /*均等分 */
    justify-content: space-around;
    padding: 2px;
}

</style>