<template>  
<v-layout align-start>
    <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
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
            </v-toolbar>
            <v-stepper v-model="step" non-linear vertical>
                <v-stepper-step editable :complete="step > 1" step="1" :rules="[() => !errors.has('distrito inicia') && !errors.has('subprocuraduría/dirección general inicia') && !errors.has('agencia inicia') && !errors.has('unidad de investigación que inicia')]">
                    Datos de la unidad que inicia              
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
                                        @change="listarsubprocinicia()"
                                        :error-messages="errors.collect('distrito inicia')" 
                                    />
                                    <v-autocomplete 
                                        name="agencia inicia"
                                        :items="agenciasinicia"
                                        v-model="agenciainicia" 
                                        v-validate="'required'"
                                        label="*Agencia:"
                                        return-object
                                        @change="listarmoduloinicia()"
                                        :error-messages="errors.collect('agencia inicia')" 
                                    />
                                    <v-text-field 
                                        name="npi"
                                        v-model="p_nombre" 
                                        v-validate="'required'"
                                        label="*Nombre de persona que inició:"                                                                                                                        
                                        :error-messages="errors.collect('NUC')" 
                                    />
                                    <v-text-field 
                                        name="ppi"
                                        v-model="p_puesto" 
                                        v-validate="'required'"
                                        label="*Puesto de persona que inició:"                                        
                                        :error-messages="errors.collect('NUC')" 
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete 
                                        name="subprocuraduría/dirección general inicia"
                                        :items="subrpocsinicia"
                                        v-model="subprocinicia" 
                                        v-validate="'required'"
                                        label="*Subprocuraduría/dirección general:"
                                        return-object
                                        @change="listaragenciainicia()"
                                        :error-messages="errors.collect('subprocuraduría/dirección general inicia')" 
                                    />
                                    <v-autocomplete 
                                        name="unidad de investigación que integra inicia"
                                        :items="modulosinicia"
                                        v-model="moduloinicia" 
                                        v-validate="'required'"
                                        label="*Unidad de investigación que inicia:"
                                        return-object
                                        :error-messages="errors.collect('unidad de investigación que integra inicia')" 
                                    />
                                </v-flex>  
                            </v-layout>
                        </v-container> 
                        <div class="text-xs-right">                            
                            <v-btn color="primary" @click.native="step = 2">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step editable :complete="step > 2" step="2" :rules="[() => !errors.has('distrito integra') && !errors.has('subprocuraduría/dirección general integra') && !errors.has('agencia integra') && !errors.has('unidad de investigación que integra')]">
                    Datos de la unidad que integra
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-card  color="grey lighten-5" elevation=2>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md12 lg12>
                                    <v-switch
                                        color="success"
                                        v-model="integracion"
                                        :label="`La carpeta fue remitida : ${integracion ? 'Si' : 'No'}`"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete 
                                        name="distrito integra"
                                        :items="distritos"
                                        v-model="distritointegra" 
                                        label="*Distrito:"
                                        v-if="integracion"
                                        return-object
                                        v-validate="'required'"
                                        @change="listarsubprocintegra()"
                                        :error-messages="errors.collect('distrito integra')" 
                                    />
                                    <v-autocomplete 
                                        name="agencia integra"
                                        :items="agenciasintegra"
                                        v-model="agenciaintegra" 
                                        label="*Agencia:"
                                        v-if="integracion"
                                        return-object
                                        v-validate="'required'"
                                        @change="listarmodulointegra()"
                                        :error-messages="errors.collect('agencia integra')" 
                                    />
                                    <v-menu
                                        ref="menu2"
                                        v-model="menu2"
                                        v-if="integracion"
                                        :close-on-content-click="false"
                                        :return-value.sync="fecharadicacion"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
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
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete 
                                        name="subprocuraduría/dirección general integra"
                                        :items="subprocsintegra"
                                        v-model="subprocintegra"
                                        v-if="integracion" 
                                        label="*Subprocuraduría/dirección general:"
                                        return-object
                                        v-validate="'required'"
                                        @change="listaragenciaintegra()"
                                        :error-messages="errors.collect('subprocuraduría/dirección general integra')" 
                                    />
                                    <v-autocomplete 
                                        name="unidad de investigación que integra integra"
                                        :items="modulosintegra"
                                        v-model="modulointegra" 
                                        v-if="integracion"
                                        v-validate="'required'"
                                        label="*Unidad de investigación que integra:"
                                        return-object
                                        :error-messages="errors.collect('unidad de investigación que integra integra')" 
                                    />
                                </v-flex>  
                            </v-layout>
                        </v-container>
                        <div class="text-xs-right">
                            <v-btn color="primary" @click.native="step = 1">Regresar</v-btn>
                            <v-btn color="primary" @click.native="step = 3">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step editable :complete="step > 3" step="3" :rules="[() => !errors.has('NUC') && !errors.has('fecha de inicio') && !errors.has('fecha de detención') && !errors.has('medio de denuncia')&& !errors.has('corporación que realizo detención') && !errors.has('medio reporte')]">
                    Datos de la carpeta de investigación            
                </v-stepper-step>
                <v-stepper-content step="3">
                    <v-card  color="grey lighten-5" elevation=2>
                        <v-container grid-list-md >
                            <v-layout row wrap>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <div class="switch-container">
                                    <v-autocomplete 
                                        label="*Distrito de carpeta:" 
                                        name="distrito"     
                                        v-model="cveDistrito"
                                        :items="distritosh" 
                                        prepend-icon="public" 
                                        v-validate="'required'"
                                        return-object
                                        v-on:change="updateNuc()" 
                                        :error-messages="errors.collect('distrito')"
                                    />
                                    <v-autocomplete 
                                        label="*Año de carpeta:" 
                                        name="anocarpeta"     
                                        v-model="yearcarpeta"
                                        :items="yearsfile" 
                                        prepend-icon="event_available" 
                                        v-validate="'required'"
                                        return-object
                                        v-on:change="updateNuc()" 
                                        :error-messages="errors.collect('anocarpeta')"
                                    />
                                   </div>
                                    <v-text-field 
                                        name="num"
                                        v-model="numcarpeta" 
                                        v-validate="'required'"
                                        label="*Número de carpeta:"
                                        prepend-icon = "tag"
                                        @change="consultadenuc = false"
                                        counter
                                        v-on:change="updateNuc()" 
                                        maxlength="5"
                                        :error-messages="errors.collect('NUC')" 
                                    /> 
                                    <div class="switch-container">
                                    <v-text-field 
                                        name="NUC"
                                        label="*NUC"
                                        v-model="nuc" 
                                        v-validate="'required'"
                                        readonly
                                        prepend-icon="folder"
                                        @change="consultadenuc = false"
                                        :error-messages="errors.collect('NUC')" 
                                    /> 
                                    <v-btn color="success" @click.native="validarnuc()" :disabled="!nuc">Validar NUC</v-btn>
                                </div>
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
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
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
                                    />
                                    <v-autocomplete 
                                        name="corporación que realizo detención"
                                        :items="institucionesp"
                                        v-model="institucionp" 
                                        v-validate="'required'"
                                        label="*Corporación que realizo detención:"
                                        prepend-icon="apartment"
                                        return-object
                                        v-if="mediodenuncia == 'Con detenido'"
                                        :error-messages="errors.collect('corporación que realizo detención')" 
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
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <!-- CAMBIO DESDE AQUÍ -->
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
                                                />
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <!-- CAMBIO HASTA AQUÍ -->
                            </v-layout>
                        </v-container> 
                        <div class="text-xs-right">
                            <v-btn color="primary" @click.native="step = 2">Regresar</v-btn>
                            <v-btn color="primary" @click.native="step = 4">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step editable :complete="step > 4" step="4" :rules="[() => !errors.has('distrito inicia') && !errors.has('subprocuraduría/dirección general inicia inicia') && !errors.has('agencia inicia') && !errors.has('unidad de investigación que integra inicia')]">
                    Datos de los hechos            
                </v-stepper-step>
                <v-stepper-content step="4">
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
                                        @change="listarmunicipios()"
                                        :error-messages="errors.collect('entidad')" 
                                    />
                                    <v-autocomplete 
                                        name="localidad o colonia"
                                        :items="localidades"
                                        v-model="localidad" 
                                        v-validate="'required'"
                                        label="*Localidad o colonia:"
                                        return-object
                                        :error-messages="errors.collect('localidad o colonia')" 
                                    />
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
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete 
                                        name="municipios"
                                        :items="municipios"
                                        v-model="municipio" 
                                        v-validate="'required'"
                                        label="*Municipios:"
                                        return-object
                                        @change="listarlocalidades()"
                                        :error-messages="errors.collect('municipios')" 
                                    />
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
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container> 
                        <div class="text-xs-right">
                            <v-btn color="primary" @click.native="step = 3">Regresar</v-btn>
                            <v-btn color="primary" @click.native="guardar()">Guardar</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>
            </v-stepper>
        </v-flex>
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
import { computed } from 'vue';

    var assert, curp, persona;
    assert = require('assert');
    curp = require('curp.js');  

    export default {
        components: {
            n401,
            n403
        },
        data: () => ({  
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
            distritos: [],
            distritoinicia: '',
            distritointegra: '',
            subprocsintegra: [],
            subrpocsinicia: [],
            subprocinicia: '',
            subprocintegra: '',
            agenciasintegra: [],
            agenciasinicia: [],
            agenciaintegra: '',
            agenciainicia: '',
            modulosintegra: [],
            modulosinicia: [],
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
            nucdisponible: false,
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
            numcarpeta: ''
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
                return this.$store.drawer 
            }
        },
        created () {
            this.u_iddistrito = this.$store.state.usuario.iddistrito;
            this.u_distrito = this.$store.state.usuario.distrito;
            this.u_dirSubPro = this.$store.state.usuario.dirSubProc;
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
            // DATOS GENERALES
            this.listardistritos();
            this.listarinstituciones();
            this.listarentidades();
            this.listarcvedistritos();
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
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')    
                    } 
                });
            },  
            listarsubprocintegra () {
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.subprocsintegra = []
                this.$conf.get('api/DSPs/ListarPorDistritoId/' + me.distritointegra.value,configuracion).then(function(response){
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.subprocsintegra.push({ text: x.nombreSubDir, value: x.idDSP});
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listarsubprocinicia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.subrpocsinicia = []
                this.$conf.get('api/DSPs/ListarPorDistritoIdCap/' + me.distritoinicia.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.subrpocsinicia.push({ text: x.nombreSubDir, value: x.idDSP });
                    });
                }).catch(err => { 
                    if (err.response.status==400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listaragenciaintegra () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.agenciasintegra = []
                this.$conf.get('api/Agencias/ListarPorDirSub/' + me.subprocintegra.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.agenciasintegra.push({ text: x.nombre, value: x.idAgencia });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listaragenciainicia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.agenciasinicia = []
                this.$conf.get('api/Agencias/ListarPorDirSub/' + me.subprocinicia.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.agenciasinicia.push({ text: x.nombre, value: x.idAgencia });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },  
            listarmoduloinicia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.modulosinicia = []
                this.$conf.get('api/ModuloServicios/ListarPorAgenciaCap/' + me.agenciainicia.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.modulosinicia.push({ text: x.nombre, value: x.idModuloServicio });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listarmodulointegra () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.modulosintegra = []
                this.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.agenciaintegra.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.modulosintegra.push({ text: x.nombre, value: x.idModuloServicio });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            fechainif () {
                if (this.menu1) {
                    this.generarfecha2();
                    this.$refs.menu1.save(this.fechainicio);
                }   
                if (this.menu2) {
                    this.generarfecha2();
                    this.$refs.menu2.save(this.fecharadicacion);
                }
                if (this.menu3) {
                    this.generarfecha2();
                    this.$refs.menu3.save(this.fechadetencion);
                }    
                if (this.menu4) {
                    this.generarfecha2();
                    this.$refs.menu4.save(this.fechahechos);
                }
            },
            generarfecha2 () {
                if (this.menu1) { 
                    this.fechai = this.fechainicio.substring(8,10) + " de " + this.obtenermes(this.fechainicio.substring(5,7)-1)+
                    " del "+ this.fechainicio.substring(0,4);
                }
                if (this.menu2) { 
                    this.fechar = this.fecharadicacion.substring(8,10) +" de "+ this.obtenermes(this.fecharadicacion.substring(5,7)-1)+
                    " del "+ this.fecharadicacion.substring(0,4);    
                }
                if (this.menu3) {
                    this.fechad =this.fechadetencion.substring(8,10) +" de "+ this.obtenermes(this.fechadetencion.substring(5,7)-1)+
                    " del "+ this.fechadetencion.substring(0,4);
                }
                if (this.menu4) {
                    this.fechah =this.fechahechos.substring(8,10) +" de "+ this.obtenermes(this.fechahechos.substring(5,7)-1)+
                    " del "+ this.fechahechos.substring(0,4);
                }
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
                        me.institucionesp.push({ text: x.nombre, value: x.idInstitucion });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')
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
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            },
            listarmunicipios () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.municipios = []
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.entidad.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.municipios.push({ text: x.nombre, value: x.idMunicipio });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },
            listarlocalidades () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraysdatos = []; 
                me.localidades = []
                this.$conf.get('api/Localidads/MostrarPorMPO/'+ me.municipio.value, configuracion).then(function(response) {
                    arraysdatos = response.data;
                    arraysdatos.map(function(x) {
                        me.localidades.push({ text: x.nombre, value: x.idLocalidad });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')
                    }
                });
            },
            guardar () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                if (me.consultadenuc && me.nucdisponible) {
                    me.$validator.validate().then(result => {
                        //CREACION DE RAC
                        me.$cat.post('api/Racs/GenerarRacModuloCaptura', { 
                            'distritoId': me.distritoinicia.value,
                            'agenciaId': me.agenciainicia.value,  
                            'FechaCreacion': me.fechainicio
                        }, configuracion).then(function(response) { 
                            //CREACION DE RATENCION
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
                                    'agenciaid': me.integracion ? me.agenciaintegra.value : me.agenciainicia.value,
                                    'ratencionid': response.data.idRatencion,
                                    'moduloServicioId': me.integracion ? me.modulointegra.value : me.moduloinicia.value,
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
                                                    'pais': "",
                                                    'estado': me.entidad.text,
                                                    'municipio': me.municipio.text,
                                                    'localidad': me.localidad.text,
                                                    'cp': "",
                                                    'lat': "",
                                                    'lng': "",
                                                }, configuracion).then(function(response) { 
                                                    //CREACION DE LA HORA, FECHA DEL SUCESO
                                                    me.$cat.put('api/RHechoes/ActualizarFHS',{ 
                                                        'idRHecho': me.rHechoId,
                                                        'ratencionid': me.rAtencionId, 
                                                        'fechaHoraSuceso': me.fechahechos + ' ' + me.horas,
                                                    }, configuracion).then(function(response) {
                                                        //GUARDAR HISTORICO DE REMISION UI EN CASO DE SELECCIONAR UNA FECHA DE RADICACCION
                                                        if (me.integracion) {
                                                            me.$cat.post('api/Historialcarpeta/CrearModuloCaptura', {
                                                                'RHechoId': me.rHechoId,
                                                                'Detalle': "Remision UI",
                                                                'Modulo': me.modulointegra.text,
                                                                'Agencia':me.agenciaintegra.text,
                                                                'UDistrito': me.u_distrito,  
                                                                'USubproc': me.u_dirSubPro,
                                                                'UAgencia': me.u_agencia,
                                                                'Usuario': me.u_nombre,
                                                                'UPuesto': me.u_puesto,
                                                                'UModulo': me.u_modulo,
                                                                'Fechasys': me.fecharadicacion
                                                            }, configuracion).then(function(response) {
                                                            
                                                            }).catch(err => { 
                                                                if (err.response.status == 400) {
                                                                    me.$notify("No es un usuario válido", 'error')
                                                                } else if (err.response.status == 401) {
                                                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                    me.e401 = true,
                                                                    me.showpage = false
                                                                } else if (err.response.status == 403) { 
                                                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                                    me.e403 = true
                                                                    me.showpage = false 
                                                                } else if (err.response.status == 404) {
                                                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                                                } else {
                                                                    me.$notify('Error al intentar crear el  registro!!!', 'error')
                                                                } 
                                                            });
                                                        }
                                                        if ( me.mediodenuncia == 'Con detenido') {
                                                            me.$cat.post('api/RAPs/CrearPoliciaModuloCaptura', {                                                    
                                                                'RAtencionId': me.rAtencionId,
                                                                'nombre': me.institucionp.text,
                                                                'apellidoPaterno': "",
                                                                'apellidoMaterno': "",
                                                                'InstitutoPolicial': me.institucionp.text
                                                            }, configuracion).then(function(response) {

                                                            }).catch(err => { 
                                                                if (err.response.status == 400) {
                                                                    me.$notify("No es un usuario válido", 'error')
                                                                } else if (err.response.status == 401) {
                                                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                    me.e401 = true,
                                                                    me.showpage = false
                                                                } else if (err.response.status == 403) { 
                                                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                                    me.e403 = true
                                                                    me.showpage = false 
                                                                } else if (err.response.status == 404) {
                                                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                                                } else {
                                                                    me.$notify('Error al intentar crear el  registro!!!','error')  
                                                                } 
                                                            }); 
                                                        }
                                                        me.$router.push('./informaciongeneral')
                                                    }).catch(err => { 
                                                        if (err.response.status == 400) {
                                                            me.$notify("No es un usuario válido", 'error')
                                                        } else if (err.response.status == 401) {
                                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                            me.e401 = true,
                                                            me.showpage = false
                                                        } else if (err.response.status == 403) { 
                                                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                            me.e403 = true
                                                            me.showpage = false 
                                                        } else if (err.response.status == 404) {
                                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                                        } else {
                                                            me.$notify('Error al intentar crear el  registro!!!','error')  
                                                        } 
                                                    }); 
                                                }).catch(err => { 
                                                    if (err.response.status == 400) {
                                                        me.$notify("No es un usuario válido", 'error')
                                                    } else if (err.response.status == 401) {
                                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                        me.e401 = true,
                                                        me.showpage = false
                                                    } else if (err.response.status == 403) {
                                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                        me.e403 = true
                                                        me.showpage = false 
                                                    } else if (err.response.status == 404) {
                                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                                    } else {
                                                        me.$notify('Error al intentar crear el  registro!!!', 'error')
                                                    }
                                                }); 
                                            }).catch(err => {
                                                if (err.response.status == 400) {
                                                    me.$notify("No es un usuario válido", 'error')
                                                } else if (err.response.status == 401) {
                                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                    me.e401 = true,
                                                    me.showpage = false
                                                } else if (err.response.status == 403) { 
                                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                    me.e403 = true
                                                    me.showpage = false 
                                                } else if (err.response.status == 404) {
                                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                                } else {
                                                    me.$notify('Error al intentar crear el  registro!!!','error')  
                                                }
                                            }); 
                                        }).catch(err => {
                                            if (err.response.status == 400) {
                                                me.$notify("No es un usuario válido", 'error')
                                            } else if (err.response.status == 401) {
                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage = false
                                            } else if (err.response.status == 403) { 
                                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                me.e403 = true
                                                me.showpage = false 
                                            } else if (err.response.status == 404) {
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            } else {
                                                me.$notify('Error al intentar crear el  registro!!!','error')  
                                            }
                                        });
                                    }).catch(err => { 
                                        if (err.response.status == 400) {
                                            me.$notify("No es un usuario válido", 'error')
                                        } else if (err.response.status == 401) {
                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                            me.e401 = true,
                                            me.showpage = false
                                        } else if (err.response.status == 403) { 
                                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                                            me.e403 = true
                                            me.showpage = false 
                                        } else if (err.response.status == 404) {
                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                        } else {
                                            me.$notify('Error al intentar crear el  registro!!!','error')  
                                        } 
                                    });
                                }).catch(err => { 
                                    if (err.response.status == 400) {
                                        me.$notify("No es un usuario válido", 'error')
                                    } else if (err.response.status == 401) {
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                        me.showpage = false
                                    } else if (err.response.status == 403) { 
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false 
                                    } else if (err.response.status == 404) {
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                    } else {
                                        me.$notify('Error al intentar crear el  registro!!!','error')  
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
                                        me.$notify("No es un usuario válido", 'error')
                                    } else if (err.response.status == 401) {
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                        me.showpage = false
                                    } else if (err.response.status == 403) { 
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false 
                                    } else if (err.response.status == 404) {
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                    } else {
                                        me.$notify('Error al intentar crear el  registro!!!','error')  
                                    } 
                                })
                            }).catch(err => { 
                                if (err.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                } else if (err.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                    me.showpage = false
                                } else if (err.response.status == 403) { 
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false 
                                } else if (err.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                } else {
                                    me.$notify('Error al intentar crear el  registro!!!','error')  
                                } 
                            });
                        }).catch(err => {
                            if (err.response.status == 400) {
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status == 401) {
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage = false
                            } else if (err.response.status == 403) { 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403 = true
                                me.showpage = false 
                            } else if (err.response.status == 404) {
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        });
                    })                        
                } else {   
                    me.$notify('NUC no valido','error')
                    me.$alert('Notificación',"Antes de guardar, favor de validar el número de carpeta.",
                    function () {
                        me.step = 3;  
                    }) 
                       
                }
            },
            listarcvedistritos() {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arraycve = []; 
                this.$conf.get('api/Distritoes/ListarCvedistrito',configuracion).then(function(response) {
                    arraycve = response.data;
                    arraycve.map(function(x) {
                        me.distritosh.push({ text: x.nombre, value: x.clave });
                    });
                }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403 = true
                        me.showpage = false 
                    } else if (err.response.status == 404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')    
                    } 
                });
            },  
            validarnuc(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$cat.get('api/RHechoes/ValidarNuc/'+ me.nuc,configuracion).then(function(response){
                    me.consultadenuc = true
                    if (response.data.nucActivo) {
                        me.$notify('El Nuc se encuentra disponible para su uso', 'success')
                        me.nucdisponible = true;
                    } else {
                        me.$notify('El Nuc no se encuentra disponible para su uso','error')
                        me.nucdisponible = false;
                    }  
                })
            },
            updateNuc(){
                    var nocarpeta = this.numcarpeta.length < 5? this.numcarpeta.padStart(5, '0'): this.numcarpeta; 
                    this.nuc = this.cveDistrito.value + '-' + this.yearcarpeta + '-' + nocarpeta;
                }

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
</style>