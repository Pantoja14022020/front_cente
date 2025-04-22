import alertify from 'alertifyjs'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import n401 from '../../components/m_tools/401.vue'
import n403 from '../../components/m_tools/403.vue'
import formularioBorrado from '../../components/m_tools/formularioModificacion.vue'
import { copiarCarpeta } from './copiarCarpeta'

export default {
  components:
  {
    n401,
    n403,
    'formularioBorrado': formularioBorrado,
  },
  data() {
    return {

      //INFO ORGANIZADA Y QUE SE QUE HACE
      e401: false,
      e403: false,

      catalogos:
      {
        agencias: [],
        modulos: [],
        distritos: [],
        dsps:[],
      },

      sesionInfo:
      {
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
      },
      dialogos:
      {
        opcionesBusqueda: false,
        borradoNuc: false,
        modalClonarCarpeta: false,

      },
      infoBusqueda:
      {
        nucg: '',
        agencia: '',
        nombre: '',
        apellidop: '',
        apellidom: '',
        modulo: '',
        fechadesde: '',
        fechahasta: '',
        distrito: '',
        dsp:'',
      },
      infoMod:
      {
        tablaAMod: '',
      },
      arreglarCarpeta:
      {
        agenciaidAC: '',
        moduloidAC: '',


      },
      // INFO REVUELTA
      showpage: true,
      //----------------------------------------------------
      dialog: false,



      agenciaux: '',

      fechad: '',

      fechah: '',
      menu1: false,
      menu2: false,


      headers: [
        { text: 'Opciones', value: 'asignacion', sortable: false },
        { text: 'NUC', value: 'nuc', sortable: false },
        { text: '1ra persona registrada', value: 'victima', sortable: false },
        { text: 'Atendido por', value: 'atendidopor' },
        { text: 'Distrito Actual', value: 'distritoactual' },
        { text: 'Dirección o Subprocuraduria Actual', value: 'dspactual' },
        { text: 'Agencia Actual', value: 'agenciaactual' },   
        { text: 'Modulo Actual', value: 'moduloactual' },       
        { text: 'Fecha de NUC', value: 'fechaelevaNuc', sortable: false }
      ],

      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
        rowsPerPage: 20
      },
      editedIndex: -1,
      carpetas: [],
      rHechoId: '',
      rAtencionid: '',
      nucgc: '',
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva agencia' : 'Actualizar agencia'
    },
    formIcon() {
      return this.editedIndex === -1 ? 'add' : 'edit'
    },
    esAMPOAMP() {
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'AMPO-AMP'
    },
    esDirector() {
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Director'
    },
    esCoordinador() {
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Coordinador'
    },
    esAdministrador() {
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.$store.state.nuc = null
    this.$store.state.ratencionid = null
    this.$store.state.rhechoid = null
    this.infoMod.tablaAMod = '';
    this.listardistritos();
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
  },
  methods: {
    fechainif() {
      if (this.menu1) {
        this.generarfecha2()
        this.$refs.menu1.save(this.infoBusqueda.fechadesde);
      }
      if (this.menu2) {
        this.generarfecha2()
        this.$refs.menu2.save(this.infoBusqueda.fechahasta)
      }
    },
    generarfecha2() {
      if (this.menu1)
        this.fechad = this.infoBusqueda.fechadesde.substring(8, 10) + " de " + this.obtenermes(this.infoBusqueda.fechadesde.substring(5, 7) - 1) + " del " + this.infoBusqueda.fechadesde.substring(0, 4)
      if (this.menu2)
        this.fechah = this.infoBusqueda.fechahasta.substring(8, 10) + " de " + this.obtenermes(this.infoBusqueda.fechahasta.substring(5, 7) - 1) + " del " + this.infoBusqueda.fechahasta.substring(0, 4)
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
    limpiarfechad() {
      this.fechad = ""
      this.fechadesde = ""
      this.menu1 = false
    },
    limpiarfechah() {
      this.fechah = ""
      this.fechahasta = ""
      this.menu2 = false
    },
    listar() {

      let me = this;


      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      me.dialogos.opcionesBusqueda = false;
      me.$CAT.post('api/RHechoes/BuscarCarpetasEnServidor/',
        {
          'distrito': '00000000-0000-0000-0000-000000000000',
          'nucg': me.infoBusqueda.nucg,

        }, configuracion).
        then(function (response) {
          me.carpetas = response.data;
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
    solicitarBorrado(info) {

      let me = this;
      console.log("Preparado para llamar servicio de borrado");
      console.log(info);
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      me.$CAT.post('api/Nucs/Eliminar/',
        {
          'infoBorrado': info.idBorrar,
          'tabla': info.tabla,
          'solicitante': info.solicitante,
          'razon': info.razon,
          'usuario': me.sesionInfo.u_idusuario,
        }, configuracion).
        then(function (response) {
          //me.$alertify.success(exito);
          var titulo = '';
          if (response.data.res == 'Error')
            titulo = response.data.res;
          else
            titulo = "Respuesta";


          me.$alert(titulo, response.data.men);
          me.listar();

          //me.carpetas=response.data;
        }).catch(err => {

          console.log("error puro:");
          console.log(err);

          if (err.response.status == 402) {

            console.log(err.response);

            console.log(err.response.data.detail);
            //alertify.success('Ready!');
            me.$alert("Error", "Error al ejecutar el proceso<br>" + err.response.data.detail + "<br>" + ((err.response.data.version == undefined) ? '' : err.response.data.version));

          }

          else if (err.response.status == 400) {
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
          }
          else {
            me.$notify('Error al intentar listar los registros!!!', 'error')
          }
        });

    },

    seleccionarDistrito(item) {
      let me = this;
      this.rHechoId = item.rHechoId;
      this.rAtencionid = item.rAtencionId;
      this.nucgc = item.nuc;

      me.arreglarCarpeta.agenciaidAC = item.agenciaid;
      me.arreglarCarpeta.moduloidAC = item.idModuloServicio;

      me.dialogos.modalClonarCarpeta = true;
    },

    mostrarFormularioBorrado(item) {
      console.log("ENVIANDO FORMULARIO DE BORRADO 2");

      //this.dialogos.borradoNuc=true;
      this.infoMod.tablaAMod = 'NUC,RAC,CAT_RHECHO,CAT_RATENCON';
      this.$refs.formBorrado.mostrar({
        'rHechoId': item.rHechoId,
        'rAtencionId': item.rAtencionId,
        'registroId': item.nucId
      });

    },


    close() {
      this.dialog = false;
      this.limpiar()
    },
    limpiar() {
      let me = this;
      me.rHechoId = "";
      me.infoBusqueda.distrito = "";
      me.infoBusqueda.dsp = "";
      me.infoBusqueda.agencia = "";
      me.infoBusqueda.modulo = "";
      me.dialogos.modalClonarCarpeta = false;
      
    },
    listardistritos() {
      var distritoarray = [];
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.catalogos.distritos = [];
      me.$conf.get('api/Distritoes/Listar', configuracion).then(function (response) {
        distritoarray = response.data;
        distritoarray.map(function (x) {
          me.catalogos.distritos.push({ text: x.nombre, value: x.idDistrito });
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
    listarDirecciones() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      var direcionesarray = [];
      me.catalogos.dsps = [];
      if (me.infoBusqueda.distrito != undefined) {
      me.$conf.get('api/DSPs/ListarPorDistritoId/' + me.infoBusqueda.distrito, configuracion).then(function (response) {
        direcionesarray = response.data
        direcionesarray.map(function (x) {
          me.catalogos.dsps.push({ text: x.nombreSubDir, value: x.idDSP })
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
    }
    },
    listaragencias() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      var agenciasarray = [];
      me.catalogos.agencias = [];
      if (me.infoBusqueda.dsp != undefined) {
        me.$conf.get('api/Agencias/ListarporDSP/' + me.infoBusqueda.dsp, configuracion).then(function (response) {
          agenciasarray = response.data
          agenciasarray.map(function (x) {
            me.catalogos.agencias.push({ text: x.nombre, value: x.idAgencia })
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
      }
    },
    listarmodulos() {
      let me = this
      console.log("Listar Modulos(1)");
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      var moduloarray;
      me.catalogos.modulos = [];
      me.modulo = ""
      if (me.infoBusqueda.agencia != undefined) {
        me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.infoBusqueda.agencia, configuracion).then(function (response) {
          moduloarray = response.data
          moduloarray.map(function (x) {
            me.catalogos.modulos.push({ text: x.nombre, value: x.idModuloServicio })
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
    guardar() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      
      me.$CAT.put('api/RHechoes/ActualizarModuloyAgencia', {

          'IdRHecho': this.rHechoId,
          'moduloServicioId': me.infoBusqueda.modulo,
          'agenciaId': me.infoBusqueda.agencia

      }, configuracion).then(function (response) {

        

        const services = [
            //PONER EL DE COPIADO DE PERSONADESAP

            'api/Racs/Clonar'
            , 'api/RAtencions/Clonar'
            , 'api/Nucs/Clonar'
            , 'api/RHechoes/Clonar'
            , 'api/RAPs/Clonar'
            , 'api/AmpDecs/Clonar'
            , 'api/RDHs/Clonar'
            , 'api/Representante/Clonar'
            , 'api/Turnoes/Clonar'
            , 'api/RemisionesUI/Clonar'
            , 'api/Historialcarpeta/Clonar'//LAS ORIGINALERS
            , 'api/RActosInvestigacion/Clonar'
            , 'api/RBitacoras/Clonar'
            , 'api/RDiligencias/Clonar'
            , 'api/Oficios/Clonar'
            , 'api/C5i/Clonar'
            , 'api/PersonaDesap/Clonar'
            , 'api/VehiculoDesaparicionPersona/Clonar'
            , 'api/DireccionDelitoes/Clonar'
            , 'api/Vehiculos/Clonar'


        ];
        const serviceNames = [
            'RAC'
            , 'Atencion'
            , 'NUC'
            , 'Hecho'
            , 'RAP'
            , 'Ampliación de Declaración'
            , 'Delitos'
            , 'Representante'
            , 'Turnos'
            , 'Remisiones'
            , 'Historial de Carpeta'
            , 'Actos de Investigación'
            , 'Bitacoras'
            , 'Diligencias'
            , 'Oficios'
            , 'Formato C5i'
            , 'Cedula de Personas Desaparecidas'
            , 'Vehículos Relacionados con desaparición de personas'
            , 'Direccion del Delito'
            , 'Registro de Vehiculos'
        ];
        console.log("--------TAMAÑO DEL ARRAY:" + services.length);
        console.log("SERVICIOS:");
        console.log(services);
        copiarCarpeta(configuracion, services, serviceNames, 0, me.nucgc, me.rHechoId, me.rAtencionid, me.infoBusqueda.distrito,me.arreglarCarpeta.agenciaidAC,me.arreglarCarpeta.moduloidAC).then(
            function (response) {

              alert("Proceso terminado");
              me.limpiar();

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
                    me.$notify('Error al intentar crear el  registro!!!', 'error')
                }
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
              me.$notify('Error al intentar crear el  registro!!!', 'error')
          }
      });
    }
    
  }
}