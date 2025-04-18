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
                                  <v-icon    size="36" class="centenarioToolBarIcon">help</v-icon>
                              </v-list-tile-action> 
                              <v-list-tile-content>  
                                  <v-list-tile-title class="centenarioMenuAreas"> <p class="body-2 font-weight-bold"><a>Ayuda</a></p> </v-list-tile-title> 
                                  <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Manual de usuario</a></p>  </v-list-tile-sub-title>  
                              </v-list-tile-content> 
                            </v-list-tile>
                            <v-list-tile @click="salir"  >  
                              <v-list-tile-action>
                                  <v-icon   size="36" class="centenarioToolBarIcon">power_settings_new</v-icon>
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
                <v-btn class="mx-3" small outline color="accent">
                  Cerrar
                </v-btn>

              </v-card-actions>

          </v-card>
      </v-menu>
    </v-toolbar>-->
      
      
    <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary"  >
      <div class="text-xl-center text-md-center text-xs-center my-4">
        <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
      </div>

      <v-list dense dark class="pt-0 primary" >
        <template>
          <v-list-tile  :to="{name:'tools'}">
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
          </v-list-tile>
        </template>
        <!--MENU LATERAL-->   
        <template  v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esRecepcion || esFacilitador || esFacilitadorMixto">
        
          <!-- VERSION POR BD-->
          <v-list-group
            v-if="$store.state.menu"
            v-for="seccion in $store.state.menu"
            :key="seccion.idMenuPanel"
          >
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  {{ seccion.descripcion }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="modulo in $store.state.menu.modulos.filter(tmpModulo => tmpModulo.menuPanelId == seccion.idMenuPanel)"
              :key="modulo.IdModuloRol"
              :to="{ name: modulo.ruta === '#' ? '' : modulo.ruta }"
              active-class="secondary"
            >  
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">{{ modulo.icono }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  {{ modulo.descripcion }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <!--FIN DE MENU LATERAL-->
      </v-list>
    </v-navigation-drawer>
    
  <v-content class="grey lighten-4" style="padding: 0;">
      <v-container  fluid  >
        <v-slide-y-transition mode="out-in">
          <v-layout>
    <v-flex>
        <v-card flat color="white" grow  class="d-flex align-content-start flex-wrap" > 
            
              
                    <v-card>
                        
                        <v-card-text> 
                            <v-icon size="400px" color="accent" >record_voice_over</v-icon> 
                        </v-card-text>
                    </v-card>
              
                    
                    <v-card  auto-grow>
                    
                        <v-card-title  class="accent" >
                          <div class="display-2 font-weight-thin" color="blue"><p color="blue">Administración de Registros</p></div>
                        </v-card-title>
                        <v-card-text>
                        <v-list   > 
                              <p class="text-md-left">Este modulo permite.........</p> 
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon color="success">how_to_reg</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Recepción de expedientes.</a></p> </v-list-tile-title> 
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Muestra todas las solicitudes suceptibles a Mecanismos Alternativos de Solución de Controversias en Materia Penal.</a></p>  </v-list-tile-sub-title>  
                                </v-list-tile-content> 
                              </v-list-tile>
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon    color="success">group</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Mis expedientes.</a></p> </v-list-tile-title> 
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Lista los expedientes asignados a al facilitador y notificador</a></p>  </v-list-tile-sub-title>  
                                </v-list-tile-content> 
                              </v-list-tile>
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon    color="success">group</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Seguimiento a expediente..</a></p> </v-list-tile-title> 
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
import Loader from '../../components/m_tools/modulo/_loader'
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
            appName: "Control de acceso",
            Loader:true
        }
      },
    created: function() {  

      let me = this;
        if(me.$store.state.token== null)
        {
          me.$router.push({ name: 'login' })
        }
          
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
              console.log(error)
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
    esDirector(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
    },
    esCoordinador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
    },
    esUSAR(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='USAR';
    },
    esJuridico(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Jurídico';
    },
    esRecepcion(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
    }, 
    esFacilitador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
    },
    esFacilitadorMixto(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador-Mixto';
    },
    esNotificador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Notificador';
    },
    usuario(){
      return this.$store.state.usuario.usuario;
    },
    drawer(){
            return this.$store.drawer 
        }
  },
  created(){
    this.$store.dispatch("autoLoginTools");
  },
  methods:{
    salir(){
      this.$store.state.idExpediente= null; 
      this.$store.state.idEnvio = null;
      this.$store.state.noExpediente =null;
      this.$store.state.tipoModulo=null;
      //this.$store.dispatch("salir");
      this.$controlacceso.get('api/Usuarios/DistrictUser')
        .then(response => {
          window.location.href = response.data.direccion
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