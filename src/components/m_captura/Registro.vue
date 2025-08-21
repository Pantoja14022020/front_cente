<template>
    <v-layout align-start>
        <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary">
            <div class="text-xl-center text-md-center text-xs-center my-4">
              <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a>
            </div>
    
            <v-list dense dark class="pt-0 primary" >
              <template>
                <v-list-tile  :to="{name:'mcaptura'}">
                  <v-list-tile-action>
                    <v-icon class="centenarioMenuIcon">home</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
                </v-list-tile>
              </template>
    
              <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
                <v-list-group>
                  <v-list-tile slot="activator">   
                    <v-list-tile-content >
                      <v-list-tile-title class="centenarioMenuAreas">
                        Carpetas
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-registro'== '#' ? '' :  'mcaptura-registro'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">group</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Registro
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-listacarpetas'== '#' ? '' :  'mcaptura-listacarpetas'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">view_list</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Lista de carpetas asignadas
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                </v-list-group>
              </template>
    
              <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
                <v-list-group>
                  <v-list-tile slot="activator">   
                    <v-list-tile-content >
                      <v-list-tile-title class="centenarioMenuAreas">
                      Seguimiento a carpeta
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-informaciongeneral'== '#' ? '' :  'mcaptura-informaciongeneral'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Información general.
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-victimaimputado'== '#' ? '' :  'mcaptura-victimaimputado'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">face</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Víctima(s) directa, indirecta, testigo y/o imputado.
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-delito'== '#' ? '' :  'mcaptura-delito'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Delito
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-vehiculo'== '#' ? '' :  'mcaptura-vehiculo'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">commute</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Vehiculo
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="esAdministrador || esFacilitador" :to="{ name: 'mcaptura-justiciarestaurativa'== '#' ? '' :  'mcaptura-justiciarestaurativa'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">event_seat</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Justicia restaurativa
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidasproteccion'== '#' ? '' :  'mcaptura-medidasproteccion'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">description</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Medidas de protección
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidascautelares'== '#' ? '' :  'mcaptura-medidascautelares'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">label</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Medidas cautelares
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-resolucion'== '#' ? '' :  'mcaptura-resolucion'}"  active-class="secondary">  
                    <v-list-tile-action>
                      <v-icon class="centenarioMenuIcon">verified_user</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="centenarioMenuModules">
                        Resolución
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
              </template>
          
            </v-list>
        </v-navigation-drawer>

        <n401 v-if="e401" />
        <n403 v-if="e403" />

        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular">Datos carpeta de investigación</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <div class="text-xs-right">                            
                    <v-btn color="primary" :to="{name: 'mcaptura'}">Cancelar</v-btn>
                </div>
            </v-toolbar>
            <v-stepper v-model="step" non-linear vertical>
                <v-stepper-step :editable="step !== 1"  :complete="step > 1" step="1" @click="step = 1" :rules="[() => !errors.has('distrito inicia') && !errors.has('subprocuraduría/dirección general inicia') && !errors.has('agencia inicia') 
                                                                                                                        && !errors.has('unidad de investigación que inicia') && !errors.has('nombre persona que inicio') && !errors.has('puesto persona que inicio')]">
                    <div class="d-flex align-center">
                        Datos de la unidad que inicia
                        <v-btn v-show="step === 1" icon small @click.stop="ayuda = true">
                            <v-icon color="primary">help_outline</v-icon>
                        </v-btn>
                    </div>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card  color="grey lighten-5" elevation=2>
                        <v-container grid-list-md>
                            <v-layout row wrap>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete 
                                        name="distrito inicia"
                                        :items="distritos"
                                        v-model="distritoinicia" 
                                        v-validate="'required'"
                                        label="*Distrito:"
                                        return-object
                                        prepend-icon="location_city"
                                        @change="listarsubprocinicia()"
                                        :error-messages="errors.collect('distrito inicia')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                    <v-autocomplete 
                                        name="subprocuraduría/dirección general inicia"
                                        :items="subrpocsinicia"
                                        v-model="subprocinicia" 
                                        v-validate="'required'"
                                        label="*Subprocuraduría/dirección general:"
                                        return-object
                                        prepend-icon="domain"
                                        @change="listaragenciainicia()"
                                        :error-messages="errors.collect('subprocuraduría/dirección general inicia')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                    <v-autocomplete 
                                        name="agencia inicia"
                                        :items="agenciasinicia"
                                        v-model="agenciainicia" 
                                        v-validate="'required'"
                                        label="*Agencia:"
                                        return-object
                                        prepend-icon="account_balance"
                                        @change="listarmoduloinicia()"
                                        :error-messages="errors.collect('agencia inicia')"
                                        no-data-text="No se encontraron datos" 
                                    />
                                    <v-autocomplete 
                                        name="unidad de investigación que inicia"
                                        :items="modulosinicia"
                                        v-model="moduloinicia" 
                                        v-validate="'required'"
                                        prepend-icon="how_to_reg"
                                        label="*Unidad de investigación que inicia:"
                                        return-object
                                        :error-messages="errors.collect('unidad de investigación que inicia')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-text-field 
                                        name="nombre persona que inicio"
                                        v-model="p_nombre" 
                                        v-validate="'required'"
                                        prepend-icon="person"
                                        label="*Nombre de persona que inició:"
                                        maxlength="500"                        
                                        :error-messages="errors.collect('nombre persona que inicio')"  
                                    />
                                    <v-text-field 
                                        name="puesto persona que inicio"
                                        v-model="p_puesto" 
                                        v-validate="'required'"
                                        prepend-icon="badge"
                                        label="*Puesto de persona que inició:" 
                                        :error-messages="errors.collect('puesto persona que inicio')" 
                                    />
                                </v-flex>  
                            </v-layout>
                        </v-container> 
                        <div class="text-xs-right">                            
                            <v-btn color="primary" @click.native="step = 2">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step :editable="step !== 2" :complete="step > 2" step="2" @click="step = 2"
                                :rules="[() => !errors.has('distrito integra') && !errors.has('subprocuraduría/dirección general integra') && !errors.has('agencia integra') 
                                                && !errors.has('unidad de investigación que integra') && !errors.has('fecha de radicación')]">
                    <div class="d-flex align-center">
                        Datos de la unidad donde se encuentra la carpeta
                        <v-btn v-show="step === 2" icon small @click.stop="ayuda = true">
                            <v-icon color="primary">help_outline</v-icon>
                        </v-btn>
                    </div>
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-card  color="grey lighten-5" elevation=2>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md12 lg12>
                                    <v-switch
                                        color="success"
                                        v-model="integracion"
                                        :label="`¿La carpeta está en otra unidad? : ${integracion ? 'Si' : 'No'}`"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete 
                                        name="distrito integra"
                                        :items="distritosintegra"
                                        v-model="distritointegraid" 
                                        label="*Distrito:"
                                        return-object
                                        disabled
                                        v-validate="'required'"
                                        @change="listarsubprocintegra()"
                                        prepend-icon="location_city"
                                        :error-messages="errors.collect('distrito integra')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                    <v-autocomplete 
                                        name="subprocuraduría/dirección general integra"
                                        :items="subprocsintegra"
                                        v-model="subprocintegraid"
                                        label="*Subprocuraduría/dirección general:"
                                        return-object
                                        v-validate="'required'"
                                        :disabled="!integracion"
                                        @change="listaragenciaintegra()"
                                        prepend-icon="domain"
                                        :error-messages="errors.collect('subprocuraduría/dirección general integra')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                    <v-autocomplete 
                                        name="agencia integra"
                                        :items="agenciasintegra"
                                        v-model="agenciaintegraid" 
                                        label="*Agencia:"
                                        return-object
                                        v-validate="'required'"
                                        :disabled="!integracion"
                                        @change="listarmodulointegra()"
                                        prepend-icon="account_balance"
                                        :error-messages="errors.collect('agencia integra')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                    <v-autocomplete 
                                        name="unidad de investigación que integra"
                                        :items="modulosintegra"
                                        v-model="modulointegraid" 
                                        v-validate="'required'"
                                        :disabled="!integracion"
                                        label="*Unidad de investigación que integra:"
                                        prepend-icon="how_to_reg"
                                        @change="ModuloIntegra"
                                        :error-messages="errors.collect('unidad de investigación que integra')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-menu
                                        ref="menu2"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :return-value.sync="fecharadicacion"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        v-if="diferenteRadicacion === true"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha de radicación'
                                                :value="fechar"
                                                label="*Fecha de radicación:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"  
                                                v-validate="'required'"                              
                                                :error-messages="errors.collect('fecha de radicación')"
                                            />
                                        </template>
                                            <v-date-picker locale="es" v-model="fecharadicacion" no-title scrollable>
                                                <v-spacer />
                                                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif('menu2')">OK</v-btn>
                                            </v-date-picker>
                                    </v-menu>
                                </v-flex>  
                            </v-layout>
                        </v-container>
                        <div class="text-xs-right">
                            <v-btn @click.native="step = 1">Regresar</v-btn>
                            <v-btn color="primary" @click.native="step = 3">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step :editable="step !== 3" :complete="step > 3" step="3" @click="step = 3" :rules="[() => !errors.has('NUC') && !errors.has('fecha de inicio') && !errors.has('fecha de detención') && !errors.has('medio de denuncia')&& !errors.has('corporación que realizo detención') 
                                                                                    && !errors.has('medio reporte') && !errors.has('narrativa') && !errors.has('nomenclatura')]">
                    <div class="d-flex align-center">
                        Datos de la carpeta de investigación
                        <v-btn v-show="step === 3" icon small @click.stop="ayuda = true">
                            <v-icon color="primary">help_outline</v-icon>
                        </v-btn>
                    </div>           
                </v-stepper-step>
                <v-stepper-content step="3">
                    <v-card  color="grey lighten-5" elevation=2>
                        <v-container grid-list-md >
                            <v-layout row wrap>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-flex xs12 sm12 md12 lg12 class="mb-4">
                                        <v-switch 
                                            v-model="nucDif" 
                                            :label="`¿Es una NUC con diferente nomenclatura? ${nucDif ? 'Sí' : 'No'}`" 
                                            color="success" 
                                            hide-details>
                                        </v-switch>
                                    </v-flex>
                                    <v-autocomplete
                                        name="nomenclatura"
                                        :items="claveNucDif"
                                        v-model="nucValue"
                                        label="*Elige la fiscalia para crear la nomenclatura" 
                                        v-validate="'required'"
                                        v-if="nucDif"
                                        @change="actualizarNucDatos"
                                        :error-messages="errors.collect('nomenclatura')"
                                        no-data-text="No se encontraron datos"
                                    />
                                    <div class="switch-container">
                                        <v-autocomplete 
                                            label="*Distrito de carpeta:" 
                                            name="distrito"     
                                            v-model="cveDistrito"
                                            :items="distritosh" 
                                            prepend-icon="location_city"
                                            v-validate="'required'"
                                            return-object
                                            v-on:change="permisoActualizarNuc()"
                                            :disabled="(nucDif && !nucValue) || distritoValidado" 
                                            :error-messages="errors.collect('distrito')"
                                            no-data-text="No se encontraron datos"
                                        />
                                        <v-autocomplete 
                                            label="*Año de carpeta:" 
                                            name="anocarpeta"     
                                            v-model="yearcarpeta"
                                            :items="yearsfile" 
                                            prepend-icon="event_available" 
                                            v-validate="'required'"
                                            return-object
                                            v-on:change="permisoActualizarNuc()" 
                                            :disabled="nucDif && !nucValue"
                                            :error-messages="errors.collect('anocarpeta')"
                                            no-data-text="No se encontraron datos"
                                        />
                                    </div>
                                    <div class="switch-container">
                                        <v-text-field 
                                            name="Numero carpeta"
                                            v-model="numcarpeta" 
                                            v-validate="'required'"
                                            label="*Número de carpeta:"
                                            prepend-icon = "tag"
                                            @change="consultadenuc = false"
                                            @input="permisoActualizarNuc()"
                                            @keypress="soloNumerosKeypress"
                                            @paste.prevent
                                            @keyup.enter="validarceros('numcarpeta')"
                                            @blur="validarceros('numcarpeta')"
                                            counter
                                            :maxlength="nucRango"
                                            :disabled="nucDif && !nucValue"
                                            :error-messages="errors.collect('Numero carpeta')"  
                                        />
                                        <v-text-field 
                                            name="Numero unidad"
                                            v-model="nucUnidad" 
                                            v-validate="requiereUnidad ? 'required' : ''"
                                            label="*Número de unidad:"
                                            prepend-icon = "portrait"
                                            @change="consultadenuc = false"
                                            @input="permisoActualizarNuc()"
                                            @keypress="soloNumerosKeypress"
                                            @paste.prevent
                                            @keyup.enter="validarceros('nucUnidad')"
                                            @blur="validarceros('nucUnidad')"
                                            v-if="nucValue==4 || nucValue==5"
                                            counter
                                            maxlength="1"
                                            :disabled="nucDif && !nucValue"
                                            :error-messages="errors.collect('Numero unidad')"
                                        />
                                    </div>
                                    <div class="switch-container">
                                        <v-text-field 
                                            name="NUC"
                                            label="*NUC"
                                            v-model="nuc" 
                                            v-validate="'required'"
                                            readonly
                                            prepend-icon="folder"
                                            :disabled="nucDif && !nucValue"
                                            :error-messages="getNucErrorMessages"
                                            autocomplete="off"
                                            :success="nucdisponible === true"
                                            :error="nucdisponible === false"
                                            :success-messages="nucdisponible === true ? ['NUC válido'] : []"
                                            :append-icon="nucdisponible === true ? 'check' : nucdisponible === false ? 'close' : ''"
                                        /> 
                                        <v-btn color="success" @click.native="validarnuc()" :disabled="!puedeValidarNUC">Validar NUC</v-btn>
                                    </div>
                                    <v-flex xs12 sm12 md12 lg12 class="mb-4" v-if="nucValue==3">
                                        <v-switch 
                                            v-model="nucMomentanea" 
                                            :label="`Deseas agregar ${nucClaveMomentanea} a tu nomenclatura`" 
                                            color="success" 
                                            hide-details>
                                        </v-switch>
                                    </v-flex>
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :return-value.sync="fechainicio"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha de inicio'
                                                :value="fechai"
                                                label="*Fecha de inicio:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                                v-validate="'required'"                                   
                                                :error-messages="errors.collect('fecha de inicio')"
                                            />
                                        </template>
                                        <v-date-picker locale="es" v-model="fechainicio" no-title scrollable>
                                            <v-spacer />
                                            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="fechainif('menu1')">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                    <v-autocomplete 
                                        name="medio de denuncia"
                                        :items="mediodenuncias"
                                        v-model="mediodenuncia" 
                                        v-validate="'required'"
                                        prepend-icon="content_paste"
                                        label="*Medio de denuncia:"
                                        :error-messages="errors.collect('medio de denuncia')" 
                                        no-data-text="No se encontraron datos"
                                        @change="listarTipoPersona"
                                    />
                                    <v-autocomplete 
                                        name="medio reporte"
                                        :items="medioreportes"
                                        v-model="medioreporte" 
                                        v-validate="'required'"
                                        label="*Medio reporte:"
                                        prepend-icon="report"
                                        v-if="mediodenuncia == 'Noticia de hechos'"
                                        :error-messages="errors.collect('medio reporte')" 
                                        no-data-text="No se encontraron datos"
                                    />
                                    <v-menu
                                        ref="menu3"
                                        v-model="menu3"
                                        :close-on-content-click="false"
                                        :return-value.sync="fechadetencion"
                                        transition="scale-transition"
                                        offset-y
                                        v-if="mediodenuncia == 'Con detenido'"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha de detención'
                                                :value="fechad"
                                                label="*Fecha de detención:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                                v-validate="'required'"                                   
                                                :error-messages="errors.collect('fecha de detención')"
                                            />
                                        </template>
                                        <v-date-picker locale="es" v-model="fechadetencion" no-title scrollable>
                                            <v-spacer />
                                            <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="fechainif('menu3')">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md12 lg12>
                                    <v-card elevation="0">
                                        <v-card-title><h3>Narrativa de los hechos:</h3></v-card-title>
                                        <v-card-text>
                                            <v-form>
                                                <vue-editor
                                                    name="narrativa"
                                                    v-model="narrativa"
                                                    v-validate="'required'"
                                                    outline height=350px;
                                                    style="max-height: 310px; overflow-y: scroll"
                                                    :error-messages="errors.collect('narrativa')" 
                                                    :style="errors.has('narrativa') ? 'border: 1px solid red; border-radius: 4px;' : ''"
                                                />
                                            </v-form>
                                            <small v-show="errors.has('narrativa')" class="error--text">
                                                {{ errors.first('narrativa') }}
                                            </small>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container> 
                        <div class="text-xs-right">
                            <v-btn @click.native="step = 2">Regresar</v-btn>
                            <v-btn color="primary" @click.native="step = 4, substep = 1">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step :editable="step !== 4" :complete="step > 4" step="4" @click="step = 4, substep = 1" :rules="[() => !errors.has('clasificacion de persona') && !errors.has('nombre') && !errors.has('nombre del apoderado o representante') && !errors.has('apellido paterno') 
                                        && !errors.has('fecha de nacimiento') && !errors.has('Nombre de policia') && !errors.has('apellido paterno del policia') && !errors.has('apellido materno del policia') && !errors.has('Nombre de policia') && !errors.has('institucíon') 
                                        && !errors.has('informe policial') && !errors.has('rangos') && !errors.has('Persona Desaparecida') && (!['Victima directa', 'Victima indirecta'].includes(clasificacionpersona) || !errors.has('relacion victima'))]">
                    <div class="d-flex align-center">
                        Datos de la persona inicial
                        <v-btn v-show="step === 4" icon small @click.stop="ayuda = true">
                            <v-icon color="primary">help_outline</v-icon>
                        </v-btn>
                    </div>
                </v-stepper-step>
                <v-stepper-content step="4">
                    <v-card  color="grey lighten-5" elevation=2>
                        <v-container fluid class="pa-0">
                            <!-- Aquí empieza el stepper interno -->
                            <v-sheet class="px-4" elevation="0">
                                <v-stepper v-model="substep" class="mb-4" flat>
                                    <!-- Steps -->
                                    <v-stepper-header>
                                        <v-stepper-step :complete="substep > 1" step="1" editable
                                                    :rules="[() => !errors.has('clasificacion de persona') && !errors.has('nombre') && !errors.has('nombre del apoderado o representante') && !errors.has('apellido paterno') 
                                                                && !errors.has('fecha de nacimiento') && !errors.has('rangos') && !errors.has('Persona Desaparecida')
                                                                && (!['Victima directa', 'Victima indirecta'].includes(clasificacionpersona) || !errors.has('relacion victima'))]">
                                            Datos generales
                                        </v-stepper-step>
                                        <v-divider></v-divider>
                                        <v-stepper-step :complete="substep > 2" step="2" editable>Información complementaria</v-stepper-step>
                                        <v-divider></v-divider>
                                        <v-stepper-step :complete="substep > 3" step="3" editable>Dirección personal</v-stepper-step>
                                        <v-divider></v-divider>
                                        <v-stepper-step :complete="substep > 4" step="4" editable>Dirección notifación</v-stepper-step>
                                        <v-divider v-if="mediodenuncia == 'Con detenido'"></v-divider>
                                        <v-stepper-step :complete="substep > 5" step="5"  editable v-if="mediodenuncia == 'Con detenido'" 
                                                    :rules="[() => !errors.has('Nombre de policia') && !errors.has('apellido paterno del policia') && !errors.has('apellido materno del policia') 
                                                                && !errors.has('Nombre de policia') && !errors.has('institucíon') && !errors.has('informe policial')]">
                                            Policia que detuvo
                                        </v-stepper-step>
                                    </v-stepper-header>

                                    <!-- Contenido de los pasos -->
                                    <v-stepper-items>
                                        <v-stepper-content step="1">
                                            <v-layout class="espaciado" xs12 sm12 md6 lg6 row wrap>  
                                                <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                                    <v-radio-group v-model="radios" v-on:change="limpiar()" row :mandatory="false">
                                                        <v-radio label="Fisica" @change="ocultarTP" color="success" value="Fisica" />
                                                        <v-radio label="Moral" @change="mostrarTP" color="success" value="Moral" /> 
                                                    </v-radio-group>
                                                    <v-text-field 
                                                        name="rfc" 
                                                        label="RFC:" 
                                                        v-model="rfc"   
                                                        v-if="radios === 'Moral'" 
                                                        maxlength="50"
                                                    />
                                                    <v-text-field 
                                                        name="razón social"   
                                                        label="Razón social:" 
                                                        v-model="razonsocial"   
                                                        v-if="radios === 'Moral'" 
                                                        maxlength="200"
                                                        counter
                                                    />
                                                    <v-autocomplete 
                                                        name="clasificacion de persona"
                                                        :items="clasificacionpersonas"
                                                        v-model="clasificacionpersona" 
                                                        v-validate="'required'"
                                                        label="*Clasificación de persona:"
                                                        :disabled="clasificacionBloqueada"
                                                        :error-messages="errors.collect('clasificacion de persona')" 
                                                        no-data-text="Indica primero el medio de denuncia"
                                                    />
                                                    <v-autocomplete name="Persona Desaparecida"
                                                        :items="tDesaparecidos"
                                                        v-model="registro"
                                                        v-validate="requeridoPD"
                                                        chips
                                                        v-show="clasificacionpersona == 'Victima directa' && radios === 'Fisica'"
                                                        label="*¿Es un tema de personas desaparecidas?:"
                                                        :error-messages="errors.collect('Persona Desaparecida')"
                                                        no-data-text="No se encontraron datos"
                                                    />
                                                    <v-text-field 
                                                        name="nombre" 
                                                        label="*Nombre(s):" 
                                                        v-model="nombres"   
                                                        v-validate="'required'"
                                                        v-if="radios == 'Fisica'"
                                                        maxlength="100"
                                                        :error-messages="errors.collect('nombre')" 
                                                    />
                                                    <v-text-field 
                                                        name="nombre del apoderado o representante" 
                                                        label="*Nombre del apoderado o representante" 
                                                        v-model="nombres"   
                                                        v-validate="'required'"
                                                        v-if="radios == 'Moral'"
                                                        maxlength="100"
                                                        :error-messages="errors.collect('nombre del apoderado o representante')" 
                                                    />
                                                    <v-text-field 
                                                        name="apellido paterno" 
                                                        label="*Apellido paterno:" 
                                                        v-model="apaterno" 
                                                        v-validate="'required'"
                                                        maxlength="100"
                                                        :error-messages="errors.collect('apellido paterno')" 
                                                    />
                                                    <v-text-field 
                                                        name="apellido materno"
                                                        label="Apellido materno:"
                                                        v-model="amaterno"
                                                        maxlength="100"
                                                        :error-messages="errors.collect('apellido materno')"
                                                    />
                                                    <v-text-field 
                                                        name="alias" 
                                                        v-model="alias" 
                                                        label="Alias:" 
                                                    />
                                                    <v-text-field 
                                                        name="fecha de nacimiento" 
                                                        label="*Fecha de nacimiento:" 
                                                        v-model="fnacimiento" 
                                                        type="date"
                                                        v-validate="'required'"
                                                        v-if="RangoEdadTF == false"
                                                        :error-messages="errors.collect('fecha de nacimiento')" 
                                                    />
                                                        
                                                    <v-switch v-model="RangoEdadTF" :label="'¿Desconoce la fecha de nacimiento? Agregar un rango de edad'"  color="success" hide-details></v-switch>

                                                    <v-autocomplete
                                                        name="rangos"
                                                        :items="rangosedad"
                                                        v-model="rangoedad"
                                                        v-validate="'required'"
                                                        label="*Rango de edad:"
                                                        v-if="RangoEdadTF == true"
                                                        :error-messages="errors.collect('rangos')"
                                                        no-data-text="No se encontraron datos"
                                                    />
                                                    <v-autocomplete
                                                        name="sexo"
                                                        :items="sexos"
                                                        v-model="sexo"
                                                        label="Sexo:" 
                                                        no-data-text="No se encontraron datos"
                                                    />
                                                    <v-autocomplete
                                                        name="relacion victima"
                                                        :items="relacionados"
                                                        v-model="relacionado"
                                                        label="*Relación de la víctima con el imputado:" 
                                                        v-validate="clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta' ? 'required' : ''"
                                                        v-show="clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta'" 
                                                        :error-messages="errors.collect('relacion victima')" 
                                                        no-data-text="No se encontraron datos"
                                                    />
                                                </v-flex>
                                                <v-flex class="espaciado" xs12 sm12 md6 lg6>    
                                                    <v-autocomplete
                                                        name="entidad federativa"
                                                        :items="estados"
                                                        v-model="abreviacion"
                                                        label="Entidad federativa de nacimiento:" 
                                                        return-object  
                                                        no-data-text="No se encontraron datos"
                                                    />
                                                    <v-autocomplete 
                                                        name="documento de identificación"
                                                        :items="docsidentificaciones"
                                                        v-model="docidentificacion"
                                                        label="Documento de identificación:"
                                                        no-data-text="No se encontraron datos"
                                                    />
                                                    <br/>
                                                    <v-toolbar color="primary" dark> 
                                                        <v-toolbar-title>Documento escaneado</v-toolbar-title>
                                                        <v-spacer />
                                                        <v-dialog v-model="dialog" max-width="500px"> 
                                                            <v-btn slot="activator" icon>
                                                                <v-icon>camera</v-icon>
                                                            </v-btn>
                                                            <v-card>
                                                                <v-toolbar card dark color="grey lighten-4 primary--text">
                                                                    <v-avatar size="30">
                                                                        <v-icon class="grey lighten-2">camera</v-icon>
                                                                    </v-avatar> 
                                                                    <v-toolbar-title class="subheading">Escanear documento</v-toolbar-title>
                                                                    <v-spacer /> 
                                                                </v-toolbar>
                                                                <v-card-text>
                                                                    <v-form ref="form"> 
                                                                        <v-card-actions>
                                                                            <v-layout row wrap>
                                                                                <vue-web-cam 
                                                                                    ref="webcam"
                                                                                    :device-id="deviceId"  
                                                                                    height="400px"  
                                                                                    @started="onStarted" 
                                                                                    @stopped="onStopped" 
                                                                                    @error="onError" 
                                                                                    @cameras="onCameras"
                                                                                    @camera-change="onCameraChange" 
                                                                                />
                                                                                <v-flex xs12 sm6 md3 order-md4 order-sm2>
                                                                                    <v-card tile flat>
                                                                                        <v-card-text class="text-md-center">
                                                                                            <v-btn fab small color="info" @click="onClose">
                                                                                                <v-icon>close</v-icon>
                                                                                            </v-btn>
                                                                                        </v-card-text>
                                                                                    </v-card>
                                                                                </v-flex>
                                                                                <v-flex xs12 sm6 md3 order-md3 order-sm1>
                                                                                    <v-card tile flat>
                                                                                        <v-card-text class="text-md-center">
                                                                                            <v-btn fab small color="info" @click="onCapture">
                                                                                                <v-icon>photo_camera</v-icon>
                                                                                            </v-btn>
                                                                                        </v-card-text>
                                                                                    </v-card>
                                                                                </v-flex>
                                                                                <v-flex xs12 sm6 md3 order-md2 order-sm4>
                                                                                    <v-card tile flat>
                                                                                        <v-card-text class="text-md-center">
                                                                                            <v-btn fab small color="info" @click="onStop">
                                                                                                <v-icon>stop</v-icon>
                                                                                            </v-btn>
                                                                                        </v-card-text>
                                                                                    </v-card>
                                                                                </v-flex>
                                                                                <v-flex xs12 sm6 md3 order-md1 order-sm3>
                                                                                    <v-card tile flat>
                                                                                        <v-card-text class="text-md-center">
                                                                                            <v-btn fab small color="info" @click="onStart">
                                                                                                <v-icon>play_arrow</v-icon>
                                                                                            </v-btn>
                                                                                        </v-card-text>
                                                                                    </v-card>
                                                                                </v-flex>
                                                                            </v-layout>
                                                                        </v-card-actions>  
                                                                    </v-form> 
                                                                </v-card-text> 
                                                            </v-card> 
                                                        </v-dialog> 
                                                    </v-toolbar>
                                                    <v-card>
                                                        <v-container fluid grid-list-md>
                                                        <v-layout row wrap>
                                                            <v-flex class="text-md-center">
                                                                <img   :src="imageUrl"  height="150px" style="max-width: 100%;" v-if="imageUrl"/>
                                                            </v-flex>
                                                        </v-layout>
                                                        </v-container>
                                                    </v-card>
                                                    <v-text-field label="Selecciona la imagen del documento de identificación" @click='pickFile'  v-model='imageName' prepend-icon='attach_file'></v-text-field>

                                                        <input
                                                            type="file"
                                                            style="display: none"
                                                            ref="image"
                                                            accept="image/jpeg, image/jpg"
                                                            @change="onFilePicked"
                                                        >
                                                        <v-autocomplete 
                                                            name="documento que acredita su personalidad"
                                                            :items="documentoacreditas"
                                                            v-model="documentoacredita" 
                                                            v-if="radios == 'Moral'"
                                                            label="Documento que acredita su personalidad:"
                                                            :error-messages="errors.collect('documento que acredita su personalidad')" 
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-text-field 
                                                            name="curp" 
                                                            v-model="curp" 
                                                            label="CURP:"  
                                                        />
                                                        <v-switch name="afrodecendiente" v-model="poblacionafro"   label="¿Pertenece a una población afrodescendiente?:" color="success"  hide-details></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                                <v-spacer />
                                                <div class="text-xs-right">
                                                    <v-btn text @click="step = 3">Regresar</v-btn>
                                                    <v-btn color="primary" @click="substep = 2">Siguiente</v-btn>
                                                </div>
                                            </v-stepper-content>

                                            <v-stepper-content step="2">
                                                <v-layout class="espaciado" xs12 sm12 md6 lg6 wrap justify-space-between>
                                                    <v-flex  xs12 md5 lg5>
                                                        <v-autocomplete name="medio de notificación"
                                                            :items="medionotificaciones"
                                                            v-model="medionotificacion"
                                                            multiple
                                                            return-object
                                                            attach
                                                            chips
                                                            deletable-chips
                                                            label="Medio de notificación:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-text-field label="Teléfono móvil:" maxlength="50" v-model="telefono1"/>
                                                        <v-text-field label="Teléfono fijo:" maxlength="50" v-model="telefono2"/>
                                                        <v-text-field label="Correo electrónico:" maxlength="100" v-model="correo"/>
                                                        <v-autocomplete name="nacionalidad"
                                                            :items="nacionalidades"
                                                            v-model="nacionalidad"
                                                            label="Nacionalidad:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete name="estado familiar"
                                                            :items="estadosciviles"
                                                            v-model="estadocivil"
                                                            label="Estado familiar:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                    </v-flex>
                                                    <v-divider class="mx-2" inset vertical></v-divider>
                                                    <v-flex  xs12 md6 lg6>
                                                        <v-autocomplete name="ocupación"
                                                            :items="ocupaciones"
                                                            v-model="ocupacion"
                                                            label="Ocupación:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete name="nivel de estudios"
                                                            :items="nivelestudios"
                                                            v-model="nivelestudio"
                                                            label="Nivel de estudios:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete name="lengua"
                                                            :items="lenguas"
                                                            v-model="lengua"
                                                            label="Lengua:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete name="religión"
                                                            :items="religiones"
                                                            v-model="religion"
                                                            label="Religión:"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete name="género"
                                                            :items="generos"
                                                            v-model="genero"
                                                            label="Género:"
                                                            v-if="presexuales"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-switch
                                                            v-model="presexuales"
                                                            label="¿Pertenece a la comunidad LGBTTTIQA?"
                                                            color="success"
                                                            hide-details
                                                        />
                                                        <v-switch v-model="switch1" label="¿Tiene alguna discapacidad?:" color="success"  hide-details />
                                                        <v-autocomplete
                                                            name="discapacidad"
                                                            :items="discapaciodades"
                                                            v-model="discapacidad"
                                                            label="¿Que discapacidad tiene?:"
                                                            v-show="switch1"
                                                            multiple
                                                            return-object
                                                            attach
                                                            chips
                                                            deletable-chips
                                                            :menu-props="{ top: true }"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                    </v-flex>
                                                </v-layout>
                                                <div class="text-xs-right">
                                                    <v-btn text @click="substep = 1">Regresar</v-btn>
                                                    <v-btn color="primary" @click="substep = 3">Siguiente</v-btn>
                                                </div>
                                            </v-stepper-content>

                                            <v-stepper-content step="3">
                                                <v-layout class="espaciado" xs12 sm12 md6 lg6 wrap justify-space-between>
                                                    <v-flex  xs12 md5 lg5>
                                                        <v-autocomplete
                                                            name="tipo vialidad"
                                                            :items="vialidades"
                                                            v-model="vialidad"
                                                            label="Tipo de vialidad:" 
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-text-field 
                                                            label="Nombre:"
                                                            name="calle"
                                                            v-model="calle"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('calle')"
                                                        />
                                                        <v-text-field 
                                                            name="numero exterior"
                                                            label="No. exterior:"
                                                            v-model="noExt"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('numero exterior')"
                                                        />
                                                        <v-text-field label="No. Interior:" maxlength="100" v-model="noInt"/>
                                                        <v-text-field label="Entre calle 1:" maxlength="200" v-model="entreCalle1"/>
                                                        <v-text-field label="Entre calle 2:" maxlength="200" v-model="entreCalle2"/>
                                                        <v-text-field label="Referencia:" maxlength="300" v-model="referencia"/>
                                                    </v-flex>
                                                    <v-divider class="mx-2" inset vertical></v-divider>
                                                        <v-flex  xs12 md6 lg6>
                                                            <v-text-field 
                                                                label="Pais:"
                                                                name="pais"
                                                                v-model="pais"
                                                                value="México"
                                                                maxlength="100"
                                                            />
                                                            <v-autocomplete
                                                                label="Estado:"
                                                                name="estado"
                                                                v-model="estadoidP"
                                                                :items="ciudadesP"
                                                                return-object
                                                                v-on:change="listarPorEstado"
                                                                no-data-text="No se encontraron datos"
                                                            />
                                                            <v-autocomplete 
                                                                label="Municipio:"
                                                                name="municipio"
                                                                v-model="municipioidP"
                                                                :items="municipiosP"
                                                                return-object
                                                                v-on:change="listarPorMunicipio"
                                                                no-data-text="No se encontraron datos"
                                                            />
                                                            <v-autocomplete 
                                                                label="Localidad:"
                                                                name="localidad"
                                                                v-model="localidadidP"
                                                                :items="localidadesP"
                                                                return-object
                                                                v-on:change="listarPorLocalidad"
                                                                no-data-text="No se encontraron datos"
                                                            />
                                                            <v-autocomplete
                                                                name="tipo asentamiento"
                                                                :items="asentamientos"
                                                                v-model="asentamiento"
                                                                label="Tipo de asentamiento:" 
                                                                no-data-text="No se encontraron datos"
                                                            />
                                                            <v-text-field
                                                                label="Código postal:"
                                                                name="cp"
                                                                v-model="cp"
                                                                @keypress="soloNumerosKeypress"
                                                                @keyup.enter="buscarPorCP()"  
                                                            />
                                                            <v-layout wrap justify-space-between>
                                                                <v-flex  xs6 md6 lg6>
                                                                    <v-text-field
                                                                        v-model="lat"
                                                                        label="Latitud:"
                                                                        disabled
                                                                    ></v-text-field>
                                                                </v-flex>
                                                                <v-flex  xs6 md6 lg6>
                                                                    <v-text-field
                                                                        v-model="lng"
                                                                        label="Longitud:"
                                                                        disabled
                                                                ></v-text-field>
                                                                </v-flex>
                                                            </v-layout>
                                                            <!-- <v-btn block="" v-if="switch2==false"  @click.native="btn_geoloc2" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn> -->
                                                        </v-flex>
                                                    </v-layout>
                                                    <div class="text-xs-right">
                                                        <v-btn text @click="substep = 2">Regresar</v-btn>
                                                        <v-btn color="primary" text @click="substep = 4"">Siguiente</v-btn>
                                                    </div>
                                            </v-stepper-content>

                                            <v-stepper-content step="4">
                                                <v-layout class="espaciado" xs12 sm12 md6 lg6 wrap justify-space-between>
                                                    <v-flex  xs12 md5 lg5>
                                                        <v-switch v-model="duplicarDireccion" @change="dupdiresc()" label="¿La dirección de notificación es la misma que la dirección personal?:" color="success"  hide-details></v-switch>
                                                        <v-autocomplete
                                                            name="tipo vialidad"
                                                            :items="de_vialidades"
                                                            v-model="de_vialidad"
                                                            label="Tipo de vialidad:" 
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-text-field label="Calle:"
                                                            name="calle"
                                                            v-model="de_calle"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('calle')"
                                                        />
                                                        <v-text-field name="numero exterior"
                                                            label="No. exterior:"
                                                            v-model="de_noExt"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('numero exterior')"
                                                        />
                                                        <v-text-field label="No. Interior:" maxlength="100" v-model="de_noInt"/>
                                                        <v-text-field label="Entre calle 1:" maxlength="200" v-model="de_entreCalle1"/>
                                                        <v-text-field label="Entre calle 2:" maxlength="200" v-model="de_entreCalle2"/>
                                                        <v-text-field label="Referencia:" maxlength="300" v-model="de_referencia"/>
                                                    </v-flex>
                                                    <v-divider class="mx-2" inset vertical></v-divider>
                                                    <v-flex  xs12 md6 lg6>
                                                        <v-text-field label="Pais:"
                                                            name="pais"
                                                            v-model="de_pais"
                                                            value="México"
                                                            maxlength="100"
                                                        />
                                                        <v-autocomplete label="Estado:"
                                                            name="estado"
                                                            v-model="de_estadoid"
                                                            :items="de_ciudades"
                                                            return-object
                                                            v-on:change="de_listarPorEstado"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete label="Municipio:"
                                                            name="municipio"
                                                            v-model="de_municipioid"
                                                            :items="de_municipios"
                                                            return-object
                                                            v-on:change="de_listarPorMunicipio"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete label="Localidad:"
                                                            name="localidad"
                                                            v-model="de_localidadid"
                                                            :items="de_localidades"
                                                            return-object
                                                            v-on:change="de_listarPorLocalidad"
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-autocomplete
                                                            name="tipo asentamiento"
                                                            :items="de_asentamientos"
                                                            v-model="de_asentamiento"
                                                            label="Tipo de asentamiento:" 
                                                            no-data-text="No se encontraron datos"
                                                        />
                                                        <v-text-field
                                                            label="Código postal:"
                                                            name="cp"
                                                            v-model="de_cp"
                                                            @keypress="soloNumerosKeypress"
                                                            @keyup.enter="buscarPorCP()"
                                                        />
                                                        <v-layout wrap justify-space-between>
                                                            <v-flex  xs6 md6 lg6>
                                                                <v-text-field
                                                                    v-model="de_lat"
                                                                    label="Latitud:"
                                                                    disabled
                                                                ></v-text-field>
                                                            </v-flex>
                                                            <v-flex  xs6 md6 lg6>
                                                                <v-text-field
                                                                    v-model="de_lng"
                                                                    label="Longitud:"
                                                                    disabled
                                                                ></v-text-field>
                                                            </v-flex>
                                                        </v-layout>
                                                        <!-- <v-btn block="" v-if="switch2==false"  @click.native="btn_geoloc01" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn> -->
                                                    </v-flex>
                                                </v-layout>
                                                <div class="text-xs-right">
                                                    <v-btn text @click="substep = 3">Regresar</v-btn>
                                                    <v-btn color="primary" text @click="substep = 5" v-if="mediodenuncia == 'Con detenido'">Siguiente</v-btn>
                                                    <v-btn color="primary" @click.native="step = 5" v-if="mediodenuncia != 'Con detenido'">Continuar</v-btn>
                                                </div>
                                            </v-stepper-content>

                                            <v-stepper-content step="5">
                                                <v-layout class="espaciado" xs12 sm12 md6 lg6 wrap justify-space-between>
                                                    <v-flex class="espaciado" xs12 md5 lg5>
                                                        <v-text-field 
                                                            name="Nombre de policia" 
                                                            label="*Nombre(s):" 
                                                            v-model="nombrep"   
                                                            v-validate="'required'"
                                                            v-if="mediodenuncia == 'Con detenido'"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('Nombre de policia')"
                                                        />
                                                        <v-text-field 
                                                            name="apellido paterno del policia" 
                                                            label="*Apellido paterno:" 
                                                            v-model="apaternop" 
                                                            v-validate="'required'"
                                                            v-if="mediodenuncia == 'Con detenido'"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('apellido paterno del policia')"
                                                        />
                                                    </v-flex>
                                                    <v-flex class="espaciado" xs12 sm12 md6 lg6  >
                                                        <v-text-field 
                                                            name="apellido materno del policia" 
                                                            label="*Apellido materno:" 
                                                            v-model="amaternop"
                                                            v-validate="'required'"
                                                            v-if="mediodenuncia == 'Con detenido'"
                                                            maxlength="100"
                                                            :error-messages="errors.collect('apellido materno del policia')"
                                                        />
                                                        <v-autocomplete 
                                                            name="institucíon"  
                                                            :items="institucionesp"
                                                            v-model="institucionp"
                                                            v-validate="'required'" 
                                                            label="*Institución:"
                                                            v-if="mediodenuncia == 'Con detenido'"
                                                            :error-messages="errors.collect('institucíon')"
                                                        />
                                                    </v-flex>
                                                    <v-flex class="espaciado" xs12 sm12 md12 lg12  >
                                                        <v-text-field 
                                                            name="informe policial" 
                                                            label="*Informe policial:" 
                                                            v-model="informep"
                                                            v-validate="'required'"
                                                            v-if="mediodenuncia == 'Con detenido'"
                                                            :error-messages="errors.collect('informe policial')"
                                                        />
                                                    </v-flex>
                                                </v-layout>
                                                <div class="text-xs-right">
                                                    <v-btn text @click="substep = 3">Regresar</v-btn>
                                                    <v-btn color="primary" @click="step =5">Continuar</v-btn>
                                                </div>
                                            </v-stepper-content>
                                        </v-stepper-items>
                                    </v-stepper>
                                </v-sheet>
                                <!-- Fin del stepper interno -->
                            </v-container> 
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-step :editable="step !== 5" :complete="step > 5" step="5" @click="step = 5" :rules="[() => !errors.has('entidad') && !errors.has('localidad o colonia') && !errors.has('Hora de hechos') && !errors.has('municipios') && !errors.has('fecha de los hechos')]">
                        <div class="d-flex align-center">
                            Datos de los hechos
                            <v-btn v-show="step === 5" icon small @click.stop="ayuda = true">
                                <v-icon color="primary">help_outline</v-icon>
                            </v-btn>
                        </div>
                    </v-stepper-step>
                    <v-stepper-content step="5">
                        <v-card  color="grey lighten-5" elevation=2>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                        <v-autocomplete 
                                            name="entidad"
                                            :items="entidades"
                                            v-model="entidad" 
                                            v-validate="'required'"
                                            label="*Entidad:"
                                            return-object
                                            prepend-icon="public"
                                            @change="listarmunicipios()"
                                            :error-messages="errors.collect('entidad')" 
                                            no-data-text="No se encontraron datos"
                                        />
                                        <v-autocomplete 
                                            name="municipios"
                                            :items="municipios"
                                            v-model="municipio" 
                                            v-validate="'required'"
                                            label="*Municipios:"
                                            return-object
                                            prepend-icon="map"
                                            @change="listarlocalidades()"
                                            :error-messages="errors.collect('municipios')" 
                                            no-data-text="No se encontraron datos"
                                        />
                                        <v-autocomplete 
                                            name="localidad o colonia"
                                            :items="localidades"
                                            v-model="localidad" 
                                            v-validate="'required'"
                                            label="*Localidad o colonia:"
                                            return-object
                                            prepend-icon="location_on"
                                            :error-messages="errors.collect('localidad o colonia')" 
                                            no-data-text="No se encontraron datos"
                                        />
                                        </v-flex>
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                        <v-menu
                                            ref="menu5"
                                            v-model="menu5"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="horas"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    name= 'Hora de hechos'
                                                    v-model="horas"
                                                    label="*Hora  de hechos:"
                                                    prepend-icon="access_time"
                                                    readonly
                                                    v-on="on"
                                                    v-validate="'required'"                                   
                                                    :error-messages="errors.collect('Hora de hechos')"
                                                />
                                            </template>
                                            <v-time-picker v-model="horas" full-width />
                                            <v-card>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn text color="primary" @click="$refs.menu5.save(horas)">OK</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-menu>
                                        <v-menu
                                            ref="menu4"
                                            v-model="menu4"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechahechos"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    name='fecha de los hechos'
                                                    :value="fechah"
                                                    label="*Fecha de los hechos:"
                                                    prepend-icon="event"
                                                    clearable 
                                                    readonly
                                                    v-on="on"
                                                    v-validate="'required'"                                   
                                                    :error-messages="errors.collect('fecha de los hechos')"
                                                />
                                            </template>
                                            <v-date-picker locale="es" v-model="fechahechos" no-title scrollable>
                                                <v-spacer />
                                                <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif('menu4')">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                </v-layout>
                            </v-container> 
                            <div class="text-xs-right">
                                <v-btn @click.native="step = 4">Regresar</v-btn>
                                <v-btn color="primary" @click.native="guardar()">Guardar</v-btn>
                            </div>
                        </v-card>
                    </v-stepper-content>
            </v-stepper>
        </v-flex>

        <!-- Modal de ayuda dinamico  -->
        <v-dialog v-model="ayuda" max-width="500px">
            <v-card>
                <v-card-title class="headline">{{ ayudas[step] ? ayudas[step].titulo : 'Ayuda' }}</v-card-title>
                <v-card-text>
                {{ ayudas[step] ? ayudas[step].texto : 'Contenido de ayuda no disponible.' }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="ayuda = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Loader secundario  -->
        <div v-if="cargando" class="fullscreen-loader-secundary">
            <v-card color="primary" dark class="loader-card-secundary">
                <v-card-text>
                    {{ textoCargando }}
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </div>
        <!-- Toast secundario  -->
        <v-snackbar
            :timeout="4000"
            :color="snackbarColor"
            :value="snackbarVisible"
            top
            right
            @input="snackbarVisible = $event"
            >
            {{ snackbarMessage }}
            <v-btn flat @click="snackbarVisible = false">Cerrar</v-btn>
        </v-snackbar>
    </v-layout>
</template>

<script> 
    import axios from 'axios'  
    import VeeValidate from 'vee-validate' 
    import { WebCam } from "vue-web-cam";
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas' 
    import { REPL_MODE_SLOPPY } from 'repl';
    import moment from 'moment'
    import 'moment/locale/es';
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
    import Swal from 'sweetalert2'
    import { computed } from 'vue';

    var assert, curp, persona;
    assert = require('assert');
    curp = require('curp.js');  

    export default {
        components: {
            "vue-web-cam": WebCam,
            n401,
            n403
        },
        data: () => ({

            expanded: [],
            logueado: false,

            //-----CLAIM------------------------------------------
            u_iddistrito: '',
            u_distrito: '',
            u_dirSubPro: '',
            u_idagencia: '',
            u_agencia: '',
            u_idmoduloservicio: '',
            u_modulo: '',
            u_idusuario: '',
            u_nombre: '',
            u_clave: '',
            u_rol: '',
            u_puesto: '',
            u_subproc: '',
            p_nombre: '',
            p_puesto: '',
            //----------------------------------------------------
            showpage: true,
            e401: false,
            e403: false,
            //----------------------------------------------------
            step: 1,
            substep: 1,
            distritos: [],
            distritoinicia: '',
            distritosintegra: [],
            distritointegra: '',
            distritointegraid: '',
            subprocsintegra: [],
            subrpocsinicia: [],
            subprocinicia: '',
            subprocintegra: '',
            subprocintegraid: '',
            agenciasintegra: [],
            agenciasinicia: [],
            agenciaintegra: '',
            agenciaintegraid: '',
            agenciainicia: '',
            modulosintegra: [],
            modulointegraid: '',
            modulosinicia: [],
            diferenteRadicacion: false,
            modulointegra: '',
            moduloinicia: '',
            nuc: '',
            fechainicio: '',
            fechai: '',
            fecharadicacion: '',
            fechar: '',
            narrativa: '',
            menu1: false,
            menu2: false,
            mediodenuncias: [
                { text:'Denuncia',value:'Denuncia' },
                { text:'Noticia de hechos',value:'Noticia de hechos' },
                { text:'Con detenido',value:'Con detenido' },
            ],
            mediodenuncia: '',
            fechadetencion: '',
            fechad: '',
            menu3: '',
            institucionesp: [],
            institucionp: '',
            entidades: [],
            entidad: '',
            municipios: [],
            municipio: '',
            localidades: [],
            localidad: '',
            fechahechos: '',
            fechah: '',
            horas: '',
            menu3: false,
            menu4: false,
            menu5: false,
            rHechoId: '',
            rAtencionId: '',
            medioreportes: [
                { text: 'Escrito', value: 'Escrito' },
                { text: 'Internet', value: 'Internet' },
                { text: 'C5i', value: 'C5i' },
            ],
            medioreporte: '',
            integracion: false,
            nucdisponible: '',
            consultadenuc: false,
            cveDistrito: '',
            distritosh: [],
            yearcarpeta: '',
            yearsfile: [
                '2020',
                '2019',  
                '2018',
                '2017',
                '2016',
                '2015',
                '2014'                                                                                                                                                                
            ],
            numcarpeta: '',
            dialog: false,
            clasificacionBloqueada: false,

            // Validaciones de creacion NUC
            claveNucDif: [
                { value: 1, text: 'Fiscalia de Adolescentes', rango: 5, nom:1, text1: 'ADO', text2: 'HGO'},
                { value: 2, text: 'CAVIT - Fiscalia de Delitos Sexuales y Contra la Familia', rango: 5, nom:2, text1: 'CAVIT', text2: 'HGO'},
                { value: 3, text: 'COE - Homicidios y Narcomenudeo', rango: 5, nom:3, text1: 'COE', text2: 'HGO'},
                { value: 4, text: 'Tlaxcopan', rango: 5, nom:2, text1: '', text2: 'HGO'},
                { value: 5, text: 'Fiscalia de Corrupcion', nom:4, rango: 5, text1: 'Unidad ', text2: 'FEDC'},
                { value: 6, text: 'Unidades con Detenido', nom:2, rango: 5, text1: 'UICD', text2: 'HGO'},
                { value: 7, text: 'Hospital General', nom:3, rango: 5, text1: 'HG', text2: 'HGO'},
            ],
            nucDif: false,
            nucClave: '',
            nucClave2: '',
            nucClave3: '',
            nucClaveMomentanea: '',
            nucMomentanea: false,
            nucValue: '',
            nucNom: 0,
            nucRango: 5,
            nucUnidad: '',
            nucRomano: '',
            distritoValidado: false,
            requiereUnidad: false,

            // Catalogos de la persona
            tDesaparecidos: [
                {text:"Si",value:true},
                {text:"No",value:false},
            ],
            relacionados:[
                {text:'Abuelo(a)',value:'Abuelo(a)'},
                {text:'Cónyuge o pareja',value:'Cónyuge o pareja'},
                {text:'Amigo',value:'Amigo'},
                {text:'Expareja',value:'Expareja'},
                {text:'Hermano(a)',value:'Hermano(a)'},
                {text:'Hijo(a)',value:'Hijo(a)'},
                {text:'Jefe(a) o patron(a)',value:'Jefe(a) o patron(a)'},
                {text:'Madre o padre',value:'Madre o padre'},
                {text:'Nieto(a)',value:'Nieto(a)'},
                {text:'Novio(a)',value:'Novio(a)'},
                {text:'Padrastro/madrastra',value:'Padrastro/madrastra'},
                {text:'Primo(a)',value:'Primo(a)'},
                {text:'Sobrino(a)',value:'Sobrino(a)'},
                {text:'Tio(a)',value:'Tio(a)'},
                {text:'Vecino(a)',value:'Vecino(a)'},
                {text:'Conocido(a)',value:'Conocido(a)'},
                {text:'Ninguna',value:'Ninguna'},
                {text:'Se desconoce',value:'Se desconoce'},
            ],
            documentoacreditas:[
                {text:"Nombramiento",value:"Nombramiento"},
                {text:"Poder notarial",value:"Poder notarial"},
                {text:"Instrumento notarial",value:"Instrumento notarial"}
            ],
            clasificacionpersonas:[],
            sexos:[],
            docsidentificaciones:[],
            estados:[],
            rangosedad:[],
            medionotificaciones:[],
            nacionalidades:[],
            estadosciviles:[],
            ocupaciones:[],
            nivelestudios:[],
            lenguas:[],
            religiones:[],
            generos:[],
            discapaciodades:[],

            // Captura de persona inicial
            datosprotegidos: false,
            radios: 'Fisica',
            rfc:'',
            razonsocial:'',
            clasificacionpersona:'',
            requeridoPD: '',
            nombres:'',
            apaterno:'',
            amaterno:'',
            alias:'',
            fnacimiento:'',
            RangoEdadTF: false,
            rangoedad:'',
            sexo:'',
            registro: [],
            relacionado:'',
            abreviacion:'',
            docidentificacion:'',
            curp:'',
            relacion:false,
            documentoacredita: '',
            ruta: '',
            
            camera: null,
            deviceId: null,
            devices: [],
            
            imageName: '',
            imageUrl: null,
            imageFile: '',
            
            medionotificacion:'',
            telefono1:'',
            telefono2:'',
            correo:'',
            nacionalidad:'Mexicana',
            estadocivil:'',
            ocupacion:'',
            nivelestudio:'',
            lengua:'',
            religion:'',
            genero:'',
            presexuales:false,
            switch1: false,
            discapacidad:'',
            verR: false,
            verI: false,

            // DIRECCION PERSONAL
            calle:'',
            noExt:'',
            noInt:'',
            entreCalle1:'',
            entreCalle2:'',
            referencia:'',
            pais:'Mexico',
            
            vialidad: '',
            vialidades: [],

            asentamiento: '',
            asentamientos: [],

            estadoP:'',
            estadoidP:0,
            ciudadesP:[],
    
            municipioP:'',
            municipioidP:0,
            municipiosP:[],
    
    
            localidadP:'',
            localidadidP:0,
            localidadesP:[],
    
            cp:'',
            lat:'',
            lng:'',

            // DIRECCION ESCUCHA
            duplicarDireccion:false,
            de_calle:'',
            de_noExt:'',
            de_noInt:'',
            de_entreCalle1:'',
            de_entreCalle2:'',
            de_referencia:'',
            de_pais:'Mexico',
            
            de_vialidad: '',
            de_vialidades: [],

            de_asentamiento: '',
            de_asentamientos: [],

            de_estado:'',
            de_estadoid:0,
            de_ciudades:[],
    
            de_municipio:'',
            de_municipioid:0,
            de_municipios:[],
    
    
            de_localidad:'',
            de_localidadid:0,
            de_localidades:[],
    
            de_cp:'',
            de_lat:'',
            de_lng:'',

            //Variables de policia
            nombrep:'',
            amaternop:'',
            apaternop:'',
            informep:'',
            impuDetenido:false,
            poblacionafro:false,
            edadf:'',
            GUID:'',

            // Variables del modal ayuda 
            ayuda: false,
            ayudas: {
                1: {
                    titulo: 'Ayuda - Datos de la unidad que inicia',
                    texto: 'En este apartado debes seleccionar la unidad que inició la carpeta de investigación, así como la persona que realizó el registro. Por ello, todos los campos son obligatorios.'
                },
                2: {
                    titulo: 'Ayuda - Datos de la unidad donde se encuentra la carpeta',
                    texto: 'Aquí se muestra la ubicación de la persona que está registrando la información y posee físicamente la carpeta. Si otra agencia la resguarda, no debes de registrar la carpeta.'
                },
                3: {
                    titulo: 'Ayuda - Datos de la carpeta de investigación',
                    texto: 'Debes ingresar los datos esenciales de la investigación, como el NUC, la fecha de inicio, el medio de denuncia y la narrativa de los hechos. ¡CUIDADO! Verifica cuidadosamente el NUC antes de registrarlo.'
                },
                4: {
                    titulo: 'Ayuda - Datos de la persona que inició',
                    texto: 'Es necesario registrar los datos de la persona que inició la carpeta. Se recomienda completar todos los campos para asegurar la precisión y calidad de la información.'
                },
                5: {
                    titulo: 'Ayuda - Datos de los hechos',
                    texto: 'En este apartado debes ingresar el lugar y el momento en que ocurrieron los hechos relacionados con la carpeta de investigación. Esta información es clave para el desarrollo del caso.'
                }
            },
            cargando: false,
            textoCargando: '',
            snackbarVisible: false,
            snackbarMessage: '',
            snackbarColor: 'success'
        }),
        mounted() {
            
        },
        computed:{
            logueado(){
                return this.$store.state.usuario;
            },
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
            esRecepcion(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
            },
            esAMPOAMP(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP';
            },
            esDirector(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
            },
            esCoordinador(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
            },
            esAmpoMixto(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP Mixto';
            },
            esFacilitador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
            },
            usuario(){
                return this.$store.state.usuario.usuario;
            },
            email(){
                return this.$store.state.usuario.email;
            },
            drawer(){
                return this.$store.state.drawer
            }
        },
        created () {
            this.u_iddistrito = this.$store.state.usuario.iddistrito;
            this.u_distrito = this.$store.state.usuario.distrito;
            this.u_dirSubPro = this.$store.state.usuario.dirSubProc;
            this.u_iddirSubPro = this.$store.state.usuario.iddirSubProc;
            this.u_idagencia = this.$store.state.usuario.idagencia;
            this.u_agencia = this.$store.state.usuario.agencia;
            this.u_idmoduloservicio = this.$store.state.usuario.idmoduloservicio;
            this.u_modulo = this.$store.state.usuario.modulo;
            this.u_idusuario = this.$store.state.usuario.idusuario;
            this.u_nombre = this.$store.state.usuario.usuario;
            this.u_clave = this.$store.state.usuario.clave;
            this.u_rol = this.$store.state.usuario.rol;
            this.u_puesto = this.$store.state.usuario.puesto;
            this.u_subproc = this.$store.state.usuario.subProc;

            // Unidad donde se logea el usuario
            this.distritointegraid = this.u_iddistrito;
            this.subprocintegraid = this.u_iddirSubPro;
            this.agenciaintegra = this.u_agencia;
            this.agenciaintegraid = this.u_idagencia;
            this.modulointegra = this.u_modulo;
            this.modulointegraid = this.u_idmoduloservicio;

            this.selectDistritoIntegra(this.distritointegraid);

            // DATOS GENERALES
            this.listardistritos();
            this.listarinstituciones();
            this.listarentidades();
            this.listarcvedistritos();
            this.listarRangoEdad();
            this.listarIdentificacion();
            this.listarEstados();
            this.listarSexo();
            this.listarMedionotificacion();
            this.listarNacionalidad();
            this.listarEstadoCivil();
            this.listarOcupacion();
            this.listarNivelEstudio();
            this.listarLengua();
            this.listarReligion();
            this.listarGenero();
            this.listarDiscapacidad();
            this.listarCiudades();
            this.de_listarCiudades();
            this.listarVialidad();
            this.listarAsentamiento();
            // Add a request interceptor
            axios.interceptors.request.use((config)=> {
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
            }, (err)=> {
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });
        },
        watch: {
            clasificacionpersona(val){
                if(val === 'Victima directa' && this.radios === 'Fisica'){
                    this.requeridoPD = 'required';
                    
                }else if(val !== 'Victima directa'){
                    this.requeridoPD = '';
                    this.registro = false;
                    this.verI = false;
                    this.verR = false;
                }
                if (val !== 'Victima directa' && val !== 'Victima indirecta') {
                    this.relacionado = "";
                }
            },
            radios(val) {
                this.verTP = val === 'Moral' ? 1 : 0;

                if (this.verTP === 1) {
                    this.requiredRZ = 'required';
                }else{
                    this.requiredRZ = '';
                }
            },
            RangoEdadTF(val){
                if(!val){
                    this.fnacimiento = '';
                    this.$nextTick(() => {
                        this.rangoedad = '';
                    });
                }
            },
            registro(valor){
                if(valor === true){
                    this.verI = true;
                    this.verR = true;
                } 
                else if(valor == false){
                    this.verI = false;
                    this.verR = false;
                }
            },
            relacion(val){
                if(!val){
                    this.relacionado = '';
                }
            },
            devices: function() {
                const [first, ...tail] = this.devices;
                if (first) {
                    this.camera = first.deviceId;
                    this.deviceId = first.deviceId;
                }
            },
            camera: function(id) {
                this.deviceId = id;
            },
            mediodenuncia(nuevoValor) {
                this.substep = 1;
                if (nuevoValor === 'Con detenido') {
                    this.clasificacionpersona = 'Imputado';
                    this.clasificacionBloqueada = true;
                    this.impuDetenido = true;
                } else {
                    this.clasificacionpersona = '';
                    this.clasificacionBloqueada = false;
                    this.impuDetenido = false;
                }
            },
            presexuales(val){
                if(!val){
                    this.genero = '';
                }
            },
            switch1(val){
                if(val){
                    this.discapacidad = '';
                }
            },
            nucDif(val){
                this.yearcarpeta = '';
                this.cveDistrito = '';
                this.numcarpeta = '';
                this.nucUnidad = '';
                this.nucRomano = '';
                this.nuc = '';
                this.nucValue = '';
                this.nucRango = 5;
                this.nucdisponible = false;
            },
            numcarpeta() {
                this.nucdisponible = false;
            },
            yearcarpeta() {
                this.nucdisponible = false;
            },
            cveDistrito() {
                this.nucdisponible = false;
            },
            integracion(val) {
                this.distritointegraid = this.u_iddistrito;
                this.subprocintegraid = this.u_iddirSubPro;
                this.agenciaintegra = this.u_agencia;
                this.agenciaintegraid = this.u_idagencia;
                this.modulointegra = this.u_modulo;
                this.modulointegraid = this.u_idmoduloservicio;

                this.selectDistritoIntegra(this.distritointegraid);
            },
            agenciainicia(val) {
                this.validarAgencias();
            },
            agenciaintegraid(val) {
                this.validarAgencias();
            },
            nucUnidad(val) {
                this.nucdisponible = false;
            },
            nucValue(val){
                this.yearcarpeta = '';
                this.numcarpeta = '';
                this.nucUnidad = '';
                this.nucRomano = '';
                this.nuc = '';
                this.nucdisponible = false;
                this.distritoValidado = false;
                this.nucMomentanea = false;
                this.cveDistrito = '';
                this.requiereUnidad = [4, 5].includes(val);

                if (val === 4) {
                    this.distritoValidado = true;
                    const distrito = this.distritosh.find(x => x.value === '16-TLAX');
                    if (distrito) {
                        this.cveDistrito = distrito;
                    }
                } else if (val === 5) {
                    this.distritoValidado = true;
                    const distrito = this.distritosh.find(x => x.value === '12');
                    if (distrito) {
                        this.cveDistrito = distrito;
                    }
                }
            },
            nucMomentanea(val) {
                this.nucdisponible = false;
                if(val) {
                    this.nucClave3 = this.nucClaveMomentanea;
                    this.permisoActualizarNuc();
                } else {
                    this.nucClave3 = '';
                    this.permisoActualizarNuc();
                }
            },
        },
        computed: {
            device: function() {
                return this.devices.find(n => n.deviceId === this.deviceId);
            },
            puedeValidarNUC() {
                return (
                    this.cveDistrito && this.yearcarpeta && this.numcarpeta && this.nuc &&
                    !/^0+$/.test(this.numcarpeta) &&
                    (
                        (!this.requiereUnidad || (this.requiereUnidad && this.nucUnidad))
                    )
                );
            },
            getNucErrorMessages() {
                if (this.errors.has('NUC')) {
                    return this.errors.collect('NUC');
                }
                if (this.nucdisponible === false) {
                    return ['NUC no validada'];
                }
                return [];
            }
        },
        methods:{ 
            limpiar () {    
                
            },
            listardistritos () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.distritos.push({ text: x.nombre, value: x.idDistrito });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        //me.$notify("No es un usuario válido", 'error')
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        //me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        //me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404){
                        //me.$notify("El recuso no ha sido encontrado", 'error')
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        //me.$notify('Error al intentar listar los registros!!!', 'error') 
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')   
                    } 
                });
            },  
            listardistritosIntegra () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.distritosintegra.push({ text: x.nombre, value: x.idDistrito });
                    });

                    if (me.integracion == false){
                        me.selectDSubprocIntegra(me.subprocintegraid);
                    }
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404){
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')    
                    } 
                });
            }, 
            listarsubprocintegra () {
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion = { headers : header };
                var arraysdatos = []; 
                //me.subprocsintegra = []
                if (!me.distritointegraid.value == 0){
                    me.distritointegra = me.distritointegraid.text;
                    me.distritointegraid = me.distritointegraid.value;
                    me.subprocsintegra = [];
                    me.subprocintegra = '';
                    me.subprocintegraid = '';
                    me.agenciasintegra = [];
                    me.agenciaintegra = '';
                    me.agenciaintegraid = '';
                    me.modulosintegra = [];
                    me.modulointegra = '';
                    me.modulointegraid = '';
                } else if (!me.distritointegraid) {
                    return;
                }
                this.$conf.get('api/DSPs/ListarPorDistritoId/' + me.distritointegraid,configuracion).then(function(response){
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.subprocsintegra.push({ text: x.nombreSubDir, value: x.idDSP});
                    });

                    if (me.integracion == false){
                        me.selectAgenciaIntegra(me.agenciaintegraid);
                    }
                }).catch(err => { 
                    if (err.response.status == 400) {
                        //me.$notify("No es un usuario válido", 'error')
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        //me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        //me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        //me.$notify("El recuso no ha sido encontrado", 'error')
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        //me.$notify('Error al intentar listar los registros!!!','error') 
                        me.mostrarToast('Error al intentar listar los registros!!!','error')   
                    } 
                });
            },
            listarsubprocinicia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.subrpocsinicia = []
                me.subprocinicia = '';
                me.agenciasinicia = [];
                me.agenciainicia = '';
                me.modulosinicia = [];
                me.moduloinicia = '';

                this.$conf.get('api/DSPs/ListarPorDistritoIdCap/' + me.distritoinicia.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.subrpocsinicia.push({ text: x.nombreSubDir, value: x.idDSP });
                    });
                }).catch(err => { 
                    if (err.response.status==400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401){
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!','error')    
                    }
                });
            },
            listaragenciaintegra () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                //me.agenciasintegra = []
                if (!me.subprocintegraid.value == 0){
                    me.subprocintegra = me.subprocintegraid.text;
                    me.subprocintegraid = me.subprocintegraid.value;
                    me.agenciasintegra = [];
                    me.agenciaintegra = '';
                    me.agenciaintegraid = '';
                    me.modulosintegra = [];
                    me.modulointegra = '';
                    me.modulointegraid = '';
                } else if (!me.subprocintegraid) {
                    return;
                }
                this.$conf.get('api/Agencias/ListarPorDirSub/' + me.subprocintegraid, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.agenciasintegra.push({ text: x.nombre, value: x.idAgencia });
                    });
                    if (me.integracion == false){
                        me.selectModuloIntegra(me.modulointegraid);
                    }
                }).catch(err => { 
                    if (err.response.status == 400) {
                        //me.$notify("No es un usuario válido", 'error')
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        //me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        //me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        //me.$notify("El recuso no ha sido encontrado", 'error')
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        //me.$notify('Error al intentar listar los registros!!!','error') 
                        me.mostrarToast('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listaragenciainicia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.agenciasinicia = []
                me.agenciainicia = '';
                me.modulosinicia = [];
                me.moduloinicia = '';
                this.$conf.get('api/Agencias/ListarPorDirSub/' + me.subprocinicia.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.agenciasinicia.push({ text: x.nombre, value: x.idAgencia });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },  
            listarmoduloinicia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.modulosinicia = [];
                me.moduloinicia = '';

                this.$conf.get('api/ModuloServicios/ListarPorAgenciaCap/' + me.agenciainicia.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.modulosinicia.push({ text: x.nombre, value: x.idModuloServicio });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listarmodulointegra () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 

                if (!me.agenciaintegraid.value == 0){
                    me.agenciaintegra = me.agenciaintegraid.text;
                    me.agenciaintegraid = me.agenciaintegraid.value;
                    me.modulosintegra = [];
                    me.modulointegra = '';
                    me.modulointegraid = '';
                } else if (!me.agenciaintegraid) {
                    return;
                }

                this.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.agenciaintegraid, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.modulosintegra.push({ text: x.nombre, value: x.idModuloServicio });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },

            selectDistritoIntegra: function(val) {
                let me=this;
                for (var i = 0; i < me.distritosintegra.length; i++) {
                    if (me.distritosintegra[i].value === val)
                    {
                        me.distritointegraid = me.distritosintegra[i].value;
                    }
                }
                me.listardistritosIntegra();
            },

            selectDSubprocIntegra: function(val) {
                let me=this;
                for (var i = 0; i < me.subprocsintegra.length; i++) {
                    if (me.subprocsintegra[i].value === val)
                    {
                         me.subprocintegraid = me.subprocsintegra[i].value;
                    }
                }
                me.listarsubprocintegra();
            },

            selectAgenciaIntegra: function(val) {
               let me=this;
                for (var i = 0; i < me.agenciasintegra.length; i++) {
                    if (me.agenciasintegra[i].value === val)
                    {
                        me.agenciaintegraid = me.agenciasintegra[i].value;
                    }
                }
                me.listaragenciaintegra();
            },

            selectModuloIntegra: function(val) {
               let me=this;
                for (var i = 0; i < me.modulosintegra.length; i++) {
                    if (me.modulosintegra[i].value === val)
                    {
                        me.modulointegraid = me.modulosintegra[i].value;
                    }
                }
                me.listarmodulointegra();
            },

            ModuloIntegra(val) {
                const seleccion = this.modulosintegra.find(x => x.value === val);
                if (seleccion) {
                    this.modulointegra = seleccion.text;
                } else {
                    this.modulointegra = '';
                }
            },

            fechainif(menuKey) {
                const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

                const config = {
                    menu1: { model: 'fechainicio', texto: 'fecha de inicio', campo: 'fechai' },
                    menu2: { model: 'fecharadicacion', texto: 'fecha de radicación', campo: 'fechar' },
                    menu3: { model: 'fechadetencion', texto: 'fecha de detención', campo: 'fechad' },
                    menu4: { model: 'fechahechos', texto: 'fecha de los hechos', campo: 'fechah' },
                };

                const campo = config[menuKey];
                if (!campo) return;

                const fechaValor = this[campo.model];

                if (!fechaValor || !formatoFecha.test(fechaValor)) {
                    this.mostrarToast(`Por favor selecciona una ${campo.texto} válida (año, mes y día).`, 'error');
                    return;
                }

                // Formatear texto
                const dia = fechaValor.substring(8, 10);
                const mes = this.obtenermes(parseInt(fechaValor.substring(5, 7)) - 1);
                const anio = fechaValor.substring(0, 4);
                this[campo.campo] = `${dia} de ${mes} del ${anio}`;

                // Guardar y validar
                this.$refs[menuKey].save(fechaValor);
                this.$nextTick(() => {
                    this.$validator.validate(campo.texto);
                });

                // Cerrar menú
                this[menuKey] = false;
            },
              
            obtenermes: function (mes) {
                if (mes == 0) return "Enero"
                if (mes == 1) return "Febrero"
                if (mes == 2) return "Marzo"
                if (mes == 3) return "Abril"
                if (mes == 4) return "Mayo"
                if (mes == 5) return "Junio"
                if (mes == 6) return "Julio"
                if (mes == 7) return "Agosto"
                if (mes == 8) return "Septiembre"
                if (mes == 9) return "Octubre"
                if (mes == 10) return "Noviembre"
                if (mes == 11) return "Diciembre"
            },
            listarinstituciones () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                this.$conf.get('api/Instituciones/Listar', configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.institucionesp.push({ text: x.nombre, value: x.nombre });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },  
            listarentidades () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                this.$conf.get('api/Estadoes/Listar', configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.entidades.push({ text: x.nombre, value: x.idEstado });
                    });
                }).catch(err => {
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listarmunicipios () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.municipios = [];
                me.municipio = '';
                me.localidades = [];
                me.localidad = '';

                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.entidad.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.municipios.push({ text: x.nombre, value: x.idMunicipio });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },
            listarlocalidades () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = [];
                me.localidades = [];
                me.localidad = '';
                this.$conf.get('api/Localidads/MostrarPorMPO/'+ me.municipio.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.localidades.push({ text: x.nombre, value: x.idLocalidad });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },
            guardar () {
                let me = this;
                this.$validator.validate().then(result => {
                    if (result) {
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                if (me.consultadenuc && me.nucdisponible) {
                    // Bloquea pantalla para no se tenga problema de duplicidad
                            me.textoCargando = 'Por favor espere, se está creando la carpeta';
                            me.cargando = true;

                    me.$validator.validate().then(result => {
                        me.registro = me.registro.length !== 0? me.registro: false;

                                if (me.clasificacionpersona != "Victima indirecta" && me.clasificacionpersona != "Victima directa")
                                {
                                    me.relacionado = " ";
                                    me.registro = false;
                                    me.relacion = false;
                                } else { me.relacion = true }
        
                                var listaMediosNotificacion='';
                                if(me.medionotificacion.length <=0)
                                {
                                    listaMediosNotificacion='';
                                }
                                else
                                {
                                    me.medionotificacion.forEach(function(notificacion)
                                    {
                                        if (typeof notificacion !== null && typeof notificacion !== undefined){
                                            if (notificacion == '[object Object]')
                                            {
                                                listaMediosNotificacion+=notificacion.text+',';
                                            }
                                            else {
                                                    listaMediosNotificacion+=notificacion+',';
                                            }
                                        };
                                    });
                                    if (listaMediosNotificacion.substring(listaMediosNotificacion.length, listaMediosNotificacion.length - 1)==','){
                                        listaMediosNotificacion = listaMediosNotificacion.substring(0, listaMediosNotificacion.length -1)
                                    };
                                };
        
                                var listaDiscapacidades='';
                                if(me.discapacidad.length <=0)
                                {
                                    listaDiscapacidades='';
                                }
                                else
                                {
                                    me.discapacidad.forEach(function(notificacion)
                                    {
                                        if (typeof notificacion !== null && typeof notificacion !== undefined){
                                            if (notificacion == '[object Object]')
                                            {
                                                listaDiscapacidades+=notificacion.text+';';
                                            }
                                            else {
                                                listaDiscapacidades+=notificacion+';';
                                            }
                                        };
                                    });
                                    //
                                    if (listaDiscapacidades.substring(listaDiscapacidades.length, listaDiscapacidades.length - 1)==';'){
                                        listaDiscapacidades = listaDiscapacidades.substring(0, listaDiscapacidades.length -1)
                                    };
                                };
                                
                                if(me.RangoEdadTF == false)
                                {
                                    //ARREGLA LA FECHA PARA QUE SE GUARDEN CON /
                                    const fechaParts = me.fnacimiento.split('-');
                                    const dia = fechaParts[2];
                                    const mes = fechaParts[1];
                                    const anio = fechaParts[0];
                                    me.fnacimiento = `${dia}/${mes}/${anio}`;
                                    me.edadf = me.generaredad();
                                } else {
                                    me.fnacimiento = '';
                                    me.edadf = 99
                                }
        
        
                                //SI LA FECHA TIENE UN VALOR INDEFINIDO POR CUARLQUIER ERROR, SE AGREGA 99
                                if(me.fnacimiento.includes('undefined') == true){
                                    me.edadf = 99;
                                    me.fnacimiento = '';
                                }
        
                                //CUANDO SE INTRODUCE LA FECHA DE NACIMIENTO HACE EL CALCULO DE EDAD PARA COLOCAR SU RANGO DE EDAD
                                if(me.edadf >= 0 && me.edadf <=5 )
                                    me.rangoedad = 'INFANCIA (0 A 5 AÑOS)'
        
                                if(me.edadf >= 6 && me.edadf <=12)
                                    me.rangoedad = 'NIÑEZ (6 A 12 AÑOS)'
                                
                                if(me.edadf >= 13 && me.edadf <=17)
                                    me.rangoedad = 'ADOLECENCIA (13 A 17 AÑOS)'
                                
                                if(me.edadf >= 18 && me.edadf <=24)
                                    me.rangoedad = 'JUVENTUD (18 A 24 AÑOS)'
        
                                if(me.edadf >= 25 && me.edadf <=45)
                                    me.rangoedad = 'ADULTEZ JOVEN (25 A 45 AÑOS)'
        
                                if(me.edadf >= 46 && me.edadf <=59)
                                    me.rangoedad = 'ADULTEZ MADURA (46 A 59 AÑOS)'
        
                                if(me.edadf >= 60 && me.edadf <=98)
                                    me.rangoedad = 'ADULTOS MAYORES (MAS DE 60 AÑOS)'
        
                                if(me.edadf >= 100)
                                    me.rangoedad = 'ADULTOS MAYORES (MAS DE 60 AÑOS)'
        
                                // Validaciones para no dejarlo vacio
                                if(me.amaterno == '') me.amaterno = 'LO DESCONOCE'
                                if(me.sexo == '') me.sexo = 'LO DESCONOCE'
                                if(me.curp == '') me.curp = 'LO DESCONOCE'
                                if(me.alias == '') me.alias = 'LO DESCONOCE'
                                if(me.abreviacion == '') me.abreviacion = 'LO DESCONOCE'
                                if(me.docidentificacion == '') me.docidentificacion = 'LO DESCONOCE'
                                if(me.cp=='') me.cp =0;
                                if(me.de_cp == '') me.de_cp =0
                                if(me.noInt == '') me.noInt = 0
                                if(me.de_noInt == '') me.de_noInt = 0
                                if(me.noExt == '') me.noExt = 'S/N'
                                if(me.de_noExt == '') me.de_noExt = 'S/N'
                        //CREACION DE RAC
                        me.$cat.post('api/Racs/GenerarRacModuloCaptura', { 
                            'distritoId': me.distritoinicia.value,
                            'agenciaId': me.agenciainicia.value,  
                            'FechaCreacion': me.fechainicio
                        }, configuracion).then(function(response) { 
                            //CREACION DE RATENCION
                            let idRac = response.data.idrac;
                            me.$cat.post('api/RAtencions/CrearMCaptura',{ 
                                'distritoInicial': me.distritoinicia.text,  
                                'agenciaInicial': me.agenciainicia.text,
                                'dirSubProcuInicial': me.subprocinicia.text,
                                'agenciaId': me.agenciainicia.value,
                                'racId': response.data.idrac,
                                'pInicio': true,
                                'Numerooficio': 0,
                                'MedioLlegada': me.mediodenuncia == "Noticia de hechos" ? me.medioreporte : "",
                                'MedioDenuncia': me.mediodenuncia,
                                'FechaRegistro': me.mediodenuncia == "Con detenido" ? me.fechadetencion : me.fechainicio
                            }, configuracion).then(function(response) { 
                                me.rAtencionId = response.data.idRatencion;
                                //CREACION DE RHECHO
                                me.$cat.post('api/RHechoes/CrearPI', {  
                                    'agenciaid': me.agenciaintegraid,
                                    'ratencionid': response.data.idRatencion,
                                    'moduloServicioId': me.modulointegraid,
                                    'status': true,
                                    'rbreve': me.narrativa,
                                    'fechaReporte': me.fechai,
                                },configuracion).then(function(response) {
                                    me.rHechoId = response.data.idRH
                                    me.$cat.post('api/Historialcarpeta/CrearModuloCaptura', {  
                                        'RHechoId': response.data.idRH,
                                        'Detalle': "Inicio de la investigación",
                                        'Modulo': me.moduloinicia.text,
                                        'Agencia':me.agenciainicia.text,
                                        'UDistrito': me.u_distrito,  
                                        'USubproc': me.u_dirSubPro,
                                        'UAgencia': me.u_agencia,
                                        'Usuario': me.u_nombre,
                                        'UPuesto': me.u_puesto,
                                        'UModulo': me.u_modulo,
                                        'Fechasys': me.fechainicio
                                    }, configuracion).then(function(response) {
                                        //CREACION DEL NUC
                                        me.$cat.post('api/Nucs/GenerarNucMCaptura', { 
                                            'distritoId': me.distritoinicia.value,
                                            'agenciaId': me.agenciainicia.value, 
                                            'FechaCreacion': me.fechainicio,
                                            'NUC': me.nuc
                                        }, configuracion).then(function(response) {
                                            //ELEVACION DEL RHECHO A NUC
                                            me.$store.state.rhechoid = me.rHechoId;
                                            me.$store.state.nuc = response.data.nuc;
                                            me.$store.state.ratencionid = me.rAtencionId
                                            me.$cat.put('api/RHechoes/ActualizarNUCMCaptura',{ 
                                                'idrhecho': me.rHechoId,
                                                'ratencionid': me.rAtencionId, 
                                                'nucid': response.data.idnuc,
                                                'FechaElevacion': me.fechainicio
                                            }, configuracion).then(function(response) {
                                                //CREACION DIRECCION DEL HECHO
                                                me.$cat.post('api/DireccionDelitoes/Crear', {
                                                    'idrhecho':  me.rHechoId,
                                                    'lugarEspecifico': "",
                                                    'calle': "",
                                                    'noExt': "",
                                                    'noInt': "",
                                                    'entrecalle1': "",
                                                    'entrecalle2': "",
                                                    'referencia': "",
                                                    'pais': 'México',
                                                    'estado': me.entidad.text,
                                                    'municipio': me.municipio.text,
                                                    'localidad': me.localidad.text,
                                                    'cp': "",
                                                    'lat': "",
                                                    'lng': "",
                                                    'tipoVialidad': 0, 
                                                    'tipoAsentamiento': 0,
                                                }, configuracion).then(function(response) { 
                                                    //CREACION DE LA HORA, FECHA DEL SUCESO
                                                    me.$cat.put('api/RHechoes/ActualizarFHS',{ 
                                                        'idRHecho': me.rHechoId,
                                                        'ratencionid': me.rAtencionId, 
                                                        'fechaHoraSuceso': me.fechahechos + ' ' + me.horas,
                                                    }, configuracion).then(async function(response) {
                                                        // Inicializar el policia como default
                                                                let idPoliciaDetuvo = '00000000-0000-0000-0000-000000000000';
        
                                                                // Consultar si es con detenido registrar el policia
                                                                if (me.mediodenuncia == 'Con detenido') {
                                                                    const responsePolicia = await axios.post('api/RAPs/CrearPoliciaModuloCaptura', {
                                                                        'RAtencionId': me.rAtencionId,
                                                                        'nombre': me.nombrep,
                                                                        'apellidoPaterno': me.apaternop,
                                                                        'apellidoMaterno': me.amaternop,
                                                                        'InstitutoPolicial': me.institucionp,
                                                                        'PoliciaDetuvo' : idPoliciaDetuvo,
                                                                        'informePolicial': me.informep
                                                                    }, configuracion).catch(err => { 
                                                                        if (err.response.status == 400) {
                                                                            me.mostrarToast("No es un usuario válido", 'error')
                                                                        } else if (err.response.status == 401) {
                                                                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                            me.e401 = true,
                                                                            me.showpage = false
                                                                        } else if (err.response.status == 403) { 
                                                                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                            me.e403 = true
                                                                            me.showpage = false 
                                                                        } else if (err.response.status == 404) {
                                                                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                                        } else {
                                                                            me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                                                        } 
                                                                    });
        
                                                                    idPoliciaDetuvo = responsePolicia.data.personaId;
                                                                }
        
                                                                // Consultar si existe una imagen 
                                                                if (me.imageFile){
                                                                    let formData = new FormData();
                                                                    formData.append('file', me.imageFile );
                                                                    var nombreCarpeta = "C" + me.nuc.substr(1);
                                                                    me.GUID = me.generateUUID();
                                
                                                                    const responseImagen = await axios.post('api/RAtencions/Post/'+nombreCarpeta+'/'+me.GUID,
                                                                        formData,
                                                                        {
                                                                        headers: {
                                                                                    'Content-Type': 'multipart/form-data'
                                                                                }
                                                                        }
                                                                    );
        
                                                                    me.ruta = responseImagen.data.ruta;
                                                                }
        
                                                                // Crear a la persona 
                                                                axios.post('api/RAPs/Crear',{
                                                                    //***************************** PERSONA*/
                                                                    'rAtencionId': me.rAtencionId,
                                                                    'clasificacionpersona': me.clasificacionpersona,
                                                                    'pInicio': true,
                                                                    'statusAnonimo': false,
                                                                    'tipoPersona': me.radios,
                                                                    'rfc': me.rfc,
                                                                    'razonsocial': me.razonsocial,
                                                                    'nombre': me.nombres,
                                                                    'apellidoPaterno' : me.apaterno,
                                                                    'apellidoMaterno' : me.amaterno,
                                                                    'alias': me.alias,
                                                                    'statusAlias': false,
                                                                    'rangoEdad': me.rangoedad,
                                                                    'rangoEdadTF':me.RangoEdadTF,
                                                                    'fechaNacimiento' : me.fnacimiento,
                                                                    'entidadFederativa': me.abreviacion.text,
                                                                    'docIdentificacion': me.docidentificacion,
                                                                    'curp': me.curp,
                                                                    'PoblacionAfro': me.poblacionafro,
                                                                    'sexo' : me.sexo,
                                                                    'estadoCivil': me.estadocivil,
                                                                    'genero': me.genero,
                                                                    'registro': me.registro,
                                                                    'verR': me.verR,
                                                                    'verI': me.verI,
                                                                    'telefono1': me.telefono1,
                                                                    'telefono2': me.telefono2,
                                                                    'correo': me.correo,
                                                                    'medioNotificacion': listaMediosNotificacion,
                                                                    'nacionalidad': me.nacionalidad,
                                                                    'ocupacion': me.ocupacion,
                                                                    'nivelEstudio': me.nivelestudio,
                                                                    'lengua': me.lengua,
                                                                    'religion': me.religion,
                                                                    'discapacidad': me.switch1,
                                                                    'tipoDiscapacidad': listaDiscapacidades,
                                                                    'DatosProtegidos': me.datosprotegidos,
                                                                    'Relacion': me.relacion,
                                                                    'Parentesco': me.relacionado,
                                                                    'InicioDetenido' : me.impuDetenido, 
                                                                    'PoliciaDetuvo' : idPoliciaDetuvo,
                                                                    'Edad': me.edadf,
                                                                    'DocPoderNotarial':me.documentoacredita,
                                                                    //***************************** DIRECCION PERSONAL */
                                                                    'tipoVialidad': me.vialidad,
                                                                    'calle': me.calle,
                                                                    'noExt': me.noExt,
                                                                    'noInt': me.noInt,
                                                                    'entreCalle1': me.entreCalle1,
                                                                    'entreCalle2': me.entreCalle2,
                                                                    'referencia': me.referencia,
                                                                    'pais': me.pais,
                                                                    'estado': me.estadoP,
                                                                    'municipio': me.municipioP,
                                                                    'localidad': me.localidadP,
                                                                    'tipoAsentamiento': me.asentamiento,
                                                                    'cp': me.cp,
                                                                    'lat': me.lat,
                                                                    'lng': me.lng,
                                                                    'tipoAsentamiento': me.asentamiento,
                                                                    //************************************ DIRECCION ESCUCHA */
                                                                    'de_tipoVialidad': me.de_vialidad,
                                                                    'de_calle': me.de_calle,
                                                                    'de_noExt': me.de_noExt,
                                                                    'de_noInt': me.de_noInt,
                                                                    'de_entreCalle1': me.de_entreCalle1,
                                                                    'de_entreCalle2': me.de_entreCalle2,
                                                                    'de_referencia': me.de_referencia,
                                                                    'de_pais': me.de_pais,
                                                                    'de_estado': me.de_estado,
                                                                    'de_municipio': me.de_municipio,
                                                                    'de_localidad': me.de_localidad,
                                                                    'de_tipoAsentamiento': me.de_asentamiento,
                                                                    'de_cp': me.de_cp,
                                                                    'de_lat': me.de_lat,
                                                                    'de_lng': me.de_lng,
                                                                    'de_tipoAsentamiento': me.de_asentamiento,
                                                                    //******************************************************* */
                                                                },configuracion).then(function(response){
                                                                    me.mostrarToast('¡La información se guardo correctamente!','success')
        
                                                                    var personaIdGenerado = response.data.personaid;
                                                                    let promesas = [];
        
                                                                    // Registrar el documento de la persona
                                                                    if(me.imageFile) {
                                                                        const promDoc = axios.post('api/DocumentosPesonas/Crear',{
                                                                            'PersonaId': personaIdGenerado,
                                                                            'TipoDocumento': me.docidentificacion,
                                                                            'NombreDocumento': me.GUID,
                                                                            'Descripcion': "",
                                                                            'Ruta':me.ruta,
                                                                            'Distrito': me.u_distrito,
                                                                            'DirSubProc':me.u_dirSubPro,
                                                                            'Agencia':me.u_agencia,
                                                                            'Usuario': me.u_nombre,
                                                                            'Puesto': me.u_puesto,
                                                                        },configuracion).catch(err => {
                                                                            if (err.response.status==400){
                                                                                me.mostrarToast("No es un usuario válido", 'error')
                                                                            } else if (err.response.status==401){
                                                                                me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                                me.e401 = true,
                                                                                me.showpage= false
                                                                            } else if (err.response.status==403){
                                                                                me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                                me.e403= true
                                                                                me.showpage= false
                                                                            } else if (err.response.status==404){
                                                                                me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                                            }else{
                                                                                me.mostrarToast('Error al intentar crear el  registro!!!','error')
                                                                            }
                                                                        });

                                                                        promesas.push(promDoc);
                                                                    }
                                                        //GUARDAR HISTORICO DE REMISION UI EN CASO DE SELECCIONAR UNA FECHA DE RADICACCION
                                                        if (me.diferenteRadicacion === true) {
                                                            me.$cat.post('api/Historialcarpeta/CrearModuloCaptura', {
                                                                'RHechoId': me.rHechoId,
                                                                'Detalle': "Remision UI",
                                                                'Modulo': me.modulointegra,
                                                                'Agencia':me.agenciaintegra,
                                                                'UDistrito': me.u_distrito,  
                                                                'USubproc': me.u_dirSubPro,
                                                                'UAgencia': me.u_agencia,
                                                                'Usuario': me.u_nombre,
                                                                'UPuesto': me.u_puesto,
                                                                'UModulo': me.u_modulo,
                                                                'Fechasys': me.fecharadicacion
                                                            }, configuracion).catch(err => { 
                                                                if (err.response.status == 400) {
                                                                    me.mostrarToast("No es un usuario válido", 'error')
                                                                } else if (err.response.status == 401) {
                                                                    me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                    me.e401 = true,
                                                                    me.showpage = false
                                                                } else if (err.response.status == 403) { 
                                                                    me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                    me.e403 = true
                                                                    me.showpage = false 
                                                                } else if (err.response.status == 404) {
                                                                    me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                                } else {
                                                                    me.mostrarToast('Error al intentar crear el  registro!!!', 'error')
                                                                } 
                                                            })

                                                            promesas.push(promHistorial);
                                                        }
                                                        
                                                        /*if ( me.mediodenuncia == 'Con detenido') {
                                                            me.$cat.post('api/RAPs/CrearPoliciaModuloCaptura', {                                                    
                                                                'RAtencionId': me.rAtencionId,
                                                                'nombre': me.institucionp.text,
                                                                'apellidoPaterno': "",
                                                                'apellidoMaterno': "",
                                                                'InstitutoPolicial': me.institucionp.text
                                                            }, configuracion).then(function(response) {

                                                            })*/
                                                           // Guardar registro para el tablero de inactividad 
                                                                    me.$cat.post('api/RegistroTableroI/Crear',{
                                                                        'RhechoId': me.rHechoId,
                                                                        'TipoRegistroTableroI': `Registro de alta de la carpeta ${me.nuc} en captura`,
                                                                        'Distrito': me.u_distrito,
                                                                        'DirSub': me.u_dirSubPro,
                                                                        'Agencia':me.u_agencia,
                                                                        'ModuloServicioId': me.u_idmoduloservicio,
                                                                        'Modulo':me.u_modulo,
                                                                        'UsuarioId':me.u_idusuario,
                                                                        'NombreUsuario': me.u_nombre,
                                                                    }, configuracion) .then(function(response){
                                                                        const promTablero = response.data.id

                                                                        // Guardar registro en la tabla de captura
                                                                        const promCaptura = me.$cat.post('api/Captura/Crear',{
                                                                            'RhechoId': me.rHechoId,
                                                                            'RegistroTableroId': promTablero,
                                                                            'UsuarioId':me.u_idusuario,
                                                                            'UModuloServicioId': me.u_idmoduloservicio,
                                                                            'RemitioModuloServicioId': me.modulointegraid,
                                                                        }, configuracion).catch(err => { 
                                                                if (err.response.status == 400) {
                                                                                me.mostrarToast("No es un usuario válido", 'error')
                                                                            } else if (err.response.status == 401) {
                                                                                me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                                me.e401 = true,
                                                                                me.showpage = false
                                                                            } else if (err.response.status == 403) { 
                                                                                me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                                me.e403 = true
                                                                                me.showpage = false 
                                                                            } else if (err.response.status == 404) {
                                                                                me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                                            } else {
                                                                                me.mostrarToast('Error al intentar crear el  registro!!!', 'error')
                                                                            } 
                                                            }); 
                                                            promesas.push(promCaptura);
                                                    }).catch(err => { 
                                                        if (err.response.status == 400) {
                                                                            me.mostrarToast("No es un usuario válido", 'error')
                                                                        } else if (err.response.status == 401) {
                                                                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                            me.e401 = true,
                                                                            me.showpage = false
                                                                        } else if (err.response.status == 403) { 
                                                                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                            me.e403 = true
                                                                            me.showpage = false 
                                                                        } else if (err.response.status == 404) {
                                                                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                                        } else {
                                                                            me.mostrarToast('Error al intentar crear el  registro!!!', 'error')
                                                                        } 
                                                    }); 

                                                    Promise.all(promesas)
                                                                    .then(() => {
                                                                        me.mostrarToast('La información se guardó correctamente !!!', 'success');
                                                                    })
                                                                    .finally(() => {
                                                                        // Desbloquea pantalla para culminar proceso
                                                                        me.cargando = false;
    
                                                                        Swal.fire({
                                                                            title: 'Registro exitoso',
                                                                            text: 'Ya no es necesario continuar con este proceso desde aquí. Puedes darle seguimiento en la unidad donde se encuentra la carpeta.',
                                                                            icon: 'success',
                                                                            confirmButtonText: 'Entendido',
                                                                            allowOutsideClick: false,
                                                                            allowEscapeKey: false,
                                                                            position: 'center',
                                                                            customClass: {
                                                                                popup: 'rounded-xl',
                                                                                title: 'custom-title',
                                                                                htmlContainer: 'custom-html',
                                                                                confirmButton: 'v-btn primary custom-button'
                                                                            }
                                                                        }).then(() => {
                                                                            me.$router.push('./listacarpetas');
                                                                        });
                                                                    });
                                                }).catch(err => { 
                                                    me.cargando = false;
                                                                    me.errorRegistro(8);
                                                                });
                                                            }).catch(err => { 
                                                                me.cargando = false;
                                                                me.errorRegistro();
                                                                if (err.response.status == 400) {
                                                                    me.mostrarToast("No es un usuario válido", 'error')
                                                                } else if (err.response.status == 401) {
                                                                    me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                    me.e401 = true,
                                                                    me.showpage = false
                                                                } else if (err.response.status == 403) { 
                                                                    me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                    me.e403 = true
                                                                    me.showpage = false 
                                                                } else if (err.response.status == 404) {
                                                                    me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                                } else {
                                                                    me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                                                } 
                                                }); 
                                            }).catch(err => {
                                                me.cargando = false;
                                                            me.errorRegistro();
                                                            if (err.response.status == 400) {
                                                                me.mostrarToast("No es un usuario válido", 'error')
                                                            } else if (err.response.status == 401) {
                                                                me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                me.e401 = true,
                                                                me.showpage = false
                                                            } else if (err.response.status == 403) {
                                                                me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                                me.e403 = true
                                                                me.showpage = false 
                                                            } else if (err.response.status == 404) {
                                                                me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                            } else {
                                                                me.mostrarToast('Error al intentar crear el  registro!!!', 'error')
                                                            }
                                            }); 
                                        }).catch(err => {
                                            me.cargando = false;
                                                        me.errorRegistro();
                                                        if (err.response.status == 400) {
                                                            me.mostrarToast("No es un usuario válido", 'error')
                                                        } else if (err.response.status == 401) {
                                                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                            me.e401 = true,
                                                            me.showpage = false
                                                        } else if (err.response.status == 403) { 
                                                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                            me.e403 = true
                                                            me.showpage = false 
                                                        } else if (err.response.status == 404) {
                                                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                        } else {
                                                            me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                                        }
                                        });
                                    }).catch(err => { 
                                        me.cargando = false;
                                                    me.errorRegistro();
                                                    if (err.response.status == 400) {
                                                        me.mostrarToast("No es un usuario válido", 'error')
                                                    } else if (err.response.status == 401) {
                                                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                        me.e401 = true,
                                                        me.showpage = false
                                                    } else if (err.response.status == 403) { 
                                                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                        me.e403 = true
                                                        me.showpage = false 
                                                    } else if (err.response.status == 404) {
                                                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                    } else {
                                                        me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                                    }
                                    });
                                }).catch(err => { 
                                    me.cargando = false;
                                                me.errorRegistro();
                                                if (err.response.status == 400) {
                                                    me.mostrarToast("No es un usuario válido", 'error')
                                                } else if (err.response.status == 401) {
                                                    me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                    me.e401 = true,
                                                    me.showpage = false
                                                } else if (err.response.status == 403) { 
                                                    me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                    me.e403 = true
                                                    me.showpage = false 
                                                } else if (err.response.status == 404) {
                                                    me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                                } else {
                                                    me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                                } 
                                });
                                }).catch(err => { 
                                            me.cargando = false;
                                            me.errorRegistro();
                                            if (err.response.status == 400) {
                                                me.mostrarToast("No es un usuario válido", 'error')
                                            } else if (err.response.status == 401) {
                                                me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage = false
                                            } else if (err.response.status == 403) { 
                                                me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                me.e403 = true
                                                me.showpage = false 
                                            } else if (err.response.status == 404) {
                                                me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                            } else {
                                                me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                            }
                                        });

                                me.$cat.patch(`api/RAtencions/modNANDP/${me.rAtencionId}`, {
                                    'nombre': me.p_nombre,
                                    'puesto': me.p_puesto
                                }, configuracion)
                                .then((response) => {
                                    
                                })
                                .catch((e) => {
                                    if (err.response.status == 400) {
                                                me.mostrarToast("No es un usuario válido", 'error')
                                            } else if (err.response.status == 401) {
                                                me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage = false
                                            } else if (err.response.status == 403) { 
                                                me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                                me.e403 = true
                                                me.showpage = false 
                                            } else if (err.response.status == 404) {
                                                me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                            } else {
                                                me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                            } 
                                })
                            }).catch(err => { 
                                me.cargando = false;
                                        me.errorRegistro();
                                        if (err.response.status == 400) {
                                            me.mostrarToast("No es un usuario válido", 'error')
                                        } else if (err.response.status == 401) {
                                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                            me.e401 = true,
                                            me.showpage = false
                                        } else if (err.response.status == 403) { 
                                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                            me.e403 = true
                                            me.showpage = false 
                                        } else if (err.response.status == 404) {
                                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                        } else {
                                            me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                        } 
                            });
                        }).catch(err => {
                            me.cargando = false;
                                    me.errorRegistro();
                                    if (err.response.status == 400) {
                                        me.mostrarToast("No es un usuario válido", 'error')
                                    } else if (err.response.status == 401) {
                                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                        me.showpage = false
                                    } else if (err.response.status == 403) { 
                                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false 
                                    } else if (err.response.status == 404) {
                                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                                    } else {
                                        me.mostrarToast('Error al intentar crear el  registro!!!','error')  
                                    } 
                        });
                    })                        
                } else {   
                    Swal.fire({
                                title: 'NUC no válido',
                                text: 'Antes de guardar, favor de validar el número de carpeta.',
                                icon: 'error',
                                confirmButtonText: 'Ok',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                position: 'center',
                                customClass: {
                                    popup: 'rounded-xl',
                                    title: 'custom-title',
                                    htmlContainer: 'custom-html',
                                    confirmButton: 'v-btn primary custom-button'
                                }
                            }).then(() => {
                                this.$validator.validate();
                            });
                            }
                    } else {
                        me.mostrarToast('Llene todos los campos que son obligatorios','error')
                    }
                });
            },
            listarcvedistritos() {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraycve = []; 
                this.$conf.get('api/Distritoes/ListarCvedistrito',configuracion).then(function(response) {
                    arraycve = response.data;
                    arraycve.map(function(x) {
                        me.distritosh.push({ text: x.nombre, value: x.clave, idDistritoNuc: x.idDistrito });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404){
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.mostrarToast('Error al intentar listar los registros!!!', 'error')    
                    } 
                });
            },  
            validarnuc(){
                const nucSolicita = `<br><br>NUC: <strong>${this.nuc}</strong>`;
                const mensaje = this.nucDif
                        ? 'Verifica bien que la nomenclatura de la NUC que eligiste sea la correcta, ya que no habrá cambios una vez generada.'
                        : 'Verifica bien que el número de la NUC que elegiste sea el correcto, ya que no habrá cambios una vez generada.';

                Swal.fire({
                    title: 'Atención',
                    html:  mensaje + nucSolicita,
                    icon: 'warning',
                    confirmButtonText: 'Es correcta',
                    cancelButtonText: 'Cancelar',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    position: 'center',
                    customClass: {
                        popup: 'rounded-xl',
                        title: 'custom-title',
                        htmlContainer: 'custom-html',
                        confirmButton: 'v-btn primary custom-button',
                        cancelButton: 'v-btn secundary custom-button'
                    }
                }).then(async(result) => {
                    if (!result.isConfirmed) return;

                    // Si dio "Es correcta", ahora sí hace la consulta y bloque la pantalla durante el proceso
                    this.textoCargando = 'Por favor espere, se esta validando la NUC';
                    this.cargando = true;

                    const header = { "Authorization": "Bearer " + this.$store.state.token };
                    const configuracion = { headers: header };
                    const distritoOrigen = this.cveDistrito.idDistritoNuc;
                    
                    this.consultadenuc = true;
                    this.nucdisponible = true;
    
                    // Buscamos en el distrito origen
                    try {

                        console.log(distritoOrigen)
                        const respuestaOrigen = await this.$cat.get(`api/RHechoes/ValidarNuc/${this.nuc}/${distritoOrigen}`, configuracion);
                        
                        if (respuestaOrigen.data.nucActivo) {
                            this.nucdisponible = false;
                            await this.ubicaNUC(distritoOrigen);
                            return;
                        }
                    } catch (error) {
                        this.mostrarToast(`No hay conexión en el distrito origen por lo que no puedes generar el NUC \n Intentalo mas tarde.`, 'error');
                        console.log(error)
                        this.nucdisponible = false;
                        this.cargando = false;
                        return;
                    }
    
                    // Buscamos en los demas distritos si existe en alguna parte
                    for (const distrito of this.distritos) {
                        try {
                            const respuesta = await me.$cat.get(`api/RHechoes/ValidarNuc/${this.nuc}/${distrito.value}`, configuracion);
    
                            if (respuesta.data.nucActivo) {
                                this.nucdisponible = false;
                                await this.ubicaNUC(distrito.value);
                                break;
                            }
                        } catch (error) {
                            // Silenciar el error y continuar con los demás
                            console.log(`No se pudo validar en ${distrito.text}`);
                            continue;
                        }
                    }
    
                    if (this.nucdisponible) {
                        this.cargando = false;
                        this.mostrarToast('El NUC se encuentra disponible para su uso', 'success');
                    }
                });
            },
            async ubicaNUC() {
                // Definimos mensaje global de encontrada
                const mostrarMensaje = (html) => {
                    Swal.fire({
                        title: 'NUC encontrada',
                        html,
                        icon: 'info',
                        confirmButtonText: 'Entendido',
                        customClass: {
                            popup: 'rounded-xl',
                            title: 'custom-title',
                            htmlContainer: 'custom-html',
                            confirmButton: 'v-btn primary custom-button'
                        }
                    });
                };
                try {
                    const header = { "Authorization": "Bearer " + this.$store.state.token };
                    const configuracion = { headers: header };

                    // Variable donde almacena los IDs si se encuentra la carpeta
                    const idsEncontrados = [];

                    // Consultar en todos los distritos nuevamente
                    for (const distrito of this.distritos) {
                        const idDistrito = distrito.value;

                        try {
                            const respuesta = await me.$cat.get(`api/Nucs/BuscarNucCaptura/${this.nuc}/${idDistrito}`, configuracion);
                            const data = respuesta.data;

                            const lista = data.resultado;
                            const distritoActual = data.distritoIdActual;

                            if (Array.isArray(lista) && lista.length > 0) {
                                // Si es el mismo id entonces lo almacena en la variable
                                if (distritoActual === idDistrito) {
                                    idsEncontrados.push(idDistrito);
                                }
                            }
                        } catch (error) {
                            // Si falla una petición, simplemente continúa con el siguiente distrito
                            continue;
                        }
                    }

                    // Evaluar resultados después del ciclo
                    if (idsEncontrados.length > 1) {
                        // Si hay mas de dos distritos donde se encuentra muestrame este mensaje 
                        mostrarMensaje(`El NUC ya se encuentra registrado. Si necesitas saber en cuál distrito, comunícate con Desarrollo de Sistemas.`);
                    } else if (idsEncontrados.length === 1) { 
                        // Si solo hay uno entonces muestrame la ubicacion exacta
                        const distritoCorrecto = idsEncontrados[0];

                        try {
                            const nuevaBusqueda = await me.$cat.get(`api/Nucs/BuscarNucCaptura/${this.nuc}/${distritoCorrecto}`, configuracion);
                            const nuevoResultado = nuevaBusqueda.data;
                            const nuevaLista = nuevoResultado.resultado;

                            if (Array.isArray(nuevaLista) && nuevaLista.length > 0) {
                                const info = nuevaLista[0];

                                mostrarMensaje(`
                                    La carpeta se encuentra en:<br><br>
                                    <strong>Distrito:</strong> ${info.distritoActual} <br>
                                    <strong>Dirección/Subdirección:</strong> ${info.subdireccionActual || '-'} <br>
                                    <strong>Agencia:</strong> ${info.agenciaActual} <br>
                                    <strong>Unidad:</strong> ${info.moduloActual}
                                `);
                            }
                        } catch (error) {
                            mostrarMensaje(`El NUC ya se encuentra registrado. Si necesitas saber en cuál distrito, comunícate con Desarrollo de Sistemas.`);
                        }
                    } else {
                        mostrarMensaje(`El NUC ya se encuentra registrado. Si necesitas saber en cuál distrito, comunícate con Desarrollo de Sistemas.`);
                    }
                } catch (error) {
                    mostrarMensaje(`El NUC ya se encuentra registrado. Si necesitas saber en cuál distrito, comunícate con Desarrollo de Sistemas.`);
                } finally {
                    this.cargando = false;
                    this.nucdisponible = false;
                }
            },
            updateNuc() {
                const nocarpeta = this.numcarpeta.padStart(this.nucRango, '0');
                const distrito = this.cveDistrito.value;
                const año = this.yearcarpeta;

                if (!this.nucDif) {
                    this.nuc = `${distrito}-${año}-${nocarpeta}`;
                    return;
                }
                switch (this.nucNom) {
                    case 1:
                        this.nuc = `${this.nucClave2}-${distrito}-${this.nucClave}-${nocarpeta}-${año}`;
                        break;
                    case 2:
                        this.nuc = `${distrito}-${this.nucClave}-${año}-${nocarpeta}`;
                        break;
                    case 3:
                        this.nuc = `${this.nucClave3 ? this.nucClave3 + '-' : ''}${distrito}-${año}-${this.nucClave}-${nocarpeta}`;
                        break;
                    case 4:
                        this.nuc = `${this.nucClave2}-${this.nucClave}-${nocarpeta}-${año}`;
                        break;
                    default:
                        this.nuc = '';
                        this.mostrarToast('Error al intentar crear la nomenclatura','error');
                }
            },
            generaredad(){
                var date = moment(this.fnacimiento, 'DD/MM/YYYY');
                return moment().diff(date, 'years',false);
            },
            listarSexo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var sexoArray=[];
                this.$conf.get('api/Sexoes/Listar',configuracion).then(function(response){
                    sexoArray=response.data;
                    sexoArray.map(function(x){
                        me.sexos.push({text: x.nombre,value: x.clave});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarEstados(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var estadosArray=[];
                this.$conf.get('api/Estadoes/Listar',configuracion).then(function(response){
                    estadosArray=response.data;
                    estadosArray.map(function(x){
                        me.estados.push({text: x.nombre, value: x.abreviacion});
    
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarIdentificacion(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var docIdentificaionArray=[];
                this.$conf.get('api/DocIdentificacions/Listar',configuracion).then(function(response){
                    docIdentificaionArray=response.data;
                    docIdentificaionArray.map(function(x){
                        me.docsidentificaciones.push({text: x.nombre,value: x.nombre});
                    });
                    }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarTipoPersona(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var clasificacionpersonaArray=[];

                me.clasificacionpersonas = [];
                
                this.$conf.get('api/ClasificacionPersonas/Listar',configuracion).then(function(response){
                    clasificacionpersonaArray=response.data;
                    clasificacionpersonaArray.map(function(x){
                        // Filtrar "Imputado" si la selección es "Denuncia" o "Noticia de hechos"
                        if ((me.mediodenuncia === 'Denuncia' || me.mediodenuncia === 'Noticia de hechos') && x.nombre === 'Imputado') {
                            return; // Salta esta clasificación
                        }
                        me.clasificacionpersonas.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarRangoEdad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var edadesArray=[];
                this.$conf.get('api/Rangoedad/Listar',configuracion).then(function(response){
                    edadesArray=response.data;
                    edadesArray.map(function(x){
                        me.rangosedad.push({text: x.rango,value: x.rango,value2: x.ordenEdad});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarMedionotificacion(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var medionotificacionArray=[];
                this.$conf.get('api/MedioNotificacions/Listar',configuracion).then(function(response){
                    medionotificacionArray=response.data;
                    medionotificacionArray.map(function(x){
                        me.medionotificaciones.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarNacionalidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var nacionalidadArray=[];
                this.$conf.get('api/Nacionalidads/Listar',configuracion).then(function(response){
                    nacionalidadArray=response.data;
                    nacionalidadArray.map(function(x){
                        me.nacionalidades.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarEstadoCivil(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var estadocivilArray=[];
                this.$conf.get('api/EstadoCivils/Listar',configuracion).then(function(response){
                    estadocivilArray=response.data;
                    estadocivilArray.map(function(x){
                        me.estadosciviles.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarOcupacion(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var ocupacionArray=[];
                this.$conf.get('api/Ocupacions/Listar',configuracion).then(function(response){
                    ocupacionArray=response.data;
                    ocupacionArray.map(function(x){
                        me.ocupaciones.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarNivelEstudio(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var nivelestudioArray=[];
                this.$conf.get('api/NivelEstudios/Listar',configuracion).then(function(response){
                    nivelestudioArray=response.data;
                    nivelestudioArray.map(function(x){
                        me.nivelestudios.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarLengua(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var lenguaArray=[];
                this.$conf.get('api/Lenguas/Listar',configuracion).then(function(response){
                    lenguaArray=response.data;
                    lenguaArray.map(function(x){
                        me.lenguas.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarReligion(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var religionArray=[];
                this.$conf.get('api/Religions/Listar',configuracion).then(function(response){
                    religionArray=response.data;
                    religionArray.map(function(x){
                        me.religiones.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarGenero(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var generoArray=[];
                this.$conf.get('api/Generoes/Listar',configuracion).then(function(response){
                    generoArray=response.data;
                    generoArray.map(function(x){
                        me.generos.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarDiscapacidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var discapacidadArray=[];
                this.$conf.get('api/Discapacidads/Listar',configuracion).then(function(response){
                    discapacidadArray=response.data;
                    discapacidadArray.map(function(x){
                        me.discapaciodades.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarCiudades(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var ciudadesArray=[];
                this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){
                    ciudadesArray=response.data;
                    ciudadesArray.map(function(x){
                        me.ciudadesP.push({text: x.nombre, value:x.idEstado});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarPorEstado(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.estadoidP.value == 0) {
                    me.estadoP = me.estadoidP.text;
                    me.estadoidP = me.estadoidP.value;
                    me.municipioP = '';
                    me.municipioidP = '';
                    me.municipiosP = [];
                    me.localidadP = '';
                    me.localidadidP = '';
                    me.localidadesP = [];
                    me.cp = '';
                }
                
                var municipiosArray=[];
                me.municipiosP.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.estadoidP,configuracion).then(function(response){
                    municipiosArray=response.data;
                    municipiosArray.map(function(x){
                        me.municipiosP.push({text: x.nombre,value: x.idMunicipio});
                    });
                }).catch(err => {
                    if (err.response.status==400){
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.mostrarToast('Error al intentar listar los registros!!!','error')
                    }
                });
            },
            listarPorMunicipio(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.municipioidP.value == 0) {
                    me.municipioP = me.municipioidP.text;
                    me.municipioidP = me.municipioidP.value;
                    me.localidadP = '';
                    me.localidadidP = '';
                    me.localidadesP = [];
                    me.cp = '';
                } else if (!me.municipioidP) {
                    return;
                }
    
                var localidadArray=[];
                me.localidadesP.length = 0;
                this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioidP,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.localidadesP.push({text: x.nombre,value: x.idLocalidad});
                    });
                  }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarPorLocalidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.localidadidP.value == 0) {
                    me.localidadP = me.localidadidP.text;
                    me.localidadidP = me.localidadidP.value;
                } else if (!me.localidadidP) {
                    return;
                }
                this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.localidadidP,configuracion).then(function(response){
                      me.cp=response.data.cp;
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            buscarPorCP(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){
                      me.estadoidP=response.data.idEstado;
                      me.listarPorEstado();
                      me.municipioidP=response.data.idMunicipio;
                      me.buscarPorCpMpo()
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            buscarPorCpMpo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var localidadArray=[];
                me.localidadesP.length = 0;
                 this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.municipioidP +',' + this.cp,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.localidadesP.push({text: x.nombre,value: x.idLocalidad});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            listarVialidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Vialidades/Listar',configuracion).then(function(response){
                    response.data.forEach(x => {
                        me.vialidades.push({text: x.nombre, value: x.clave});
                        me.de_vialidades.push({text: x.nombre, value: x.clave});
                    });
                }).catch(err => {
                    if (err.response.status==400){
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.mostrarToast('Error al intentar listar los registros!!!','error')
                    }
                });
            },
            listarAsentamiento(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Asentamiento/Listar',configuracion).then(function(response){
                    response.data.forEach(x => {
                        me.asentamientos.push({text: x.nombre, value: x.clave});
                        me.de_asentamientos.push({text: x.nombre, value: x.clave});
                    });
                }).catch(err => {
                    if (err.response.status==400){
                        me.mostrarToast("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.mostrarToast("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.mostrarToast('Error al intentar listar los registros!!!','error')
                    }
                });
            },
            de_listarCiudades(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var ciudadesArray=[];
                this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){
                    ciudadesArray=response.data;
                    ciudadesArray.map(function(x){
                        me.de_ciudades.push({text: x.nombre, value:x.idEstado});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            de_listarPorEstado () {
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.de_estadoid.value== 0){
                    me.de_estado = me.de_estadoid.text;
                    me.de_estadoid = me.de_estadoid.value;
                    me.de_municipio = '';
                    me.de_municipioid = '';
                    me.de_municipios = [];
                    me.de_localidad = '';
                    me.de_localidadid = '';
                    me.de_localidades = [];
                    me.de_cp = '';
                }
                    var municipiosArray=[];
                    me.de_municipios.length = 0;
                    this.$conf.get('api/Municipios/ListarPorEstado/'+ me.de_estadoid,configuracion).then(function(response){
    
                        municipiosArray=response.data;
    
                        municipiosArray.map(function(x){
                        me.de_municipios.push({text: x.nombre,value: x.idMunicipio});
                        });
                        me.de_selectMunicipio(me.de_municipio);
                        if (me.duplicarDireccion==true){
                             me.de_selectMunicipio(me.municipioP);
                        }
                    }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
    
    
            },
            de_listarPorMunicipio(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.de_municipioid.value == 0) {
                    me.de_municipio = me.de_municipioid.text;
                    me.de_municipioid = me.de_municipioid.value;
                    me.de_localidad = '';
                    me.de_localidadid = '';
                    me.de_localidades = [];
                    me.de_cp = '';
                } else if (!me.de_municipioid) {
                    return;
                }
    
                var localidadArray=[];
                me.de_localidades.length = 0;
                this.$conf.get('api/Localidads/MostrarPorMPO/' + me.de_municipioid,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.de_localidades.push({text: x.nombre,value: x.idLocalidad});
                    });
                    me.de_selectLocalidad(me.de_localidad);
                     if (me.duplicarDireccion==true){
                        me.de_selectLocalidad(me.de_localidad);
                        }
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
    
    
            },
            de_listarPorLocalidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.de_localidadid.value == 0) {
                    me.de_localidad = me.de_localidadid.text;
                    me.de_localidadid = me.de_localidadid.value;
                } else if (!me.de_localidadid) {
                    return;
                }
                this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.de_localidadid,configuracion).then(function(response){
    
                      me.de_cp=response.data.cp;
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            de_buscarPorCP(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){
                      me.de_estadoid=response.data.idEstado;
                      me.de_listarPorEstado();
                      me.de_municipioid=response.data.idMunicipio;
                      me.de_buscarPorCpMpo()
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            de_buscarPorCpMpo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var localidadArray=[];
                me.de_localidades.length = 0;
                 this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.de_municipioid +',' + this.de_cp,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.de_localidades.push({text: x.nombre,value: x.idLocalidad});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.mostrarToast("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.mostrarToast("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.mostrarToast("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.mostrarToast("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.mostrarToast('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            de_selectEstado: function(val) {
                let me=this;
                for (var i = 0; i < me.de_ciudades.length; i++) {
                    if (me.de_ciudades[i].text === val){
                        me.de_estadoid=  me.de_ciudades[i].value;
                    }
                }
                me.de_listarPorEstado();
            },
            de_selectMunicipio: function(val) {
                let me=this;
                for (var i = 0; i < me.de_municipios.length; i++) {
                    if (me.de_municipios[i].text === val){
                        me.de_municipioid=  me.de_municipios[i].value;
                    }
                }
              me.de_listarPorMunicipio();
            },
            de_selectLocalidad: function(val) {
               let me=this;
                for (var i = 0; i < me.de_localidades.length; i++) {
                    if (me.de_localidades[i].text === val){
                        me.de_localidadid=  me.de_localidades[i].value;
                    }
                }
            },
            dupdiresc(){
                let me=this;
                if (me.duplicarDireccion==true){
                    me.cp= me.cp;
                    me.de_calle= me.calle;
                    me.de_noExt=me.noExt;
                    me.de_noInt=me.noInt;
                    me.de_entreCalle1=me.entreCalle1;
                    me.de_entreCalle2= me.entreCalle2;
                    me.de_referencia=me.referencia;
                    me.de_pais=me.pais;
                    me.de_estado=me.estadoP;
                    me.de_selectEstado(me.de_estado);
                    me.de_municipio=me.municipioP;
                    me.de_localidad=me.localidadP;
                    me.de_cp= me.cp;
                    me.de_lat= me.lat;
                    me.de_lng=me.lng;
                    me.de_vialidad=me.vialidad;
                    me.de_asentamiento=me.asentamiento;
                }
                else{
                    me.de_calle= "";
                    me.de_noExt="";
                    me.de_noInt="";
                    me.de_entreCalle1="";
                    me.de_entreCalle2= "";
                    me.de_referencia="";
                    me.de_estado="";
                    me.de_municipio="";
                    me.de_localidad="";
                    me.de_cp="";
                    me.de_lat="";
                    me.de_lng="";
                    me.de_vialidad="";
                    me.de_asentamiento="";
                }
    
            },
            onFilePicked(e) {
                const files = e.target.files
                const validImageTypes = ['image/jpeg', 'image/jpg'];

                if (files[0] && validImageTypes.includes(files[0].type)) {
                    this.imageName = files[0].name;
                } else {
                    alertify.error('Por favor, selecciona un archivo de imagen válido (jpeg, jpg).');
                    this.$refs.image.value = '';
                }

                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                    return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
            onCapture() {
               this.imageUrl = this.$refs.webcam.capture();
               var blob =  this.dataURItoBlob(this.imageUrl, 'image/jpg');
               var file = new File([blob], 'Documento.jpg', {type: 'image/jpg', lastModified: Date.now()});
               this.imageFile = file
               this.imageName = this.imageFile.name;
    
            },
            dataURItoBlob(dataURI, type) {
                // convertir base64 to raw binary data held in a string
                var byteString = atob(dataURI.split(',')[1]);
    
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
                // write the bytes of the string to an ArrayBuffer
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
    
                // write the ArrayBuffer to a blob, and you're done
                var bb = new Blob([ab], { type: type });
                return bb;
            },
            pickFile () {
                this.removeImage()
                this.$refs.image.click ()
            },
            removeImage () {
                this.$refs.image.value = ''
            },
            onStarted(stream) {
            },
            onStopped(stream) {
            },
            onStop() {
                this.$refs.webcam.stop();
            },
            onStart() {
                this.$refs.webcam.start();
            },
            onError(error) {
            },
            onCameras(cameras) {
                this.devices = cameras;
            },
            onClose () {
                this.dialog = false;
            },
            onCameraChange(deviceId) {
                this.deviceId = deviceId;
                this.camera = deviceId;
            },
            ocultarTP (){
                this.verTP=0;
            },
            mostrarTP(){
                this.verTP=1;
            },
            generateUUID: function() { // Public Domain/MIT
                var d = new Date().getTime();
                if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                    d += performance.now(); //use high-precision timer if available
                }
                var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                
                return newGuid;
            },
            validarAgencias() {
                if (this.agenciainicia.value === this.agenciaintegraid) {
                    this.diferenteRadicacion = false;
                } else {
                    this.diferenteRadicacion = true;
                }
            },
            validarceros(campo) {
                if (/^0+$/.test(this[campo]) || this[campo] === '') {
                    this[campo] = '';
                    this.nuc = '';
                    this.mostrarToast(`Por favor, seleccione un ${campo === 'numcarpeta' ? 'número de carpeta' : 'número de unidad'} válido.`, 'error');
                }
            },
            soloNumerosKeypress(event) {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
            },
            permisoActualizarNuc() {
                if (this.cveDistrito && this.yearcarpeta && this.numcarpeta && (!this.requiereUnidad || (this.requiereUnidad && this.nucUnidad))) {
                    if (this.requiereUnidad) {
                        this.actualizarNucDatos();
                        this.nucRomano = this.convertirARomano(this.nucUnidad)
                        this.nucClave = this.nucClave + this.nucRomano;
                    }
                    this.consultadenuc = false;
                    this.updateNuc();
                }
            },
            actualizarNucDatos() {
                const seleccionado = this.claveNucDif.find(item => item.value === this.nucValue);

                if (seleccionado) {
                    this.nucClave = seleccionado.text1;
                    this.nucClave2 = seleccionado.text2;
                    this.nucClaveMomentanea = seleccionado.text2;
                    this.nucRango = seleccionado.rango;
                    this.nucNom = seleccionado.nom;
                } else {
                    this.nucClave = '';
                    this.nucRango = 5;
                }
            },
            convertirARomano(num) {
                const romanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
                return romanos[num - 1] || '';
            },
            mostrarToast(mensaje, tipo) {
                this.snackbarMessage = mensaje;
                this.snackbarColor = tipo;
                this.snackbarVisible = true;
            },
            errorRegistro() {
                // Aviso si alguna de las apis importantes truenan
                Swal.fire({
                    title: 'Error en la creación de la carpeta',
                    html: `Se generó un problema en el registro de la carpeta. Favor de validar con el área de Desarrollo de Sistemas para recibir apoyo.`,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    position: 'center',
                    customClass: {
                        popup: 'rounded-xl',
                        title: 'custom-title',
                        htmlContainer: 'custom-html',
                        confirmButton: 'v-btn primary custom-button'
                    }
                }).then(() => {
                    this.$validator.validate();
                    this.nucdisponible = false;
                });
            },
        },
    }
</script>

<style>
    .espaciado{
        padding: 30px !important; 
    }   
    .switch-container {
    display: flex;
    align-items: center;
    }
    .custom-title {
        font-family: Arial !important;
        font-size: 20px !important;
        color: #333 !important;
    }
    .custom-html {
        font-family: Arial !important;
        font-size: 16px !important;
        color: #555 !important; 
    }
    .custom-button {
        font-family: Arial !important;
        font-size: 12px !important;
        font-weight: bold !important;
    }
    .fullscreen-loader-secundary {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999 !important;
    }
    .loader-card-secundary {
        width: 350px;
        padding: 10px;
        text-align: left;
    }
</style>