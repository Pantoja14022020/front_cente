import Vue from 'vue'
import Router from 'vue-router'


/* Modulo. Panel de Control. Vistas */
import Panel from './views/panel_control/Panel.vue' 



/* Modulo. Panel de Control. Componentes */
import Turnador from './components/panel_control/Turnador.vue'
import Entrevista from './components/panel_control/Entrevista.vue'
import Offline from './components/panel_control/Offline.vue'


Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    /*Rutas Panel de Control */
    {
      path: '/',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/Turnador',
      name: 'Turnador',
      component: Turnador
    }
    ,
    {
      path: '/Entrevista',
      name: 'Entrevista',
      component: Entrevista
    }
    ,
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    }

  ]
})
