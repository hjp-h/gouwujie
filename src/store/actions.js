import {
    ADD_COUNTE,
    ADD_TO_CAST
} from './mutations-types'
export default {
    addCart({state,commit},payLoad){
        //判断新添加的商品是不是已有的，如果是有的，就数量加1，如果没有就push进去
        /*
        let oldProduct = null;
        for(let item of state.cartList){
            if(item.iid === payLoad.iid){//已经有的商品
                item.count += 1;
                oldProduct = item;
            }
        if(!oldProduct){//是新添加的商品
            payLoad.count = 1;
            state.cartList.push(payLoad);
        }
        }*/
        return new Promise((resolve,reject) => {
            let oldProduct = state.cartList.find(item => item.iid === payLoad.iid);
            if(oldProduct){//已经有的商品
                commit(ADD_COUNTE,oldProduct);
                resolve('商品数量+1');
            }else{//新添加的商品
                payLoad.count = 1;
                commit(ADD_TO_CAST,payLoad);
                resolve('添加购物车成功！');
            }
        });
    }
}