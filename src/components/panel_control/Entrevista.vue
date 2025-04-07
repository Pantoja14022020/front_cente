<template> 
  <v-container fluid>
   
   
    <div class="row"> 
        <div class="col-12">
             <v-text-field v-model="turno" label="Turno:" ></v-text-field>
               <v-text-field v-model="mesa" label="Mesa:" ></v-text-field>
            <br/>
            <v-btn v-on:click="enviar"  >Enviar turno</v-btn>
          
        </div>
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
        turno: "",
        mesa: "",
        connection: "",
        turnos: []
         }
  },
  methods: {
      enviar: function() {
            if (this.turno && this.mesa) {
                this.connection.invoke('EnviarTurno', this.turno, this.mesa).catch(function (err) {
                    return console.error(err.toString());
                });

                this.turno = '';
                this.mesa = '';
            }
        }
    },
      created: function() {  
          this.connection = new HubConnectionBuilder()
              .withUrl('https://centro-atencion-temprana.serveo.net/turnoHub')
              .configureLogging(LogLevel.Information)
              .build();
          this.connection.start().catch(function (err) {
              return console.error(err.toString());
          });
      },
     
    
   
}
</script>


 


 