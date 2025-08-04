import axios from "axios";

export async function generarTokenCoodenadas(store) 
{
    try {
        // Generar un nuevo token
        const responsetoken = await axios.post('https://apis-backend.pgjhidalgo.gob.mx/token/generate',{},
            {
                auth: {
                    username: 'pgjeh',
                    password: 'pgjeH123##',
                },
            }
        );
        
        const token = responsetoken.data.token;
        const exp = responsetoken.data.expiresIn;
        const idUsuario = responsetoken.data.userId;
        const systemName = 'GPM';

        // Calcular fecha de expiración exacta
        const expirationTime = Date.now() + exp; // si `expiresIn` está en segundos
        
        store.commit('setTokenCoordenadas', {
            token,
            expirationTime,
            idUsuario,
            systemName,
        });
        
    } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        store.commit('setTokenCoordenadas', null);
    }
}