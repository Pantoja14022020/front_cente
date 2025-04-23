<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Estadísticas por mes</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>

                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="fechaInicio"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    name ="desde"
                                    :value="fechai"
                                    label="*Desde:"
                                    prepend-icon="event"
                                    clearable 
                                    readonly
                                    v-on="on"
                                    v-validate="'required'"                                            
                                    :error-messages="errors.collect('desde')">
                                ></v-text-field>
                            </template>
                        <v-date-picker locale="es" v-model="fechaInicio" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="fechaFin"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                name ="hasta"
                                    :value="fechaf"
                                    label="*Hasta:"
                                    prepend-icon="event"
                                    clearable 
                                    readonly
                                    v-on="on"
                                    v-validate="'required'"                                            
                                    :error-messages="errors.collect('desde')">
                                ></v-text-field>
                            </template>
                        <v-date-picker locale="es"   v-model="fechaFin" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-btn @click="listarporfecha()"  color="primary" dark class="mb-2">Buscar</v-btn>
                    
                      
        </v-toolbar>
        

        <v-data-table
                :headers="headers"
                :items="carpetas"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.uqe_Modulo}}</td>   
                    <td>{{ props.item.uqe_Nombre}}</td> 
                    <td>{{ props.item.fechaRegistro.substring(8,10) +" de "+ obtenermes(props.item.fechaRegistro.substring(5,7)-1)+" del "+props.item.fechaRegistro.substring(0,4)+", "+props.item.fechaRegistro.substring(11,19) }}</td> 

                </template>
                <template slot="no-data">
                <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table>
        
        
        <v-layout wrap justify-space-between>
            <v-flex xs12 sm12 md12  >

                    <v-toolbar dense  color="success " >
                        <v-toolbar-title   > <h5>{{textotitulo1}}</h5></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="barra1=true"    right  fab color="primary">
                                            <v-icon dark>assessment</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Gráfica de barras</span>
                        </v-tooltip> 

                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="linea1=true"  right  fab  color="primary">
                                            <v-icon dark>timeline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Gráfica de línea</span>
                        </v-tooltip>      

                    </v-toolbar>  

                    <v-data-table
                            :headers="headersr"
                            :items="carpetasmodulos"      
                            hide-actions        
                            :rows-per-page-items="rowsPerPageItemsr"
                            :pagination.sync="paginationr"
                            >
                            
                            <template  slot="items" class="white" slot-scope="props"  >
                                
                                <td class="caption1">{{ props.item.modulo}}</td>   
                                <td class="caption1">{{ props.item.envios}}</td> 
                                
                            </template>
                            <template slot="no-data">
                         
                            </template>
                            
                    </v-data-table> 
                    <div >
                        <v-layout id =grafficas wrap justify-space-between>
                                                    
                        </v-layout> 
                    </div>
                                
            </v-flex>

       
        </v-layout>

    
        <v-layout wrap justify-space-between>
            <v-flex xs12 sm12 md12  >

                    <v-toolbar class="mx-0" dense  color="white " > 
                    </v-toolbar>

                    <v-toolbar dense  color="success " v-if="true" >
                        <v-toolbar-title   > <h5>{{textotitulo2}}</h5></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="barra2=true"    right  fab color="primary">
                                            <v-icon dark>assessment</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Grafica de barras</span>
                        </v-tooltip> 

                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="linea2=true"  right  fab  color="primary">
                                            <v-icon dark>timeline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Grafica de línea</span>
                        </v-tooltip>      

                    </v-toolbar>
    
                <v-data-table
                        :headers="headersrp"
                        :items="carpetasfecha"  
                        hide-actions                 
                        :rows-per-page-items="rowsPerPageItemsr"
                        :pagination.sync="paginationr"
                        >
                        
                        <template slot="items" class="white" slot-scope="props">
                            
                            <td class="caption1">{{ props.item.fecha}}</td>   
                            <td class="caption1">{{ props.item.envios}}</td> 
                        </template>
                        <template slot="no-data">
                        </template>
                        
                </v-data-table> 
                <div >
                    <v-layout id =grafficas2 wrap justify-space-between>
                                                
                    </v-layout> 
                </div> 
            </v-flex>
        </v-layout>   

            

            <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                        <v-toolbar-title>Documento.</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>          
                            <v-btn icon   @click="modaldocumento = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog  v-model="barra1"  max-width="1000px" >                  
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChart" >
                                                    </canvas>
                                                </div>                                                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="barra1=false" >Cerrar</v-btn>
                                        <v-btn  @click="downloadPdf('myChart',textotitulo1)" class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
            <v-dialog  v-model="linea1"  max-width="1000px" >                  
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChartlinea" >
                                                    </canvas>
                                                </div>                                                                               
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="linea1=false" >Cerrar</v-btn>
                                        <v-btn  @click="downloadPdf('myChartlinea',textotitulo1)"  class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
            <v-dialog  v-model="barra2"  max-width="1000px" >                  
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChart2" >
                                                    </canvas>
                                                </div>                                                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="barra2=false" >Cerrar</v-btn>
                                        <v-btn  @click.native="downloadPdf('myChart2',textotitulo2)" class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
            <v-dialog  v-model="linea2"  max-width="1000px" >                  
                        <v-card>
                            
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChartlinea2" >
                                                    </canvas>
                                                </div>                                                                               
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="linea2=false" >Cerrar</v-btn>
                                        <v-btn  @click.native="downloadPdf('myChartlinea2',textotitulo2)" class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
  
    </v-flex>
