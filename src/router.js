import Vue from 'vue'
import Router from 'vue-router'


/* Modulo. Panel de Control. Vistas */
import Panel from './views/panel_control/Panel.vue' 
/* Modulo. Control Acceso. Vistas */
import ControlAcceso from './views/control_acceso/Index.vue'
import ControlAccesoHome from './views/control_acceso/Home.vue'
import ControlAccesoPanelcontrol from './views/control_acceso/Panelcontrol.vue' 
import ControlAccesoRol from './views/control_acceso/Rol.vue'
import ControlAccesoUsuario from './views/control_acceso/Usuario.vue' 
import ControlAccesoAlmacenamiento from './views/control_acceso/Almacenamiento.vue'







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
    },






    
    /*Rutas Control de Acceso*/
    {
      path: '/control-acceso',
      name: 'control-acceso',
      component: ControlAcceso
    },
    {
      path: '/control-acceso-home',
      name: 'control-acceso-home',
      component: ControlAccesoHome
    },
    {
      path: '/control-acceso-panelcontrol',
      name: 'control-acceso-panelcontrol',
      component: ControlAccesoPanelcontrol
    },
    {
      path: '/control-acceso-rol',
      name: 'control-acceso-rol',
      component: ControlAccesoRol
    },
    {
      path: '/control-acceso-usuario',
      name: 'control-acceso-usuario',
      component: ControlAccesoUsuario
    },  
    {
      path: '/control-acceso-almacenamiento',
      name: 'control-acceso-almacenamiento',
      component: ControlAccesoAlmacenamiento
    }

    

  ]
})
