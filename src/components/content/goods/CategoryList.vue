<template>
    <div class="goods">
        <category-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"></category-list-item>
    </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
export default {
    name:'CategoryList',
    components:{
        CategoryListItem
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