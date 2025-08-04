<template>
  <v-layout row wrap  auto-grow dark v-if="isReady">
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer/>

    <v-flex elevation-0 class="primary">
      <!--<div v-if="showpage">-->
        <v-card
          flat
          color="white"
          grow
          class="d-flex align-content-start flex-wrap primary"
        >
          <v-card class="primary" style="border: 0; box-shadow: none;">
            <v-card-text>
              <v-icon size="400px">account_balance</v-icon>
            </v-card-text>
          </v-card>
          <v-card auto-grow class="primary" style="box-shadow: none;">
            <v-card-title>
              <div class="display-2 font-weight-thin" color="blue">
                <p color="blue">{{ this.titulo }}</p>
              </div>
            </v-card-title>
            <v-card-text class="primary">
              <v-list class="primary">
                <p class="text-md-left">Este modulo permite.........</p>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="white">how_to_reg</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content style="color: white;">
                    <v-list-tile-title class="primary" style="height: 30px;">
                      <p style="font-weight: 300;" class="font-weight-bold">Registro</p>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <p class="font-weight-regular">Texto ...</p>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="white">group</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <p class="font-weight-bold">Orientacion</p>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <p class="font-weight-regular">Texto....</p>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <br />
              </v-list>
              <div />
            </v-card-text>
          </v-card>
        </v-card>
        <v-dialog v-model="dialog" max-width="1200px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="30">
                <v-icon class="grey lighten-2"> calendar_today </v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading">Eventos</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs4 sm4 md4 lg4>
                      <v-data-table
                        :headers="headers1"
                        :items="diactual"
                        hide-actions
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                      >
                        <template slot="items" class="white" slot-scope="props">
                          <td class="caption1">
                            {{
                              props.item.evento +
                              " - " +
                              props.item.fecha.substring(11, 16)
                            }}
                          </td>
                        </template>
                        <template v-slot:no-data>
                          <td class="caption1">Sin eventos</td>
                        </template>
                      </v-data-table>
                    </v-flex>
                    <v-flex xs4 sm4 md4 lg4>
                      <v-data-table
                        :headers="headers2"
                        :items="manana"
                        hide-actions
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                      >
                        <template slot="items" class="white" slot-scope="props">
                          <td class="caption1">
                            {{
                              props.item.evento +
                              " - " +
                              props.item.fecha.substring(11, 16)
                            }}
                          </td>
                        </template>
                        <template v-slot:no-data>
                          <td class="caption1">Sin eventos</td>
                        </template>
                      </v-data-table>
                    </v-flex>
                    <v-flex xs4 sm4 md4 lg4>
                      <v-data-table
                        :headers="headers3"
                        :items="pasadomanana"
                        hide-actions
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                      >
                        <template slot="items" class="white" slot-scope="props">
                          <td class="caption1">
                            {{
                              props.item.evento +
                              " - " +
                              props.item.fecha.substring(11, 16)
                            }}
                          </td>
                        </template>
                        <template v-slot:no-data>
                          <td class="caption1">Sin eventos</td>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click.native="dialog = false">Cerrar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      <!--</div>-->
    </v-flex elevation-0>
  </v-layout>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";
import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import n401 from "@/components/m_umixta/401.vue"
import n403 from "@/components/m_umixta/403.vue";
import { error } from "util";
import UmixtaNavDrawer from "../../components/m_umixta/umixtaNavDrawer.vue";

