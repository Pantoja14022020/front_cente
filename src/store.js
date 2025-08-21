import Vue from 'vue'
import Vuex from 'vuex'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'
import VueAlertify from 'vue2-alertifyjs';
import VeeValidate from 'vee-validate';   
import decode from 'jwt-decode'
import router from './router' 
import  VueEditor  from 'vue2-editor'  
import  * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Vuex)
Vue.use(VueAlertify) 
Vue.use(VeeValidate)
Vue.use(VueEditor)  
Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyCq6BIkl3Mch3ZkTT6-8TXbH7oHWPlAnfw",
      libraries: "places"
    }
});



export default new Vuex.Store({
    state: 
    {        
        loader:false,
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        usuario: null,
        idusuario: null,
        drawer: true,
        menu:null,
        idExpediente:null,
        idEnvio:null,
        idrhecho:null,
        noExpediente:null,
        tipoModulo:null,
        select_moduloServicioId:null,
        distrito: null,
        logged: false
    },
    mutations: 
    {        
        LOADER(state,payload)
        {
            state.loader=payload;
        },
        setToken(state,token)
        {
            if(token)
            {
                state.token=token
            }
        },
        setLogged(state, logged)
        {   
            state.logged = logged
        },
        setUsuario (state,usuario)
        {
            state.usuario=usuario
            state.idusuario = usuario.idusuario
        },
        setTokenCoordenadas(state, payload) {
            state.tokenCoordenadas = payload;
        },
        setMenu (state,menu){
            state.menu=menu;
        },
        setDrawer (state, drawer)
        {
            state.drawer = drawer
        }        
    },
    actions: 
    {
        guardarToken({commit},token)
        {
            if(token)
            {
                try {
                    commit("setToken", token)
                    commit("setUsuario", decode(token))
                    localStorage.setItem("token", token)
                }
                catch (error) {
                    console.error("Token inválido en guardarToken:", error);
                }
            }
        },

        setLogin({ commit }, token) {
            if (token) {
                try {
                    const usuario = decode(token)
                    commit("setUsuario", usuario)
                    commit("setLogged", true)
                }
                catch (error) {
                    console.error("Token inválido en setLogin:", error);
                }
            }
        },

        setLogout({commit})
        {
            commit("setLogged", false)
            localStorage.removeItem("token")
            localStorage.removeItem('pageReloaded');
            router.push({ name: '/' }).then(() => {
                window.location.reload()
            })
        },

        guardarMenu({commit},menu)
        {
            commit("setMenu",menu);
            console.log('JSON LOCAL:'+JSON.stringify (menu))
            localStorage.setItem("menu",JSON.stringify (menu));
        },

        //Hacer global la variable de drawer para mostrar u ocultar el menu de navegacion lateral
        setDrawer({commit}, drawer)
        {
            commit("setDrawer", drawer)
        },

        /* Method. Umixta */
        autoLogin({commit})
        {
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({name: 'umixta'})
        },

        /* Method. Control Acceso */
        autoLoginCA({commit})
        {
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({name: 'control-acceso'})
        },

         /* Method. Captura */
        autoLoginMC({commit})
        {
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({name: 'mcaptura'})
        },

        /* Method. JR */
        autoLoginJR({commit}){
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({name: 'justicia-restaurativa'})
        },

        autoLoginPI({commit}){
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({name: 'policia-investigadora'})
        },
        
        autoLoginSP({commit}){
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({name: 'servicios-periciales'})
        },

        autoLoginTools({commit}){
            let token = localStorage.getItem("token")
            let menu = localStorage.getItem("menu");
            if (token){
                commit("setToken", token)
                commit("setMenu", JSON.parse(menu))
                commit("setUsuario", decode(token))
            }
            router.push({name: 'tools'})
        },

        /*salir({commit})
        {
            commit("setToken", null)
            commit("setUsuario", null)
            localStorage.removeItem("token")
            router.push({ name: 'Panel' })     
        }*/
    }
})