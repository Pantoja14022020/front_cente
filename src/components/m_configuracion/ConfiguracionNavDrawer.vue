<script setup>

</script>

<template>

    <v-navigation-drawer class="primary" permanent app>
      <div class="text-xl-center text-md-center text-xs-center my-4">
        <img src="@/assets/Logo.png" height="110px" alt="">
      </div>
      <v-list dense dark class="pt-0 primary" >
        <template  >
          <v-list-tile  :to="{name:'ConfiguracionHome'}">
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
          </v-list-tile>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogos de estructura
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondistrito'== '#' ? '' :  'configuraciondistrito'}"  active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">location_city</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Distrito
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondireccionsubprocuraduria'== '#' ? '' :  'configuraciondireccionsubprocuraduria'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">domain</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Dirección o Subprocuraduria
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionagencia'== '#' ? '' :  'configuracionagencia'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">domain</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Agencia / Area
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmoduloservicio'== '#' ? '' :  'configuracionmoduloservicio'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Modulo o servicio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondependenciaderivacion'== '#' ? '' :  'configuraciondependenciaderivacion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">domain</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Dependencias de derivación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionfiscaliasoestados'== '#' ? '' :  'configuracionfiscaliasoestados'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">domain</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Fiscalias otros estados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionsppiligaciones'== '#' ? '' :  'configuracionsppiligaciones'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">domain</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Sp / Pi pertenecientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template  v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogos de configuración
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondocidentificacion'== '#' ? '' :  'configuraciondocidentificacion'}"  active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">chrome_reader_mode</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Documento de identificación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmedionotificacion'== '#' ? '' :  'configuracionmedionotificacion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">contact_mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Medios de notificación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionclasificacionpersona'== '#' ? '' :  'configuracionclasificacionpersona'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">people</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Clasificación de persona
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionnivelestudios'== '#' ? '' :  'configuracionnivelestudios'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">school</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Nivel de estudios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template  v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogos generales
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionestadocivil'== '#' ? '' :  'configuracionestadocivil'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">supervised_user_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Estado civíl
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciongenero'== '#' ? '' :  'configuraciongenero'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">wc</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Género
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionsexo'== '#' ? '' :  'configuracionsexo'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">wc</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Sexo
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template  v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogos INEGI
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionestado'== '#' ? '' :  'configuracionestado'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">view_stream</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Estado
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmunicipio'== '#' ? '' :  'configuracionmunicipio'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">view_week</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Municipio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionlocalidad'== '#' ? '' :  'configuracionlocalidad'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">view_quilt</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Localidad
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionreligion'== '#' ? '' :  'configuracionreligion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">account_balance</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Religión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionocupacion'== '#' ? '' :  'configuracionocupacion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">rowing</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Ocupación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionlengua'== '#' ? '' :  'configuracionlengua'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">explicit</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Lengua
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionnacionalidad'== '#' ? '' :  'configuracionnacionalidad'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">public</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Nacionalidad
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondiscapacidad'== '#' ? '' :  'configuraciondiscapacidad'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">accessible</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Discapacidad
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogos Servicios Periciales
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionserviciopericial'== '#' ? '' :  'configuracionserviciopericial'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">brightness_7</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Servicio pericial
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionasignacionarea'== '#' ? '' :  'configuracionasignacionarea'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">brightness_low</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Asignar servicio por agencia / area
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Delito y caracteristicas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondelito'== '#' ? '' :  'configuraciondelito'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_bottom</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Delito
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciondelitoespecifico'== '#' ? '' :  'configuraciondelitoespecifico'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_top</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Delito específico
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'configuraciontipofuero'== '#' ? '' :  'configuraciontipofuero'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_horizontal</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo de fuero
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciontipodeclaracion'== '#' ? '' :  'configuraciontipodeclaracion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_inner</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo de declaracón
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionresultdadodelito'== '#' ? '' :  'configuracionresultadodelito'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_left</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Resultado del delito
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'configuraciontipo'== '#' ? '' :  'configuraciontipo'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_outer</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionintenciondelito'== '#' ? '' :  'configuracionintenciondelito'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_right</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Intención del delito
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionclasificaordenresult'== '#' ? '' :  'configuracionclasificaordenresult'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">border_style</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Clasificación del delito en orden al resutado
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>


          </v-list-group>


        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Status de carpetas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'configuracionstatusnuc'== '#' ? '' :  'configuracionstatusnuc'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">brightness_7</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Catalogo de status de carpeta
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionetapa'== '#' ? '' :  'configuracionetapa'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">brightness_7</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Catalogo de etapas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo Indicios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciontipoindicio'== '#' ? '' :  'configuraciontipoindicio'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Catalogo de tipo de indicios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracioninstitucion'== '#' ? '' :  'configuracioninstitucion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">business</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Instituciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo Vehiculos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionano'== '#' ? '' :  'configuracionano'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">money</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Año
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracioncolor'== '#' ? '' :  'configuracioncolor'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">grain</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Colores
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmarca'== '#' ? '' :  'configuracionmarca'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">directions_car</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Marcas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmodelo'== '#' ? '' :  'configuracionmodelo'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Modelo
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuraciontipov'== '#' ? '' :  'configuraciontipov'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">commute</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo Armas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionclasificacionarma'== '#' ? '' :  'configuracionclasificacionarma'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">sports_cricket</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Clasificacion Arma
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionarmaobjeto'== '#' ? '' :  'configuracionarmaobjeto'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">policy</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Arma u Objeto
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionarmamarca'== '#' ? '' :  'configuracionarmamarca'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Marcas de arma
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionarmacalibre'== '#' ? '' :  'configuracionarmacalibre'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">drag_indicator</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Calibres de arma
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Actos de Investigación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionactosinvestigacion'== '#' ? '' :  'configuracionactosinvestigacion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">announcement</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Clasificacion de Actos de Investigacion
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Representantes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrepresentantes'== '#' ? '' :  'configuracionrepresentantes'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">gavel</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Clasificacion de Representantes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Rasgos Faciales-Físicos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcomplexion'== '#' ? '' :  'configuracionrfcomplexion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">accessibility</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Complexión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcantidadcabello'== '#' ? '' :  'configuracionrfcantidadcabello'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Cantidad de Cabello
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfformacabello'== '#' ? '' :  'configuracionrfformacabello'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">waves</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo de cabello
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrflargocabello'== '#' ? '' :  'configuracionrflargocabello'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">sort</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Longitud de Cabello
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcolorcabello'== '#' ? '' :  'configuracionrfcolorcabello'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">color_lens face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Color de cabello
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftratamientoquimicocabello'== '#' ? '' :  'configuracionrftratamientoquimicocabello'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tratamiento químico de cabello
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcalvicie'== '#' ? '' :  'configuracionrfcalvicie'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Calvicie
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfformacara'== '#' ? '' :  'configuracionrfformacara'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">child_care</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Forma de la cara
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftipofrente'== '#' ? '' :  'configuracionrftipofrente'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">streetview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo de frente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcejas'== '#' ? '' :  'configuracionrfcejas'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">expand_more</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Implantación de Cejas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftipocejas'== '#' ? '' :  'configuracionrftipocejas'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">line_weight</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Forma de Cejas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfimplantacionceja'== '#' ? '' :  'configuracionrfimplantacionceja'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">line_weight</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Implantación de ceja
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftipoojos'== '#' ? '' :  'configuracionrftipoojos'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">visibility</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tamaño de ojos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcolorojos'== '#' ? '' :  'configuracionrfcolorojos'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">color_lens visibility</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Color de ojos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfcormaojo'== '#' ? '' :  'configuracionrfcormaojo'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">visibility</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Forma de ojos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftiponariz'== '#' ? '' :  'configuracionrftiponariz'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">play_arrow</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Dorso de nariz
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftamañonariz'== '#' ? '' :  'configuracionrftamañonariz'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">text_rotation_down</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tamaño de nariz
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfpuntanariz'== '#' ? '' :  'configuracionrfpuntanariz'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">text_rotation_down</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Punta de nariz
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftamañoboca'== '#' ? '' :  'configuracionrftamañoboca'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">sentiment_dissatisfied</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tamaño de boca
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfgrosorlabios'== '#' ? '' :  'configuracionrfgrosorlabios'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">sentiment_very_dissatisfied</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Grosor de labios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfformamenton'== '#' ? '' :  'configuracionrfformamenton'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">format_shapes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Forma de mentón
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftipomenton'== '#' ? '' :  'configuracionrftipomenton'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">format_shapes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo de mentón
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrftipooreja'== '#' ? '' :  'configuracionrftipooreja'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon  color="blue-grey darken-2">hearing</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tamaño de orejas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionrfadherenciaoreja'== '#' ? '' :  'configuracionrfadherenciaoreja'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon  color="blue-grey darken-2">hearing</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Adherencia oreja
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  :to="{ name: 'configuracionrftez'== '#' ? '' :  'configuracionrftez'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">person person_outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tez
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  :to="{ name: 'configuracionrftamanodental'== '#' ? '' :  'configuracionrftamanodental'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">person_outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tamaño dental
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  :to="{ name: 'configuracionrftipodentadura'== '#' ? '' :  'configuracionrftipodentadura'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">person_outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tipo de dentadura
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  :to="{ name: 'configuracionrftratamientodental'== '#' ? '' :  'configuracionrftratamientodental'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">person_outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Tratamiento dental
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  :to="{ name: 'configuracionrfpomulos'== '#' ? '' :  'configuracionrfpomulos'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">person_outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Pomulos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Multas de Citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmultascitatorios'== '#' ? '' :  'configuracionmultascitatorios'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Multas de Citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Juzgados de Agencia
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionjuzgadosagencia'== '#' ? '' :  'configuracionjuzgadosagencia'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">apartment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Juzgados - Agencia
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Hipótesis
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionhipotesis'== '#' ? '' :  'configuracionhipotesis'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">chrome_reader_mode</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Hipotesis
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Catalogo de Medidas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmproteccion'== '#' ? '' :  'configuracionmproteccion'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">aspect_ratio</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Medidas de protección
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmcautelares'== '#' ? '' :  'configuracionmcautelares'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">bookmarks</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Medidas cautelares
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group >
            <v-list-tile slot="activator">
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Facilitadores y Notificadores
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'configuracionmproteccion'== '#' ? '' :  'configuracionFacilitadoresNotificadores'}"   active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">people</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Módulo Servicio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
import Loader from './modulo/_loader'

