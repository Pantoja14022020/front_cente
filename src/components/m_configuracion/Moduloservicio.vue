<template>
    <v-layout align-start>

        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <NavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Modulo o servicio.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="dialog=true" class="mx-2" v-on="on" fab dark small color="primary" ><v-icon>add</v-icon></v-btn>
                        </template>
                        <span>Agregar Registro </span>
                        
                    </v-tooltip>
                    <v-dialog   v-model="dialog"  max-width="750px" persistent> 
                         
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                                </v-avatar> 
                            <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                        <v-spacer></v-spacer> 
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12> 
                                            <v-autocomplete name="distrito"
                                                      label="Distrito" 
                                                      v-model="distritoId"
                                                      :items="distritos" 
                                                      return-object
                                                      v-on:change="listarDSP()" 
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('distrito')" >
                                            </v-autocomplete>
                                            <v-autocomplete name="dirección o subprocuraduria"
                                                      label="Direccion o subprocuraduria:" 
                                                      v-model="dspId"
                                                      :items="dsps"  
                                                      v-on:change="listarAgencia()" 
                                                      return-object
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('dirección o subprocuraduria')" >
                                            </v-autocomplete>
                                            <v-autocomplete name="agencia"
                                                      label="Agencia:" 
                                                      v-model="agenciaId"
                                                      :items="agencias"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('agencia')" >
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field name="clave" 
                                                          label="Clave:"
                                                          v-model="clave" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('clave')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-select name="tipo"
                                                      label="Tipo:" 
                                                      v-model="tipo"
                                                      :items="tipos"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('tipo')" >
                                            </v-select>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field name="nombre" 
                                                          label="Nombre:"
                                                          v-model="nombre" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12>
                                            <v-switch 
                                                v-model="serviciointerno"
                                                :label="`Servicio Interno: ${textosino}`"
                                                color="success"
                                            ></v-switch>
                                        </v-flex>

                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="close" >Cancelar</v-btn>
                                    <v-btn @click.native="guardar" class="success" >Guardar</v-btn>
                                </v-card-actions>
                            </v-form>
                        
                        </v-card-text> 
                        </v-card> 
                    </v-dialog>
                    
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="modulos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                   
                    <td>{{ props.item.agencia }}</td>
                    <td>{{ props.item.clave }}</td>
                    <td>{{ props.item.tipo }}</td> 
                    <td>{{ props.item.nombre }}</td> 
                    <td>
                        <div v-if="props.item.condicion">
                            <span class="blue--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                    <td class="justify-center layout px-0"> 
                            <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="editItem(props.item)"
                                        >
                                       edit
                                    </v-icon> 
                                </template>
                                <span>Editar registro</span>
                            </v-tooltip>

                            <v-tooltip bottom  v-if="props.item.condicion" >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="activarDesactivarModulo(props.item)"
                                        >
                                        block
                                    </v-icon> 
                                </template>
                                <span>Desactivar Modulo</span>
                            </v-tooltip>

                            <v-tooltip bottom  v-if="!props.item.condicion" >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="activarDesactivarModulo(props.item)"
                                        >
                                        closed_caption
                                    </v-icon> 
                                </template>
                                <span>Activar Modulo</span>
                            </v-tooltip>

                    </td>
                     
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>

            <!-- Modal para activar, desactivar ModuloServicio -->
            <v-dialog v-model="modalModActDes" max-width="400px" persistent>
                        <v-card>
                            <v-card-title class="subheading thin" v-if="!this.condicion"><v-icon>security</v-icon>¿Activar Modulo?</v-card-title>
                            <v-card-title class="subheading thin" v-if="this.condicion"><v-icon>security</v-icon>¿Desactivar Modulo?</v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span v-if="!this.condicion">Activar </span>
                                <span v-if="this.condicion">Desactivar </span>
                                el Modulo servicio con  el nombre: <b>{{ nombre }}</b>
                                de la agencia: <b>{{ agenciaNombre }}</b>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn   @click="modalClose()">
                                    Cancelar
                                </v-btn>
                                <v-btn v-if="!this.condicion" color="success"   @click="actdesModulo()">
                                    Activar
                                </v-btn>
                                <v-btn v-if="this.condicion" color="success"   @click="actdesModulo()">
                                    Desactivar
                                </v-btn>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'  
    import VeeValidate from 'vee-validate'   
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
    import NavDrawer from './ConfiguracionNavDrawer.vue'

    export default {
        components: {      
            n401,
            n403,
            NavDrawer,
        },
        data(){
            return {      
                dialog: false,
                headers: [
                    { text: 'Agencia', value: 'agencia' },
                    { text: 'Clave', value: 'clave'},
                    { text: 'Tipo', value: 'tipo' },
                    { text: 'Nombre', value: 'nombre',  }, 
                    { text: 'Estado', value: 'Estado' },
                    { text: 'Opciones', value: 'opciones', sortable: false }                               
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 50
                },
                editedIndex: -1, 

                modulos:[], 
                idModuloServicio:'', 
                nombre:'', 
                clave:'',

                distritos:[], 
                distritoId: '',

                dsps:[], 
                dspId: '', 

                agencias:[],  
                agenciaId: '',

                serviciointerno:false,

                tipo:'',
                tipos:[
                    'Mesa',
                    'Recepción',
                    'Direccion',
                    'Supervicion',
                    'Coordinador y/o Juridico', 
                    'Laboratorio',
                    'Unidad de Investigación',
                    'Perito',
                    'Facilitador',
                    'Notificador',

                ],          
                showpage:true,
                e401:false,
                e403:false,
                modalModActDes: false,
                moduloNombre: '',
                agenciaNombre: '',
                condicion: true,
                proceso:'',
                idModulo:'',
                
                
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo modulo o servicio' : 'Actualizar modulo o servicio'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
            textosino(){
            if(this.serviciointerno)
            return 'Si'; else return 'No';
            },
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.listarDistritos()
             

            axios.interceptors.request.use( (config)=> {
            // Do something before request is sent 
            this.$store.commit('LOADER',true);
            return config;
            }, (error)=> { 
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject( error);
            });

            // Add a response interceptor
            axios.interceptors.response.use((response)=>{ 
            this.$store.commit('LOADER',false);
            // Do something with response data 
            return response;
            },  (error)=> { 
            // Do something with request error
            this.$store.commit('LOADER',false); 
            return Promise.reject(error);
            });
        },
        methods:{
            listar(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ModuloServicios/Listar',configuracion).then(function(response){
                    me.modulos=response.data;
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')     
                    } 
                });
            },
            listarDistritos(){
                let me=this;
                var distritosArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
                    distritosArray=response.data;
                    distritosArray.map(function(x){
                        me.distritos.push({text: x.nombre,value:x.idDistrito});
                    });
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
                });
            },
            listarDSP(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var dspArray=[];
                var iddistrito='';
                me.dsps=[];
                if (!me.distritoId.value)
                {
                    iddistrito=me.distritoId;
                    me.dspId ="";
                    me.agenciaId ="";
                }
                else
                {
                    iddistrito=me.distritoId.value;
                }
                this.$conf.get('api/DSPs/ListarPorDistritoId/' + iddistrito,configuracion).then(function(response){
                    dspArray=response.data;
                    dspArray.map(function(x){
                        me.dsps.push({text: x.nombreSubDir,value:x.idDSP});
                    });
              }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
                });
            },
            listarAgencia(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var agenciasArray=[];
                var dspid='';
                if (!me.dspId.value)
                {
                   dspid=me.dspId;
                }
                else
                {
                    dspid=me.dspId.value;
                    me.agenciaId ="";
                }
                me.agencias=[];
                this.$conf.get('api/Agencias/ListarPorDirSub/' + dspid,configuracion).then(function(response){
                    agenciasArray=response.data;
                    agenciasArray.map(function(x){
                        me.agencias.push({text: x.nombre,value:x.idAgencia});
                    });
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')     
                    } 
                });
            },
            editItem (item) { 
                this.editedIndex=1;
                this.distritoId =item.distritoId;
                this.listarDSP();
                this.dspId = item.dspId;
                this.listarAgencia();
                this.idModuloServicio = item.idModuloServicio;  
                this.agenciaId= item.agenciaId; 
                this.clave= item.clave;
                this.tipo = item.tipo;
                this.nombre=item.nombre; 
                this.serviciointerno = item.servicioInterno;  
                this.condicion = item.condicion;
                this.dialog = true;
            }, 
            close () {
                this.dialog = false;
                this.limpiar();
            },  
            limpiar(){
                this.serviciointerno = false;
                this.editedIndex=-1;
                this.modalModActDes = false;
                this.distritoId=""; 
                this.dspId=""; 
                this.agenciaId=""; 
                this.idModuloServicio="";  
                this.clave="";
                this.tipo = "";
                this.nombre="";  
                this.agenciaNombre = "";
                this.condicion = true;
            },
            async guardar () {
                const result = await this.$validator.validate();
                    if (!result) return;
                    let primer_id = null;
                    let me = this;
                    let header = { "Authorization": "Bearer " + this.$store.state.token };
                    let configuracion = { headers: header };
                        if (this.editedIndex > -1) {
                            // Código para editar
                            this.proceso = "Actualizar";
                            try {
                                const response = await this.$conf.put('api/ModuloServicios/Actualizar',{
                                    'idModuloServicio': me.idModuloServicio,
                                    'clave': me.clave,
                                    'agenciaId': me.agenciaId,
                                    'tipo': me.tipo,
                                    'nombre': me.nombre, 
                                    'servicioInterno': me.serviciointerno,
                                    'condicion': me.condicion
                                }, configuracion);
                                primer_id = 1;
                            } catch (err) {
                                this.close();
                                this.$notify(`No se pudo actualizar el registro en el distrito principal`, 'error');
                                this.listar();
                                this.limpiar();
                                return;
                            }
                            if (primer_id) {
                                for (const distrito of this.distritos) {
                                    await this.replicarRegistro(distrito, this.idModuloServicio);
                                }
                                this.close();
                                this.$notify('La información se actualizó correctamente!!!', 'success');
                                this.listar();
                                this.limpiar();
                            }
                        } else {
                            // Código para guardar
                            this.proceso = "Guardar";
                            try {
                                const response = await this.$conf.post('api/ModuloServicios/Crear',{
                                    'agenciaId': me.agenciaId,
                                    'clave': me.clave,
                                    'tipo': me.tipo,
                                    'nombre': me.nombre, 
                                    'servicioInterno' : me.serviciointerno,
                                     'condicion': me.condicion
                        }, configuracion)
                        primer_id = response.data.id;
                    } catch (err) {
                        this.close();
                        this.$notify(`No se pudo crear el registro en el distrito principal`, 'error');
                        this.listar();
                        this.limpiar();
                        return;
                    }if(primer_id){
                        for (const distrito of this.distritos) {
                            await this.replicarRegistro(distrito, primer_id);
                        }
                        this.close();
                        this.$notify('¡La información se guardo correctamente!','success')  
                        this.listar();
                        this.limpiar();
                    }
                }
            },async replicarRegistro(distrito, _primer_id) {
                let me = this;
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                try {
                    const response = await axios.post(`api/ModuloServicios/Replicar`, {
                        'distritoId': distrito.value,
                        'idModuloServicio': _primer_id,
                        'clave': me.clave,
                        'agenciaId': me.agenciaId,
                        'tipo': me.tipo,
                        'nombre': me.nombre, 
                        'servicioInterno': me.serviciointerno,
                        'condicion': me.condicion
                    }, configuracion)
                    
                    if(response.status == 200)
                    {
                        await this.error_registro({IdRegistro: _primer_id, IdDistrito: distrito.value,NombreDistrito: distrito.text, ActRegistro: true});
                    }
                } catch (err) {
                    this.$notify(`El distrito ${distrito.text} tiene problemas en conexion`, 'error');
                    await this.error_registro({IdRegistro: _primer_id, IdDistrito: distrito.value,NombreDistrito: distrito.text, ActRegistro: false});
                }
            },
            async error_registro(error) {
                let me = this;
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                try {
                    const reponse = await axios.post(`api/ErroresReplicacion/RegistrarError`, {
                        'ActualizaRegistro': error.ActRegistro,
                        'RegistroErrorId': error.IdRegistro,
                        'DistritoId': error.IdDistrito,
                        'NombreDistrito': error.NombreDistrito,
                        'Proceso': me.proceso,
                        'Modulo': 'Modulo o Servicio',
                        'Status': true
                    }, configuracion)

                    if(reponse.status == 201)
                    {
                        me.$notify(reponse.data.mensaje, 'warning');
                    }
                } catch (err) {
                    this.$notify("No se pudo crear o actualizar el registro del error.", 'error');
                }
            },
            activarDesactivarModulo(item){
                this.modalModActDes = true;
                this.agenciaNombre = item.agencia;
                this.dspId = item.dspId;
                this.idModuloServicio = item.idModuloServicio;  
                this.agenciaId= item.agenciaId; 
                this.clave= item.clave;
                this.tipo = item.tipo;
                this.nombre=item.nombre; 
                this.serviciointerno = item.servicioInterno;  
                this.condicion = item.condicion;
            },
            modalClose(){
                this.modalModActDes = false;
            },
            async actdesModulo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                if (this.condicion) {
                    
                    this.proceso = "Desactivar Modulo";
                    const response = await this.$conf.put('api/ModuloServicios/DesactivarModulo/'+this.idModuloServicio,{},configuracion)
                    .catch(err => {  
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar actualizar el registro!!!','error')   
                        }  
                    });
                    if(response.status == 200){
                        me.condicion = false;
                        for (const distrito of this.distritos) {
                            await me.replicarRegistro(distrito, me.idModuloServicio);
                        }
                        me.$notify('La información se actualizo correctamente !!!','success')  
                        me.listar();
                        me.limpiar();
                    }
                }
                else
                {
                    this.proceso = "Activar Modulo";
                    const response = await this.$conf.put('api/ModuloServicios/ActivarModulo/'+this.idModuloServicio,{},configuracion) 
                    .catch(err => {  
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar actualizar el registro!!!','error')   
                        }  
                    });
                    if(response.status == 200){
                        me.condicion = true;
                        for (const distrito of this.distritos) {
                            await me.replicarRegistro(distrito, me.idModuloServicio);
                        }
                        me.$notify('La información se actualizo correctamente !!!','success')  
                        me.listar();
                        me.limpiar();
                    }
                }

            },
        }        
    }
</script>