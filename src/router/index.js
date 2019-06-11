import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Admin from '../components/admin/admin.vue'
import ProfilAdmin from '../components/admin/profil.vue'
import Template from '../components/admin/template.vue'
import Template2 from '../components/admin/template2.vue'
import Template3 from '../components/admin/template3.vue'
import Groupe from '../components/admin/groupe.vue'
import Groupe2 from '../components/admin/groupe2.vue'
import Groupe3 from '../components/admin/groupe3.vue'
import Equipe from '../components/admin/equipe.vue'
import Equipe2 from '../components/admin/equipe2.vue'
import ProfilTuteur from '../components/tuteur/profil.vue'
import Tuteur from '../components/tuteur/tuteur.vue'
import Etudiants from '../components/tuteur/etudiants.vue'
import Groupes from '../components/tuteur/groupes.vue'
import Groupes2 from '../components/tuteur/groupes2.vue'
import Eleve from '../components/eleve/eleve.vue'
import ProfilEleve from '../components/eleve/profil.vue'


Vue.use(VueRouter)
export default new VueRouter({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            children: [{
                    path: '/admin/profil',
                    name: 'ProfilAdmin',
                    component: ProfilAdmin,
                },
                {
                    path: '/admin/template',
                    name: 'Template',
                    component: Template,
                },
                {
                    path: '/admin/template/:_id',
                    name: 'Template2',
                    component: Template2,
                },
                {
                    path: '/admin/template/:idTemplate/semestre/:idSemestre/composante/:idComposante',
                    name: 'Template3',
                    component: Template3,
                },
                {
                    path: '/admin/promotion',
                    name: 'Groupe',
                    component: Groupe,
                },
                {
                    path: '/admin/promotion/:idPromotion',
                    name: 'Groupe2',
                    component: Groupe2,
                },
                {
                    path: '/admin/promotion/:idPromotion/groupe/:idGroupe/equipe/:idEquipe',
                    name: 'Groupe3',
                    component: Groupe3,
                },
                {
                    path: '/admin/equipe',
                    name: 'Equipe',
                    component: Equipe,
                },
                {
                    path: '/admin/equipe2',
                    name: 'Equipe2',
                    component: Equipe2,
                }
            ]
        },
        {
            path: '/tuteur',
            name: 'Tuteur',
            component: Tuteur,
            children: [{
                    path: '/tuteur/profil',
                    name: 'ProfilTuteur',
                    component: ProfilTuteur,
                }, {
                    path: '/tuteur/etudiants',
                    name: 'Etudiants',
                    component: Etudiants,
                },
                {
                    path: '/tuteur/groupes',
                    name: 'Groupes',
                    component: Groupes,
                },
                {
                    path: '/tuteur/promotions/:idPromotion/groupes/:idGroupe/equipe/:idEquipe',
                    name: 'Groupes2',
                    component: Groupes2,
                }
            ]
        },

        {
            path: '/eleve',
            name: 'Eleve',
            component: Eleve,
            children: [{
                    path: '/eleve/profil',
                    name: 'ProfilEleve',
                    component: ProfilEleve,
                }
            ]
        },
    ]
})