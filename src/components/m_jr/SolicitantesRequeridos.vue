<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap >
      <v-flex xs12  >
              
                <v-layout  row> 
                    <v-flex d-flex grow>
                        <v-card elevation="0"  >
                              <v-toolbar card dark color="white lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">person</v-icon>
                                </v-avatar> 
                                <v-toolbar-title class="subheading">{{sSolReq}}(s).</v-toolbar-title>
                                <v-spacer></v-spacer> 
                              </v-toolbar>
                            
                            <v-card-text>
        
                                <v-list three-line v-model="persona"> 
                                   
                                    <v-list-tile v-for="(persona, i) in personas" :key="i">
                                    <v-list-tile-action  >
                                        <v-icon :color="color">perm_identity</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content >
                                        <v-list-tile-title >Requerido: {{ persona.nombreCompleto }}</v-list-tile-title>
                                        <v-list-tile-sub-title>CURP:{{ persona.curp }}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>Tipo persona:{{ persona.tipoPersona}}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>Clasificación:{{ persona.clasificacion}}</v-list-tile-sub-title>
                                           <v-divider inset></v-divider>
                                    </v-list-tile-content>  
                                    <v-list-tile-action  >
                                        <v-tooltip bottom   >
                                            <template v-slot:activator="{ on }">
                                                 <v-btn icon v-if="(u_rol=='Administrador' ||  u_rol=='Director' || u_rol=='Coordinador'|| u_rol=='Facilitador') && persona.datosProtegidos==false" class="mr-2" v-on="on" color="default"  ripple  @click="actualizarRequerido(persona)"> 
                                                    <v-icon color="grey lighten-1">edit</v-icon>
                                                </v-btn>
                                                 
                                            </template>
                                            <span>Actualizar información</span>
                                        </v-tooltip> 
                                    </v-list-tile-action>   
                                    <v-list-tile-action  > 
                                        <v-tooltip bottom   >
                                            <template v-slot:activator="{ on }">
                                                 <v-btn icon  class="mr-2" v-on="on" color="default"  ripple  @click="informacion(persona)"> 
                                                    <v-icon color="grey lighten-1">info</v-icon>
                                                </v-btn>
                                                 
                                            </template>
                                            <span>Detalle del requerido</span>
                                        </v-tooltip>    
                                    </v-list-tile-action>
                                    <v-list-tile-action  v-show="persona.edad<18"> 
                                        <v-tooltip bottom   >
                                            <template v-slot:activator="{ on }">
                                                 <v-btn icon    class="mr-2" v-on="on" color="default"  ripple  @click="responsable(persona)"> 
                                                    <v-icon color="grey lighten-1">person</v-icon>
                                                </v-btn>
                                                 
                                            </template>
                                            <span>Responsable</span>
                                        </v-tooltip>    
                                    </v-list-tile-action>  
                                    </v-list-tile>

                                </v-list>
                                
                            </v-card-text>
                        </v-card>
                    </v-flex>
                   
                </v-layout>
          
      </v-flex> 
        <v-dialog v-model="modal_Persona" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    
                    <v-btn icon   @click="modal_Persona = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf2" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
        </v-dialog>
         <v-dialog v-model="modalresponsable" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Responsable del menor de edad.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    
                    <v-btn icon   @click="modalresponsable = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-lg>
                                        <v-layout wrap justify-space-between>
                                            <v-flex  xs12 md12 lg12> 
                                                 
                                            
                                                <v-text-field name="nombre" 
                                                                label="Nombre(s):" 
                                                                v-model="rnombre"    >
                                                    
                                                </v-text-field>
                                                 
                                                <v-text-field name="nacionalidad" 
                                                                label="Nacionalidad:" 
                                                                v-model="rnacionalidad"  >
                                
                                                </v-text-field>
                                                <v-text-field name="fecha de nacimiento" 
                                                                label="Fecha de nacimiento:" 
                                                                v-model="rfechanaciomiento"  >
                                
                                                </v-text-field>
                                                <v-text-field name="Edad" 
                                                                label="Edad:" 
                                                                v-model="redad" type="number"  >
                                
                                                </v-text-field>
                                                 <v-text-field 
                                                    name="curp" 
                                                    v-model="rcurp"    
                                                    label="CURP:"  >
                                                </v-text-field>
                                            </v-flex>
                                                     
                                               
                                            
                                                                    
                                        </v-layout>
                                        <v-spacer></v-spacer>
                                        <div class="text-xs-right">
                                            <v-btn color="primary"  @click.native="guardarResponsable()">Guardar</v-btn>
                                        </div>
                                    </v-container> 
                                        
                                </v-card>
                </v-card>
        </v-dialog>
        <v-dialog   v-model="modalAdd"  fullscreen hide-overlay transition="dialog-bottom-transition">  
            <v-card>
                <v-toolbar dark color="primary">
                   
                    <v-avatar  size="30">
                        <v-icon >edit</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">Actualizar informacion</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                         
                         <v-btn icon   @click="modalclose()">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
     
                <formPersona ref='formularioRequerido' @mostrarModalGeo="mostrarModalGeo($event)" @personaGuardada="personaGuardada($event)" />
            </v-card> 
        </v-dialog> 
                <modalGeolocalizacion ref="modalGeolocalizacion" @devolverGeoLocal="devolverGeoLocal($event)"/>
    </v-layout>

  </v-container>
