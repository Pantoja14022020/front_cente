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

axios.defaults.baseURL =  'http://98.80.66.107:5006/'

const jrInstance = axios.create({
  baseURL:  'https://18.233.64.114:5005/'
}) 
Vue.prototype.$jr = jrInstance 

const controlaccesoInstance = axios.create({ baseURL:  'http://13.217.131.100:5000/' })
Vue.prototype.$controlacceso = controlaccesoInstance 

const confInstance = axios.create({baseURL:  'http://34.224.63.224:5002/'})
Vue.prototype.$conf = confInstance

const catInstance = axios.create({baseURL:  'http://34.227.90.239:5001/'})
Vue.prototype.$cat = catInstance

const CATInstance = axios.create({baseURL:  'http://34.227.90.239:5001/'}) 
Vue.prototype.$CAT = CATInstance

const SPInstance = axios.create({baseURL:  'https://44.203.26.217:5008/'})
Vue.prototype.$SP = SPInstance

const panelInstance = axios.create({baseURL:  'http://98.80.66.107:5006/'})
Vue.prototype.$panel = panelInstance

const justiciarestaurativaInstance = axios.create({baseURL:  'https://18.233.64.114:5005/'})
Vue.prototype.$justiciarestaurativa = justiciarestaurativaInstance

const ILInstance = axios.create({baseURL:  'https://54.90.102.37:5004/'})
Vue.prototype.$IL = ILInstance

const PIInstance = axios.create({
  baseURL:  'http://13.218.126.218:5007/'
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
              alert("El usuario no se encuentra registrado en Centenario")
              keycloak.logout({redirectUri: URI_FAIL_KEYCLOAK})
            });

        }
      )
      .catch( error => { console.log(error);alert("Error en el servidor de inicio de sesion, intente más tarde") } )