import {debounce} from './/utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
    data(){
        return {
            itemImageListener: null
        }
    },
    mounted(){
         //1.监听图片加载完成
         const refresh = debounce(this.$refs.scroll.refresh,800);
         this.itemImageListener = () => {
             refresh();
         }
         this.$bus.$on('imageLoad',this.itemImageListener);
         //console.log('我是混入中的内容');
    }
}
export const backTopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            isShow:false
        }
    },
    methods: {
        backTop(){
            //回到顶部
            this.$refs.scroll.scrollTo(0,0);
        }
    },
}