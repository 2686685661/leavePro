
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
// import  VueResource  from 'vue-resource';
// Vue.use(VueResource); 
Vue.use(ElementUI);

import router from './router/index.js';  

//加载公共组件
import components from './components/common/';
Object.keys(components).forEach((key)=>{
  Vue.component(key,components[key]);
})


const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});