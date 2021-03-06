import axios from 'axios'
export default function request(config){
    //创建实例
    const instance = axios.create({
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:10000
    });
    //过滤器
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        console.log(err);
    });
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    });
    return instance(config);//返回promise的类型
}