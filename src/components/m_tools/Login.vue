<template> 
    
        <v-container transition="scale-transition" fluid fill-height class="my-5 py-5 "  > 
                    <v-layout align-center justify-center class="my-5 py-5"> 
                        <div  class="text-xl-center text-md-center text-xs-center my-5">
                            <img src="@/assets/HIDALGO.png"  height="250px"  alt=""> 
                             <v-flex>
                            <v-card  >  
                                
                               <v-spacer></v-spacer>
                                <v-navigation-drawer  
                                    right width="450"
                                    class="primary"
                                    app dark=""
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
                                           <v-card-title    class="white--text subtitle-2 text-md-left font-weight-light"> © Todos los derechos reservados PGJEH 2019</v-card-title>  
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
            usuario: '',
            password: '', 
            error: null
        }
    },
    created: function() {  
          
            ///////////////////////////////////////////////////////////////
             // Add a request interceptor
            axios.interceptors.request.use( (config)=> {
              // Do something before request is sent
            //console.log(config);
              this.$store.commit('LOADER',true);
              return config;
            }, (error)=> {
              // Do something with request error
              this.$store.commit('LOADER',false);
              return Promise.reject(error);
            });

              // Add a response interceptor
              axios.interceptors.response.use((response)=>{
              //console.log(response);
              this.$store.commit('LOADER',false);
              // Do something with response data
              return response;
            },  (err)=> {
            
              // Do something with response error
              return new Promise( (resolve, reject)=> {
                throw err;
              });
            });
              ///////////////////////////////////////////////////////////////
                     // Add a request interceptor
            this.$conf.interceptors.request.use( (config)=> {
              // Do something before request is sent
              //console.log(config); 
              this.$store.commit('LOADER',true); 
              return config;
            }, (error)=> {
              // Do something with request error
              this.$store.commit('LOADER',false);
              return Promise.reject(error);
            });

              // Add a response interceptor
              this.$conf.interceptors.response.use((response)=>{
                //console.log(response);
                this.$store.commit('LOADER',false);
                // Do something with response data
              return response;
              },  (error)=> {
                  // Do something with response error
              return new Promise( (resolve, reject)=> {
                
                throw err;
              });
            });
             ///////////////////////////////////////////////////////////////

        },
    
  
    methods :
    {
        ingresar()
        {
          let me=this;      
          this.$validator.validate().then(result => {
                    if (result) { 
                        this.error=null;
                        this.$controlacceso.post('api/Usuarios/Login', {usuario: this.usuario, password: this.password,  claveP: 'f57e455e-d687-44da-80b5-018ea79eb9a8'})
                        .then(respuesta => {
                            //console.log(respuesta.data);
                            
                            return respuesta.data
                        })
                        .then(data => {        
                          this.$store.dispatch("guardarToken", data.token)
                          ///////////////////////////////////////////////////////////////
                          //  BUSCAR LOS MODULOS DISPONIBLES POR ROL Y PANEL 
                          
                          console.log("LLAMANDO SERVICIOS");
                          
                          let header={"Authorization" : "Bearer " + this.$store.state.token};
                          let configuracion= {headers : header};
                          console.log("GENERANDO EL MENU");




                          me.$controlacceso.get('api/SeccionesRolPanel/GetSeccionesporPanelRol/0cdfa94d-b07e-4de0-aede-6ceac47fd9d4/'+me.$store.state.usuario.rolId,configuracion)
                                              .then(function(response)
                                              {
                                                me.$store.dispatch("guardarMenu", response.data);
                                                //me.$tore.state.menuSecciones= response.data
                                                //me.$store.state.menu.secciones=response.data;
                                                
                                              })
                                              .catch(err => {
                                              console.log("ERROR:")
                                              console.log(err);   
                                      if (err.response.status==400){
                                          me.$notify("No es un usuario válido", 'error')
                                      } else if (err.response.status==401){
                                          me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                          me.e401 = true,
                                          me.showpage= false
                                      } else if (err.response.status==403){
                                          me.$notify("No esta autorizado para ver esta pagina", 'error')
                                          me.e403= true
                                          me.showpage= false
                                      } else if (err.response.status==404){
                                          me.$notify("El recuso no ha sido encontrado", 'error')
                                      }else{
                                          me.$notify('Error al intentar listar los registros!!!','error')
                                      }
                                  });
                                  this.$router.push({ name: 'inicio' })
                          //------------------------------------------------------------------------------------------------------
                          
                        }).catch(err => {
                            this.error=err.response.data;
                            
                        })
                    }
                }) 
          
        }
    }
    
}
</script>