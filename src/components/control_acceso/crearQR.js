import QRCode from 'qrcode';

export async function generarQRCodeBase64(tipodo,usuario,nombrefirma,fechadoc,id) {
  try {
    const base64 = await QRCode.toDataURL(tipodo + " del usuario " + usuario + " firmada por " + nombrefirma + " el dia " + fechadoc + ". Con ID " +id);
    return base64;
  } catch (err) {
    console.error('Error generando el QR:', err);
    throw err;
  }
}