</v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
  import * as d3 from 'd3';
  import Chart from 'chart.js'

  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  import { error } from 'util';
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { all } from 'q'

  export default {
    components: {      
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //*************** */
        carpetas:[],
        carpetasmodulos:[],
        carpetasfecha:[],


        fechaInicio:'',
        fechaFin:'',
        menu1:'',
        menu2:'',
        fechai:'',
        fechaf:'',
        step:-1,
        step2:-1,
        conteograficas:0,
        conteocoloresindiviadules:0,
        modaldocumento:false,
        agenciainfo:'',
        textotitulo1:'',
        textotitulo2:'',
        barra1:false,
        barra2:false,
        linea1:false,
        linea2:false,
        //*************** */
        customToolbar: [ 
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }  ], 
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }  ],  
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }], 
            [{ 'color': [] }, { 'background': [] }], 
        ],
        headers: [
            { text: 'Emitida por', value: 'modulo', sortable: true }, 
            { text: 'Usuario', value: 'nuc', sortable: true  }, 
            { text: 'Fecha de envío', value: 'FechaElevaNuc' },                 
        ],
        headersr: [

            { text: 'Modulo', value: 'mesno', sortable: false, class:'mytable' }, 
            { text: 'Carpetas iniciadas',sortable: false, class:'mytable'},                          
        ],
        headersrp: [
            { text: 'Dia', value: 'nombre', sortable: false, class:'mytable'}, 
            { text: 'Carpetas iniciadas',sortable: false, class:'mytable'}, 
        ],
        meses: [
            { mes: 'Enero', value: 1 }, 
            { mes: 'Febrero', value: 2 }, 
            { mes: 'Marzo', value: 3 }, 
            { mes: 'Abril', value: 4 }, 
            { mes: 'Mayo', value: 5 }, 
            { mes: 'Junio', value: 6 }, 
            { mes: 'Julio', value: 7 },  
            { mes: 'Agosto', value: 8 },
            { mes: 'Septiembre', value: 9 },
            { mes: 'Octubre', value: 10 },
            { mes: 'Noviembre', value: 11 },
            { mes: 'Diciembre', value: 12 },
                             
        ],
        registros:[    
        ],
        registrosperitos:[

        ],
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 10
        },
        paginationr: {
            rowsPerPage: 12
        },
        rowsPerPageItemsr: [12],
        editedIndex: 0, 
        modalAdd:false,
        dialogo:false,
        dialog:false,
        mesmostrar:'',
        //********************************/
        

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
        u_subproc:'',
        u_iddsp:'',
        //----------------------------------------------------
    }),
       
    created () {
        
        let me = this 
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
                me.u_subproc=me.$store.state.usuario.subProc;
                me.u_iddsp = me.$store.state.usuario.iddsp;


      //me.listar();
      me.listarLogo();
      me.informacionagencia();
      


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
    computed: {
      formTitle () {
                return this.editedIndex === -1 ? 'Subir archivo' : 'Cambiar status'
            },
              formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            }
    },
    watch: {
        
    },
    methods:{ 
        listarLogo(){
        
            let me=this; 
            this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                me.logo3= response.data.logo3;
                me.logo4= response.data.logo4;
                
            }).catch(function(error){
                me.$notify('Error al leer la configuracion global !!!','error')    
            });
        }, 
        close () {
                
        },
        limpiar(){    
            let me = this;

        },
        fechainif(){
            if(this.menu1){            
            this.$refs.menu1.save(this.fechaInicio);
            this.generarfecha2();
            }
            if(this.menu2){
            
            this.$refs.menu2.save(this.fechaFin);
            this.generarfecha2();
            }        
        },
        generarfecha2(){ 
            if(this.menu1) 
            this.fechai =this.fechaInicio.substring(8,10) +" de "+ this.obtenermes(this.fechaInicio.substring(5,7)-1)+
            " del "+ this.fechaInicio.substring(0,4); 
            if(this.menu2)
            this.fechaf =this.fechaFin.substring(8,10) +" de "+ this.obtenermes(this.fechaFin.substring(5,7)-1)+
            " del "+ this.fechaFin.substring(0,4); 
        },
        obtenermes: function(mes){
            if(mes==0) return "Enero"
            if(mes==1) return "Febrero"
            if(mes==2) return "Marzo"
            if(mes==3) return "Abril"
            if(mes==4) return "Mayo"
            if(mes==5) return "Junio"
            if(mes==6) return "Julio"
            if(mes==7) return "Agosto"
            if(mes==8) return "Septiembre"
            if(mes==9) return "Octubre"
            if(mes==10) return "Noviembre"
            if(mes==11) return "Diciembre"
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        },
        crear(){
           let me = this;

            d3.select('#grafficas') //Selecciona la <div> con el id grafficas
                .append('div')      // Le agrega a la div previamente seleccionada una nueva <div>
                .attr('class','flex xs3 sm3 md3 lg3')   //A la nueva div creada le agrega el attributo de v-flex
                .attr('id','Graficasg') // e igual le agrega su id con el nombre de Graficasg 
                .append('div')  //Agrega una nueva division dentro de graficasg
                .attr('id','z'+this.conteograficas)  //le asigna un id llamado z y un numero en base al contador             
                .append('canvas')   //le agrega a la division previa un tag canvas
                .attr('id','grafica'+this.conteograficas)  // y se le asigna un id a ese canvas                 
                       
           
                d3.select('#z'+this.conteograficas)     //se selecciona el canvas previamente creado             
                .append('button')   //le agrega un botton, el de imprimir
                .on('click',function () {   //le agrega una funcion a ese boton para que a la hora de clickearlo se mande a llamar la funcion de generar el pdf
                    var padre =  d3.select(this.parentElement).attr('id');   //codigo para obtener el id de la division padre (es decir z)           
                    var regex = /(\d+)/g;  //variable necesaria para usar en la funcion que obtiene solo los numeros
                    var cortar=padre.match(regex); //codigo para obtener solo los numeros del id obtenido previamente
                    me.downloadPdf('grafica'+cortar[0],"Estadísticas de "+me.fechai+ " a "+me.fechaf ) 
                })
                .attr('type','button')   //agrega  un atributo al boton para su correcto funcionamiento      
                .attr('class','mx-2 v-btn v-btn--floating v-btn--right v-btn--small theme--light primary') //agrega  un atributo al boton para su correcto funcionamiento    
                .attr('slot','activator') //agrega  un atributo al boton para su correcto funcionamiento    
                .append('div')  //agrega una divsion al boton
                .attr('class','v-btn__content')  //agrega propiedades del icon
                .append('i')  //agrega propiedades del icon             
                .attr('aria-hidden','true')  //agrega propiedades del icon
                .attr('class','v-icon material-icons theme--dark')  //agrega propiedades del icon
                .text('print') //imagen del icono
                
                //Cada grafica que se genera esta dentro de un div con el id Graficasg
                

        },
        crear2(){
           let me = this;

            d3.select('#grafficas2') //Selecciona la <div> con el id grafficas
                .append('div')      // Le agrega a la div previamente seleccionada una nueva <div>
                .attr('class','flex xs3 sm3 md3 lg3')   //A la nueva div creada le agrega el attributo de v-flex
                .attr('id','Graficasg') // e igual le agrega su id con el nombre de Graficasg 
                .append('div')  //Agrega una nueva division dentro de graficasg
                .attr('id','z'+this.conteograficas)  //le asigna un id llamado z y un numero en base al contador             
                .append('canvas')   //le agrega a la division previa un tag canvas
                .attr('id','grafica'+this.conteograficas)  // y se le asigna un id a ese canvas                 
                       
           
                d3.select('#z'+this.conteograficas)     //se selecciona el canvas previamente creado             
                .append('button')   //le agrega un botton, el de imprimir
                .on('click',function () {   //le agrega una funcion a ese boton para que a la hora de clickearlo se mande a llamar la funcion de generar el pdf
                    var padre =  d3.select(this.parentElement).attr('id');   //codigo para obtener el id de la division padre (es decir z)           
                    var regex = /(\d+)/g;  //variable necesaria para usar en la funcion que obtiene solo los numeros
                    var cortar=padre.match(regex); //codigo para obtener solo los numeros del id obtenido previamente
                    me.downloadPdf('grafica'+cortar[0],"Estadísticas de "+me.fechai+ " a "+me.fechaf ) 
                })
                .attr('type','button')   //agrega  un atributo al boton para su correcto funcionamiento      
                .attr('class','mx-2 v-btn v-btn--floating v-btn--right v-btn--small theme--light primary') //agrega  un atributo al boton para su correcto funcionamiento    
                .attr('slot','activator') //agrega  un atributo al boton para su correcto funcionamiento    
                .append('div')  //agrega una divsion al boton
                .attr('class','v-btn__content')  //agrega propiedades del icon
                .append('i')  //agrega propiedades del icon             
                .attr('aria-hidden','true')  //agrega propiedades del icon
                .attr('class','v-icon material-icons theme--dark')  //agrega propiedades del icon
                .text('print') //imagen del icono
                
                //Cada grafica que se genera esta dentro de un div con el id Graficasg
                

        },        
        eliminar(){
            d3.selectAll('#Graficasg') 
            .remove() //elemina todos los div del html que tengan el id Graficasg
        },             
        informacionagencia(){
                 let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
                    me.agenciainfo=response.data;
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
        extraer(dato){
            var aux
            for(var i=0;i<dato.length;i++)
                aux.push(dato[i].mes)
            return aux
        },
        graficarindividual(campo,numero){
            
            let me = this;
            var coloresrelleno = [                        
                'rgba(255, 159, 64, .5)',   
                'rgba(153, 102, 255, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(255, 206, 86, .5)',
                'rgba(75, 192, 192, .5)',
                'rgba(54, 162, 235, .5)', 
                'rgb(204, 200, 200, .5)',
                'rgb(204, 0, 153, .5)',
                'rgb(0, 102, 204, .5)',
                'rgb(0, 255, 153, .5)',
                'rgb(102, 102, 255, .5)',
                'rgb(255, 0, 102, .5)',
                'rgb(255, 153, 0, .5)',
                'rgb(51, 102, 255, .5)',
                'rgb(153, 204, 0, .5)',
                'rgb(51, 51, 204, .5)',
                'rgb(0, 204, 153, .5)',
                'rgb(255, 0, 0, .5)',
                'rgb(0, 153, 153, .5)',
                'rgb(153, 204, 0, .5)',
                'rgb(153, 204, 255, .5)',
                'rgb(0, 204, 153, .5)',
                'rgb(0, 0, 255, .5)',
                'rgb(0, 204, 0, .5)' ,     
                'rgb(255, 102, 255, .5)',
                'rgb(0, 153, 204, .5)',
                'rgb(153, 255, 153, .5)',
                'rgb(153, 153, 255, .5)',
                'rgb(153, 153, 255, .5)',
                'rgb(51, 153, 255, .5)',
                'rgb(255, 51, 0, .5)'              
            ]
            var coloresborde = [                        
                'rgba(255, 159, 64, 1)',   
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)', 
                'rgb(204, 200, 200, 1)',
                'rgb(204, 0, 153, 1)',
                'rgb(0, 102, 204, 1)',
                'rgb(0, 255, 153, 1)',
                'rgb(102, 102, 255, 1)',
                'rgb(255, 0, 102, 1)',
                'rgb(255, 153, 0, 1)',
                'rgb(51, 102, 255, 1)',
                'rgb(153, 204, 0, 1)',
                'rgb(51, 51, 204, 1)',
                'rgb(0, 204, 153, 1)',
                'rgb(255, 0, 0, 1)',
                'rgb(0, 153, 153, 1)',
                'rgb(153, 204, 0, 1)',
                'rgb(153, 204, 255, 1)',
                'rgb(0, 204, 153, 1)',
                'rgb(0, 0, 255, 1)',
                'rgb(0, 204, 0, 1)' ,     
                'rgb(255, 102, 255, 1)',
                'rgb(0, 153, 204, 1)',
                'rgb(153, 255, 153, 1)',
                'rgb(153, 153, 255, 1)',
                'rgb(153, 153, 255, 1)',
                'rgb(51, 153, 255, 1)',
                'rgb(255, 51, 0, 1)'              
            ]
            var ctx = document.getElementById('grafica'+me.conteograficas);
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    
                    labels: [campo],
                    datasets: [{
                        barPercentage: 0.3,
                        label: campo,
                        data: [numero],                       
                        backgroundColor: [
                           coloresrelleno[me.conteocoloresindiviadules]
                        ],
                        borderColor: [                          
                           coloresborde[me.conteocoloresindiviadules]                        
                        ],
                        borderWidth: 1
                    },
                    
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: false,
                        position: 'right',
                        labels: {
                            fontSyle: 'bold',
                            fontSize: 12,
                            boxWidth:10
                        }
                        
                    },
                    
                    scales: {
                        yAxes: [{                           
                            ticks: {
                                beginAtZero:true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                                
                            }
                        }]
                    }
                }
            });
            me.conteocoloresindiviadules++
        },

        graficarbarra(division,perito, total){
            let me = this;
            var ctx = document.getElementById(division);
            var datasetf ={
                labels: perito,
                datasets:[]
            }
            var coloresrelleno = [                        
                'rgba(255, 159, 64, .5)',   
                'rgba(153, 102, 255, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(255, 206, 86, .5)',
                'rgba(75, 192, 192, .5)',
                'rgba(54, 162, 235, .5)', 
                'rgb(204, 200, 200, .5)',
                'rgb(204, 0, 153, .5)',
                'rgb(0, 102, 204, .5)',
                'rgb(0, 255, 153, .5)',
                'rgb(102, 102, 255, .5)',
                'rgb(255, 0, 102, .5)',
                'rgb(255, 153, 0, .5)',
                'rgb(51, 102, 255, .5)',
                'rgb(153, 204, 0, .5)',
                'rgb(51, 51, 204, .5)',
                'rgb(0, 204, 153, .5)',
                'rgb(255, 0, 0, .5)',
                'rgb(0, 153, 153, .5)',
                'rgb(153, 204, 0, .5)',
                'rgb(153, 204, 255, .5)',
                'rgb(0, 204, 153, .5)',
                'rgb(0, 0, 255, .5)',
                'rgb(0, 204, 0, .5)' ,     
                'rgb(255, 102, 255, .5)',
                'rgb(0, 153, 204, .5)',
                'rgb(153, 255, 153, .5)',
                'rgb(153, 153, 255, .5)',
                'rgb(153, 153, 255, .5)',
                'rgb(51, 153, 255, .5)',
                'rgb(255, 51, 0, .5)'              
            ]
            var coloresborde = [                        
                'rgba(255, 159, 64, 1)',   
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)', 
                'rgb(204, 200, 200, 1)',
                'rgb(204, 0, 153, 1)',
                'rgb(0, 102, 204, 1)',
                'rgb(0, 255, 153, 1)',
                'rgb(102, 102, 255, 1)',
                'rgb(255, 0, 102, 1)',
                'rgb(255, 153, 0, 1)',
                'rgb(51, 102, 255, 1)',
                'rgb(153, 204, 0, 1)',
                'rgb(51, 51, 204, 1)',
                'rgb(0, 204, 153, 1)',
                'rgb(255, 0, 0, 1)',
                'rgb(0, 153, 153, 1)',
                'rgb(153, 204, 0, 1)',
                'rgb(153, 204, 255, 1)',
                'rgb(0, 204, 153, 1)',
                'rgb(0, 0, 255, 1)',
                'rgb(0, 204, 0, 1)' ,     
                'rgb(255, 102, 255, 1)',
                'rgb(0, 153, 204, 1)',
                'rgb(153, 255, 153, 1)',
                'rgb(153, 153, 255, 1)',
                'rgb(153, 153, 255, 1)',
                'rgb(51, 153, 255, 1)',
                'rgb(255, 51, 0, 1)'              
            ]
            /*
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            var r,g,b;
            
            for(var i=0;i<perito.length;i++){
                r=getRandomInt(255)
                g=getRandomInt(255)
                b=getRandomInt(255)
                datasetf.datasets.push({
                    label:me.mesmostrar+" "+perito[i],
                    backgroundColor:'rgba('+r+','+ g+','+ b+', 1)',
                    borderColor: 'rgba('+r+','+ g+','+ b+', 1)',
                    borderWidth: 1,
                    data: [total[i]]                
                },)  
            }
            */
            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Carpetas iniciadas: ",
                backgroundColor: coloresrelleno,
                borderColor: coloresborde,
                borderWidth: 1,
                data: total               
            },)

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: datasetf,                                   
                options: {
                    responsive:true,
                    title: {
                        display: true,
                        text: 'Grafica de '+me.mesmostrar
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: false,
                        position: 'right',
                        labels: {
                            fontSize: 12,
                            fontSyle: 'bold',
                            boxWidth:10,
                        }
                        
                    },
                    
                    scales: {
                        yAxes: [{                           
                            ticks: {
                                beginAtZero:true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                                
                            }
                        }],
                    }
                }
            });
        },
        
        graficarlinea(division,perito,total){
            let me = this;
            var ctx = document.getElementById(division);
            var datasetf ={
                labels: perito,
                datasets:[]
            }
            var coloresrelleno = [                        
                'rgba(255, 159, 64, .5)',   
                'rgba(153, 102, 255, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(255, 206, 86, .5)',
                'rgba(75, 192, 192, .5)',
                'rgba(54, 162, 235, .5)', 
                'rgb(204, 200, 200, .5)',
                'rgb(204, 0, 153, .5)',
                'rgb(0, 102, 204, .5)',
                'rgb(0, 255, 153, .5)',
                'rgb(102, 102, 255, .5)',
                'rgb(255, 0, 102, .5)',
                'rgb(255, 153, 0, .5)',
                'rgb(51, 102, 255, .5)',
                'rgb(153, 204, 0, .5)',
                'rgb(51, 51, 204, .5)',
                'rgb(0, 204, 153, .5)',
                'rgb(255, 0, 0, .5)',
                'rgb(0, 153, 153, .5)',
                'rgb(153, 204, 0, .5)',
                'rgb(153, 204, 255, .5)',
                'rgb(0, 204, 153, .5)',
                'rgb(0, 0, 255, .5)',
                'rgb(0, 204, 0, .5)' ,     
                'rgb(255, 102, 255, .5)',
                'rgb(0, 153, 204, .5)',
                'rgb(153, 255, 153, .5)',
                'rgb(153, 153, 255, .5)',
                'rgb(153, 153, 255, .5)',
                'rgb(51, 153, 255, .5)',
                'rgb(255, 51, 0, .5)'              
            ]
            var coloresborde = [                        
                'rgba(255, 159, 64, 1)',   
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)', 
                'rgb(204, 200, 200, 1)',
                'rgb(204, 0, 153, 1)',
                'rgb(0, 102, 204, 1)',
                'rgb(0, 255, 153, 1)',
                'rgb(102, 102, 255, 1)',
                'rgb(255, 0, 102, 1)',
                'rgb(255, 153, 0, 1)',
                'rgb(51, 102, 255, 1)',
                'rgb(153, 204, 0, 1)',
                'rgb(51, 51, 204, 1)',
                'rgb(0, 204, 153, 1)',
                'rgb(255, 0, 0, 1)',
                'rgb(0, 153, 153, 1)',
                'rgb(153, 204, 0, 1)',
                'rgb(153, 204, 255, 1)',
                'rgb(0, 204, 153, 1)',
                'rgb(0, 0, 255, 1)',
                'rgb(0, 204, 0, 1)' ,     
                'rgb(255, 102, 255, 1)',
                'rgb(0, 153, 204, 1)',
                'rgb(153, 255, 153, 1)',
                'rgb(153, 153, 255, 1)',
                'rgb(153, 153, 255, 1)',
                'rgb(51, 153, 255, 1)',
                'rgb(255, 51, 0, 1)'              
            ]
            /*
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            var r,g,b;
            
            for(var i=0;i<perito.length;i++){
                r=getRandomInt(255)
                g=getRandomInt(255)
                b=getRandomInt(255)
                datasetf.datasets.push({
                    label:me.mesmostrar+" "+perito[i],
                    backgroundColor:'rgba('+r+','+ g+','+ b+', 1)',
                    borderColor: 'rgba('+r+','+ g+','+ b+', 1)',
                    borderWidth: 1,
                    data: [total[i]]                
                },)  
            }
            */
            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Carpetas iniciadas: ",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: coloresborde,
                borderWidth: 3,
                data: total               
            },)

            var myChart = new Chart(ctx, {
                type: 'line',
                data: datasetf,                                   
                options: {
                    responsive:true,
                    title: {
                        display: true,
                        text: 'Grafica de '+me.mesmostrar
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: false,
                        position: 'right',
                        labels: {
                            fontSize: 12,
                            fontSyle: 'bold',
                            boxWidth:10,
                        }
                        
                    },
                    scales: {
                        yAxes: [{                           
                            ticks: {
                                beginAtZero:true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                                
                            }
                        }]
                    }
                }
            });

        },
        listarporfecha(){
          let me=this;
          me.$validator.validate().then(result => {     
            if (result) {   
                if(me.fechaInicio.substring(0,4) == me.fechaFin.substring(0,4) && me.fechaInicio.substring(5,7) == me.fechaFin.substring(5,7)){  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                        me.$justiciarestaurativa.get('api/Envios/InformacionCompleta/'+ me.fechaInicio +" 00:00:00"+'/'+me.fechaFin+" 23:59:59",configuracion).then(function(response){
                            me.carpetas=response.data;
                                me.$justiciarestaurativa.get('api/Envios/ContarCarpetasiniciadas/'+ me.fechaInicio +" 00:00:00"+'/'+me.fechaFin+" 23:59:59",configuracion).then(function(response){
                                me.carpetasmodulos=response.data;
                                    me.$justiciarestaurativa.get('api/Envios/ContarCarpetasiniciadasFechaMes/'+ me.fechaInicio +" 00:00:00"+'/'+me.fechaFin+" 23:59:59",configuracion).then(function(response){
                                    me.carpetasfecha=response.data;
                                    var cont=0
                                    var cont2=0                   
                                    me.mesmostrar = me.obtenermes(me.fechaInicio.substring(5,7)-1) + " "+me.fechaInicio.substring(0,4)          
                                    me.carpetasmodulos.forEach(function (registro){
                                        cont += registro.envios
                                    });
                                    me.carpetasfecha.forEach(function (registro){ 
                                        cont2 += registro.envios
                                    });
                                
                                    me.carpetasmodulos.push({modulo: 'Total',envios: cont });
                                    me.carpetasfecha.push({fecha: 'Total',envios: cont2 });

                                    me.textotitulo1 = "Estadísticas de "+me.fechai+ " a "+me.fechaf+" por modulo";
                                    me.textotitulo2 = "Estadísticas de "+me.fechai+ " a "+me.fechaf;
                                    
                                    me.eliminar();
                                    
                                    //Se separan los datos de la variable principal por que la funcion de las graficas no admite ese tipo de variable

                                    var perito=[];      
                                    var total=[];     
                                    //ciclo para extraer datos
                                    me.carpetasmodulos.forEach(function (registro){
                                        if(registro.modulo!='Total'){
                                            perito.push(registro.modulo)
                                            total.push(registro.envios)
                                        }               
                                    });
                                    //Creación de las dos graficas principales de cada tabla
                                    me.graficarbarra("myChart",perito,total)
                                    me.graficarlinea("myChartlinea",perito,total) 
                                    
                                    
                                    perito =[]
                                    total = []
                                    //ciclo para extraer datos
                                    me.carpetasfecha.forEach(function (registro){
                                        if(registro.fecha!='Total'){
                                            perito.push(registro.fecha)
                                            total.push(registro.envios)
                                        }               
                                    });
                                    //Creación de las dos graficas principales de cada tabla
                                    me.graficarbarra("myChart2",perito,total)
                                    me.graficarlinea("myChartlinea2",perito,total)

                                    //creacion de las graficas individuales
                                    for(var i=0;i<me.carpetasmodulos.length-1;i++){
                                        me.crear();
                                        me.graficarindividual(me.carpetasmodulos[i].modulo,me.carpetasmodulos[i].envios);
                                        me.conteograficas++;
                                    }
                                    me.conteocoloresindiviadules = 0;
                                    for(var i=0;i<me.carpetasfecha.length-1;i++){
                                        me.crear2();
                                        me.graficarindividual(me.carpetasfecha[i].fecha,me.carpetasfecha[i].envios);
                                        me.conteograficas++;
                                    }
                                    
                                    
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
                }else{
                    me.$notify('Los años o meses de las fechas no coinciden','error')
                }
                }         
            }) 
        },  
        mostrarpdf(){

            let me=this; 
            var dd = me.downloadPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }
            
            var doc = pdfMake.createPdf(dd);
            var doc = pdfMake.createPdf(dd).print();
               
        },
        downloadPdf(elemento,titulo) {
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var u_subProc= this.u_subproc;
            var nuc = this.nuc;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.textofinal
            );
            //***************************************************************************** */
            var agenciainfodr = this.agenciainfo["direccion"];
            var agenciainfotel = this.agenciainfo["telefono"];

            //***************************************************************************** */
            console.log(elemento)
            var quotes = document.getElementById(elemento);
            html2canvas(quotes).then(canvas => {
            var data = canvas.toDataURL('image/jpeg', 1.0)
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
                                absolutePosition: {x:0, y:0},
                            },
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo', 
                                style: 'PiePagina', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                fontSize: 7,
                                color: 'white',
                                absolutePosition: {x: 0, y: 30}                                
                            },
			            ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {
                         
                        return [
                            { 
                                // image: logo1,
                                // width: 150, 
                                // absolutePosition: {x: 75, y: 30},
                                
                            },
                            { 
                                // image: logo2,
                                // width: 50,  
                                // absolutePosition: {x: 495, y: 30},
                            },
                            {
                                image: logo3,
                                width: 612,
                                absolutePosition: {x: 0, y: 0},
                            },
                        ]
                 
                },
              
                content: [
                    {
                        text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:                       
                        this.u_distrito+", Hidalgo a "+this.generarfecha(),
                        style: 'Fecha',
                        alignment: 'right', 
                    }, 
                    {
                        text: "\n\n\n"+titulo+"\n"+"\n"+"\n",
                        style: 'Textob',
                        alignment: 'center',
                    },
                    {
                        image: data,
                        width: 500,
                        alignment: 'center',
                    },
                
                    
                ],
             
                
                styles: {
                    
                    Adscripcion:{
                        fontSize: 10,
                        bold:true
                    },
                    Fecha:{
                        fontSize: 9,
                    },
                    Nooficio:{
                        fontSize: 8,
                        bold:true
                    },
                    DePara:{
                        fontSize: 10,
                        bold:true  
                    },
                    DeParaCargo:{
                        fontSize: 9,
                        bold:true 
                    },
                    PiePagina:{
                        fontSize: 7,
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Textob:{
                        fontSize: 10,
                        alignment:'justify',
                        bold:true
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true ,
                        alignment:'center'
                    },
                    SubTitulo:{
                        fontSize: 11,
                        semibold:true 
                    },
                   
                }
	
        }

            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdf');
            var callback = function(url) { f.setAttribute('src',url); }
            doc.getDataUrl(callback, doc);
            this.modaldocumento=true;
            return dd; 
            }).catch((error) => { 
                            console.log("Error al generar pdf", error)
            });          
        },
        graficar(){
            
        }
             
      } 
   }

</script>
<style>

.caption1{
 font-size: 10px !important;
 text-align: center !important;
 padding: 0 0px !important;
 height: 20px !important; 
 border-left:1px solid #aaaaaa;
 border-top:1px solid #aaaaaa;
 border-bottom:1px solid #aaaaaa;
 border-right:1px solid #aaaaaa;
}

.mytable{
 font-size: 10px !important;
 text-align: center !important;
 padding: 0 0px !important;
 height: 20px !important; 
 border-left:1px solid #aaaaaa;
 border-top:1px solid #aaaaaa;
 border-bottom:1px solid #aaaaaa;
 border-right:1px solid #aaaaaa;
}

</style>