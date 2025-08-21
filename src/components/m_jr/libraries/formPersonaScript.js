//** COMPONENTES */
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

var assert, curp;
assert = require('assert');
curp = require('curp.js');
export default 
{
 data: () => 
 ({  
    //GEOLOCALIZACION
    geolocalizacion:
    {
        center: { lat: 45.508, lng: -73.587 },
        modal:0,
        geoloc:0,
        markers: [],
        places: [],
        currentPlace: null,
        lataux:'',
        lngaux:'',
    },
    opciones:
    {
        modo:'insertar',
        mostrarMedio:false,
        mostrarDatosProtegidos:false,
    },
    step:1,
    titulo:'Datos generales de la vícima u ofendido.',
    infoPersona:
    {
      envioId:'',
      rapid:'',
      anonimo:false,
      verTP:false,
      rfc:'',
      tipoPersona:'Fisica',
      relacion:false,
      tipoRelacion:'',
      razonsocial:'',
      clasificacionPersona:'',
      edad:'',
      nombres:'',
      apaterno:'',
      amaterno:'',
      alias:'',
      statusAlias:false,
      fnacimiento:'',
      curp:'',
      sexo:'',
      nacionalidad:'Mexicana',
      entidadFederativaNacId:0,
      docidentificacion:'',
      imageName: '',
      imageUrl: null,
      imageFile: '',
      idPersona:'',
      datosProtegidos:false,
    },
    infoAdicional:
    {
        medionotificacion:'',
        nacionalidad:'Mexicana',
        estadocivil:'',
        ocupacion:'',
        nivelestudio:'',
        lengua:'',
        religion:'',
        presexuales:false,
        genero:'',
        bDiscapacidad:false,
        discapacidad:'',
        telefono1:'',
        telefono2:'',
        correo:'',
        registro: false,
        verR:false,
        verI:false,
        otraOcupacion:''
    },
    direccionPersona:
    {
        calle:'',
        noInt:'',
        noExt:'',
        entreCalle1:'',
        entreCalle2:'',
        referencia:'',
        pais:'Mexico',
        estadoid:'',//SU TEXT ES EL QUE SE VA A GUARDAR EN LA BD
        municipioid:'',//SU TEXT ES EL QUE SE VA A GUARDAR EN LA BD
        localidadid:'', 
        cp:'',
        lat:'',
        lng:''
    },
    catalogos:
    {
      clasificacionpersonas:[],
      sexos:[],
      nacionalidades:[],
      medionotificaciones:[],
      estados:[],
      docsidentificaciones:[],
      lenguas:[],
      religiones:[],
      nacionalidades:[],
      estadosciviles:[],
      catalogos:[],
      ocupaciones:[],
      nivelestudios:[],
      generos:[],
      discapacidades:[],
      municipios:[],
      localidades:[],
      relacionados:[
        {text:'Abuelo(a)',value:'Abuelo(a)'},
        {text:'Cónyuge o pareja',value:'Cónyuge o pareja'},
        {text:'Amigo',value:'Amigo'},
        {text:'Expareja',value:'Expareja'},
        {text:'Hermano(a)',value:'Hermano(a)'},
        {text:'Hijo(a)',value:'Hijo(a)'},
        {text:'Jefe(a) o patron(a)',value:'Jefe(a) o patron(a)'},
        {text:'Madre o padre',value:'Madre o padre'},
        {text:'Nieto(a)',value:'Nieto(a)'},
        {text:'Novio(a)',value:'Novio(a)'},
        {text:'Padrastro/madrastra',value:'Padrastro/madrastra'},
        {text:'Primo(a)',value:'Primo(a)'},
        {text:'Sobrino(a)',value:'Sobrino(a)'},
        {text:'Tio(a)',value:'Tio(a)'},
        {text:'Vecino(a)',value:'Vecino(a)'},
        {text:'Conocido(a)',value:'Conocido(a)'},
    ],
    }
     
 }),
 created () 
  { 
     let me = this;
     console.log("CREANDO EL NUEVO OBJETO 11");
     //llenar 
     me.listarTipoPersona();
     me.listarSexo();
     me.listarIdentificacion();
     me.listarEstados();
     // INFORMACION COMPLEMENTARIA
     me.listarMedionotificacion();
     me.listarNacionalidad();
     me.listarEstadoCivil();
     me.listarGenero();
     me.listarOcupacion();
     me.listarNivelEstudio();
     me.listarLengua();
     me.listarReligion();
     me.listarDiscapacidad();  
  },
  methods:
  {
      
      mostrarTP()
      {
        let me = this;
        me.infoPersona.verTP=1;
      },
      ocultarTP ()
      {
        let me = this;
        me.infoPersona.verTP=0;
      },
      limpiatFormulario()
      {
        let me=this;
        //PRIMERO CAMPOS DE TEXTO
        me.infoPersona.nombre='';
        me.infoPersona.apaterno='';
        me.infoPersona.amaterno='';
        //COMBOS
        me.direccionPersona.estadoid='';
        me.catalogos.municipios.length = 0;
        me.catalogos.localidades.length = 0;
        me.direccionPersona.municipioid='';
        me.direccionPersona.localidadid='';
        //SWITCHES
        me.infoPersona.anonimo=false;
        //CAMPOS ESCONDIDOS
        me.step=1;
        me.infoPersona.rapid='';
      },
      presentarEdicion(persona)
      {
        let me=this;
        me.limpiatFormulario();

        me.opciones.modo='editar';
        me.opciones.llenarInfoEdicion=true;
        //PRIMERA SECCION
        //debugger;
        me.infoPersona.rapid= persona.rapId; 
        me.infoPersona.idPersona = persona.personaId;
        me.infoPersona.anonimo= persona.statusAnonimo;
        me.infoPersona.tipoPersona = persona.tipoPersona;
           if (me.infoPersona.tipoPersona =="Fisica")
           {
                me.infoPersona.verTP=0;
           }
           else
           {
                me.infoPersona.verTP=1;
           }
           me.infoPersona.clasificacionPersona = persona.clasificacion;
           me.infoPersona.rfc = persona.rfc;
           me.infoPersona.razonsocial = persona.razonSocial;
           me.infoPersona.nombres= persona.nombre;
           me.infoPersona.apaterno = persona.apellidoPaterno;
           me.infoPersona.amaterno = persona.apellidoMaterno;
           me.infoPersona.alias = persona.alias;
           me.infoPersona.fnacimiento= persona.fechaNacimiento;
           me.infoPersona.edad= persona.edad;
           me.infoPersona.sexo = persona.sexo;
           me.infoPersona.entidadFederativa=persona.entidadFederativa;
           me.selectEFederativa(persona.entidadFederativa);
           me.infoPersona.docidentificacion = persona.docIdentificacion;
           me.infoPersona.curp = persona.curp;
           me.infoPersona.datosProtegidos=persona.datosProtegidos;
           // INFORMACION ADICIONAL

           //LLENAR LA TABLA DE MEDIOS DE NOTIFICACION
           var tMediosNotifiacion = persona.medionotificacion.split(",");
           var arrayMediosNotifiacion=[];
           tMediosNotifiacion.map(function(x)
           {
            arrayMediosNotifiacion.push({text: x,value: x});
           });
           me.infoAdicional.medionotificacion = arrayMediosNotifiacion;
           
           me.infoAdicional.telefono1 = persona.telefono1;
           me.infoAdicional.telefono2 = persona.telefono2;
           me.infoAdicional.correo = persona.correo;
           me.infoAdicional.estadocivil = persona.estadoCivil;
           me.infoAdicional.genero = persona.genero;

           if(persona.genero!='' && persona.genero!=null )
           {
            me.infoAdicional.presexuales=true;
            me.infoAdicional.genero=persona.genero
           }
           else
           {
            me.infoAdicional.presexuales=false;
            me.infoAdicional.genero=null;
           }
           me.infoAdicional.registro = persona.registro;
           me.infoAdicional.verR = persona.verR;
           me.infoAdicional.verI = persona.verI;
           me.infoAdicional.ocupacion = persona.ocupacion;
           me.infoAdicional.nivelestudio = persona.nivelEstudio;
           me.infoAdicional.lengua = persona.lengua;
           me.infoAdicional.religion = persona.religion;
           me.infoAdicional.bDiscapacidad = persona.discapacidad;
           if(me.infoAdicional.bDiscapacidad)
            me.infoAdicional.discapacidad={text: persona.tipoDiscapacidad,value: persona.tipoDiscapacidad};
           
           me.infoAdicional.otraOcupacion='';
           me.listarDireccionPersonal();
           me.documentoIdentificacion(); 

           
      },
      documentoIdentificacion(){
        let me=this;  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header}; 
  
        me.$cat.get('api/DocumentosPesonas/Listar/' +me.infoPersona.idPersona,configuracion).then(function(response){   
            me.infoPersona.imageUrl = response.data.ruta;
            me.selectTipoDocumentoIdentificacion(response.data.tipoDocumento)


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
    listarDireccionPersonal()
    {
      let me=this;    
      let header={"Authorization" : "Bearer " + this.$store.state.token};
      let configuracion= {headers : header};
      me.$cat.get('api/RAPs/ListarDP/'+ me.infoPersona.idPersona,configuracion).then(function(response){
          
          //console.log(response.data);
          me.direccionPersona.calle =response.data.calle;
          me.direccionPersona.noInt= response.data.noint; 
          me.direccionPersona.noExt=response.data.noext; 
          me.direccionPersona.entreCalle1 = response.data.entrecalle1;
          me.direccionPersona.entreCalle2 = response.data.entrecalle2;
          me.direccionPersona.referencia= response.data.referencia;  
          me.direccionPersona.estadoid= response.data.estado;
          me.direccionPersona.municipioid = response.data.municipio; 
          console.log("id de estado obtenido");
          console.log(me.direccionPersona.estadoid);
          
          me.direccionPersona.localidadid= response.data.localidad; 
          me.direccionPersona.pais=response.data.pais;
          me.direccionPersona.cp=response.data.cp;
          me.direccionPersona.lat=response.data.lat;
          me.direccionPersona.lat=response.data.lat;
          me.lng=response.data.lng;
          if(response.data.estado!='' || response.data.estado!=null)
            me.listarPorEstado(true);
          
          //.geoAddMarker();
        
      }).catch(err => 
        { 
            if(err.response)
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
                    me.$notify('Error al intentar listar los registros','error')    
                }
            }
            else
            {
                console.log("error no controlado:");
                console.log(err);
            } 
          });
  },
  
        
     
     
      
 

selectEFederativa: function(val) 
  {
      let me=this;
      for (var i = 0; i < me.catalogos.estados.length; i++) {
          
          if (me.catalogos.estados[i].text === val)
          {
                  me.infoPersona.entidadFederativaNacId =  new Object();
                  me.infoPersona.entidadFederativaNacId.text =me.catalogos.estados[i].text;
                  me.infoPersona.entidadFederativaNacId.value = me.catalogos.estados[i].value;
                  me.infoPersona.entidadFederativaNacId.abrev = me.catalogos.estados[i].abrev; 
          }
      }
  },
  selectTipoDocumentoIdentificacion: function(val) 
        {
            let me=this;
            for (var i = 0; i < me.catalogos.docsidentificaciones.length; i++) {
                
                if (me.catalogos.docsidentificaciones[i].text === val)
                {
                    me.infoPersona.docidentificacion =  new Object();
                    me.infoPersona.docidentificacion.text =me.catalogos.docsidentificaciones[i].text;
                    me.infoPersona.docidentificacion.value = me.catalogos.docsidentificaciones[i].value;
               }
            }
        },
        generarcurp()
        {
            let me=this; 
            var str = me.infoPersona.fnacimiento;
            var str = me.infoPersona.fnacimiento;
            var res = str.split("/"); 
            var curpstr = curp({
            nombre: me.infoPersona.nombres,
            apellido_paterno: me.infoPersona.apaterno,
            apellido_materno: me.infoPersona.amaterno,
            sexo: me.infoPersona.sexo,
            estado: me.infoPersona.entidadFederativaNacId.abrev,
            fecha_nacimiento:res 
            }); 
            this.curp = curpstr; 
            console.log("EL curp:"+curpstr)
            me.infoPersona.curp = curpstr; 
        },
        validarEdad(){
            //debugger
            let me = this;
            var date = moment(me.infoPersona.fnacimiento, 'DD/MM/YYYY');
            me.infoPersona.edad = moment().diff(date, 'years',false);

            if (me.edad < 18){
              if (me.infoPersona.clasificacionpersona==='Victima directa'){
                     //me.dialog1 = true;
              }
            }
        },
        guardarInfoPersona()
        { 
         
            let me=this;
            
            //debugger
            // SEPARAR MEDIOS DE NOTIFIACIÖN    
            var listaMediosNotificacion='';
            if(me.infoAdicional.medionotificacion.length<=0)
            {
                listaMediosNotificacion='';
            }
            else
            {
                me.infoAdicional.medionotificacion.forEach(function(notificacion)
                {
                    listaMediosNotificacion+=notificacion.text+',';
                });
                listaMediosNotificacion = listaMediosNotificacion.slice(0, -1);
            }

            me.$validator.validate().then(result => 
                {
                    //debugger
                    if (result) 
                    {    
                        
                        if (me.infoPersona.anonimo==true)
                        {  
                            me.infoPersona.tipoPersona= 'Anonimo'
                            me.infoPersona.rfc= 'Anonimo'
                            me.infoPersona.razonsocial='Anonimo'
                            me.infoPersona.clasificacionpersona='Anonimo'
                            me.infoPersona.nombres='Anonimo'
                            me.infoPersona.apaterno='Anonimo'
                            me.infoPersona.amaterno='Anonimo'
                            me.infoPersona.alias="Anonimo"
                            me.infoPersona.fnacimiento='Anonimo' 
                            me.infoPersona.relacion.false
                            me.tipoRelacion='Anonimo'
                            me.entidadFederativaNac= 'Anonimo'  
                            me.infoPersona.docidentificacion = 'Anonimo'
                            me.infoPersona.curp='XXXX010101XXXXXXX1' 
                            me.infoPersona.sexo='Anonimo'
                            me.infoAdicional.estadocivil='Anonimo'
                            me.infoAdicional.genero='Anonimo'
                            me.infoAdicional.telefono1='Anonimo'
                            me.infoAdicional.telefono2='Anonimo'
                            me.infoAdicional.correo='Anonimo'
                            me.infoAdicional.medionotificacion='Anonimo'
                            me.infoAdicional.nacionalidad='Anonimo'
                            me.infoAdicional.ocupacion='Anonimo'
                            me.infoAdicional.nivelestudio='Anonimo'
                            me.infoAdicional.lengua='Anonimo'
                            me.infoAdicional.religion='Anonimo'
                            me.infoAdicional.bDiscapacidad= false
                            me.infoAdicional.discapacidad='Anonimo'
                            me.direccionPersona.calle='Anonimo'
                            me.direccionPersona.noExt='Anonimo'
                            me.direccionPersona.noInt='Anonimo'
                            me.direccionPersona.entreCalle1='Anonimo'
                            me.direccionPersona.entreCalle2='Anonimo'
                            me.direccionPersona.referencia='Anonimo'
                            me.direccionPersona.pais='Anonimo'
                            me.direccionPersona.estado=''
                            me.direccionPersona.municipioid='Anonimo'
                            me.direccionPersona.localidadid='Anonimo'
                            me.direccionPersona.cp= 0
                        }
                        if(!me.infoPersona.relacion)
                        {   
                            me.infoPersona.tipoRelacion='Ninguna';
                        }
                        if(!me.infoAdicional.presexuales)
                        {
                            me.infoAdicional.genero=null;
                        }
                        if (me.opciones.modo == 'editar') 
                        {
                            //Código para actualizar
                            if(me.infoPersona.edad < 18)
                            {
                                 me.datosprotegidos = true;
                            }
                            // VARS DONDE GUARDAR DATOS PRTEGIDOS
                            var nombre = ''
                            var apaterno =      ''
                            var amaterno =  ''
                            var fnacimiento =  ''
                            var rfc =  ''
                            var curp =  ''
                            var rutadocumento =  ''


                            if(me.datosprotegidos)
                            {
                                nombre = me.infoPersona.nombres;
                                apaterno = me.infoPersona.apaterno;
                                amaterno = me.infoPersona.amaterno;
                                fnacimiento = me.infoPersona.fnacimiento;
                                rfc = me.infoPersona.rfc;
                                curp = me.infoPersona.curp;
                                rutadocumento = me.infoPersona.imageUrl;

                                me.infoPersona.nombres = me.alias;
                                me.infoPersona.apaterno ="";
                                me.infoPersona.amaterno = "";
                                me.infoPersona.fnacimiento = "";
                                me.infoPersona.rfc = "";
                                me.infoPersona.curp = "";
                                me.infoPersona.imageUrl ="";
                            }
                            
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            console.log("guardando informacion 20");
                            console.log("Estado seleccionado")
                            console.log(me.direccionPersona.estadoid);
                            //debugger;
                            me.$cat.post('api/Personas/Actualizar/',{  
                                'rapId': me.infoPersona.rapid,
                                'clasificacionPersona': me.infoPersona.clasificacionPersona,
                                'pInicio': false,//ESTA VARIABLE NO SE UTILIZA, pero este status tal vez deba poderse utilizar
                                //***************************** PERSONA
                                'personaId': me.infoPersona.idPersona, 
                                'statusAnonimo': me.infoPersona.anonimo,
                                'tipoPersona': me.infoPersona.tipoPersona,
                                'rfc': me.infoPersona.rfc,
                                'edad':me.infoPersona.edad,//
                                'datosProtegidos':me.infoPersona.datosProtegidos,//
                                'razonsocial': me.infoPersona.razonSocial,  //
                                'nombre': me.infoPersona.nombres,//
                                'apellidoPaterno' : me.infoPersona.apaterno,//
                                'apellidoMaterno' : me.infoPersona.amaterno,//
                                'alias': me.infoPersona.alias,//
                                'statusAlias': me.infoPersona.statusAlias,//
                                'fechaNacimiento' : me.infoPersona.fnacimiento,//
                                'entidadFederativa': me.infoPersona.entidadFederativaNacId.text,//
                                'docIdentificacion': me.infoPersona.docidentificacion.text,//
                                'curp': me.infoPersona.curp,//
                                'sexo' : me.infoPersona.sexo,//
                                
                                'estadoCivil': me.infoAdicional.estadocivil,//
                                
                                //DATOS NUEVOS
                                'registro': me.infoAdicional.registro,//
                                'verR': me.infoAdicional.verR,//
                                'verI': me.infoAdicional.verI,//
                                'genero': me.infoAdicional.genero,//
                                'discapacidad': me.infoAdicional.bDiscapacidad,//
                                'tipoDiscapacidad': me.infoAdicional.discapacidad.text,  //
                                'relacion':me.infoPersona.relacion,//
                                'parentesco':me.infoPersona.tipoRelacion,//
                                'telefono1': me.infoAdicional.telefono1,//
                                'telefono2': me.infoAdicional.telefono2,//
                                'correo': me.infoAdicional.correo,//
                                'medioNotificacion': listaMediosNotificacion,//
                                'nacionalidad': me.infoAdicional.nacionalidad,//
                                'ocupacion': me.infoAdicional.ocupacion,//
                                'nivelEstudio': me.infoAdicional.nivelestudio,//
                                'lengua': me.infoAdicional.lengua,//
                                'religion': me.infoAdicional.religion,//
                               
                            
                                //***************************** DIRECCION 
                                
                                'calle': me.direccionPersona.calle,//
                                'noExt': me.direccionPersona.noExt,//
                                'noInt': me.direccionPersona.noInt,//
                                'entreCalle1': me.direccionPersona.entreCalle1,//
                                'entreCalle2': me.direccionPersona.entreCalle2,//
                                'referencia': me.direccionPersona.referencia,//
                                'pais': me.direccionPersona.pais,//
                                'estado': me.direccionPersona.estadoid,//
                                'municipio': me.direccionPersona.municipioid,//
                                'localidad': me.direccionPersona.localidadid,//
                                'cp': me.direccionPersona.cp,//
                                'lat': me.direccionPersona.lat,//
                                'lng':me.direccionPersona.lng,//
                               
                                //************************************ 
                            },configuracion).then(function(response)
                            { 
                                me.$emit('personaGuardada',{resultado:'OK'});
                                
                        }).catch(err => { 
                            console.log("error actualizacion 2:");
                            console.log(err);
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            }
                             else if (err.response.status==401){
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
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });
                            
                        } // FIN DE MODO EDITAR
                        if (me.opciones.modo == 'insertar') 
                        {

                        }
                    }
                    else{
                        console.log("error en validacion")
                    }  // FIN DE IF RESULT
                }).catch(err=>{
                    console.log("error de validación");
                    console.log(err);
                })//  FIN DE VALIDATOR
        },
        validadduplicidad()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$justiciarestaurativa.get('api/Personas/BuscarPersonaNombreApellidoPa/' + me.nombres + '/' + me.apaterno ,configuracion).then(function(response){
                console.log(response.data)
                me.idPersona = response.data.personaId;
                me.medionotificacion= response.data.medionotificacion;
                me.telefono1 = response.data.telefono1;
                me.telefono2= response.data.telefono2;
                me.correo = response.data.correo;
                me.nacionalidad= response.data.nacionalidad;
                me.estadocivil = response.data.estadoCivil;
                me.genero= response.data.genero;
                me.ocupacion= response.data.ocupacion;
                me.nivelestudio= response.data.nivelEstudio;
                me.lengua= response.data.lengua;
                me.religion= response.data.religion;
                me.infoAdicional.bDiscapacidad= response.data.discapacidad;
                me.discapacidad= response.data.tipoDiscapacidad;

                me.listarDireccionPersonal();
                me.listarRAtencioPersona();
                me.modalduplicidad=true;

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
                //LLENAR CATALOGOS
        listarTipoPersona()
                {
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    var clasificacionpersonaArray=[];
                    this.$conf.get('api/ClasificacionPersonas/Listar',configuracion).then(function(response){
                        
                        clasificacionpersonaArray=response.data;
                        clasificacionpersonaArray.map(function(x){
                            me.catalogos.clasificacionpersonas.push({text: x.nombre,value: x.nombre});
                        });
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
        listarSexo()
                {
                  
                  let me=this;
                  let header={"Authorization" : "Bearer " + this.$store.state.token};
                  let configuracion= {headers : header};
                  var sexoArray=[];
                  this.$conf.get('api/Sexoes/Listar',configuracion).then(function(response){
                      //console.log(response.data);
                      sexoArray=response.data;
                      sexoArray.map(function(x){
                          me.catalogos.sexos.push({text: x.nombre,value: x.clave});
                      });
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
      listarIdentificacion()
        {
            
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var docIdentificaionArray=[];
            this.$conf.get('api/DocIdentificacions/Listar',configuracion).then(function(response){
                //console.log(response.data);
                docIdentificaionArray=response.data;
                docIdentificaionArray.map(function(x)
                {
                    me.catalogos.docsidentificaciones.push({text: x.nombre,value: x.nombre});
                });
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
        listarMedionotificacion()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var medionotificacionArray=[]; 
            this.$conf.get('api/MedioNotificacions/Listar',configuracion).then(function(response){
                //console.log(response);
                medionotificacionArray=response.data;
                medionotificacionArray.map(function(x){
                    me.catalogos.medionotificaciones.push({text: x.nombre,value: x.nombre});
                });
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
        listarNacionalidad()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nacionalidadArray=[]; 
            this.$conf.get('api/Nacionalidads/Listar',configuracion).then(function(response){
                //console.log(response);
                nacionalidadArray=response.data;
                nacionalidadArray.map(function(x){
                    me.catalogos.nacionalidades.push({text: x.nombre,value: x.nombre});
                });
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
        listarEstadoCivil()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var estadocivilArray=[]; 
            this.$conf.get('api/EstadoCivils/Listar',configuracion).then(function(response){
                //console.log(response);
                estadocivilArray=response.data;
                estadocivilArray.map(function(x){
                    me.catalogos.estadosciviles.push({text: x.nombre,value: x.nombre});
                });
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
        listarGenero()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var generoArray=[]; 
            this.$conf.get('api/Generoes/Listar',configuracion).then(function(response){
                //console.log(response);
                generoArray=response.data;
                generoArray.map(function(x){
                    me.catalogos.generos.push({text: x.nombre,value: x.nombre});
                });
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
        listarOcupacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ocupacionArray=[]; 
            this.$conf.get('api/Ocupacions/Listar',configuracion).then(function(response){
                //console.log(response);
                ocupacionArray=response.data;
                ocupacionArray.map(function(x){
                    me.catalogos.ocupaciones.push({text: x.nombre,value: x.nombre});
                });
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
        listarNivelEstudio(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nivelestudioArray=[]; 
            this.$conf.get('api/NivelEstudios/Listar',configuracion).then(function(response){
                //console.log(response);
                nivelestudioArray=response.data;
                nivelestudioArray.map(function(x){
                    me.catalogos.nivelestudios.push({text: x.nombre,value: x.nombre});
                });
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
        listarLengua(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var lenguaArray=[]; 
            this.$conf.get('api/Lenguas/Listar',configuracion).then(function(response){
                //console.log(response);
                lenguaArray=response.data;
                lenguaArray.map(function(x){
                    me.catalogos.lenguas.push({text: x.nombre,value: x.nombre});
                });
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
        listarReligion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var religionArray=[]; 
            this.$conf.get('api/Religions/Listar',configuracion).then(function(response){
                //console.log(response);
                religionArray=response.data;
                religionArray.map(function(x){
                    me.catalogos.religiones.push({text: x.nombre,value: x.nombre});
                });
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
        listarDiscapacidad()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var discapacidadArray=[]; 
            this.$conf.get('api/Discapacidads/Listar',configuracion).then(function(response){
                //console.log(response);
                discapacidadArray=response.data;
                discapacidadArray.map(function(x){
                    me.catalogos.discapacidades.push({text: x.nombre,value: x.nombre});
                });
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
        listarEstados()
        {
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var ciudadesArray=[];
            this.$conf.get('api/Estadoes/Listar',configuracion).then(function(response){ 
                ciudadesArray=response.data; 
                ciudadesArray.map(function(x)
                {
                    me.catalogos.estados.push({text: x.nombre,value:x.idEstado,abrev:x.abreviacion});  
                });
 
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
        listarPorEstado(seleccionar)
        {
            
            
            let me=this;  
            console.log("seleccionar por estado(9):"+seleccionar);
            console.log(me.direccionPersona.estadoid);
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            var municipiosArray=[];
            //BUSCAR EL ID DEL ESTADO SELECCIONADO EN EL ARRAY DEL CATALOGO DE ESTADOS    
            const estadoSeleccionado = me.catalogos.estados.find( estadoActual=> estadoActual.text==me.direccionPersona.estadoid)
            me.catalogos.municipios.length = 0;

            me.$conf.get('api/Municipios/ListarPorEstado/'+ estadoSeleccionado.value,configuracion).then(function(response)
            {
            
                municipiosArray=response.data;
                municipiosArray.map(function(x)
                {
                    me.catalogos.municipios.push({text: x.nombre,value: x.idMunicipio});
                });               
               //debugger;
               if(seleccionar && me.direccionPersona.municipioid!='' && me.direccionPersona.municipioid!=null)
                   me.listarPorMunicipio(seleccionar);

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
        listarPorMunicipio(seleccionar)
        {
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            console.log('municipio');
            console.log(me.direccionPersona.municipioid);

            //BUSCAR EL ID DEL MUNICIPIO SELECCIONADO EN EL ARRAY DEL CATALOGO DE MUNICIPIOS    
            const municipioSeleccionado = me.catalogos.municipios.find( municipioActual=> municipioActual.text==me.direccionPersona.municipioid)
           
            var localidadArray=[];
            me.catalogos.localidades.length = 0;
            this.$conf.get('api/Localidads/MostrarPorMPO/' + municipioSeleccionado.value,configuracion).then(function(response){
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.catalogos.localidades.push({text: x.nombre,value: x.idLocalidad});     
                });
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
        listarPorLocalidad(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            const localidadSeleccionada = me.catalogos.localidades.find( localidadActual=> localidadActual.text==me.direccionPersona.localidadid)
           
            this.$conf.get('api/Localidads/MostrarPorLocalidad/' + localidadSeleccionada.value,configuracion).then(function(response){
                  me.direccionPersona.cp=response.data.cp;    
                
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
        buscarPorCP()
        {
            /*
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
                  //console.log(response)
                  me.estadoid=response.data.idEstado;    
                  me.listarPorEstado(true);
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
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
            });*/
        },
        mostrarModalGeo() 
        {
            let me=this;
            console.log("mandar mostrar modal de geolocalizacion");
            //console.log(me.$emit)
            me.$emit('mostrarModalGeo',me.direccionPersona);
        },
        setGeoLocal(localizacion)
        {
            let me=this;
            console.log("recibiendo geo informacion");
            console.log(localizacion);
            me.direccionPersona.lat=localizacion.lat;
            me.direccionPersona.lng=localizacion.lng;
        },
        buscarPorCpMpo()
        { 
            /*
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var localidadArray=[];
            me.catalogos.localidades.length = 0;
             this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.municipioid +',' + this.cp,configuracion).then(function(response){ 
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.catalogos.localidades.push({text: x.nombre,value: x.idLocalidad}); 
                });
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
            });*/
        },
  }//CERRAR MÉTODOS
}