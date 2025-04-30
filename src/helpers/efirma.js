import axios from 'axios'

export async function firmarDocumento( urlDoc, idDoc, base64, rfc ) {
  try {
    const response = await axios.post('https://efirma.pgjhidalgo.gob.mx/api/documents/apiFirmaElectronicaTokenCentenario', {
      data: [
        {
          urlDoc,
          idDoc,
          base64
        }
      ],
      rfc
    })

    return response.data
  } catch (error) {
    console.error('Error al enviar documento a firmar:', error)
    throw error
  }
}