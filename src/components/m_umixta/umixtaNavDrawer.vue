

<template>
    <v-navigation-drawer permanent app class="primary">
      <div class="text-xl-center text-md-center text-xs-center my-4">
        <img src="@/assets/Logo.png" height="110px" alt="" />
      </div>
      <v-list dense dark class="pt-0 primary">
        <template>
          <v-list-tile :to="{ name: 'umixtahome' }">
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
          </v-list-tile>
        </template>
        <template
            v-if="esAdministrador || esRecepcion || esAmpoMixto ||esAmpoDetenido ||esAmpoDetenido || esAMPOAMP"
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Atención al público
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esAdministrador || esRecepcion || esAmpoMixto || esAMPOAMP"
                :to="{ name: 'umixtaregistro' == '#' ? '' : 'umixtaregistro' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Registro del denunciante
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esAdministrador || esRecepcion || esAmpoMixto || esAMPOAMP"
                :to="{ name: 'umixtanoticiashechos' == '#' ? '' : 'umixtanoticiashechos' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">perm_identity</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Noticias de hechos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esAdministrador || esRecepcion || esAmpoMixto ||esAmpoDetenido || esAMPOAMP"
                :to="{ name: 'umixtainiciodetenido' == '#' ? '' : 'umixtainiciodetenido' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">perm_identity</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Inicio con detenido
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="esAdministrador || esDirector || esCoordinador || esAmpoMixto ||esAmpoDetenido"
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Registros
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador || esDirector || esCoordinador || esAmpoMixto ||esAmpoDetenido
              "
                :to="{ name: 'umixtalistaregistros' == '#' ? '' : 'umixtalistaregistros' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Lista de Registros
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador || esDirector || esCoordinador || esAmpoMixto ||esAmpoDetenido
              "
                :to="{ name: 'umixtalapsoatencion' == '#' ? '' : 'umixtalapsoatencion' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">access_time</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Lapsos de atención
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador || esDirector || esCoordinador || esAmpoMixto ||esAmpoDetenido
              "
                :to="{ name: 'umixtaturnos' == '#' ? '' : 'umixtaturnos' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">title</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Turnos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="
            esAdministrador ||
            esDirector ||
            esCoordinador ||
            esAmpoMixto ||esAmpoDetenido ||
            esAmpoIL ||
            esAMPOAMP
          "
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Colaboraciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esCoordinador ||
                esDirector ||
                esAmpoMixto ||esAmpoDetenido ||
                esAmpoIL
              "
                :to="{
                name:
                  'umixtaautorizacioncolaboracion' == '#'
                    ? ''
                    : 'umixtaautorizacioncolaboracion',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">done_all</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Autorizacion de colaboraciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{
                name:
                  'umixtacolaboracionesasignadas' == '#'
                    ? ''
                    : 'umixtacolaboracionesasignadas',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Colaboraciones asignadas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="
            esAdministrador ||
            esDirector ||
            esCoordinador ||
            esRecepcion ||
            esAmpoMixto ||esAmpoDetenido ||
            esAMPOAMP
          "
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Contenciones a personas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esRecepcion ||
                esAmpoMixto ||esAmpoDetenido ||
                esAMPOAMP
              "
                :to="{
                name:
                  'umixtacontencionespersonas' == '#' ? '' : 'umixtacontencionespersonas',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">account_box</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Registro de contenciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="
            esAdministrador ||
            esDirector ||
            esCoordinador ||
            esAmpoMixto ||esAmpoDetenido ||
            esRecepcion ||
            esAmpoIL ||
            esAMPOAMP
          "
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Carpetas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtacarpetas' == '#' ? '' : 'umixtacarpetas' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Lista de carpetas asignadas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL
              "
                :to="{ name: 'umixtabuzonui' == '#' ? '' : 'umixtabuzonui' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Buzón remisión UI
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtacrechazadasui' == '#' ? '' : 'umixtacrechazadasui' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Carpetas devueltas UI
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL
              "
                :to="{
                name: 'umixtahistorialcarpeta' == '#' ? '' : 'umixtahistorialcarpeta',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Historial de carpetas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esRecepcion ||
                esAmpoIL
              "
                :to="{ name: 'umixtareasignacionnuc' == '#' ? '' : 'umixtareasignacionnuc' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Reasignación de NUC
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="
            esAdministrador ||
            esDirector ||
            esCoordinador ||
            esAmpoMixto ||esAmpoDetenido ||
            esRecepcion ||
            esAmpoIL ||
            esAMPOAMP
          "
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Seguimiento a carpetas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{
                name: 'umixtaentrevistainicial' == '#' ? '' : 'umixtaentrevistainicial',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">record_voice_over</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Información general
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    Víctima(s) directa, indirecta, testigo y/o imputado
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{ name: 'umixtavictimaidti' == '#' ? '' : 'umixtavictimaidti' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">person_add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Alta
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{
                  name: 'umixtamediaafiliacion' == '#' ? '' : 'umixtamediaafiliacion',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">face</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Media Filiación
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{ name: 'umixtacedulareporte' == '#' ? '' : 'umixtacedulareporte' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon"
                  >settings_input_antenna</v-icon
                  >
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Cédula de Reporte
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{ name: 'umixtarepresentantes' == '#' ? '' : 'umixtarepresentantes' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">record_voice_over</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Representación jurídica
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{
                  name: 'umixtadatosprotegidos' == '#' ? '' : 'umixtadatosprotegidos',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">https</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Datos Protegidos
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtadeclaracion' == '#' ? '' : 'umixtadeclaracion' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Entrevista y/o Ampliación de entrevista
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtadelito' == '#' ? '' : 'umixtadelito' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">post_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Delito(s)
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtaindicio' == '#' ? '' : 'umixtaindicio' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">policy</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Indicios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title> Diligencias </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{ name: 'umixtadiligencia' == '#' ? '' : 'umixtadiligencia' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">low_priority</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Servicios periciales
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esAMPOAMP ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtadiligenciaforanea' == '#' ? '' : 'umixtadiligenciaforanea',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">low_priority</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Servicios periciales foraneos
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{ name: 'umixtapoliciai' == '#' ? '' : 'umixtapoliciai' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">low_priority</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Policía Investigadora
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL ||
                  esAMPOAMP
                "
                  :to="{ name: 'umixtac5i' == '#' ? '' : 'umixtac5i' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assignment_return</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    C5i Solicitudes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>

            <v-list-group
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL
              "
                no-action
                sub-group
                value="true"
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title> Judicialización </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{ name: 'umixtajaundiencia' == '#' ? '' : 'umixtajaundiencia' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">account_balance</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Audiencia
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtajaudienciainicial' == '#' ? '' : 'umixtajaudienciainicial',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">event_seat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Audiencia Inicial
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtajcapturaeventos' == '#' ? '' : 'umixtajcapturaeventos',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon"
                  >assignment_turned_in</v-icon
                  >
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Captura de eventos
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{ name: 'umixtajcitatorios' == '#' ? '' : 'umixtajcitatorios' }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">contact_mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Citatorios a Juzgados
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name:
                    'umixtajformulacionacusacion' == '#'
                      ? ''
                      : 'umixtajformulacionacusacion',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">list_alt</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Formulación de acusación
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name:
                    'umixtajsolicitudinformacion' == '#'
                      ? ''
                      : 'umixtajsolicitudinformacion',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">how_to_vote</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitud de información
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtamedidascautelares' == '#' ? '' : 'umixtamedidascautelares',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">reorder</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas cautelares
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtahistorialeventos' == '#' ? '' : 'umixtahistorialeventos',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">chrome_reader_mode</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Historial eventos
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL
              "
                :to="{ name: 'umixtajcupres' == '#' ? '' : 'umixtajcupres' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">group_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Cupres
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtadereasignacion' == '#' ? '' : 'umixtadereasignacion' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">cached</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Reasignación dirección de escucha
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtaarchivo' == '#' ? '' : 'umixtaarchivo' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">backup</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Subir archivo
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{
                name:
                  'umixtasolicitudcolaboracion' == '#' ? '' : 'umixtasolicitudcolaboracion',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">featured_play_list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Solicitud de colaboración
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtanotificacion' == '#' ? '' : 'umixtanotificacion' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">notifications</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Notificaciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{
                name: 'umixtacreacionarchivos' == '#' ? '' : 'umixtacreacionarchivos',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">chrome_reader_mode</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Generar Oficio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtabitacorasucesos' == '#' ? '' : 'umixtabitacorasucesos' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">playlist_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Registros
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtacitatorio' == '#' ? '' : 'umixtacitatorio' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Citatorio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtaderivacionjr' == '#' ? '' : 'umixtaderivacionjr' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">low_priority</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Derivación a Justicia Restaurativa
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtavalidateagreement' == '#' ? '' : 'umixtavalidateagreement' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Validación  de acuerdos reparatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||
                esRecepcion || esAmpoIL || esAMPOAMP
              "
                :to="{
                name: 'umixtamedidasproteccion' == '#' ? '' : 'umixtamedidasproteccion',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">accessibility</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Medidas de protección
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              ":to="{ name: 'umixtavehiculos' == '#' ? '' : 'umixtavehiculos' }" active-class="secondary">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">directions_car</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Vehiculos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtaarmasobjetos' == '#' ? '' : 'umixtaarmasobjetos' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">sports_hockey</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Armas u objetos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{
                name: 'umixtadatosrelacionados' == '#' ? '' : 'umixtadatosrelacionados',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">queue_play_next</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Datos Relacionados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esRecepcion ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtaremisionui' == '#' ? '' : 'umixtaremisionui' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">move_to_inbox</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Remisión a Unidad de Investigación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esRecepcion ||
                esAmpoMixto ||
                esAmpoDetenido ||
                esAmpoIL ||
                esAMPOAMP
              "
                :to="{ name: 'umixtaDesgloce' == '#' ? '' : 'umixtaDesgloce' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Generar Desgloce
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    Terminación de la investigación
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAMPOAMP ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtaresolucionlibertad' == '#' ? '' : 'umixtaresolucionlibertad',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">delete_sweep</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Resolución
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="
                  esAdministrador ||
                  esDirector ||
                  esCoordinador ||
                  esAMPOAMP ||
                  esAmpoMixto ||esAmpoDetenido ||
                  esRecepcion ||
                  esAmpoIL
                "
                  :to="{
                  name: 'umixtaacumulacioncarpeta' == '#' ? '' : 'umixtaacumulacioncarpeta',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">delete_sweep</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Acumulación de carpeta
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list-group>
        </template>
        <template
            v-if="
            esAdministrador ||
            esDirector ||
            esCoordinador ||
            esAMPOAMP ||
            esAmpoMixto ||esAmpoDetenido ||
            esRecepcion
          "
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  RACS
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esAMPOAMP ||
                esRecepcion
              "
                :to="{ name: 'umixtalistaracs' == '#' ? '' : 'umixtalistaracs' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Lista de RACS asignados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esAdministrador || esDirector || esCoordinador || esAmpoMixto ||esAmpoDetenido ||esRecepcion"
                :to="{ name: 'umixtareasignacionrac' == '#' ? '' : 'umixtareasignacionrac' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Reasignación de RAC
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="
            esAdministrador ||
            esDirector ||
            esCoordinador ||
            esAmpoMixto ||esAmpoDetenido ||
            esAMPOAMP||
            esRecepcion
          "
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Seguimiento a RAC
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esAMPOAMP ||
                esRecepcion
              "
                :to="{ name: 'umixtainformacionrac' == '#' ? '' : 'umixtainformacionrac' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">record_voice_over</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Información general
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esAMPOAMP ||
                esRecepcion
              "
                :to="{ name: 'umixtavictimaidti2' == '#' ? '' : 'umixtavictimaidti2' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">person_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Alta
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador ||
                esDirector ||
                esCoordinador ||
                esAmpoMixto ||esAmpoDetenido ||
                esAMPOAMP ||
                esRecepcion
              "
                :to="{
                name:
                  'umixtapoliciainvestigadorarac' == '#'
                    ? ''
                    : 'umixtapoliciainvestigadorarac',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">low_priority</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Policía Investigadora
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template v-if="esAdministrador || esCoordinador || esDirector">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Estadísticas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title> Carpetas Iniciadas </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasciniciomes' == '#'
                      ? ''
                      : 'umixtaestadisticasciniciomes',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticascinicioaño' == '#'
                      ? ''
                      : 'umixtaestadisticascinicioaño',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticascinicioaños' == '#'
                      ? ''
                      : 'umixtaestadisticascinicioaños',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title> Envíos a JR </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasenviojrmes' == '#'
                      ? ''
                      : 'umixtaestadisticasenviojrmes',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasenviojraño' == '#'
                      ? ''
                      : 'umixtaestadisticasenviojraño',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasenviojraños' == '#'
                      ? ''
                      : 'umixtaestadisticasenviojraños',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    Carpetas iniciadas y Envíos a jr
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasciejrmes' == '#' ? '' : 'umixtaestadisticasciejrmes',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasciejraño' == '#' ? '' : 'umixtaestadisticasciejraño',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                  v-if="esAdministrador || esCoordinador || esDirector"
                  :to="{
                  name:
                    'umixtaestadisticasciejraños' == '#'
                      ? ''
                      : 'umixtaestadisticasciejraños',
                }"
                  active-class="secondary"
              >
                <v-list-tile-action>
                  <v-icon class="centenarioMenuIcon">assessment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list-group>
        </template>
        <template v-if="esAdministrador || esDirector || esCoordinador">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Busquedas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esAdministrador || esDirector || esCoordinador"
                :to="{ name: 'umixtabusquedanombre' == '#' ? '' : 'umixtabusquedanombre' }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">find_in_page</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Busqueda por nombre
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template
            v-if="esDirector || esCoordinador || esProcurador"
        >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Tablero de inactividad
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esProcurador"
                :to="{
                name: 'umixtatablerodirecciond' == '#' ? '' : 'umixtatablerodirecciond',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Direcciónes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="esAdministrador || esDirector || esProcurador"
                :to="{
                name: 'umixtatablerodirecciona' == '#' ? '' : 'umixtatablerodirecciona',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Agencias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                v-if="
                esAdministrador || esDirector || esCoordinador || esProcurador
              "
                :to="{
                name: 'umixtatablerodireccionm' == '#' ? '' : 'umixtatablerodireccionm',
              }"
                active-class="secondary"
            >
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Modulos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <v-list-tile
            v-if="
            esAdministrador ||
            esAmpoMixto ||esAmpoDetenido ||
            esDirector ||
            esCoordinador ||
            esAmpoIL
          "
            :to="{ name: 'umixtajcalendario' == '#' ? '' : 'umixtajcalendario' }"
            active-class="secondary"
        >
          <v-list-tile-action>
            <v-icon class="centenarioMenuIcon">date_range</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="centenarioMenuModules">
              Agenda
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile
          v-if="
            esDirector
          "
          :to="{ name: 'umixtarotacionpersonal' == '#' ? '' : 'umixtarotacionpersonal' }"
          active-class="secondary"
        >
          <v-list-tile-action>
            <v-icon class="centenarioMenuIcon">groups</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="centenarioMenuModules">
              Rotación de Personal
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

        <v-list-tile
            v-if="
            esAdministrador ||
            esAmpoMixto ||esAmpoDetenido ||
            esDirector ||
            esCoordinador ||
            esRecepcion ||
            esAMPOAMP
          "
            :to="{ name: 'umixtahistorialactualizaciones' == '#' ? '' : 'umixtahistorialactualizaciones' }"
            active-class="secondary"
        >
          <v-list-tile-action>
            <v-icon class="centenarioMenuIcon">history</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="centenarioMenuModules">
              Historial de actualizaciónes
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- <v-list-tile
          v-if="
            esAdministrador ||
            esAmpoMixto ||esAmpoDetenido ||
            esDirector ||
            esCoordinador ||
            esRecepcion ||
            esAMPOAMP
          "
          :to="{ name: 'umixtabusquedanuc' == '#' ? '' : 'umixtabusquedanuc' }"
          active-class="secondary"
          >
          <v-list-tile-action>
            <v-icon class="centenarioMenuIcon">policy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="centenarioMenuModules">
              Busqueda de NUC
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

      </v-list>
    </v-navigation-drawer>
</template>

<script>
import Loader from "./modulo/_loader.vue";
import axios from "axios";

export default {
  name: "umixtaNavDrawer",
  components: { Loader },
  data() {
    return {
      drawer: true,
      right: null,
      title: "Vuetify.js",

      data: function () {
        return {
          sideNav: false,
          appName: "Centro de atencion temprana",
          Loader: true,
        };
      },
      created: function () {
        ///////////////////////////////////////////////////////////////
        // Add a request interceptor
        axios.interceptors.request.use(
            (config) => {
              // Do something before request is sent
              console.log(config);
              this.$store.commit("LOADER", true);
              return config;
            },
            (error) => {
              // Do something with request error
              this.$store.commit("LOADER", false);
              return Promise.reject(error);
            }
        );
        // Add a response interceptor
        axios.interceptors.response.use(
            (response) => {
              console.log(response);
              this.$store.commit("LOADER", false);
              // Do something with response data
              return response;
            },
            (err) => {
              // Do something with response error
              return new Promise((resolve, reject) => {
                this.$store.dispatch("logout").then(() => {
                  this.$router.push("/login");
                });
                throw err;
              });
            }
        );
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // Add a request interceptor
        this.$conf.interceptors.request.use(
            (config) => {
              // Do something before request is sent
              console.log(config);
              this.$store.commit("LOADER", true);
              return config;
            },
            (error) => {
              // Do something with request error
              this.$store.commit("LOADER", false);
              return Promise.reject(error);
            }
        );
        // Add a response interceptor
        this.$conf.interceptors.response.use(
            (response) => {
              console.log(response);
              this.$store.commit("LOADER", false);
              // Do something with response data
              return response;
            },
            (error) => {
              // Do something with response error
              return new Promise((resolve, reject) => {
                this.$store.dispatch("logout").then(() => {
                  this.$router.push("/login");
                });
                throw err;
              });
            }
        );
        ///////////////////////////////////////////////////////////////
      },
    };
  },
  computed: {
    logueado() {
      return this.$store.state.usuario;
    },
    esAdministrador() {
      return (
          this.$store.state.usuario &&
          this.$store.state.usuario.rol == "Administrador"
      );
    },
    esRecepcion() {
      return (
          this.$store.state.usuario &&
          this.$store.state.usuario.rol == "Recepción"
      );
    },
    esAMPOAMP() {
      return (
          this.$store.state.usuario && this.$store.state.usuario.rol == "AMPO-AMP"
      );
    },
    esDirector() {
      return (
          this.$store.state.usuario && this.$store.state.usuario.rol == "Director"
      );
    },
    esCoordinador() {
      return (
          this.$store.state.usuario &&
          this.$store.state.usuario.rol == "Coordinador"
      );
    },
    esAmpoMixto() {
      return (
          this.$store.state.usuario &&
          this.$store.state.usuario.rol == "AMPO-AMP Mixto"
      );
    },
    esAmpoIL() {
      return (
          this.$store.state.usuario && this.$store.state.usuario.rol == "AMPO-IL"
      );
    },
    esProcurador() {
      return (
          this.$store.state.usuario &&
          this.$store.state.usuario.rol == "Procurador"
      );
    },
    esAmpoDetenido() {
      return (
          this.$store.state.usuario &&
          this.$store.state.usuario.rol == "AMPO-AMP Detenido"
      );
    },
    usuario() {
      return this.$store.state.usuario.usuario;
    },
    email() {
      return this.$store.state.usuario.email;
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
    //AXIOS PARA PODER
  },
  methods: {
    salir() {
      this.$store.dispatch("salir");
      this.$controlacceso.get('api/Usuarios/DistrictUser')
          .then(response => {
            window.location.href = response.data.direccion
          })
    },
  },
};
// reasignacion de nuc, solo ver recepcion, director, coordinador,
// menos en SP PI
</script>

<style scoped>

</style>