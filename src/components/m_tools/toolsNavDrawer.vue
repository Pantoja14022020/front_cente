

<template>
  <v-navigation-drawer class="primary" permanent app>
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
        <div v-if="$store.state.menu">
          <v-list-group v-for="seccion in $store.state.menu.secciones" :key="seccion.idMenuPanel">
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  {{seccion.descripcion}}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="modulo in $store.state.menu.modulos.filter(tmpModulo=>tmpModulo.menuPanelId==seccion.idMenuPanel)" :key="modulo.IdModuloRol" :to="{ name: 'tools-'+modulo.ruta== '#' ? '' :  'tools-'+modulo.ruta}"  active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">{{modulo.icono}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  {{modulo.descripcion}}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </div>

      </template>
      <!--FIN DE MENU LATERAL-->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Loader from '@/components/m_tools/modulo/_loader.vue'
export default {
  name: 'toolsNavDrawer',
  components:{Loader},
  data () {
    return {
      drawer: true,
      right: null,
      title: 'Vuetify.js',

      data: function() {
        return {
          sideNav: false,
          appName: "Centenario",
          Loader:true,

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
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (err)=> {

          // Do something with response error
          return new Promise( (resolve, reject)=> {
            this.$store.dispatch('logout').then(()=>{
              this.$router.push('/login')
            })
            throw err;
          });
        });

        ///////////////////////////////////////////////////////////////
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
              this.$router.push('/login')
            })
            throw err;
          });
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

  },
  created(){


  },
  methods:{

    cargarMenu(iduser){
      let me=this;
      let header={"Authorization" : "Bearer " + me.$store.state.token};
      let configuracion= {headers : header};
      me.$controlacceso.get('api/SeccionesRolPanel/GetSeccionesporPanelRol/0cdfa94d-b07e-4de0-aede-6ceac47fd9d4/'+iduser,configuracion)
          .then(function(response)
          {
            me.$store.dispatch("guardarMenu", response.data);
            //me.$store.state.menuSecciones= response.data
            //me.$store.state.menu.secciones= response.data;
          })
          .catch(err => {
            console.log("ERROR:")
            console.log(err);
            console.log("usuario",me.$store.state.usuario);

          });
    },
    salir(){
      this.$store.state.idExpediente= null;
      this.$store.state.idEnvio = null;
      this.$store.state.noExpediente =null;
      this.$store.state.tipoModulo=null;
      this.$store.dispatch("salir");
      this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {
            window.location.href = response.data.direccion
          })
    },

  },

  watch: {
    '$store.state.usuario': {
      immediate: true,
      handler(usuario) {
        if (usuario && usuario.rolId) {
          this.cargarMenu(usuario.rolId);
        }
      }
    }
  },
}
</script>
<style scoped>

</style>