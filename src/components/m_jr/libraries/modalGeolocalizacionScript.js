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
var assert;
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
    direccion:''
    
  }),
  mounted() 
  {
      
      let me = this;
      me.geoLocate();
 
      //this.geolocate();
  },
   created () 
   { 
    let me = this;
     console.log("CREANDO EL MODAL GEO 2");
   },
   methods:
   {
    geoLocate: function() 
    {
       let me = this;
        navigator.geolocation.getCurrentPosition(position => 
        {
           me.geolocalizacion.center = 
           {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
        });
    },
    mostrarModalGeolocalizacion(direccionPersona)
        {
            
            debugger
            let me=this;
            me.direccion=direccionPersona;
            
            if(me.direccion.estado !='' && me.direccion.municipio != '' && me.direccion.localidad != '' && me.direccion.calle != '')
            {
                if(me.direccion.lat == '' && me.direccion.lng == ''){
                    me.geolocalizacion.geoloc=2;
                    me.geolocalizacion.modal = 1;
                    me.lugar = me.direccion.calle+" "+ me.direccion.localidad+" "+me.direccion.municipio+" "+me.direccion.estado
                    me.geoListener();
                    me.geoAddMarkerGeocoder();
                }else{
                    me.geolocalizacion.geoloc=2;
                    me.geolocalizacion.modal = 1;
                }
            }
            else
                me.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')
                
        },
        geoListener()
        {
            //debugger
            //input.focus();
            
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': me.geolocalizacion.calle+" "+ me.geolocalizacion.localidad+" "+me.geolocalizacion.municipio+" "+me.geolocalizacion.estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.geolocalizacion.center.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
                    me.geolocalizacion.center.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        geoAddMarkerGeocoder() 
        {
            
            //debugger
            let me = this; 
            const marker = {
                lat: me.geolocalizacion.center.lat,
                lng: me.geolocalizacion.center.lng, 
            };
            me.geolocalizacion.markers =[]
            me.geolocalizacion.places = []
            me.geolocalizacion.markers.push({ position: marker });
            me.geolocalizacion.places.push(this.currentPlace);
            me.geolocalizacion.center = marker;
            me.geolocalizacion.currentPlace = null;    
                         
        },
        geoAddMarker() 
        {
            
            let me = this;
            if (me.geolocalizacion.currentPlace) 
            {
                const marker = {
                    lat: me.geolocalizacion.currentPlace.geometry.location.lat(),
                    lng: me.geolocalizacion.currentPlace.geometry.location.lng(),

            };
                me.geolocalizacion.markers.push({ position: marker });
                me.geolocalizacion.places.push(me.geolocalizacion.currentPlace);
                me.geolocalizacion.center = marker;
                me.geolocalizacion.currentPlace = null;
            }
            
        },
        geoGuardarLocalizacion()
        {
            let me = this;
            if(me.geolocalizacion.geoloc==2)
            {
                
                if(me.geolocalizacion.lataux != '' && me.geolocalizacion.lngaux != '')
                {
                    me.direccion = {lat:me.geolocalizacion.lataux,lng:me.geolocalizacion.lngaux};
                }
                else
                {
                    me.direccion = {lat:me.geolocalizacion.markers[0].position.lat,lng:me.geolocalizacion.markers[0].position.lng}; 
                }
                me.$emit('devolverGeoLocal',me.direccion);
                me.geolocalizacion.geoloc=0;
                me.geolocalizacion.modal=0;
            }
        },
        geoSetPlace(place) 
        {           
            let me = this;
            me.geolocalizacion.markers= [],
            me.geolocalizacion.places= [],
            me.geolocalizacion.currentPlace = place;            
        },
        geoUpdateCoordinates(location) 
        {            
            let me = this;
            me.geolocalizacion.lataux = location.latLng.lat()
            me.geolocalizacion.lngaux = location.latLng.lng()            
        },
        geoUpdatecenter(){
            //debugger
            let me = this;
            me.geolocalizacion.center.lat = me.geolocalizacion.lataux;
            me.geolocalizacion.center.lng = me.geolocalizacion.lngaux;
        },
        geoImprimirmapa(){
                
            var printContents = document.getElementById('contentmapa').outerHTML;
            var w = window.open();
            w.document.write("<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>"+printContents+"<h1></div>");
            //w.document.write(printContents);
            w.print();
    
        },
    }//CERRAR MÉTODOS
  }