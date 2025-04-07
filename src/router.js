import Vue from 'vue'
import Router from 'vue-router'


/* Modulo. Panel de Control. Vistas */
import Panel from './views/panel_control/Panel.vue' 
/* Modulo. Control Acceso. Vistas */
import ControlAcceso from './views/control_acceso/Index.vue'
import ControlAccesoHome from './views/control_acceso/Home.vue'
import ControlAccesoPanelcontrol from './views/control_acceso/Panelcontrol.vue' 
import ControlAccesoRol from './views/control_acceso/Rol.vue'
import ControlAccesoUsuario from './views/control_acceso/Usuario.vue' 
import ControlAccesoAlmacenamiento from './views/control_acceso/Almacenamiento.vue'







/* Modulo. Panel de Control. Componentes */
import Turnador from './components/panel_control/Turnador.vue'
import Entrevista from './components/panel_control/Entrevista.vue'
import Offline from './components/panel_control/Offline.vue'
/* Modulo. Configuracion. Componentes */
import HomeConfiguracion from './views/m_configuracion/Home.vue'
import Distrito from "@/components/m_configuracion/Distrito.vue";
import Direccionsubprocuraduria from "@/components/m_configuracion/DireccionSubprocuraduria.vue"
import Agencia from "@/components/m_configuracion/Agencia.vue";
import Moduloservicio from "@/components/m_configuracion/Moduloservicio.vue";
import Dependenciaderivacion from "@/components/m_configuracion/Dependenciaderivacion.vue";
import FiscaliasOestados from "@/components/m_configuracion/FiscaliasOestados.vue";
import Docidentificacion from "@/components/m_configuracion/Docidentificacion.vue";
import Medionotificacion from "@/components/m_configuracion/Medionotificacion.vue";
import Clasificacionpersona from "@/components/m_configuracion/Clasificacionpersona.vue";
import Nivelestudios from "@/components/m_configuracion/Nivelestudios.vue";
import Estadocivil from "@/components/m_configuracion/Estadocivil.vue";
import Genero from "@/components/m_configuracion/Genero.vue";
import Sexo from "@/components/m_configuracion/Sexo.vue";
import Estado from "@/components/m_configuracion/Estado.vue";
import Municipio from "@/components/m_configuracion/Municipio.vue";
import Localidad from "@/components/m_configuracion/Localidad.vue";
import Religion from "@/components/m_configuracion/Religion.vue";
import Ocupacion from "@/components/m_configuracion/Ocupacion.vue";
import Lengua from "@/components/m_configuracion/Lengua.vue";
import Nacionalidad from "@/components/m_configuracion/Nacionalidad.vue";
import Discapacidad from "@/components/m_configuracion/Discapacidad.vue";
import ServicioPericial from "@/components/m_configuracion/ServicioPericial.vue";
import AsignacionArea from "@/components/m_configuracion/AsignacionArea.vue";
import Delito from "@/components/m_configuracion/Delito.vue";
import Tipofuero from "@/components/m_configuracion/Tipofuero.vue";
import Tipodeclaracion from "@/components/m_configuracion/Tipodeclaracion.vue";
import Resultadodelito from "@/components/m_configuracion/Resultadodelito.vue";
import Tipo from "@/components/m_configuracion/Tipo.vue";
import Intenciondelito from "@/components/m_configuracion/Intenciondelito.vue";
import Clasificaordenresult from "@/components/m_configuracion/Clasificaordenresult.vue";
import StatusNUC from "@/components/m_configuracion/StatusNUC.vue";
import TipoIndicio from "@/components/m_configuracion/TipoIndicio.vue";
import Institucion from "@/components/m_configuracion/Institucion.vue";
import Ano from "@/components/m_configuracion/Ano.vue";
import Color from "@/components/m_configuracion/Color.vue";
import Marca from "@/components/m_configuracion/Marca.vue";
import Modelo from "@/components/m_configuracion/Modelo.vue";
import Tipov from "@/components/m_configuracion/Tipov.vue";
import ClasificacionArma from "@/components/m_configuracion/ClasificacionArma.vue";
import ArmaObjeto from "@/components/m_configuracion/ArmaObjeto.vue";
import ArmaCalibre from "@/components/m_configuracion/ArmaCalibre.vue";
import ArmaMarca from "@/components/m_configuracion/ArmaMarca.vue";
import ActosInvestigacion from "@/components/m_configuracion/ActosInvestigacion.vue";
import Representantes from "@/components/m_configuracion/Representantes.vue";
import RFCantidadCabello from "@/components/m_configuracion/RFCantidadCabello.vue";
import RFCejas from "@/components/m_configuracion/RFCejas.vue";
import RFColorCabello from "@/components/m_configuracion/RFColorCabello.vue";
import RFColorOjos from "@/components/m_configuracion/RFColorOjos.vue";
import RFComplexion from "@/components/m_configuracion/RFComplexion.vue";
import RFFormaCabello from "@/components/m_configuracion/RFFormaCabello.vue";
import RFFormaCara from "@/components/m_configuracion/RFFormaCara.vue";
import RFFormaMenton from "@/components/m_configuracion/RFFormaMenton.vue";
import RFGrosorLabios from "@/components/m_configuracion/RFGrosorLabios.vue";
import RFLargoCabello from "@/components/m_configuracion/RFLargoCabello.vue";
import RFTamañoBoca from "@/components/m_configuracion/RFTamañoBoca.vue"
import RFTamañoNariz from "@/components/m_configuracion/RFTamañoNariz.vue"
import RFTez from "@/components/m_configuracion/RFTez.vue";
import RFTipoCejas from "@/components/m_configuracion/RFTipoCejas.vue";
import RFTipoFrente from "@/components/m_configuracion/RFTipoFrente.vue";
import RFTipoNariz from "@/components/m_configuracion/RFTipoNariz.vue";
import RFTipoOreja from "@/components/m_configuracion/RFTipoOreja.vue";
import RFTipoOjos from "@/components/m_configuracion/RFTipoOjos.vue";
import Multascitatorios from "@/components/m_configuracion/Multascitatorios.vue";
import JuzgadosAgencia from "@/components/m_configuracion/JuzgadosAgencia.vue";
import Hipotesis from "@/components/m_configuracion/Hipotesis.vue";
import DelitoEspecifico from "@/components/m_configuracion/DelitoEspecifico.vue";
import Etapa from "@/components/m_configuracion/Etapa.vue";
import Mproteccion from "@/components/m_configuracion/Mproteccion.vue";
import Mcautelares from "@/components/m_configuracion/Mcautelares.vue";
import SpPiLigaciones from "@/components/m_configuracion/SpPiLigaciones.vue";
import RFAdherenciaOreja from "@/components/m_configuracion/RFAdherenciaOreja.vue";
import RFCalvicie from "@/components/m_configuracion/RFCalvicie.vue";
import RfFormaOjo from "@/components/m_configuracion/RfFormaOjo.vue";
import RFImplantacionCeja from "@/components/m_configuracion/RFImplantacionCeja.vue";
import RfPuntaNariz from "@/components/m_configuracion/RfPuntaNariz.vue";
import RFTamanoDental from "@/components/m_configuracion/RFTamanoDental.vue";
import RFTipoMenton from "@/components/m_configuracion/RFTipoMenton.vue";
import RFTipoDentadura from "@/components/m_configuracion/RFTipoDentadura.vue";
import RFTratamientoDental from "@/components/m_configuracion/RFTratamientoDental.vue";
import RfTratamientoQuimicoCabello from "@/components/m_configuracion/RfTratamientoQuimicoCabello.vue";
import RfPomulos from "@/components/m_configuracion/RfPomulos.vue";
import FacilitadoresNotificadores from "@/components/m_configuracion/FacilitadoresNotificadores.vue";




Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /*Rutas Configuración */
    {
      path: '/Configuracion',
      name: 'ConfiguracionHome',
      component: HomeConfiguracion
    },
    //Catalgos de estructura -configuracion
    {
      path: '/Configuracion-distrito',
      name: 'configuraciondistrito',
      component: Distrito
    },
    {
      path: '/Configuracion-direccionsubprocuraduria',
      name: 'configuraciondireccionsubprocuraduria',
      component: Direccionsubprocuraduria
    },
    {
      path: '/Configuracion-agencia',
      name: 'configuracionagencia',
      component: Agencia
    },
    {
      path: '/Configuracion-moduloservicio',
      name: 'configuracionmoduloservicio',
      component: Moduloservicio,
    },
    {
      path: '/Configuracion-dependenciaderivacion',
      name: 'configuraciondependenciaderivacion',
      component: Dependenciaderivacion
    },
    {
      path: '/Configuracion-fiscaliasoestados',
      name: 'configuracionfiscaliasoestados',
      component: FiscaliasOestados
    },


    //Catalos de configuración -configuracion
    {
      path: '/Configuracion-docidentificacion',
      name: 'configuraciondocidentificacion',
      component: Docidentificacion,
    },
    {
      path: '/Configuracion-medionotificacion',
      name: 'configuracionmedionotificacion',
      component: Medionotificacion,
    },
    {
      path: '/Configuracion-clasificacionpersona',
      name: 'configuracionclasificacionpersona',
      component: Clasificacionpersona,
    },
    {
      path: '/Configuracion-nivelestudios',
      name: 'configuracionnivelestudios',
      component: Nivelestudios,
    },
    //Catalogos de generales -configuracion
    {
      path: '/Configuracion-estadocivil',
      name: 'configuracionestadocivil',
      component: Estadocivil
    },
    {
      path: '/Configuracion-genero',
      name: 'configuraciongenero',
      component: Genero
    },
    {
      path: '/Configuracion-sexo',
      name: 'configuracionsexo',
      component: Sexo
    },
    //Catalogos INEGI -configuracion
    {
      path: '/Configuracion-estado',
      name: 'configuracionestado',
      component: Estado
    },
    {
      path: '/Configuracion-municipio',
      name: 'configuracionmunicipio',
      component: Municipio
    },
    {
      path: '/Configuracion-localidad',
      name: 'configuracionlocalidad',
      component: Localidad
    },
    {
      path: '/Configuracion-religion',
      name: 'configuracionreligion',
      component: Religion
    },
    {
      path: '/Configuracion-ocupacion',
      name: 'configuracionocupacion',
      component: Ocupacion
    },
    {
      path: '/Configuracion-lengua',
      name: 'configuracionlengua',
      component: Lengua
    },
    {
      path: '/Configuracion-nacionalidad',
      name: 'configuracionnacionalidad',
      component: Nacionalidad
    },
    {
      path: '/Configuracion-discapacidad',
      name: 'configuraciondiscapacidad',
      component: Discapacidad
    },
    //Catalogos pra servicios periciales -configuracion
    {
      path: '/Configuracion-serviciopericial',
      name: 'configuracionserviciopericial',
      component: ServicioPericial
    },
    {
      path: '/Configuracion-asignacionarea',
      name: 'configuracionasignacionarea',
      component: AsignacionArea
    },
    // Delito y caracteristicas
    {
      path: '/Configuracion-delito',
      name: 'configuraciondelito',
      component: Delito
    },
    {
      path: '/Configuracion-tipofuero',
      name: 'configuraciontipofuero',
      component: Tipofuero,
    } ,
    {
      path: '/Configuracion-tipodeclaracion',
      name: 'configuraciontipodeclaracion',
      component: Tipodeclaracion,
    },
    {
      path: '/Configuracion-resultadodelito',
      name: 'configuracionresultadodelito',
      component: Resultadodelito,
    },
    {
      path: '/Configuracion-tipo',
      name: 'configuraciontipo',
      component: Tipo,
    },
    {
      path: '/Configuracion-intenciondelito',
      name: 'configuracionintenciondelito',
      component: Intenciondelito,
    },
    {
      path: '/Configuracion-clasificaordenresult',
      name: 'configuracionclasificaordenresult',
      component: Clasificaordenresult,
    },
    // Status de Carpetas
    {
      path: '/Configuracion-statusnuc',
      name: 'configuracionstatusnuc',
      component: StatusNUC,
    },
    //Catalogo de Indicios
    {
      path :'/Configuracion-tipoindicio',
      name:'configuraciontipoindicio',
      component: TipoIndicio,
    },
    {
      path :'/Configuracion-institucion',
      name:'configuracioninstitucion',
      component: Institucion,
    },
    {
      path :'/Configuracion-ano',
      name:'configuracionano',
      component: Ano,
    },
    {
      path :'/Configuracion-color',
      name:'configuracioncolor',
      component: Color,
    },
    {
      path :'/Configuracion-marca',
      name:'configuracionmarca',
      component: Marca,
    },
    {
      path :'/Configuracion-modelo',
      name:'configuracionmodelo',
      component: Modelo,
    },
    {
      path :'/Configuracion-tipov',
      name:'configuraciontipov',
      component: Tipov,
    },
    {
      path :'/Configuracion-clasificacionarma',
      name:'configuracionclasificacionarma',
      component: ClasificacionArma,
    },
    {
      path :'/Configuracion-armaobjeto',
      name:'configuracionarmaobjeto',
      component: ArmaObjeto,
    },
    {
      path :'/Configuracion-armacalibre',
      name:'configuracionarmacalibre',
      component: ArmaCalibre,
    },
    {
      path :'/Configuracion-armamarca',
      name:'configuracionarmamarca',
      component: ArmaMarca,
    },
    {
      path :'/Configuracion-actosinvestigacion',
      name:'configuracionactosinvestigacion',
      component: ActosInvestigacion,
    },
    {
      path :'/Configuracion-representantes',
      name:'configuracionrepresentantes',
      component: Representantes,
    },

    //catalogo de rasgos faciales -configuracion
    {
      path :'/Configuracion-rfcantidadcabello',
      name:'configuracionrfcantidadcabello',
      component: RFCantidadCabello,
    },
    {
      path :'/Configuracion-rfcejas',
      name:'configuracionrfcejas',
      component: RFCejas,
    },
    {
      path :'/Configuracion-rfcolorcabello',
      name:'configuracionrfcolorcabello',
      component: RFColorCabello,
    },
    {
      path :'/Configuracion-rfcolorojos',
      name:'configuracionrfcolorojos',
      component: RFColorOjos,
    },
    {
      path :'/Configuracion-rfcomplexion',
      name:'configuracionrfcomplexion',
      component: RFComplexion,
    },
    {
      path :'/Configuracion-rfformacabello',
      name:'configuracionrfformacabello',
      component:RFFormaCabello ,
    },
    {
      path :'/Configuracion-rfformacara',
      name:'configuracionrfformacara',
      component:RFFormaCara ,
    },
    {
      path :'/Configuracion-rfformamenton',
      name:'configuracionrfformamenton',
      component: RFFormaMenton,
    },
    {
      path :'/Configuracion-rfgrosorlabios',
      name:'configuracionrfgrosorlabios',
      component: RFGrosorLabios,
    },
    {
      path :'/Configuracion-rflargocabello',
      name:'configuracionrflargocabello',
      component: RFLargoCabello,
    },
    {
      path :'/Configuracion-rftamañoboca',
      name:'configuracionrftamañoboca',
      component: RFTamañoBoca,
    },
    {
      path :'/Configuracion-rftamañonariz',
      name:'configuracionrftamañonariz',
      component:RFTamañoNariz ,
    },
    {
      path :'/Configuracion-rftez',
      name:'configuracionrftez',
      component:RFTez ,
    },
    {
      path :'/Configuracion-rftipocejas',
      name:'configuracionrftipocejas',
      component: RFTipoCejas,
    },
    {
      path :'/Configuracion-rftipofrente',
      name:'configuracionrftipofrente',
      component: RFTipoFrente,
    },
    {
      path :'/Configuracion-rftiponariz',
      name:'configuracionrftiponariz',
      component:RFTipoNariz ,
    },
    {
      path :'/Configuracion-rftipooreja',
      name:'configuracionrftipooreja',
      component: RFTipoOreja,
    },
    {
      path :'/Configuracion-rftipoojos',
      name:'configuracionrftipoojos',
      component: RFTipoOjos,
    },

    {
      path :'/Configuracion-multascitatorios',
      name:'configuracionmultascitatorios',
      component: Multascitatorios,
    },

    {
      path :'/Configuracion-juzgadosagencia',
      name:'configuracionjuzgadosagencia',
      component: JuzgadosAgencia,
    },
    {
      path :'/Configuracion-hipotesis',
      name:'configuracionhipotesis',
      component: Hipotesis,
    },
    {
      path :'/Configuracion-delitoespecifico',
      name:'configuraciondelitoespecifico',
      component: DelitoEspecifico,
    },
    {
      path :'/Configuracion-etapa',
      name:'configuracionetapa',
      component: Etapa,
    },
    {
      path :'/Configuracion-mproteccion',
      name:'configuracionmproteccion',
      component: Mproteccion,
    },
    {
      path :'/Configuracion-mcautelares',
      name:'configuracionmcautelares',
      component: Mcautelares,
    },
    {
      path :'/Configuracion-sppiligaciones',
      name:'configuracionsppiligaciones',
      component: SpPiLigaciones,
    },
    {
      path :'/Configuracion-rfadherenciaoreja',
      name:'configuracionrfadherenciaoreja',
      component: RFAdherenciaOreja,
    },
    {
      path :'/Configuracion-rfcalvicie',
      name:'configuracionrfcalvicie',
      component: RFCalvicie,
    },
    {
      path :'/Configuracion-rfcormaojo',
      name:'configuracionrfcormaojo',
      component: RfFormaOjo,
    },
    {
      path :'/Configuracion-rfimplantacionceja',
      name:'configuracionrfimplantacionceja',
      component: RFImplantacionCeja,
    },
    {
      path :'/Configuracion-rfpuntanariz',
      name:'configuracionrfpuntanariz',
      component: RfPuntaNariz,
    },
    {
      path :'/Configuracion-rftamanodental',
      name:'configuracionrftamanodental',
      component: RFTamanoDental,
    },
    {
      path :'/Configuracion-rftipomenton',
      name:'configuracionrftipomenton',
      component: RFTipoMenton,
    },
    {
      path :'/Configuracion-rftipodentadura',
      name:'configuracionrftipodentadura',
      component: RFTipoDentadura,
    },
    {
      path :'/Configuracion-rftratamientodental',
      name:'configuracionrftratamientodental',
      component: RFTratamientoDental,
    },
    {
      path :'/Configuracion-rftratamientoquimicocabello',
      name:'configuracionrftratamientoquimicocabello',
      component: RfTratamientoQuimicoCabello,
    },
    {
      path :'/Configuracion-rfpomulos',
      name:'configuracionrfpomulos',
      component: RfPomulos,
    },
    {
      path :'/Configuracion-FacilitadoresNotificadores',
      name:'configuracionFacilitadoresNotificadores',
      component: FacilitadoresNotificadores,
    },




    /*Rutas Panel de Control */
    {
      path: '/',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/Turnador',
      name: 'Turnador',
      component: Turnador
    }
    ,
    {
      path: '/Entrevista',
      name: 'Entrevista',
      component: Entrevista
    }
    ,
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },






    
    /*Rutas Control de Acceso*/
    {
      path: '/control-acceso',
      name: 'control-acceso',
      component: ControlAcceso
    },
    {
      path: '/control-acceso-home',
      name: 'control-acceso-home',
      component: ControlAccesoHome
    },
    {
      path: '/control-acceso-panelcontrol',
      name: 'control-acceso-panelcontrol',
      component: ControlAccesoPanelcontrol
    },
    {
      path: '/control-acceso-rol',
      name: 'control-acceso-rol',
      component: ControlAccesoRol
    },
    {
      path: '/control-acceso-usuario',
      name: 'control-acceso-usuario',
      component: ControlAccesoUsuario
    },  
    {
      path: '/control-acceso-almacenamiento',
      name: 'control-acceso-almacenamiento',
      component: ControlAccesoAlmacenamiento
    }

    

  ]
})
