<template>
    <div calss='bottom'>
        <div class="bottom-bar">
            <div class="check-content">
                <check-button :is-checked="isSelected" class="check-button" @click.native="checkAll"></check-button>
                <span>全选</span>
            </div>
            <div class='total-price'>合计：{{totalPrice}}</div>
            <div class="calculate" @click="calc">
                去计算({{checkedLength}})
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/common/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return '￥'+this.cartList.filter(item => {
                return item.checked;//过滤出被选择的商品
            }).reduce((preValue,item) => {
                return preValue+item.price*item.count;
            },0).toFixed(2);
        },
        checkedLength(){
            return this.cartList.filter(item => item.checked).length;
        },
        isSelected(){
            //找出不被选中的商品个数 只有不被选中的商品个数等于0的时候 才全选
            //这种方法性能不高 因为遍历了整个数组
            //return !(this.cartList.filter(item => !item.checked).length);

            //只要找到一个不选中的 那就不能全选
            //当购物车为空时
            if(this.cartList.length === 0){
                return false;
            }
            return !this.cartList.find(item => !item.checked);
        }
    },
    methods:{
        checkAll(){//全选按钮的点击
            // if(this.isSelected){//取消全选
            //     this.$store.commit('checkedNone');
            // }else{//如果购物车的商品没有全部选中(全选)
            //     //点击了之后让购物车的商品都为选中状态
            //     this.$store.commit('checkedAll');
            // }
            this.$store.commit('checkedAll',this.isSelected);
        },
        calc(){
            if(!this.isSelected){
                this.$toast.show('请选择要购买的商品');
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    display: flex;
    height:40px;
    background-color: #eee;
    line-height: 40px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width:60px;
}
.check-button{
    height:20px;
    width:20px;
    line-height: 20px;
    margin-right: 5px;
}
.total-price{
    margin-left: 10px;
    flex:1;/*占满剩余的宽度 */
}
.calculate{
    width:90px;
    background-color: rgb(245, 32, 32);
    color: #fff;
    text-align: center;
}
</style>