export default {
  components: {
    n401,
    n403,
    UmixtaNavDrawer
  },
  data: () => ({
    showpage: true,
    url: window.location,
    titulo: "",
    isReady: false,
    e401: false,
    e403: false,
    dialog: true,
    diactual: [],
    manana: [],
    pasadomanana: [],
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    //-----CLAIM------------------------------------------
    headers1: [
      { text: "Cargando", value: "usuario", sortable: false, class: "mytable" },
    ],
    headers2: [
      { text: "Cargando", value: "usuario", sortable: false, class: "mytable" },
    ],
    headers3: [
      { text: "Cargando", value: "usuario", sortable: false, class: "mytable" },
    ],
    //----------------------------------------------------
    u_iddistrito: "",
    u_distrito: "",
    u_dirSubPro: "",
    u_idagencia: "",
    u_agencia: "",
    u_idmoduloservicio: "",
    u_modulo: "",
    u_idusuario: "",
    u_nombre: "",
    u_clave: "",
    u_rol: "",
    u_puesto: "",
    u_email: "",
  }),
  mounted(){
    if (!localStorage.getItem('pageReloaded')) {
      localStorage.setItem('pageReloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('pageReloaded');
    }
  },
  created() {

    if(!localStorage.getItem("token"))
    {
      window.location.href = "/"
    }
    else 
    {
      this.isReady = true;
    }


    const token = this.$store.state.token || localStorage.getItem("token");
    if(token)
    { 
      this.$store.dispatch("guardarToken", token)
      this.$store.dispatch("setLogin", true, token)
    }
    else 
    { 
      this.$router.push({ name: 'login' });
    }

    let me = this;

    me.titulo = "Bienvenido";

    me.u_iddistrito = me.$store.state.usuario.iddistrito;
    me.u_distrito = me.$store.state.usuario.distrito;
    me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
    me.u_idagencia = me.$store.state.usuario.idagencia;
    me.u_agencia = me.$store.state.usuario.agencia;
    me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
    me.u_modulo = me.$store.state.usuario.modulo;
    me.u_idusuario = me.$store.state.usuario.idusuario;
    me.u_nombre = me.$store.state.usuario.usuario;
    me.u_clave = me.$store.state.usuario.clave;
    me.u_rol = me.$store.state.usuario.rol;
    me.u_puesto = me.$store.state.usuario.puesto;
    me.u_email = me.$store.state.usuario.email;
    me.u_claveAgencia = me.$store.state.usuario.claveAQDeriva;

    me.listar(me.u_idmoduloservicio);
    me.mostrarModulo(me.u_claveAgencia);
    me.ValidarToken();

    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        this.$store.commit("LOADER", true);
        return config;
      },
      (error) => {
        // Do something with request error
        this.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        this.$store.commit("LOADER", false);
        // Do something with response data
        return response;
      },
      (error) => {
        // Do something with request error
        this.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );
  },


  methods: {
    obtenermes: function (mes) {
      if (mes == 0) return "Enero";
      if (mes == 1) return "Febrero";
      if (mes == 2) return "Marzo";
      if (mes == 3) return "Abril";
      if (mes == 4) return "Mayo";
      if (mes == 5) return "Junio";
      if (mes == 6) return "Julio";
      if (mes == 7) return "Agosto";
      if (mes == 8) return "Septiembre";
      if (mes == 9) return "Octubre";
      if (mes == 10) return "Noviembre";
      if (mes == 11) return "Diciembre";
    },
    listar(modulo) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$IL
        .get(
          "api/Agenda/ListarTodospormodulo2/" + modulo + "/" + 0,
          configuracion
        )
        .then(function (response) {
          if (response.data.length > 1) {
            response.data.map(function (x) {
              if (x.evento != "ZKR")
                me.diactual.push({ fecha: x.fecha, evento: x.evento });
            });
            me.headers1 = [
              {
                text:
                  me.diactual[0].fecha.substring(8, 10) +
                  " de " +
                  me.obtenermes(me.diactual[0].fecha.substring(5, 7) - 1) +
                  " del " +
                  me.diactual[0].fecha.substring(0, 4),
                value: "usuario",
                sortable: false,
                class: "mytable",
              },
            ];
            me.$alert(
              "Notificación",
              "Revisa tu agenda, tienes eventos programados para hoy.",
              function () {}
            );
          } else me.headers1 = [{ text: response.data[0].fecha.substring(8, 10) + " de " + me.obtenermes(response.data[0].fecha.substring(5, 7) - 1) + " del " + response.data[0].fecha.substring(0, 4), value: "usuario", sortable: false, class: "mytable" }];

          me.$IL
            .get(
              "api/Agenda/ListarTodospormodulo2/" + modulo + "/" + 1,
              configuracion
            )
            .then(function (response) {
              if (response.data.length > 1) {
                response.data.map(function (x) {
                  if (x.evento != "ZKR")
                    me.manana.push({ fecha: x.fecha, evento: x.evento });
                });

                me.headers2 = [
                  {
                    text:
                      me.manana[0].fecha.substring(8, 10) +
                      " de " +
                      me.obtenermes(me.manana[0].fecha.substring(5, 7) - 1) +
                      " del " +
                      me.manana[0].fecha.substring(0, 4),
                    value: "usuario",
                    sortable: false,
                    class: "mytable",
                  },
                ];
              } else me.headers2 = [{ text: response.data[0].fecha.substring(8, 10) + " de " + me.obtenermes(response.data[0].fecha.substring(5, 7) - 1) + " del " + response.data[0].fecha.substring(0, 4), value: "usuario", sortable: false, class: "mytable" }];

              me.$IL
                .get(
                  "api/Agenda/ListarTodospormodulo2/" + modulo + "/" + 2,
                  configuracion
                )
                .then(function (response) {
                  if (response.data.length > 1) {
                    response.data.map(function (x) {
                      if (x.evento != "ZKR")
                        me.pasadomanana.push({
                          fecha: x.fecha,
                          evento: x.evento,
                        });
                    });

                    me.headers3 = [
                      {
                        text:
                          me.pasadomanana[0].fecha.substring(8, 10) +
                          " de " +
                          me.obtenermes(
                            me.pasadomanana[0].fecha.substring(5, 7) - 1
                          ) +
                          " del " +
                          me.pasadomanana[0].fecha.substring(0, 4),
                        value: "usuario",
                        sortable: false,
                        class: "mytable",
                      },
                    ];
                  } else me.headers3 = [{ text: response.data[0].fecha.substring(8, 10) + " de " + me.obtenermes(response.data[0].fecha.substring(5, 7) - 1) + " del " + response.data[0].fecha.substring(0, 4), value: "usuario", sortable: false, class: "mytable" }];

                  //API PARA MOSTRAR EL MODULO AL QUE PERTENECE

                  //
                })
                .catch((err) => {
                  if (err.response.status == 400) {
                    me.$notify("No es un usuario válido", "error");
                  } else if (err.response.status == 401) {
                    me.$notify(
                      "Por favor inicie sesion para poder navegar en la aplicacion",
                      "error"
                    );
                    (this.e401 = true), (this.showpage = false);
                  } else if (err.response.status == 403) {
                    me.$notify(
                      "No esta autorizado para ver esta pagina",
                      "error"
                    );
                    this.e403 = true;
                    this.showpage = false;
                  } else if (err.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", "error");
                  } else {
                    me.$notify(
                      "Error al intentar leer la lista roles!!!",
                      "error"
                    );
                  }
                });
            })
            .catch((err) => {
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", "error");
              } else if (err.response.status == 401) {
                me.$notify(
                  "Por favor inicie sesion para poder navegar en la aplicacion",
                  "error"
                );
                (this.e401 = true), (this.showpage = false);
              } else if (err.response.status == 403) {
                me.$notify("No esta autorizado para ver esta pagina", "error");
                this.e403 = true;
                this.showpage = false;
              } else if (err.response.status == 404) {
                me.$notify("El recuso no ha sido encontrado", "error");
              } else {
                me.$notify("Error al intentar leer la lista roles!!!", "error");
              }
            });
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (this.e401 = true), (this.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            this.e403 = true;
            this.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar leer la lista roles!!!", "error");
          }
        });
    },
    mostrarModulo(ClaveA) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$controlacceso
        .get("api/Usuarios/mostrarModuloUsuario/" + ClaveA, configuracion)
        .then(function (response) {
          me.titulo = response.data.nombreModulo;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
  },
  async ValidarToken() {
        let header = { Authorization: "Bearer " + this.$store.state.token };
        let configuracion = { headers: header };
        try{
          await this.$controlacceso.get('api/Usuarios/ValidarToken2', configuracion);
        }
        catch(err){
          this.$store.dispatch("salir");
          this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {          
          window.location.href = response.data.direccion
          })
        }
      },
};
</script>

<style>
.caption1 {
  font-size: 14px !important;
  text-align: center !important;
  padding: 0 0px !important;
  height: 20px !important;
  border-left: 1px solid #aaaaaa;
  border-top: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;
  border-right: 1px solid #aaaaaa;
}

.mytable {
  font-size: 14px !important;
  text-align: center !important;
  padding: 0 0px !important;
  height: 20px !important;
  border-left: 1px solid #aaaaaa;
  border-top: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;
  border-right: 1px solid #aaaaaa;
}
</style>
