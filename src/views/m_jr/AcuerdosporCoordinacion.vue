<template>
    <v-layout align-start>
        <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary"  >
      <div class="text-xl-center text-md-center text-xs-center my-4">
        <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
      </div>

      <v-list dense dark class="pt-0 primary" >
         <template>
          <v-list-tile  :to="{name:'justicia-restaurativa'}">
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
          </v-list-tile>
        </template>   
         <template  v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esRecepcion || esFacilitador || esFacilitadorMixto">
          <v-list-group>
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Recepción de expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esJuridico ||  esCoordinador || esRecepcion || esFacilitador  || esFacilitadorMixto" :to="{ name: 'jr-expedientessolicitados'== '#' ? '' :  'jr-expedientessolicitados'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">format_list_numbered</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Expedientes solicitados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esDirector || esJuridico || esCoordinador || esRecepcion|| esFacilitador  || esFacilitadorMixto" :to="{ name: 'jr-asignacionexpediente'== '#' ? '' :  'jr-asignacionexpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">format_list_numbered</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Asignación de expediente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
           <!--  <v-list-tile v-if="esAdministrador || esDirector || esJuridico || esCoordinador" :to="{ name: 'reasignacionexpediente'== '#' ? '' :  'reasignacionexpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">format_list_numbered</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Re-Asignación de expediente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>   -->
          </v-list-group>
        </template>



         <template  v-if="esAdministrador || esDirector || esJuridico|| esCoordinador|| esRecepcion || esFacilitador|| esFacilitadorMixto || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Gestión de expedientes y derivaciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esJuridico || esCoordinador|| esRecepcion|| esFacilitador || esFacilitadorMixto || esUSAR|| esRecepcion" :to="{ name: 'jr-derivaciones'== '#' ? '' :  'jr-derivaciones'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">repeat</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Derivaciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 


            <v-list-tile v-if="esAdministrador || esDirector  || esJuridico || esCoordinador|| esRecepcion || esFacilitador|| esFacilitadorMixto || esUSAR|| esRecepcion" :to="{ name: 'jr-consultarExpediente'== '#' ? '' :  'jr-consultarExpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">search</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Consultar expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            <v-list-tile v-if="esAdministrador || esDirector || esJuridico ||  esCoordinador" :to="{ name: 'jr-rezago'== '#' ? '' :  'jr-rezago'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">timelapse</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Expedientes con rezago
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 



      

            
        
              


          

             
     
           </v-list-group>
        </template>
        <template  v-if="esAdministrador || esNotificador || esFacilitador || esFacilitadorMixto ">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador ||  esNotificador|| esFacilitador || esFacilitadorMixto" :to="{ name: 'jr-listacitatorios'== '#' ? '' :  'jr-listacitatorios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Lista de citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
          </v-list-group>
        </template>

        <template v-if="esAdministrador || esDirector || esCoordinador || esJuridico">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Coordinador y/o Juridico
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="esAdministrador || esDirector || esCoordinador || esJuridico " :to="{ name: 'jr-coordinadorJuridico'== '#' ? '' :  'jr-coordinadorJuridico'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Validación  de acuerdos reparatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile v-if="esAdministrador || esDirector || esFacilitador || esCoordinador" :to="{ name: 'jr-acuerdosporCoordinacion'== '#' ? '' :  'jr-acuerdosporCoordinacion'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Acuerdos por coordinación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
         <template v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Expedientes aceptados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'jr-expedientesaceptados'== '#' ? '' :  'jr-expedientesaceptados'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Expedientes para contestar 
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>
        </template>
        <template v-if="esFacilitador || esNotificador || esFacilitadorMixto || esAdministrador">
          <v-list-group>
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Mis expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'jr-misexpedientes'== '#' ? '' :  'jr-misexpedientes'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Mi lista de expedientes asignados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>
        </template>
        <template  v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esFacilitador|| esFacilitadorMixto || esNotificador || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Seguimiento a expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esFacilitador || esFacilitadorMixto|| esNotificador || esUSAR" :to="{ name: 'jr-informacionexpediente'== '#' ? '' :  'jr-informacionexpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Información del expediente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-sesiones'== '#' ? '' :  'jr-sesiones'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Sesión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador  || esFacilitador|| esFacilitadorMixto  || esUSAR" :to="{ name: 'jr-citatoriosrecordatorios'== '#' ? '' :  'jr-citatoriosrecordatorios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Citatorios, Recordatorios y Hoja de Registro
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            


           
          

        
              


            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-acuerdoreparatorio'== '#' ? '' :  'jr-acuerdoreparatorio'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Acuerdo reparatorio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 


             
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador  || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-seguimientocumplimiento'== '#' ? '' :  'jr-seguimientocumplimiento'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">post_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Seguimiento a cumplimiento
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>   
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-registroconclusion'== '#' ? '' :  'jr-registroconclusion'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Registro de conclusión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
             <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esUSAR" :to="{ name: 'jr-informarAMPO'== '#' ? '' :  'jr-informarAMPO'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Respuesta para AMPO
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esUSAR || esFacilitador || esFacilitadorMixto" :to="{ name: 'jr-registros'== '#' ? '' :  'jr-registros'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Registros
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

          </v-list-group>
        </template> 
        <template v-if="esAdministrador || esDirector || esCoordinador  || esFacilitador || esFacilitadorMixto">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Agenda
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
           <v-list-tile v-if="esFacilitador || esFacilitadorMixto" :to="{ name: 'jr-agenda'== '#' ? '' :  'jr-agenda'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Mi agenda
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
               <v-list-tile  v-if="esAdministrador || esDirector || esCoordinador" :to="{ name: 'jr-agendaglobal'== '#' ? '' :  'jr-agendaglobal'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Agenda global
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

          </v-list-group>
        </template>
         <template v-if="esAdministrador || esDirector  || esUSAR ">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 USAR
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-list-tile :to="{ name: 'jr-agendaseguimientos'== '#' ? '' :  'jr-agendaseguimientos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Agenda de seguimiento
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

           <v-list-tile :to="{ name: 'jr-gestionseguimiento'== '#' ? '' :  'jr-gestionseguimiento'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">post_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Gestión de seguimiento
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

          </v-list-group>
        </template>
     
         <template v-if="esAdministrador || esDirector || esUSAR ">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Estadísticas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esUSAR " :to="{ name: 'jr-asistencia'== '#' ? '' :  'jr-asistencia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">bar_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Asistencia de citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile v-if="esAdministrador || esDirector || esUSAR " :to="{ name: 'jr-entregas'== '#' ? '' :  'jr-entregas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">bar_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Entrega de citatorios.
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  

            <v-list-tile v-if="esAdministrador || esDirector || esUSAR  " :to="{ name: 'jr-einforme'== '#' ? '' :  'jr-einforme'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">bar_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Informe
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile v-if="esAdministrador || esDirector || esUSAR " :to="{ name: 'jr-informefacilitador'== '#' ? '' :  'jr-informefacilitador'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">timeline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Informe por facilitador
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            
          

          </v-list-group>
        </template>

        <template v-if="esAdministrador || esDirector || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Monitoreo de AR a nivel estado
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esUSAR" :to="{ name: 'jr-monitoreoxdistrito'== '#' ? '' :  'jr-monitoreoxdistrito'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Monitoreo por distrito
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  

          </v-list-group>
        </template>

        <template v-if="esAdministrador || esDirector">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Configuración
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador" :to="{ name: 'jr-facilitadoresnotificadores'== '#' ? '' :  'jr-facilitadoresnotificadores'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Facilitadores y notificadores
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  

          </v-list-group>
        </template>

        <v-list-tile 
          v-if="esAdministrador 
          || esDirector 
          || esJuridico 
          ||  esCoordinador 
          || esRecepcion 
          || esFacilitador  
          || esFacilitadorMixto" 
          :to="{ name: 'jr-historialactualizaciones'== '#' ? '' :  'jr-historialactualizaciones'}"  
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

        
      </v-list>

    </v-navigation-drawer>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Validación de acuerdos reparatorios.</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-autocomplete
                    v-if="editedIndex==-1"
                    name="Distrito"
                    :items="CoorDis"
                    v-model="DistritosP"
                    label="Distrito"
                    v-validate="'required'"
                    :error-messages="errors.collect('Distrito')"
                  />
                  <v-btn v-if="editedIndex==-1" @click="listar(DistritosP)"   tile large  icon>
                    <v-icon>search</v-icon>
                  </v-btn>
                <v-spacer />
                <v-text-field v-if="editedIndex==-1" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line />
                <v-spacer />
                <v-tooltip bottom>
                    <template v-if="editedIndex==1" v-slot:activator="{ on }"> 
                        <v-btn class="mx-2" slot="activator" v-on="on" @click.native="imprimirAR()" fab dark small color="primary">
                            <v-icon dark>print</v-icon>
                        </v-btn>
                    </template>
                    <span>Imprimir</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-if="editedIndex==1" v-slot:activator="{ on }"> 
                        <v-btn class="mx-2" slot="activator" v-on="on" @click.native="editedIndex=-1" fab dark small color="success">
                            <v-icon dark>undo</v-icon>
                        </v-btn>
                    </template>
                    <span>Regresar</span>
                </v-tooltip>
            </v-toolbar>
            <v-card>            
                <v-container>
                    <v-layout row wrap>
                        <v-flex v-if="editedIndex==-1" xl12 lg12 md12 sm12  xs12> 
                            <v-data-table
                                :headers="headers"
                                :items="acuerdos"
                                :search="search"  return-object
                                :rows-per-page-items="rowsPerPageItems"
                                :pagination.sync="pagination"  
                            >
                                <template slot="items" class="white" slot-scope="props">
                                    <td>{{ props.item.noExpediente }}</td>
                                    <td>{{ props.item.nuc }}</td>         
                                    <td>{{ props.item.montoTotal }}</td>
                                    <td>{{ formatearfechahora(props.item.fechaCelebracionAcuerdo) }}</td>
                                    <td>{{ formatearfechahora(props.item.fechaLimiteCumplimiento) }}</td>
                                    <td>{{ props.item.nosise }}</td>
                                    <td>{{ formatearfechahora(props.item.fechasise) }}</td>
                                    <td>
                                        <template v-if="props.item.statusRespuestaCoordinadorJuridico==null">
                                            <v-icon color="default">
                                                remove
                                            </v-icon>
                                        </template>
                                        <template v-if="props.item.statusRespuestaCoordinadorJuridico=='Autorizado'">
                                            <v-icon color="success">
                                                check_circle
                                            </v-icon>
                                        </template> 
                                        <template v-if="props.item.statusRespuestaCoordinadorJuridico=='No autorizado'">
                                            <v-icon color="error">
                                                cancel
                                            </v-icon>
                                        </template>
                                    </td>        
                                    <td class="justify-center layout px-0"> 
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="mr-2" v-on="on" color="warning" @click="mostrar(props.item)">
                                                    remove_red_eye
                                                </v-icon> 
                                            </template>
                                            <span>Visualizar acuerdo reparatorio</span>
                                        </v-tooltip>    
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="mr-2" v-on="on" color="default" @click="validacion(props.item)">
                                                    autorenew
                                                </v-icon> 
                                            </template>
                                            <span>Respuesta</span>
                                        </v-tooltip> 
                                    </td>   
                                </template>
                              
                            </v-data-table>  
                        </v-flex>
                        <v-flex v-if="editedIndex==1" xl6 lg6 md6 sm12  xs12>           
                            <v-list one-line>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="default">event</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Docuemnto:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_tipodocumento}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="default">event</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Fecha de celebración del acuerdo:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_fechaCelebracionAcuerdo}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Solicitantes:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_nombreSolicitante }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Status de conclusión:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_statusConclusion }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Como va a pagar:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_tipoPago }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Monto cantidad total:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_montoTotal }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>No. de parcialidad:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_noTotalParcialidades }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                            </v-list>
                        </v-flex>
                        <v-flex v-if="editedIndex==1" xl6 lg6 md6 sm12 xs12>
                            <v-list one-line>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="default">access_time</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Hora de celebración:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_fechaCelebracionAcuerdo }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Requeridos:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_nombreRequerdio }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Metodo utilizado:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_metodoUtilizado }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">event</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Fecha limite de cumplimiento:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_fechaLimiteCumplimiento}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default" />
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Periodo de pago:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_periodo }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-divider inset />
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex> 
        <v-dialog v-model="dialog" max-width="700px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                        <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading">Validación de acuerdo reparatorio</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <h3>No de expediente: {{ this.v_noExpediente }}</h3>
                                    <v-autocomplete name="status de validación"
                                        :items="v_statusValidaciones"
                                        v-model="v_statusValidacion"  
                                        label="Status de validacion:" 
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('status de validación')"
                                    />
                                    <v-textarea
                                        outline
                                        name="respuesta"
                                        label="Respuesta" 
                                        v-model="v_respuesta"  
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('respuesta')"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click.native="close" >Cancelar</v-btn>
                            <v-btn @click.native="guardar(DistritosP)" class="success">Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text> 
            </v-card>
        </v-dialog>   
        <v-dialog v-model="modal_AR" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                        <v-btn icon @click="modal_AR= false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdfAR" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout> 
