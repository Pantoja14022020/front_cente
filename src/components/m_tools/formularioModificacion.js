import axios from 'axios'
import VeeValidate from 'vee-validate'
import moment from 'moment'
import alertify from 'alertifyjs';
import { VueEditor } from "vue2-editor"
import { error } from 'util'
export default 
{
props: 
{
    uDistrito: String,
    sTabla:String

},
data: () => 
({   
    infoBorrado:
    {
        idUsuario:'',
        idSolicitante:'',
        razon:'',
        borrarId:'',
        texto1:'',
        texto2:'',
    },
    windowInfo:'',
    formulario:
    {
      texto1:'',
      texto2:''
    },
    catalogos:
    {
        usuarios:[],
    },
    opciones:
    {
        mostrar:false,
    }
}),
created () 
  { 
        let me = this;    
        //console.log("creando formulario de Borrado (1)");
        me.listarUsuarios();
  },
methods:
  {
    limpiar()
    {
      let me = this;
      me.infoBorrado.borrarId="";
      me.infoBorrado.idSolicitante='';
      me.infoBorrado.razon='';
      me.infoBorrado.texto1='';
      me.infoBorrado.texto2='';
    },
    mostrar(item,windowInfo)
    {
      let me = this;  
      me.limpiar();  
      me.opciones.mostrar=true;
      console.log("info carpeta enviada:")
      console.log(item);
      console.log("info de dialogo:")
      console.log(windowInfo);
      me.infoBorrado.borrarId=item;
      me.windowInfo=windowInfo;
      if(windowInfo.extraComponents.text1)
      {
        me.infoBorrado.texto1=windowInfo.extraComponents.text1.value;
        me.formulario.texto1=windowInfo.extraComponents.text1.label;
      }
      else
      {
        me.infoBorrado.texto1="vacio";
      }
      if(windowInfo.extraComponents.text2)
      {
        me.infoBorrado.texto2=windowInfo.extraComponents.text2.value;
        me.formulario.texto2=windowInfo.extraComponents.text2.label;
      }
      else
      {
        me.infoBorrado.texto2="vacio";
      }


      
    },
    modificarRegistro()
    {
      console.log("modificar registro");
      let me = this;    
      me.$validator.validate().then(result => 
        {
            //debugger
            if (result) 
            {    
              me.$emit('solicitarModificacion',
                                          {
                                            'idBorrar':
                                            {
                                              'rHechoId':me.infoBorrado.borrarId.rHechoId, 
                                              'rAtencionId':me.infoBorrado.borrarId.rAtencionId,
                                              'registroId':me.infoBorrado.borrarId.registroId,
                                              'textoMod':me.infoBorrado.texto1,
                                              'textoMod2':me.infoBorrado.texto2,
                                            },
                                            'solicitante':me.infoBorrado.idSolicitante,
                                            'razon':me.infoBorrado.razon,
                                            'tabla':me.sTabla,
                                            'servicio':me.windowInfo.operation
                                          });
              me.opciones.mostrar=false;
            }
            else
            {
              console.log("error en validacion");
            } 
        }).
        catch(err=>{
          console.log("error de validación 2");
          console.log(err);
      })//  FIN DE VALIDATOR   
    },





    listarUsuarios()
    {
        
        let me = this;
        console.log("Listar Modulos(1)");
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header };
        var moduloarray;
        me.modulos = [];
        me.modulo = "";
        
          me.$controlacceso.get('api/Usuarios/ListarPorDistrito/' +me.uDistrito , configuracion).then(function(response) {
            moduloarray = response.data
            moduloarray.map(function(x) {
              me.catalogos.usuarios.push({ text: x.usuario, value: x.idUsuario })
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage = false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta pagina", 'error')
              me.e403 = true
              me.showpage = false
            } else if (err.response.status == 404) {
              me.$notify("No se encontraron usuarios en el distrito", 'error')
            } else {
              me.$notify('Error al intentar listar los usuarios del distrito!!!', 'error')
            }
          });

    }
  }
}// FIN DEL COMPONENTE