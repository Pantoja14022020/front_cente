<template>
  <v-layout> 
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
        <br>
        </table>
        </v-flex> 
    </v-layout> 
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
      moduloSerivioId:'',
      nombre:'',
      puesto:'',
      telefono:'',
      email:'',
      direccion:'',
      condicion:'',
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
          listar () {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers : header };
            me.moduloSerivioId = this.$store.state.select_moduloServicioId;
            me.$controlacceso.get('api/Usuarios/ListarModulo/' + me.moduloSerivioId , configuracion).then(function(response) {  
               me.nombre = response.data.nombre;
               me.puesto = response.data.puesto;
               me.telefono = response.data.telefono;
               me.email = response.data.email;
               me.direccion = response.data.direccion;
               me.condicion = response.data.condicion;
            }).catch(function(error) {
                if (err.response.status == 400) {
                  me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status == 401) {
                  me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                  me.e401 = true,
                  me.showpage = false
                } else if (err.response.status == 403) { 
                  me.$notify("No esta autorizado para ver esta página", 'error')
                  me.e403 = true
                  me.showpage = false 
                } else if (err.response.status == 404) {
                  me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                  me.$notify('Error al intentar listar los registros ' + error.message,'error')   
                }  
            }); 
        },
      }
  }
</script>