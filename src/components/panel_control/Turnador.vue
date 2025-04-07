<template> 
  <v-container fluid>
        <v-layout row> 
        <v-flex xs12 order-md1 order-xs3>
          <v-card dark tile flat color="primary">
            <div  class="text-xl-center text-md-center text-xs-center my-1">
                <img src="@/assets/LogoHGO.png"  height="185px"  alt="">  
            </div> 
          </v-card>
        </v-flex>
      </v-layout> 
      <v-layout row my-5>
      
        <v-flex xs6   >


          <v-card  tile flat>
                  
  
     
         
       
          <v-data-table  
            :items="turnos"
            :headers="headers" 
            class="elevation-1" 
            hide-actions >
            
            <template slot="items"  return-object  slot-scope="props">
     
             
              <td class="primary display-1 font-weight-light">{{ props.item.mesa }}</td> 
               <td class="primary display-1 font-weight-light">{{ props.item.turno }}</td>
            </template>
            <template color="success"  class="success" slot="no-data">
               <h3  >No hay turnos disponibles</h3>
           </template>
            
          </v-data-table>

          

 
  
          

 




          </v-card>
        </v-flex>
         <v-divider class="mx-2" inset vertical></v-divider>
        
        <v-flex xs6>
            <v-layout row    >
                <v-flex xs6 my-5>
                    <v-card dark tile flat color="primary" class="text-xs-center">
                        <v-card-title class="display-1 font-weight-thin justify-center">MESA</v-card-title>
                        <v-card-text       class="display-4  font-weight-medium my-5 info--text"><p> {{  mesa }} </p></v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs6 my-5>
                      <v-card dark tile flat color="primary" class="text-xs-center">
                        <v-card-title class="display-1 font-weight-thin justify-center">TURNO</v-card-title>
                        <v-card-text     class="display-4  font-weight-medium my-5"><p> {{  turno }} </p></v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex> 
      
      </v-layout>
     <div>
     
   
  </div>
     
     
    </v-container>
   
</template>

<script>
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import axios from 'axios'
export default {
  components: {
 
  },
  data () {
    return {
        mesa:'',
        turno:'',
        connection: "",
        turnos: [],
        headers: [ 
                  { text: 'Mesa', value: 'turno', sortable: false },
                  { text: 'Turno', value: 'mesa', sortable: false }                                  
              ],
        currentTurno: 0,
        currentMesa: 0
    }
  },
 
      created: function() {  
          this.connection = new HubConnectionBuilder()
              .withUrl('https://centro-atencion-temprana.serveo.net/turnoHub')
              .configureLogging(LogLevel.Information)
              .build();
          this.connection.start().catch(function (err) {
              return console.error(err.toSting());
          });
          
      },
      mounted: function() {  
              var me = this; 
              me.connection.start();
              me.connection.on('RecibirTurno', function(turno, mesa) {
                  me.turnos.push({turno, mesa});  
                  me.mesa = me.turnos[me.currentTurno++].mesa;
                  me.turno=  me.turnos[me.currentMesa++].turno;
              });
               
          },
          methods:{
            limpiar() {
              this.turno = "";
              this.mesa="";
            }
          }
           
   
    
   
}
</script>
<style >
  .theme--dark.v-table {
  background-color: #07131F;
  color: #fff;
}
</style>


 