<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular" >Reporte de Agencia sobre la inactividad de las carpetas.</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line hide-details
        />
        <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                      <v-btn class="mx-2" slot="activator" v-on="on" @click="filtrarporagencia()" fab dark small color="success">
                          <v-icon dark>filter_list</v-icon>
                      </v-btn>
                  </template>
                  <span>Filtrar por Modulos</span>
        </v-tooltip>
        <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                      <v-btn class="mx-2" slot="activator" v-on="on" @click="listar()" fab dark small color="primary">
                          <v-icon dark>update</v-icon>
                      </v-btn>
                  </template>
                  <span>Limpiar Filtros</span>
          </v-tooltip>
        <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                      <v-btn class="mx-2" slot="activator" v-on="on" @click="exportToCsv()" fab dark small color="success">
                          <v-icon dark>cloud_download</v-icon>
                      </v-btn>
                  </template>
                  <span>Descargar en Excel</span>
        </v-tooltip>
        <v-spacer />
      </v-toolbar>
      
      <v-data-table
        :headers="headers"
        :items="carpetas"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" color="warning" v-on="on" @click="abrircarpeta(props.item)">
                  folder
                </v-icon>
              </template>
              <span>Abrir carpeta</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.nuc }}</td>
          <td>{{ props.item.ultimo_Registro }}</td>
          <td>{{ props.item.modulo }}</td>
          <td>{{ props.item.agencia }}</td>
          <td>{{ props.item.direccion }}</td>
          <td>{{ props.item.distrito_Procedencia }}</td>
          <td>{{ props.item.distrito_Actual }}</td>
          <td>{{ props.item.fechaReporte }}</td>
          <td>{{ props.item.fecha_del_Ultimo_Registro.substring(8, 10) + " de " + obtenermes(props.item.fecha_del_Ultimo_Registro.substring(5, 7) - 1) + " del " + props.item.fecha_del_Ultimo_Registro.substring(0, 4) }}
          <td>{{ props.item.dias_Inactiva }}</td>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
      <v-dialog v-model="dialogagencia" max-width="1000px">
        <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                        <v-icon class="grey lighten-2">filter_list</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading">Filtrar por Modulo</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                                
                                <v-flex xs12 sm12 md12>  

                                    <v-autocomplete 
                                        name="agencia"
                                        :items="direccionesu"
                                        v-model="direccionu"
                                        v-validate="'required'"
                                        label="Selecciona Agencia:"
                                        :error-messages="errors.collect('agencia')"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click="desactivardialogdireccion()">Cancelar</v-btn>
                            <v-btn @click="filtrarDireccionU()" class="success">Filtrar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
         </v-card>
       </v-dialog>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import VeeValidate from 'vee-validate'
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util'
  import Papa from 'papaparse';

  export default {
    data () {
      return {
        components: {
          n401,
          n403
        },
        showpage: true, 
        e401: false,
        e403: false,
        //-----CLAIM------------------------------------------
        u_iddistrito: this.$store.state.usuario.iddistrito,
        u_distrito: this.$store.state.usuario.distrito,
        u_dirSubPro: this.$store.state.usuario.dirSubProc,
        u_idagencia: this.$store.state.usuario.idagencia,
        u_agencia: this.$store.state.usuario.agencia,
        u_idmoduloservicio: this.$store.state.usuario.idmoduloservicio,
        u_modulo: this.$store.state.usuario.modulo,
        u_idusuario: this.$store.state.usuario.idusuario,
        u_nombre: this.$store.state.usuario.usuario,
        u_clave: this.$store.state.usuario.clave,
        u_rol: this.$store.state.usuario.rol,
        u_puesto: this.$store.state.usuario.puesto,
        u_subproc: this.$store.state.usuario.subProc,
        u_iddsp: this.$store.state.usuario.iddsp,
        //----------------------------------------------------
        dialog: false,
        dialogo: false,
        agencias: [],
        agencia: '',
        modulos: [],
        modulo: '',
        agenciaux: '',
        fechadesde: '',
        fechad: '',
        fechahasta: '',
        fechah: '',
        menu1: false,
        menu2: false,
        nombre: '',
        apellidop: '',
        apellidom: '',
        nuc: '',
        dialogagencia: false,
        direccionu:'',
        direccionesu: [],
        headers: [
          { text: 'Abrir carpeta', value: 'asignacion'},
          { text: 'NUC', value: 'nuc'},
          { text: 'Ultimo Registro', value: 'ultimo_Registro'},
          { text: 'Modulo Actual', value: 'modulo' },
          { text: 'Agencia Actual', value: 'agencia' },
          { text: 'Direccion Actual', value: 'direccion' },
          { text: 'Distrito Origen', value: 'distrito_Procedencia' },
          { text: 'Distrito Actual', value: 'distrito_Actual'},
          { text: 'Fecha de Reporte', value: 'fechaReporte' },
          { text: 'Fecha del Ultimo Registro', value: 'fecha_del_Ultimo_Registro' },
          { text: 'Dias Inactivas', value: 'dias_Inactiva'}
        ],
        search: '',
        rowsPerPageItems: [ 10, 20, 30, 40, 50 ],
        pagination: {
          rowsPerPage: 20
        },
        editedIndex: -1,
        carpetas: [],
        rHechoId: '',
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva agencia' : 'Actualizar agencia'
      },
      formIcon () {
        return this.editedIndex === -1 ? 'add' : 'edit'
      },
      esAMPOAMP () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'AMPO-AMP'
      },
      esDirector () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Director'
      },
      esCoordinador () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Coordinador'
      },
      esAdministrador () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.$store.state.nuc = null
      this.$store.state.ratencionid = null
      this.$store.state.rhechoid = null
      if (this.esAMPOAMP) this.listar()
      if (this.esCoordinador) this.listarmodulos2()
      this.listaragencias()
      axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.$store.commit('LOADER', true)
        return config
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER', false)
        return Promise.reject(error)
      })
      // Add a response interceptor
      axios.interceptors.response.use((response) => {
        this.$store.commit('LOADER', false)
        // Do something with response data
        return response
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER', false)
        return Promise.reject(error)
      })

      this.listarDireccionesUsuario();

    },
    methods: {
      fechainif () {
        if (this.menu1) {
          this.generarfecha2()
          this.$refs.menu1.save(this.fechadesde);
        }
        if (this.menu2) {
            this.generarfecha2()
            this.$refs.menu2.save(this.fechahasta)
        }
      },
      generarfecha2 () {
        if (this.menu1)
          this.fechad = this.fechadesde.substring(8, 10) + " de " + this.obtenermes(this.fechadesde.substring(5, 7) - 1) + " del " + this.fechadesde.substring(0, 4)
        if (this.menu2)
          this.fechah = this.fechahasta.substring(8, 10) + " de " + this.obtenermes(this.fechahasta.substring(5, 7) - 1) + " del " + this.fechahasta.substring(0, 4)
      },
      obtenermes: function (mes) {
        if (mes == 0) return "Enero"
        if (mes == 1) return "Febrero"
        if (mes == 2) return "Marzo"
        if (mes == 3) return "Abril"
        if (mes == 4) return "Mayo"
        if (mes == 5) return "Junio"
        if (mes == 6) return "Julio"
        if (mes == 7) return "Agosto"
        if (mes == 8) return "Septiembre"
        if (mes == 9) return "Octubre"
        if (mes == 10) return "Noviembre"
        if (mes == 11) return "Diciembre"
      },
      limpiarfechad () {
        this.fechad = ""
        this.fechadesde = ""
        this.menu1 = false
      },
      limpiarfechah () {
        this.fechah = ""
        this.fechahasta = ""
        this.menu2 = false
      },
      listar () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RegistroTableroI/ListarD/' + me.u_iddistrito,configuracion).then(function(response) {
          me.carpetas=response.data;
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros!!!', 'error')
          }
        });
      },
      filtrarDireccionU () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RegistroTableroI/ListarDEspecifico/' + me.u_iddistrito + '/' + me.direccionu,configuracion).then(function(response) {
          me.carpetas=response.data;
          me.desactivardialogdireccion();
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros!!!', 'error')
          }
        });
      },
      listarDireccionesUsuario(){
              let me=this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};
              var direccionesArray=[];
              
              me.$conf.get('api/DSPs/ListarPorDistritoId/' + me.u_iddistrito,configuracion).then(function(response){
                  //console.log(response.data)
                  direccionesArray=response.data;
                  direccionesArray.map(function(x){
                      me.direccionesu.push({text: x.nombreSubDir,value:x.idDSP});
                  });

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
      exportToCsv() {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        // Obtén tus datos de la variable me.carpetas
        const data = me.carpetas;

        // Convierte los datos en un arreglo de objetos
        const csvData = data.map(item => ({
          nuc: item.nuc,
          ultimo_Registro: item.ultimo_Registro,
          modulo: item.modulo,
          agencia: item.agencia,
          direccion: item.direccion,
          distrito_Procedencia: item.distrito_Procedencia,
          distrito_Actual: item.distrito_Actual,
          fechaReporte: item.fechaReporte,
          fecha_del_Ultimo_Registro: item.fecha_del_Ultimo_Registro,
          dias_Inactiva: item.dias_Inactiva

          
          // Agrega más campos según tu estructura de datos
        }));
        csvData.forEach(item => {
          item.nuc = item.nuc.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.ultimo_Registro = item.ultimo_Registro.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.modulo = item.modulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.agencia = item.agencia.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.direccion = item.direccion.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.distrito_Procedencia = item.distrito_Procedencia.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.distrito_Actual = item.distrito_Actual.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.fechaReporte = item.fechaReporte.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.fecha_del_Ultimo_Registro = item.fecha_del_Ultimo_Registro.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          item.dias_Inactiva = item.dias_Inactiva;
        });

        // Utiliza Papa.unparse para convertir los datos en formato CSV
        const csv = Papa.unparse(csvData);

        // Crea un Blob con la codificación UTF-8
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        // Crea un objeto URL para el Blob
        const url = URL.createObjectURL(blob);

        // Crea un enlace para descargar el archivo CSV
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'carpetas.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      abrircarpeta (item) {
        this.rHechoId = item.idRHecho
        this.$store.state.nuc= item.nuc
        this.$store.state.ratencionid = item.idRAtencion
        this.$store.state.rhechoid = item.idRHecho
        this.$store.state.distritoCarpeta = item.distrito_Procedencia
        this.$router.push('./detallescarpetatablerod')
      },
      close () {
        this.dialog = false;
        this.limpiar()
      },
      limpiar () {
        this.rHechoId = ""
        this.editedIndex = -1
      },
      filtrarporagencia(){
        this.dialogagencia = true;
      },
      desactivardialogdireccion(){
        this.dialogagencia = false;
        this.direccionu = '';
      },
      listaragencias () {
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          var agenciasarray
          me.$conf.get('api/Agencias/ListarporDSP/' + me.u_iddsp, configuracion).then(function(response) {
            agenciasarray = response.data
            agenciasarray.map(function(x) {
              me.agencias.push({ text: x.nombre, value: x.idAgencia })
            });
          }).catch(err => {
            if (err.response.status == 400) {
                me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                me.e401 = true,
                me.showpage = false
            } else if (err.response.status == 403) {
                me.$notify("No esta autorizado para ver esta pagina", 'error')
                me.e403 = true
                me.showpage = false
            } else if (err.response.status == 404) {
                me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
                me.$notify('Error al intentar listar los registros!!!', 'error')
            }
          });
      },
      listarmodulos () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var moduloarray
        me.modulos = []
        me.modulo = ""
        if (me.agencia != undefined) {
          me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.agencia, configuracion).then(function(response) {
            moduloarray = response.data
            moduloarray.map(function(x) {
              me.modulos.push({ text: x.nombre, value: x.idModuloServicio })
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage = false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta pagina", 'error')
              me.e403 = true
              me.showpage = false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros!!!', 'error')
            }
          });
        }
      },
      listarmodulos2 () {
        let me = this;
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var moduloarray
        me.modulos = []
        me.modulo = ""
        if (me.agencia != undefined) {
          me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.u_idagencia, configuracion).then(function(response) {
            moduloarray = response.data
            moduloarray.map(function(x) {
              me.modulos.push({ text: x.nombre,value: x.idModuloServicio });
            });
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage = false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta pagina", 'error')
              me.e403 = true
              me.showpage = false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros!!!','error')
            }
          });
        }
      },
    }
  }
</script>
