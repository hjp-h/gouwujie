<template>
    <scroll class="menu">
        <div class="menu-list">
           <div class="menu-list-item"
                v-for="(item,index) in categories"
                :key="index"
                :class="{active:currentIndex === index}"
                @click="itemClick(index)">
               {{item.title}}
           </div>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
    name:'TabMenu',
    components:{
        Scroll
    },
    data(){
        return {
            currentIndex:0
        }
    },
    props:{
        categories:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('selectItem',index);
        }
    }
}
</script>

<style scoped>
.menu{
    height:100%;
    overflow: hidden;
    box-sizing: border-box;
}
.menu-list{
    width:100px;
    height:100%;
    background-color: #f6f6f6;  
}
.menu-list-item{
    text-align: center;
    height:45px;
    line-height: 45px;
    font-size: 14px;
}
.menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>