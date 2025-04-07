<template>
    <v-app id="app">
   
      <v-toolbar flat app  class="grey lighten-4">
        
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="font-weight-light btn_sisC" @click="salir">SISTEMA CENTENARIO</span>
        </v-toolbar-title> 
        <v-spacer ></v-spacer>  
        <v-btn flat icon> 
          <v-icon>notifications</v-icon> 
        </v-btn>
  
  
        <v-menu offset-y right  flat transition="scale-transition" >
          <template   v-slot:activator="{ on }">
              <v-btn icon v-on="on"   >
                <v-icon>person</v-icon>
              </v-btn>
            </template> 
            <v-card  min-width="300"   class=" mx-auto">
                    <v-toolbar prominent card dark color="grey lighten-4 primary--text">
                      <v-avatar  size="50">
                          <v-icon size="36" class="grey lighten-2 centenarioToolBarIcon">person</v-icon>
                      </v-avatar> 
                      
                      <v-toolbar-title class="body-1  font-weight-medium">{{ usuario }}
                            <p class="caption font-weight-light"><a>{{ email }}</a></p> 
                            
                      </v-toolbar-title> 
     
                      
                    </v-toolbar>
                   
                    <v-card-text>  
                           <v-list >
                              <v-list-tile  >  
                                <v-list-tile-action>
                                    <v-icon size="36" class="centenarioToolBarIcon">build</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title class="centenarioMenuAreas"> <p class="body-2 font-weight-bold"><a>Mi cuenta</a></p> </v-list-tile-title> 
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Configuración de tu cuenta.</a></p>  </v-list-tile-sub-title>  
                                </v-list-tile-content> 
                              </v-list-tile>
                              <v-list-tile    >  
                                <v-list-tile-action>
                                    <v-icon size="36" class="centenarioToolBarIcon">help</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title class="centenarioMenuAreas"> <p class="body-2 font-weight-bold"><a>Ayuda</a></p> </v-list-tile-title> 
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Manual de usuario</a></p>  </v-list-tile-sub-title>  
                                </v-list-tile-content> 
                              </v-list-tile>
                              <v-list-tile @click="salir"  >  
                                <v-list-tile-action>
                                    <v-icon size="36" class="centenarioToolBarIcon">power_settings_new</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title class="centenarioMenuAreas"> <p class="body-2 font-weight-bold"><a>Cerrar sesión</a></p> </v-list-tile-title>   
                                </v-list-tile-content> 
                              </v-list-tile> 
  
                          </v-list> 
                     
                    </v-card-text>
               <v-divider  class="mx-0" ></v-divider>
               <v-card-actions  >
                  <v-spacer ></v-spacer>
                  <v-btn class="mx-3"   small outline color="accent">
                     Cerrar
                  </v-btn>
                   
                 
                </v-card-actions>
  
            </v-card>
        </v-menu>
  
  
      </v-toolbar>
  
      <v-navigation-drawer v-model="drawer" app  class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <img src="@/assets/Logo.png" height="110px" alt=""> 
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template v-if="esAdministrador">
            <v-list-tile  :to="{name:'control-acceso-home'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>  
         
          <template v-if="esAdministrador">
            <v-list-group>
              <v-list-tile slot="activator"> 
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Panel de control
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'control-acceso-panelcontrol'== '#' ? '' :  'control-acceso-panelcontrol'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">view_module</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Configuracion del panel de control
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
  
          <template v-if="esAdministrador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Roles
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'control-acceso-rol'== '#' ? '' :  'control-acceso-rol'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">security</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Roles
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
  
           <template v-if="esAdministrador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Usuarios
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'control-acceso-usuario'== '#' ? '' :  'control-acceso-usuario'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">account_circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                   Gestión de usuarios
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
             
            </v-list-group>
          </template> 
          
          <template v-if="esAdministrador">
            <v-list-group>
              <v-list-tile slot="activator"> 
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Almacenamiento
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'control-acceso-almacenamiento'== '#' ? '' :  'control-acceso-almacenamiento'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">storage</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Administración de discos duros
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
          
        </v-list>
  
      </v-navigation-drawer>
      
     <v-content class="grey lighten-4"   >
        <v-divider></v-divider>
        <v-container fluid   >
          <v-slide-y-transition mode="out-in">
            <router-view/>
          </v-slide-y-transition>
           <loader></loader>
        </v-container> 
      </v-content>
   
    </v-app>
  </template>
  
  <script>
  import axios from 'axios'
  import Loader from '../../components/control_acceso/modulo/_loader'
  export default {
    name: 'App',
    components:{Loader},
    data () {
      return { 
        drawer: true,  
        right: null, 
        title: 'Vuetify.js',
        
        data: function() {
          return {
              sideNav: false,
              appName: "Control de acceso",
              Loader:true
          }
        },
       created: function() {  
            
              axios.interceptors.request.use( (config)=> {
                this.$store.commit('LOADER',true);
                return config;
              }, (error)=> {
                this.$store.commit('LOADER',false);
                return Promise.reject(error);
              });
  
  
              axios.interceptors.response.use((response)=>{
                this.$store.commit('LOADER',false);
                return response;
              },  (err)=> {
                /*return new Promise( (resolve, reject)=> {
                  this.$store.dispatch('logout').then(()=>{
                    this.$router.push('/login')
                  })
                  throw err;
                });*/
                console.log("Error en el response de la API")
              });
              
              
              this.$conf.interceptors.request.use( (config)=> {
                this.$store.commit('LOADER',true); 
                return config;
              }, (error)=> {
                this.$store.commit('LOADER',false);
                return Promise.reject(error);
              });
  
  
              this.$conf.interceptors.response.use((response)=>{
                this.$store.commit('LOADER',false);
                return response;
              },  (error)=> {
                /*return new Promise( (resolve, reject)=> {
                  this.$store.dispatch('logout').then(()=>{
                    this.$router.push('/login')
                  })
                  throw err;
                });*/
                console.log("Error en el response de la API")
              });
  
          },
      }
    },
  
  
  
    computed: { //Me es util
      logueado(){
        return this.$store.state.usuario;
      },
      esAdministrador(){ 
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
      },
      usuario(){
        return this.$store.state.usuario.usuario;
      },
      email(){
        return this.$store.state.usuario.email;
      }
      
    },
  
  
    created(){ //Me es utiol. Cuando se recarga la página, el created se ejcuta, en este caso para verificar si el user ya inicio sesion y entonces recuperar su jwt
      this.$store.dispatch("autoLoginCA");
    },
  
  
    methods:{ //Me es util. Salir, y quitar o borrar el token
      salir(){
        this.$store.dispatch("salir");
        this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {          
            //window.location.href = response.data.direccion
          })
      },
      
    }
  }
  </script>
  <style>
    .btn_sisC:hover {
      cursor: pointer
    }
  </style>