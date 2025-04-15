<template>  
<v-layout align-start>

    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Determinación de archivo</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                     <v-flex xs12 sm6 md3>
                      
                        <v-text-field class="font-weight-regular"
                            v-model="nuc" disabled  prepend-icon="folder"
                            filled
                        ></v-text-field>
                       </v-flex>
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }"> 
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
                                        <v-icon dark>close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cerrar carpeta</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }"> 
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="modalAdd = true" fab dark small color="success">
                                        <v-icon dark>add</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar registro</span>
                        </v-tooltip>
            
            
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="determinacionarchivo"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td class=""> 
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on"  
                                        @click="edititem(props.item)"
                                        >
                                       edit
                                    </v-icon> 
                                </template>
                                <span>Editar registro </span>
                            </v-tooltip>    
                    </td>       
 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
                </template>
                
        </v-data-table>

        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
                <v-toolbar dark color="primary">
                    
                    <v-toolbar-title>Determinación de archivo.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click="generarpdf()">Vista previa</v-btn>
                        <v-btn icon   @click="modalAdd = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-flex mx-5>
                    <v-card-text>
                        <v-form ref="form" >  
                            <br>
                            <br>

                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >

                                        <v-text-field
                                        name="articulos"
                                        v-model ="articulos"
                                        label="Articulos del codigo penal de previsión y sancionamiento:"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('articulos')">
                                        </v-text-field>

                                        <v-text-field
                                        name="modo"
                                        v-model ="modo"
                                        label="Esencia qué hizo el activo, ajustándolo al tipo penal de manera breve:"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('modo')">
                                        </v-text-field>

                                        

                                    </v-flex>

                                        
                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12   >
                                        <v-radio-group v-model="estado1"
                                        :mandatory="false"                                    
                                        >
                                            <v-radio label="NO SE TIENE ESCLARECIDA LA MECÁNICA DE LOS HECHOS" value="radio-1"></v-radio>
                                            <v-radio label="SE TIENE ACREDITADO EL HECHO, PERO NO SE IDENTIFICA QUIÉN ES EL PROBABLE RESPONSABLE" value="radio-2"></v-radio>
                                        </v-radio-group> 

                                        <v-radio-group v-model="estado2"
                                        :mandatory="false"                                    
                                        >
                                            <v-radio label="No se cuenta con líneas de investigación que permitan ordenar actos útiles" value="radio-1"></v-radio>
                                            <v-radio label="Se tiene suficiente para preliminarmente establecer la dinámica de los hechos y su adecuación a un tipo penal" value="radio-2"></v-radio>
                                        </v-radio-group>                                           
                                    </v-flex>
                                     
                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >                      
                                        <v-card elevation="0"  >
                                            <v-card-title class="accent"><h3>Poner el nombre del acto de investigación, la fecha, y un resumen de lo que se desprende.</h3></v-card-title>
                                                    <v-card-text>
                                                        <v-form  > 
                                                            <vue-editor 
                                                                name = "acto de investigacion"
                                                                v-model="aifr"                                        
                                                                outline  height=350px;
                                                                style="max-height: 310px; overflow-y: scroll"
                                                                :editorToolbar="customToolbar" 
                                                                v-validate="'required'" 
                                                                :error-messages="errors.collect('acto de investigacion')">                                                                 >
                                                            </vue-editor>
                                                        </v-form>
                                                    </v-card-text>                                                
                                            </v-card> 
                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >                      
                                        <v-card elevation="0"  >
                                            <v-card-title class="accent"><h3>Texto de Determiación de archivo</h3></v-card-title>
                                                    <v-card-text>
                                                        <v-form  > 
                                                            <vue-editor 
                                                                v-if="control" 
                                                                v-model="textof"                                        
                                                                outline  height=350px;
                                                                style="max-height: 310px; overflow-y: scroll"
                                                                :editorToolbar="customToolbar"                                                                  >
                                                            </vue-editor>
                                                        </v-form>
                                                    </v-card-text>  
                                                    <v-tooltip  bottom>
                                                        <template v-slot:activator="{ on }"> 
                                                            <v-btn class="mx-2" slot="activator" v-on="on" @click="generartexto()"  absolute top right  fab    color="primary">
                                                                <v-icon dark>remove_red_eye</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Generar texto del documento</span>
                                                    </v-tooltip>                                                 
                                            </v-card> 
                                    </v-flex>

                                </v-layout>
                            </v-container>                          
                        </v-form>
                    </v-card-text>                   
                </v-flex>
            </v-card>
        </v-dialog>        
     

        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click.native="guardar()">Guardar Incompetencia</v-btn>
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

            
    </v-flex>
    
