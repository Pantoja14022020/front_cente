<template>
        <!-- Intrucciones de cambios -->
     <!-- Se cambian los axios por la conexion correcta a control de acceso y se cambian los listados de subdirecciones y agencias -->
   <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
    <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Usuarios.</v-toolbar-title>

                <v-divider class="mx-2" inset vertical></v-divider>

                <v-badge
                v-model="show"
                    color="cyan"
                    right
                        >
                        <template v-slot:badge>
                            <span>{{  contador  }}</span>
                        </template>
                        <v-icon
                            large
                            color="grey lighten-1"
                        > account_box</v-icon>
                    </v-badge>
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <!-- <v-btn class="mx-2" @click="agregar" fab dark small color="primary">
                    <v-icon dark>add</v-icon>
                </v-btn> -->
            </v-toolbar>
            <v-data-table
            :headers="headers"
            :items="usuarios"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"  
            class="elevation-1" >
                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.responsableCuenta }}</td>
                    <td><v-icon  small  class="mr-2"  >person</v-icon>{{ props.item.usuario }}</td> 
                    <td>{{ props.item.distrito }}</td>
                    <td>{{ props.item.agencia }}</td>
                    <td><v-icon  small  class="mr-2" color="info">bookmark</v-icon>{{ props.item.modulonombre }}</td> 
                    <td>
                        <div v-if="props.item.condicion">
                            <span class="blue--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                    <td class="justify-center layout px-0">
                        <!-- <v-icon 
                        class="mr-2" color="warning"
                        @click="agregarpanel(props.item)"
                        >
                        view_module
                    </v-icon> -->
                        <v-icon 
                            class="mr-2"
                            @click="editItem(props.item)"
                            >
                            edit
                            </v-icon>
                        <!-- <v-icon 
                        class="mr-2"
                        @click="verHistorial(props.item)"
                        >
                        visibility
                    </v-icon>
                    <template v-if="props.item.condicion">
                        <v-icon 
                        class="mr-2"
                        @click="activarDesactivarMostrar(2,props.item)"
                        >
                        block
                        </v-icon></template>
                    <template v-else>
                        <v-icon 
                            class="mr-2"
                            @click="activarDesactivarMostrar(1,props.item)"
                            >
                            closed_caption
                        </v-icon>
                    </template> -->
                </td>
                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>

        <v-dialog   v-model="dialog"  fullscreen hide-overlay transition="dialog-bottom-transition">
                        
                        <v-card>
                            <v-toolbar dark color="primary">
                
                                <v-toolbar-title>{{formTitle}}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn  color=success text @click="guardar()">Guardar</v-btn>
                                    <v-btn icon   @click="dialog = false">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar> 
                
                
                            <v-container grid-list-md text-xs-center>
                
                                <v-layout row wrap>
                                
                                    <v-flex class="espaciado" xs6 sm6 md6 lg6> 
                
                
                                        <v-text-field 
                                            name="nombre" 
                                            label="Nombre:"
                                            v-model="nombre" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('nombre')">
                                        </v-text-field>

                                        <v-text-field 
                                            name="responsablecuenta" 
                                            label="Responsable de la cuenta:"
                                            v-model="responsableCuenta" 
                                            disabled
                                            v-validate="'required'"
                                            :error-messages="errors.collect('responsablecuenta')">
                                        </v-text-field>

                                        <!-- <v-text-field 
                                            name="dirección" 
                                            label="Dirección:"
                                            v-model="direccion" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('dirección')">
                                        </v-text-field> -->

                                        <v-autocomplete 
                                            name="direccion subprocuradurria" 
                                            label="Direccion subprocuradurria:"
                                            v-model="iddsp"
                                            :items="dsp" 
                                            return-object
                                            v-validate="'required'"
                                            v-on:change="listarAgencia()"  
                                            :error-messages="errors.collect('direccion subprocuradurria')">
                                        </v-autocomplete> 

                                        <v-autocomplete 
                                            name="modulo"
                                            label="Modulo:"
                                            v-model="idModuloServicio"
                                            :items="modulos" 
                                            return-object
                                            v-validate="'required'"
                                            :error-messages="errors.collect('modulo')" >
                                        </v-autocomplete>

                                        <!-- <v-text-field 
                                            name="telefono" 
                                            label="Telefono:"
                                            v-model="telefono" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('telefono')">
                                        </v-text-field> -->

                                        <v-text-field 
                                            name="usuario" 
                                            label="Usuario:"
                                            v-model="usuario" 
                                            disabled
                                            v-validate="'required'"
                                            :error-messages="errors.collect('usuario')">
                                        </v-text-field>
                
                                    </v-flex>
                
                                    <v-flex class="espaciado" xs6 sm6 md6 lg6> 
                
                                        <v-text-field 
                                            name="puesto" 
                                            label="Puesto:"
                                            v-model="puesto" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('puesto')">
                                        </v-text-field> 
                
                                        <v-autocomplete 
                                            name="distrito" 
                                            label="Distrito:"
                                            v-model="distrito"
                                            :items="distritos" 
                                            return-object
                                            v-on:change="listarDSP()"  
                                            v-validate="'required'"
                                            :error-messages="errors.collect('distrito')">
                                        </v-autocomplete>

                                        <v-autocomplete 
                                            name="agencia"
                                            label="Agencia:"
                                            v-model="idagencia"
                                            :items="agencias"
                                            return-object
                                            v-validate="'required'"
                                            v-on:change="listarModulo()"   
                                            :error-messages="errors.collect('agencia')">
                                        </v-autocomplete>
                                        
                                        <!-- <v-autocomplete 
                                            name="rol"
                                            label="Rol:"
                                            v-model="idrol"
                                            :items="roles" 
                                            return-object
                                            v-validate="'required'"
                                            :error-messages="errors.collect('rol')" >
                                        </v-autocomplete> 

                                        <v-text-field
                                            name="email" 
                                            label="Email:"
                                            v-model="email" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('email')">
                                        </v-text-field>

                                        <v-text-field 
                                            name="password"
                                            label="Password:"
                                            type="password" 
                                            v-model="password" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('password')">
                                        </v-text-field> -->
                
                                    </v-flex>
                                
                                </v-layout>
                            </v-container> 
                        
                        </v-card>
                    </v-dialog>
    <v-dialog v-model="adModal" max-width="400px">
            <v-card>
                <v-card-title class="subheading thin" v-if="adAccion==1"><v-icon>security</v-icon> ¿Activar usuario?</v-card-title>
                <v-card-title class="subheading thin" v-if="adAccion==2"><v-icon>security</v-icon> ¿Desactivar usuario?</v-card-title>
                <v-card-text>
                    Estás a punto de 
                    <span class="bold-text" v-if="adAccion==1"><strong>ACTIVAR</strong></span>
                    <span class="bold-text" v-if="adAccion==2"><strong>DESACTIVAR</strong> </span>
                    el usuario con  el nombre: {{ adNombre }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   @click="adModal = false">
                        Cancelar
                    </v-btn>
                    <v-btn v-if="adAccion==1" color="success"   @click="activar">
                        Activar
                    </v-btn>
                    <v-btn v-if="adAccion==2" color="success"   @click="desactivar">
                        Desactivar
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <v-dialog v-model="addPanel" persistent max-width="1500px">
            <v-card elevation="0" > 
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">Agregar modulos al usuario</v-toolbar-title>
                    <v-spacer></v-spacer> 
                </v-toolbar>
                <v-form ref="form">
                    <v-card-text  class="px-5">   
                
                        <v-list two-line>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">account_box</v-icon>
                                </v-list-tile-action>
                    
                                <v-list-tile-content>
                                    <v-list-tile-title>Usuario:</v-list-tile-title>
                                    <v-list-tile-sub-title>{{nombre}} </v-list-tile-sub-title>
                                </v-list-tile-content>
                    
                                <v-list-tile-action>
                                    <v-icon>check</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">account_tree</v-icon>
                                </v-list-tile-action>
                    
                                <v-list-tile-content>
                                    <v-list-tile-title>Puesto:</v-list-tile-title>
                                    <v-list-tile-sub-title> {{ puesto }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                    
                                <v-list-tile-action>
                                    <v-icon>check</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">account_balance</v-icon>
                                </v-list-tile-action>
                    
                                <v-list-tile-content>
                                    <v-list-tile-title>Agencia:</v-list-tile-title>
                                    <v-list-tile-sub-title>{{nombreAgencia}} </v-list-tile-sub-title>
                                </v-list-tile-content>
                    
                                <v-list-tile-action>
                                    <v-icon>check</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">work</v-icon>
                                </v-list-tile-action>
                    
                                <v-list-tile-content>
                                    <v-list-tile-title>Modulo:</v-list-tile-title>
                                    <v-list-tile-sub-title> {{nombreModulo}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                    
                                <v-list-tile-action>
                                    <v-icon>check</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                
                            <v-divider inset></v-divider>
                                
                            <div px-5>
                                <v-select
                                    v-model="panel"
                                    :items="panels"
                                    multiple
                                    deletable-chips
                                    label="Modulos"
                                    chips
                                    hint="Modulos asignados"
                                    persistent-hint
                                    return-object
                                    :menu-props="{ offsetY: true, zIndex: 10000 }"
                                />
                            </div>
                        </v-list>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  @click.native="close" >Cancelar</v-btn>
                        <v-btn @click.native="guardarPaneles" class="success" >Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

        <!-- Animacion de espera clonacion de usuarios -->
        <v-dialog v-model="cargando" persistent  max-width="1000px" content-class="dialog-top-center">
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                    <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading"
                    >El usuario se esta clonando a {{ distritoEnProceso }} </v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="modalhistorial" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Información de historial del usuario.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn icon @click="modalhistorial = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="headersH"
                            :items="historialUsuario"
                            :search="search"
                            :rows-per-page-items="rowsPerPageItems"
                            :pagination.sync="pagination"
                        >
                            <template slot="items" class="white" slot-scope="props">
                                <td>{{ props.item.usuario }}</td>
                                <td>{{ props.item.descripcionMovimiento }}</td>
                                <td>{{ props.item.proceso }}</td>    
                                <td>{{ props.item.distritoHaceMovimiento }}</td>
                                <td>{{ props.item.dirSubHaceMovimiento }}</td>
                                <td>{{ props.item.agenciaHaceMovimiento }}</td>
                                <td>{{ props.item.moduloHaceMovimiento }}</td> 
                                <td>{{ props.item.responsableCuentaHaceMovimiento }}</td> 
                                <td>
                                    {{
                                    props.item.fechaRegistro.substring(8, 10) +
                                    " de " +
                                    obtenermes(props.item.fechaRegistro.substring(5, 7) - 1) +
                                    " del " +
                                    props.item.fechaRegistro.substring(0, 4)
                                    }}
                                </td>
                            </template>
                            <template slot="no-data">
                                <v-btn color="primary">Resetear</v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-dialog>
    </v-layout>
</template>

<script>
    
    import n401 from './401.vue'
    import n403 from './403.vue'
    import axios from 'axios'
    import VeeValidate from 'vee-validate' 
    import { error } from 'util';

    export default {

        components:{
             n401,
             n403
        },
        
    data(){
        return {
            u_iddistrito:'',
            u_distrito:'',
            u_dirSubPro:'',
            u_idagencia:'',
            u_agencia:'',
            u_idmoduloservicio:'',
            u_modulo:'',
            u_idusuario:'',
            u_nombre:'',
            u_responsablecuenta:'',
            e401:false, 
            e403:false,
            showpage:true,  

            show: true,
            dense:true,
            usuarios:[],                
            dialog: false,
            headers: [
                
                { text: 'Nombre', value: 'nombre' },
                { text: 'Responsable de la cuenta', value: 'responsableCuenta' },
                { text: 'Usuario', value: 'usuario'},
                { text: 'Distrito', value: 'distrito'},
                { text: 'Agencia', value: 'agencia'},
                { text: 'Modulo', value: 'modulonombre'},  
                { text: 'Estado', value: 'condicion'}, 
                { text: 'Opciones', value: 'opciones'},                
            ],
            headersH: [
                
                { text: 'Usuario Centenario', value: 'usuario' },
                { text: 'Movimientos realizados', value: 'descripcionMovimiento' },
                { text: 'Proceso', value: 'proceso' },
                { text: 'Distrito', value: 'distrito'},
                { text: 'Subdireccion', value: 'dirSubHaceMovimiento'},
                { text: 'Agencia', value: 'agenciaHaceMovimiento'},
                { text: 'Modulo', value: 'moduloHaceMovimiento'},  
                { text: 'Usuario', value: 'responsableCuentaHaceMovimiento'}, 
                { text: 'fecha del movimiento', value: 'fechaRegistro' },
            ],
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 50
            },
            editedIndex: -1, 
                
            nombre:'',
            idUsuario: '',
            distritos:[],
            distrito:'',
            dsp:[],
            iddsp:'',

            agencias:[], 
            idagencia:'',

            idrol:'',
            roles:[], 

            modulos: [],
            idModuloServicio: '',

            puesto:'',
            direccion:'',
            telefono: '',
            email: '',
            condicion: true,
            contador:0,
            nombreModulo:'',
            nombreAgencia:'',
            nombreSubDir:'',

            usuario:'',
            password:'',
            actPassword:false,
            passwordAnt:'',

            responsableCuenta:'',

            valida: 0,
            validaMensaje:[],
            adModal: 0,
            adAccion: 0,
            adNombre: '',
            adId: '', 
            
            addPanel:false,
            panel:[],
            panels:[],
            panelesAnteriores:[],
            distritoActual:'',
            idDistritoPach:'7f662ec1-6705-406e-bcd0-f56ade7bcae2',

            distritoFallo:[],

            cargando: false,
            distritoEnProceso:'',
            descripcionMovimiento:'',
            ModuloServicioIdAnterior:'',
            //Variable para descripcion de cambio
            nombreAnt:'',
            responsableAnt:'',
            puestoAnt:'',
            direcionAnt:'',
            distritoAnt:'',
            distritoIdAnt:'',
            subdirAnt:'',
            subdirIdAnt:'',
            agenciaAnt:'',
            agenciaIdAnt:'',
            moduloAnt:'',
            moduloIdAnt:'',
            rolAnt:'',
            rolIdAnt:'',
            emailAnt:'',
            telefonoAnt:'',
            usuarioAnt:'',
            historialUsuario:[],
            modalhistorial:false,
            claveDsp:''
        }
    },
    computed:{
        formTitle () {
                return this.editedIndex === -1 ? 'Nuevo usuario' : 'Actualizar usuario'
            },
              formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            }
    },
    watch:{
        dialog (val) {
            val || this.close()
            }
    },
    created(){

        this.u_iddistrito=this.$store.state.usuario.iddistrito;
        this.u_distrito=this.$store.state.usuario.distrito; 
        this.claveDsp = this.$store.state.usuario.ClaveDSP

        this.u_dirSubPro=this.$store.state.usuario.dirSubProc;
        this.u_idagencia=this.$store.state.usuario.idagencia;
        this.u_agencia=this.$store.state.usuario.agencia;
        this.u_idmoduloservicio=this.$store.state.usuario.idmoduloservicio;
        this.u_modulo=this.$store.state.usuario.modulo;
        this.u_idusuario=this.$store.state.usuario.idusuario;
        this.u_responsablecuenta=this.$store.state.usuario.responsablecuenta;

        axios.interceptors.request.use( (config)=> {
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
            axios.interceptors.response.use((response)=>{
            console.log(response);
            this.$store.commit('LOADER',false);
            // Do something with response data
            return response;
            },  (err)=> {
            
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });

            this.listar();
            this.selectroles();
            this.listarPanels();
            this.listardistritos();
    },
    methods:{
        async listar() {
                let me = this; 
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                try {
                    let usuariosResponse = await me.$controlacceso.get('api/Usuarios/ListarPorClaveDSP/' + me.claveDsp, configuracion);
                    me.contador = usuariosResponse.data.length;
                    console.log(me.contador);
                    console.log(me.contador);

                    let [distritosResponse, agenciasResponse] = await Promise.all([
                        me.$conf.get('api/Distritoes/Listar', configuracion),
                        me.$conf.get('api/Agencias/Listar', configuracion)
                    ]);

                    
                    me.usuarios = []
                    usuariosResponse.data.map(dd => {
                        let d = distritosResponse.data.filter( e => e.idDistrito == dd.distritoId)            
                        let a = agenciasResponse.data.filter( e => e.idAgencia == dd.agenciaId)            
                        
                        me.usuarios.push({
                            agenciaId: dd.agenciaId,
                            condicion: dd.condicion,
                            contador: dd.contador,
                            direccion: dd.direccion,
                            distritoId: dd.distritoId,
                            dspId: dd.dspId,
                            email: dd.email,
                            idUsuario: dd.idUsuario,
                            moduloServicioId: dd.moduloServicioId,
                            modulonombre: dd.modulonombre,
                            nombre: dd.nombre,
                            nombreAgencia: dd.nombreAgencia,
                            nombrerol: dd.nombrerol,
                            password_hash: dd.password_hash,
                            puesto: dd.puesto,
                            rolId: dd.rolId,
                            telefono: dd.telefono,
                            titular: dd.titular,
                            usuario: dd.usuario,
                            agencia: a[0].nombre,
                            distrito: d[0].nombre,
                            distrito: d[0].nombre,
                            responsableCuenta: dd.responsableCuenta,
                            nombreSubDir: dd.subdir,
                        })
                });

                    console.log(me.usuarios);
                } catch (err) {
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error');
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error');
                        me.e401 = true;
                        me.showpage = false;
                    } else if (err.response.status == 403) {
                        me.$notify("No está autorizado para ver esta página", 'error');
                        me.e403 = true;
                        me.showpage = false;
                    } else if (err.response.status == 404) {
                        me.$notify("El recurso no ha sido encontrado", 'error');
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error');
                    }
                }
        },
        listarPanelModulo(idUsuario){
            let me = this
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            me.$controlacceso.get('api/PanelUsuarios/ListarAsignados/' + idUsuario, configuracion).then(function(response)
            {
                console.log(response.data)
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listardistritos(){
            let me=this;
            var distritoarray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Distritoes/Listar', configuracion).then(function(response){
                distritoarray=response.data;
                distritoarray.map(function(x){me.distritos.push({text: x.nombre,value:x.idDistrito});});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        //Funcion para listar subdirecciones
        listarDSP(){
            
            let me=this;
            var dspArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.dsp = []
            var distri ='';

            if (me.distrito.value == undefined)
            {
                distri = me.distrito;
            }
            else{
                distri = me.distrito.value;
            }

            this.$conf.get('api/DSPs/ListarClaveDSP/'+ me.claveDsp + '/' + distri, configuracion).then(function(response){
                dspArray=response.data;
                console.log(dspArray)
                console.log(dspArray.length)
                dspArray.map(function(x){me.dsp.push({text: x.nombreSubDir,value:x.idDSP});});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listarAgencia(){ 
            let me=this;
            me.agencias=[];
            var agenciaArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            //debugger
            var dsp ='';
            if (me.iddsp.value == undefined)
            {
                dsp = me.iddsp;
            }
            else{
                dsp = me.iddsp.value;
            }
            this.$conf.get('api/Agencias/ListarPorDirSub/'+ dsp, configuracion).then(function(response)
            {
                agenciaArray=response.data;
                agenciaArray.map(function(x){me.agencias.push({text: x.nombre,value:x.idAgencia});});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listarModulo(){
            let me=this; 
            var modulosArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.modulos = [];
            //debugger
            var agencia='';
            if (me.idagencia.value == undefined)
            {
                agencia =me.idagencia;
            }
            else
            {
                agencia =me.idagencia.value;
            }
            this.$conf.get('api/ModuloServicios/ListarPorAgencia/'+ agencia, configuracion).then(function(response)
            {
                modulosArray=response.data;
                modulosArray.map(function(x){me.modulos.push({text: x.nombre,value:x.idModuloServicio});});
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
                        me.$notify('Error al intentar lisatar los registros!!!','error')   
                    } 
            });
        },
        //Funcion para listar paneles
        listarPanels()
        {  
            let me=this;
            var panelArray=[]; 

            me.$panel.get('api/PanelControls/Listar').then(function(response)
            { 
                panelArray = response.data;

                panelArray.map(function(x){me.panels.push({text:x.nombre, value: x.idPC});})

            }).catch(function(error) 
            {
                console.log(error);
            });
        },

        guardarPaneles()
            { 
                let me= this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Aqui analizo los paneles que se traian de base de datos y los nuevos que se estan poniendo o quitando
                const idsAnteriores = new Set(me.panelesAnteriores.map(p => p.value));
                const idsActuales = new Set(me.panel.map(p => p.value));

                //Con estas funciones filtro los que no conciden con el arreglo anterior y el nuevo
                const nuevos = me.panel.filter(p => !idsAnteriores.has(p.value));
                const eliminados = me.panelesAnteriores.filter(p => !idsActuales.has(p.value));

                //Aqui coloco un arreglo de los nombre de los modulos que cambiaron
                const nombresNuevos = nuevos.map(p => p.text);
                const nombresEliminados = eliminados.map(p => p.text);

                //Con estos condicionales concateno en texto que modulos de quitaron y cuales se agregaron
                if (nombresNuevos.length > 0)
                {
                    me.descripcionMovimiento += `\n- Se agregaron los módulos: ${nombresNuevos.join(', ')}`;
                }
                if (nombresEliminados.length > 0)
                {
                    me.descripcionMovimiento += `\n- Se eliminaron los módulos: ${nombresEliminados.join(', ')}`;
                }
                //En caso de que la descripcion de movimientos sea vacio le aviso que no modifico nada y termino el proceso
                if (me.descripcionMovimiento == '')
                {
                    me.$notify('Considiera que no se le edito nada al usuario','success') 
                    me.close();
                }
                //En caso de si haber movimientos procedo a arreglarlo de forma local
                if (me.descripcionMovimiento != '')
                {
                    me.$controlacceso.delete('api/PanelUsuarios/Eliminar/'+ me.idUsuario, configuracion).then(function(response)
                    {
                        let promesas = [];
                        //Meto el recorrido en una variable de promesa para corroborar que la edicion local funciono
                        for (var i = 0; i < me.panel.length; i++) 
                        {
                            let promesa = me.$controlacceso.post('api/PanelUsuarios/Crear', {
                                'usuarioId': me.idUsuario,
                                'panelControlId': me.panel[i].value,
                            }, configuracion);

                            promesas.push(promesa);
                        }
                        //En caso de todo estar bien procedo a la clonacion del usuario
                        Promise.all(promesas).then(function (responses) 
                        {
                            me.clonacionUsuarios(me.idUsuario,me.usuario,"Edicion de modulos");
                        })
                        .catch(function (error) 
                        {
                            me.$notify('Error al intentar guardar los modulos!!!', 'error')
                        });
                
                    }).catch(err => 
                    { 
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
                            me.$notify('Error al intentar lisatar los registros!!!','error')   
                        } 
                    });
                }
            },
            //Funcion para listar roles
            selectroles()
            {
                let me=this;
                var rolesArray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$controlacceso.get('api/Rols/Listar', configuracion).then(function(response)
                {
                    rolesArray=response.data;

                    rolesArray.map(function(x){me.roles.push({text: x.nombre,value:x.idrol});});

                }).catch(err => 
                { 
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
        editItem (item) {
            //debugger
            //this.listarPanelModulo(item.idUsuario)
            this.idUsuario=item.idUsuario;
            this.idrol=item.rolId;
            this.nombre=item.nombre;
            this.puesto=item.puesto;     
            this.responsableCuenta=item.responsableCuenta;         
            this.distrito = item.distritoId;
            this.distritoActual = item.distritoId;
            this.iddsp =item.dspId;
            this.idagencia =item.agenciaId,
            this.idModuloServicio=item.moduloServicioId;
            this.nombreModulo= item.modulonombre;
            this.nombreAgencia= item.nombreAgencia;
            this.direccion=item.direccion;
            this.usuario= item.usuario;
            this.password=item.password_hash;
            this.passwordAnt=item.password_hash;
            this.editedIndex=1;
            this.telefono=item.telefono;
            this.email=item.email;
            this.condicion=item.condicion

            this.ModuloServicioIdAnterior  = item.moduloServicioId;
            this.listarDSP();
            this.listarAgencia();
            this.listarModulo();
            this.dialog = true

            //Seccion para armar el dialogo de descripcion de la edicion
                this.nombreAnt = item.nombre;
                this.responsableAnt = item.responsableCuenta;
                this.puestoAnt = item.puesto;
                this.direcionAnt = item.direccion;
                //Distrito
                this.distritoIdAnt = item.distritoId;
                this.distritoAnt = item.distrito;
                //Subdireccion
                this.subdirIdAnt = item.dspId;
                this.subdirAnt = item.nombreSubDir;
                //Agencia
                this.agenciaIdAnt = item.agenciaId;
                this.agenciaAnt = item.nombreAgencia;
                //Modulo
                this.moduloIdAnt = item.moduloServicioId;
                this.moduloAnt = item.modulonombre;
                //Rol
                this.rolAnt = item.nombrerol;
                this.rolIdAnt = item.rolId;
                //Datos generales
                this.emailAnt = item.email;
                this.telefonoAnt = item.telefono;
                this.usuarioAnt = item.usuario;
        },
        guardar(){
            let me=this;

                this.$validator.validate().then(result => 
                {
                    if (result) 
                    { 
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};

                        //Arreglo los valores de modulo para evitar enviar datos indefinidos en apis
                        var modulo='';
                        if (me.idModuloServicio.value == undefined)
                        {
                            modulo =me.idModuloServicio;
                        }
                        else
                        {
                            modulo =me.idModuloServicio.value;
                        }

                        //En caso de editar usuario
                        if (this.editedIndex > -1) 
                        { 
                            
                            //Armar descripcion del la edicion
                            me.descripcionMovimiento = 
                                (me.nombreAnt != me.nombre ? "\n- Se edito el nombre usuario de " + me.nombreAnt + " por " + me.nombre : "") + 
                                (me.responsableAnt != me.responsableCuenta ? "\n- Se edito responsable de la cuenta de " + me.responsableAnt + " por " + me.responsableCuenta : "") + 
                                (me.puestoAnt != me.puesto ? "\n- Se edito el puesto de " + me.puestoAnt + " por " + me.puesto : "") + 
                                (me.direcionAnt != me.direccion ? "\n- Se edito la direccion de " + me.direcionAnt + " por " + me.direccion : "") + 
                                (me.distritoIdAnt != me.distrito ? "\n- Se edito el distrito de " + me.distritoAnt + " por " + me.distrito.text : "") + 
                                (me.subdirIdAnt != me.iddsp ? "\n- Se edito la subdirecion de " + me.subdirAnt + " por " + me.iddsp.text : "") + 
                                (me.agenciaIdAnt != me.idagencia ? "\n- Se edito la agencia de " + me.agenciaAnt + " por " + me.idagencia.text : "") + 
                                (me.moduloIdAnt != modulo ? "\n- Se edito el modulo de " + me.moduloAnt + " por " + me.idModuloServicio.text : "") + 
                                (me.rolIdAnt != me.idrol ? "\n- Se edito el rol de " + me.rolAnt + " por " + me.idrol.text : "") + 
                                (me.emailAnt != me.email ? "\n- Se edito el email de " + me.emailAnt + " por " + me.email : "") + 
                                (me.telefonoAnt != me.telefono ? "\n- Se edito el telefono de " + me.telefonoAnt + " por " + me.telefono : "") + 
                                (me.usuarioAnt != me.usuario ? "\n- Se edito el usuario de " + me.usuarioAnt + " por " + me.usuario : "") + 
                                (me.passwordAnt != me.password ? "\n- Se cambio la contraseña" : "");

                            //Se edita la contraseña o no                                
                            if (me.password!=me.passwordAnt)
                            {
                                me.actPassword=true;
                            }

                            //Api para actualizar el usuario
                            me.$controlacceso.put('api/Usuarios/Actualizar',
                            {
                                'idusuario':me.idUsuario,
                                'rolId':me.idrol,
                                'moduloservicioId': modulo, 
                                'puesto': me.puesto, 
                                'nombre':me.nombre,
                                'responsableCuenta':me.responsableCuenta,
                                'direccion':me.direccion,
                                'telefono': me.telefono,
                                'email':me.email,
                                'condicion':me.condicion, 
                                'usuario': me.usuario,
                                'password':me.password,
                                'act_password':me.actPassword 

                            }, configuracion).then(function(response)
                            {                                
                                //En caso de ser la descripcion vacia quiere decir que no edito nada, por lo que no es necesaria clonar
                                if(me.descripcionMovimiento  == '')
                                {
                                    me.close();
                                    me.$notify('Considiera que no se le edito nada al usuario','success') 
                                    me.listar();
                                }
                                //En caso de si detectar un cambio se procede a la clonacion en todos los distritos
                                else
                                {
                                    me.clonacionUsuarios(me.idUsuario,me.usuario,"Edicion de usuario");
                                }

                            }).catch(error => 
                            {  
                                if (error.response.status==400){
                                    me.$notify("No es un usuario válido", 'error')
                                } else if (error.response.status==401){
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                    me.showpage= false
                                } else if (error.response.status==403){ 
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403= true
                                    me.showpage= false 
                                } else if (error.response.status==404){
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                }else{
                                    me.$notify('Error al intentar actualizar la informacion!!!','error')   
                                } 
                            
                            });
                        //En caso de ser un usuario nuevo
                        } else 
                        { 
                            //Se crea de forma estatica la descripcion de usuario nuevo
                            me.descripcionMovimiento = "Se creo el usuario " + me.nombre;
                            //Api para crear usuario
                            me.$controlacceso.post('api/Usuarios/Crear',
                            {
                            'rolId':me.idrol.value,
                            'moduloservicioId': modulo, 
                            'puesto': me.puesto, 
                            'nombre':me.nombre,
                            'responsableCuenta':me.responsableCuenta,
                            'direccion':me.direccion,
                            'telefono': me.telefono,
                            'email':me.email,
                            'condicion':me.condicion, 
                            'usuario': me.usuario,
                            'password':me.password
                            }, configuracion).then(function(response)
                            {
                                //Se procede a las clonaciones en todos lo distritos
                                me.clonacionUsuarios(response.data.usuarioid,me.usuario,"Creacion de usuario");   
                                

                            }).catch(err => 
                            {  
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
                                    me.$notify('Error al intentar crear el  registro!!!','error')   
                                } 
                            });
                        }
                    }
                })
        },
        //Funcion para la clonacion de usuarios en todos los distritos, dicha funcion recibe el id de usuario, el usuario y el movimiento que se hace
            async clonacionUsuarios(idUsuario,usuario,movimiento)
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                //Activo el modal que me dice en que distrito se esta clonando el usuario
                me.cargando = true;

                //Recorro los elementos del arreglo del conjunto
                for(var i  = 0 ;i < me.distritos.length ; i++)
                {
                    //Aqui asigno valor del distrito que estoy clonando para mostrarlo en el modal
                    me.distritoEnProceso = me.distritos[i].text;
                    //Se hace el recorrido de la clonacion en cada distrito
                    try 
                    {
                        const response = await me.$controlacceso.post('api/Usuarios/ClonarUsuarioCA',
                        {
                            'idusuario':idUsuario,
                            'idDistrito':me.distritos[i].value,

                        }, configuracion)

                        //En caso de que la api funcione
                        if(response.status == 200)
                        {
                        }
                    } catch (err) 
                    {
                        //En caso de fallar una clonacion guardo en un arreglo los distritos que hayan fallado, junto con su valor de texto
                        me.distritoFallo.push({distrito : me.distritos[i].value, distritoNombre : me.distritos[i].text  });
                    }
                }
                //Si el arreglo de fallas es vacio quiere decir que todo funciono correctamente
                if(me.distritoFallo.length == 0)
                {
                    alert("La clonación de usuario funciono correctamente en TODOS los distritos");
                    //Llamo a la funcion para guardar el movimiento en la bitacora d usuario
                    me.crearBitacoraUsuario(idUsuario,usuario,me.descripcionMovimiento,"",me.distritoFallo,movimiento,true);
                }
                //En caso de encontrar mas de un distrito fallido, muestro el mensaje del distrito que fallo
                else
                {
                    //Recorro los elementos de los distritos fallados para guardarlo en texto y mostrarlo en un alert
                    const listaTexto = me.distritoFallo.map(d => `- ${d.distritoNombre}`).join('\n');
                    alert("La clonacion fallo en: \n" + listaTexto + "\nReintentalo en la seccion de Fallas de clonacion");
                    //Llamo a la funcion para guardar el movimiento en la bitacora d usuario
                    me.crearBitacoraUsuario(idUsuario,usuario,me.descripcionMovimiento,listaTexto,me.distritoFallo,movimiento,false);
                }

                //Desabilito el modal que me dice en que distrito se esta clonando el usuario
                me.cargando = false;
                //proceso a cerrar el modal, limpiar las variables y volver a listar los usuarios
                me.close();
                me.$notify('La información se guardo correctamente !!!','success') 
                me.listar();
                
                
                
            },
            //Funcion para crear, editar y desactivar los movimeintos de las bitacoras de usuarios
            //Esta funcion recibe el id de usuario, el usuario, la descripcion de los movimientos, la lista en texto de los distritos que fallaron,
            //El arreglo de los distritos que fallaron, que tipo de de movimiento se hizo y el estatus de si la clonacion fue exitosa o fallo
            crearBitacoraUsuario(idUsuario,usuario,descripcionMovimiento,listaTexto,distritoFallo,movimiento,status)
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Api para crear el movimiento del usuario, hay un operador ternario para en caso de ser nuevo no hay modulo anterior, se pondra el primero registrado
                me.$controlacceso.post('api/Usuarios/CrearBitacoraUsuario',
                {
                    'UsuarioId':idUsuario,
                    'Usuario': usuario, 
                    'DescripcionMovimiento': descripcionMovimiento,
                    'ModuloServicioIdAnterior':me.ModuloServicioIdAnterior != '' ? me.ModuloServicioIdAnterior : me.idModuloServicio.value,
                    'DistritoFallo':listaTexto,
                    'ArregloDistritoFallo':JSON.stringify(distritoFallo),
                    'Proceso':movimiento,
                    'Status':status, 
                    'DistritoHaceMovimiento': me.u_distrito,
                    'DirSubHaceMovimiento':me.u_dirSubPro,
                    'AgenciaHaceMovimiento':me.u_agencia,
                    'ModuloHaceMovimiento':me.u_modulo,
                    'ModuloServicioIdHaceMovimiento':me.u_idmoduloservicio,
                    'UsuarioIdHaceMovimiento':me.u_idusuario,
                    'ResponsableCuentaHaceMovimiento':me.u_responsablecuenta,

                }, configuracion).then(function(response)
                {
                    me.$notify('La información se guardo correctamente !!!','success');
                    
                }).catch(err => 
                {  
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
                        me.$notify('Error al intentar crear el  registro!!!','error')   
                    } 
                });
            },
            //Funcion para ver el movimiento de los usuarios, dicha funcion recibe los valores del usuario seleccionado
            verHistorial(item)
            {
                let me=this;  

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Limpio el arreglo para este limpia la variable
                me.historialUsuario = [];
                me.$controlacceso.get('api/Usuarios/ListarHistorialUsuario/' + item.idUsuario, configuracion).then(function(response)
                {
                    //Guardo el resultado de la consulta y activo el modal para ver el movimiento
                    me.historialUsuario=response.data;
                    me.modalhistorial = true;

                }).catch(err => 
                { 
                    if (err.response.status==400)
                    {
                        me.$notify("No es un usuario válido", 'error')
                    } 
                    else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } 
                    else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } 
                    else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }
                    else{
                        me.$notify('Error al intentar listar los registros!!!','error')   
                    } 
                });
            },
            agregarpanel(item)
            {
                let me= this;

                //Se asignan en variables locales los datos del usuario para visualizar 
                this.distritoActual = item.distritoId
                this.idUsuario=item.idUsuario;
                this.idrol=item.rolId;
                this.nombre=item.nombre;
                this.puesto=item.puesto;
                this.idModuloServicio=item.moduloServicioId;
                this.nombreModulo= item.modulonombre;
                this.nombreAgencia= item.nombreAgencia;
                this.direccion=item.direccion;
                this.telefono=item.telefono;
                this.email=item.email;
                this.usuario= item.usuario;
                this.password=item.password_hash;
                this.passwordAnt=item.password_hash;
                this.editedIndex=1; 
                this.panel=[];
                this.panelesAnteriores = [];

                

                //Api para listar los paneles
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                var panelArray=[]; 

                me.$controlacceso.get('api/PanelUsuarios/ListarAsignados/' + me.idUsuario, configuracion).then(function(response)
                { 
                    panelArray = response.data;
                    panelArray.map(function(x){me.panel.push({text:x.nombrePanel, value: x.panelControlId}); });

                    //Se activa  el modal para ver los paneles
                    me.addPanel=true;
                    //Se le asigna los valores que ya se tenian registrado previmente
                    me.panelesAnteriores = me.panel;

                }).catch(err => 
                { 
                    if (err.response.status==400)
                    {
                        me.$notify("No es un usuario válido", 'error')
                    } 
                    else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } 
                    else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } 
                    else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }
                    else{
                        me.$notify('Error al intentar listar los registros!!!','error')   
                    } 
                });
            },
            activarDesactivarMostrar(accion,item)
            {

                //Se asignan en variables locales los datos del usuario para la correctan insercion en la bitacora 
                this.distritoActual = item.distritoId
                this.idUsuario=item.idUsuario;
                this.idrol=item.rolId;
                this.nombre=item.nombre;
                this.puesto=item.puesto;
                this.idModuloServicio=item.moduloServicioId;
                this.nombreModulo= item.modulonombre;
                this.nombreAgencia= item.nombreAgencia;
                this.direccion=item.direccion;
                this.telefono=item.telefono;
                this.email=item.email;
                this.usuario= item.usuario;
                this.password=item.password_hash;
                this.passwordAnt=item.password_hash;
                this.editedIndex=1;
                //Al momento de terminar el proceso las variables se limpian 

                this.adModal=1;

                this.adNombre=item.nombre;
                this.adId=item.idUsuario;  

                //Condicionales para monstrar mensaje correcto
                if (accion==1)
                {
                    this.adAccion=1;
                }
                else if (accion==2)
                {
                    this.adAccion=2;
                }
                else
                {
                    this.adModal=0;
                }
            },
            activar()
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Creo de manera fija la descripcion de activacion
                me.descripcionMovimiento = "Se activo el usuario " + me.usuario;

                me.$controlacceso.put('api/Usuarios/Activar/'+ me.adId,{},configuracion).then(function(response)
                {
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    //Inicio el proceso de clonacion
                    me.clonacionUsuarios(me.idUsuario,me.usuario,"Activación de usuario");
                    me.listar();  
                    
                }).catch(err => 
                {  
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
                        me.$notify('Error al intentar actualizar el registro!!!','error')   
                    }  
               });
            },
            desactivar()
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Creo de manera fija la descripcion de desactivacion
                me.descripcionMovimiento = "Se desactivo el usuario " + me.usuario;

                me.$controlacceso.put('api/Usuarios/Desactivar/'+this.adId,{},configuracion).then(function(response)
                {
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    //Inicio el proceso de clonacion
                    me.clonacionUsuarios(me.idUsuario,me.usuario,"Desactivación de usuario");
                    me.listar();  

                }).catch(err => 
                {  
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
                        me.$notify('Error al intentar actualizar el registro!!!','error')   
                    }  
               });
            },
        close () {
            this.dialog = false;
            this.addPanel = false;
            this.limpiar();
        },
        agregar(){
            this.dialog=true;
        },
        limpiar(){
            this.id="";
            this.idrol="";
            this.nombre="";
            this.idModuloServicio="";
            this.puesto="";
            this.distrito = ""
            this.direccion="";
            this.telefono="";
            this.email="";
            this.usuario="";
            this.password="";
            this.passwordAnt="";
            this.panel=[];
            this.iddsp ="";
            this.idagencia ="",
            this.idModuloServicio="";
            this.actPassword=false;
            this.editedIndex=-1;
            this.distritoActual=''
            this.distritoEstaba = '';
            this.distritoFallo = [];
            this.ModuloServicioIdAnterior = '';

            //Limpiar variables de dialogo
            this.nombreAnt='';
            this.responsableAnt='';
            this.puestoAnt='';
            this.direcionAnt='';
            this.distritoAnt='';
            this.subdirAnt='';
            this.agenciaAnt='';
            this.moduloAnt='';
            this.rolAnt='';
            this.rolIdAnt='';
            this.emailAnt='';
            this.telefonoAnt='';
            this.usuarioAnt='';
            this.distritoIdAnt='';
            this.subdirIdAnt='';
            this.agenciaIdAnt='';
            this.moduloIdAnt='';

            this.descripcionMovimiento = '';
            this.panelesAnteriores = [];
        },
        obtenermes: function (mes) 
            {
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
    }
    }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
.dialog-top-center {
  align-self: flex-start !important;
  margin-top: 100px !important; /* Puedes ajustar esto */
  margin-left: auto !important;
  margin-right: auto !important;
}

</style>