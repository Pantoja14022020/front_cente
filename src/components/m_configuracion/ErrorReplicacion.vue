<template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <ConfiguracionNavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Errores de replicacion</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog   v-model="dialog"  max-width="600px" persistent>
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">info</v-icon>
                                </v-avatar>
                                <v-toolbar-title class="subheading">Información del registro</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form">
                                    <v-container fluid>
                                        <v-layout row wrap class="w-100">
                                            <v-card elevation="0">
                                                <v-card-title class="accent">
                                                    <h3>{{subtitulo_modulo}}</h3>
                                                </v-card-title>
                                                <v-card-text>
                                                    <table>
                                                        <tr v-for="(item, index) in mostrar_informacion" :key="index">
                                                            <td style="width: 180px">{{ item.nombreCampo }}</td>
                                                            <td><b>{{ item.valor }}</b></td>
                                                        </tr>
                                                    </table>
                                                </v-card-text>
                                            </v-card>
                                        </v-layout>
                                    </v-container>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="close" >Cancelar</v-btn>
                                        <v-btn @click.native="guardar" class="success" >Solucionar error</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text> 
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="errores"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.nombreDistrito }}</td> 
                    <td>{{ props.item.modulo }}</td> 
                    <td>{{ props.item.proceso }}</td> 
                    <td>{{ props.item.fechaCreacion }}</td> 
                    <td>
                        <span :style="{ color: props.item.status ? 'red' : 'green' }">
                        {{ props.item.status ? "No solucionado" : "Solucionado" }}
                        </span>
                    </td>
                    <td> 
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    class="mr-2" v-on="on" color="green" 
                                    @click="editItem(props.item)"
                                    >
                                    brightness_low
                                </v-icon> 
                            </template>
                            <span>Solucionar Registro</span>
                        </v-tooltip>
                    </td>  
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios' 
    import VeeValidate from 'vee-validate' 
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
import ConfiguracionNavDrawer from './ConfiguracionNavDrawer.vue';
    export default {
        components: {      
            n401,
            n403,
            ConfiguracionNavDrawer
        },
        data(){
            return {
                                
                dialog: false,
                headers: [
                    { text: 'Nombre Distrito', value: 'nombredistrito' },
                    { text: 'Modulo', value: 'modulo',  },
                    { text: 'Proceso Fallo', value: 'proceso',  },
                    { text: 'Fecha creacion', value: 'fechacreacion',  }, 
                    { text: 'Status', value: 'status',  }, 
                    { text: 'Opciones', value: 'opciones', sortable: false },
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 50
                },
                editedIndex: -1,
                errores:[],
                distritos:[],
                dsps:[],
                agencia_area:[],
                modulo_servicio:[],
                mostrar_informacion:[],
                nombreDistrito:'',
                idDistrito: '',
                idReplicacion:'',
                registroErrorId: '',
                modulo:'',
                subtitulo_modulo:'',
                showpage:true,
                e401:false,
                e403:false,
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            
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
                axios.get('api/ErroresReplicacion/Listar',configuracion).then(function(response){
                    me.errores=response.data.map(item => {
                        return {
                            ...item,
                            fechaCreacion: item.fechaCreacion.split('T')[0]
                        };
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
            async editItem (item) {
                let me = this;
                me.editedIndex=1; 
                me.idDistrito = item.distritoId;
                me.idReplicacion = item.idReplicacion;
                me.registroErrorId = item.registroErrorId;
                me.nombreDistrito = item.nombreDistrito;
                me.modulo= item.modulo;
                
                let header = { "Authorization": "Bearer " + me.$store.state.token };
                let configuracion = { headers: header };

                if(me.modulo == 'Distrito')
                {
                    try {
                        axios.get(`api/Distritoes/Listarporid/${me.registroErrorId}`,configuracion).then(function(response){
                            me.distritos=response.data;
                            me.mostrar_informacion =
                                [
                                    { "nombreCampo": "Clave", "valor":  me.distritos.clave },
                                    { "nombreCampo": "Nombre", "valor":  me.distritos.nombre },
                                    { "nombreCampo": "Direccion", "valor":  me.distritos.direccion },
                                    { "nombreCampo": "Telefono", "valor":  me.distritos.telefono },
                                    { "nombreCampo": "Contacto", "valor":  me.distritos.contacto },
                                    { "nombreCampo": "Nombre para JR", "valor":  me.distritos.nombrejr },
                                    { "nombreCampo": "Distrito Default", "valor":  me.distritos.statusAsginacion ? "Sí" : "No" },
                                ]
                            me.subtitulo_modulo = 'Información general del registro del distrito';
                            me.dialog = true;
                        })
                    } catch (err) {
                        me.$notify('Hubo problemas en consultar el registro "Distrito".', 'error');
                    }
                }
                else if(me.modulo == 'DSP')
                {
                    try {
                        axios.get(`api/DSPs/Listarporid/${me.registroErrorId}`,configuracion).then(function(response){
                            me.dsps=response.data;
                            me.mostrar_informacion =
                                [
                                    { "nombreCampo": "Distrito", "valor":  me.dsps.nombreDistrito },
                                    { "nombreCampo": "Clave", "valor":  me.dsps.clave },
                                    { "nombreCampo": "Nombre de la subprocuraduria", "valor":  me.dsps.nombreSub},
                                    { "nombreCampo": "Nombre de la direccion", "valor":  me.dsps.nombreSubDir},
                                    { "nombreCampo": "Responsable", "valor":  me.dsps.responsable },
                                    { "nombreCampo": "Telefono", "valor":  me.dsps.telefono },
                                    { "nombreCampo": "Tipo", "valor":  me.dsps.tipo },
                                    { "nombreCampo": "Inicia carpeta", "valor":  me.dsps.statusInicioCarpeta ? "Sí" : "No" },
                                ]
                            me.subtitulo_modulo = 'Información general del registro de la direccion o subprocuraduria';
                            me.dialog = true;
                        })
                    } catch (err) {
                        me.$notify('Hubo problemas en consultar el registro "Direccion o subprocuraduria".', 'error');
                    }
                }
                else if(me.modulo == 'Agencia / Area')
                {
                    try {
                        await axios.get(`api/Agencias/Listarporid/${me.registroErrorId}`, configuracion).then(function(response)
                        {
                            me.agencia_area = response.data;
                            me.mostrar_informacion =
                                [
                                    { "nombreCampo": "Distrito", "valor":  me.agencia_area.nombreDistrito },
                                    { "nombreCampo": "Direccion o Subprocuraduria", "valor":  me.agencia_area.nombreDirSub },
                                    { "nombreCampo": "Clave", "valor":  me.agencia_area.clave },
                                    { "nombreCampo": "Nombre", "valor":  me.agencia_area.nombre },
                                    { "nombreCampo": "Direccion", "valor":  me.agencia_area.direccion },
                                    { "nombreCampo": "Municipio", "valor":  me.agencia_area.municipio },
                                    { "nombreCampo": "Telefono", "valor":  me.agencia_area.telefono },
                                    { "nombreCampo": "Contacto", "valor":  me.agencia_area.contacto },
                                    { "nombreCampo": "Tipo de servicio", "valor":  me.agencia_area.tipoServicio },
                                    { "nombreCampo": "Servicio de detenciones", "valor":  me.agencia_area.condetencion ? "Sí" : "No" },
                                    { "nombreCampo": "Agencia activa", "valor":  me.agencia_area.activa ? "Sí" : "No" },
                                ]
                            me.subtitulo_modulo = 'Información general del registro de la agencia';
                            me.dialog = true;
                        });
                    } catch (err) {
                        me.$notify('Hubo problemas en consultar el registro "Agencia / Area".', 'error');
                    }
                }
                else if(me.modulo == 'Modulo o Servicio')
                {
                    try {
                        await axios.get(`api/ModuloServicios/Listarporid/${me.registroErrorId}`, configuracion).then(function(response)
                        {
                            me.modulo_servicio = response.data;
                            me.mostrar_informacion =
                                [
                                    { "nombreCampo": "Distrito", "valor":  me.modulo_servicio.nombreDistrito },
                                    { "nombreCampo": "Direccion o Subprocuraduria", "valor":  me.modulo_servicio.nombreDSP },
                                    { "nombreCampo": "Agencia", "valor":  me.modulo_servicio.agencia },
                                    { "nombreCampo": "Clave", "valor":  me.modulo_servicio.clave },
                                    { "nombreCampo": "Tipo", "valor":  me.modulo_servicio.tipo },
                                    { "nombreCampo": "Nombre", "valor":  me.modulo_servicio.nombre },
                                    { "nombreCampo": "Servicio interno", "valor":  me.modulo_servicio.servicioInterno ? "Sí" : "No" },
                                    { "nombreCampo": "Status modulo", "valor": me.modulo_servicio.condicion ? "Activado": "Desactivado"}
                                ]
                            me.subtitulo_modulo = 'Información general del registro del modulo o servicio';
                            me.dialog = true;
                        });
                    } catch (err) {
                        me.$notify('Hubo problemas en consultar el registro "Modulo o Servicio".', 'error');
                    }
                }
            },
            close () {
                this.dialog = false;
                this.limpiar();
            },
            limpiar(){
                this.distritos=[],
                this.dsps=[],
                this.agencia_area=[],
                this.modulo_servicio=[],
                this.mostrar_informacion=[],
                this.idDistrito='',
                this.idReplicacion='',
                this.registroErrorId='',
                this.modulo='',
                this.subtitulo_modulo='',
                this.switch1= false;
                this.editedIndex=-1;
                this.listar();
            },
            async guardar () {
                const result = await this.$validator.validate();
                if (!result) return;
                
                let me = this;
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
            
                if(me.modulo == 'Distrito')
                {
                    try{
                        const response = await axios.post('api/Distritoes/ClonarDistritos',{ 
                                'idDistrito': me.distritos.idDistrito,
                                'nombre': me.distritos.nombre,
                                'nombrejr': me.distritos.nombrejr,
                                'clave': me.distritos.clave,
                                'direccion': me.distritos.direccion,
                                'telefono': me.distritos.telefono, 
                                'contacto': me.distritos.contacto,
                                'statusAsginacion':me.distritos.statusAsginacion,
                                'nombrejr':me.distritos.nombrejr,
                                'distritoCnx': me.idDistrito
                            },configuracion);

                            if(response.status == 200)
                            {
                                await this.error_registro({IdRegistro: me.distritos.idDistrito, IdDistrito: me.idDistrito,NombreDistrito: me.nombreDistrito, ActRegistro: true});
                                this.$notify(`El registro del distrito ${me.nombreDistrito}, se soluciono correctamente`, 'success');
                            }
                    } catch(error) {
                        this.$notify(`El distrito ${me.nombreDistrito} tiene problemas en conexion`, 'error');
                        await this.error_registro({IdRegistro: me.distritos.idDistrito, IdDistrito: me.idDistrito,NombreDistrito: me.dsps.idDSP, ActRegistro: false});
                    }
                }
                else if(me.modulo == 'DSP')
                {
                    try{
                       const response = await axios.post('api/DSPs/ClonarDSPs',{ 
                                'idDSP': me.dsps.idDSP, 
                                'distritoId': me.dsps.distritoId,
                                'clave': me.dsps.clave,
                                'nombreSubDir': me.dsps.nombreDir, 
                                'NombreSub': me.dsps.nombreSub,
                                'responsable': me.dsps.responsable,
                                'telefono': me.dsps.telefono, 
                                'statusInicioCarpeta': me.dsps.statusInicioCarpeta,
                                'tipo' : me.dsps.tipo,
                                'statusDSP': me.statusDSP,
                                'distritoCnx': me.idDistrito
                            },configuracion);

                            if(response.status == 200)
                            {
                                await this.error_registro({IdRegistro: me.dsps.idDSP, IdDistrito: me.idDistrito,NombreDistrito: me.nombreDistrito, ActRegistro: true});
                                this.$notify(`El registro del distrito ${me.nombreDistrito}, se soluciono correctamente`, 'success');
                            }
                    } catch(error) {
                        this.$notify(`El distrito ${me.nombreDistrito} tiene problemas en conexion`, 'error');
                        await this.error_registro({IdRegistro: me.dsps.idDSP, IdDistrito: me.idDistrito,NombreDistrito: me.dsps.idDSP, ActRegistro: false});
                        console.log(error)
                    }
                }
                else if(me.modulo == 'Agencia / Area')
                {
                    try {
                        const response = await axios.post(`api/Agencias/Replicar`, {
                            'distritoId': me.idDistrito,
                            'IdAgencia': me.agencia_area.idAgencia,
                            'dSPId': me.agencia_area.dspId,
                            'clave': me.agencia_area.clave,
                            'nombre': me.agencia_area.nombre,
                            'direccion': me.agencia_area.direccion,
                            'municipio': me.agencia_area.municipio,
                            'telefono': me.agencia_area.telefono,
                            'contacto': me.agencia_area.contacto,
                            'tiposervicio': me.agencia_area.tipoServicio,
                            'Condetencion': me.agencia_area.condetenido,
                            'activa': me.agencia_area.activa,
                        }, configuracion)
                        
                        if(response.status == 200)
                        {
                            await this.error_registro({IdRegistro: me.agencia_area.idAgencia, IdDistrito: me.idDistrito,NombreDistrito: me.nombreDistrito, ActRegistro: true});
                            this.$notify(`El registro del distrito ${me.nombreDistrito}, se soluciono correctamente`, 'success');
                        }
                    } catch (err) {
                        this.$notify(`El distrito ${me.nombreDistrito} tiene problemas en conexion`, 'error');
                        await this.error_registro({IdRegistro: me.agencia_area.idAgencia, IdDistrito: me.idDistrito,NombreDistrito: me.nombreDistrito, ActRegistro: false});
                    }
                }
                else if(me.modulo == 'Modulo o Servicio')
                {
                    try {
                        const response = await axios.post(`api/ModuloServicios/Replicar`, {
                            'distritoId': me.idDistrito,
                            'idModuloServicio': me.modulo_servicio.idModuloServicio,
                            'clave': me.modulo_servicio.clave,
                            'agenciaId': me.modulo_servicio.agenciaId,
                            'tipo': me.modulo_servicio.tipo,
                            'nombre': me.modulo_servicio.nombre, 
                            'servicioInterno': me.modulo_servicio.serviciointerno,
                            'condicion': me.modulo_servicio.condicion
                        }, configuracion)

                        if(response.status == 200)
                        {
                            await this.error_registro({IdRegistro: me.modulo_servicio.idModuloServicio, IdDistrito: me.idDistrito,NombreDistrito: me.nombreDistrito, ActRegistro: true});
                            this.$notify(`El registro del distrito ${me.nombreDistrito}, se soluciono correctamente`, 'success');
                        }
                    } catch (err) {
                        this.$notify(`El distrito ${me.nombreDistrito} tiene problemas en conexion`, 'error');
                        await this.error_registro({IdRegistro: me.modulo_servicio.idModuloServicio, IdDistrito: me.idDistrito,NombreDistrito: me.nombreDistrito, ActRegistro: false});
                    }
                }
                this.close();
                this.listar();
            },
            async error_registro(error) {
                let proceso = "Al solucionar";

                let me = this;
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                try {
                    const reponse = await axios.post(`api/ErroresReplicacion/RegistrarError`, {
                        'ActualizaRegistro': error.ActRegistro,
                        'RegistroErrorId': error.IdRegistro,
                        'DistritoId': error.IdDistrito,
                        'NombreDistrito': error.NombreDistrito,
                        'Proceso': proceso,
                        'Modulo': 'Agencia / Area',
                        'Status': true
                    }, configuracion)

                    if(reponse.status == 201)
                    {
                        me.$notify(reponse.data.mensaje, 'warning');
                    }
                } catch (err) {
                    this.$notify("No se pudo crear o actualizar el registro del error.", 'error');
                }
            }
        }
    }
</script>