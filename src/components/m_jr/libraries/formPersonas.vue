<script src="./formPersonaScript.js"></script>
<template>
<v-stepper v-model="step" non-linear vertical>
                            <v-stepper-step :complete="step > 1" step="1" editable >
                                Captura de datos
                                <small>Datos generales de la víctima u ofendido.</small>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                             <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-lg>
                                        <v-layout wrap justify-space-between>
                                            <v-flex  xs12 md5 lg5> 
                                                <v-switch v-model="infoPersona.anonimo"  label="¿Registro anonimo?:" color="success"  hide-details></v-switch>
                                                <v-radio-group v-model="infoPersona.tipoPersona" v-if="infoPersona.anonimo==false" row :mandatory="false">
                                                    <v-radio label="Fisica" @change="ocultarTP" color="success" value="Fisica"></v-radio>
                                                    <v-radio label="Moral" @change="mostrarTP" color="success" value="Moral"></v-radio> 
                                                </v-radio-group>
                                                
                                            
                                                <v-text-field name="rfc" 
                                                                label="RFC:" 
                                                                v-model="infoPersona.rfc"   
                                            
                                                                v-if="infoPersona.verTP==1">
                                                    
                                                </v-text-field>
                                                <v-text-field name="razón social"   
                                                                label="Razón social:" 
                                                                v-model="infoPersona.razonsocial"   
                                            
                                                                v-if="infoPersona.verTP==1">
                                                    
                                                </v-text-field>
                                                <v-autocomplete name="clasificacion de persona"
                                                            :items="catalogos.clasificacionpersonas"
                                                            v-model="infoPersona.clasificacionPersona" 
                                        
                                                            v-if="infoPersona.anonimo==false"
                                                            label="Clasificación de persona:"
                                                            :error-messages="errors.collect('clasificacion de persona')">
                                                </v-autocomplete>
                                                <v-switch
                                                    v-if="infoPersona.clasificacionPersona == 'Victima directa' || infoPersona.clasificacionPersona == 'Victima indirecta'"
                                                    v-model="infoPersona.relacion"
                                                    :label="'¿La victima tiene relación con el imputado? '"
                                                    color="success"
                                                    hide-details
                                                />
                                                <v-autocomplete
                                                :items="catalogos.relacionados"
                                                v-model="relacionado"
                                                label="Relación:"
                                                v-if="(infoPersona.clasificacionPersona == 'Victima directa' || infoPersona.clasificacionPersona == 'Victima indirecta') && infoPersona.relacion"
                                                />
                                                <v-text-field
                                                    name="nombre"
                                                    label="*Nombre(s):"
                                                    v-model="infoPersona.nombres"
                                                    v-validate="'required'"
                                                    v-if="infoPersona.anonimo==false && infoPersona.verTP==0"
                                                    :error-messages="errors.collect('nombre')"
                                                />
                                                <v-text-field
                                                    name="nombre del apoderado o representante"
                                                    label="*Nombre del apoderado o representante"
                                                    v-model="infoPersona.nombres"
                                                    v-validate="'required'"
                                                    v-if="infoPersona.anonimo==false && infoPersona.verTP==1"
                                                    :error-messages="errors.collect('nombre del apoderado o representante')"
                                                />    


                                                <v-text-field name="apellido paterno" 
                                                            label="Apellido paterno:" 
                                                            v-model="infoPersona.apaterno" 
                                                            v-validate="'required'"
                                                            v-if="infoPersona.anonimo==false"
                                                            :error-messages="errors.collect('apellido paterno')">
                                
                                                </v-text-field>
                                                <v-text-field name="apellido materno" 
                                                                label="Apellido materno:" 
                                                                v-model="infoPersona.amaterno" 
                                            
                                                                v-if="infoPersona.anonimo==false"
                                                                >
                                
                                                </v-text-field>
                                                <v-text-field name="alias" 
                                                    label="Alias:" 
                                                    v-model="infoPersona.alias"  
                                                    v-if="infoPersona.anonimo==false">
                                                </v-text-field>
                                                <v-text-field name="fecha de nacimiento" 
                                                                label="Fecha de nacimiento [dd/mm/yyyy]:" 
                                                                v-model="infoPersona.fnacimiento" 
                                                                v-validate="'date_format:dd/MM/yyyy'"
                                                                v-if="infoPersona.anonimo==false"
                                                                v-on:change="validarEdad"
                                                                :error-messages="errors.collect('fecha de nacimiento')">
                                
                                                </v-text-field>
                                                <v-text-field name="Edad" 
                                                                label="Edad:" 
                                                                v-model="infoPersona.edad" type="number"
                                                                v-if="infoPersona.anonimo==false">
                                
                                                </v-text-field>
                                            </v-flex>
                                            <v-divider class="mx-2" inset vertical></v-divider>
                                        <v-flex  xs12 md6 lg6> 
                                            <v-autocomplete
                                                    name="sexo"
                                                    :items="catalogos.sexos"
                                                    v-model="infoPersona.sexo"
                                                    label="Sexo:" 
                                
                                                    v-if="infoPersona.anonimo==false">
                                                </v-autocomplete>
                                                <v-autocomplete
                                                    name="entidad federativa"
                                                    :items="catalogos.estados"
                                                    v-model="infoPersona.entidadFederativaNacId"
                                                    label="Entidad federativa de nacimiento:" 
                                
                                                    return-object  
                                                    v-if="infoPersona.anonimo==false">
                                                </v-autocomplete> 
                                                <v-autocomplete name="documento de identificación"
                                                        :items="catalogos.docsidentificaciones"
                                                        v-model="infoPersona.docidentificacion"
                                                        label="Documento de identificación:"
                                    
                                                        v-if="infoPersona.anonimo==false"
                                                        
                                                ></v-autocomplete>
                                            
                                            <br/>
                                                <v-toolbar color="primary" v-if="infoPersona.anonimo==false"  dark> 
                                                    <v-toolbar-title>Documento escaneado</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    
                                        
                                                </v-toolbar>
                                                <v-card v-if="infoPersona.anonimo==false">
                                                    <v-container fluid grid-list-md>
                                                    <v-layout row wrap>
                                                        <v-flex class="text-md-center">  
                                                            <img   :src="infoPersona.imageUrl"  height="150px"  v-if="infoPersona.imageUrl"/>  
                                                        </v-flex>
                                                    </v-layout>
                                                    </v-container>
                                                </v-card>
                                                
                                                <v-text-field 
                                                    name="curp" v-model="infoPersona.curp" 
                                                    v-validate="'alpha_dash|length:18'" 
                                                    v-if="infoPersona.anonimo==false"  
                                                    label="CURP:" 
                                                    :error-messages="errors.collect('curp')">
                                                <v-tooltip slot="append" bottom >
                                                    <v-btn slot="activator" @click="generarcurp"  flat icon color="primary" dark>
                                                        <v-icon>cached</v-icon>
                                                    </v-btn>
                                                    <span>Generar curp</span>
                                                </v-tooltip>
                                                </v-text-field> 
                                            <span v-if="infoPersona.anonimo==false && opciones=='insertar'" >Valida que no exista la duplicidad de la denuncia en otros distritos.</span>
                                    <br/>
                                    <br/>
                                    <v-btn block="" outline color="primary" @click.native="validadduplicidad" v-if="infoPersona.anonimo==false && opciones=='insertar'">
                                        Validar que no exista el registro
                                    </v-btn> 
                                    </v-flex>
                                        </v-layout>
                                        <v-spacer></v-spacer>
                                        <div class="text-xs-right">
                                            <v-btn color="primary"  @click.native="step = 2">Continuar</v-btn>
                                        </div>
                                    </v-container> 
                                        
                                </v-card> 
                            </v-stepper-content>
