
    import axios from 'axios'  
    import VeeValidate from 'vee-validate' 
    import { WebCam } from "vue-web-cam";
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas' 
    import { REPL_MODE_SLOPPY } from 'repl';
    import moment from 'moment'
    import 'moment/locale/es';
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
    import pdf from 'vue-pdf'
    import Multiselect from 'vue-multiselect'
    import alertify from 'alertifyjs';

    var assert, curp, persona;
    assert = require('assert');
    curp = require('curp.js'); 

    export default {
        components: {
            "vue-web-cam": WebCam,
            n401,
            n403,
            pdf
        },
        data: () => ({
            currentPage: 0,
            nombreCompleto: '',
            iniciales: '',
            pageCount: 0,
            clikeado: false,
            modalduplicidad: false, 
            idPersona: 0,
            hechos: [],
            headers: [ 
                { text: 'Nombre', value: 'personaRelacionada' },
                { text: 'Atendio', value: 'genero' }, 
                { text: 'Agencia Actual', value: 'moduloactual' }, 
                { text: 'Fecha Eleva Nuc', value: 'fechaCarpeta',  },  
                { text: 'Clasificación persona', value: 'clasificacionPersona',  }, 
                { text: 'RAC', value: 'racg',  },    
                { text: 'NUC', value: 'nucg',  }, 
            ],
            search: '',
            terms: true,
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 20
            },
            dialog: false, 
            dialog1: false, 
            verTP: 0,
            verR: '',
            verI: '',
            ticketModal: 0,
            WebCam: {},
            center: { lat: 45.508, lng: -73.587 },
            markers: [],
            places: [],
            currentPlace: null, 
            lat: '',
            lng: '',
            step:1, 
            //********************************/
            //CAPTURA DE DATOS
            radios: 'Fisica',
            rfc:'',
            razonsocial:'',
            clasificacionpersona:'',
            clasificacionpersonas:[], 
            docidentificacion:'',
            docsidentificaciones:[], 
            sexo:'',
            sexos:[],
            //------------------------
            rangoedad:'',
            rangosedad:[],
            RangoEdadTF:false,
            //---------------------------
            abreviacion:'',
            estados:[],
            //img: null,
            camera: null,
            deviceId: null,
            devices: [],

            imageName: '',
            imageUrl: null,
            imageFile: '',
            //DATOS PARA LA GENERACION DEL CURP
            nombres:'',
            apaterno:'',
            amaterno:'',
            alias:'',
            fnacimiento:'', 
            edad:'',
            curp:'',
            //INFORMACION COMPLEMENTARIA
            medionotificacion:'',
            medionotificaciones:[],

            telefono1:'',
            telefono2:'',
            correo:'', 
            nacionalidad:'Mexicana',
            nacionalidades:[],
            estadocivil:'',
            estadosciviles:[],
            genero:'',
            generos:[],
            pdesaparecida: '',
            ocupacion:'',
            ocupaciones:[],
            nivelestudio:'',
            nivelestudios:[],
            lengua:'',
            lenguas:[],
            religion:'',
            religiones:[], 
            switch1: false,
            switch2: false,
            registro: [],
            discapacidad:'',
            discapaciodades:[],
            numerooficio:'',
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
            relacionado:'',
            relacion:false,
            poblacionafro:false,
            edadf:'',
            presexuales:false,
            // DIRECCION PERSONAL
            noExt:'',
            noInt:'',
            entreCalle1:'',
            entreCalle2:'',
            referencia:'',
            pais:'Mexico',
            cp:'', 
            message: 'no message',
            first_request: 'no request',
            second_request: 'no request',
            modalGeolocalizacion:0,
            rac:'',
            racid:'',
            datosprotegidos:false,
            ruta:'',
            documentoacreditas:[
                {text:"Nombramiento",value:"Nombramiento"},
                {text:"Poder notarial",value:"Poder notarial"},
                {text:"Instrumento notarial",value:"Instrumento notarial"}
            ],
            documentoacredita:'',
            estado:'',
            estadoid:0,
            ciudades:[],
            calle:'',
            municipio:'',
            municipioid:0,
            municipios:[], 
            localidad:'',
            localidadid:0,
            localidades:[],
            lataux:'',
            lngaux:'',
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
            video: {},
            GUID:'',
            showpage:true,
            e401:false,
            e403:false,
            statusActualizar:false,
            requeridoPD: '',
            tDesaparecidos: [
                {text:"Si",value:true},
                {text:"No",value:false},
                ],
            value: ''
        }),
        mounted() {
            this.geolocate();
        },
    created () {
        this.u_iddistrito=this.$store.state.usuario.iddistrito;
        this.u_distrito=this.$store.state.usuario.distrito;
        this.u_dirSubPro=this.$store.state.usuario.dirSubProc;
        this.u_idagencia=this.$store.state.usuario.idagencia;
        this.u_agencia=this.$store.state.usuario.agencia;
        this.u_idmoduloservicio=this.$store.state.usuario.idmoduloservicio;
        this.u_modulo=this.$store.state.usuario.modulo;
        this.u_idusuario=this.$store.state.usuario.idusuario;
        this.u_nombre=this.$store.state.usuario.usuario;
        this.u_clave=this.$store.state.usuario.clave;
        this.u_rol=this.$store.state.usuario.rol;
        this.u_puesto=this.$store.state.usuario.puesto;
        this.u_email=this.$store.state.usuario.email;
        // DATOS GENERALES
        this.listarTipoPersona();
        this.listarSexo();
        this.listarIdentificacion();
        this.listarEstados();
        this.listarRangoEdad();
        // INFORMACION COMPLEMENTARIA
        this.listarMedionotificacion();
        this.listarNacionalidad();
        this.listarEstadoCivil();
        this.listarGenero();
        this.listarOcupacion();
        this.listarNivelEstudio();
        this.listarLengua();
        this.listarReligion();
        this.listarDiscapacidad();
        // DIRECCION PERSONAL
         
        this.listarCiudades();
       
         // Add a request interceptor
        axios.interceptors.request.use( (config)=> {
          // Do something before request is sent
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

          // Add a response interceptor
          axios.interceptors.response.use((response)=>{
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (err)=> {
        
     // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

    },

    computed: {
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
            },
        isInput3RequiredD() {
                return ((this.nombres !== this.alias && this.datosprotegidos !== false) || (this.datosprotegidos !== false && this.apaterno !== '' ) ||
                    (this.rangoedad === 'INFANCIA (0 A 5 AÑOS)' && this.datosprotegidos === false) || (this.rangoedad === 'NIÑEZ (6 A 12 AÑOS)' && this.datosprotegidos === false) ||
                    (this.rangoedad === 'ADOLECENCIA (13 A 17 AÑOS)' && this.datosprotegidos === false))
        }

        },
         
    watch: {
        camera: function(id) {
            this.deviceId = id;
        },
        nombres: function(val) {
            this.obtenerIniciales();
            },
        apaterno: function(val) {
            this.obtenerIniciales();
            },
        amaterno: function(val) {
            this.obtenerIniciales();
            },
        datosprotegidos:  function(val) {
            if(val && this.alias === ''){
                this.obtenerIniciales();
            }
            },
        devices: function() {
        // Once we have a list select the first one
            const [first, ...tail] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        },
        clasificacionpersona(val){
            if(val === 'Victima directa' && this.radios === 'Fisica'){
                this.requeridoPD = 'required';
                
            }else if(val !== 'Victima directa'){
                this.requeridoPD = '';
                this.registro = false;
                this.verI = false;
                this.verR = false;

            }
        },
        registro(valor){
            if(valor === true){
                this.verI = true;
                this.verR = true;
            } 
            else if(valor ===  false){
                this.verI = false;
                this.verR = false;
            }
        },
        RangoEdadTF(val){
            if(!val){
                this.fnacimiento = '';
                this.$nextTick(() => {
                    this.rangoedad = ''; // Se limpia después de que Vue actualice la interfaz
                  });
            }
        },
        relacion(val){
            if(!val){
                this.relacionado = '';
            }
        },
        switch1(val){
            if(val){
                this.discapacidad = '';
            }
        },
        switch2(val){
            if(!val){
                this.radios = 'Fisica'
                this.limpiar();
            }
        },
        presexuales(val){
            if(!val){
                this.genero = '';
            }
        }
        
    },
    methods:{
        doSomething: function() {
            if(this.clikeado) {
                return;
            }
            this.clikeado = true;
        },
        obtenerIniciales() {
            const inicialesNombre = this.nombres.charAt(0).toUpperCase();
            const inicialesApellidop = this.apaterno.charAt(0).toUpperCase();
            const inicialesApellidom = this.amaterno.charAt(0).toUpperCase();
            if(this.datosprotegidos){
                this.alias = inicialesNombre +"."+ inicialesApellidop+"."+inicialesApellidom;
            }
            
          },
        setPlace(place) {
            this.markers= [],
            this.places= [],
            this.currentPlace = place;
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(), 

                };
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }
        },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude, 
            
                };
            });
        },
        guardarGeolocalizacion(){
            this.lat = this.center.lat;
            this.lng = this.center.lng;
            this.modalGeolocalizacion=0;
      
        },
        mostrarTP(){
            this.verTP = 1;
        },
        ocultarTP (){
            this.verTP = 0;
        },
        limpiar(){    
            //-----------------------------------
            this.statusActualizar=false;
            this.lngaux = '';
            this.lataux = '';
            //---------------------------------
            this.statusActualiza=false;
            this.idPersona=0;
            //************************************************************* */
            //step no 1
            this.radios= this.radios;
            this.verTP=0;
            this.rfc="";
            this.razonsocial="";
            this.clasificacionpersona="";
            this.nombres="";
            this.apaterno="";
            this.amaterno="";
            this.alias="";
            this.fnacimiento="";
            this.registro = [];
            //---------------------------
            this.$nextTick(() => {
                this.rangoedad = '';
              });
            this.RangoEdadTF = false;
            //------------------------
            this.sexo="";
            this.abreviacion="";
            this.docidentificacion="";
            this.curp="";
            this.imageName="";
            this.imageFile ="";
            this.imageUrl ="";
            this.relacion = false
            this.poblacionafro = false;
            this.relacionado = ""
            this.edadf = ""
            this.documentoacredita = ""
            //************************************************************* */
            //step no2
            this.medionotificacion="";
            this.telefono1="";
            this.telefono2="";
            this.correo="";
            this.nacionalidad="Mexicana";
            this.estadocivil="";
            this.genero="";
            this.verR=false;
            this.verI=false;
            this.nivelestudio="";
            this.ocupacion="";
            this.ocupacion2='';
            this.lengua="";
            this.religion="";
            this.switch1= false,
            this.tipoDiscapacidad="";
            this.ruta='';
            this.presexuales = false;
            this.discapacidad = '';
            //************************************************************* */
            //step no3
            this.calle="";
            this.noInt="";
            this.noExt="";
            this.entreCalle1="";
            this.entreCalle2="";
            this.referencia="";
            this.pais="Mexico";
            this.estadoid="";
            this.municipioid="";
            this.localidadid=""; 
            this.cp=""; 
            this.$validator.reset();
            this.step=1;
            this.datosprotegidos = false;
            this.markers= [];
            this.places= [];
            this.lat = '';
            this.lng = '';
            //------------------------------------------------------------------
            
        },
        // STEP 1 CAPTURA DE DATOS
        validarEdad(){
           
            let me = this;
            var date = moment(me.fnacimiento, 'DD/MM/YYYY');
            me.edad = moment().diff(date, 'years',false);

            if (me.edad < 18){
              if (me.clasificacionpersona==='Victima directa'){
                     me.dialog1 = true;
              }
            }
        },
        generaredad(){
            var date = moment(this.fnacimiento, 'DD/MM/YYYY');
            return moment().diff(date, 'years',false);
        },
        enviarAEPA(){
            let me = this;
            me.dialog1 = false; 

        },
        listarTipoPersona(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var clasificacionpersonaArray=[];
            this.$conf.get('api/ClasificacionPersonas/Listar',configuracion).then(function(response){
                clasificacionpersonaArray=response.data;
                clasificacionpersonaArray.map(function(x){
                    me.clasificacionpersonas.push({text: x.nombre,value: x.nombre});
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
        listarSexo(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var sexoArray=[];
            this.$conf.get('api/Sexoes/Listar',configuracion).then(function(response){
                sexoArray=response.data;
                sexoArray.map(function(x){
                    me.sexos.push({text: x.nombre,value: x.clave});
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
        listarRangoEdad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var edadesArray=[];
            this.$conf.get('api/Rangoedad/Listar',configuracion).then(function(response){
                edadesArray=response.data;
                edadesArray.map(function(x){
                    me.rangosedad.push({text: x.rango,value: x.rango,value2: x.ordenEdad});
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

        listarEstados(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var estadosArray=[]; 
            this.$conf.get('api/Estadoes/Listar',configuracion).then(function(response){
                estadosArray=response.data;
                estadosArray.map(function(x){
                    me.estados.push({text: x.nombre, value: x.abreviacion});
                    
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
        listarIdentificacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var docIdentificaionArray=[];
            this.$conf.get('api/DocIdentificacions/Listar',configuracion).then(function(response){
                docIdentificaionArray=response.data;
                docIdentificaionArray.map(function(x){
                    me.docsidentificaciones.push({text: x.nombre,value: x.nombre});
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
        generarcurp(){
            let me=this;
            var str = me.fnacimiento;
            var res = str.split("/"); 
            var curpstr = curp({
                nombre: me.nombres,
                apellido_paterno: me.apaterno,
                apellido_materno: me.amaterno,
                sexo: me.sexo,
                estado: me.abreviacion.value, 
                fecha_nacimiento: res
            }); 
            
            this.curp = curpstr; 
            
            
            

        },  
        validadduplicidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$cat.post('api/Personas/BuscarPersonaNombreApellidoPa/',
            {
                materno:me.amaterno,
                nombre:me.nombres,
                alias:me.alias,
                paterno:me.apaterno,
                curp:me.curp
                
            }
            
            ,configuracion).then(function(response){ 
                me.hechos=response.data;
                me.modalduplicidad=true;

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
        cerrarModalDuplicidad(){
            
            this.hechos=[];
            this.modalduplicidad= false;
        },
        onCapture() {
        this.imageUrl = this.$refs.webcam.capture();  
        var blob =  this.dataURItoBlob(this.imageUrl, 'image/jpg'); 
        var file = new File([blob], 'Documento.jpg', {type: 'image/jpg', lastModified: Date.now()});
        this.imageFile = file
        this.imageName = this.imageFile.name; 
        },
        dataURItoBlob(dataURI, type) {
            // convertir base64 to raw binary data held in a string
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: type });
            return bb;
        },
        onStarted(stream) {
        },
        onStopped(stream) {
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {
        },
        onCameras(cameras) {
            this.devices = cameras;
        },
        onClose () {
            this.dialog = false; 
        },    
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
        }, 
        // STEP 2 INFORMACION COMPLEMENTARIA
        listarMedionotificacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var medionotificacionArray=[]; 
            this.$conf.get('api/MedioNotificacions/Listar',configuracion).then(function(response){
                medionotificacionArray=response.data;
                medionotificacionArray.map(function(x){
                    me.medionotificaciones.push({text: x.nombre,value: x.nombre});
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
        listarNacionalidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nacionalidadArray=[]; 
            this.$conf.get('api/Nacionalidads/Listar',configuracion).then(function(response){
                nacionalidadArray=response.data;
                nacionalidadArray.map(function(x){
                    me.nacionalidades.push({text: x.nombre,value: x.nombre});
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
        listarEstadoCivil(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var estadocivilArray=[]; 
            this.$conf.get('api/EstadoCivils/Listar',configuracion).then(function(response){
                estadocivilArray=response.data;
                estadocivilArray.map(function(x){
                    me.estadosciviles.push({text: x.nombre,value: x.nombre});
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
        listarGenero(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var generoArray=[]; 
            this.$conf.get('api/Generoes/Listar',configuracion).then(function(response){
                generoArray=response.data;
                generoArray.map(function(x){
                    me.generos.push({text: x.nombre,value: x.nombre});
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
        listarOcupacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ocupacionArray=[]; 
            this.$conf.get('api/Ocupacions/Listar',configuracion).then(function(response){
                ocupacionArray=response.data;
                ocupacionArray.map(function(x){
                    me.ocupaciones.push({text: x.nombre,value: x.nombre});
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
        listarNivelEstudio(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nivelestudioArray=[]; 
            this.$conf.get('api/NivelEstudios/Listar',configuracion).then(function(response){
                nivelestudioArray=response.data;
                nivelestudioArray.map(function(x){
                    me.nivelestudios.push({text: x.nombre,value: x.nombre});
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
        listarLengua(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var lenguaArray=[]; 
            this.$conf.get('api/Lenguas/Listar',configuracion).then(function(response){
                lenguaArray=response.data;
                lenguaArray.map(function(x){
                    me.lenguas.push({text: x.nombre,value: x.nombre});
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
        listarReligion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var religionArray=[]; 
            this.$conf.get('api/Religions/Listar',configuracion).then(function(response){
                religionArray=response.data;
                religionArray.map(function(x){
                    me.religiones.push({text: x.nombre,value: x.nombre});
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
        listarDiscapacidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var discapacidadArray=[]; 
            this.$conf.get('api/Discapacidads/Listar',configuracion).then(function(response){
                discapacidadArray=response.data;
                discapacidadArray.map(function(x){
                    me.discapaciodades.push({text: x.nombre,value: x.nombre});
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
        // STEP 3 DIRECCION PERSONAL
        
        listarCiudades(){
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                var ciudadesArray=[];
                this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){ 
                    ciudadesArray=response.data; 
                    ciudadesArray.map(function(x){
                        me.ciudades.push({text: x.nombre, value:x.idEstado}); 
                        
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
        
        listarCiudades(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ciudadesArray=[];
            this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){ 
                ciudadesArray=response.data; 
                ciudadesArray.map(function(x){
                    me.ciudades.push({text: x.nombre, value:x.idEstado});  
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
        listarPorEstado() {
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.estadoid.value== 0){
                me.estado = me.estadoid.text;
                me.estadoid = me.estadoid.value;
            }
                var municipiosArray=[];
                me.municipios.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.estadoid,configuracion).then(function(response){
                
                    municipiosArray=response.data;
                
                    municipiosArray.map(function(x){
                    me.municipios.push({text: x.nombre,value: x.idMunicipio});  
                    }); 
                   if (me.idPersona > 0){
                     me.selectMunicipio(me.municipio);
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
               
                
        },
        listarPorMunicipio(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.municipioid.value== 0){
                me.municipio = me.municipioid.text;
                me.municipioid = me.municipioid.value;
            }

            var localidadArray=[];
            me.localidades.length = 0;
            this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioid,configuracion).then(function(response){
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.localidades.push({text: x.nombre,value: x.idLocalidad});     
                });
                 if (me.idPersona > 0){
                      me.selectLocalidad(me.localidad);
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
      
          
        }, 
        listarPorLocalidad(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.localidad = me.localidadid.text;
            me.localidadid = me.localidadid.value;
            this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.localidadid,configuracion).then(function(response){
                  me.cp=response.data.cp;    
                
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
        buscarPorCP(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
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
        


        //--------------------------------------------------------------------
        btn_geoloc2(){
            
            if(this.estado !='' && this.municipio != '' && this.localidad != '' && this.calle != ''){
                if(this.lat == '' && this.lng == ''){
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                    this.lugar = this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado
                    this.listener();
                    this.addMarkergeocoder();
                }else{
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                }    
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')

                   
        }, 
        listener(){
            //input.focus();
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado}, function(results, status) {
                if (status == 'OK') {
                    me.center.lat =+ results[0].geometry.location.lat()
                    me.center.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        addMarkergeocoder() {
                    const marker = {
                        lat: this.center.lat,
                        lng: this.center.lng, 
                    };
                    this.markers =[]
                    this.places = []
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;                 
        },
        updateCoordinates(location) {
            this.lataux = location.latLng.lat()
            this.lngaux = location.latLng.lng()
        },
        updatecenter(){
            this.center.lat = this.lataux;
            this.center.lng = this.lngaux;
        },
        btn_geoloc1(){
            this.geoloc=1;
            this.modalGeolocalizacion = 1;
        },
        
        setPlace(place) {
                this.markers= [],
                this.places= [],
                this.currentPlace = place;
        },
        addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng(), 

                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                    }
        },     
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude, 
            
                };
            });
        },
        guardarGeolocalizacion(){
            if(this.geoloc==2){
                if(this.lataux != '' && this.lngaux != ''){
                    this.lat = this.lataux
                    this.lng = this.lngaux
                }else{
                    this.lat = this.markers[0].position.lat
                    this.lng = this.markers[0].position.lng
                }
                
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }
        },
        guardar(){
             //****************************************************************************** */
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
/*---------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------*/
            me.registro = me.registro.length !== 0? me.registro: false;
            var listaMediosNotificacion='';
            if(me.medionotificacion.length<=0)
            {
                listaMediosNotificacion='';
            }
            else
            {
                me.medionotificacion.forEach(function(notificacion)
                {
                    listaMediosNotificacion+=notificacion.text+',';                                     
                });
                listaMediosNotificacion = listaMediosNotificacion.slice(0, -1);
            }    
 
/*---------------------------------------------------------------------------------------------------------*/
            var listaDiscapacidades='';
            if(me.discapacidad.length<=0)
            {
                listaDiscapacidades='';
            }
            else
            {
                me.discapacidad.forEach(function(notificacion)
                {
                    listaDiscapacidades+=notificacion.text+';';                                     
                });
                listaDiscapacidades = listaDiscapacidades.slice(0, -1);
            }   
/*---------------------------------------------------------------------------------------------------------*/


            if(me.amaterno == '') me.amaterno = 'LO DESCONOCE'
            if(me.sexo == '') me.sexo = 'LO DESCONOCE'
            if(me.curp == '') me.curp = 'LO DESCONOCE'
            if(me.alias == '') me.alias = 'LO DESCONOCE'
            if(me.abreviacion == '') me.abreviacion = 'LO DESCONOCE'
            if(me.docidentificacion == '') me.docidentificacion = 'LO DESCONOCE'

//-------------------------------------------------

            this.$validator.validate().then(result => {
                if (result) {
                    //ARREGLA LA FECHA PARA QUE SE GUARDEN CON /
                    const fechaParts = me.fnacimiento.split('-');
                    const dia = fechaParts[2];
                    const mes = fechaParts[1];
                    const anio = fechaParts[0];
                    me.fnacimiento = `${dia}/${mes}/${anio}`;
                    //direccionvacia.includes('null') == true

                    //SI LA FECHA TIENE UN VALOR INDEFINIDO POR CUARLQUIER ERROR, SE AGREGA 99
                    if(me.fnacimiento.includes('undefined') == true){
                        me.edadf = 99;
                        me.fnacimiento = '';
                    }                           
                    else  
                    me.edadf = me.generaredad();


                    //ESTE IF VALORA SI EL RANGO DE EDAD CORRESPONDE AL DE UN MENOR DE EDAD SE PROTEGEN LOS DATOS
                    if(me.edadf < 18 || me.rangoedad == 'INFANCIA (0 A 5 AÑOS)' || me.rangoedad == 'NIÑEZ (6 A 12 AÑOS)'|| me.rangoedad == 'ADOLECENCIA (13 A 17 AÑOS)')
                    {
                        me.datosprotegidos = true;
                    }

                    //CUANDO SE INTRODUCE LA FECHA DE NACIMIENTO HACE EL CALCULO DE EDAD PARA COLOCAR SU RANGO DE EDAD
                    if(me.edadf >= 0 && me.edadf <=5 )
                    me.rangoedad = 'INFANCIA (0 A 5 AÑOS)'

                    if(me.edadf >= 6 && me.edadf <=12)
                        me.rangoedad = 'NIÑEZ (6 A 12 AÑOS)'
                    
                    if(me.edadf >= 13 && me.edadf <=17)
                        me.rangoedad = 'ADOLECENCIA (13 A 17 AÑOS)'
                    
                    if(me.edadf >= 18 && me.edadf <=24)
                        me.rangoedad = 'JUVENTUD (18 A 24 AÑOS)'

                    if(me.edadf >= 25 && me.edadf <=45)
                        me.rangoedad = 'ADULTEZ JOVEN (25 A 45 AÑOS)'

                    if(me.edadf >= 46 && me.edadf <=59)
                        me.rangoedad = 'ADULTEZ MADURA (46 A 59 AÑOS)'

                    if(me.edadf >= 60 && me.edadf <=98)
                        me.rangoedad = 'ADULTOS MAYORES (MAS DE 60 AÑOS)'

                    if(me.edadf >= 100)
                        me.rangoedad = 'ADULTOS MAYORES (MAS DE 60 AÑOS)'
    
                    var idPoliciaDetuvo='';

                    idPoliciaDetuvo = '00000000-0000-0000-0000-000000000000';

                    if (me.switch2==true){  
                        me.radios= 'Anonimo'
                        me.rfc= 'Anonimo'
                        me.razonsocial='Anonimo'
                        me.clasificacionpersona='Anonimo'
                        me.nombres='Anonimo'
                        me.apaterno='Anonimo'
                        me.amaterno='Anonimo'
                        me.alias="Anonimo"
                        me.fnacimiento='01/01/0001' 
                        me.abreviacion= 'Anonimo' 
                        me.docidentificacion = ''
                        me.curp='XXXX010101XXXXXXX1'
                        me.sexo='Anonimo'
                        me.estadocivil='Anonimo'
                        me.genero='Anonimo'
                        me.registro = 0
                        me.verR = 0
                        me.verI = 0
                        me.telefono1='Anonimo'
                        me.telefono2='Anonimo'
                        me.correo='Anonimo'
                        me.medionotificacion='Anonimo'
                        me.nacionalidad='Anonimo'
                        me.ocupacion='Anonimo'
                        me.nivelestudio='Anonimo'
                        me.lengua='Anonimo'
                        me.religion='Anonimo'
                        me.switch1= false
                        me.discapacidad='Anonimo'
                        me.calle='Anonimo'
                        me.noExt='Anonimo'
                        me.noInt='Anonimo'
                        me.entreCalle1='Anonimo'
                        me.entreCalle2='Anonimo'
                        me.referencia='Anonimo'
                        me.pais='Anonimo'
                        me.estado='Anonimo'
                        me.municipio='Anonimo'
                        me.localidad='Anonimo'
                        me.cp= 0
                    }
                    var perr = {
                        'distritoId': me.u_iddistrito,
                        'agenciaId': me.u_idagencia, 
                    }
                    this.$cat.post('api/Racs/GenerarRac',{ 
                        'distritoId': me.u_iddistrito,
                        'agenciaId': me.u_idagencia, 
                    },configuracion).then(function(response){
                        me.rac = response.data.rac;
                        me.racid =  response.data.idrac;
                        if (me.statusActualizar==true)
                            {
                                if(me.lat =='')
                                me.lat = 0;
                                if(me.lng =='')
                                me.lng = 0;
                                this.$cat.post('api/RAPs/CrearRAP',{ 
                                    'distritoInicial': me.u_distrito,  
                                    'dirSubProcuInicial': me.u_dirSubPro,
                                    'agenciaInicial': me.u_agencia, 
                                    'agenciaId': me.u_idagencia,
                                    'racId':me.racid,  
                                    'personaId': me.idPersona, 
                                    'clasificacionpersona': me.clasificacionpersona,
                                    'pInicio': true,
                                    'modulo':me.u_modulo,
                                },configuracion).then(function(response){ 
                                    me.validate = 1
                                    var rac = "RAC: " +   me.rac 
                                    var fechahora = response.data.fh
                                    var notu = "A-" + response.data.notu

                                    this.$cat.put('api/Personas/Actualizar',{
                                        'personaId': me.idPersona, 
                                        'statusAnonimo': me.switch2,
                                        'tipoPersona': me.radios,
                                        'rfc': me.rfc,
                                        'razonsocial': me.razonsocial,  
                                        'nombre': me.nombres,
                                        'apellidoPaterno' : me.apaterno,
                                        'apellidoMaterno' : me.amaterno,
                                        'alias': me.alias,
                                        'statusAlias': false,
                                        'rangoEdad': me.rangoedad,
                                        'rangoEdadTF': me.RangoEdadTF,
                                        'PoliciaDetuvo' : idPoliciaDetuvo,
                                        'fechaNacimiento' : me.fnacimiento,
                                        'entidadFederativa': me.abreviacion.text,
                                        'docIdentificacion': me.docidentificacion,
                                        'curp': me.curp,
                                        'sexo' : me.sexo,
                                        'estadoCivil': me.estadocivil,
                                        'genero': me.genero,
                                        'registro': me.registro,
                                        'verR': me.verR,
                                        'verI': me.verI,
                                        'telefono1': me.telefono1,
                                        'telefono2': me.telefono2,
                                        'correo': me.correo,
                                        'medioNotificacion': listaMediosNotificacion,
                                        'nacionalidad': me.nacionalidad,
                                        'ocupacion': me.ocupacion === 'Otra' ? me.ocupacion2 : me.ocupacion,
                                        'nivelEstudio': me.nivelestudio,
                                        'lengua': me.lengua,
                                        'religion': me.religion,
                                        'discapacidad': me.switch1,
                                        'tipoDiscapacidad': listaDiscapacidades, 
                                        'Relacion': me.relacion,
                                        'PoblacionAfro':me.poblacionafro,
                                        'Parentesco': me.relacionado,
                                        'Edad': me.edadf,
                                        'DocPoderNotarial':me.documentoacredita,
                                        //Direccion personal
                                        'calle': me.calle,
                                        'noExt': me.noExt,
                                        'noInt': me.noInt,
                                        'entreCalle1': me.entreCalle1,
                                        'entreCalle2': me.entreCalle2,
                                        'referencia': me.referencia,
                                        'pais': me.pais,
                                        'estado': me.estado,
                                        'municipio': me.municipio,
                                        'localidad': me.localidad,
                                        'cp': me.cp,
                                        'lat': me.lat,
                                        'lng':me.lng,
                                    },configuracion).then(function(response){
                                        me.$notify('La información se guardo correctamente !!!','success')
                                        var doc = new jsPDF('p', 'mm', [200,200]);
                                        doc.setFontStyle("bold");
                                        doc.setFontSize(16);
                                        doc.text(40, 5, 'Bienvenido','center');
                                        doc.setFontStyle("normal");
                                        doc.setFontSize(12);
                                        doc.text(fechahora, 40, 15,'center');
                                        doc.setFontSize(10);
                                        doc.text(40, 25, rac, 'center'); 
                                        doc.text('Usted sera atendido con el turno:', 40, 35,'center');
                                        doc.setFontSize(35);
                                        doc.text(notu, 40, 50,'center');
                                        doc.setFontStyle("normal");
                                        doc.setFontSize(10);
                                        doc.text(40, 60, 'Hidalgo crece contigo', 'center'); 
                                        doc.autoPrint();
                                        var iframe = document.getElementById('iframepdf');
                                        iframe.src = doc.output('bloburl');
                                        me.limpiar();
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
                            else
                            { 
                                if (me.imageFile){
                                    let formData = new FormData();  
                                    formData.append('file', me.imageFile );
                                    var nombreCarpeta = me.rac; 
                                    me.GUID = me.generateUUID();

                                    this.$cat.post('api/RAtencions/Post/'+nombreCarpeta+'/'+me.GUID,
                                        formData,
                                        {
                                        headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                } 
                                        }  
                                            
                                        ).then(function(response){
                                            me.ruta = response.data.ruta

                                            if(me.cp =='')
                                            me.cp = 0
                                            if(me.curp == '')
                                            me.curp =0
                                            if(me.lat =='')
                                            me.lat =0
                                            if(me.lng == '')
                                            me.lng=0
                                            if(me.noInt == '')
                                            me.noInt = 0
                                            if(me.telefono1 == '')
                                            me.telefono1 = 0
                                            if(me.telefono2 == '')
                                            me.telefono2 = 0
                                            if(me.noExt == '')
                                            me.noExt = 'S/N'

                                            var nombre = ''
                                            var apaterno =      ''
                                            var amaterno =  ''
                                            var fnacimiento =  ''
                                            var rfc =  ''
                                            var curp =  ''
                                            var rutadocumento =  ''

                                            if(me.datosprotegidos){
                                                nombre = me.nombres;
                                                apaterno = me.apaterno;
                                                amaterno = me.amaterno;
                                                fnacimiento = me.fnacimiento;
                                                rfc = me.rfc;
                                                curp = me.curp;
                                                rutadocumento = me.ruta;

                                                me.nombres = me.alias;
                                                me.apaterno ="";
                                                me.amaterno = "";
                                                me.fnacimiento = "";
                                                me.rfc = "";
                                                me.curp = "";
                                                me.ruta ="";
                                            }
                                            var perro = {
                                                 'distritoInicial': me.u_distrito,  
                                                'agenciaInicial': me.u_agencia,
                                                'dirSubProcuInicial': me.u_dirSubPro,
                                                'agenciaId': me.u_idagencia,
                                                'racId':me.racid,
                                                'pInicio': true,
                                                'Numerooficio': 0,
                                                //***************************** PERSONA*/  
                                                'statusAnonimo': me.switch2,
                                                'tipoPersona': me.radios,
                                                'rfc': me.rfc,
                                                'razonsocial': me.razonsocial, 
                                                'clasificacionpersona': me.clasificacionpersona,
                                                'nombre': me.nombres,
                                                'apellidoPaterno' : me.apaterno,
                                                'apellidoMaterno' : me.amaterno,
                                                'alias': me.alias,
                                                'statusAlias': false,
                                                'rangoEdad': me.rangoedad,
                                                'rangoEdadTF': me.RangoEdadTF,
                                                'PoliciaDetuvo' : idPoliciaDetuvo,
                                                'fechaNacimiento' : me.fnacimiento,
                                                'entidadFederativa': me.abreviacion.text,
                                                'docIdentificacion': me.docidentificacion, 
                                                'curp': me.curp,
                                                'sexo' : me.sexo,
                                                'estadoCivil': me.estadocivil,
                                                'genero': me.genero,
                                                'registro': me.registro,
                                                'verR': me.verR,
                                                'verI': me.verI,
                                                'telefono1': me.telefono1,
                                                'telefono2': me.telefono2,
                                                'correo': me.correo,
                                                'medioNotificacion': listaMediosNotificacion,
                                                'nacionalidad': me.nacionalidad,
                                                'ocupacion': me.ocupacion === 'Otra' ? me.ocupacion2 : me.ocupacion,
                                                'nivelEstudio': me.nivelestudio,
                                                'lengua': me.lengua,
                                                'religion': me.religion,
                                                'discapacidad': me.switch1,
                                                'tipoDiscapacidad': listaDiscapacidades, 
                                                'DatosProtegidos': me.datosprotegidos,
                                                'Relacion': me.relacion,
                                                'PoblacionAfro':me.poblacionafro,
                                                'Parentesco': me.relacionado,
                                                'Edad': me.edadf,    
                                                'DocPoderNotarial':me.documentoacredita,                         
                                                //***************************** DIRECCION*/ 
                                                'calle': me.calle,
                                                'noExt': me.noExt,
                                                'noInt': me.noInt,
                                                'entreCalle1': me.entreCalle1,
                                                'entreCalle2': me.entreCalle2,
                                                'referencia': me.referencia,
                                                'pais': me.pais,
                                                'estado': me.estado,
                                                'municipio': me.municipio,
                                                'localidad': me.localidad,
                                                'cp': me.cp,
                                                'lat': me.lat,
                                                'lng': me.lng,
                                                //************************************ */
                                                'agencia': me.u_agencia,
                                                'usuario':me.u_nombre,
                                                'puesto':me.u_puesto,
                                                'modulo':me.u_modulo
                                            }
                                            this.$cat.post('api/RAtencions/CrearSinTurno',{  
                                            //***************************** REGISTRO DE ATENCION*/                                   
                                                'distritoInicial': me.u_distrito,  
                                                'agenciaInicial': me.u_agencia,
                                                'dirSubProcuInicial': me.u_dirSubPro,
                                                'agenciaId': me.u_idagencia,
                                                'racId':me.racid,
                                                'pInicio': true,
                                                'Numerooficio': 0,
                                                //***************************** PERSONA*/  
                                                'statusAnonimo': me.switch2,
                                                'tipoPersona': me.radios,
                                                'rfc': me.rfc,
                                                'razonsocial': me.razonsocial, 
                                                'clasificacionpersona': me.clasificacionpersona,
                                                'nombre': me.nombres,
                                                'apellidoPaterno' : me.apaterno,
                                                'apellidoMaterno' : me.amaterno,
                                                'alias': me.alias,
                                                'statusAlias': false,
                                                'rangoEdad': me.rangoedad,
                                                'rangoEdadTF':me.RangoEdadTF,
                                                'PoliciaDetuvo' : idPoliciaDetuvo,
                                                'fechaNacimiento' : me.fnacimiento,
                                                'entidadFederativa': me.abreviacion.text,
                                                'docIdentificacion': me.docidentificacion, 
                                                'curp': me.curp,
                                                'sexo' : me.sexo,
                                                'estadoCivil': me.estadocivil,
                                                'genero': me.genero,
                                                'registro': me.registro,
                                                'verR': me.verR,
                                                'verI': me.verI,
                                                'telefono1': me.telefono1,
                                                'telefono2': me.telefono2,
                                                'correo': me.correo,
                                                'medioNotificacion': listaMediosNotificacion,
                                                'nacionalidad': me.nacionalidad,
                                                'ocupacion': me.ocupacion === 'Otra' ? me.ocupacion2 : me.ocupacion,
                                                'nivelEstudio': me.nivelestudio,
                                                'lengua': me.lengua,
                                                'religion': me.religion,
                                                'discapacidad': me.switch1,
                                                'tipoDiscapacidad': listaDiscapacidades, 
                                                'DatosProtegidos': me.datosprotegidos,
                                                'Relacion': me.relacion,
                                                'PoblacionAfro':me.poblacionafro,
                                                'Parentesco': me.relacionado,
                                                'Edad': me.edadf,    
                                                'DocPoderNotarial':me.documentoacredita,                         
                                                //***************************** DIRECCION*/ 
                                                'calle': me.calle,
                                                'noExt': me.noExt,
                                                'noInt': me.noInt,
                                                'entreCalle1': me.entreCalle1,
                                                'entreCalle2': me.entreCalle2,
                                                'referencia': me.referencia,
                                                'pais': me.pais,
                                                'estado': me.estado,
                                                'municipio': me.municipio,
                                                'localidad': me.localidad,
                                                'cp': me.cp,
                                                'lat': me.lat,
                                                'lng': me.lng,
                                                //************************************ */
                                                'agencia': me.u_agencia,
                                                'usuario':me.u_nombre,
                                                'puesto':me.u_puesto,
                                                'modulo':me.u_modulo
                                            //************************************ */
                                            
                                        },configuracion).then(function(response){   
                                            
                                            me.$notify('La información se guardo correctamente !!!','success') 

                                           
                                            this.$cat.post('api/DocumentosPesonas/Crear',{  

                                                'PersonaId': response.data.personaid, 
                                                'tipoDocumento': me.docidentificacion,
                                                'nombreDocumento':me.GUID,
                                                'descripcion': "",
                                                'ruta': me.ruta,
                                                'distrito':me.u_distrito,
                                                'dirSubProc':me.u_dirSubPro,    
                                                'Agencia':me.u_agencia,
                                                'Usuario': me.u_nombre,
                                                'Puesto': me.u_puesto,
                                                
                                            },configuracion).then(function(response){  
                                                me.$notify('La información se guardo correctamente !!!','success')   
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
                                            

                                            
                                            if(me.datosprotegidos){           

                                                this.$cat.post('api/DatosProtegido/Crear',{

                                                    'RAPId': response.data.idrap, 
                                                    'Nombre': nombre,
                                                    'APaterno': apaterno,
                                                    'AMaterno': amaterno,
                                                    'FechaNacimiento': fnacimiento,
                                                    'CURP':curp,
                                                    'RFC': rfc,
                                                    'Rutadocumento':rutadocumento,
                                                    'UDistrito':me.u_distrito,
                                                    'USubproc': me.u_dirSubPro,
                                                    'UAgencia': me.u_agencia,
                                                    'Usuario': me.u_nombre,
                                                    'UPuesto': me.u_puesto,
                                                    'UModulo': me.u_modulo,

                                                },configuracion).then(function(response){  
                                                    me.$notify('La información se guardo correctamente !!!','success')   
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
                                            me.limpiar();
                                            me.$store.state.ratencionid = response.data.idatencion;
                                            me.$router.push('./entrevista') 
                                            
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

                                        })
                                            .catch(function(){
                                        }); 
                                }else{

                                    if(me.cp =='')
                                    me.cp = 0
                                    if(me.curp == '')
                                    me.curp =0
                                    if(me.lat =='')
                                    me.lat =0
                                    if(me.lng == '')
                                    me.lng=0
                                    if(me.noInt == '')
                                    me.noInt = 0
                                    if(me.telefono1 == '')
                                    me.telefono1 = 0
                                    if(me.telefono2 == '')
                                    me.telefono2 = 0
                                    if(me.noExt == '')
                                    me.noExt = 'S/N'

                                    var nombre = ''
                                    var apaterno =      ''
                                    var amaterno =  ''
                                    var fnacimiento =  ''
                                    var rfc =  ''
                                    var curp =  ''
                                    var rutadocumento =  ''

                                    if(me.datosprotegidos){
                                        nombre = me.nombres;
                                        apaterno = me.apaterno;
                                        amaterno = me.amaterno;
                                        fnacimiento = me.fnacimiento;
                                        rfc = me.rfc;
                                        curp = me.curp;
                                        rutadocumento = me.ruta;

                                        me.nombres = me.alias;
                                        me.apaterno ="";
                                        me.amaterno = "";
                                        me.fnacimiento = "";
                                        me.rfc = "";
                                        me.curp = "";
                                        me.ruta ="";
                                    }

                                    this.$cat.post('api/RAtencions/CrearSinTurno',{  
                                    //***************************** REGISTRO DE ATENCION*/                                   
                                        'distritoInicial': me.u_distrito,  
                                        'agenciaInicial': me.u_agencia,
                                        'dirSubProcuInicial': me.u_dirSubPro,
                                        'agenciaId': me.u_idagencia,
                                        'racId':me.racid,
                                        'pInicio': true,
                                        'Numerooficio': 0,
                                        //***************************** PERSONA AQUI SE INSERTA PERSONA */  
                                        'statusAnonimo': me.switch2,
                                        'tipoPersona': me.radios,
                                        'rfc': me.rfc,
                                        'razonsocial': me.razonsocial, 
                                        'clasificacionpersona': me.clasificacionpersona,
                                        'nombre': me.nombres,
                                        'apellidoPaterno' : me.apaterno,
                                        'apellidoMaterno' : me.amaterno,
                                        'alias': me.alias,
                                        'statusAlias': false,
                                        'rangoEdad': me.rangoedad,
                                        'rangoEdadTF':me.RangoEdadTF,
                                        'PoliciaDetuvo' : idPoliciaDetuvo,
                                        'fechaNacimiento' : me.fnacimiento,
                                        'entidadFederativa': me.abreviacion.text,
                                        'docIdentificacion': me.docidentificacion, 
                                        'curp': me.curp,
                                        'sexo' : me.sexo,
                                        'estadoCivil': me.estadocivil,
                                        'genero': me.genero,
                                        'registro': me.registro,
                                        'verR': me.verR,
                                        'verI': me.verI,
                                        'telefono1': me.telefono1,
                                        'telefono2': me.telefono2,
                                        'correo': me.correo,
                                        'medioNotificacion': listaMediosNotificacion,
                                        'nacionalidad': me.nacionalidad,
                                        'ocupacion': me.ocupacion === 'Otra' ? me.ocupacion2 : me.ocupacion,
                                        'nivelEstudio': me.nivelestudio,
                                        'lengua': me.lengua,
                                        'religion': me.religion,
                                        'discapacidad': me.switch1,
                                        'tipoDiscapacidad': listaDiscapacidades, 
                                        'DatosProtegidos': me.datosprotegidos, 
                                        'Relacion': me.relacion,
                                        'PoblacionAfro':me.poblacionafro,
                                        'Parentesco': me.relacionado,
                                        'Edad': me.edadf,         
                                        'DocPoderNotarial':me.documentoacredita,                   
                                        //***************************** DIRECCION*/ 
                                        'calle': me.calle,
                                        'noExt': me.noExt,
                                        'noInt': me.noInt,
                                        'entreCalle1': me.entreCalle1,
                                        'entreCalle2': me.entreCalle2,
                                        'referencia': me.referencia,
                                        'pais': me.pais,
                                        'estado': me.estado,
                                        'municipio': me.municipio,
                                        'localidad': me.localidad,
                                        'cp': me.cp,
                                        'lat': me.lat,
                                        'lng': me.lng,
                                        //************************************ */
                                        'agencia': me.u_agencia,
                                        'usuario': me.u_nombre,
                                        'puesto': me.u_puesto,
                                        'modulo': me.u_modulo
                                    //************************************ */
                                },configuracion).then(function(response){   
                                    
                                    me.$notify('La información se guardo correctamente !!!','success') 

                                    if(me.datosprotegidos){           

                                        this.$cat.post('api/DatosProtegido/Crear',{

                                            'RAPId': response.data.idrap, 
                                            'Nombre': nombre,
                                            'APaterno': apaterno,
                                            'AMaterno': amaterno,
                                            'FechaNacimiento': fnacimiento,
                                            'CURP':curp,
                                            'RFC': rfc,
                                            'Rutadocumento':"",
                                            'UDistrito':me.u_distrito,
                                            'USubproc': me.u_dirSubPro,
                                            'UAgencia': me.u_agencia,
                                            'Usuario': me.u_nombre,
                                            'UPuesto': me.u_puesto,
                                            'UModulo': me.u_modulo,

                                        },configuracion).then(function(response){  
                                            me.$notify('La información se guardo correctamente !!!','success')   
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
                                        me.limpiar();
                                        me.$store.state.ratencionid = response.data.idatencion;
                                        me.$router.push('./entrevista') 
                                            
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
                            me.$notify('Error al intentar crear el  registro!!!','error')  
                        } 
                    });  
               } 
            }) 
            //****************************************************************************** */ 
           
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
            this.removeImage()
            this.$refs.image.click ()
        }, 
        removeImage () {
            this.$refs.image.value = ''
        },
        onFilePicked(e) {
            const files = e.target.files
            const validImageTypes = ['image/jpeg', 'image/jpg'];

            if (files[0] && validImageTypes.includes(files[0].type)) {
                this.imageName = files[0].name;
            } else {
                alertify.error('Por favor, selecciona un archivo de imagen válido (jpeg, jpg).');
                this.$refs.image.value = '';
            }

            if (files[0] !== undefined) {
                this.imageName = files[0].name
                if (this.imageName.lastIndexOf('.') <= 0) {
                return
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                this.imageUrl = fr.result
                this.imageFile = files[0] // this is an image file that can be sent to server
                })
            } else {
                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''
            }
            },
        },
        
       
   }