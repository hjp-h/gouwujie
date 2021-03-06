import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
//在Vue中安装插件，下载好后，会调用这个对象中的install方法
Vue.use(Toast);
//使用图片懒加载
Vue.use(vueLazyLoad);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
//解决移动端300ms的延迟
FastClick.attach(document.body);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
