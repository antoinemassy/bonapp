import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Admin from '../components/admin/admin.vue'
import Template from '../components/admin/template.vue'
import Template2 from '../components/admin/template2.vue'
import Template3 from '../components/admin/template3.vue'
import Groupe from '../components/admin/groupe.vue'
import Groupe2 from '../components/admin/groupe2.vue'
import Groupe3 from '../components/admin/groupe3.vue'
import Equipe from '../components/admin/equipe.vue'
import Equipe2 from '../components/admin/equipe2.vue'

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
            },
            {
                path: '/admin/groupe',
                name: 'Groupe',
                component: Groupe,
            },
            {
                path: '/admin/groupe2',
                name: 'Groupe2',
                component: Groupe2,
            },
            {
                path: '/admin/groupe3',
                name: 'Groupe3',
                component: Groupe3,
            },
            {
                path: '/admin/equipe',
                name: 'Equipe',
                component: Equipe,
            }
            ,
            {
                path: '/admin/equipe2',
                name: 'Equipe2',
                component: Equipe2,
            }
        ]
    },
  ]
})