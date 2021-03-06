<template>
    <div class="check-button" :class="{checked:isChecked}">
        <img src="~assets/img/cart/tick.svg">
    </div>
</template>

<script>
export default {
    name:'CheckButton',
    props:{
        isChecked:{
            type:Boolean,
            default(){
                return false;
            }
        }
    }
}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    border:2px solid #aaa;
}
.checked{
    background-color: rgb(255, 137, 157);
    border-color: rgb(247, 149, 166);
}
</style>    