

<template>
  <!--<v-app id="app">-->
    <!--<v-toolbar flat class="grey lighten-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="grey--text" />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light btn_sisC" @click="salir">SISTEMA CENTENARIO</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="logueado" flat icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'login' }" v-else flat icon>
        <v-icon>vpn_key</v-icon>
      </v-btn>
      <v-menu offset-y right v-if="logueado" flat transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-card min-width="300" class="mx-auto">
          <v-toolbar prominent card dark color="grey lighten-4 primary--text">
            <v-avatar size="50">
              <v-icon size="36" class="grey lighten-2 centenarioToolBarIcon"
                >person</v-icon
              >
            </v-avatar>
            <v-toolbar-title class="body-1 font-weight-medium">
              {{ usuario }}
              <p class="caption font-weight-light">
                <a>{{ email }}</a>
              </p>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="centenarioToolBarIcon">build</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <p class="body-2 font-weight-bold"><a>Mi cuenta</a></p>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <p color="accent" class="caption font-weight-regular">
                      <a>Configuración de tu cuenta.</a>
                    </p>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="centenarioToolBarIcon">help</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <p class="body-2 font-weight-bold"><a>Ayuda</a></p>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <p color="accent" class="caption font-weight-regular">
                      <a>Manual de usuario</a>
                    </p>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="salir">
                <v-list-tile-action>
                  <v-icon class="centenarioToolBarIcon"
                    >power_settings_new</v-icon
                  >
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <p class="body-2 font-weight-bold"><a>Cerrar sesión</a></p>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-divider class="mx-0" />
          <v-card-actions>
            <v-spacer />
            <v-btn class="mx-3" small outline color="accent"> Cerrar </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>-->

    <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary">

      <div class="text-xl-center text-md-center text-xs-center my-4">
        <a href="/Panel"><img src="@/assets/Logo.png" height="110px" alt="" /></a>
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
          <!--<v-list-group>-->
            <v-list-group :value="isActiveRoute(['umixtaregistro', 'umixtanoticiashechos', 'umixtainiciodetenido'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtaregistro']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtanoticiashechos']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtainiciodetenido']) }"
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
          <v-list-group :value="isActiveRoute(['listaregistros', 'lapsoatencion', 'turnos'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtalistaregistros']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtalapsoatencion']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtaturnos']) }"
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
          <v-list-group :value="isActiveRoute(['umixtaautorizacioncolaboracion', 'umixtacolaboracionesasignadas'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtaautorizacioncolaboracion']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtacolaboracionesasignadas']) }"
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
          <v-list-group :value="isActiveRoute('umixtacontencionespersonas')">
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
                :class="{ 'secondary': isActiveRoute(['umixtacontencionespersonas']) }"
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
          <v-list-group :value="isActiveRoute(['umixtacarpetas', 'umixtabuzonui', 'umixtacrechazadasui', 'umixtahistorialcarpeta', 'umixtareasignacionnuc'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtacarpetas']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtabuzonui']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtacrechazadasui']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtahistorialcarpeta']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtareasignacionnuc']) }"
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
          <v-list-group :value="isActiveRoute(
              ['umixtaentrevistainicial', 'umixtavictimaidti', 'umixtamediaafiliacion', 'umixtacedulareporte', 'umixtarepresentantes', 'umixtadatosprotegidos',
                'umixtadeclaracion', 'umixtadelito', 'umixtaindicio', 'umixtadiligencia', 'umixtadiligenciaforanea', 'umixtapoliciai', 'umixtac5i', 'umixtajaundiencia', 'umixtajaudienciainicial',
                'umixtajcapturaeventos', 'umixtajcitatorios', 'umixtajformulacionacusacion', 'umixtajsolicitudinformacion', 'umixtamedidascautelares', 'umixtahistorialeventos',
                'umixtajcupres', 'umixtadereasignacion', 'umixtaarchivo', 'umixtasolicitudcolaboracion', 'umixtanotificacion', 'umixtacreacionarchivos', 'umixtabitacorasucesos',
                'umixtacitatorio', 'umixtaderivacionjr', 'umixtamedidasproteccion', 'umixtavehiculos', 'umixtaarmasobjetos', 'umixtadatosrelacionados', 'umixtaremisionui',
                'umixtaDesgloce', 'umixtaresolucionlibertad', 'umixtaacumulacioncarpeta'
              ])">
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
              :class="{ 'secondary': isActiveRoute(['umixtaentrevistainicial']) }"
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
            <v-list-group no-action sub-group :value="isActiveRoute(['umixtavictimaidti', 'umixtamediaafiliacion', 'umixtacedulareporte', 'umixtarepresentantes', 'umixtadatosprotegidos'])">
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
                  :class="{ 'secondary': isActiveRoute(['umixtavictimaidti']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtamediaafiliacion']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtacedulareporte']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtarepresentantes']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtadatosprotegidos']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtadeclaracion']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtadelito']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtaindicio']) }"
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
            <v-list-group no-action sub-group :value="isActiveRoute(['umixtadiligencia', 'umixtadiligenciaforanea', 'umixtapoliciai', 'umixtac5i'])">
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
                  :class="{ 'secondary': isActiveRoute(['umixtadiligencia']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtadiligenciaforanea']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtapoliciai']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtac5i']) }"
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
                :value="isActiveRoute(['umixtajaundiencia', 'umixtajaudienciainicial', 'umixtajcapturaeventos', 'umixtajformulacionacusacion', 
                                      'umixtajsolicitudinformacion', 'umixtamedidascautelares', 'umixtahistorialeventos', 'umixtajcitatorios'])"
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
                  :class="{ 'secondary': isActiveRoute(['umixtajaundiencia']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtajaudienciainicial']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtajcapturaeventos']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtajcitatorios']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtajformulacionacusacion']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtajsolicitudinformacion']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtamedidascautelares']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtahistorialeventos']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtajcupres']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtadereasignacion']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtaarchivo']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtasolicitudcolaboracion']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtanotificacion']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtacreacionarchivos']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtabitacorasucesos']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtacitatorio']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtaderivacionjr']) }"
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
              ":to="{ name: 'umixtavehiculos' == '#' ? '' : 'umixtavehiculos' }" :class="{ 'secondary': isActiveRoute(['umixtavehiculos']) }">
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
                :class="{ 'secondary': isActiveRoute(['umixtaarmasobjetos']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtadatosrelacionados']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtaremisionui']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtaDesgloce']) }"
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

            <v-list-group no-action sub-group :value="isActiveRoute(['umixtaresolucionlibertad', 'umixtaacumulacioncarpeta'])">
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
                  :class="{ 'secondary': isActiveRoute(['umixtaresolucionlibertad']) }"
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
                  :class="{ 'secondary': isActiveRoute(['umixtaacumulacioncarpeta']) }"
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
          <v-list-group :value="isActiveRoute(['umixtalistaracs', 'umixtareasignacionrac'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtalistaracs']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtareasignacionrac']) }"
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
          <v-list-group :value="isActiveRoute(['umixtainformacionrac', 'umixtavictimaidti2', 'umixtapoliciainvestigadorarac'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtainformacionrac']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtavictimaidti2']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtapoliciainvestigadorarac']) }"
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
          <v-list-group :value="isActiveRoute(['umixtaestadisticasciniciomes', 'umixtaestadisticascinicioaño', 'umixtaestadisticascinicioaños',
                                                'umixtaestadisticasenviojrmes','umixtaestadisticasenviojraño', 'umixtaestadisticasenviojraños', 
                                                'umixtaestadisticasciejrmes', 'umixtaestadisticasciejraño', 'umixtaestadisticasciejraños'
          ])">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Estadísticas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-group no-action sub-group :value="isActiveRoute(['umixtaestadisticasciniciomes', 'umixtaestadisticascinicioano', 'umixtaestadisticascinicioanos'])">
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
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticasciniciomes']) }"
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
                    'umixtaestadisticascinicioano' == '#'
                      ? ''
                      : 'umixtaestadisticascinicioano',
                }"
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticascinicioano']) }"
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
                    'umixtaestadisticascinicioanos' == '#'
                      ? ''
                      : 'umixtaestadisticascinicioanos',
                }"
                  :class="{ 'secondary': isActiveRoute(['estadisticascinicioanos']) }"
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
            <v-list-group no-action sub-group :value="isActiveRoute(['umixtaestadisticasenviojrmes', 'umixtaestadisticasenviojrano', 'umixtaestadisticasenviojranos'])">
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
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticasenviojrmes']) }"
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
                    'umixtaestadisticasenviojrano' == '#'
                      ? ''
                      : 'umixtaestadisticasenviojrano',
                }"
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticasenviojrano']) }"
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
                    'umixtaestadisticasenviojranos' == '#'
                      ? ''
                      : 'umixtaestadisticasenviojranos',
                }"
                  :class="{ 'secondary': isActiveRoute(['estadisticasenviojranos']) }"
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
            <v-list-group no-action sub-group :value="isActiveRoute(['umixtaestadisticasciejrmes', 'umixtaestadisticasciejrano', 'umixtaestadisticasciejranos'])">
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
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticasciejrmes']) }"
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
                    'umixtaestadisticasciejrano' == '#' ? '' : 'umixtaestadisticasciejrano',
                }"
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticasciejrano']) }"
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
                    'umixtaestadisticasciejranos' == '#'
                      ? ''
                      : 'umixtaestadisticasciejranos',
                }"
                  :class="{ 'secondary': isActiveRoute(['umixtaestadisticasciejranos']) }"
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
          <v-list-group :value="isActiveRoute('umixtabusquedanombre')">
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
                :class="{ 'secondary': isActiveRoute(['umixtabusquedanombre']) }"
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
            v-if="esDirector || esCoordinador || esProcurador || esAdministrador"
        >
          <v-list-group :value="isActiveRoute(['umixtatablerodirecciond', 'umixtatablerodirecciona', 'umixtatablerodireccionm'])">
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
                :class="{ 'secondary': isActiveRoute(['umixtatablerodirecciond']) }"
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
                :class="{ 'secondary': isActiveRoute(['umixtatablerodirecciona']) }"
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
              :class="{ 'secondary': isActiveRoute(['umixtatablerodireccionm']) }"
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


        <!-- <template v-if="esDirector">
          <v-list-group :value="isActiveRoute(['rotacionpersonal', 'clonacionesfallidas'])">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuAreas">
                  Rotación de personal
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esDirector" :class="{ 'secondary': isActiveRoute(['rotacionpersonal']) }" @click="navigateTo('rotacionpersonal')"> 
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">account_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Edición de usuario
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esDirector" :class="{ 'secondary': isActiveRoute(['clonacionesfallidas']) }" @click="navigateTo('clonacionesfallidas')">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">report</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Clonaciones fallidas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template> -->


        <v-list-tile
            v-if="
            esAdministrador ||
            esAmpoMixto ||esAmpoDetenido ||
            esDirector ||
            esCoordinador ||
            esAmpoIL
          "
            :to="{ name: 'umixtajcalendario' == '#' ? '' : 'umixtajcalendario' }"
            :class="{ 'secondary': isActiveRoute(['umixtajcalendario']) }"
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
            :class="{ 'secondary': isActiveRoute(['umixtahistorialactualizaciones']) }"
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
          :class="{ 'secondary': isActiveRoute(['umixtabusquedanuc']) }"
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
    <!--<v-content class="grey lighten-4">
      <v-divider />
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
        <loader />
      </v-container>
    </v-content>-->
    <!--</v-app>-->
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
    isActiveRoute(routeNames) {
      return Array.isArray(routeNames)
        ? routeNames.includes(this.$route.name)
        : this.$route.name === routeNames;
    },
    navigateTo(routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName }).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            console.error(err);
          }
        });
      }
    }
  },
};
// reasignacion de nuc, solo ver recepcion, director, coordinador,
// menos en SP PI
</script>

<style scoped>
.btn_sisC:hover {
  cursor: pointer
}
</style>