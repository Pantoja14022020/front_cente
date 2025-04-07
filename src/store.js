import Vue from 'vue'
import Vuex from 'vuex'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'
import VueAlertify from 'vue2-alertifyjs';
import VeeValidate from 'vee-validate';   
import decode from 'jwt-decode'
import router from './router' 

Vue.use(Vuex)
Vue.use(VueAlertify) 
Vue.use(VeeValidate)
 

export default new Vuex.Store({
    state: 
    {
        
        loader:false,
        token: null,
        usuario: null

    },
    mutations: 
    {
        
        LOADER(state,payload)
        {
            state.loader=payload;
        },

        setToken(state,token)
        {
            state.token=token
        },

        setUsuario (state,usuario)
        {
            state.usuario=usuario
        }
        
    },
    actions: 
    {
        guardarToken({commit},token)
        {
            commit("setToken", token)
            commit("setUsuario", decode(token))
            localStorage.setItem("token", token)
        },

        /* Method. Control Acceso */
        autoLoginCA({commit})
        {
            let token = localStorage.getItem("token")
            if (token){
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            //router.push({name: 'control-acceso'})
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