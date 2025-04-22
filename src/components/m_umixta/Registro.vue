<script src="./Registro.js"></script>
<template>  
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular">Registro del denunciante.</v-toolbar-title>    
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
            </v-toolbar>
            <v-stepper v-model="step" non-linear vertical>
                <v-stepper-step :complete="step > 1" step="1" :rules="[() => !errors.has('clasificacion de persona') && !errors.has('nombre') && !errors.has('apellido paterno') 
                                                                             && !errors.has('fecha de nacimiento') && !errors.has('Persona Desaparecida') 
                                                                             && !errors.has('clasificacion de persona')]">
                    Captura de datos
                    <small>Datos del denunciante.</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-md>
                            <v-layout row wrap>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                    <v-switch v-model="switch2" label="¿Registro anónimo?:" color="success" hide-details />
                                    <v-switch v-model="datosprotegidos" v-if="!switch2" label="¿Datos protegidos?:" color="success" hide-details />
                                    <v-radio-group v-model="radios" v-on:change="limpiar()" v-if="switch2==false" row :mandatory="false">
                                        <v-radio label="Fisica" @change="ocultarTP" color="success" value="Fisica" />
                                        <v-radio label="Moral" @change="mostrarTP" color="success" value="Moral" /> 
                                    </v-radio-group>
                                    <v-text-field 
                                        name="rfc" 
                                        label="RFC:" 
                                        v-model="rfc"   
                                        v-if="radios === 'Moral' && !switch2" 
                                    />
                                    <v-text-field 
                                        name="razón social"   
                                        label="Razón social:" 
                                        v-model="razonsocial"   
                                        v-if="radios === 'Moral'  && !switch2" 
                                    />
                                    <v-autocomplete 
                                        name="clasificacion de persona"
                                        :items="clasificacionpersonas"
                                        v-model="clasificacionpersona" 
                                        v-validate="'required'"
                                        v-if="switch2==false"
                                        label="*Clasificación de persona:"
                                        :error-messages="errors.collect('clasificacion de persona')" 
                                    />
                                    <v-autocomplete name="Persona Desaparecida"
                                        :items="tDesaparecidos"
                                        v-model="registro"
                                        v-validate="requeridoPD"
                                        chips
                                        v-show="clasificacionpersona == 'Victima directa' && radios === 'Fisica' && !switch2 "
                                        label="*¿Es un tema de personas desaparecidas?:"
                                        :error-messages="errors.collect('Persona Desaparecida')">
                                    </v-autocomplete>
                                    <v-text-field 
                                        name="nombre" 
                                        label="*Nombre(s):" 
                                        v-model="nombres"   
                                        v-validate="'required'"
                                        v-if="switch2==false && radios == 'Fisica'"
                                        :error-messages="errors.collect('nombre')" 
                                    />
                                    <v-text-field 
                                        name="nombre del apoderado o representante" 
                                        label="*Nombre del apoderado o representante" 
                                        v-model="nombres"   
                                        v-validate="'required'"
                                        v-if="switch2==false && radios == 'Moral'"
                                        :error-messages="errors.collect('nombre del apoderado o representante')" 
                                    />
                                    <v-text-field 
                                        name="apellido paterno" 
                                        label="*Apellido paterno:" 
                                        v-model="apaterno" 
                                        v-validate="'required'"
                                        v-if="switch2==false"
                                        :error-messages="errors.collect('apellido paterno')" 
                                    />
                                    <v-text-field 
                                        name="apellido materno"
                                        label="Apellido materno:"
                                        v-model="amaterno"
                                        v-validate="{required:this.isInput3RequiredD}"
                                        v-if="switch2==false" 
                                        :error-messages="errors.collect('apellido materno')">
                                    </v-text-field>
                                    
                                    <v-text-field 
                                        name="alias" 
                                        v-model="alias" 
                                        label="Alias:" 
                                        v-if="switch2==false" 
                                    />
                                    <v-text-field 
                                        name="fecha de nacimiento" 
                                        label="Fecha de nacimiento:" 
                                        v-model="fnacimiento" 
                                        type="date"
                                        v-validate="'required'"
                                        v-if="switch2==false && RangoEdadTF == false"
                                        v-on:change="validarEdad" 
                                        :error-messages="errors.collect('fecha de nacimiento')" 
                                    />
                                    
                                    <v-switch v-model="RangoEdadTF" :label="'¿Desconoce la fecha de nacimiento? Agregar un rango de edad'"  color="success" v-if="!switch2" hide-details></v-switch>

                                    <v-autocomplete
                                                    name="rangos"
                                                    :items="rangosedad"
                                                    v-model="rangoedad"
                                                    v-validate="'required'"
                                                    label="Rango de edad:"
                                                    v-if="switch2==false && RangoEdadTF == true"
                                                    :error-messages="errors.collect('rangos')">
                                    </v-autocomplete>

                                    <v-autocomplete
                                        name="sexo"
                                        :items="sexos"
                                        v-model="sexo"
                                        label="Sexo:" 
                                        v-if="switch2==false" 
                                    />
                                    <v-switch 
                                        v-if="clasificacionpersona == ('Victima directa' || clasificacionpersona == 'Victima indirecta') && !switch2" 
                                        v-model="relacion"  
                                        :label="'La victima tiene relación con el imputado? '"  
                                        color="success"  
                                        hide-details 
                                    />
                                    <v-autocomplete
                                        :items="relacionados"
                                        v-model="relacionado"
                                        label="Relación:" 
                                        v-if="(clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta') && relacion && !switch2" 
                                    />

                                    <v-switch name="afrodecendiente" v-model="poblacionafro"   label="¿Pertenece a una poblacion afrodescendiente?:" v-if="switch2==false" color="success"  hide-details></v-switch>
                                    
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>    
                                    <v-autocomplete
                                        name="entidad federativa"
                                        :items="estados"
                                        v-model="abreviacion"
                                        label="Entidad federativa de nacimiento:" 
                                        return-object  
                                        v-if="switch2==false" 
                                    />
                                    <v-autocomplete 
                                        name="documento de identificación"
                                        :items="docsidentificaciones"
                                        v-model="docidentificacion"
                                        label="Documento de identificación:"
                                        v-if="switch2==false" 
                                    />                                
                                    <br/>
                                    <v-toolbar color="primary" v-if="!switch2" dark> 
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
                                        <v-container fluid grid-list-md v-if="!switch2">
                                            <v-layout row wrap>
                                                <v-flex class="text-md-center">
                                                    <img :src="imageUrl" height="150px" style="max-width: 100%;" />  
                                                    <pdf :src="imageUrl" height="150px" style="max-width: 100%;"/>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card>
                                    <v-text-field 
                                        label="Selecciona la imagen del documento de identificación" 
                                        @click='pickFile' 
                                        v-if="switch2==false"  
                                        v-model='imageName' 
                                        prepend-icon='attach_file' 
                                    />    
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
                                        v-if="switch2==false && radios == 'Moral'"
                                        label="Documento que acredita su personalidad:"
                                        :error-messages="errors.collect('documento que acredita su personalidad')" 
                                    />
                                    <v-text-field 
                                        name="curp" 
                                        v-model="curp" 
                                        v-if="switch2==false" 
                                        label="CURP:"  
                                    />
                                    <span v-if="!switch2">Valida que no exista la duplicidad de la denuncia en otros distritos.</span>
                                    <br/> 
                                    <br/>  
                                    <v-btn block="" outline color="primary" @click.native="validadduplicidad" v-if="switch2==false">
                                        Validar que no exista el registro
                                    </v-btn>
                                </v-flex>               
                            </v-layout>
                            <v-spacer />
                            <div class="text-xs-right">
                                <v-btn color="primary" v-if="switch2" @click.native="guardar">Finalizar</v-btn> <!-- Anonimo activo -->
                                <v-btn color="primary" v-if="!switch2" @click.native="step = 2">Continuar</v-btn>
                            </div>
                        </v-container>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step :complete="step > 2" step="2" v-if="!switch2">
                    Información complementaria
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-md>
                            <v-layout row wrap>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                    <v-autocomplete name="medio de notificación"
                                            :items="medionotificaciones"
                                            v-model="medionotificacion"
                                            label="Medio de notificación:"
                                            multiple
                                            return-object   
                                            attach
                                            chips
                                            deletable-chips
                                            v-if="switch2==false"
                                    ></v-autocomplete>
                                    <multiselect 
                                        name="medio de notificación" 
                                        v-model="value" 
                                        :options="medionotificaciones" 
                                    />
                                    <v-text-field 
                                        label="Telefono 1:" 
                                        v-if="switch2==false" 
                                        v-model="telefono1" 
                                    />
                                    <v-text-field 
                                        label="Telefono 2:" 
                                        v-if="switch2==false" 
                                        v-model="telefono2" 
                                    />
                                    <v-text-field 
                                        label="Correo electrónico:" 
                                        v-if="switch2==false" 
                                        v-model="correo" 
                                    />
                                    <v-autocomplete 
                                        name="nacionalidad"
                                        :items="nacionalidades"
                                        v-model="nacionalidad" 
                                        label="Nacionalidad:"
                                        v-if="switch2==false"
                                    />
                                    <v-autocomplete 
                                        name="estado familiar"
                                        :items="estadosciviles"
                                        v-model="estadocivil" 
                                        label="Estado familiar:"
                                        v-if="switch2==false"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>    
                                    <v-autocomplete 
                                        name="ocupación"
                                        :items="ocupaciones"
                                        v-model="ocupacion" 
                                        label="Ocupación:"
                                        v-if="switch2==false"
                                    />
                                    <v-text-field 
                                        label="Escriba su ocupación:" 
                                        v-if="switch2==false && ocupacion === 'Otra' " 
                                        v-model="ocupacion2" 
                                    />
                                    
                                    <v-autocomplete 
                                        name="nivel de estudios"
                                        :items="nivelestudios"
                                        v-model="nivelestudio" 
                                        label="Nivel de estudios:"
                                        v-if="switch2==false"
                                    />
                                    <v-autocomplete 
                                        name="lengua"
                                        :items="lenguas"
                                        v-model="lengua" 
                                        label="Lengua:"
                                        v-if="switch2==false"
                                    />
                                    <v-autocomplete 
                                        name="religión"
                                        :items="religiones"
                                        v-model="religion" 
                                        label="Religión:"
                                        v-if="switch2==false"
                                    />
                                    <v-autocomplete 
                                        name="género"
                                        :items="generos"
                                        v-model="genero" 
                                        label="Género:"
                                        v-if="switch2==false && presexuales"
                                    />
                                    <v-switch 
                                        v-model="presexuales" 
                                        v-if="switch2==false" 
                                        label="¿Pertenece a la comunidad LGBTTTIQA?" 
                                        color="success"  
                                        hide-details
                                    />
                                    <v-switch 
                                        v-model="switch1" 
                                        v-if="switch2==false" 
                                        label="¿Tiene alguna discapacidad?:" 
                                        color="success"  
                                        hide-details 
                                    />
                                    <v-autocomplete 
                                        name="discapacidad"
                                        :items="discapaciodades"
                                        v-model="discapacidad" 
                                        multiple
                                        return-object
                                        attach
                                        chips
                                        deletable-chips
                                        label="¿Que discapacidad tiene?:" 
                                        v-show="switch1"
                                    />
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
                <v-stepper-step :complete="step > 3" step="3" :rules="[]" v-if="!switch2">
                    Dirección personal
                </v-stepper-step>
                <v-stepper-content step="3">
                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-md>
                            <v-layout row wrap>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-text-field 
                                        label="Calle:" 
                                        name="calle" 
                                        v-model="calle" 
                                        v-if="switch2==false"
                                        :error-messages="errors.collect('calle')" 
                                    />
                                    <v-text-field 
                                        name="numero exterior" 
                                        label="No. exterior:" 
                                        v-model="noExt" 
                                        v-if="switch2==false"
                                        :error-messages="errors.collect('numero exterior')" 
                                    />
                                    <v-text-field 
                                        label="No. Interior:" 
                                        v-if="switch2==false"  
                                        v-model="noInt" 
                                    />    
                                    <v-text-field 
                                        label="Entre calle 1:" 
                                        v-if="switch2==false" 
                                        v-model="entreCalle1" 
                                    />   
                                    <v-text-field 
                                        label="Entre calle 2:" 
                                        v-if="switch2==false" 
                                        v-model="entreCalle2" 
                                    /> 
                                    <v-text-field 
                                        label="Referencia:"  
                                        v-if="switch2==false" 
                                        v-model="referencia" 
                                    />  
                                </v-flex>  
                                <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                    <v-text-field 
                                        label="Pais:" 
                                        name="pais" 
                                        v-model="pais" 
                                        v-if="switch2==false"
                                        value="México" 
                                    /> 
                                    <v-autocomplete 
                                        label="Estado:" 
                                        name="estado"     
                                        v-model="estadoid"
                                        :items="ciudades"  
                                        v-if="switch2==false"
                                        return-object
                                        v-on:change="listarPorEstado"
                                    />
                                    <v-autocomplete 
                                        label="Municipio:" 
                                        name="municipio" 
                                        v-model="municipioid" 
                                        :items="municipios"
                                        v-if="switch2==false"
                                        return-object  
                                        v-on:change="listarPorMunicipio" 
                                    />
                                    <v-autocomplete 
                                        label="Localidad:" 
                                        name="localidad" 
                                        v-model="localidadid" 
                                        :items="localidades" 
                                        v-if="switch2==false"
                                        return-object
                                        v-on:change="listarPorLocalidad"
                                    />
                                    <v-text-field 
                                        label="Código postal:" 
                                        v-if="switch2==false" 
                                        name="cp" 
                                        v-model="cp"
                                        @keyup.enter="buscarPorCP()" 
                                    />
                                    <v-layout wrap justify-space-between>
                                        <v-flex xs6 md6 lg6>
                                            <v-text-field 
                                                v-model="lat"
                                                label="Latitud:" 
                                                disabled
                                            />
                                        </v-flex>
                                        <v-flex xs6 md6 lg6>
                                            <v-text-field 
                                                v-model="lng"
                                                label="Longitud:" 
                                                disabled
                                            />
                                        </v-flex>
                                    </v-layout>
                                    <v-btn block="" v-if="switch2==false" @click.native="btn_geoloc2" outline color="primary">
                                        <v-icon>location_on</v-icon>Croquis
                                    </v-btn>
                                </v-flex> 
                            </v-layout>
                            <div class="text-xs-right">
                                <v-btn flat @click.native="step = 2">Anterior</v-btn> 
                                <v-btn color="primary" @click.native="guardar">Finalizar</v-btn>  
                            </div> 
                        </v-container>
                    </v-card> 
                </v-stepper-content>  
            </v-stepper>
            <v-dialog v-model="ticketModal">
                <v-card>
                    <v-card-text>
                        <iframe id="iframepdf" type="application/pdf" />
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="modalduplicidad" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Información  general de los registros que ha tenido la persona.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn icon @click="cerrarModalDuplicidad">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="hechos"
                            :search="search"
                            :rows-per-page-items="rowsPerPageItems"
                            :pagination.sync="pagination"
                        >
                            <template slot="items" class="white" slot-scope="props">
                                <td>{{ props.item.personaRelacionada }}</td>
                                <td>{{ props.item.genero }}</td>
                                <td>{{ props.item.moduloactual }}</td>    
                                <td>{{ props.item.fechaCarpeta }}</td>
                                <td>{{ props.item.clasificacionPersona }}</td>
                                <td>{{ props.item.racg }}</td>
                                <td>{{ props.item.nucg }}</td> 
                            </template>
                            <template slot="no-data">
                                <v-btn color="primary">Resetear</v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="modalGeolocalizacion" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Geolocalización.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn  color=success text @click.native="guardarGeolocalizacion()">
                                GUARDAR
                            </v-btn>
                            <v-btn icon @click="modalGeolocalizacion = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-divider />
                    <v-card elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-sm>
                            <v-layout row wrap justify-center>
                                <v-flex  xs12 md12 lg12> 
                                    <gmap-autocomplete  
                                        style="width:50%;  
                                        height: 36px; 
                                        text-rendering: auto;
                                        color: initial;
                                        letter-spacing: normal;
                                        word-spacing: normal;
                                        text-transform: none;
                                        text-indent: 0px;
                                        text-shadow: none;
                                        display: inline-block;
                                        text-align: start;
                                        -webkit-appearance: textfield;
                                        background-color: white;
                                        -webkit-rtl-ordering: logical;
                                        cursor: text;
                                        margin: 0em;
                                        font: 400 13.3333px Arial;
                                        padding: 5px 5px;
                                        border-width: 2px;
                                        border-style: inset;
                                        border-color: initial;
                                        border-image: initial;"
                                        id="mapa"
                                        @place_changed="setPlace" 
                                    />
                                    <v-btn outline color="primary" @click="addMarker">BUSCAR</v-btn>
                                    <br>
                                    <gmap-map
                                        :center="center"
                                        :zoom="17"
                                        style="width:100%;  
                                        height: 700px;"
                                    >
                                        <gmap-marker
                                            :key="index"
                                            v-for="(m, index) in markers"
                                            :position="m.position"
                                            @click="center=m.position"
                                            :clickable="true"
                                            :draggable="true"
                                            @drag="updateCoordinates"
                                            @dragend="updatecenter"
                                        />
                                    </gmap-map>  
                                </v-flex>  
                            </v-layout>        
                        </v-container>
                    </v-card>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog1" max-width="500px">   
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="40">
                            <v-icon class="grey lighten-2">report_problem</v-icon>
                        </v-avatar> 
                        <v-toolbar-title class="subheading">Notificación</v-toolbar-title>
                        <v-spacer /> 
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12 class="text-md-center">
                                        <p class="headline">La victima es menor de edad por favor envie este caso a Atención Especializada para Adolecentes</p>
                                        <br> 
                                        <v-icon style="font-size: 80px;">pan_tool</v-icon> 
                                        <br> 
                                    </v-flex>
                                </v-layout>
                            </v-container> 
                            <br>
                            <v-card-actions>
                                <v-spacer />  
                                <v-btn @click.native="enviarAEPA" class="success" >Aceptar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text> 
                </v-card> 
            </v-dialog>
        </v-flex>
    </v-layout> 
</template>
<style>
    #ticket {
        background: white;
        margin: 0 1em;
        padding: 1em;
        box-shadow: 0 0 5px rgba(0,0,0,.25);
    }
    #ticket h1 {
        text-align: center; font-size: 60px;
    }
    #ticket h3 {
        text-align: center;
    }
    #ticket h4 {
        font-size: 15px; text-align: center;
    }
    #ticket h5 {
        text-align: center;font-family: monospace;
    }
    .espaciado{
        padding: 30px !important; 
    }   
</style>
