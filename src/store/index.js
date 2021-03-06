import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//在Vue中使用Vuex
Vue.use(Vuex);
const state = {
    cartList:[]
}
const store = new Vuex.Store({
    state,
    //mutations最重要的任务就是修改state中的值
    //但是mutations中的方法功能要单一
    mutations,
    actions,
    getters
});
export default store;