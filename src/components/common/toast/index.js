import Toast from './Toast'
const obj = {};
obj.install = function(Vue){
   //1.创键一个组件构造器
   const toastConstructor = Vue.extend(Toast);
   //2.创建该组件
   const toast = new toastConstructor();
   //3.将该组件手动挂载到某个元素上
   toast.$mount(document.createElement('div'));
   //4.将它加到body中
   document.body.appendChild(toast.$el);
   //5.全局使用
   Vue.prototype.$toast = toast;
}
export default obj;