</template>

 
<script>  
    import axios from 'axios'  
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    import VeeValidate from 'vee-validate' 
    import { error } from 'util';
    //** COMPONENTES */
    import n401 from '../../components/m_jr/401'
    import n403 from '../../components/m_jr/403' 
    import infoUsuario from '../../components/m_jr/InfoUsuario'
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import { NumberAsString } from './NumerosLetras'

    export default {
        components: {  
            n401,
            n403,
            infoUsuario,
        },
    data: function () {
        return {
            e401: false, 
            e403: false,
            showpage: true, 
            dialog: false,
            dialogSISE: false,
            adModal: 0,
            adAccion: 0,
            addModulo: '',
            modal_AR: false,
            logo1: '',
            logo2: '',
            direccionAgencia: '',
            telefonosAgencia: '', 
            nombreDSP: '',
            contactoDSP: '',
            customToolbar: [ 
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }  ], 
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }  ],  
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }], 
                [{ 'color': [] }, { 'background': [] }], 
            ],
            //**************************************
            // VARIABLES DE LA TABLA DE MODULOS*/
            //**************************************
            headers: [ 
                { text: 'No Expediente', value: 'noExpediente' },  
                { text: 'NUC', value: 'nuc' }, 
                { text: 'Monto total', value: 'montoTotal' },   
                { text: 'Fecha celebracion', value: 'fechaCelebracionAcuerdo' },   
                { text: 'Fecha cumplimiento', value: 'fechalimiteCumplimiento' },   
                { text: 'SISE', value: 'nosise' },   
                { text: 'Fecha SISE', value: 'fechasise' },   
                { text: 'Status', value: 'statusRespuestaCoordinadorJuridico' },   
                { text: 'Opciones', value: 'opciones' },                 
            ],
            search: '',
            rowsPerPageItems: [ 10, 20, 30, 40, 50 ],
            pagination: {
                rowsPerPage: 20
            },
            v_idAcuerdoReparatorio: '',
            acuerdos: [],
            v_statusValidaciones: [ 'Autorizado', 'No autorizado' ],
            v_statusValidacion: '',
            v_respuesta: '',
            v_envioId: '',
            v_nombreSolicitante: '',
            v_solicitantes: [],
            v_solicitantesR: [],
            v_solicitantesAR: [],
            v_nombreRequerdio: '',
            v_requeridos: [],
            v_requeridosR: [],
            v_requeridosAR: [],
            v_nuc: '',
            v_noExpediente: '',
            v_statusConclusion: '',
            v_tipoPago: '',
            v_statusCumplimiento: '',
            v_metodoUtilizado: '',
            v_montoTotal: '',
            v_noTotalParcialidades: '',
            v_periodo: '',
            v_fechaCelebracionAcuerdo: '',
            v_fechaLimiteCumplimiento: '',
            v_uf_Distrito: '',
            v_uf_DirSubProc: '',
            v_uf_Agencia: '',
            v_uf_Modulo: '',
            v_uf_Nombre: '',
            v_uf_Puesto: '',
            v_delitos: '',
            v_textoAR: '',
            //*************** */
            v_AutoridadqueDeriva: '',
            v_uqe_Distrito: '',
            v_uqe_DirSubProc: '',
            v_uqe_Agencia: '',
            v_uqe_Modulo: '',
            v_uqe_Nombre: '',
            v_uqe_Puesto: '',
            v_StatusGeneral: '',
            v_RespuestaExpediente: '',
            v_FechaRegistro: '',
            v_FechaCierre: '',
            //*************** */
            v_textoAlternativo: '',
            editedIndex: -1, 
            v_tipodocumento: 'Acuerdo reparatorio',
            CoorDis: [],
            ArrayDistritos: [],
            DistritosP: '',
            direccionP: [],
            DireccionPR: [],
        };
    },
    mounted(){
      if (!localStorage.getItem('pageReloaded')) {
        localStorage.setItem('pageReloaded', 'true');
        window.location.reload();
      } else {
        localStorage.removeItem('pageReloaded');
      }
    },
    created () { 
        const token = this.$store.state.token || localStorage.getItem("token");
        if(token)
        { 
          this.$store.dispatch("guardarToken", token)
          this.$store.dispatch("setLogin", token)
        }
        else 
        { 
          this.$router.push({ name: 'login' });
        }
        let me = this  
        me.u_iddistrito = me.$store.state.usuario.iddistrito;
        me.u_distrito = me.$store.state.usuario.distrito;
        me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
        me.u_idagencia = me.$store.state.usuario.idagencia;
        me.u_agencia = me.$store.state.usuario.agencia;
        me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
        me.u_modulo = me.$store.state.usuario.modulo;
        me.u_idusuario = me.$store.state.usuario.idusuario;
        me.u_nombre = me.$store.state.usuario.usuario;
        me.u_clave = me.$store.state.usuario.clave;
        me.u_rol = me.$store.state.usuario.rol;
        me.u_puesto = me.$store.state.usuario.puesto;
        me.u_email = me.$store.state.usuario.email;
        //*********************************************** */ 
        me.listarDistritos(); 
        me.listarLogo();
        me.informacionagencia(); 
  
          // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
        axios.interceptors.request.use( (config)=> { 
          me.$store.commit('LOADER',true);
          return config;
        }, (error)=> {  
          me.$store.commit('LOADER',false);
          return Promise.reject( error);
        }); 
          axios.interceptors.response.use((response)=>{ 
          me.$store.commit('LOADER',false); 
          return response;
        },  (error)=> {  
          me.$store.commit('LOADER',false); 
          return Promise.reject(error);
        });
      
     

    },
    computed: {
        logueado(){
      return this.$store.state.usuario;
    },
    esAdministrador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
    },
    esDirector(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
    },
    esCoordinador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
    },
    esUSAR(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='USAR';
    },
    esJuridico(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Jurídico';
    },
    esRecepcion(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
    }, 
     esFacilitador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
    },
     esFacilitadorMixto(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador-Mixto';
    },
     esNotificador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Notificador';
    },
    usuario(){
      return this.$store.state.usuario.usuario;
    },
    drawer(){
      return this.$store.state.drawer
    }
    },

    watch: {
     dialog (val) {
       val || this.close()
     },
     modalInfo(val){
       val || this.close()
     },
    },
    methods:{ 
        listarLogo(){ 
            let me=this; 
            this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;
                
            }).catch(function(error){
                me.$notify('Error al leer la configuracion global !!!','error')    
            });
        }, 
        informacionagencia(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
                me.contactoDSP=response.data.contacotDirSub;
                me.nombreDSP=response.data.nombreDirSub;
            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
            });
        }, 
        listar () {
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header }; 
            me.acuerdos = [];
            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/Acuerdosxdistrito/'+ me.DistritosP, configuracion).then(function(response) {  
                me.acuerdos = response.data;
            }).catch(function(error) {
                me.$alert('Notificación', 'Fallo la conexión a internet, favor de intentar mas tarde.', 
                    function(){  
                        me.$alert().close() 
                    })
            }); 
        },
        mostrarInforma(item){
            let me = this; 
            me.editedIndex= -1, 
            me.v_idAcuerdoReparatorio= item.idAcuerdoReparatorio;
            me.v_envioId	= item.envioId;
           
            
            me.v_nuc= item.nuc;
            me.v_noExpediente	= item.noExpediente;
            me.v_uf_Distrito	= item.uf_Distrito;
            me.v_uf_DirSubProc = item.uf_DirSubProc;
            me.v_uf_Agencia=item.uf_Agencia;
            me.v_uf_Modulo= item.uf_Modulo;
            me.v_uf_Nombre= item.uf_Nombre;
            me.v_uf_Puesto= item.uf_Puesto;  
            
            me.v_AutoridadqueDeriva = item.autoridadqueDeriva;
            me.v_uqe_Distrito =item.uqe_Distrito;
            me.v_uqe_DirSubProc= item.uqe_DirSubProc;
            me.v_uqe_Agencia =item.uqe_Agencia;
            me.v_uqe_Modulo = item.uqe_Modulo;
            me.v_uqe_Nombre = item.uqe_Nombre;
            me.v_uqe_Puesto = item.uqe_Puesto;
            me.v_StatusGeneral =item.statusGeneral;
            
            me.v_RespuestaExpediente= item.respuestaExpediente;
            me.v_FechaRegistro = item.fechaRegistro;
            me.v_FechaCierre = item.fechaCierre;
            me.dialog_Informa=true;
        },
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
        }, 
        limpiar(){
            let me = this; 
            me.v_idAcuerdoReparatorio="";
            me.v_statusValidacion="";
            me.v_respuesta="";
            me.v_noExpediente="";
            me.v_idAcuerdoReparatorio=""; 
            me.v_statusValidacion="";
            me.v_respuesta="";
            
      
            me.v_envioId="";
            
            me.v_nombreSolicitante="";
            me.v_solicitantes=[];
            me.v_solicitantesR=[];
            me.v_solicitantesAR=[];

            me.v_nombreRequerdio="";
            me.v_requeridos=[];
            me.v_requeridosR=[];
            me.v_requeridosAR=[];

            
            me.v_nuc="";
            me.v_noExpediente="";
            me.v_statusConclusion="";
            me.v_tipoPago="";
            me.v_statusCumplimiento="";
            me.v_metodoUtilizado="";
            me.v_montoTotal="";
            me.v_noTotalParcialidades="";
            me.v_periodo="";
            me.v_fechaCelebracionAcuerdo="";
            me.v_fechaLimiteCumplimiento="";
            me.v_uf_Distrito="";
            me.v_uf_DirSubProc="";
            me.v_uf_Agencia="";
            me.v_uf_Modulo="";
            me.v_uf_Nombre="";
            me.v_uf_Puesto="";
            me.v_delitos="";
            me.v_textoAR="";
            //*************** */
            me.editedIndex=-1;

        },
        validacion(item){ 
            let me= this;
            me.v_idAcuerdoReparatorio = item.idAcuerdoReparatorio;
            me.v_noExpediente= item.noExpediente;
            
            me.dialog=true;
        },
         
        
        mostrar(item) { 
            console.log(item)
            let me = this; 
            me.editedIndex= 1, 
            me.v_idAcuerdoReparatorio= item.idAcuerdoReparatorio;
            me.v_envioId	= item.envioId;
           
            //*********************************************** */
            me.v_nombreSolicitante= item.nombreSolicitante; 
        
            //*********************************************** */
            me.v_nombreRequerdio=item.nombreRequerdio; 
            me.listarSolicitantesRequeridos("Solicitante");
            me.listarSolicitantesRequeridos("Requerido");
            //*********************************************** */ 
            me.v_nuc	= item.nuc;
            me.v_noExpediente	= item.noExpediente;
            me.v_statusConclusion= item.statusConclusion;
            me.v_tipoPago = item.tipoPago;
            me.v_statusCumplimiento= item.statusCumplimiento;
            me.v_metodoUtilizado	= item.metodoUtilizado;
            me.v_montoTotal	= item.montoTotal;
            me.v_noTotalParcialidades= item.noTotalParcialidades;
            me.v_periodo	= item.periodo;
            me.v_fechaCelebracionAcuerdo= item.fechaCelebracionAcuerdo;
            me.v_nombreSolicitante = item.nombreSolicitante,
            me.v_fechaLimiteCumplimiento= item.fechaLimiteCumplimiento;
            me.v_uf_Distrito = item.uf_Distrito;
            me.v_uf_DirSubProc = item.uf_DirSubProc;
            me.v_uf_Agencia=item.uf_Agencia;
            me.v_uf_Modulo= item.uf_Modulo;
            me.v_uf_Nombre= item.uf_Nombre;
            me.v_uf_Puesto= item.uf_Puesto;
            me.v_delitos	= item.delitos; 
            me.v_textoAR	= item.textoAR;
        },
        imprimirAR(){
             this.mostrarpdf(); 
        },
        close(){
                this.dialog = false; 
                this.limpiar();
        }, 
        
        guardar(){
            this.$validator.validate().then(result => {
                if (result) {   
                        //Código para guardar
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
                        me.$justiciarestaurativa.put('api/AcuerdoReparatorios/ActualizarRespuesta/' + me.DistritosP,{
                            'idAcuerdoReparatorio': me.v_idAcuerdoReparatorio,
                            'statusRespuestaCoordinadorJuridico': me.v_statusValidacion, 
                            'respuestaCoordinadorJuridico': me.v_respuesta,
                        }, configuracion).then(function(response){
                            me.close();
                            me.$notify('¡La información se guardo correctamente!','success')  
                            me.listar();                        
                        }).catch(function(error){
                            if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar el registro!!!','error') 
                            } 
                        });
                    
                }  
            })
        }, 
        crearPdf () { 
            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            let me = this;                
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");
            var logo1 = this.logo1;
            var logo2 = this.logo2; 
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var diragencia = this.direccionAgencia;
            var telagencia = this.telefonosAgencia;
            var contactoDSP = this.contactoDSP;
            var nombreDSP = this.nombreDSP;
            var horasDoc;
            var minutosDoc;
            var fecha = new Date(me.v_fechaCelebracionAcuerdo);
            if (fecha.getHours() < 10) {
                horasDoc = '0' + fecha.getHours()
            } else {
                horasDoc = fecha.getHours()
            }
            if (fecha.getMinutes() <= 10) {
                minutosDoc = '0' + fecha.getMinutes()
            } else {
                minutosDoc = fecha.getMinutes()
            }
            var fechaDoc = horasDoc + ':' + minutosDoc
            
            this.vtxtformat = 'siendo las ' + fechaDoc + ' (' + NumberAsString(horasDoc) + ' horas' + (NumberAsString(minutosDoc) != 0 ? ' con ' + NumberAsString(minutosDoc) : '') + ')'
            var vtxt_F = "";
            if (this.vtxtformat == 'siendo las  horas') {
                vtxt_F = "";
            } else {
                vtxt_F = this.vtxtformat;
            }
             
            //***************************************************************************** */  
            
  
            if (this.editedIndex==1)
            {
                var num2Let = require('numalet')()
                var dia = moment(this.v_fechac).format("DD");
                var diatext = NumberAsString(dia);
                var mes = moment(this.v_fechac).format('MMMM');
                var año= moment(this.v_fechac).format("YYYY");
                var añotext= NumberAsString(año);  
                var pdf_distrito = this.v_uf_Distrito;
                var pdf_dirsubproc = this.uf_DirSubProc;
                var pdf_agencia = this.uf_Agencia;
                var pdf_usuario=this.v_uf_Nombre;
                var pdf_puesto=this.v_uf_Puesto;
                var pdf_modulo=this.uf_Modulo;  
                var fecha = dia + " de " + mes  + " del " + año  
            }
            else
            {
                var num2Let = require('numalet')({unidad:''});
                var dia = moment().format("DD");
                var diatext = NumberAsString(dia);
                var mes = moment().format('MMMM'); 
                var año= moment().format("YYYY"); 
                var añotext= NumberAsString(año);
                var pdf_distrito = this.u_distrito;
                var pdf_dirsubproc = this.u_dirSubPro;
                var pdf_agencia =this.u_agencia;
                var pdf_usuario=this.u_nombre;
                var pdf_puesto=this.u_puesto;
                var pdf_modulo=this.u_modulo;  
                var fecha = dia + " de " + mes + " del " + año  

            }
             
            //***************************************************************************** */
      
            //***************************************************************************** */ 
            var sourceDataSL = this.v_solicitantesAR;
            var bodyDataSolicitantesLineal = []; 

            sourceDataSL.forEach(function(sourceRow) {
                var dataRow = [];
                bodyDataSolicitantesLineal.push(dataRow)
              
                if (me.v_tipodocumento!=="Acuerdo reparatorio ADO")
                {
                    dataRow.push( ' ' + sourceRow.nombreCompleto.toUpperCase());  
                }
                else
                {
                    if(sourceRow.edad <18)
                    {
                        dataRow.push( ' el adolecente de inciaiales ' + sourceRow.nombreCompleto + ' en calidad de solicitante quien es acompañado por el C. '+ sourceRow.rnombre + ' persona responsable del adolecente');
                    }   
                    else
                    {
                        dataRow.push( ' se presentan el C. ' + sourceRow.nombreCompleto+ ' en calidad de solicitante ');
                    }                 
                }
                 
            });
            //***************************************************************************** */ 
            var sourceDataS = this.v_solicitantesAR;
            var bodyDataSolicitantes = []; 
            
            sourceDataS.forEach(function(sourceRow) {
                var dataRow = []; 
                bodyDataSolicitantes.push(dataRow)
         
                if (me.v_tipodocumento=="Acuerdo reparatorio") {
                    dataRow.push(
                        '<p><strong>Del Solicitante:</strong> El C. <strong>' + (sourceRow.nombreCompleto.toUpperCase() === null ? '(sin registro)' : sourceRow.nombreCompleto.toUpperCase()) +
                        ',</strong> de nacionalidad <strong>' + (sourceRow.nacionalidad.toLowerCase() === null ? '(sin registro)' : sourceRow.nacionalidad.toLowerCase()) + 
                        '</strong> originario de <strong>'+ (sourceRow.entidadFederativa === null ? '(sin registro)' : sourceRow.entidadFederativa) +
                        ',</strong> con domicilio  en <strong>' + (sourceRow.direccion === null ? '(sin registro)' : sourceRow.direccion) + 
                        ',</strong> de <strong>' + (sourceRow.edad !== null ? '(sin reigistro)' : sourceRow.edad) + 
                        '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento !== null ? '(sin reigistro)' : sourceRow.fechaNacimiento) + 
                        ',</strong> del Estado Familiar <strong>' + (sourceRow.estadoCivil === null ? '(sin registrar)' : sourceRow.estadoCivil) + 
                        '</strong> de ocupación <strong>' + (sourceRow.ocupacion === null ? 'sin registro' : sourceRow.ocupacion) + 
                        ',</strong> con grado de estudios a nivel <strong>' + (sourceRow.nivelEstudio === null ? '(sin registro)' : sourceRow.nivelEstudio) + 
                        ',</strong> clave única de registro de poblacion <strong>' + (sourceRow.curp === null ? '(sin reigistro)' : sourceRow.nivelEstudio) +
                        ',</strong> que se identifica con el(la) <strong>' + (sourceRow.docIdentificacion === null ? '(sin registro)' : sourceRow.nivelEstudio) + 
                        '</strong> la cual coincide con lo rasgos fisonómicos de quien la porta y en este momento' +
                        'le es devuelta por ser de utilidad personal' +
                        ', dejando en su lugar copia simple de la misma para debida constancia.</p>'
                    );  
                }
                else if (me.v_tipodocumento=="Acuerdo reparatorio ADO")
                {
                     if (sourceRow.edad< 18)
                {
                      dataRow.push('<p><strong>Del Solicitante:</strong> El adolecente de iniciales. <strong>'+ sourceRow.nombreCompleto.toUpperCase() +
                             ',</strong> de  <strong>' + sourceRow.redad+ 
                             ' años de edad</strong> por haber nacido el <strong>'+ sourceRow.rfechaNacimiento +
                             ',</strong> lo cual se acredita mediante acta de nacimiento expedida por el Registro Civil, de la '+
                             ' cual se agrega copia para debida constancia y de quien se omiten sus demás datos personales de ' +
                             'conformidad a lo establecido en el artículo 36 de la Ley Nacional del Sistema Integral de '+
                             'Justicia Penal para Adolescentes, el cual hace referencia al confidencialidad y '+
                             'privacidad. Quien se encuentra debidamente acompañado por persona responsable del adolescente, siendo el C. '+ 
                             '<strong>'+ sourceRow.rnombre + 
                            ',</strong> de Nacionalidad <strong>' + sourceRow.rnacionalidad+ 
                             ',</strong> de <strong>' + sourceRow.redad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.rfechanaciomiento +  
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.rcurp +
                             ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado '+
                             'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia '+
                             'a los Derechos a la intimidad y a la privacidad.</p>');  
                             
                }
                else
                {
                      dataRow.push('<p><strong>Del Solicitante:</strong> El C. <strong>'+ sourceRow.nombreCompleto.toUpperCase() +
                             ',</strong> de nacionalidad <strong>' + sourceRow.nacionalidad.toLowerCase() +  
                             ',</strong> de <strong>' + sourceRow.edad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.fechaNacimiento +   
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                             ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado '+
                             'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia '+
                             'a los Derechos a la intimidad y a la privacidad.</p>');    

                }
                }
                else if (me.v_tipodocumento=="Plan de reparación")
                {
                     dataRow.push('<p><strong>Del Solicitante:</strong> El C. <strong>'+ sourceRow.nombreCompleto.toUpperCase() +
                             ',</strong> de nacionalidad <strong>' + sourceRow.nacionalidad.toLowerCase() + 
                             '</strong> originario de <strong>'+ sourceRow.entidadFederativa +
                             ',</strong> con domicilio  en <strong>' + sourceRow.direccion + 
                             ',</strong> de <strong>' + sourceRow.edad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.fechaNacimiento + 
                             ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil + 
                             '</strong> de ocupación <strong>' + sourceRow.ocupacion + 
                             ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio + 
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                             ',</strong> que se identifica con el(la) <strong>' + sourceRow.docIdentificacion + 
                             '</strong> la cual coincide con lo rasgos fisonómicos de quien la porta y en este momento'+
                             'le es devuelta por ser de utilidad personal'+
                             ', dejando en su lugar copia simple de la misma para debida constancia.</p>');  
                }
               
            });
        
        
            //***************************************************************************** */ 
            //***************************************************************************** */ 
            //***************************************************************************** */ 
            //***************************************************************************** */ 
            //***************************************************************************** */ 

            var sourceDataRL = this.v_requeridosAR;
            var bodyDataRequeridosLineal = []; 
            console.log(sourceDataRL)

            sourceDataRL.forEach(function(sourceRow) {
                var dataRow = []; 
                console.log(sourceRow)
                bodyDataRequeridosLineal.push(dataRow)
                if (me.v_tipodocumento!=="Acuerdo reparatorio ADO")
                {
                    dataRow.push( ' ' + sourceRow.nombreCompleto.toUpperCase());  
                }
                else
                {
                    if(sourceRow.edad <18)
                    {
                        dataRow.push( ' el adolecente de inciaiales ' + sourceRow.nombreCompleto + ' en calidad de requerido quien es acompañado por el C. '+ sourceRow.rnombre + ' persona responsable del adolecente,');
                    }   
                    else
                    {
                        dataRow.push( ' se presentan el C. ' + sourceRow.nombreCompleto+ ' en calidad de requerido ');
                    }                 
                }   
            });
             //***************************************************************************** */ 
            var sourceDataR = this.v_requeridosAR;
            var bodyDataRequeridos = []; 
   
            sourceDataR.forEach(function(sourceRow) {
                    
                var dataRow = []; 
                bodyDataRequeridos.push(dataRow)
                
                if (me.v_tipodocumento=="Acuerdo reparatorio")
                {
                     dataRow.push('<p><strong>Del Requerido:</strong> El C. <strong>'+ sourceRow.nombreCompleto+
                             ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad+ 
                             '</strong> originario de <strong>'+ sourceRow.entidadFederativa +
                             ',</strong> con domicilio en <strong>' + sourceRow.direccion + 
                             ',</strong> de <strong>' + sourceRow.edad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.fechaNacimiento + 
                             ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil + 
                             '</strong> de ocupación <strong>' + sourceRow.ocupacion + 
                             ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio + 
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                             ',</strong> que se identifica con el(la) <strong>' + sourceRow.docIdentificacion + 
                             '</strong> la cual coincide con lo rasgos fisonómicos de quien la porta y en este momento'+
                             'le es devuelta por ser de utilidad personal'+
                             ', dejando en su lugar copia simple de la misma para debida constancia.</p>');  
                }
                else if (me.v_tipodocumento=="Acuerdo reparatorio ADO")
                {
                    
                     if (sourceRow.edad< 18)
                {
                      dataRow.push('<p><strong>Del Requerido:</strong> El adolecente de iniciales. <strong>'+ sourceRow.nombreCompleto+
                             ',</strong> de  <strong>' + sourceRow.redad+ 
                             ' años de edad</strong> por haber nacido el <strong>'+ sourceRow.rfechaNacimiento +
                             ',</strong> lo cual se acredita mediante acta de nacimiento expedida por el Registro Civil, de la '+
                             ' cual se agrega copia para debida constancia y de quien se omiten sus demás datos personales de ' +
                             'conformidad a lo establecido en el artículo 36 de la Ley Nacional del Sistema Integral de '+
                             'Justicia Penal para Adolescentes, el cual hace referencia al confidencialidad y '+
                             'privacidad. Quien se encuentra debidamente acompañado por persona responsable del adolescente, siendo el C. '+ 
                             '<strong>'+ sourceRow.rnombre + 
                            ',</strong> de Nacionalidad <strong>' + sourceRow.rnacionalidad+ 
                             ',</strong> de <strong>' + sourceRow.redad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.rfechanaciomiento +  
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.rcurp +
                             ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado '+
                             'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia '+
                             'a los Derechos a la intimidad y a la privacidad.</p>');  
                             
                }
                else
                {
                      dataRow.push('<p><strong>Del Requerido:</strong> El C. <strong>'+ sourceRow.nombreCompleto+
                             ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad+  
                             ',</strong> de <strong>' + sourceRow.edad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.fechaNacimiento +   
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                             ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado '+
                             'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia '+
                             'a los Derechos a la intimidad y a la privacidad.</p>');    

                }
                }
                else if (me.v_tipodocumento=="Plan de reparación")
                {
                    
                     dataRow.push('<p><strong>Del Requerido:</strong> El C. <strong>'+ sourceRow.nombreCompleto+
                             ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad+ 
                             '</strong> originario de <strong>'+ sourceRow.entidadFederativa +
                             ',</strong> con domicilio en <strong>' + sourceRow.direccion + 
                             ',</strong> de <strong>' + sourceRow.edad + 
                             '</strong> años de edad, por haber nacido el <strong>' + sourceRow.fechaNacimiento + 
                             ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil + 
                             '</strong> de ocupación <strong>' + sourceRow.ocupacion + 
                             ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio + 
                             ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                             ',</strong> que se identifica con el(la) <strong>' + sourceRow.docIdentificacion + 
                             '</strong> la cual coincide con lo rasgos fisonómicos de quien la porta y en este momento'+
                             'le es devuelta por ser de utilidad personal'+
                             ', dejando en su lugar copia simple de la misma para debida constancia.</p>');  
                }   
            }); 
             //***************************************************************************** */ 
            
            var titulodoc ="";
            var textoprincipal="";
              if (me.v_tipodocumento == "Acuerdo reparatorio")
            {
                titulodoc="ACUERDO REPARATORIO"
                textoprincipal='<p>En ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + ' (' + diatext + ') de ' + mes  + ' del ' + año + ' (' + añotext + ')</strong>,' +
                               ' se presentan el(la) C.<strong>' + bodyDataSolicitantesLineal + '</strong>' + ' en calidad de solicitante y el(la) C.<strong>' + bodyDataRequeridosLineal + '</strong> en calidad de requerido, ante el Centro de Justicia Restaurativa Penal; de quienes continuación se detallan sus:</p>' ;

            } 
             if (me.v_tipodocumento == "Acuerdo reparatorio ADO")
            {
                titulodoc="ACUERDO REPARATORIO"
                textoprincipal='<p>En ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + ' (' + diatext + ') de ' + mes  + ' del ' + año + ' (' + añotext + ')</strong>,' +
                                ' se presenta el(la) C.<strong>' + bodyDataSolicitantesLineal +  bodyDataRequeridosLineal + ' ante el Centro de Justicia Restaurativa Penal; de quienes continuación se detallan sus:</p>' ;

            } 
            if (me.v_tipodocumento == "Plan de reparación")
            {
                titulodoc ="PLAN DE REPARACIÓN Y DE CONDICIONES POR CUMPLIR";
                textoprincipal='<p>En ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + '('+diatext+') de ' + mes  + ' del ' + año + ' (' + añotext + ')</strong>,' +
                               ' se presenta el(la) C.<strong>' + bodyDataSolicitantesLineal + ' en calidad de solicitante y el(la) C. <strong>' + bodyDataRequeridosLineal + '</strong> ante el Centro de Justicia Restaurativa Penal '+
                               'de la Procuraduría General de Justicia del Estado adscrito al Centro de Justicia para las Mujeres del Estado de Hidalgo; de quienes a continuación se detallan sus:</p>' ;

            }
          

            var html_textoprincipal  = htmlToPdfmake( 
               textoprincipal
            );
            var html_texto  = htmlToPdfmake( 
                this.v_textoAR
            );
            var html_requeridos  = htmlToPdfmake(  
                bodyDataRequeridos
            );
             var html_solicitantes  = htmlToPdfmake( 
                bodyDataSolicitantes 
            );
             //***************************************************************************** */ 
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            {
                                text: diragencia + "\n" + telagencia  + "\n" +  'www.hidalgo.gob.mx',
                                style: 'footertext', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                 absolutePosition: {x: 0, y: 30},  
                                
            
                            }, 
                        ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {
                        
                        return [
                            { 
                                image: logo3,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            //{ 
                            //    image: logo2,
                            //    width: 50,  
                            //    absolutePosition: {x: 495, y: 30},
                            //},
                            

                            
                        ]
                
                },
            
                content: [ 
                    {
                                text: pdf_dirsubproc,
                                style: 'headertext',
                                absolutePosition: {x: 85, y: 95},
                            }, 
                    {
                        text:  'EXPEDIENTE: ' + this.v_noExpediente,
                        style: 'nuc'
                    },
                    '\n\n',
                    {
                        text: titulodoc,
                        style: 'titulo'
                    },
                    '\n',
                    {
                        text:  html_textoprincipal,
                        style: 'texto'
                    },
                      '\n',
                    {
                        text: 'DATOS GENERALES',
                        style: 'subtitulo'
                    }, 
                    
                      {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*'], 
                            body: [ 
                                [html_solicitantes]  
                            ]
                        },
                        layout: 'noBorders'
                    }, 
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*'], 
                            body: [ 
                                [html_requeridos] 
                            ]
                        },
                        layout: 'noBorders'
                    }, 
                    {
                        text: html_texto,
                        style: 'texto'
                    },   
                    '\n\n\n', 
                    {
                        style: 'table1',
                        table: {
                            headerRows: 1,
                            widths: ['*','*'], 
                            body: [
                                [{ text: 'Solicitante(s).',   fontSize: 12, bold: true, alignment: 'center'}, { text: 'Requeridos(s).',  fontSize: 12, bold: true, alignment: 'center'}], 
                                [bodyDataSolicitantesLineal, bodyDataRequeridosLineal],  
                                
                            ]
                        },
                        layout: 'noBorders'
                    },              
                    '\n',
                    {
                            text:  '\n\n' + pdf_usuario + '\n' + pdf_puesto,
                            style: 'ampo'
                    },
                     '\n\n',
                    {
                            text: 'LICENCIADO EN DERECHO '+ contactoDSP + '\n' + 'DIRECTOR OPERATIVO DEL '+ nombreDSP,
                            style: 'ampo'
                    },
                    {
                            text:  'Acuerdo  Reparatorio debidamente validado en términos del artículo 33 párrafo tercero de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal ',  
                            style: 'ar'
                    },
                     
           
                        
                
                    
                ],
            
                
                styles: {        
                    fecha:{
                        fontSize: 9, 
                        regular:true,
                        alignment: 'right',
                    },
                    nuc:{
                        fontSize: 12, 
                        alignment: 'right',
                        bold: true,
                    },
                    titulo: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                    
                    },
                    subtitulo:{
                        fontSize: 11,
                        bold: false, 
                        alignment: 'center',
                    },
                    headertext :{
                        fontSize: 10,
                        bold:true,
                        alignment:'left',
                    },
                    footertext :{
                        fontSize: 7,
                        color: 'white'
                    },
                    texto:{
                        fontSize: 10,  
                        regular:true,
                        alignment: 'justify',
                    },
                    ar:{
                        fontSize: 10,  
                        regular:true,
                        alignment: 'center',
                    },
                    textobold:{
                        fontSize: 10,  
                        bold: true,
                        alignment: 'justify',
                    },
                    compareciente:{
                        fontSize: 12, 
                        bold: true,
                        alignment: 'right',
                    },
                    ampo:{
                        fontSize: 10, 
                        bold: true,
                        alignment: 'center',
                    }, 
                    cargo:{
                        fontSize: 9, 
                        regular: true,
                        alignment: 'left',
                    }, 
                    table: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'justify',
                    },
                    table1: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    }, 
                }
            }
                
                return dd;  
                
                
        },  
        mostrarpdf () {
            var dd = this.crearPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");
            if (pdfMake.vfs == undefined) {
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;
            }
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdfAR'); 
            var callback = function(url) { f.setAttribute('src',url); }
            doc.getDataUrl(callback, doc);
            this.modal_AR = true; 
        }, 
        encuentraSolicitantes(){  
            let me = this;
            for(var i=0;i< me.v_solicitantesR.length;i++){
                var nombreCompleto =  me.v_solicitantesR[i];
                for(var x=0;x<me.v_solicitantes.length;x++){
                    if (me.v_solicitantes[x].nombreCompleto==nombreCompleto){
                        me.v_solicitantes[x].seleccion=true; 
                        me.listardireccionSol(me.v_solicitantes[x]);  
                         
                    }
                }                
            }  
            
        },
        encuentraRequeridos(){
            let me = this;
            for(var i=0;i<me.v_requeridosR.length;i++){
                var nombreCompleto =  me.v_requeridosR[i];
                for(var x=0;x<me.v_requeridos.length;x++){
                    if (me.v_requeridos[x].nombreCompleto==nombreCompleto){
                        me.v_requeridos[x].seleccion=true; 
                        me.listardireccionReq(me.v_requeridos[x]);
                         
                    }
                }                
            }
                
        },
        listarSolicitantesRequeridos(SolReq)
        {
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};   
            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListarSolicitantesRequeridosxDis/'+ me.DistritosP + '/'+me.v_envioId+'/'+SolReq, configuracion).then(function(response)
            { 
                if(SolReq=="Requerido")
                {
                    me.v_requeridos=response.data; 
                    me.v_requeridosR = me.v_nombreRequerdio.split(", ");
                    me.encuentraRequeridos();
                }
                else
                {
                     me.v_solicitantes=response.data; 
                    me.v_solicitantesR = me.v_nombreSolicitante.split(", ");
                    me.encuentraSolicitantes();    
                }

            }).catch(function(error){
                if (error.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (error.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403= true
                    me.showpage= false 
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros','error')  
                }   
            });     
        },
        listardireccionSol(persona){  
            let me= this;
            
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};   
            
            var date = moment(persona.fechaNacimiento, 'DD-MM-YYYY');
            var edad = moment().diff(date, 'years',false);

            var dia = moment(date).format("DD");
            var mes = moment(date).format('MMMM');
            var año= moment(date).format("YYYY");
             
            var fechaNac = dia + " de " + mes  + " de " + año 

            if (persona.seleccion==true)
                    {
                        me.$cat.get('api/RAPs/ListarDPxDis/'+ persona.personaId + '/' + me.DistritosP, configuracion).then(function(response){ 
                            me.v_direccion =(response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp);
                         //console.log(me.v_direccion)
                          me.v_solicitantesAR.push(
                            { 
                            personaId: persona.personaId,
                            nombreCompleto: persona.nombreCompleto, 
                            direccion:   me.v_direccion, 
                            nacionalidad: persona.nacionalidad,
                            entidadFederativa: persona.entidadFederativa,
                            edad: edad,
                            curp : persona.curp,
                            fechaNacimiento: fechaNac,
                            estadoCivil: persona.estadoCivil,
                            nivelEstudio: persona.nivelEstudio,
                            docIdentificacion: persona.docIdentificacion,
                            ocupacion: persona.ocupacion,
                            }
                        );
                }).catch(function(error){
                    me.$notify('Error al intentar leer los datos de la persona seleccionada !!!','error')    
                });
                } else {
                            for(var i=0;i<me.v_solicitantesAR.length;i++){
                                if (me.v_solicitantesAR[i].personaId==persona.personaId){
                                    me.v_solicitantesAR.splice(i, 1);
                                }
                            }

                        
                    }

         
        }, 
        listardireccionReq (persona) {
            let me = this;
            let header = { "Authorization": "Bearer" + this.$store.state.token };
            let configuracion = { headers: header };   
            var date = moment(persona.fechaNacimiento, 'DD-MM-YYYY');
            var edad = moment().diff(date, 'years', false);
            var dia = moment(persona.fechaNacimiento).format("DD");
            var mes = moment(persona.fechaNacimiento).format('MMMM');
            var año = moment(persona.fechaNacimiento).format("YYYY");
            var fechaNac = dia + " de " + mes + " del " + año 
            if (persona.seleccion == true) {
                me.$cat.get('api/RAPs/ListarDPxDis/'+ persona.personaId + '/' + me.DistritosP, configuracion).then(function(response) { 
                    me.v_direccion = (response.data.calle + " " + response.data.noint + " " + response.data.noext + 
                    " " + response.data.localidad + " " + response.data.municipio + " " + response.data.estado + 
                    " " + response.data.pais + " " +response.data.cp);
                    me.v_requeridosAR.push({ 
                        personaId: persona.personaId,
                        nombreCompleto: persona.nombreCompleto, 
                        direccion:   me.v_direccion, 
                        nacionalidad: persona.nacionalidad,
                        entidadFederativa: persona.entidadFederativa,
                        edad: edad,
                        curp : persona.curp,
                        fechaNacimiento: fechaNac,
                        estadoCivil: persona.estadoCivil,
                        nivelEstudio: persona.nivelEstudio,
                        docIdentificacion: persona.docIdentificacion,
                        ocupacion: persona.ocupacion,
                    });
                }).catch(function(error) {
                    me.$notify('Error al intentar leer los datos de la persona seleccionada !!!','error')    
                });
            } else { 
                for (var i = 0; i < me.v_requeridosAR.length; i++) {
                    if (me.v_requeridosAR[i].personaId == persona.personaId) {
                        me.v_requeridosAR.splice(i, 1);
                    }
                }        
            }        
        },  
        listarDistritos(){
            let me=this;
            let header={"Authorization" : "Bearer" + this.$store.state.token};
            let configuracion= {headers : header};

            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/DistritoC/' + me.u_idusuario, configuracion).then(function(response){
              me.ArrayDistritos = response.data;
              me.ArrayDistritos.map(function (x){
                me.CoorDis.push({text: x.nombreDis, value: x.distritoId});
              });

            }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false 
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            });
        },

    },  
}
</script>
 