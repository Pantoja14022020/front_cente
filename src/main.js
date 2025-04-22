import Vue from 'vue'
import '@babel/polyfill'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store' 
import axios from 'axios'   
import VeeValidate from 'vee-validate'  
import  VueEditor  from "vue2-editor";
import WebCam from 'vue-web-cam'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'typeface-roboto/index.css';
import keycloak from './auth/keycloak'

import './styles/panel_control/index.css'
import './styles/control_acceso/index.css'


Vue.config.productionTip = false

axios.defaults.baseURL =  'https://pccentenario.pgjhidalgo.gob.mx/'

const jrInstance = axios.create({ baseURL:  'https://jrcentenario.pgjhidalgo.gob.mx/' }) 
Vue.prototype.$jr = jrInstance 

const controlaccesoInstance = axios.create({ baseURL:  'https://controlaccesocentenario.pgjhidalgo.gob.mx/' })
Vue.prototype.$controlacceso = controlaccesoInstance 

const confInstance = axios.create({baseURL:  'https://configuracioncentenario.pgjhidalgo.gob.mx/'})
Vue.prototype.$conf = confInstance

const catInstance = axios.create({baseURL:  'https://catcentenario.pgjhidalgo.gob.mx/'})
Vue.prototype.$cat = catInstance

const CATInstance = axios.create({baseURL:  'https://catcentenario.pgjhidalgo.gob.mx/'}) 
Vue.prototype.$CAT = CATInstance

const SPInstance = axios.create({baseURL:  'https://spcentenario.pgjhidalgo.gob.mx/'})
Vue.prototype.$SP = SPInstance

const panelInstance = axios.create({baseURL:  'https://pccentenario.pgjhidalgo.gob.mx/'})
Vue.prototype.$panel = panelInstance

const justiciarestaurativaInstance = axios.create({baseURL:  'https://jrcentenario.pgjhidalgo.gob.mx/'})
Vue.prototype.$justiciarestaurativa = justiciarestaurativaInstance

const ILInstance = axios.create({baseURL:  'https://ilcentenario.pgjhidalgo.gob.mx/'})
Vue.prototype.$IL = ILInstance

const PIInstance = axios.create({
  baseURL:  'https://picentenario.pgjhidalgo.gob.mx/'
}) 
Vue.prototype.$PI = PIInstance

const smsInstance = axios.create({
  baseURL: 'https://api.smsmasivos.com.mx/'
}) 
Vue.prototype.$sms = smsInstance



keycloak.init({onLoad: ONLOAD, checkLoginIframe: false})
      .then( authenticated => 
        {

          if(!authenticated) { 
            keycloak.logout({ redirectUri: URI_FAIL_KEYCLOAK });
            alert("No fue posible autenticarse") 
          }

          const token = keycloak.token;
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload["preferred_username"]
          

          controlaccesoInstance.post('api/Usuarios/VerificarExistenciaUsuario',{ usuario: username })
            .then(response => {
              controlaccesoInstance.post('api/Usuarios/PerteneceAlDistrito',{ usuario: username })
                .then(response => {
                  Vue.prototype.$usuario = username;  
                  Vue.prototype.$ClaveP = '6b37f386-4393-40a1-96fa-e9407462c1d7';
                  new Vue({ router, store, VeeValidate, WebCam, VueEditor, render: h => h(App) }).$mount('#app')
                })
                .catch(error => {
                  alert("El usuario no se encuentra en este distrito")
                  keycloak.logout({redirectUri: URI_FAIL_KEYCLOAK})
                })
            })
            .catch(error => {
              console.log(error, "este es el error")
              alert("El usuario no se encuentra registrado en Centenario")
              keycloak.logout({redirectUri: URI_FAIL_KEYCLOAK})
            });

        }
      )
      .catch( error => { console.log(error);alert("Error en el servidor de inicio de sesion, intente más tarde") } )