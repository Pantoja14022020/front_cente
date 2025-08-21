<template>

  <div class="Index">


    <v-container class="my-5">
      <v-toolbar-title class="headline text-uppercase">
        <span>Distrito {{ distritoC }}</span>
      </v-toolbar-title>

      <v-layout row wrap class="background-panel">
        <v-flex xs12 md4 xl2 class="pa-4" v-for="panel of panels" :key="panel.clave2">
          
          <div v-if="panel.status">
            <div v-if="panel.abrev == 'CONF' || panel.abrev == 'CA' || panel.abrev == 'E' || panel.abrev == 'AR'">
              <v-card class="text-md-center text-xs-center centenarioAdminModuleColor" dark :href="panel.ruta">
                <v-card-text class="text-md-center centenarioAdminModuleIcon">{{panel.nombre}}</v-card-text>
                <v-icon size="70px" contain class="ma-5 centenarioAdminModuleIcon">{{ panel.icono }}</v-icon>
                <v-card-title class="title centenarioAdminModuleAbrevColor font-weight-light">{{ panel.abrev }}</v-card-title>
              </v-card>
            </div>

            <div v-else>
              <v-card class="text-md-center text-xs-center centenarioModuleColor" dark :href="panel.ruta">
                <v-card-text class="text-md-center">{{panel.nombre}}</v-card-text>
                <v-icon size="70px" contain class="ma-5">{{panel.icono}}</v-icon>
                <v-card-title class="title font-weight-light centenarioModuleAbrevColor">{{ panel.abrev }}</v-card-title>
              </v-card>
            </div>
          </div>

          <div v-else>
            <v-card class="text-md-center grey text-xs-center" dark href="/offline">
              <v-card-text class="text-md-center">{{ panel.nombre }}</v-card-text>
              <v-icon color="grey lighten-2" size="70px" contain class="ma-5">{{panel.icono}}</v-icon>
              <v-card-title class="grey darken-1 title font-weight-light ">{{panel.abrev}}</v-card-title>
            </v-card>
          </div>

        </v-flex>
      </v-layout>

      <v-dialog v-model="cargando" max-width="1000px">
        <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
                <v-icon class="grey lighten-2">report</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">AVISO IMPORTANTE</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" class="pa-4" style="background-color: #f5f5f5; border-radius: 8px; color: #000;">
                <p class="font-weight-bold" style="font-size: 25px;">{{ aviso.mensajeAviso }}</p> 
                <v-card-actions>
                <v-spacer />
                <v-btn @click="cargando = false">Cerrar aviso importante</v-btn>
                <v-btn @click="VerPDF(aviso)" v-if="aviso.mostrarPDFAviso && aviso.ligaServidor" class="success">Ver circular</v-btn>
                </v-card-actions>
            </v-form>
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>

  </div>

</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        panel: "",
        panels: [],
        distritoC: "",
        cargando:false,
        aviso:[],
      };
    },
    mounted(){
      if (!localStorage.getItem('pageReloaded')) {
        localStorage.setItem('pageReloaded', 'true');
        window.location.reload();
        return;
      } else {
        localStorage.removeItem('pageReloaded');
      }
    },
    created() {
      
      var token = this.$store.state.token || localStorage.getItem("token");

      if(token)
      {
        console.log(token)

        this.$store.dispatch("guardarToken", token)
        this.$store.dispatch("setLogin", token)

        console.log(token)

        this.Listar();
      }
      else 
      { 
        this.$router.push({ name: 'login' });
      }
      this.ObtenerDistrito();
      this.conprobarAvisos();
    },
    methods: {
      Listar() {
        let me = this;
        if (this.$store.state.usuario && this.$store.state.usuario.idusuario) {
          axios
          .get("api/PanelControls/Permitidos/"+ this.$store.state.usuario.idusuario )
          .then(function(response) {
            me.panels = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        } else {
          console.log('idusuario no está disponible aún');
        }
      },
      ObtenerDistrito() {
        let me = this;
        var distritoA = [];
        var distritoS = [];
        axios
          .get("api/PanelControls/obtenerDistrito")
          .then(function(response) {
            distritoA = response.data;

            distritoA.map(function(x) {
              distritoS.push({ text: x.nombreDistrito, value: x.nombreDistrito });
            });
            //For para concatenar personas
            for (var i = 0; i < distritoS.length; i++) {
              me.distritoC += distritoS[i].value;

              if (i + 1 != distritoS.length) me.distritoC += ",";
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      conprobarAvisos()
      {
        let me = this;

        me.$cat.get("api/Actualizaciones/ComprobarAvisos").then(function(response) 
        {
          me.aviso = response.data;

          if(me.aviso.mostrarAviso == true)
          {
            me.cargando = true;
          }

        })
        .catch(function(error) {
          console.log(error);
        });
      },
      VerPDF (item) {
        var ruta = item.ligaServidor + item.rutaDocumento;
          var tipoArchivo = ruta.slice((ruta.lastIndexOf(".") - 1 >>> 0) + 2)
          if (!(tipoArchivo == "pdf" || tipoArchivo == "doc" || tipoArchivo == "docx")) {
            this.rutaconsulta = ruta
            this.descrip = item.descripcionDocumento
            this.tipo = item.tipoDocumento
            this.dialogimagen = true
          } else {
            var win = window.open(ruta, '_blank')
            // Cambiar el foco al nuevo tab (punto opcional)
            win.focus()
          }
        },
    },
    watch: {
      '$store.state.usuario.idusuario'(newVal, oldVal) {
        if (newVal) {
          this.Listar();
        }
      }
    }
  };
</script>
