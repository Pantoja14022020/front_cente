<template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
            <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Turnos.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

                    
                </v-toolbar>
                  <v-data-table
                    :headers="headers"
                    :items="turnos"
                    :search="search" 
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"  >
                    <template slot="items" class="white" slot-scope="props">
                
                        
                        <td>{{ props.item.nombreAgencia }}</td>    
                        <td>{{ props.item.atendidopor }}</td> 
                        <td>{{ props.item.serie + props.item.noturno }}</td> 
                        <td>{{ props.item.modulo }}</td> 
                        <td> 
                             <div v-if="props.item.status">
                            <v-icon     class="mr-2" color="success">check_circle</v-icon>
                        </div>
                        <div v-else>
                            <v-icon     class="mr-2" color="warning">cancel</v-icon>
                        </div>
                        </td>  
                       
                          <td> 
                             <div v-if="props.item. statusReAsignado">
                            <v-icon     class="mr-2" color="warning">info</v-icon>
                        </div>
                        <div v-else>
                            <v-icon     class="mr-2"  >info</v-icon>
                        </div>
                        </td> 
                        <td><v-icon  class="mr-2"  >date_range</v-icon>{{ formatearfecha(props.item.fechaHoraInicio)  }}</td> 
                        <td> 
                          <v-tooltip bottom   >
                                <template v-slot:activator="{ on }"> 
                             
                                  <v-icon   
                                        class="mr-2" v-on="on"
                                        @click="reasignar(props.item)"
                                        >
                                        autorenew
                                    </v-icon>
                                </template>
                                <span>Turno reasignado al AMPO</span>
                            </v-tooltip>    
                        </td> 
                        
                
                    </template>
                    <template slot="no-data">
                    <v-btn color="primary" @click="listar">Resetear</v-btn>
                    </template>
            </v-data-table>
        </v-flex>


    <v-dialog   v-model="dialog"  max-width="500px"> 
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">info</v-icon>
                                </v-avatar>
                    
                         
                        <v-toolbar-title class="subheading">Reasignacion de turno</v-toolbar-title>
                        <v-spacer></v-spacer>
                    
                        
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12>
                                        <h2>Turno: <strong>{{v_turno }} </strong> en la {{v_mesa}}</h2>
                                        <br>
                                        <p> ¿Deseas reasignar el turno al Agente del  Ministerio publico?:{{v_ampo}}
                                               <v-switch v-model="v_reasignar"    color="success"  hide-details></v-switch>
                                        </p> 
                                             
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
    export default {
        data(){
            return {     
                components: {  
                    n401,
                    n403
                },   
                showpage:true,
                e401:false,
                e403:false,
                //-------Logos-----------------------------------------/
                
                //************************* */ 
                headers: [ 
                    { text: 'Agencia', value: 'nombreAgencia',  },     
                    { text: 'Atendido por', value: 'atendidopor'}, 
                    { text: 'Turno', value: 'noturno',  },
                    { text: 'Modulo', value: 'modulo'},
                    { text: 'Status', value: 'status',  },
                    { text: 'Reasignar', value: 'statusReAsignado',  }, 
                    { text: 'Fecha de inicio', value: 'fechaHoraInicio',   },  
                    { text: 'Opciones', value: 'opciones', sortable: false }, 
                                                 
                ],
               
                /****************************************************************************** */
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
              
                /**************** */
                
                rAtencionId:'',
                idAgencia:'',
                rHechoId:'',
                turnos:[],
                v_idturno:'',
                v_turno:'',
                v_mesa:'',
                v_reasignar:false,
                v_ampo:'',
               
                //*************** */
             dialog:false,
               
                
         
                
           
            }
        },
        
        watch: {
             
        },

        created () {
            let me=this;  
            me.idAgencia=this.$store.state.usuario.idagencia;
            me.listar(); 
        },
        methods:{
            listar(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                this.$cat.get('api/Turnoes/ListarTodos/' + me.idAgencia,configuracion).then(function(response){
                    me.turnos=response.data;
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
            formatearfecha: function(fecha){
                  return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
            reasignar(item){
                 let me=this; 
                 me.v_idturno = item.turnoId; 
                me.v_turno= item.serie + item.noturno;
                me.v_mesa= item.modulo;
                me.v_ampo = item.atendidopor;
                me.dialog=true;
                
            },
            close(){
                 let me=this;  
                me.v_reasignar=false;
                me.dialog=false;
                
            },
            guardar(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                this.$cat.put('api/Turnoes/ActualizarSRA',{
                                'idTurno': me.v_idturno,
                                'statusReAsignado': me.v_reasignar,  
                },configuracion).then(function(response){  
                        me.$notify('La información se guardo correctamente !!!','success')  
                        me.listar();    
                        me.dialog = false
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
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                 });
                        
            }
            
        }        
    }
</script>


 