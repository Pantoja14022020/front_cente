<template>
    <v-layout>
      <NavDrawer></NavDrawer>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular">Módulo servicio de Facilitadores y Notificadores</v-toolbar-title>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="adModal" max-width="400px">
                    <v-card>
                        <v-card-title class="subheading thin" v-if="adAccion">
                            <v-icon>security</v-icon>
                            ¿Activar Item?
                        </v-card-title>
                        <v-card-title class="subheading thin" v-else>
                            <v-icon>security</v-icon>
                            ¿Desactivar Item?
                        </v-card-title>
                        <v-card-text>
                            Estás a punto de 
                            <span v-if="adAccion">Activar </span>
                            <span v-else>Desactivar </span>
                            el mudulo: {{ addModulo }}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="activarDesactivarCerrar">
                                Cancelar
                            </v-btn>
                            <v-btn color="success" @click="cambioStatus">
                                {{adAccion ? 'Activar' : 'Desactivar'}}
                            </v-btn>                            
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="modulos"
                :search="search"  return-object
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.nombreModulo }}</td>                                    
                    <td>
                        <template v-if="props.item.statusAsignado">
                            <v-icon small color="success">check</v-icon>
                        </template>
                        <template v-else>
                            <v-icon small color="success">remove</v-icon>
                        </template>
                    </td>   
                    <td>
                        <template v-if="props.item.statusActivo">
                            <v-icon small color="success" @click="activarDesactivarMostrar(2,props.item)">check</v-icon>
                        </template>
                        <template v-else>
                            <v-icon small color="error" @click="activarDesactivarMostrar(1,props.item)">block</v-icon>
                        </template>
                    </td> 
                    <td class="justify-center layout px-0"> 
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" color="default" @click="infoUsuario(props.item)">info</v-icon> 
                            </template>
                            <span>Información del usuario</span>
                        </v-tooltip>    
                    </td>                       
                </template>
                <template slot="no-data">
                    <v-btn color="primary">Resetear</v-btn>
                </template>
            </v-data-table> 
        </v-flex>
        <v-dialog v-model="modalInfo"  max-width="600px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>                    
                    <v-toolbar-title class="subheading">Informacion del usuario</v-toolbar-title>
                    <v-spacer></v-spacer>                            
                </v-toolbar>
                <v-card-text>
                    <v-flex xs12 md12 lg12>
                        <table>
                            <tr>
                                <td> Nombre: </td>
                                <td><b> {{ nombre }}</b></td> 
                            </tr>
                            <tr>
                                <td>Puesto</td>
                                <td><b> {{ puesto }}</b></td>
                            </tr>
                            <tr>
                                <td>Telefono:</td>
                                <td><b>{{ telefono }}</b></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><b>{{ email }}</b></td>
                            </tr>
                            <tr>
                                <td>direccion:</td>
                                <td><b>{{ direccion }} </b></td>
                            </tr>
                            <tr>
                                <td>Status:</td>
                                <td><b>{{ condicion }} </b></td>
                            </tr>                            
                        </table>
                    </v-flex>                                            
                </v-card-text> 
            </v-card>
        </v-dialog>  
    </v-layout>    
