let axios = require('axios').default;
// COPIAR CARPETA
export const copiarDerivacion = (configuracion,servicios,nombreServicios,posicionServicio,idNUC,idHecho,idAtencion,distrito,idenvio,idexpediente) => 
{
    return new Promise((resolve, reject)=>
    {
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
                copiarDerivacion(configuracion,servicios,nombreServicios,posicionServicio,idNUC,idHecho,idAtencion,distrito,idenvio,idexpediente)
                    .then(resolve)
                    .catch(reject);
            }
            else
            {
                resolve(true);
            }
        }).catch(
            reject);    




    });   
}