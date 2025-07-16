<template> 
        <v-container transition="scale-transition" fluid fill-height class="my-5 py-5 "  > 
                    <v-layout align-center justify-center class="my-5 py-5"> 
                        <div  class="text-xl-center text-md-center text-xs-center my-5">
                            <img src="@/assets/LogoHGO.png"  height="250px"  alt=""> 
                             <v-flex>
                            <v-card  >  
                                
                               <v-spacer></v-spacer>
                                <v-navigation-drawer  
                                    right 
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
import Swal from 'sweetalert2'
export default {
    data(){
        return {
            usuario: '',
            password: '', 
            error: null,
            avisoSesion: '',
            sesionConcluida: ''
        }
    },
     created: function() {  
          
            ///////////////////////////////////////////////////////////////
             // Add a request interceptor
            axios.interceptors.request.use( (config)=> {
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
              axios.interceptors.response.use((response)=>{
              console.log(response);
              this.$store.commit('LOADER',false);
              // Do something with response data
              return response;
            },  (err)=> {
            
              // Do something with response error
              return new Promise( (resolve, reject)=> {
                this.$store.dispatch('logout').then(()=>{
                  //this.$router.push('/login')
                })
                throw err;
              });
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
                  //this.$router.push('/login')
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
                        this.error=null;
                        this.$controlacceso.post('api/Usuarios/Login', {usuario: this.usuario, password: this.password,  claveP: 'd1fec72c-10a9-45e7-8c39-3a0ab852f9bd'})
                        .then(respuesta => {
                            console.log(respuesta.data);
                            return respuesta.data
                        })
                        .then(data => {        
                            this.$store.dispatch("guardarToken", data.token)
                            this.$router.push({ name: 'home' })
                            this.tiempoSesion();
                            this.CierreNav();
                            this.startInactivityTimer();
                        }).catch(err => {
                            this.error=err.response.data;
                            
                        })
                         
                    }
                }) 
          
        },
        tiempoSesion(){
            let me = this;
            let header = { Authorization: "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            this.$controlacceso.get('api/Usuarios/TiempoCSesion', configuracion).then(function (response) {

            me.avisoSesion = response.data.avisoSesionMinutos;
            me.sesionConcluida = response.data.cerrarSesionMinutos;
            me.configurarTemporizadorCierreSesion();
            }).catch(err => {
                me.error=err.response.data;         
              })
          },
          configurarTemporizadorCierreSesion() {

            const minutosEnMilisegundos =  this.avisoSesion * 60 * 1000; //milisegundos
            const cierreSesion = this.sesionConcluida * 60 * 1000; 

          // Temporizador de notificación después de 30 minutos
              this.notificacionT = setTimeout(() => {
                Swal.fire({
                            title: 'Aviso',
                            text: 'La sesión se cerrará en 5 minutos. ¿Desea permanecer en sesión?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: "#691c32",
                            cancelButtonColor: "#929191",
                            confirmButtonText: 'Permanecer',
                            cancelButtonText: 'Cerrar sesión',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            position: 'top'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // Acción para "Permanecer"
                              clearTimeout(this.notificacionT);
                              clearTimeout(this.cierreSesionT);
                              this.configurarTemporizadorCierreSesion();
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                              // Acción para "Cerrar sesión"
                              this.cerrarSesion();
                            }
                          });
                            }, minutosEnMilisegundos);
                      
                  // Temporizador para cerrar la sesión 5 minutos después de la notificación
                      this.cierreSesionT = setTimeout(() => {
                      this.cerrarSesion();
                      Swal.close();
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "La sesión ha caducado por inactividad en el sistema Centenario.!",
                        confirmButtonColor: "#d1b68e",
                      });
                      }, cierreSesion);             
          },
          CierreNav(){
            window.addEventListener('beforeunload', (event) =>{
              //Cerrar sesion cada que se cierre el navegador 
              this.cerrarSesion();
              });
          },

          cerrarSesion() {
            clearTimeout(this.cierreSesionT);
            clearTimeout(this.notificacionT);
            window.removeEventListener("mousedown", this.onInactivity);
            //Funciones para eliminar el token 
            this.$store.dispatch("salir");
            if (this.$route.path !== '/login') {
              this.$router.push('/login');
            }

          },
          onInactivity() {

            clearTimeout(this.notificacionT);
            clearTimeout(this.cierreSesionT);
            this.configurarTemporizadorCierreSesion();
            console.log("Usuario inactivo. Ejecutando función...");

            },
            startInactivityTimer() {
            // Escuchar eventos de mouse y teclado para reiniciar el temporizador
            window.addEventListener("mousedown", this.onInactivity);

          },
    },
    beforeDestroy() {
    // Limpiar los event listeners cuando el componente es destruido
    window.removeEventListener("mousedown", this.resetInactivityTimeout);
    clearTimeout(this.notificacionT); // Limpiar el temporizador
    clearTimeout(this.cierreSesionT); // Limpiar el temporizador
  }
    
}
</script>


 
 
