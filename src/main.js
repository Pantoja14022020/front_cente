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
import Keycloak from "./auth/keycloak";


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:5006/' /*'http://localhost:44313/'*/ //'https://pccentenario.pgjhidalgo.gob.mx/'

//const keycloakUser = axios.create({ baseURL: 'https://login-admin.pgjhidalgo.gob.mx/'})
//Vue.prototype.$keycloakUser = keycloakUser

const jrInstance = axios.create({ baseURL: 'http://localhost:44309/'/*'https://jrcentenario.pgjhidalgo.gob.mx/'*/ }) 
Vue.prototype.$jr = jrInstance 

const controlaccesoInstance = axios.create({ baseURL: 'http://localhost:44321/'/*'https://controlaccesocentenario.pgjhidalgo.gob.mx/'*/ })
Vue.prototype.$controlacceso = controlaccesoInstance 

const confInstance = axios.create({baseURL: 'http://localhost:44360/'/*'https://configuracioncentenario.pgjhidalgo.gob.mx/'*/ })
Vue.prototype.$conf = confInstance

const catInstance = axios.create({baseURL: 'http://localhost:44394/'/*'https://catcentenario.pgjhidalgo.gob.mx/'*/ })
Vue.prototype.$cat = catInstance

const CATInstance = axios.create({baseURL: 'http://localhost:44394/'/*'https://catcentenario.pgjhidalgo.gob.mx/'*/}) 
Vue.prototype.$CAT = CATInstance

const SPInstance = axios.create({baseURL: 'http://localhost:5008/' /*'http://localhost:44336/'*/ /*'https://spcentenario.pgjhidalgo.gob.mx/'*/})
Vue.prototype.$SP = SPInstance

const panelInstance = axios.create({baseURL: 'http://localhost:5006/' /*'http://localhost:44313/'*/ /*'https://pccentenario.pgjhidalgo.gob.mx/' */ })
Vue.prototype.$panel = panelInstance

const justiciarestaurativaInstance = axios.create({baseURL:   'http://localhost:44309/'/*'https://jrcentenario.pgjhidalgo.gob.mx/'*/ })
Vue.prototype.$justiciarestaurativa = justiciarestaurativaInstance

const ILInstance = axios.create({baseURL:  'http://localhost:44312/'/*'https://ilcentenario.pgjhidalgo.gob.mx/'*/ })
Vue.prototype.$IL = ILInstance

const PIInstance = axios.create({
  baseURL: 'http://localhost:5007/' /*'http://localhost:44315/'*/ /*'https://picentenario.pgjhidalgo.gob.mx/' */
}) 
Vue.prototype.$PI = PIInstance

const smsInstance = axios.create({
  baseURL: 'https://api.smsmasivos.com.mx/'
}) 
Vue.prototype.$sms = smsInstance

new Vue({ router, store, VeeValidate, WebCam, VueEditor, render: h => h(App) }).$mount('#app')

/*keycloak.init({onLoad: ONLOAD, checkLoginIframe: false})
      .then( authenticated => 
        {

          if(!authenticated) { 
            keycloak.logout({ redirectUri: URI_FAIL_KEYCLOAK });
            alert("No fue posible autenticarse") 
          }*/

          //const token = keycloak.token;


          /*const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1YUx5SkNfV3JHUk1qVXE0czRjVjNsM3VEZWtDMXVzdVBUdXlYLVNLajJJIn0.eyJleHAiOjE3NTEzMDU5NjksImlhdCI6MTc1MTMwNTY2OSwiYXV0aF90aW1lIjoxNzUxMzA1NjY4LCJqdGkiOiIzMTNlNWFkMi0yZTM1LTRmYjctODNkOC1hYWUyYWJhZDIzMTYiLCJpc3MiOiJodHRwczovL2xvZ2luLnBnamhpZGFsZ28uZ29iLm14L3JlYWxtcy9wcm9jdSIsImF1ZCI6WyJ0cmFuc3BhcmVuY2lhIiwiYnJva2VyIiwiZmlybWEiLCJhY2NvdW50Il0sInN1YiI6IjQ3M2Y0NzUyLTdjYmItNGQ5YS1hMDg0LTAyZTZmOGVjN2VlZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNlbnRlbmFyaW8iLCJzaWQiOiIzYjAwYTlhOS0wYWEwLTQxNWMtYmNlNS1mODI3OWJiOTliOTUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vY2VudGVuYXJpby5wZ2poaWRhbGdvLmdvYi5teCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1wcm9jdSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InRyYW5zcGFyZW5jaWEiOnsicm9sZXMiOlsiUlVUIl19LCJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiZmlybWEiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LWFwcGxpY2F0aW9ucyIsInZpZXctY29uc2VudCIsInZpZXctZ3JvdXBzIiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJtYW5hZ2UtY29uc2VudCIsImRlbGV0ZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY3VycCByb2xlcyBpc0VuYWJsZWQgcHJvZmlsZSBlbWFpbCByZmMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzRW5hYmxlZCI6dHJ1ZSwibmFtZSI6IkFkbWluaXN0cmFkb3IgQ2VudGVuYXJpbyIsInByZWZlcnJlZF91c2VybmFtZSI6InUuYWRtaW5pc3RyYWRvciIsImdpdmVuX25hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZmFtaWx5X25hbWUiOiJDZW50ZW5hcmlvIiwiY3VycCI6IlRBUEQwMTA3MjBISEdMTk5BMiIsImVtYWlsIjoiYWRtaW5pc3RyYWRvcl9jZW50ZW5hcmlvQGdtYWlsLmNvbSIsInJmYyI6IlRBUEQwMTA3MjBDVjMifQ.Tg_n8eh-k_NngECyBA6Y9aAD6z4mPb7iP0Upg8_poQ0rElYxyn6wpmyLlyK-nvXUnBdxYCRhvIEeo88mvVkoJOhtni7LRez7fIZPqNF5fAQYiMbI0zcPG2etKH4P-8OmiH75ilBVSw3uMh1At62f0P6tcFhLKPla4Ka344WSpGjr_jHEgHz14TugDVVe_MZfdB7FKhNi1u1huP4RNcqVFOflG5Glar07eONbvHY6VLyTZB1GRZDn6FnG66s-Rjy7U7myZgQe3tcvotrSapfZwLL2t_HL3210hVnTJshwpTPNrf1fVcsj-PnxhbGFvxPmUB-SCPil8sXmMrEr4i2LoA"
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload["preferred_username"]
          

          controlaccesoInstance.post('api/Usuarios/VerificarExistenciaUsuario',{ usuario: username })
            .then(response => {
              controlaccesoInstance.post('api/Usuarios/PerteneceAlDistrito',{ usuario: username })
                .then(response => {
                  Vue.prototype.$usuario = username;
                  Vue.prototype.$ClaveP = '001a72ec-64d4-4493-8504-71f5021b2c3f'
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
            });*/




/*
        }
      )
      .catch( error => { console.log(error);alert("Error en el servidor de inicio de sesion, intente más tarde") } )
      */