export default {
  name: 'ConfiguracionNavDrawer',
  components:{Loader},
  data () {
    return {
      drawer: true,
      right: null,
      title: 'Vuetify.js',
      data: function() {
        return {
          sideNav: false,
          appName: "Configuracion",
          Loader:true
        }
      },
      created: function() {
        // Add a request interceptor
        axios.interceptors.request.use( (config)=> {
          // Do something before request is sent
          console.log(config);
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use((response)=>{
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (err)=> {

          // Do something with response error
          return new Promise( (resolve, reject)=> {
            this.$store.dispatch('logout').then(()=>{
              this.$router.push('/login')
            })
            throw err;
          });
        });

        ///////////////////////////////////////////////////////////////
        // Add a request interceptor
        this.$controlacceso.interceptors.request.use( (config)=> {
          // Do something before request is sent
          console.log(config);
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

        // Add a response interceptor
        this.$controlacceso.interceptors.response.use((response)=>{
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (error)=> {
          // Do something with response error
          return new Promise( (resolve, reject)=> {
            this.$store.dispatch('logout').then(()=>{
              this.$router.push('/login')
            })
            throw err;
          });
        });
        ///////////////////////////////////////////////////////////////
        // Add a request interceptor
        this.$conf.interceptors.request.use( (config)=> {
          // Do something before request is sent
          console.log(config);
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

        // Add a response interceptor
        this.$conf.interceptors.response.use((response)=>{
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (error)=> {
          // Do something with response error
          return new Promise( (resolve, reject)=> {
            this.$store.dispatch('logout').then(()=>{
              this.$router.push('/login')
            })
            throw err;
          });
        });
        ///////////////////////////////////////////////////////////////
      },

    }
  },
  computed: {
    logueado(){
      return this.$store.state.usuario;
    },
    esAdministrador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
    },
    usuario(){
      return this.$store.state.usuario.usuario;
    },
  },
  created(){
    //this.$store.dispatch("autoLogin");

  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
      this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {
            window.location.href = response.data.direccion
          })
    },

  }
}
</script>
<style scoped>

</style>