import axios from 'axios'
import VeeValidate from 'vee-validate'
import n401 from '../../components/m_tools/401.vue'
import n403 from '../../components/m_tools/403.vue'
import formularioModificacion from '../../components/m_tools/formularioModificacion.vue'

export default {
    components: 
      {
        n401,
        n403,
        'formularioModificacion':formularioModificacion,
      },
  data () {
    return {
      
      //INFO ORGANIZADA Y QUE SE QUE HACE
      e401: false,
      e403: false,

      catalogos:
      {
        agencias: [],
        modulos: [],
      },
      infoCarpeta:
      {
        rAtencionId:'',
        rHechoId:'', 
        nuc:'',
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
        borradoNuc:false,
      },
      infoBusqueda:
      { 
        nucg: '',
        agencia: '',
        nombre:'',
        apellidop:'',
        apellidom:'',
        modulo: '',
        fechadesde: '',
        fechahasta: '',
      },
      infoMod:
      {
        tablaAMod:'',
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
        { text: 'Tipo', value: 'tipo', sortable: true  },
        { text: 'Agencia', value: 'agencia', sortable: true  },
        { text: 'Persona', value: 'nombrePersona', sortable: true  },
        { text: 'Fecha', value: 'fechasis', sortable: true  },
        { text: 'Opciones', value: 'opciones', sortable: false }
    ],
      
      rowsPerPageItems: [ 10, 20, 30, 40, 50 ],
      pagination: {
        rowsPerPage: 20
      },
      editedIndex: -1,
      delitos: [],
      rHechoId: '',
    }
  },
  mounted(){
      if (!localStorage.getItem('pageReloaded')) {
        localStorage.setItem('pageReloaded', 'true');
        window.location.reload();
      } else {
        localStorage.removeItem('pageReloaded');
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
  created () 
  {
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
    
    me.infoCarpeta.rHechoId=  me.$store.state.rhechoid;
    me.infoCarpeta.rAtencionId = me.$store.state.ratencionid
    me.infoCarpeta.nuc = me.$store.state.nuc;
    me.infoMod.tablaAMod='';
    if(me.infoCarpeta.rHechoId == null)
    {
      me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta ahi abra la carpeta que usted necesite!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){ 

                            me.$router.push('./tools-nuc')
                    });
    }
    else
    {
      me.listaragencias();
      me.listar();
      axios.interceptors.request.use((config) => {
        // Do something before request is sent
        me.$store.commit('LOADER', true)
        return config
      }, (error) => {
        // Do something with request error
        me.$store.commit('LOADER', false)
        return Promise.reject(error)
      })
      // Add a response interceptor
      axios.interceptors.response.use((response) => {
        me.$store.commit('LOADER', false)
        // Do something with response data
        return response
      }, (error) => {
        // Do something with request error
        me.$store.commit('LOADER', false)
        return Promise.reject(error)
      })
    }
  },
  methods: {
    fechainif () {
      if (this.menu1) {
        this.generarfecha2()
        this.$refs.menu1.save(this.infoBusqueda.fechadesde);
      }
      if (this.menu2) {
          this.generarfecha2()
          this.$refs.menu2.save(this.infoBusqueda.fechahasta)
      }
    },
    generarfecha2 () {
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
    listar(){
      let me=this;
      let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.$CAT.get('api/RBitacoras/ListarPorHecho/'+ me.infoCarpeta.rHechoId,configuracion).then(function(response){
                // console.log(response);
                me.delitos = response.data;
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
    
    solicitarModificacion(info)
    {
      
      let me = this;
      console.log("Preparado para llamar servicio de borrado");
      console.log(info);
      let header = { "Authorization" : "Bearer " + this.$store.state.token }
      let configuracion = { headers : header }
      me.$CAT.post('api/'+info.servicio ,
      { 
        'infoBorrado':info.idBorrar,
        'tabla':info.tabla,
        'solicitante':info.solicitante,
        'razon':info.razon,
        'usuario':me.sesionInfo.u_idusuario,
      },configuracion).
      then(function(response) 
      {
        var titulo=''; 
        if(response.data.res=='Error')
          titulo=response.data.res;
        else
          titulo="Respuesta";
        me.$alert(titulo,response.data.men);
        me.listar();

        //me.carpetas=response.data;
      }).catch(err => {

        if (err.response.status == 402) 
        {
            me.$alert("Error", "Error al ejecutar el proceso<br>"+err.response.data.detail+"<br>"+((err.response.data.version==undefined)?'':err.response.data.version) );
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
        } else {
          me.$notify('Error al intentar listar los registros!!!', 'error')
        }
      });
    },

    abrircarpeta (item) 
    {
      this.rHechoId = item.rHechoId
      this.$store.state.nuc= item.nuc
      this.$store.state.ratencionid = item.rAtencionId
      this.$store.state.rhechoid = item.rHechoId
      this.$store.state.distritoCarpeta = item.distritoInicial
      this.$router.push('./entrevistainicial')
    },

    mostrarFormularioModificacion (item,info,tablas) 
    {
      this.infoMod.tablaAMod=tablas;
      this.$refs.formModificacion.mostrar({
                                                  'rHechoId':item.rHechoId,
                                                  'rAtencionId':"00000000-0000-0000-0000-000000000000",
                                                  'registroId':item.idBitacora
                                                },
                                          info
                                          );
    },


    close () {
      this.dialog = false;
      this.limpiar()
    },
    limpiar () {
      this.rHechoId = ""
      this.editedIndex = -1
    },
    listaragencias () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var agenciasarray
        me.$conf.get('api/Agencias/ListarporDSP/' + me.sesionInfo.u_iddsp, configuracion).then(function(response) {
          agenciasarray = response.data
          agenciasarray.map(function(x) {
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
    },
    listarmodulos () 
    {
      let me = this
      let header = { "Authorization" : "Bearer " + this.$store.state.token }
      let configuracion = { headers : header }
      var moduloarray;
      me.modulos = [];
      me.modulo = ""
      if (me.infoBusqueda.agencia != undefined) {
        me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.infoBusqueda.agencia, configuracion).then(function(response) {
          moduloarray = response.data
          moduloarray.map(function(x) {
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
    }
  }
}