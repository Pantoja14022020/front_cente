<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap pa-5 >
      <v-flex xs12  >
               <v-card flat color="white" grid-list-md text-md-center fluid fill-height> 
                <v-layout row> 
                    <v-flex d-flex grow>
                        <v-card >
                            <v-card-title>
                                <h3>Solicitantes</h3>. 
                            </v-card-title>
                            <v-card-text>
        
                                <v-list three-line v-model="persona"   > 
                                   
                                    <v-list-tile v-for="(persona, i) in personas" :key="i">
                                    <v-list-tile-action  >
                                        <v-icon color="info">person</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content >
                                        <v-list-tile-title >Nombre Solicitatnte: {{ persona.nombreCompleto }}</v-list-tile-title>
                                        <v-list-tile-sub-title>CURP:{{ persona.curp }}</v-list-tile-sub-title>
                                         <v-list-tile-sub-title>Datos de contacto:</v-list-tile-sub-title>
                                           <v-divider inset></v-divider>
                                    </v-list-tile-content>  
                                    <v-list-tile-action  >
                                        <v-tooltip bottom   >
                                            <template v-slot:activator="{ on }">
                                                <v-icon 
                                                    class="mr-2" v-on="on" color="default" 
                                                    @click="informacion(persona)"
                                                    >
                                                  info
                                                </v-icon> 
                                            </template>
                                            <span>Detalles de expediente</span>
                                        </v-tooltip>    
                                    </v-list-tile-action>  
                                    </v-list-tile>

                                 
 

                                  

                                     
                         
                        
                                

                                </v-list>
                                
                            </v-card-text>
                        </v-card>
                    </v-flex>
                   
                </v-layout>
            </v-card> 
      </v-flex> 
    </v-layout>
  </v-container>
</template>
<script>
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
   
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
    import { error } from 'util';

  export default {
    data: () => ({
      envioId:'',
      persona:'',
      personas:[],
    }),
     created () { 
        let me = this  
         me.listar();
              
        // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
        axios.interceptors.request.use( (config)=> { 
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {  
          this.$store.commit('LOADER',false);
          return Promise.reject( error);
        }); 
          axios.interceptors.response.use((response)=>{ 
          this.$store.commit('LOADER',false); 
          return response;
        },  (error)=> {  
          this.$store.commit('LOADER',false); 
          return Promise.reject(error);
        });
      
     
    

    },
      methods:{ 
        listar(){
            let me=this; 
            me.envioId=4;
            axios.get('api/SolicitanteRequeridoes/Listar/'+ me.envioId).then(function(response){ 
                me.personas=response.data;
            }).catch(function(error){
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
                    me.$notify('Error al intentar listar los registros!!! ' + error.message,'error')   
                }      
            });
                      
        },
        informacion(item){
          alert(item.nombreCompleto);
        },
  
    
    }
    
  }
</script>