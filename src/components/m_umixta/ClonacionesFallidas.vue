<template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />

        <UmixtaNavDrawer />

        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title>Clonaciones fallidas</v-toolbar-title>
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
            </v-toolbar>

            <v-data-table
                :headers="headers"
                :items="clonacionesFallidas"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >

                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.usuario }}</td>  
                    <td>{{ props.item.descripcionMovimiento }}</td> 
                    <td>{{ props.item.distritoFallo }}</td>  
                    <td>{{ props.item.proceso }}</td>  
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
                    <td>
                    <v-icon 
                        class="mr-2" color="success"
                        @click="reintentarClonacion(props.item)"
                        >
                        refresh
                    </v-icon>

                </td> 
                </template>

                <template slot="no-data">
                    <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>

            </v-data-table>
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
        </v-flex>
    </v-layout>
</template>

<script>
    import n401 from './401.vue'
    import n403 from './403.vue'
    import axios from 'axios'
    import VeeValidate from 'vee-validate' 
    import { error } from 'util';
    import UmixtaNavDrawer from './umixtaNavDrawer.vue'

    export default {
        components: {
            n401,
            n403,
            VeeValidate,
            'vue2-editor': require('vue2-editor').Vue2Editor,
            UmixtaNavDrawer
        },
        data()
        {
            return {   
                e401:false,
                e403:false,
                showpage:true,
                dialog: false,
                headers: [
                    { text: 'Usuario', value: 'usuario' },
                    { text: 'Descripcion del movimiento', value: 'descripcionMovimiento' },
                    { text: 'Distrito donde fallo', value: 'distritoFallo' },
                    { text: 'Proceso', value: 'proceso' },
                    { text: 'Quien hizo el movimiento', value: 'responsableCuentaHaceMovimiento' },
                    { text: 'fecha del movimiento', value: 'fechaRegistro' },
                    { text: 'Opciones', value: 'opciones', sortable: false },
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 50
                },
                editedIndex: -1,

                clonacionesFallidas:[],
                distritos:[],
                distritoFallo:[],
                cargando: false,
                distritoEnProceso:'',
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo modulo' : 'Actualizar modulo'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
            
        },


       watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created: function() 
        {  
            this.u_idmoduloservicio=this.$store.state.usuario.idmoduloservicio;

            this.listar(); 
            // Add a request interceptor
            axios.interceptors.request.use( (config)=> {
            // Do something before request is sent
            this.$store.commit('LOADER',true);
            return config;
            }, (error)=> {
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });

            // Add a response interceptor
            axios.interceptors.response.use((response)=>{
            this.$store.commit('LOADER',false);
            // Do something with response data
            return response;
            },  (err)=> {
            
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });
        },
        methods:{
            listar()
            {
                let me=this;  

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                me.clonacionesFallidas = [];
                me.$controlacceso.get('api/Usuarios/ListarClonacionesUsuariosFallidosPorModulo/' + me.u_idmoduloservicio, configuracion).then(function(response)
                {
                    me.clonacionesFallidas=response.data;

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
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } 
                    else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }
                    else{
                        me.$notify('Error al intentar listar los registros','error')   
                    } 
                });
      
            },

            //Funcion para la clonacion de usuarios en todos los distritos
            async reintentarClonacion(item)
            {
                let me=this;

                me.distritos = JSON.parse(item.arregloDistritoFallo); 

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                //Activo el modal que me dice en que distrito se esta clonando el usuario
                me.cargando = true;

                //Recorro los elementos del arreglo del conjunto
                for(var i  = 0 ;i < me.distritos.length ; i++)
                {

                    //Aqui asigno valor del distrito que estoy clonaod para mostrar lo en el modal
                    me.distritoEnProceso = me.distritos[i].distritoNombre;
                    try 
                    {
                        const response = await me.$controlacceso.post('api/Usuarios/ClonarUsuarioCA',
                        {
                            'idusuario':item.usuarioId,
                            'idDistrito':me.distritos[i].distrito,

                        }, configuracion)

                        if(response.status == 200)
                        {
                        }
                    } catch (err) 
                    {
                        //En caso de fallar una clonacion guardo en un arreglo los distritos que hayan fallado, junto con su valor de texto
                        me.distritoFallo.push({distrito : me.distritos[i].distrito, distritoNombre : me.distritos[i].distritoNombre  });
                    }
                }
                //Si el arreglo de fallas es vacio quiere decir que todo funciono correctamente
                if(me.distritoFallo.length == 0)
                {
                    this.editarBitacora(item.idBitacoraUsuario,"",me.distritoFallo,true);
                    alert("La clonación de usuario funciono correctamente en TODOS los distritos");
                }
                //En caso de encontrar mas de un distrito fallido, muestro el mensajed del distrito que fallo
                else
                {
                    const listaTexto = me.distritoFallo.map(d => `- ${d.distritoNombre}`).join('\n');

                    alert("La clonacion fallo en: \n" + listaTexto + "\nReintentalo en la seccion de Fallas de clonacion");

                    this.editarBitacora(item.idBitacoraUsuario,listaTexto,me.distritoFallo,false);
                }
                  
            },
            editarBitacora(idbitacora,listaTexto,distritoFallo,status)
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                me.$controlacceso.put('api/Usuarios/EditarBitacoraUsuario',
                {
                    'idBitacoraUsuario':idbitacora,
                    'DistritoFallo':listaTexto,
                    'ArregloDistritoFallo':JSON.stringify(distritoFallo),
                    'Status':status, 

                }, configuracion).then(function(response)
                {
                    me.cargando = false;
                    me.close();
                    me.$notify('Fin del proceso !!!','success') 
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
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar crear el  registro!!!','error')   
                    } 
                });
            },
            close () {
                this.limpiar();
            },
            
            limpiar()
            {
                this.distritoFallo = [];
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