</v-layout> 
</template>

 
<script> 
    
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
  import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { debug } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor"; 
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util';
  import NavDrawer from './ConfiguracionNavDrawer.vue'



  export default {
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403,
      NavDrawer,
    },
    data: () => ({
        alert:false,
        dialog: false, 
        dialogoeditor: false,
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        test:'',
        control:false,
        fechahorasuhecho:'',
        //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
        //citatorio
        idcitatorio:'',

        dia : moment().format('DD'),
        mes : moment().format('MMMM'),
        año: moment().format("YYYY") ,
        hr: moment().format('h:mm:ss a'),
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
        texto:'',
        texto2:'',
        texto3:'',
        textof:'',
        comilla:'"',
        rBreve:'',
        idNuc:'',
        fechaINUC:'',
        mediodenuncia:'',
        personas:[],
        delitos:[],
        delito:"",
        articulos:"",
        aifr:"",
        estado1:"radio-1",
        estado2:'radio-1',
        opcion1:'',
        opcion2:'',
        direccionsuceso:'',
        modo:'',
        determinacionarchivo:'',
        //*************** */
        headers: [

            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Módulo', value: 'modulo', sortable: true  }, 
            { text: 'Estado', value: 'estado' }, 
            { text: 'Marca',value: 'marca' }, 
            { text: 'Tipo', value: 'tipo' }, 
            { text: 'Modelo', value: 'modelo' }, 
            { text: 'Serie', value: 'serie' },
            { text: 'Placas', value: 'placas'},
            { text: 'Color', value: 'color'},
            { text: 'Año', value: 'ano' },
            { text: 'Opciones', value: 'opciones', sortable: false },
                                            
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1, 
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        
        //generar
        camposactivos: true,
        textodecitatorio: false,   



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
        u_email:'',
        //----------------------------------------------------
        
    }),
       
    created () {
        let me = this 
            me.rHechoId =  me.$store.state.rhechoid;
            me.rAtencionId = me.$store.state.ratencionid
            me.nuc = me.$store.state.nuc;
           
        if (me.rHechoId== null)
        {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                function(){ 

                        me.$router.push('./carpetas')
                })
        }
        else{
                me.$notify('Carpeta abierta correctamente !!!','success')
                

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

                //*********************************************** */
                me.listarLogo();
                me.listar();
                me.listarrHecho();
                me.listarPersonas();
                me.listardelitos();
                me.listardireccionhecho();
        }
      
      
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
                return this.editedIndex === -1 ? 'Nueva Notificacíon' : 'Editar Notificacíon'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'assignment'
            },
    },
    watch: {
        
    },
    
    methods:{ 
        generartexto(){
            this.$validator.validate().then(result => {
            if (result) { 
                this.delito=''
                this.control = true;
                if(this.delitos.length>1)
                    for(var i =0;i<this.delitos.length;i++){
                        this.delito += delitos.nombreDelito
                        if(i != this.delitos.length - 1)
                        this.delito += ","
                    }
                else
                this.delito = this.delitos[0].nombreDelito
                        


                if(this.estado1=="radio-1")
                    this.opcion1 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+">los actos de investigación a los que se ha hecho referencia con anterioridad, permiten comenzar a delinear la teoría del caso; sin embargo, para poder ir ante un juez de control para formular imputación, se torna indispensable identificar con precisión las circunstancias de tiempo, lugar y modo en que se haya llevado a cabo la conducta que se examina.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">De lo contrario, se dejaría en estado de indefensión a la persona imputada, lo que tiene el efecto de producir un auto de no vinculación a proceso.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Y en el caso que nos ocupa, no se cuenta con la identificación de antecedentes de investigación, aparte de los ya ordenados y recabados, para poder esclarecer de manera clara cuándo, a qué hora aproximada, dónde y cómo fue que ocurrió el hecho que atentó contra el bien jurídicamente protegido de la parte victimal.</p>"
                else
                    this.opcion1 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+">si bien es cierto de los actos de investigación ya recaudados, se desprende con meridiana claridad que los hechos consistieron en las siguientes circunstancias de tiempo, modo y ocasión: </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Tiempo: el ilícito se cometió el "+this.FechaSysaFechaString( this.fechahorasuhecho)+"</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Lugar: el ilícito se cometió en el municipio de "+this.direccionsuceso.municipio+", particularmente en el domicilio ubicado en la calle "+this.direccionsuceso.calle+", número "+this.direccionsuceso.noext+", de la colonia "+this.direccionsuceso.localidad+". </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Modo: "+this.modo+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Sin embargo, no existe ninguna línea de investigación identificable y útil que oriente a esta representación social hacia la identidad de la persona que probablemente pudo haber cometido o participado en la comisión de ese hecho delictivo.&nbsp;</p>"

                if(this.estado2=="radio-1")
                    this.opcion2 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+">no se cuenta con líneas de investigación que permitan ordenar actos útiles para esclarecer las circunstancias de tiempo, lugar y modo de comisión del hecho delictivo.</p>"
                else
                    this.opcion2 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+">si bien se tiene suficiente para preliminarmente establecer la dinámica de los hechos y su adecuación a un tipo penal, sin embargo, no se cuenta con líneas de investigación que permitan ordenar actos útiles para identificar quién lo cometió o pudo haberlo cometido y así identificar a quien tenga el carácter de persona imputada a que se refiere el artículo 112 del Código Nacional de Procedimientos Penales. </p>"

                    


                this.texto = "<p class="+this.comilla + "ql-align-justify"+this.comilla+">En la ciudad de "+this.u_distrito+", Hidalgo "+this.generarfecha()+", visto el estado procedimental que tienen las diligencias de la carpeta de investigación al rubro citada, se procede a emitir la resolución que se estima pertinente conforme al Código Nacional de Procedimientos Penales, y: </p>"
                
                this.texto2 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>PRIMERO. Competencia</strong>. El ministerio público que esta resolución emite, es competente para resolver sobre el destino de la presente carpeta bajo la figura del archivo temporal, en virtud de que el evento ocurrió en "+this.direccionsuceso.municipio+", "+this.direccionsuceso.estado+", y nos encontramos ante hechos que fueron denunciados y que permiten identificar que corresponde conocer de ellos al fuero común. </p>" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Lo anterior con fundamento en los artículos 14, 16 y 21 de la Constitución Política de los Estados Unidos Mexicanos; 1º, 5º -fracción III- y 7 de la Ley Orgánica del Ministerio Público en el estado de Hidalgo; 1º de su Reglamento; así como 131 –fracción XIII- y 254 del Código Nacional de Procedimientos Penales.&nbsp;</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>SEGUNDO. Antecedentes</strong>. De la presente carpeta de investigación se desprende que se inició la misma el pasado "+this.FechaSysaFechaString(this.fechaINUC)+", con motivo de la "+this.mediodenuncia+" de "+this.personas[0].clasificacionPersona+", quien hizo del conocimiento del ministerio público hechos que estimaba constitutivos del delito de "+this.delito+", mismo que está previsto y sancionado por el Código Penal en sus artículos "+this.articulos+". sin embargo, a la fecha no se ha judicializado este conflicto penal, es decir, no se ha pedido la activación de ninguna forma de conducir a proceso a la parte imputada, lo que hace procedente que esta representación social se pronuncie en la presente resolución.&nbsp;</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>TERCERO. Consideraciones por las que se determina el archivo temporal</strong>.<strong> </strong>Una vez iniciada la carpeta, se han ordenado y diligenciado los siguientes actos de investigación, de los cuales en esencia se desprende la información que a continuación se señala:</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">"+this.aifr+"</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Ahora bien, la investigación es una actividad circular de obtención, análisis y procesamiento de información, cuyos productos esenciales son datos y medios de prueba.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Por sobre los elementos importantes que surgen de la reforma constitucional de 2008, que dio paso a este sistema de justicia penal de corte acusatorio, en aquellos casos en que no nos encontramos ante un ilícito de acción penal por particular, le corresponde al ministerio público la investigación del hecho; y, si bien, se agrega que también las policías tienen tal competencia, no debe desatenderse que éstas actuarán bajo la conducción y mando de la representación social.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">De manera que resulta claro que la investigación, especialmente la policial, no se reduce a la recolección de datos y de medios de prueba que puedan servir al esclarecimiento de los hechos sin más, sino que, sobre todo, debe servir al proceso propiamente jurisdiccional.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Consideraciones que encuentran apoyo en la correlación de los artículos 127 y 131 –fracción III- del Código Nacional de Procedimientos Penales; 1, 2 y 5 –fracción I- de la Ley Orgánica del ministerio público del estado de Hidalgo.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Es de considerarse que, si bien es cierto corresponde a esta representación social ordenar las diligencias que resulten pertinentes (es decir, que guarden relación con los hechos a esclarecer); sin embargo, los actos de investigación no deben ser sin sentido, sino orientados hacia la línea de investigación que pueda coadyuvar a cumplir con los fines a que se refiere el artículo 2º del Código Nacional de Procedimientos Penales, esto es, que sean útiles. </p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Esa utilidad, y por ende los actos de investigación, deben ser objetivos, así lo establece el numeral 129 de la misma codificación procesal; lo cual significa que se refieran tanto a elementos de cargo como de descargo. No obstante, para poder incluso recabar los actos de descargo, es indispensable contar con una teoría del caso bien definida que tenga sustento en una línea de investigación.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Pero en el caso en que se actúa, si bien se tiene la teoría fáctica preliminar de los hechos, ajustados a una proposición jurídica; sin embargo, no resulta suficiente para poder judicializar el conflicto penal que se examina, y llevar a quien pueda tener el carácter de persona imputada ante un juez de control, por medio de alguno de los mecanismos previstos en las fracciones I, II y III del artículo 141 del Código Nacional de Procedimientos Penales.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Ello es así en virtud de que "+this.opcion1+"</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">En consecuencia, al identificarse esa línea de investigación, no sería razonable precisar qué actos deben ordenarse por esta representación social, para el debido esclarecimiento de los hechos; lo que justifica determinar que en este momento se <strong>archive temporalmente</strong> la presente carpeta de investigación, hasta en tanto surja algún dato –en esta u otra carpeta- que permita vincular los hechos que se relacionan con la presente indagatoria con alguna línea a seguir. </p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">En el entendido que este archivo subsistirá hasta en tanto ocurra lo señalado en el párrafo que antecede, o bien se dé alguna causa de no ejercicio de acción penal por alguna de las causas previstas en el Código Nacional de Procedimientos Penales. </p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Por lo anteriormente expuesto y fundado a la luz del artículo 254 del Código Nacional de Procedimientos Penales, así como 5º -fracción XII- de la Ley Orgánica del Ministerio Público, y los numerales 46 –fracción V-, 49 –fracción VII- y 64 –fracción V- del Reglamento de dicha Ley, se: </p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                
                this.texto3= "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>PRIMERO.</strong> Esta representación social es competente para emitir la presente determinación. </p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>SEGUNDO.</strong> Se determina que se actualiza razonablemente la procedencia de archivar temporalmente la presente carpeta de investigación, en virtud de que  "+this.opcion2+"</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>TERCERO.</strong> Túrnese sin dilación la presente resolución agregada en la carpeta de investigación a la Dirección del Centro de Atención Temprana, para la autorización correspondiente en caso de resultar procedente, como lo ordena el artículo 46 –fracción V, primera hipótesis- del reglamento de la Ley Orgánica del Ministerio Público. </p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>CUARTO.</strong> Una vez que se obtenga la autorización correspondiente de la Dirección de Atención Temprana, notifíquese la presente resolución a la parte denunciante o querellante, para los efectos a que se refiere el artículo 258 del Código Nacional de Procedimientos Penales.</p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                " <p class="+this.comilla+"ql-align-justify"+this.comilla+">Así lo resolvió "+this.u_nombre+", en carácter de agente del ministerio público de la Procuraduría General de Justicia del estado de Hidalgo, "+this.u_agencia+"</p>"
                
                this.textof = this.texto + this.texto2 + this.texto3

            }})

        },
        FechaSysaFechaString(fecha){
            return this.fechai =fecha.substring(8,10) +" de "+ this.obtenermes(fecha.substring(5,7)-1)+
            " del "+ fecha.substring(0,4); 
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
            fecha = moment().format('h:mm a')+ " horas del día "+  moment().format('DD') + " de " + moment().format('MMMM')  + " de " + moment().format("YYYY");
            return fecha;      
        },
        cambiarestado(){
            if(this.estado1)
            this.estado2=false
            if(this.estado2)
            this.estado1=false
        },
        generarpdf(){
            this.$validator.validate().then(result => {
            if (result) { 
                this.downloadPdf();
            }})
        },
        listarLogo(){
        
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};  
                this.$conf.get('api/ConfGlobals/Listar').then(function(response){
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
        cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./carpetas')
        },
        listarrHecho(){
               
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};  
                this.$conf.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){

                    me.fechaINUC = response.data.fechaElevaNuc
                    me.agenciaid = response.data.agenciaid                 
                    me.rBreve = response.data.rBreve
                    me.idNuc = response.data.nucId
                    me.mediodenuncia = response.data.mediodenuncia
                    me.fechahorasuhecho = response.data.fechaHoraSuceso
                    console.log(me.idNuc)
                    console.log(response.data.rHechoId)
                    me.informacionagencia();
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
        listar(){
             let me=this;  
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Terminacion/DeterminacionArchivoListarPorhecho/'+ me.rHechoId,configuracion).then(function(response){
                    me.determinacionarchivo=response.data;
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
        informacionagencia(){
                 let me=this;  
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Agencias/Listarporid'+ me.u_idagencia,configuracion).then(function(response){
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
        listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var contador=0;
            var personasArray=[];
            this.$conf.get('api/RAPs/ListarTodos/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data)
                me.personas =response.data;
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
        listardelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
            var delitosArray=[];
            this.$conf.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data)
                me.delitos = response.data;                   
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
        listardireccionhecho(){
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/DireccionDelitoes/ListarPoridHecho/' +me.rHechoId,configuracion).then(function(response){
                   
                    me.direccionsuceso = response.data
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
        crearpdf(){
            this.botonp=false;
            this.crearPDF_CN();
            this.citatorionotificacion =0;
        },
        close () {
                this.dialog = false;
                this.limpiar();
        },        
        guardar(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
                me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información ',           
                function(){
                    this.$conf.put('api/Determinacion/Guardar',{
                        'idNuc': me.idNuc,
                        'statusNUC': "nose",  
                    },configuracion).then(function(response){  
                    me.$notify('La información se actualizo correctamente !!!','success')   
                    me.modaldocumento = false;      
                    me.limpiar();
                    me.close(); 
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
     
                },
                    function(){
                        alertify.warning('Verifica la información')
                    }
                    ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                      
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


            var dd = me.downloadPdf();
            var doc = pdfMake.createPdf(dd);
            me.modaldocumento=true;    
            
            var doc = pdfMake.createPdf(dd).print();
               
        },
        downloadPdf() {

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
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var nuc = this.nuc;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.texto
            );
            var html2 =htmlToPdfmake(
                this.texto2
            );
            var html3 =htmlToPdfmake(
                this.texto3
            );
            //***************************************************************************** */
            var agenciainfodr = this.agenciainfo["direccion"];
            var agenciainfotel = this.agenciainfo["telefono"];

            //***************************************************************************** */
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 30, 250, 30, 100 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo', 
                                margin: [30, 20, 0, 0] 
                                
                                          
                            },
                            {
                                text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'normaText', margin: [0, 20, 30, 0] 
                            }
			            ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {
                         
                        return [
                            { 
                                image: logo1,
                                width: 200, 
                                absolutePosition: {x: 25, y: 30},
                                
                            },
                            { 
                                image: logo2,
                                width: 70,  
                                absolutePosition: {x: 490, y: 30},
                            },
                             {
                                 text:  u_dirSubPro +"\n"+u_agencia,
                                 style: 'subheaderlogo',
                                 absolutePosition: {x: 37, y: 100},
                             },
                             {
                                    text:"Número Único de caso: "+nuc,                 
                                    style: 'subheader',
                                    
                                    alignment: 'right',
                                    margin: [0, 132, 30, 0] 
                                  
                            }                            
                        ]
                 
                },
              
                content: [
                    {                     
                        text: 'DETERMINACIÓN',
                        alignment: 'center',
                        style: 'subheader',
                        absolutePosition: {x: 37, y: 200},
                    }, 
                    {
                        text: html ,                        
                        style: 'texto',
                    },
                    
                    {
                        text: "\n"+"\n"+"\n"+"\n"+"\n"+this.u_nombre,   
                        alignment :'justify',                     
                        style: 'texton',                                                           
                    },
                    {
                        text: this.u_puesto,   
                        alignment :'justify',                     
                        style: 'texton',                                                           
                    },
                    {
                        text: this.u_agencia,   
                        alignment :'justify',                     
                        style: 'texton',                                                           
                    },
                    
                    
                ],
             
                
                styles: {
                    
                    header: {
                        fontSize: 18,
                        bold: true,   
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true,
                       
                    },
                    subheaderlogo: {
                        fontSize: 10,
                        bold: true,
                       
                    },
                    texto:{
                        fontSize: 12,
                    },
                    texton:{
                        fontSize: 12,
                        bold:true
                    },
                   
                }
	
        }
           

           
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdf');
            var callback = function(url) { f.setAttribute('src',url); }
            doc.getDataUrl(callback, doc);
            this.modaldocumento=true;
            return dd;
              
           
        },
        
      } 
   }
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
</style>