</template>
<script>
    import axios from 'axios'  
    import n401 from './401'
    import n403 from './403'
    import NavDrawer from './ConfiguracionNavDrawer.vue'


    export default {
        components: {  
            n401,
            n403,
          NavDrawer,
        },
        data: function(){
            return {
                e401:false, 
                e403:false,
                showpage:true, 
                dialog:false,
                adModal:0,
                adAccion: null,
                addModulo:'',
                modalInfo:false,                
                customToolbar: [ 
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }  ], 
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }  ],  
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }], 
                    [{ 'color': [] }, { 'background': [] }], 
                ],                
                modulos:[], 
                modulosusuarios:[],
                headers: [ 
                    { text: 'Modulo', value: 'nombreModulo' },  
                    { text: 'Status de asingado', value: 'statusAsignado' }, 
                    { text: 'Status de activo', value: 'statusActivo' },   
                    { text: 'Opciones', value: 'opciones' },   
                                    
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },            
                moduloservicios:[],
                moduloservicio:'',
                statusAsignacion:'',
                statusActivo:'',
                idFacilitadorNotificador:'',
                moduloServicioId: '',
                nombre:'',
                puesto:'',
                telefono:'',
                email:'',
                direccion:'',
                condicion:'',
            }
        },
        created() {
            let me = this  

            me.u_iddistrito=me.$store.state.usuario.iddistrito;
            me.u_distrito=me.$store.state.usuario.distrito;
            me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
            me.u_idagencia=me.$store.state.usuario.idagencia;
            me.u_agencia=me.$store.state.usuario.agencia;
            me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
            me.u_modulo=me.$store.state.usuario.modulo;
            me.u_idusuario=me.$store.state.usuario.idusuario;
            me.u_nombre=me.$store.state.usuario.usuario;
            me.u_clave=me.$store.state.usuario.clave;
            me.u_rol=me.$store.state.usuario.rol;
            me.u_puesto=me.$store.state.usuario.puesto;
            me.u_email=me.$store.state.usuario.email;            
            me.listar(); 
            me.listarModulos(); 
                                
            // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
            axios.interceptors.request.use(
                (config) => { 
                    me.$store.commit('LOADER',true);
                    return config;
                },
                (error) => {  
                    me.$store.commit('LOADER',false);
                    return Promise.reject( error);
                }
            );
                 
            axios.interceptors.response.use(
                (response) => { 
                    me.$store.commit('LOADER',false); 
                    return response;
                },
                (error) => {  
                    me.$store.commit('LOADER',false); 
                    return Promise.reject(error);
                }
            );
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
            modalInfo(val){
                val || this.close()
            },
        },
        methods: {
            listar(){         
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                
                me.$justiciarestaurativa.get('api/FacilitadorNotificadors/Listar/' + me.u_iddistrito, configuracion)
                    .then(function (response) {  
                        me.modulos = response.data;
                    })
                    .catch(function (error) {        
                        if (error.response.status==401){ 
                            me.e401 = true,
                            me.showpage= false
                        } else if (error.response.status==403){  
                            me.e403= true
                            me.showpage= false 
                        } else if (error.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify(error.message,'error')     
                        } 
                    }); 
            }, 
            infoUsuario(item){                
                let me = this
                
                me.moduloServicioId = item.moduloServicioId                                
                me.listarIU()
            },
            activarDesactivarMostrar(accion, item) {
                let me = this

                me.adModal=1     
                me.idFacilitadorNotificador=item.idFacilitadorNotificador
                me.addModulo = item.nombreModulo

                if (!accion) {
                    me.adModal = 0
                } else {
                    accion == 1 ? me.adAccion = true : me.adAccion = false
                }                                 
            },
            activarDesactivarCerrar() {
                let me = this

                me.adModal=0
            },
            limpiar(){
                let me = this

                me.moduloservicio=""
                me.statusActivo=""
                me.statusAsignacion=""
                me.moduloServicioId =""
                me.$store.state.select_moduloServicioId = ""
                me.adAccion = null
            },
            listarModulos(){ 
                let me = this                
                var modulosArray = []
                
                me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.u_idagencia)
                    .then(function (response) {
                        modulosArray = response.data

                        modulosArray.map(function(x){
                            me.moduloservicios.push({text: x.nombre, value: x.idModuloServicio})
                        });
                        
                    })
                    .catch(function (error) {
                        me.$notify('Error al leer la lista de modulos  de la agencia !!!','error')    
                    });
            }, 
            close() {
                let me = this

                me.dialog = false;
                me.modalInfo=false;
                me.limpiar();
            },
            guardar() {
                let me = this

                me.$validator.validate()
                    .then(result => {
                        if (result) {                              
                            //Código para guardar                                
                            let header={"Authorization" : `Bearer ${me.$store.state.token}`}
                            let configuracion = { headers: header }
                            let payload = {
                                'moduloServicioId': me.moduloservicio,
                                'statusAsignado ': false, 
                                'statusActivo': true,
                            }                                                    
                            
                            this.$conf.post('api/FacilitadorNotificadors/CrearFacilitadorNotificador',payload, configuracion)
                                .then(function (response) {
                                    me.close()
                                    me.$notify('La información se guardo correctamente !!!','success')  
                                    me.listar()
                                    me.limpiar()
                                })
                                .catch(function (error) {
                                    me.$notify('Error al intentar guardar el registro','error')  
                                });
                            
                        }  
                    })
            },
            cambioStatus() {
                let me = this

                let header = { "Authorization": `Bearer ${me.$store.state.token}`};
                let configuracion = { headers: header }; 
                let payload = {
                    'idFacilitadorNotificador': me.idFacilitadorNotificador, 
                    'statusActivo': me.adAccion,
                }

                me.$justiciarestaurativa.put('api/FacilitadorNotificadors/StatusActivarDesactivar', payload, configuracion)
                    .then(function (response) {                         
                        me.listar();       
                        me.activarDesactivarCerrar();                
                    })
                    .catch(err => {  
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("No esta autorizado para realizar esta acción", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false                            
                        } else if (err.response.status==404){
                            me.$notify("El recurso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar activar al usuario !!!','error')    
                        } 
                    });
            },
            listarIU () {
                let me = this;                
                let header = { "Authorization" : `Bearer ${me.$store.state.token}` };
                let configuracion = { headers: header };
                                
                me.$controlacceso.get(`api/Usuarios/ListarModulo/${me.moduloServicioId}`, configuracion)
                    .then(function (response) {  
                        me.nombre = response.data.nombre;
                        me.puesto = response.data.puesto;
                        me.telefono = response.data.telefono;
                        me.email = response.data.email;
                        me.direccion = response.data.direccion;
                        me.condicion = response.data.condicion;
                        me.modalInfo = true
                    })
                    .catch(function (error) {
                        if (error.response.status == 400) {
                            me.$notify("No es un usuario válido", 'error')
                        } else if (error.response.status == 401) {
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage = false
                        } else if (error.response.status == 403) { 
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403 = true
                            me.showpage = false 
                        } else if (error.response.status == 404) {
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!! ' + error.message,'error')   
                        }  
                    }); 
            },
        }
    }
</script>