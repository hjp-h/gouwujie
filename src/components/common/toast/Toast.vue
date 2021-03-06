<template>
    <div id="toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
export default {
    name:'Toast',
    props:{
        // message:{
        //     type:String,
        //     default:''
        // },
        // show:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message,duration=1500){
            this.isShow = true;
            this.message = message;
            setTimeout(() => {
                this.isShow = false;
                this.message = '';
            },duration);
        }
    }
}
</script>

<style scoped>
#toast{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);/*tranlate（）函数中的百分比是相对于自身宽高的百分比*/
    padding:8px 10px;
    background-color: rgba(0,0,0,0.68);
    color:#fff;
    z-index:999;
}
</style>