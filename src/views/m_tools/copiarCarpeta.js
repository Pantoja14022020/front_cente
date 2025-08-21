let axios = require('axios').default;
// COPIAR CARPETA
export const copiarCarpeta = (configuracion,servicios,nombreServicios,posicionServicio,idNUC,idHecho,idAtencion,distrito,agenciaac,moduloac) => 
{
    return new Promise((resolve, reject)=>{
    console.log("COPIANDO "+nombreServicios[posicionServicio]);
    //console.log("Servicio a llamar:"+servicios[posicionServicio]);
    //console.log("Posicion servicio :"+posicionServicio);   
    //console.log(servicios); 
    me.$CAT.post(servicios[posicionServicio],{  

        'IdDistrito': distrito,
        'IdRAtencion': idAtencion,
        'IdNuc':idNUC,
        'IdRHecho':idHecho
    },configuracion).then(function(response){
        

        //console.log("CARPETA COPIADA CORRECTAMENTE");
        posicionServicio++;

        console.log("Posicion:"+posicionServicio);
        console.log("tamaño array:"+servicios.length);

        if(posicionServicio<servicios.length)
        {
            copiarCarpeta(configuracion,servicios,nombreServicios,posicionServicio,idNUC,idHecho,idAtencion,distrito).then(
                function(response){
                    resolve();
                }).catch(err=>{
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
                        me.$notify('Error al intentar crear el  registro!!!','error')  
                    }
                    reject(); 
                });
        }
        else
        {
            resolve();
        }
        
    }).catch(err => {
            //Cacheo de errores
            me.$CAT.put('api/RHechoes/ActualizarModuloyAgencia', {
                'IdRHecho': idHecho,
                'moduloServicioId': moduloac,
                'agenciaId': agenciaac
            }, configuracion).then(function(response) {
                alert("La remision fallo pero la carpeta regreso a su agencia de origen");
                resolve();
                // Manejar la respuesta exitosa de la segunda petición si es necesario
            }).catch(err => {
                // Manejar los errores de la segunda petición si es necesario
            });
            

    });   
    });   
}