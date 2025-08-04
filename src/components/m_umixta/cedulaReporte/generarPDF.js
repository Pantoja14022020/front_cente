let axios = require('axios').default;
let getBase64ImageFromURL = require('../libraries/getBase64ImageFromURL').getBase64ImageFromURL;
import QRCode from 'qrcode';
import moment from 'moment';

// COPIAR CARPETA
export const generarCedulaPDF = (nombre, puesto, desaparecido, media, padre, presentarDocumento = 1) => {
  var pdfMake = require('pdfmake/build/pdfmake.js')
  var htmlToPdfmake = require("html-to-pdfmake")
  if (pdfMake.vfs == undefined) {
    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
    pdfMake.vfs = pdfFonts.vfs
  }
  var logo3 = padre.base64.logo3
  var logo4 = padre.base64.logo4

  var agenciainfodr = padre.agenciainfo["direccion"]
  var agenciainfotel = padre.agenciainfo["telefono"]

  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let hour = date.getHours() < 10 ? date.getHours() + '0' : date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  if (month < 10) {
    var fechaf = `${day}/${month}/${year}`
  } else {
    var fechaf = `${day}/${month}/${year}`
  }

  var ElevFecha = new Date(padre.fechas);

  let diaele = ElevFecha.getDate()
  let añoele = ElevFecha.getFullYear()
  const mtexto = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
  var finalEle = diaele + ' de ' + mtexto[ElevFecha.getMonth()] + ' del ' + añoele
  let elehora = (ElevFecha.getHours() < 10 ? '0' + ElevFecha.getHours() : ElevFecha.getHours()) + ':' + ElevFecha.getMinutes();
  //Elimina las etiquetas h[1-6]
  var limpioHtml = padre.hechos.replace(/<\/?h[1-6][^>]*>/gi, '');

  var breveHtml = htmlToPdfmake(
    limpioHtml, {
    defaultStyles:
    { // change the default styles
      p:
      {
        margin: [15, 100, 15, 30],
        padding: [0, 20, 0, 20] 
      },
    }
  }
  )
  var layoutVehiculo;

  if (!padre.vehiculoInvolucrado) {
    layoutVehiculo =
    {
      style: 'table',
      table: {
        headerRows: 0,
        widths: ['*'],
        body:
          [
            [
              { style: 'Titulo', colSpan: 1, text: "Ninguno", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }

            ]
          ]
      }
    };
  }
  else {
    layoutVehiculo =
    {
      style: 'table',
      table: {
        headerRows: 0,
        widths: ['*', '*', '*'],
        body:
          [
            [
              { style: 'Titulo', colSpan: 1, text: "Marca", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 1, text: "Tipo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 1, text: "Modelo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }
            ],
            [
              { style: 'Texto', colSpan: 1, text: padre.marca.text, alignment: 'center' },
              { style: 'Texto', colSpan: 1, text: padre.tipo.text, alignment: 'center' },
              { style: 'Texto', colSpan: 1, text: padre.modelo.text, alignment: 'center' }
            ],
            [
              { style: 'Titulo', colSpan: 1, text: "Serie", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 1, text: "Placa", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 1, text: "Color", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }
            ],
            [
              { style: 'Texto', colSpan: 1, text: !padre.serie? '----------':padre.serie, alignment: 'center' },
              { style: 'Texto', colSpan: 1, text: !padre.placa?'----------':padre.serie, alignment: 'center' },
              { style: 'Texto', colSpan: 1, text: padre.color.text, alignment: 'center' }
            ],
            [
              { style: 'Titulo', colSpan: 1, text: "Año", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 1, text: "Num. Serie Motor", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 1, text: "Ruta", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }
            ],
            [
              { style: 'Texto', colSpan: 1, text: padre.ano.text, alignment: 'center' },
              { style: 'Texto', colSpan: 1, text: !padre.motorserie?'----------':padre.motorserie, alignment: 'center' },
              { style: 'Texto', colSpan: 1, text: !padre.ruta?'----------':padre.ruta, alignment: 'center' }

            ],
            [
              { style: 'Titulo', colSpan: 1, text: "Publico/Privado", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
              { style: 'Titulo', colSpan: 2, text: "Estado de Procedencia", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }

            ],
            [
              { style: 'Texto', colSpan: 1, text: padre.ransportePublico ? "Publico" : "Privado", alignment: 'center' },
              { style: 'Texto', colSpan: 2, text: padre.idEstadoVehiculo.text, alignment: 'center' }

            ],
            [
              { style: 'Titulo', colSpan: 3, text: "Propietario", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }

            ],
            [
              { style: 'Texto', colSpan: 3, text: !padre.propietario?'----------':padre.propietario, alignment: 'center' }

            ],
            [
              { style: 'Titulo', colSpan: 3, text: "Señas Particulares", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }

            ],
            [
              { style: 'Texto', colSpan: 3, text: htmlToPdfmake(padre.senasparticulares), alignment: 'left' }

            ]
          ]
      },
      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },
      }
    }
  }



  let numRedesSociales = padre.redesSociales.length;

  var nucModificada = padre.nuc.replace(/-/g, "~");

  var mensajeQR = padre.docCedulaDes + ' de '+ desaparecido.nombre 
                  + ' de la NUC: ' + nucModificada + ' firmada por ' + nombre + ' el dia ' + fechaf + ' con ID: '+ padre.idPersonaDesaparecida;
  let manchas = JSON.parse(media.tipoManchas);
  let redes= '';
    for(var i=0; i<padre.redesSociales.length; i++){
      redes += padre.redesSociales[i].redSocial.text;
      if(i+1 != padre.redesSociales.length)
           redes += "; ";
    }

    let enlace= '';
    for(var i=0; i<padre.redesSociales.length; i++){
      enlace += padre.redesSociales[i].enlace;
      if(i+1 != padre.redesSociales.length)
        enlace += "; ";
    }
    
  generateQRCode(mensajeQR).then((qrCodeBase64) => 
  {
    var dd =
    {
      pageSize: 'LEGAL',
      pageOrientation: 'portrait',
      pageMargins: [60, 130, 60, 60],
      footer: function (currentPage, pageCount) {
        const footerContent = [
          {
            image: logo4,
            width: 612,
            absolutePosition: { x: 0, y: 0 },
          },
          {
            text: agenciainfodr + "\n" + agenciainfotel + "\n" + 'www.hidalgo.gob.mx',
            style: 'subheaderlogo',
            style: 'PiePagina',
            margin: [312, 12, 72, 0],
            alignment: 'right',
            absolutePosition: { x: 0, y: 30 }
          },
          padre.vistaPreviaTF == false? 
          {
            image: qrCodeBase64,
            width: 60,  // Ajusta el ancho según tu diseño
            height: 60,  // Ajusta la altura según tu diseño
            absolutePosition: { x: 5, y: -5 },  // Ajusta las coordenadas según tu diseño
          }
          : "",

        ];

        return footerContent;
      },
      header: function (currentPage, pageCount, pageSize) {
        return [
          {
            image: logo3,
            width: 612,
            absolutePosition: { x: 0, y: 0 },
          },
        ]
      },
      content:
        [
          {
            text: (padre.personasDesap[0] ? padre.personasDesap[0].agenciaCaptura : padre.u_agencia),
            style: 'Adscripcion',
            absolutePosition: { x: 60, y: 95 },
          },
          {
            text: "CÉDULA-REPORTE DE EVENTO DE " + padre.persona,
            style: 'Texto',
            alignment: 'center',
            margin: [0, 50, 0, 0],
            absolutePosition: { x: 85, y: 150 },
            bold: true
          },
          {
            text: 'Fecha de reporte: ' +(padre.personasDesap[0] ? moment(padre.personasDesap[0].fechaSys).format('L') : moment().format('L')) + '\n' +
              'NÚMERO ÚNICO DE CASO: ' + padre.nuc + '\n' +
              'Hora: ' + (padre.horapdf? moment(padre.horapdf).format('LT') : moment().format('LT'))+ '\n\n',
            style: 'Texto',
            alignment: 'right',
            bold: true
          },

          {
            text: 'Agencia del Ministerio Público que inició: ' + (padre.personasDesap[0] ? padre.personasDesap[0].agenciaCaptura : padre.u_agencia) + '\n' +
              'Nombre del Agente del Ministerio Público: ' + (padre.personasDesap[0] ? padre.personasDesap[0].nombreCaptura : padre.u_nombre) + '\n' +
              'Fecha de inicio: ' + padre.fechaElevaNuc.substring(0, 10) + '\n' +
              'Estado Actual: ' + padre.etapaC + ' - ' +  padre.statusC,
            style: 'Texto',
            alignment: 'left',
            bold: true
          },
          {
            text: "INFORMACIÓN GENERAL DEL EVENTO",
            style: 'Texto',
            alignment: 'center',
            margin: [0, 15, 0, 5],
            bold: true
          },
          {
            text: 'Fecha del evento: ' + (padre.fechaAvistamiento == '' ? ' ' : padre.fechaAvistamiento) + '\n' +
              'Hora: ' + (padre.horaAvistamiento == '' ? ' ' : padre.horaAvistamiento),
            style: 'Texto',
            alignment: 'left',
            bold: true
          },
          {
            text: 'DATOS DE LA PERSONA DESAPARECIDA O NO LOCALIZADA' + '\n' + '(No reservar identidad)',
            style: 'Texto',
            alignment: 'center',
            margin: [0, 15, 0, 5],
            bold: true
          },
          {
            style: 'table',
            table: {
              headerRows: 0,
              widths: ['*', '*', '*'],
              body: [
                [
                  { style: 'Titulo', colSpan: 1, text: "Nombre", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Apellido Paterno", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Apellido materno", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }
                ],
                [
                  { style: 'Texto', text: desaparecido.nombre, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.apellidoPaterno, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.apellidoMaterno == 'N/A' ? ' ' : desaparecido.apellidoMaterno, alignment: 'center' }
                ],
                [
                  { style: 'Titulo', colSpan: 1, text: "Sobrenombre/Alias", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Fecha de Nacimiento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Sexo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                ],
                [
                  { style: 'Texto', text: desaparecido.alias == '' ? 'Ninguno' : desaparecido.alias, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.fechaNacimiento == '' ? 'No registrado' : desaparecido.fechaNacimiento, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.sexo == '' ? 'No registrado' : desaparecido.sexo, alignment: 'center' },
                ],
                [
                  { style: 'Titulo', colSpan: 1, text: "Modificó su sexo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Clave Única de Registro de Población", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Edad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                ],
                [
                  { style: 'Texto', text: desaparecido.genero != '' ? 'Si' : 'No', alignment: 'center' },
                  { style: 'Texto', text: desaparecido.curp == '' ? 'No registrado' : desaparecido.curp, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.edad == 99 ? desaparecido.rangoEdad : desaparecido.edad, alignment: 'center' },
                ],
                [
                  { style: 'Titulo', colSpan: 1, text: "Estado Civil", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Grado de Estudios", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Municipio", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                ],
                [
                  { style: 'Texto', text: desaparecido.estadoCivil == '' ? 'No registrado' : desaparecido.estadoCivil, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.nivelEstudio == '' ? 'No registrado' : desaparecido.nivelEstudio, alignment: 'center' },
                  { style: 'Texto', text: padre.municipio == '' ? 'No registrado' : padre.municipio, alignment: 'center' },
                ],
                [
                  { style: 'Titulo', colSpan: 1, text: "Entidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "País de Origen", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Nacionalidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                ],
                [
                  { style: 'Texto', text: padre.estado == '' ? 'No registrado' : padre.estado, alignment: 'center' },
                  { style: 'Texto', text: padre.pais == '' ? 'No registrado' : padre.pais, alignment: 'center' },
                  { style: 'Texto', text: desaparecido.nacionalidad == '' ? 'No registrado' : desaparecido.nacionalidad, alignment: 'center' },
                ],
                [
                  { style: 'Titulo', colSpan: 1, text: "Ocupación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Domicilio de la ocupacion", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                  { style: 'Titulo', colSpan: 1, text: "Estado de salud actual", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                ],
                [
                  { style: 'Texto', text: desaparecido.ocupacion == '' ? 'Ninguno' : desaparecido.ocupacion, alignment: 'center' },
                                    { style: 'Texto', text: (!padre.calleOcupacion || padre.calleOcupacion === 'N/A') ? 'Ninguno' : 
                                      ((padre.vialidadNombreOcupacion == undefined ? ' ' : padre.vialidadNombreOcupacion) + ' ' + padre.calleOcupacion + (padre.noIntOcupacion == '' ? ' ' : ', número ' + padre.noIntOcupacion) + ', ' + (padre.localidadOcupacion == undefined ? ' ' : padre.localidadOcupacion) + ', ' + (padre.municipioOcupacion == undefined ? ' ' : padre.municipioOcupacion) + ', ' + (padre.estadoOcupacion == undefined ? ' ' : padre.estadoOcupacion)), alignment: 'center' },
                                    { style: 'Texto', text: padre.estadoSalud, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Discapacidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Adicciones", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Padecimientos de alguna enfermedad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: desaparecido.discapacidad == true ? 'Si' : 'No', alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.adicciones == '' ? 'Ninguna' : padre.adicciones, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.padecimiento == '' ? 'Ninguno' : padre.padecimiento, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Etnia", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Portaba aparatos de comunicación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Número de teléfono celular", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: padre.etnia == '' ? 'Ninguna' : padre.etnia, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.portabaMedioComunicacion == true ? 'Si, Marca:' + (padre.IdMarcaTelefono.text === 'OTRA' ? (padre.personasDesap[0] ? padre.personasDesap[0].otraMarca :  padre.OtraMarca): padre.IdMarcaTelefono.text) + ", Operadora: " + padre.IdOperadoraTelefono.text : 'No', alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: desaparecido.telefono1 == '' ? 'Ninguno' : desaparecido.telefono1, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Redes Sociales", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Enlaces de perfil", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: (!padre.ExisteredSocial) ? 'No tiene' : (padre.redSocial.text !=='Se desconoce' ? redes : 'Se desconoce'), alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: (!padre.ExisteredSocial) ? 'No tiene' : (padre.redSocial.text !=='Se desconoce' ? enlace : 'Se desconoce'), alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Relación con Grupo delictivo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Nombre del Grupo delictivo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Procedecia del grupo delictivo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: padre.grupoDelictivo != '' ? 'Si' : 'No', alignment: 'center' },
                                    { style: 'Texto', text: padre.grupoDelictivo == '' ? 'Ninguno' : padre.grupoDelictivo, alignment: 'center' },
                                    { style: 'Texto', text: padre.procedenciaGrupoDelictivo == '' ? 'Ninguno' : padre.procedenciaGrupoDelictivo, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Fecha de último avistamento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Hora de último avistamiento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Persona con quien estaba o se comunicó en el último avistamiento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: padre.fechaAvistamiento == '' ? 'No Registrado' : padre.fechaAvistamiento, alignment: 'center' },
                                    { style: 'Texto', text: padre.horaAvistamiento == '' ? 'No Registrado' : padre.horaAvistamiento, alignment: 'center' },
                                    { style: 'Texto', text: padre.nombrePersonaAcompanaba == '' ? 'Ninguno' : padre.relacionPersonaAcompanaba + ' ' + padre.nombrePersonaAcompanaba, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Datos de localización de la persona con quien estaba", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 3, text: padre.localizacionPersonaAcompanaba == '' ? ' No registrado' : padre.localizacionPersonaAcompanaba, alignment: 'center' },
                                  ],
                                  [
                                    //{ style: 'Titulo', colSpan: 1, text: "Fotografía de la persona Desaparecida o No Localizada", height: '100', fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Domicilio de la persona Desaparecida o No Localizada", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    //{ style: 'Texto', colSpan: 1, text: '', alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: padre.calle.toUpperCase() == '' ? 'No registrado' : padre.vialidadNombre.toUpperCase() + ' ' + padre.calle.toUpperCase() + ', ' + padre.noExt.toUpperCase() + ', ' + padre.noInt.toUpperCase() + ', ' + padre.localidad.toUpperCase() + ', ' + padre.municipio.toUpperCase(), alignment: 'center' },
                                  ],
                                ]
                              },
                              layout: {
                                hLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                },
                              }
                            },
                  
                            {
                              text: 'VEHÍCULO INVOLUCRADO' + '\n\n' + ' Transporte particular o público (especificar marca, submarca, tipo, año, placas de circulación, característica particular, ruta)',
                              style: 'Texto',
                              alignment: 'center',
                              margin: [0, 15, 0, 15],
                              bold: true
                            },
                            layoutVehiculo,
                            {
                              text: 'CIRCUNSTANCIAS DE DESAPARICIÓN O NO LOCALIZACIÓN' + '\n\n' + 'LUGAR DONDE FUE VISTA POR ÚLTIMA VEZ',
                              style: 'Texto',
                              alignment: 'center',
                              margin: [0, 15, 0, 15],
                              bold: true
                            },
                            {
                              style: 'table',
                              table: {
                                headerRows: 0,
                                widths: [156, 156, 156],
                                body: [
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Lugar donde desapareció:", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 3, text: '(Domicilio completo con referencias y croquis de localización pudiendo ser de escuela, oficina, domicilio, carretera, bar, barranca, basurero, bodega, bosque, canal de aguas negras, cárcel municipal, hospital, hotal, playa, paraje).' + '\n\n' + padre.lugarespecificoH },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Vialidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Nombre", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Número interior y/o exterior", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: padre.vialidadNombreH == '' ? 'No registrado' : padre.vialidadNombreH, alignment: 'center' },
                                    { style: 'Texto', text: padre.calleH == '' ? 'No registrado' : padre.calleH, alignment: 'center' },
                                    { style: 'Texto', text: padre.noIntH == '' ? 'No registrado' : padre.noIntH + ', ' + padre.noExtH, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Colonia o Fraccionamiento:", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Comunidad o Localidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Municipio", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: padre.localidadH == '' ? 'No regitrada' : padre.localidadH, alignment: 'center' },
                                    { style: 'Texto', text: padre.localidadH == '' ? 'No registrada' : padre.localidadH, alignment: 'center' },
                                    { style: 'Texto', text: padre.municipioH == 'No registrado' ? '' : padre.municipioH, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Estado:", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "País", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Código Postal", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: padre.estadoH == '' ? 'No Registrado' : padre.estadoH, alignment: 'center' },
                                    { style: 'Texto', text: padre.paisH == '' ? 'No registrado' : padre.paisH, alignment: 'center' },
                                    { style: 'Texto', text: padre.cpH == '' ? 'No registrado' : padre.cpH, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Referencias", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 3, text: padre.referenciaH == '' ? 'Ninguna' : padre.referenciaH, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Vestimenta y Accesorios", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 3, text: padre.vestimentaAccesorios == '' ? 'No registrado' : padre.vestimentaAccesorios, alignment: 'left' }
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Descripción de los hechos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: ['Texto'], colSpan: 3, text: breveHtml, alignment: 'left' }
                                  ],
                                ]
                              },
                              layout: {
                                hLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                },
                              }
                            },
                            ,
                            {
                              text: '\nMEDIA FILIACIÓN DE LA PERSONA DESAPARECIDA O NO LOCALIZADA\n\n',
                              style: 'Texto',
                              alignment: 'center',
                              margin: [0, 15, 0, 15],
                              bold: true
                            },
                            {
                              style: 'table',
                              table: {
                                headerRows: 0,
                                widths: ['*', '*', '*', '*', '*'],
                                body: [
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Grupo Sanguineo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', text: "Estatura", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Peso", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 2, text: media.gruposanguineo == '' ? 'No registrado' : media.gruposanguineo, alignment: 'center' },
                                    {},
                                    { style: 'Texto', text: media.estatura ? (media.estatura == 'No Registrada' ? ' ' : media.estatura + ' Mts.') : '', alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.peso == '' ? 'No registrado' : media.peso + ' Kg', alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Frente", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', colSpan: 1, text: "Complexion", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Cara", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 2, text: media.tipoFrente == '' ? 'No registrado' : media.tipoFrente, alignment: 'center' },
                                    {},
                                    { style: 'Texto', text: media.complexion == '' ? 'No registrado' : media.complexion, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.formaCara == '' ? 'No Registrada' : media.formaCara, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Lateralidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', colSpan: 1, text: "Tez", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Pomulos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 2, text: media.lateralidad == '' ? 'No registrado' : media.lateralidad, alignment: 'center' },
                                    {},
                                    { style: 'Texto', text: media.tez == '' ? 'No Registrada' : media.tez, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.pomulos == '' ? 'No Registrada' : media.pomulos, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Cabello", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', text: "Longitud", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Tipo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Color", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Tratamientos quimicos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Calvicie", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: media.largoCabello == '' ? 'No registrado' : media.largoCabello, alignment: 'center' },
                                    { style: 'Texto', text: media.formaCabello == '' ? 'No registrado' : media.formaCabello, alignment: 'center' },
                                    { style: 'Texto', text: media.colorCabello == '' ? 'No registrado' : media.colorCabello, alignment: 'center' },
                                    { style: 'Texto', text: media.tratamientosQuimicosCabello == '' ? 'No registrado' : media.tratamientosQuimicosCabello, alignment: 'center' },
                                    { style: 'Texto', text: media.calvicie == '' ? 'No registrado' : media.calvicie, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Ojos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', text: "Pupilentes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }, 
                                    { style: 'Titulo', text: "Tamaño", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Forma", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Tipo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' }, 
                                    { style: 'Titulo', text: "Color", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: media.pupilentes2 == '' ? 'No registrado' : media.pupilentes2, alignment: 'center' }, 
                                    { style: 'Texto', text: media.tipoOjo == '' ? 'No registrado' : media.tipoOjo, alignment: 'center' },
                                    { style: 'Texto', text: media.formaOjo == '' ? 'No registrado' : media.formaOjo, alignment: 'center' },
                                    { style: 'Texto', text: media.tipoOjo2 == '' ? 'No registrado' : media.tipoOjo2, alignment: 'center' }, 
                                    { style: 'Texto', text: media.coloOjos == '' ? 'No registrado' : media.coloOjos, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Ceja", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Tamaño", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', text: "Forma", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Implantacion", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 2, text: media.cejas == '' ? 'No registrado' : media.cejas, alignment: 'center' },
                                    {},
                                    { style: 'Texto', text: media.tipoCejas == '' ? 'No registrado' : media.tipoCejas, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.implantacionCeja == '' ? 'No registrado' : media.implantacionCeja, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Nariz", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Altura", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', text: "Dorso", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Punta", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 2, text: media.tamañoNariz == '' ? 'No registrado' : media.tamañoNariz, alignment: 'center' },
                                    {},
                                    { style: 'Texto', text: media.tipoNariz == '' ? 'No registrado' : media.tipoNariz, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.puntaNariz == '' ? 'No registrado' : media.puntaNariz, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Menton", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', colSpan: 3, text: "Boca", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', text: "Forma", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Tipo", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Tamaño", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Grosor de labios", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Texto', text: media.formaMenton == '' ? 'No registrado' : media.formaMenton, alignment: 'center' },
                                    { style: 'Texto', text: media.tipoMenton == '' ? 'No registrado' : media.tipoMenton, alignment: 'center' },
                                    { style: 'Texto', text: media.tamañoBoca == '' ? 'No registrado' : media.tamañoBoca, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.grosorLabios == '' ? 'No registrado' : media.grosorLabios, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Orejas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', colSpan: 3, text: "Lunares", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', text: "Tamaño", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Adherencia", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Lunares", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Color y Ubicación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', text: media.tamañoOrejas == '' ? 'No registrado' : media.tamañoOrejas, alignment: 'center' },
                                    { style: 'Texto', text: media.adherenciaOreja == '' ? 'No registrado' : media.adherenciaOreja, alignment: 'center' },
                                    { style: 'Texto', text: media.lunares == '' ? '----------' : media.lunares, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.lunaresCyU == '' ? '----------' : media.lunaresCyU, alignment: 'center' },
                                    {}
                                  ],
                                  [
                                    {style: 'Titulo', colSpan: 5, text: "Manchas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    {style: 'Titulo', colSpan: 1, text: "Manchas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {style: 'Titulo', colSpan: 1, text: "Tipos de Manchas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {style: 'Titulo', colSpan: 3, text: "Otras Manchas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.manchas == '' ? '----------' : media.manchas, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: JSON.parse(media.tipoManchas) == '' ? '----------' : manchas.join(', '), alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.manchasOtrasCyU == '' ? '----------' : media.manchasOtrasCyU, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Cicatrices", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Cicatrices", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Tipo de Cicatrices", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Traumáticas Color y Ubicación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.cicatrices == '' ? '----------' : media.cicatrices, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: JSON.parse(media.tipoCicatrices) == '' ? '----------' : JSON.parse(media.tipoCicatrices), alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.cicatricesTraumaticasCyU == '' ? '----------' : media.cicatricesTraumaticasCyU, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Tipo de Cicatrices Quirúrgicas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Orientación de Cesárea", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Número de Partos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Motivo y Ubicación de la Operación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: JSON.parse(media.cicatricesQuirurgicasTipo) == '' ? '----------' : JSON.parse(media.cicatricesQuirurgicasTipo), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.cicatricesQuirurgicasCesareaOrientacion == '' ? '----------' : media.cicatricesQuirurgicasCesareaOrientacion, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.cicatricesQuirurgicasCesareaNumero == 0 ? '----------' : media.cicatricesQuirurgicasCesareaNumero, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.cicatricesQuirurgicasOperacionMyU == '' ? '----------' : media.cicatricesQuirurgicasOperacionMyU, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Tatuajes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Tatuajes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Número de Tatuajes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Descripción(Forma, ubicación, color)", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.tatuajes == '' ? '----------' : media.tatuajes, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.tatuajesNumero == '' ? '----------' : media.tatuajesNumero, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.tatuajesDescripcion == '' ? '----------' : media.tatuajesDescripcion, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Piercing", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Piercing", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Número de Piercing", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Descripción(Forma, ubicación, color)", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.piercing == '' ? '----------' : media.piercing, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.piercingNumero == '' ? '----------' : media.piercingNumero, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.piercingDescripcion == '' ? '----------' : media.piercingDescripcion, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Uñas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Estado de las Uñas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Uñas Postizas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Uñas No Saludables", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.uñasEstado == '' ? '----------' : media.uñasEstado, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.uñasPostizas == '' ? '----------' : media.uñasPostizas, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: JSON.parse(media.uñasNoSaludables) == '' ? '----------' : JSON.parse(media.uñasNoSaludables), alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Deformidades", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Deformidades", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Tipo de Deformidades", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Ubicación de Deformidades Congenitas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.deformidades == '' ? '----------' : media.deformidades, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: JSON.parse(media.tipoDeformidades) == '' ? '----------' : JSON.parse(media.tipoDeformidades), alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.congenitasUbicacion == '' ? '----------' : media.congenitasUbicacion, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Ubicación de Deformidades Adquiridas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 5, text: media.adquiridasUbicacion == '' ? '----------' : media.adquiridasUbicacion, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Cavidad Oral", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Prótesis Dental", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Orientación de Prótesis Dental", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "¿Conoce alguna caracteristica dental?", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.protesisDental == '' ? '----------' : media.protesisDental, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.protesisDentalUbicacion == '' ? '----------' : media.protesisDentalUbicacion, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.dentaduraCaracteristicas == '' ? '----------' : (media.dentaduraCaracteristicas === 'No tiene' ? 'No' : media.dentaduraCaracteristicas), alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Características de los dientes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 5, text: media.dentaduraCaracteristicas == 'No tiene' ? '----------' : (media.dentaduraCaracteristicas == 'Se desconoce'? 'se desconoce':JSON.parse(media.dentaduraDetalles).map(a=>{return(a.name + ': ' + a.condition + '; ')})), alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Información Médica", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Traumatismos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Traumatismos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Tipo de Traumatismos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Ubicación de Fracturas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.traumatismos == '' ? '----------' : media.traumatismos, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: JSON.parse(media.tipoTraumatismos) == '' ? '----------' : JSON.parse(media.tipoTraumatismos), alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.ubicacionFracturas == '' ? '----------' : media.ubicacionFracturas, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Tipo de Lesiones", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Otra Lesión", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Mordedura", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Ubicación de Lesiones", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: JSON.parse(media.tipoLesiones) == '' ? '----------' : JSON.parse(media.tipoLesiones), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.tipoLesionesOtra == '' ? '----------' : media.tipoLesionesOtra, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.causaMordedura == '' ? '----------' : media.causaMordedura, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.ubicacionLesiones == '' ? '----------' : media.ubicacionLesiones, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Enfermedades Cronicas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Enfermedades Cronicas", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Tiempo de Diagnóstico", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Tipo de Enfermedad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.enfermedadesCronicas == '' ? '----------' : media.enfermedadesCronicas, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.enfermedadTiempoDiagnostico == '' ? '----------' : media.enfermedadTiempoDiagnostico, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.enfermedadTipo == '' ? '----------' : media.enfermedadTipo, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Tratamiento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Periodicidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Medicamento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.tratamientoEnfermedadCronica == '' ? '----------' : media.tratamientoEnfermedadCronica, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.tratamientoPeriocidad == '' ? '----------' : media.tratamientoPeriocidad, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.tratamientoMedicamento == '' ? '----------' : media.tratamientoMedicamento, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Alergias", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Alergias", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Tratamiento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Periodicidad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 2, text: "Medicamento", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.alergias == '' ? '----------' : media.alergias, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.tratamientoAlergia == '' ? '----------' : media.tratamientoAlergia, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.periocidadTratamientoAlergia == '' ? '----------' : media.periocidadTratamientoAlergia, alignment: 'center' },
                                    { style: 'Texto', colSpan: 2, text: media.mdicamentoTratamientoAlergia == '' ? '----------' : media.mdicamentoTratamientoAlergia, alignment: 'center' },
                                    {}, 
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 5, text: "Lentes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Lentes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Graduación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 3, text: "Tipo de Lentes", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: media.lentes == '' ? '----------' : media.lentes, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: media.lentesGraduacion == '' ? '----------' : media.lentesGraduacion, alignment: 'center' },
                                    { style: 'Texto', colSpan: 3, text: media.tipoLentes == '' ? '----------' : media.tipoLentes, alignment: 'center' },
                                    {},
                                    {}, 
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Facultades Mentales", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    {},
                                    { style: 'Titulo', colSpan: 2, text: "Aparatos Auditivos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 2, text: "Facultades Mentales", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    {},
                                    { style: 'Titulo', text: "Tipo de Retraso", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Aparatos Auditivos", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', text: "Oido", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 2, text: media.facultadesMentales == '' ? '----------' : media.facultadesMentales, alignment: 'center' },
                                    {},
                                    { style: 'Texto', text: media.tipoRetraso == '' ? '----------' : media.tipoRetraso, alignment: 'center' },
                                    { style: 'Texto', text: media.aparatosAuditivos == '' ? '----------' : media.aparatosAuditivos, alignment: 'center' },
                                    { style: 'Texto', text: media.oidos == '' ? '----------' : media.oidos, alignment: 'center' },
                                  ],
                                ]
                              },
                              layout: {
                                hLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                },
                              }
                            },
                            {
                              text: 'DATOS DEL DENUNCIANTE',
                              style: 'Texto',
                              alignment: 'center',
                              margin: [0, 15, 0, 15],
                              bold: true
                            },
                            {
                              style: 'table',
                              table: {
                                headerRows: 0,
                                widths: ['*', '*', '*'],
                                body: [
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Nombre", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Apellido Paterno", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Apellido Materno", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: padre.nombreD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.apellidoPD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.apellidoMD.toUpperCase() == '' ? 'No registrado' : padre.apellidoMD.toUpperCase(), alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Ocupación", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Correo Electronico", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Relacion con la persona", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: padre.ocupacionD == '' ? 'DESCONOCIDO' : padre.ocupacionD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.correoD == '' ? 'DESCONOCIDO' : padre.correoD, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.relacionPersonaDenunciante == '' ? 'DESCONOCIDO' : padre.relacionPersonaDenunciante, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Teléfono", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Edad", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Acompañaba al No localizado", fillColor: '#eeeeee', fontSize: 9, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: padre.telefonoD == '' ? 'No registrado' : padre.telefonoD, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.edadD == 99 ? padre.rangoedad : padre.edadD + ' años', alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.acompanabaDenunciante == true ? 'SI' : padre.acompanabaDenunciante == false ? 'NO' : padre.acompanabaDenunciante, alignment: 'center' },
                                  ],
                                ]
                              },
                              layout: {
                                hLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                },
                              }
                            },
                            {
                              text: 'DOMICILIO DEL DENUNCIANTE',
                              style: 'Texto',
                              alignment: 'center',
                              margin: [0, 15, 0, 15],
                              bold: true
                            },
                            {
                              style: 'table',
                              table: {
                                headerRows: 0,
                                widths: ['*', '*', '*'],
                                body: [
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Vialidad", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Nombre", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Número interior y/o exterior", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', text: padre.vialidadNombreD == '' ? 'No registrado' : padre.vialidadNombreD, alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.calleD.toUpperCase() == '' ? 'No registrada' : padre.calleD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.numeroD == '' ? 'No registrada' : padre.numeroD + ', ' + padre.numeroE, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Colonia", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Comunidad o Localidad", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Municipio", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: padre.coloniaD.toUpperCase() == '' ? 'No registrada' : padre.coloniaD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.coloniaD.toUpperCase() == '' ? 'No registrada' : padre.coloniaD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.municipioD.toUpperCase() == '' ? 'No registrada' : padre.municipioD.toUpperCase(), alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 1, text: "Estado", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "País", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                    { style: 'Titulo', colSpan: 1, text: "Código Postal", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 1, text: padre.estadoD.toUpperCase() == '' ? 'No registrada' : padre.municipioD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.paisD.toUpperCase() == '' ? 'No registrada' : padre.paisD.toUpperCase(), alignment: 'center' },
                                    { style: 'Texto', colSpan: 1, text: padre.cpD == '' ? 'No registrada' : padre.cpD, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Titulo', colSpan: 3, text: "Referencias", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center' },
                                  ],
                                  [
                                    { style: 'Texto', colSpan: 3, text: padre.referenciaD.toUpperCase() == '' ? 'No registrada' : padre.referenciaD.toUpperCase(), alignment: 'center' },
                                  ],
                                ]
                              },
                              layout: {
                                hLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                },
                              }
                            },
                            padre.vistaPreviaTF == false? 
                            {
                              image: 'QR',
                              width: 200,
                              alignment: 'center',
                              margin: [0, 15, 0, 15]
                            }
                            : "",
                            //PAGINA DE LA FOTOGRAFÍA
                            // Salto de pagina /
                            {
                              text: ' ',
                              pageBreak: 'before'
                            },
                            {
                              text: 'FOTOGRAFIA DE LA PERSONA DESAPARECIDA O NO LOCALIZADA',
                              style: 'Texto',
                              alignment: 'center',
                              margin: [0, 15, 0, 15],
                              bold: true
                            },
                  
                            // FOTOGRAFIA /
                            {
                              image: 'foto',
                              width: 350,
                              alignment: 'center',
                              margin: [0, 15, 0, 15]
                            },
                          ],
                        images:
                        {
                          cabecera: logo3,
                          pie: logo4,
                          foto: padre.imageUrl,
                          QR: qrCodeBase64
                        },
                        
                        styles: {
                          Adscripcion: {
                            fontSize: 9,
                            bold: true
                          },
                          Fecha: {
                            fontSize: 9,
                          },
                          Nooficio: {
                            fontSize: 8,
                            bold: true
                          },
                          DePara: {
                            fontSize: 10,
                            bold: true
                          },
                          DeParaCargo: {
                            fontSize: 9,
                            bold: true
                          },
                          PiePagina: {
                            fontSize: 7,
                            color: COLOR_TEXTO_PIE_PAGINA,
                          },
                          Texto: {
                            fontSize: 8,
                            alignment: 'justify'
                          },
                          Titulo: {
                            fontSize: 9,
                            bold: true
                          },
                          SubTitulo: {
                            fontSize: 9,
                            semibold: true
                          }
                        }
                      };
                      padre.base64.contenidoPDF = pdfMake.createPdf(dd);
                      if (presentarDocumento) {
                        var f = document.getElementById('iframepdf');
                        var callback = function (url) { f.setAttribute('src', url); };
                        padre.base64.contenidoPDF.getDataUrl(callback, padre.base64.contenidoPDF);
                        padre.modaldocumento = true;
                      }
                    }).catch((error) => {
                    console.error('Error generando el código QR:', error);
                  });
                  }// FIN DE GENERAR CEDULA PDF
                  
                  function generateQRCode(mensajeQR) {
                    return new Promise((resolve, reject) => {
                      const qrCanvas = document.createElement('canvas');
                      QRCode.toCanvas(qrCanvas, mensajeQR, { width: 100, height: 100 }, function (error) {
                        if (error) {
                          reject(error);
                        } else {
                          const qrCodeBase64 = qrCanvas.toDataURL('image/png');
                          resolve(qrCodeBase64);
                        }
                      });
                    });
                  }