<!------------------------------------------------------------------------------  SEGUNDA SECCION --------------------------------------------------------------------------->
            <v-stepper-step :complete="step > 2" step="2" editable>
                    Información complementaria
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                    <v-autocomplete name="medio de notificación"
                                            :items="catalogos.medionotificaciones"
                                            v-model="infoAdicional.medionotificacion"
                                            label="Medio de notificación:"
                                            multiple
                                            return-object
                                            attach
                                            chips
                                            deletable-chips
                                            v-if="infoPersona.anonimo==false"
                                    ></v-autocomplete>
                                    <v-text-field
                                        label="Telefono 1:"
                                        v-if="infoPersona.anonimo==false"
                                        v-model="infoAdicional.telefono1"
                                    />
                                    <v-text-field
                                        label="Telefono 2:"
                                        v-if="infoPersona.anonimo==false"
                                        v-model="infoAdicional.telefono2"
                                    />
                                    <v-text-field
                                        label="Correo electrónico:"
                                        v-if="infoPersona.anonimo==false"
                                        v-model="infoAdicional.correo"
                                    />
                                    <v-autocomplete
                                        name="nacionalidad"
                                        :items="catalogos.nacionalidades"
                                        v-model="infoAdicional.nacionalidad"
                                        label="Nacionalidad:"
                                        v-if="infoPersona.anonimo==false"
                                    />
                                    <v-autocomplete
                                        name="estado familiar"
                                        :items="catalogos.estadosciviles"
                                        v-model="infoAdicional.estadocivil"
                                        label="Estado familiar:"
                                        v-if="infoPersona.anonimo==false"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-autocomplete
                                        name="ocupación"
                                        :items="catalogos.ocupaciones"
                                        v-model="infoAdicional.ocupacion"
                                        label="Ocupación:"
                                        v-if="infoPersona.anonimo==false"
                                    />
                                    <v-text-field
                                        label="Escriba su ocupación:"
                                        v-if="infoPersona.anonimo==false && infoAdicional.ocupacion === 'Otra' "
                                        v-model="infoAdicional.otraOcupacion"
                                    />

                                    <v-autocomplete
                                        name="nivel de estudios"
                                        :items="catalogos.nivelestudios"
                                        v-model="infoAdicional.nivelestudio"
                                        label="Nivel de estudios:"
                                        v-if="infoPersona.anonimo==false"
                                    />
                                    <v-autocomplete
                                        name="lengua"
                                        :items="catalogos.lenguas"
                                        v-model="infoAdicional.lengua"
                                        label="Lengua:"
                                        v-if="infoPersona.anonimo==false"
                                    />
                                    <v-autocomplete
                                        name="religión"
                                        :items="catalogos.religiones"
                                        v-model="infoAdicional.religion"
                                        label="Religión:"
                                        v-if="infoPersona.anonimo==false"
                                    />
                                    
                                    <v-switch
                                        v-model="infoAdicional.presexuales"
                                        v-if="infoPersona.anonimo==false"
                                        label="¿Pertenece a la comunidad LGBTTTIQA?"
                                        color="success"
                                        hide-details
                                    />
                                    <v-autocomplete
                                        name="género"
                                        :items="catalogos.generos"
                                        v-model="infoAdicional.genero"
                                        label="Género:"
                                        v-if="infoPersona.anonimo==false && infoAdicional.presexuales"
                                    />
                                    <v-switch
                                        v-model="infoAdicional.bDiscapacidad"
                                        v-if="infoPersona.anonimo==false"
                                        label="¿Tiene alguna discapacidad?:"
                                        color="success"
                                        hide-details
                                    />
                                    <v-autocomplete
                                        name="discapacidad"
                                        :items="catalogos.discapacidades"
                                        v-if="infoPersona.anonimo==false"
                                        v-model="infoAdicional.discapacidad"
                                        label="¿Que discapacidad tiene?:"
                                        v-show="infoAdicional.bDiscapacidad"
                                    />
                                    <v-switch
                                        v-model="infoAdicional.registro"
                                        v-if="infoPersona.anonimo==false"
                                        label="¿Es un tema de personas desaparecidas?:"
                                        color="success"
                                        hide-details
                                    />
                                    <div v-show='infoAdicional.registro' v-if="infoPersona.anonimo==false" >
                                        <v-checkbox
                                            v-model="infoAdicional.verR"
                                            color="success"
                                            :label="`Registro nacional de personas desaparecidas o no localizadas`"
                                        />
                                        <v-checkbox
                                            v-model="infoAdicional.verI"
                                            color="success"
                                            :label="`Autoriza que la información sea pública con fines de busqueda, localización e identificación`"
                                        />
                                    </div>
                                </v-flex>
                            </v-layout>
                            <div class="text-xs-right">
                                <v-btn flat @click.native="step = 1">Anterior</v-btn>
                                <v-btn
                                    color="primary"
                                    class="white--text"
                                    :loading="$store.state.loader"
                                    :disabled="$store.state.loader"
                                    @click.native="step = 3"
                                >
                                    Continuar
                                </v-btn>
                            </div>
                        </v-container>
                    </v-card>
                </v-stepper-content>
