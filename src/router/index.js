import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Admin from '../components/admin/admin.vue'
import Template from '../components/admin/template.vue'
import Template2 from '../components/admin/template2.vue'
import Template3 from '../components/admin/template3.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children:[
            {
                path: '/admin/template',
                name: 'Template',
                component: Template,
            },
            {
                path: '/admin/template2',
                name: 'Template2',
                component: Template2,
            },
            {
                path: '/admin/template3',
                name: 'Template3',
                component: Template3,
            }
        ]
    },
  ]
})