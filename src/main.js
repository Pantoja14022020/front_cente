import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store' 
import axios from 'axios'   
import VeeValidate from 'vee-validate'  
import WebCam from 'vue-web-cam'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'typeface-roboto/index.css';
import keycloak from './auth/keycloak'

//Estilos CSS
import './styles/panel_control/index.css'
import './styles/control_acceso/index.css'


Vue.config.productionTip = false



axios.defaults.baseURL =  'http://3.95.38.176:5006/'



const controlaccesoInstance = axios.create({ baseURL:  'http://18.233.164.30:5000/' }) 
Vue.prototype.$controlacceso = controlaccesoInstance 



const confInstance = axios.create({baseURL:  'http://54.242.228.50:5002/'}) 
Vue.prototype.$conf = confInstance 



const catInstance = axios.create({baseURL:  'http://52.87.216.188:5001/'}) 
Vue.prototype.$cat = catInstance



const panelInstance = axios.create({baseURL:  'http://3.95.38.176:5006/'}) 
Vue.prototype.$panel = panelInstance

const justiciarestaurativaInstance = axios.create({baseURL:  'https://justicia-restaurativa.serveo.net'})
Vue.prototype.$justiciarestaurativa = justiciarestaurativaInstance




keycloak.init({onLoad: ONLOAD, checkLoginIframe: false})
      .then( authenticated => 
        {

          if(!authenticated) { keycloak.logout({redirectUri: URI_FAIL_KEYCLOAK}); alert("No fue posible autenticarse") }

          const token = keycloak.token;
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload["preferred_username"]
          

          controlaccesoInstance.post('api/Usuarios/VerificarExistenciaUsuario',{ usuario: username })
            .then(response => {
              controlaccesoInstance.post('api/Usuarios/PerteneceAlDistrito',{ usuario: username })
                .then(response => {
                  Vue.prototype.$usuario = username;  
                  Vue.prototype.$ClaveP = '6b37f386-4393-40a1-96fa-e9407462c1d7';
                  new Vue({ router, store, VeeValidate, WebCam, render: h => h(App) }).$mount('#app')
                })
                .catch(error => {
                  alert("El usuario no se encuentra en este distrito")
                  keycloak.logout({redirectUri: URI_FAIL_KEYCLOAK})
                })
            })
            .catch(error => {
              alert("El usuario no se encuentra registrado en Centenario")
              keycloak.logout({redirectUri: URI_FAIL_KEYCLOAK})
            });

        }
      )
      .catch( error => { console.log(error);alert("Error en el servidor de inicio de sesion, intente más tarde") } )