<template>
    <v-app id="app">
   
      <!--<v-toolbar flat app  class="grey lighten-4">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="font-weight-light btn_sisC" @click="salir">SISTEMA CENTENARIO</span>
        </v-toolbar-title> 
        <v-spacer ></v-spacer>  
        
         <v-btn  v-if="logueado" flat icon> 
          <v-icon>notifications</v-icon> 
        </v-btn>
        <v-btn :to="{name: 'login'}" v-else flat  icon >
          <v-icon> vpn_key</v-icon>  
        </v-btn> 
        <v-menu offset-y right  v-if="logueado" flat transition="scale-transition" >
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
      </v-toolbar>-->
        
        
      <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <img src="@/assets/Logo.png" height="110px" alt=""> 
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template>
            <v-list-tile  :to="{name:'mcaptura'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>  
            
          
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                    Carpetas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-registro'== '#' ? '' :  'mcaptura-registro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-listacarpetas'== '#' ? '' :  'mcaptura-listacarpetas'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">view_list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Lista de carpetas asignadas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Seguimiento a carpeta
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-informaciongeneral'== '#' ? '' :  'mcaptura-informaciongeneral'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Información general.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-victimaimputado'== '#' ? '' :  'mcaptura-victimaimputado'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">face</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Víctima(s) directa, indirecta, testigo y/o imputado.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-delito'== '#' ? '' :  'mcaptura-delito'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Delito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-vehiculo'== '#' ? '' :  'mcaptura-vehiculo'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">commute</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Vehiculo
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esFacilitador" :to="{ name: 'mcaptura-justiciarestaurativa'== '#' ? '' :  'mcaptura-justiciarestaurativa'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">event_seat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Justicia restaurativa
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidasproteccion'== '#' ? '' :  'mcaptura-medidasproteccion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">description</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas de protección
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidascautelares'== '#' ? '' :  'mcaptura-medidascautelares'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">label</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas cautelares
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-resolucion'== '#' ? '' :  'mcaptura-resolucion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">verified_user</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Resolución
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template>
        
        </v-list>
      </v-navigation-drawer>
      
      <v-content class="grey lighten-4" style="padding: 0;">
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout>
                <v-flex>
                    <v-card color="white" grow  class="d-flex align-content-start" > 
                        
                            
                                <v-card style="width: 40%;">
                                    
                                    <v-card-text> 
                                        <v-icon size="400px" color="accent"    >account_balance</v-icon> 
                                    </v-card-text>
                                </v-card>
                            
                                
                                <v-card  style="width: 60%;">
                                
                                    <v-card-title  class="accent" >
                                        <div class="display-2 font-weight-thin" color="blue"><p color="blue">Modulo de Captura</p></div>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-list   > 
                                            <p class="text-md-left">Este modulo permite.........</p> 
                                            <v-list-tile>  
                                            <v-list-tile-action>
                                                <v-icon color="success">how_to_reg</v-icon>
                                            </v-list-tile-action> 
                                            <v-list-tile-content>  
                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Registro</a></p> </v-list-tile-title> 
                                                <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Texto.....</a></p>  </v-list-tile-sub-title>  
                                            </v-list-tile-content> 
                                            </v-list-tile>
                                            <v-list-tile>  
                                            <v-list-tile-action>
                                                <v-icon    color="success">group</v-icon>
                                            </v-list-tile-action> 
                                            <v-list-tile-content>  
                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estadística</a></p> </v-list-tile-title> 
                                                <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Texto.....</a></p>  </v-list-tile-sub-title>  
                                            </v-list-tile-content> 
                                            </v-list-tile>
                                        
                                            <br>
                                            
                                        </v-list> 
                                        <div>
                                    
                                        
                                        </div>
                                        
                                    </v-card-text>
                                </v-card>
                        
                    </v-card>
                </v-flex>
            </v-layout>
            <router-view/>
          </v-slide-y-transition>
          <loader></loader>
        </v-container>
    </v-content>
   
    </v-app>
  </template>
  
  <script> 
  import Loader from '../../components/m_captura/modulo/_loader.vue'
  export default {
    name: 'App',
    components:{Loader},
    data () {
      return { 
        //drawer: true,  
        right: null, 
        title: 'Vuetify.js',
        
        data: function() {
          return {
              sideNav: false,
              appName: "Centro de atencion temprana",
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
                console.log(err)
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
                console.log(error)
                console.log("Error en el response de la API")
            });
          },
      }
    },
     computed: {
        logueado(){
          return this.$store.state.usuario;
        },
        esAdministrador(){ 
          return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
        },
        esRecepcion(){ 
          return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
        },
        esAMPOAMP(){
          return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP';
        },
        esDirector(){
          return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
        },
        esCoordinador(){
          return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
        },
        esAmpoMixto(){
          return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP Mixto';
        },
        esFacilitador(){ 
          return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
        },
        usuario(){
          return this.$store.state.usuario.usuario;
        },
        email(){
          return this.$store.state.usuario.email;
        },
        drawer(){
            return this.$store.drawer 
        }
    },
    created(){
      this.$store.dispatch("autoLoginMC");
    },
    methods:{
      salir(){
        //this.$store.dispatch("salir");
        this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {          
            window.location.href = response.data.direccion
        })
      }
    }
  }
  </script>
  <style>
  .btn_sisC:hover {
    cursor: pointer
  }
  </style>