<!------------------------------------------------------------------------------  TERCERA SECCION --------------------------------------------------------------------------->
                <v-stepper-step :complete="step > 3"  step="3"  editable >
                                Dirección personal
                            </v-stepper-step>
                            <v-stepper-content step="3">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-xl>
                                        <v-layout wrap justify-space-between>
                                            <v-flex  xs12 md5 lg5> 
                                                

                                                <v-text-field label="Calle:" 
                                                            name="calle" 
                                                            v-model="direccionPersona.calle" 
                                         
                                                            v-if="infoPersona.anonimo==false"
                                                            :error-messages="errors.collect('calle')">
                                                </v-text-field>
                                                <v-text-field name="numero exterior" 
                                                                label="No. exterior:" 
                                                                v-model="direccionPersona.noExt" 
                                            
                                                                v-if="infoPersona.anonimo==false"
                                                                >
                                
                                                </v-text-field> 
                                                <v-text-field label="No. Interior:" v-if="infoPersona.anonimo==false"  v-model="direccionPersona.noInt"></v-text-field>    
                                                <v-text-field label="Entre calle 1:" v-if="infoPersona.anonimo==false"  v-model="direccionPersona.entreCalle1"></v-text-field>   
                                                <v-text-field label="Entre calle 2:" v-if="infoPersona.anonimo==false" v-model="direccionPersona.entreCalle2"></v-text-field> 
                                                <v-text-field label="Referencia:"  v-if="infoPersona.anonimo==false" v-model="direccionPersona.referencia"></v-text-field>  
                                            </v-flex>  
                                            <v-divider class="mx-2" inset vertical></v-divider>
                                            <v-flex  xs12 md6 lg6>  
                                                <v-text-field label="Pais:" 
                                                            name="pais" 
                                                            v-model="direccionPersona.pais" 
                                                            v-if="infoPersona.anonimo==false"
                                                            value="México">
                                                </v-text-field> 
                                                <v-autocomplete label="Estado:" 
                                                                name="estado" 

                                                                v-model="direccionPersona.estadoid"
                                                                :items="catalogos.estados" 
                                                                v-if="infoPersona.anonimo==false"
                                                                item-value="text"
                                                                item-text="text"
                                                                v-on:change="listarPorEstado(false)"  > 
                                                </v-autocomplete>
                                            
                                                <v-autocomplete label="Municipio:" 
                                                                name="municipio" 
                                                                v-model="direccionPersona.municipioid" 
                                                                :items="catalogos.municipios" 
                                                                v-if="infoPersona.anonimo==false"
                                                                item-value="text"
                                                                item-text="text"
                                                                v-on:change="listarPorMunicipio(false)">
                                                </v-autocomplete>
                                                <v-autocomplete label="Localidad:" 
                                                                name="localidad" 
                                                                v-model="direccionPersona.localidadid" 
                                                                :items="catalogos.localidades" 
                                                                v-if="infoPersona.anonimo==false"
                                                                item-value="text"
                                                                item-text="text"
                                                                v-on:change="listarPorLocalidad">
                                                </v-autocomplete>
                                                <v-text-field 
                                                    label="Código postal:" 
                                                    v-if="infoPersona.anonimo==false" 
                                                    name="cp" 
                                                    v-model="direccionPersona.cp"
                                
                                                                
                                                    @keyup.enter="buscarPorCP()"  >
                                                    </v-text-field> 
                                                    <v-layout wrap justify-space-between>
                                                        <v-flex  xs6 md6 lg6>
                                                            <v-text-field 
                                                                v-model="direccionPersona.lat"
                                                                label="Latitud:" 
                                                                disabled
                                                            ></v-text-field> 
                                                        </v-flex>
                                                        <v-flex  xs6 md6 lg6>
                                                            <v-text-field 
                                                                v-model="direccionPersona.lng"
                                                                label="Longitud:" 
                                                                disabled
                                                        ></v-text-field> 
                                                        </v-flex>
                                                     </v-layout>
                                                <v-btn block="" v-if="infoPersona.anonimo==false"  @click.native="mostrarModalGeo" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn>
                                            </v-flex> 
                                        </v-layout>
                                        <div class="text-xs-right">
                                            <v-btn flat @click.native="step = 2">Anterior</v-btn> 
                                            <v-btn color="primary"    @click.native="guardarInfoPersona"  >Guardar</v-btn>  
                                        </div> 
                                    </v-container>
                                </v-card> 
                            </v-stepper-content>
            </v-stepper>
</template>