</template>
<script>
import axios from 'axios'  
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import VeeValidate from 'vee-validate' 
import { WebCam } from "vue-web-cam";
import moment from 'moment'
import 'moment/locale/es';
import alertify from 'alertifyjs';
import { VueEditor } from "vue2-editor";
import { error } from 'util';
import formPersona from './libraries/formPersonas.vue'
import modalGeolocalizacion from './libraries/modalGeolocalizacion.vue'
import { DEFAULT_ENCODING } from 'crypto'
//** COMPONENTES */


 var assert, curp, persona,geolocalizacion;
  assert = require('assert');
  curp = require('curp.js');  
  export default {
    props: {
    sSolReq: String
    },
    components: {
      formPersona,modalGeolocalizacion
    },
    data: () => 
    ({
      envioId:'',
      persona:'',
      personaId:0,
      personas:[],
      color:'success',
      //********************** 
      curp:'',
      nombre:'',
      alias:'',
      tel:'',
      email:'',
      entidadFederativa:'',
      tipopersona:'',
      tvictima:'',
      medionotificacion:'',
      sexo:'',
      genero:'',
      fnacimiento:'',
      edad:'',
      datosprotegidos:'',
      estadocivil:'',
      nacionalidad:'',
      ocupacion:'',
      lengua:'',
      religion:'',
      nivelestudio:'',
      tipodiscapacidad:'', 

      lat:'',
      log:'',
      referencia:'',
      direccion:'',
      //************ */
 
      dialog: false, 
    
      modal_Persona:false,

        modalAdd:0,
        geoloc:0,
        //****************************** */
        camera: null,
        deviceId: null,
        devices: [],

        // DIRECCION PERSONAL
  
          //************************************** */
        message: 'no message',
        first_request: 'no request',
        second_request: 'no request', 
        rac:'',
        //-----CLAIM------------------------------------------
        u_iddistrito:'',
        u_distrito:'',
        u_dirSubPro:'',
        u_idagencia:'',
        u_agencia:'',
        u_idmoduloservicio:'',
        u_modulo:'',
        u_idusuario:'',
        u_nombre:'',
        u_clave:'',
        u_rol:'',
        u_puesto:'',
        u_email:'',
        //----------------------------------------------------
         GUID:'',
         statusActualizar:false,

        datosprotegidos:false,
        //******************************************************* */
        modalresponsable:0,
        rnombre:'',
        rnacionalidad:'',
        rcurp:'',
        redad:'',
        rfechanaciomiento:'',
        ridresponsable:'',
        //******************************************************* */



    }),
     created () 
     { 
        let me = this  
         me.listar();
         me.listarLogo();
        console.log(me.sSolReq);
        me.u_iddistrito=me.$store.state.usuario.iddistrito;
        me.u_distrito=me.$store.state.usuario.distrito;
        me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
        me.u_idagencia=me.$store.state.usuario.idagencia;
        me.u_agencia=me.$store.state.usuario.agencia;
        me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
        me.u_modulo=me.$store.state.usuario.modulo;
        me.u_idusuario=me.$store.state.usuario.idusuario;
        me.u_nombre=me.$store.state.usuario.usuario;
        me.u_clave=me.$store.state.usuario.clave;
        me.u_rol=me.$store.state.usuario.rol;
        me.u_puesto=me.$store.state.usuario.puesto;
        me.u_email=me.$store.state.usuario.email;
        if(this.sSolReq=='Requerido')
            me.color='success';
        else
            me.color='info';
        
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
      methods:
      { 
        mostrarModalGeo(direccion)
        {
            let me=this;
            console.log("tratando de mandar la información desde el padre como intermediario");
            console.log(direccion);
            me.$refs.modalGeolocalizacion.mostrarModalGeolocalizacion(direccion);
        },
        devolverGeoLocal(localizacion)
        {
            let me=this;
            console.log("tratando de mandar la información desde el padre como intermediario");
            console.log(localizacion);
            me.$refs.formularioRequerido.setGeoLocal(localizacion);
        },
        //QUE HACER CUANDO SE HA GUARDADO LA INFORMACIÓN DEL FOIRMULARIO DE MANERA CORRECTA
        personaGuardada(resultado)
        {   
             let me=this;
            console.log("cerrando desde componente padre")
            me.$notify('La información se guardo correctamente !!!','success'); 
            me.listar();
            me.modalclose();
            me.$router.push({ name: 'informacionexpediente' })
        },    
        listarLogo(){
        
                let me=this; 
                
                this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                    me.logo1= response.data.logo1;
                    me.logo2= response.data.logo2;
                    me.logo3 = response.data.logo3;
                    me.logo4 = response.data.logo4;
                    
                }).catch(function(error){
                    me.$notify('Error al leer la configuracion global !!!','error')    
                });
            }, 
        listar(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.envioId=me.$store.state.idEnvio;
            //console.log("desde Requeridos");
            axios.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridos/'+ me.envioId+'/'+me.sSolReq, configuracion).then(function(response){ 
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
            //debugger
            let me= this;
            me.personaId = item.personaId;
            me.curp = item.curp;
            me.rfc=item.rfc;
            me.razonsolcial=item.razonSocial;
            me.nombre = item.nombreCompleto;
            me.entidadFederativa= item.entidadFederativa;
            me.alias=item.alias;
            me.tel = item.telefono1 + " , " + item.telefono2;
            me.email = item.correo;   
            me.tvictima = item.clasificacion;
            me.tipopersona= item.tipoPersona;
            me.sexo= item.sexo;
            me.genero=  item.genero;
            me.fnacimiento= item.fechaNacimiento; 
            me.estadocivil = item.estadoCivil; 
            me.medionotificacion= item.medionotificacion;
            me.nacionalidad= item.nacionalidad;
            me.ocupacion= item.ocupacion;
            me.lengua=item.lengua;
            me.religion= item.religion;
            me.tipodiscapacidad= item.tipoDiscapacidad; 
            me.nivelestudio= item.nivelEstudio; 
            me.edad = item.edad;
            me.$cat.get('api/RAPs/ListarDP/'+ me.personaId).then(function(response){
                
                me.direccion = response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp
                me.lat=response.data.lat;
                me.log= response.data.log; 
                me.referencia=response.data.referencia;
                me.mostrarpdf_Persona();

                
              
            }).catch(function(error){
                me.$notify('Error al intentar leer los datos de la persona seleccionada !!!','error')    
            });

            
        },
        responsable(item){
        
            let me= this;
            me.personaId = item.personaId;
            
           
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            
            axios.get('api/Responsablejrs/SelectIdPersona/'+ me.personaId, configuracion).then(function(response){ 
       
                me.rnombre= response.data.nombreCompleto;
                me.rnacionalidad= response.data.nacionalidad;
                me.rcurp= response.data.curp;
                me.redad= response.data.edad;
                me.rfechanaciomiento= response.data.fechaNacimiento;
                me.ridresponsable= response.data.idResponsable;
                if (me.ridresponsable!== undefined)
                {
                        me.editedIndex = 1;
                }
                me.modalresponsable= true;     
            }, configuracion).catch(function(error){
                if (error.response.status==401){ 
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){  
                    me.e403= true
                    me.showpage= false 
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')     
                } 
            }); 

        },
        guardarResponsable(){
        debugger
                    if (this.editedIndex > -1) {
                            //Código para editar 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            axios.put('api/Responsablejrs/Actualizar',{
                                'idResponsable':me.ridresponsable, 
                                'personaId':me.personaId, 
                                'nombreCompleto': me.rnombre,
                                'edad': me.redad,
                                'fechaNacimiento': me.rfechanaciomiento,
                                'nacionalidad': me.rnacionalidad,
                                'curp': me.rcurp,
                            },configuracion).then(function(response){
                                me.close();
                                me.$notify('La información se actualizo correctamente !!!','success')  
                                me.listar();
                                me.rnombre="";
                                me.rnacionalidad="";
                                me.rcurp="";
                                me.redad="";
                                me.rfechanaciomiento="";
                                me.ridresponsable="";
                                                
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
                    } else {
                            //Código para guardar
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            axios.post('api/Responsablejrs/Crear',{
                                'personaId':me.personaId, 
                                'nombreCompleto': me.rnombre,
                                'edad': me.redad,
                                'fechaNacimiento': me.rfechanaciomiento,
                                'nacionalidad': me.rnacionalidad,
                                'curp': me.rcurp,
                            },configuracion).then(function(response){
                                me.close();
                                me.$notify('La información se guardo correctamente !!!','success')  
                                me.listar();
                                me.rnombre="";
                                me.rnacionalidad="";
                                me.rcurp="";
                                me.redad="";
                                me.rfechanaciomiento="";
                                me.ridresponsable="";                        
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
                                    me.$notify('Error al intentar crear el  registro!!!','error')  
                                } 
                          });
                        }
                    
            },
        crearPdf_Persona() { 
                var pdfMake = require('pdfmake/build/pdfmake.js') 
           
                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
               
                //***************************************************************************** */ 
      
       
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var hr= moment().format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año + ", " + hr 
                //***************************************************************************** */
            
                var dd = {
                    pageSize: 'LEGAL',
                    pageOrientation: 'portrait',
                    pageMargins: [ 85, 130, 72, 60 ], 
                    footer: function (currentPage, pageCount) {
                        return {
                            columns: [
                                 { 
                                    image: logo4,
                                    width: 612, 
                                    absolutePosition: {x: 0, y: 0},
                                
                                },
                                {
                                    text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'footertext',  margin: [0, 20, 30, 0] 
                                }
                            ] 
                        };
                    },
                    header: function(currentPage, pageCount, pageSize) {
                            
                            return [
                                
                                { 
                                    image: logo3,
                                    width: 612,  
                                    absolutePosition: {x: 0, y: 0},
                                }, 

                               
                                
                            ]
                    
                    },
                
                    content: [
                         
                       
                         
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*', 'auto', 'auto'], 
                                body: [
                                    [{colSpan: 3,  text:'Información del requerido', fillColor: '#eeeeee', fontSize: 14, bold: true, alignment: 'center'},'', '', ],
                                    ['Nombre' + '\n' + this.nombre, 'Alias:' + '\n' + this.alias , 'Clasificación de persona:'+ '\n' + this.tvictima]  ,
                                    ['Tipo persona:' + '\n' + this.tipopersona, 'CURP:'+ '\n' + this.curp, 'Documento de identificación:'+ '\n' + this.docIdentificacion],
                                    ['Nacionalidad:'+ '\n' + this.nacionalidad, 'Teléfono(s):'+ '\n' + this.tel, 'Correo electrónico:'+ '\n' + this.email], 
                                    ['Genero:' + '\n' + this.genero, 'Sexo' + '\n' + this.sexo , 'Edad:' + '\n' + this.edad, ]  ,
                                    ['Autoriza medio de notificación:'+ '\n' + this.medionotificacion, 'Ocupacion:'+ '\n' + this.ocupacion, 'Nivel estudios:'+ '\n' + this.nivelestudio],
                                    ['Religion:'+ '\n' + this.religion, 'Idioma  o lengua que habla:'+ '\n' + this.lengua, 'Estado civil:'+ '\n' + this.estadocivil],  
                                    [{colSpan: 3,  text:'Tiene alguna deicapaciadad:'+ '\n' + this.tipodiscapacidad} , ''], 
                                    [{colSpan: 3,  text:'Dirección:'+ '\n' + this.direccion} , ''],
                                    [{colSpan: 3,  text:'Referencia:'+ '\n' + this.referencia} , ''],
                                ]
                            },
                            layout: {
                                    hLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                    },
                                    vLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                    },
                                    hLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                    },
                                    vLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                    }, 
                                }
                        },
                    ],
                
                    
                    styles: { 
                        fecha:{
                        fontSize: 9, 
                        regular:true,
                        alignment: 'right',
                    },
                    nuc:{
                        fontSize: 12, 
                        alignment: 'right',
                        bold: true,
                    },
                    titulo: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                    
                    },
                    subtitulo:{
                        fontSize: 11,
                        bold: true, 
                    },
                    headertext :{
                        fontSize: 10,
                        bold:true,
                        alignment:'left',
                    },
                    footertext :{
                        fontSize: 7,
                        color: 'white'
                    },
                    texto:{
                        fontSize: 10,  
                        regular:true,
                        alignment: 'justify',
                    },
                    textobold:{
                        fontSize: 10,  
                        bold: true,
                        alignment: 'justify',
                    },
                    compareciente:{
                        fontSize: 12, 
                        bold: true,
                        alignment: 'right',
                    },
                    ampo:{
                        fontSize: 10, 
                        bold: true,
                        alignment: 'left',
                    }, 
		            table: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'left',
                    },
                    cargo:{
                        fontSize: 9, 
                        regular: true,
                        alignment: 'left',
                    },
                    }
        
                }
                    
                    return dd;

                    
                    
            },
        mostrarpdf_Persona(){
        
          
                var dd = this.crearPdf_Persona();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;

                    
                }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdf2'); 
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    this.modal_Persona=true; 
        },
        
        close () {
            
            this.modalAdd = 0;
            this.modalresponsable=false;
            this.editedIndex = -1;
            this.limpiar();
        },
        actualizarRequerido(item) {  
           //debugger
           let me=this;
           //console.log("objeto obtenido");
           //console.log(me.$refs.formularioRequerido);
           me.$refs.formularioRequerido.presentarEdicion(item);

           this.modalAdd =1;
        },
        
        infoItem (item) {   
            this.editedIndex=1; 
        },
        limpiar(){     
            this.statusActualizar=false;
            //************************************************************* */
            //step no 1
            this.switch2= false;//-----------------------------------------------------BORRAR
            this.radios= 'Fisica';//-----------------------------------------------------BORRAR
            this.verTP=0;//-----------------------------------------------------BORRAR
            this.rfc="";//-----------------------------------------------------BORRAR
            this.razonsocial="";//-----------------------------------------------------BORRAR
            this.clasificacionpersona="";//-----------------------------------------------------BORRAR
            this.nombres="";//-----------------------------------------------------BORRAR
            this.apaterno="";//-----------------------------------------------------BORRAR
            this.amaterno="";//-----------------------------------------------------BORRAR
            this.fnacimiento="";//-----------------------------------------------------BORRAR
            this.sexo="";//-----------------------------------------------------BORRAR
            this.abreviacion="";//-----------------------------------------------------BORRAR
            this.docidentificacion="";//-----------------------------------------------------BORRAR
            this.curp="";//-----------------------------------------------------BORRAR
            this.imageName="";//-----------------------------------------------------BORRAR
            this.imageFile ="";//-----------------------------------------------------BORRAR
            this.imageUrl ="";//-----------------------------------------------------BORRAR
            //************************************************************* */
            //step no2
            this.medionotificacion="";
            this.telefono1="";
            this.telefono2="";
            this.correo="";
            this.nacionalidad="Mexicana";
            this.estadocivil="";
            this.genero="";
            this.nivelestudio="";
            this.ocupacion="";
            this.lengua="";
            this.religion="";
            this.switch1= false,
            this.tipoDiscapacidad="";
            //************************************************************* */
            //step no3
            this.calle="";
            this.noInt="";
            this.noExt="";
            this.entreCalle1="";
            this.entreCalle2="";
            this.referencia="";
            this.pais="Mexico";
            this.estadoid=0;
            this.estado="";
            this.municipioid=0;
            this.municipio="";
            this.localidadid=0; 
            this.localidad="";
            this.cp=""; 
            this.lat="";
            this.lng="";
                //step no4
          
            this.$validator.reset();
            this.step=1;
            this.editedIndex=-1;
        },
    
        
        // STEP 3 DIRECCION PERSONAL
      
        
        buscarPorCP(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
                  //console.log(response)
                  me.estadoid=response.data.idEstado;    
                  me.listarPorEstado();
                  me.municipioid=response.data.idMunicipio;   
                  me.buscarPorCpMpo() 
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
        buscarPorCpMpo(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var localidadArray=[];
            me.localidades.length = 0;
             this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.municipioid +',' + this.cp,configuracion).then(function(response){ 
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.localidades.push({text: x.nombre,value: x.idLocalidad}); 
                });
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
        selectEstado: function(val) {  
             
            let me=this;    
            for (var i = 0; i < me.ciudades.length; i++) {
                if (me.ciudades[i].text === val)
                {
                    me.estadoid=  me.ciudades[i].value; 
                }
            }
            me.listarPorEstado();
        },
        selectMunicipio: function(val) { 
            let me=this; 
           
            for (var i = 0; i < me.municipios.length; i++) {
                if (me.municipios[i].text === val){
                   
                     me.municipioid=  me.municipios[i].value; 
                }   
            } 
          me.listarPorMunicipio();
        },
        selectLocalidad: function(val) { 
           let me=this; 
            for (var i = 0; i < me.localidades.length; i++) {
                if (me.localidades[i].text === val)
                {
                    me.localidadid=  me.localidades[i].value; 
                }
                
            } 
          
        },

        modalclose(){
            this.modalAdd=false;
            this.limpiar();
        },
        
      
       generateUUID: function() { // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            
            return newGuid;
        },
        pickFile () {
            this.$refs.image.click ()
        }, 
		onFilePicked (e) {
			const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
		    } 
        },
  }
</script>
    
    }
    
  }
</script>