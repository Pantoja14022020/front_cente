<template> 
    
        <v-container transition="scale-transition" fluid fill-height class="my-5 py-5 "  > 
                    <v-layout align-center justify-center class="my-5 py-5"> 
                        <div  class="text-xl-center text-md-center text-xs-center my-5">
                            <img src="@/assets/Logo.png"  height="250px"  alt=""> 
                             <v-flex>
                            <v-card  >  
                                
                               <v-spacer></v-spacer>
                                <v-navigation-drawer  
                                    v-model="drawer"
                                left
                                width="450"
                                class="primary"
                                app
                                dark
                                permanent
                                    >
                                    
                                    <div   class="my-5 mx-5">
                                         <v-card-title    class="white--text  display-2">SISTEMA CENTENARIO</v-card-title> 
                                           <v-card-title    class="white--text subtitle-1 text-md-left font-weight-light">Bienvenido al Sistema Informático Integral de Gestión Procesal Penal</v-card-title>  
                                          <v-card-text >
                                           
                                                <v-text-field 
                                                  prepend-icon="person" 
                                                  v-model="usuario"  
                                                  color="white"   
                                                  name="nombre de usuario" 
                                                  label="Usuario"
                                                  v-validate="'required'" 
                                                 :error-messages="errors.collect('nombre de usuario')">
                                                  type="text">
                                                </v-text-field>
                                                <v-text-field 
                                                  prepend-icon="lock" 
                                                  v-model="password"  
                                                  color="white" 
                                                  name="contraseña" 
                                                  label="Contraseña" 
                                                  id="password" 
                                                  @keydown.enter="ingresar()"
                                                  v-validate="'required'" 
                                                  :error-messages="errors.collect('contraseña')"
                                                  type="password">
                                                </v-text-field>
                                                 <v-alert
                                                  :value="error"
                                                  color="error"
                                                  icon="warning"
                                                  outline
                                                >
                                                {{error}}
                                                </v-alert>
                                               
                                         
                                          </v-card-text>
                                         <v-card-actions>
                                            <v-btn block @click="ingresar" color="#BC955C">Entrar</v-btn> 
                                         </v-card-actions>
                                           <v-card-title    class="white--text subtitle-2 text-md-left font-weight-light"> © Todos los derechos reservados PGJEH 2019-2022</v-card-title>
                                           <v-card-title    class="white--text subtitle-2 text-md-left font-weight-light"> Ver 1.5 compilación 405</v-card-title>  
                                    </div> 
                                </v-navigation-drawer>
                            </v-card>
                        </v-flex>
                        </div> 
                    </v-layout>
                    
       </v-container>  
     
</template>
<script>
import axios from 'axios'
import VeeValidate from 'vee-validate'  
import { error } from 'util';
export default {
    data(){
        return {
            drawer: false,
            usuario: '',
            password: '', 
            error: null
        }
    },
     created: function() {  

      
      const token = this.$store.state.token || localStorage.getItem("token");
      
      if(token)
      { 
        this.$router.push({ name: 'Panel' });
      }
      ///////////////////////////////////////////////////////////////
        // Add a request interceptor
      axios.interceptors.request.use( (config)=> {
        // Do something before request is sent              
        this.$store.commit('LOADER',true);
        return config;
      }, (error)=> {
        // Do something with request error              
        this.$store.commit('LOADER',false);
        return Promise.reject(error);
      });
        ///////////////////////////////////////////////////////////////
                // Add a request interceptor
      this.$conf.interceptors.request.use( (config)=> {
        // Do something before request is sent
        console.log(config); 
        this.$store.commit('LOADER',true); 
        return config;
      }, (error)=> {
        // Do something with request error
        this.$store.commit('LOADER',false);
        return Promise.reject(error);
      });
        // Add a response interceptor
        this.$conf.interceptors.response.use((response)=>{
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
        return response;
        },  (error)=> {
            // Do something with response error
        return new Promise( (resolve, reject)=> {
          this.$store.dispatch('logout').then(()=>{
            this.$router.push('/')
          })
          throw err;
        });
        });
        ///////////////////////////////////////////////////////////////
         
        },
    
 
  
    methods :{
        ingresar(){
                this.$validator.validate().then(result => {
                  
                    if (result) { 
                      this.error = null;
                         this.$controlacceso.post('api/Usuarios/Login', {usuario: this.usuario, password: this.password,  claveP: '001a72ec-64d4-4493-8504-71f5021b2c3f'})
                        .then(respuesta => {                        
                          this.$store.commit('LOADER',false);
                            return respuesta.data
                        })
                        .then(data => {     
                            this.$store.dispatch("guardarToken", data.token)
                            this.$store.dispatch("setLogin", data.token)
                            this.$router.push({ name: 'Panel' })
                            //this.CierreNav();
                        }).catch(err => {              
                          console.log("error") 
                          console.log(err)            
                          this.error = err.response.data;
                          this.$store.commit('LOADER',false);
                        })
                         
                    }
                }) 
          
        },
          CierreNav(){
            window.addEventListener('beforeunload', (event) =>{
              //Cerrar sesion cada que se cierre el navegador 
              this.cerrarSesion();
              });
          },

          cerrarSesion() {
            //Funciones para eliminar el token pasando las 8hrs y reedirigir a login
            this.$store.dispatch("salir");
            if (this.$route.path !== '/') {
              this.$router.push('/');
            }
          }
    }
    
}
</script>
 
 