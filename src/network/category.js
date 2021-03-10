import request from './request'
//请求分类的数据
export function getCategory(){
    return request({
        url:'/category'
    });
}
//请求分类数据中对应的图片
export function getSubcategory(maitKey){
    return request({
        url:"/subcategory",
        params:{
            maitKey
        }
    });
}
//请求每个分类对应的数据信息
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url:'/subcategory/detail',
        params:{
            miniWallkey,
            type
        }
    });

}