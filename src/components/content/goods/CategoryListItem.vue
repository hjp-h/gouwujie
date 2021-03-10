<template>
    <div class="goods-item">
        <a :href="goodsItem.link">
        <img :src="goodsItem.image" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
        </div>
        </a>
    </div>
</template>

<script>
export default {
    name:'CategoryListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit("itemImageLoad");
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 30%;
  }

  .goods-item img {
    width:65px;
    height:65px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    width:65px;
  }


</style>