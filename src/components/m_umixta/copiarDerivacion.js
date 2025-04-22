let axios = require('axios').default;
// COPIAR CARPETA
export const copiarDerivacion = (configuracion,servicios,nombreServicios,posicionServicio,idNUC,idHecho,idAtencion,distrito,idenvio,idexpediente) => 
{
    return new Promise((resolve, reject)=>{
    console.log("COPIANDO "+nombreServicios[posicionServicio]);
    //console.log("Servicio a llamar:"+servicios[posicionServicio]);
    //console.log("Posicion servicio :"+posicionServicio);   
    //console.log(servicios); 
    this.$cat.post(servicios[posicionServicio],{

        'IdDistrito': distrito,
        'IdRAtencion': idAtencion,
        'IdNuc':idNUC,
        'IdRHecho':idHecho,
        'EnvioId':idenvio,
        'ExpedienteId':idexpediente,
    },configuracion).then(function(response){
        

        //console.log("CARPETA COPIADA CORRECTAMENTE");
        posicionServicio++;

        console.log("Posicion:"+posicionServicio);
        console.log("tamaño array:"+servicios.length);

        if(posicionServicio<servicios.length)
        {
            copiarDerivacion(configuracion,servicios,nombreServicios,posicionServicio,idNUC,idHecho,idAtencion,distrito,idenvio,idexpediente).then(
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
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
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
        
        }).catch(err=>{
            // Realizar la segunda petición (PUT) aquí después de manejar el error
            this.$cat.post('api/ClonacionJR/EliminarDerivaciones', {
                'EnvioId':idenvio,
                'ExpedienteId':idexpediente,
            }, configuracion).then(function(response) {
                resolve();
                // Manejar la respuesta exitosa de la segunda petición si es necesario
            }).catch(err => {
                // Manejar los errores de la segunda petición si es necesario
            });
        });   
    });   
}