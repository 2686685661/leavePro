import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
    saveScrollPosition: true,
    routes: [
        {
            path: '/',
            component: resolve => void(require(['../components/Leave/leaveIn.vue'], resolve))
        },
        {
        	path: '/history',
        	 component: resolve => void(require(['../components/History/history.vue'], resolve))
        }
    ]
});