import {
    ADD_COUNTE,
    ADD_TO_CAST
} from './mutations-types'
export default {
    [ADD_COUNTE](state,payLoad){
        payLoad.count += 1;
        //alert('添加购物车成功！');
       },
    [ADD_TO_CAST](state,payLoad){
        payLoad.checked = true;
        state.cartList.push(payLoad);
    },
    // checkedAll(state){
    //     state.cartList.forEach(item => {
    //         item.checked = true;
    //     });
    // },
    // checkedNone(state){
    //     state.cartList.forEach(item => {
    //         item.checked = false;
    //     });
    // }
    checkedAll(state,payLoad){
        state.cartList.forEach(item => {
            item.checked = !payLoad;
        });
    }
}