<template>

  <v-app class="app-fontstyle">
    <v-toolbar app class="elevation-2 d-flex align-center" style="box-shadow: none !important; background-color: #641529;" >
      <v-icon @click.stop="drawer = !drawer; updateDrawer()" style="margin-right: 1rem; color: white">menu</v-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span style="letter-spacing: 0.12rem; color: white; font-weight: 300;">SISTEMA CENTENARIO</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip label class="headline font-weight-thin" text-color="white" style="background-color: #641529;">
        <v-icon @click="turnador()" style="margin-right: 1rem;">schedule</v-icon>
        {{ gethora }}
      </v-chip>
      <v-btn @click="logout" class="ma-2">Cerrar sesión</v-btn>
    </v-toolbar>

    <v-content>
      <component v-if="drawer" :is="currentDrawer"/>
      <router-view></router-view>
    </v-content>
    
    <v-divider></v-divider>

    <v-footer dark height="auto" style="background-color: #641529; width: 100%;">
      <div class="white--text" style="background-color: #641529; padding: 2rem; width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
        <div class="white--text subtitle-2 text-md-left font-weight-light"> © Todos los derechos reservados PGJEH 2022-2028</div>
        <div class="white--text subtitle-2 text-md-left font-weight-light"> Version 1.5 compilación 405</div>
      </div>
    </v-footer>
  </v-app>

</template>






<script>

  import moment from "moment";
  import "moment/locale/es";
  import keycloak from './auth/keycloak'
  import umixtaNavDrawer from "@/components/m_umixta/umixtaNavDrawer.vue";
  import ConfiguracionNavDrawer from "@/components/m_configuracion/ConfiguracionNavDrawer.vue";
  import toolsNavDrawer from "@/components/m_tools/toolsNavDrawer.vue";
import { CleanPlugin } from "webpack";
  export default 
  {
    name: "App",

    components: {

    },
    
    data: () => ({drawer: true, horas: 0, minutos: 0, segundos: 0, error: null }),
    
    mounted() {
      this.error=null;
      this.$controlacceso.post('/api/Usuarios/Login',{usuario: this.$usuario, ClaveP: this.$ClaveP})
        .then(response => {
          return response.data
        })
        .then(data => {
          this.$store.dispatch("guardarToken", data.token)
        })
        .catch(error => {
          this.error=error.response.data;
        });
    },

    created() 
    {
      var self = this;
      setInterval(function() {
        self.actualizartiempo();
      }, 1000);
    },

    methods: 
    {
      actualizartiempo() {
        var date = new Date(Date.now());
        this.horas = date.getHours();
        this.minutos = date.getMinutes();
        this.segundos = date.getSeconds();

        this.minutos = this.minutos > 9 ? this.minutos : "0" + this.minutos.toString();
        this.getSeconds = this.segundos > 9 ? this.segundos : "0" + this.segundos.toString();
      },
      turnador() {
        this.$router.push("./turnador");
      },
      logout() {
        console.log("saliendoooooooo del centenario......")
        keycloak.logout({ redirectUri: URI_LOGOUT_KEYCLOAK });
      },
      updateDrawer(){
        this.$store.commit('setDrawer', !this.$store.state.drawer);}
    },

    computed: 
    {
      currentDrawer() {
        const path = this.$route.path

        if (path.startsWith('/umixta')) {
          return umixtaNavDrawer
        }
        else if (path.startsWith('/Configuracion')) {
          return ConfiguracionNavDrawer
        }
        else if (path.startsWith('/tools')) {
          return toolsNavDrawer
        }
        else {
          return null
        }
      },
      gethora() {
        var dia = moment().format("dddd LL");
        function capitalizarFrase(frase) { return frase.split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ") }
        var diaCapitalizado = capitalizarFrase(dia);
        return `${diaCapitalizado} ${this.horas}:${this.minutos}:${this.segundos}`;
      }
    }

  };

</script>






<style>
  .app-fontstyle{
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }
</style>
