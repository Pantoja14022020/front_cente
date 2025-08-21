<template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />

        <UmixtaNavDrawer />

            <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Lapsos de atención.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

        
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="registros"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
            
                    
                    <td>{{ props.item.rac }}</td>    
                    <td>{{ props.item.u_Nombre }}</td>  
                    <td><v-icon  class="mr-2"  >date_range</v-icon>{{ formatearfecha(props.item.fechaHoraRegistro)  }}</td> 
                    <td>
                         <div v-if="formatearfecha(props.item.fechaHoraAtencion) == 'Invalid date'">
                            <v-icon     class="mr-2" color="success">remove</v-icon>
                        </div> 
                        <div v-else>
                            <v-icon  class="mr-2"  >date_range</v-icon>
                             {{formatearfecha(props.item.fechaHoraAtencion)}}
                        </div>
                    </td> 
                    <td>
                         <div v-if="formatearlapso(props.item.fechaHoraRegistro, props.item.fechaHoraAtencion) == 'NaN min'">
                            <v-icon  class="mr-2" color="success">remove</v-icon>
                        </div> 
                        <div v-else>
                            <v-icon  class="mr-2"  >access_time</v-icon>
                              {{ formatearlapso(props.item.fechaHoraRegistro, props.item.fechaHoraAtencion) }}
                        </div>
                    </td>  
                    <td>
                        <div v-if="formatearfecha(props.item.fechaHoraCierre) == 'Invalid date'">
                            <v-icon     class="mr-2" color="success">remove</v-icon>
                        </div> 
                        <div v-else>
                            <v-icon  class="mr-2"  >date_range</v-icon>
                             {{formatearfecha(props.item.fechaHoraCierre)}}
                        </div>
                    </td> 
                    <td>
                        <div v-if="formatearlapso(props.item.fechaHoraRegistro, props.item.fechaHoraCierre) == 'NaN min'">
                            <v-icon     class="mr-2" color="success">remove</v-icon>
                        </div> 
                         <div v-else>
                             <v-icon  class="mr-2"   >access_time</v-icon>
                             {{formatearlapso(props.item.fechaHoraRegistro, props.item.fechaHoraCierre)}}
                        </div>
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
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    import VeeValidate from 'vee-validate'
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
    import moment from 'moment'
    import 'moment/locale/es';
    import UmixtaNavDrawer from './umixtaNavDrawer.vue'

    export default {
        components: {  
            n401,
            n403,
            UmixtaNavDrawer
        }, 
        data(){
            return {                 
                //-------Logos-----------------------------------------/
                logo1:'',
                logo2:'',
                //************************* */ 
                headers: [ 
                    { text: 'RAC', value: 'rac',  },     
                    { text: 'Atendido por', value: 'registradoPor'}, 
                    { text: 'Registro', value: 'fechaHoraRegistro',  },
                    { text: 'Atencion', value: 'fechaHoraAtencion',  },
                    { text: 'Lapso R-A', value: 'lapso1',   }, 
                    { text: 'Finalizo', value: 'fechaHoraCierre', }, 
                    { text: 'Lapso R-F', value: 'lapso2',  }, 
                                                 
                ],
               
                /****************************************************************************** */
                showpage:true,
                e401:false,
                e403:false,
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
                /**************** */
                rahid:'',
                rAtencionId:'',
                rHechoId:'',
                registros:[],
                rac:'',
                //*************** */
             
               
                
                editedIndex: -1,  
                duracion:'',
           
            }
        },
        
        watch: {
             
        },

        created () {
            this.listar(); 
            this.listarLogo(); 
        },
        methods:{
            
            listarLogo(){
        
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
                    me.logo1= response.data.logo1;
                    me.logo2= response.data.logo2;
                    
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
            listar(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                this.$cat.get('api/RAtencions/Listar',configuracion).then(function(response){
                    me.registros=response.data;
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
            formatearfecha: function(fecha){
                  return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
          formatearlapso: function(fr, fa){
                var a = moment(fa);//now
                var b = moment(fr);

                return (a.diff(b, 'minutes')) + ' min'
              
            },

           
        }        
    }
</script>
<style> 
    #logo1 {
        float: left;
        margin-left: 2%;
        margin-right: 2%;
    }
    #logo2 {
        float: right;
        margin-left: 2%;
        margin-right: 2%;
    }
    #imagen1 {
        width: 297px;
    }
     #imagen2 {
        width: 95px;
    }
   #datos {
         
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: right;
    }

    #encabezado {
        text-align: right;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 27px;
    }
    #cuerpo {
     
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: justify;
    }
    .titulo {
         font-size: 22px;
    }
    .texto{
        font-size: 20px;
        
    }
    .tituloright {
         font-size: 22px;
         text-align: right;
    }
    .textoright{
        font-size: 20px;
        text-align: right;
    }
    #formato {
        text-align: left;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 20px;
    }
     #titcenter { 
        text-align: center;
    }
     section {
        clear: left;
    }

    
    #footer {
        margin-top: 20%;
        text-align: center;
    }
    .table {
         width:100%;
          margin-top: 10px;
        margin-left: 10px;
         border-collapse:collapse;
        border-spacing:30px;
      }
</style>

 