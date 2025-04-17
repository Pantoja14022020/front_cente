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
        
        
      <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <img src="@/assets/Logo.png" height="110px" alt=""> 
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template>
            <v-list-tile  :to="{name:'servicios-periciales'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>          
  
        <template v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Asignacion de perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esDirector || esOficialiapartes" :to="{ name: 'sp-bandejaentrada'== '#' ? '' :  'sp-bandejaentrada'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada oficialia
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-bandejaentradaarea'== '#' ? '' :  'sp-bandejaentradaarea'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada area
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-radioarea'== '#' ? '' :  'sp-radioarea'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de Radio
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  v-if="esAdministrador || esCordinador || esDirector" :to="{ name: 'sp-reasignar'== '#' ? '' :  'sp-reasignar'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">cached</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                   Reasignar Perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>     
            </v-list-group>
      </template>
  
  
  
       <template v-if="esAdministrador || esPerito || esOficialiapartes || esCordinador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esPerito" :to="{ name: 'sp-bdeperito'== '#' ? '' :  'sp-bdeperito'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  v-if="esAdministrador || esPerito || esCordinador" :to="{ name: 'sp-recepcionindicio'== '#' ? '' :  'sp-recepcionindicio'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">transit_enterexit</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Recepcíon de Indicio
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  :to="{ name: 'sp-entregainforme'== '#' ? '' :  'sp-entregainforme'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">toc</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Entrega de Informe
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
          
            </v-list-group>
        </template>
  
        <template v-if="esAdministrador || esCordinador || esDirector" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Estadísticas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasmes'== '#' ? '' :  'sp-estadisticasmes'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content  >
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>    
              <v-list-tile :to="{ name: 'sp-estadisticas'== '#' ? '' :  'sp-estadisticas'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasan'== '#' ? '' :  'sp-estadisticasan'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>                
            </v-list-group>
        </template>
  
  
        <template v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Asignacion de perito foraneas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esDirector || esOficialiapartes" :to="{ name: 'sp-bandejaentradaf'== '#' ? '' :  'sp-bandejaentradaf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada oficialia
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-bandejaentradaareaf'== '#' ? '' :  'sp-bandejaentradaareaf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada area
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-radioareaf'== '#' ? '' :  'sp-radioareaf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de Radio
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  v-if="esAdministrador || esCordinador || esDirector" :to="{ name: 'sp-reasignarf'== '#' ? '' :  'sp-reasignarf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">cached</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                   Reasignar Perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>     
            </v-list-group>
      </template>
  
  
  
       <template v-if="esAdministrador || esPerito || esOficialiapartes || esCordinador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Perito foraneas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esPerito" :to="{ name: 'sp-bdeperitof'== '#' ? '' :  'sp-bdeperitof'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  :to="{ name: 'sp-entregainformef'== '#' ? '' :  'sp-entregainformef'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">toc</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Entrega de Informe
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
          
            </v-list-group>
        </template>
  
        <template v-if="esAdministrador || esCordinador || esDirector" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Estadísticas foraneas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasmesf'== '#' ? '' :  'sp-estadisticasmesf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content  >
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>    
              <v-list-tile :to="{ name: 'sp-estadisticasf'== '#' ? '' :  'sp-estadisticasf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasanf'== '#' ? '' :  'sp-estadisticasanf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>                
            </v-list-group>
        </template>
        
  
      <template v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Asignación de Servicio Médico
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" :to="{ name: 'sp-assolconregistro'== '#' ? '' :  'sp-assolconregistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">input</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes con registro 
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" :to="{ name: 'sp-assolsinRegistro'== '#' ? '' :  'sp-assolsinRegistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">input</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes sin registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
            </v-list-group>
      </template>
  
      <template v-if="(esAdministrador || esPerito)&& modulointernof" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Bandeja de Entrada Servicios Médicos
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esPerito" :to="{ name: 'sp-bansolconregistro'== '#' ? '' :  'sp-bansolconregistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes con registro 
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esPerito" :to="{ name: 'sp-bansolsinregistro'== '#' ? '' :  'sp-bansolsinregistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes sin registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
            </v-list-group>
      </template>
  
      <v-list-tile
            v-if="
              esDirector
            "
            :to="{ name: 'sp-rotacionpersonal' == '#' ? '' : 'sp-rotacionpersonal' }"
            active-class="secondary"
          >
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">groups</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="centenarioMenuModules">
                Rotación de Personal
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>   
  
      </v-list>
  
        
  
  
      </v-navigation-drawer>
      
     <v-content class="grey lighten-4" style="padding: 0;"  >
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout>
      <v-flex>
          <v-card flat color="white" grow  class="d-flex align-content-start flex-wrap" > 
            <v-card>
                <v-card-text> 
                    <v-icon size="400px" color="accent">lock_open</v-icon> 
                </v-card-text>
            </v-card>  
                       <v-card  auto-grow>
                       
                          <v-card-title  class="accent" >
                             <div class="display-2 font-weight-thin" color="blue"><p color="blue">Modulo de Servicios Periciales</p></div>
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
                                      <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Orientacion</a></p> </v-list-tile-title> 
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
  import Loader from '../../components/m_sp/modulo/_loader'
  export default {
    name: 'App',
    components:{Loader},
    data () {
      return { 
        //drawer: true,  
        right: null, 
        title: 'Vuetify.js',
        modulointerno:false, 
        
        data: function() {
          return {
              sideNav: false,
              appName: "Control de acceso",
              Loader:true,
              
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
                    console.log(err)
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
      esCordinador(){ 
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
      },
      esPerito(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Perito';
      },
      esDirector(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
      },
      esOficialiapartes(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Oficialia de partes';
      },
      usuario(){
        return this.$store.state.usuario.usuario;
      },
      email(){
        return this.$store.state.usuario.email;
      },    
      modulointernof(){
        //console.log("entre2")
        //console.log(this.modulointerno)
        return this.modulointerno
      },
      drawer(){
            return this.$store.drawer 
        }
    },
    created(){
      this.$store.dispatch("autoLoginSP");
      this.esMedicosf();
    },
    methods:{
      salir(){
        //this.$store.dispatch("salir");
        this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {          
            window.location.href = response.data.direccion
          })
      },
      esMedicosf(){
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.$controlacceso.get('api/Usuarios/Modulointerno/'+ me.$store.state.usuario.idusuario,configuracion).then(function(response){
          me.modulointerno = response.data.status;
        }).catch(err => { 
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
      },
      
  
      
    }
  }
  </script>
  <style>
  .btn_sisC:hover {
    cursor: pointer
  }
  </style>
  
  