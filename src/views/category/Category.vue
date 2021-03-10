<template>
   <div id="category">
       <nav-bar class="nav-bar">
           <slot slot="center">分类</slot>
       </nav-bar>
       <div class="content">
           <tab-menu :categories="categories"
                    @selectItem="selectItem"></tab-menu>
           <scroll id="tab-content">
                <category-list :goods="showSubcategory"></category-list>
                <tab-control :titles="['综合','新品','销量']" @itemClick="tabClick"></tab-control>
                <goods-list :goods="showCategoryDetail"></goods-list>
           </scroll>
       </div>
         
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
import Scroll from 'components/common/scroll/Scroll'
import CategoryList from 'components/content/goods/CategoryList'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
export default {
    name:'Category',
    components:{
        NavBar,
        TabMenu,
        Scroll,
        CategoryList,
        TabControl,
        GoodsList
    },
    data(){
        return {
            //分类的目录
            categories:[],
            //categoryData:[],
            categoryData:{},
            type:'pop',
            currentIndex:-1
        }
    },
    created() {
        //请求分类数据
        this._getCategory();
        //this._getSubcategory(0);
    },
    computed:{
        showSubcategory() {
            if(this.currentIndex === -1) return [];//当页面创建好之后，subcategories还没创建好，所以要判断
            return this.categoryData[this.currentIndex].subCategories;
        },
        showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.type]
      }
    },
    methods:{
        //请求我们的分类数据
        _getCategory(){
            getCategory().then(res => {
                const data = res.data;
                //console.log(data);
                this.categories = data.category.list;
                //初始化categoryData 构建数据类型
                for(let i=0;i<this.categories.length;i++){
                    this.categoryData[i] = {
                        subCategories:[],
                        categoryDetail:{
                            pop:[],
                            new:[],
                            sell:[]
                        }
                    }
                }
                //请求第一个分类的数据
                this._getSubcategory(0);
            });
        },
        _getSubcategory(index){
            this.currentIndex = index;
            const maitkey = this.categories[index].maitKey;
            getSubcategory(maitkey).then(res => {
                //console.log(res);
                this.currentIndex = index;
                this.categoryData[index].subCategories = res.data.list;
                this._getCategoryDetail('pop');
                this._getCategoryDetail('new');
                this._getCategoryDetail('sell');
            });
        },
        _getCategoryDetail(type){
            const miniWallKey = this.categories[this.currentIndex].miniWallkey;
            getCategoryDetail(miniWallKey,type).then(res => {
                //console.log(res);
                //将对应商品类型的数据进行一个保存
                this.categoryData[this.currentIndex].categoryDetail[type] = res;
                this.categoryData = {...this.categoryData}
            });
        },
        //获取分类详情的照片
        selectItem(index){
            this._getSubcategory(index);
        },
        tabClick(index){
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
            console.log(this.type);
        }
    }
}
</script>

<style scoped>
#category{
    height:100vh;
}
.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

.nav-bar{
    color:#fff;
    background-color: var(--color-tint);
}
#tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
}
</style>