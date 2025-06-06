<template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
            <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                        <v-toolbar-title class="font-weight-regular" >Víctima(s) directa, indirecta, testigo y/o imputado.</v-toolbar-title>
                        <v-divider class="mx-2" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                        <v-spacer></v-spacer>
                         <v-flex xs12 sm6 md3>
    
                            <v-text-field class="font-weight-regular"
                                v-model="nuc" disabled  prepend-icon="folder"
                                filled
                            ></v-text-field>
                           </v-flex>
                             <v-btn class="mx-2" @click="cerrarcarpeta" fab dark small color="primary">
                                <v-icon dark>close</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
                                <v-icon dark>add</v-icon>
                            </v-btn>
    
    
             </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="raps"
                    :search="search"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"  >
                    <template slot="items" class="white" slot-scope="props">
    
                        <td class="justify-center layout px-0">
                            <div v-if="props.item.inicioDetenido">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-icon
                                            class="mr-2" v-on="on"
                                            >
                                            recent_actors
                                        </v-icon>
                                    </template>
                                    <span>Esta persona fue detenida.</span>
                                </v-tooltip>
                            </div>
                        </td>
                        <td>{{ props.item.clasificacionPersona }}</td>
                        <td>{{ props.item.tipoPersona }}</td>
                        <td>{{ props.item.curp }}</td>
                        <td>{{ props.item.nombre + ' ' + props.item.apellidoPaterno + ' ' + props.item.apellidoMaterno}}</td>
                        <td>{{ props.item.medionotificacion }}</td>
                        <td>{{ props.item.correo}}</td>
                        <td>{{ props.item.telefono1 + ' , ' +  props.item.telefono2}}</td>
    
                        <td class="justify-center layout">
    
                            <div  class="justify-center layout" v-if="props.item.inicioDetenido">
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon
                                            class="mr-2" v-on="on"
                                            @click="infoadicionalpdetenida(props.item)"
                                            >
                                            queue
                                        </v-icon>
                                    </template>
                                    <span>Agregar información adicional de persona detenida.</span>
                                </v-tooltip>
                            </div>
    
                            <v-tooltip bottom v-if="props.item.clasificacionPersona !=='Anonimo'" >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        class="mr-2" v-on="on"
                                        @click="actualizarclasi(props.item)"
                                        >
                                        update
                                    </v-icon>
                                </template>
                                <span>Actualizar clasificación de persona</span>
                            </v-tooltip>
    
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        class="mr-2" v-on="on" color="warning"
                                        @click="infoItem(props.item)"
                                        >
                                        info
                                    </v-icon>
    
    
                                </template>
                                <span>Información detallada de la persona</span>
                            </v-tooltip>
    
    
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
    
                                    <v-icon
                                        class="mr-2" v-on="on"
                                        @click="editItem(props.item)"
                                        >
                                        edit
                                    </v-icon>
                                </template>
                                <span>Actualizar información</span>
                            </v-tooltip>
    
    
    
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        class="mr-2" v-on="on"
                                        @click="mostrarmapa(props.item)"
                                        >
                                    location_on
                                    </v-icon>
                                </template>
                                <span>Ver dirección</span>
                            </v-tooltip>
    
                        </td>
                    </template>
                    <template slot="no-data">
                    <v-btn color="primary" @click="listarrap">Resetear</v-btn>
                    </template>
            </v-data-table>
    
    
            <v-dialog   v-model="modalAdd"  fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
    
                        <v-avatar  size="30">
                            <v-icon >{{ formIcon }}</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn color=success text @click.native="guardar">
                              GUARDAR INFORMACION</v-btn>
                             <v-btn icon   @click="modalclose()">
                        <v-icon>close</v-icon>
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
    
                                <v-stepper v-model="step" non-linear vertical>
                                <v-stepper-step :complete="step > 1" step="1" editable :rules="[() => !errors.has('tipo de persona') && !errors.has('nombre') 
                                                                                                       && !errors.has('apellido paterno') && !errors.has('fecha de nacimiento') 
                                                                                                       && !errors.has('Persona Desaparecida') && !errors.has('clasificacion de persona')]">
                                    Captura de datos
                                    <small>Datos generales de la vícima u ofendido.</small>
                                </v-stepper-step>
                                <v-stepper-content step="1">
                                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                        <v-container grid-list-lg>
                                            <v-layout wrap justify-space-between>
                                                <v-flex  xs12 md5 lg5>
                                                    <v-switch v-model="switch2"  label="¿Registro anonimo?:" color="success" hide-details></v-switch>
                                                    <v-switch v-model="datosprotegidos"  v-if="!switch2" label="¿Datos protegidos?:" color="success"  hide-details></v-switch>
                                                    <v-radio-group v-model="radios" v-on:change="limpiar()" v-if="switch2==false" row :mandatory="false">
                                                        <v-radio label="Fisica" @change="ocultarTP" color="success" value="Fisica"></v-radio>
                                                        <v-radio label="Moral" @change="mostrarTP" color="success" value="Moral"></v-radio>
                                                    </v-radio-group>
    
    
                                                    <v-text-field
                                                      name="rfc"
                                                      label="*RFC:"
                                                      v-model="rfc"
                                                      v-validate="'required'"
                                                      v-if="verTP==1 && !switch2"
                                                      :error-messages="errors.collect('rfc')">
    
                                                    </v-text-field>
                                                    <v-text-field name="razón social"
                                                                    label="*Razón social:"
                                                                    v-model="razonsocial"
                                                                    v-validate="requiredRZ"
                                                                    v-show="verTP==1 && !switch2"
                                                                    :error-messages="errors.collect('razón social')">
    
                                                    </v-text-field>
                                                    <v-autocomplete name="clasificacion de persona"
                                                                :items="clasificacionpersonas"
                                                                v-model="clasificacionpersona"
                                                                v-validate="'required'"
                                                                v-if="switch2==false"
                                                                label="*Clasificación de persona:"
                                                                :error-messages="errors.collect('clasificacion de persona')">
                                                    </v-autocomplete>

                                                    <v-autocomplete name="Persona Desaparecida"
                                                                :items="tDesaparecidos"
                                                                v-model="registro"
                                                                v-validate="requeridoPD"
                                                                chips
                                                                v-show="clasificacionpersona == 'Victima directa' && !switch2 && radios == 'Fisica'"
                                                                label="*¿Es un tema de personas desaparecidas?:"
                                                                :error-messages="errors.collect('Persona Desaparecida')">
                                                    </v-autocomplete>
    
                                                    <v-text-field
                                                        name="nombre"
                                                        label="*Nombre(s):"
                                                        v-model="nombres"
                                                        v-validate="'required'"
                                                        v-if="switch2==false && radios == 'Fisica'"
                                                        :error-messages="errors.collect('nombre')">
                                                    </v-text-field>
    
                                                    <v-text-field
                                                        name="nombre del apoderado o representante"
                                                        label="*Nombre del apoderado o representante"
                                                        v-model="nombres"
                                                        v-validate="'required'"
                                                        v-if="switch2==false && radios == 'Moral'"
                                                        :error-messages="errors.collect('nombre del apoderado o representante')">
                                                    </v-text-field>
    
                                                    <v-text-field name="apellido paterno"
                                                                label="*Apellido paterno:"
                                                                v-model="apaterno"
                                                                v-validate="{required:this.isInput3Required}"
                                                                v-if="switch2==false"
                                                                :error-messages="errors.collect('apellido paterno')">
    
                                                    </v-text-field>
                                                    <v-text-field name="apellido materno"
                                                                    label="Apellido materno:"
                                                                    v-model="amaterno"
                                                                    v-validate="{required:this.isInput3RequiredD}"
                                                                    v-if="switch2==false" 
                                                                    :error-messages="errors.collect('apellido materno')">
    
                                                    </v-text-field>
                                                    <v-text-field name="alias"
                                                      label="Alias:"
                                                      v-model="alias"
                                                      v-if="switch2==false">
                                                    </v-text-field>
                                                    
                                                    <v-text-field name="fecha de nacimiento"
                                                                    label="Fecha de nacimiento:"
                                                                    v-model="fnacimiento"
                                                                    type="date"
                                                                    v-validate="'required'"
                                                                    v-if="switch2==false && RangoEdadTF == false"
                                                                    :error-messages="errors.collect('fecha de nacimiento')">
    
                                                    </v-text-field>
                                                    
    
                                                    <v-switch v-model="RangoEdadTF" v-if="!switch2" :label="'¿Desconoce la fecha de nacimiento? Agregar un rango de edad'"  color="success"  hide-details></v-switch>
    
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
                                                        v-if="switch2==false">
                                                    </v-autocomplete>
    
                                                     <v-switch v-if="(clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta') && !switch2" v-model="relacion"  :label="'La victima tiene relación con el imputado?'"  color="success"  hide-details></v-switch>
    
                                                    <v-autocomplete
                                                        :items="relacionados"
                                                        v-model="relacionado"
                                                        label="Relación:"
                                                        v-if="(clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta') && relacion && !switch2">
                                                    </v-autocomplete>
    
                                                    <v-switch
                                                        v-if="clasificacionpersona == 'Imputado' && !switch2" 
                                                        v-model="impuDetenido"  
                                                        :label="'El imputado fue detenido?'"  
                                                        color="success"  
                                                        hide-details>
                                                    </v-switch>
    
                                                    <v-autocomplete
                                                        name="policia que lo detuvo"
                                                        :items="policias"
                                                        v-model="policiaDetuvo"
                                                        attach
                                                        chips
                                                        deletable-chips
                                                        multiple
                                                        return-object   
                                                        label="Policia que lo detuvo:"                                                   
                                                        v-if="impuDetenido && agregarPoli == false"
                                                        v-validate="'required'"
                                                        :error-messages="errors.collect('policia que lo detuvo')">
                                                    </v-autocomplete>
                                                    
                                                    <v-switch
                                                        v-if="impuDetenido && (!policiaDetuvo || Object.keys(policiaDetuvo).length === 0)" 
                                                        v-model="agregarPoli"  
                                                        :label="'Deseas agregar un policia'"  
                                                        color="success"  
                                                        hide-details>
                                                    </v-switch>
    
                                                </v-flex>
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                            <v-flex  xs12 md6 lg6>
    
                                                    <v-autocomplete
                                                        name="entidad federativa"
                                                        :items="estados"
                                                        v-model="abreviacion"
                                                        label="Entidad federativa de nacimiento:"
                                                        return-object
                                                        v-if="switch2==false"  >
                                                    </v-autocomplete>
    
                                                    <v-autocomplete name="documento de identificación"
                                                            :items="docsidentificaciones"
                                                            v-model="docidentificacion"
                                                            label="Documento de identificación:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
    
                                                <br/>
                                                    <v-toolbar color="primary" v-if="!switch2" dark>
                                                        <v-toolbar-title>Documento escaneado</v-toolbar-title>
                                                        <v-spacer></v-spacer>
    
                                                        <v-dialog  v-model="dialog"  max-width="500px">
                                                            <v-btn slot="activator" icon>
                                                            <v-icon>camera</v-icon>
                                                            </v-btn>
    
                                                            <v-card>
                                                                <v-toolbar card dark color="grey lighten-4 primary--text">
                                                                    <v-avatar  size="30">
                                                                        <v-icon class="grey lighten-2">camera</v-icon>
                                                                    </v-avatar>
                                                                <v-toolbar-title class="subheading">Escanear documento</v-toolbar-title>
                                                                <v-spacer></v-spacer>
                                                                </v-toolbar>
                                                            <v-card-text>
                                                                <v-form ref="form">
                                                                    <v-card-actions>
                                                                        <v-layout row wrap>
                                                                            <vue-web-cam ref="webcam"
                                                                                            :device-id="deviceId"   height="400px"
                                                                                            @started="onStarted"
                                                                                            @stopped="onStopped"
                                                                                            @error="onError"
                                                                                            @cameras="onCameras"
                                                                                            @camera-change="onCameraChange" />
                                                                            <v-flex xs12 sm6 md3 order-md4 order-sm2 >
                                                                                <v-card  tile flat  >
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small color="info" @click="onClose">
                                                                                        <v-icon >close</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                                </v-card>
                                                                            </v-flex>
                                                                            <v-flex xs12 sm6 md3 order-md3 order-sm1>
                                                                                <v-card  tile flat  >
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small color="info"  @click="onCapture">
                                                                                        <v-icon  >photo_camera</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                                </v-card>
                                                                            </v-flex>
                                                                            <v-flex xs12 sm6 md3 order-md2 order-sm4>
                                                                                <v-card   tile flat  >
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small  color="info" @click="onStop">
                                                                                        <v-icon  >stop</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                                </v-card>
                                                                            </v-flex>
                                                                            <v-flex xs12 sm6 md3 order-md1 order-sm3>
                                                                            <v-card  tile flat  >
                                                                                <v-card-text class="text-md-center" >
                                                                                    <v-btn fab  small color="info" @click="onStart">
                                                                                        <v-icon >play_arrow</v-icon>
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
                                                                <img   :src="imageUrl"  height="150px" style="max-width: 100%;" v-if="imageUrl"/>
                                                            </v-flex>
                                                        </v-layout>
                                                        </v-container>
                                                    </v-card>
                                                    <v-text-field label="Selecciona la imagen del documento de identificacion" @click='pickFile' v-if="switch2==false"  v-model='imageName' prepend-icon='attach_file'></v-text-field>
    
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
                                                        :error-messages="errors.collect('documento que acredita su personalidad')">
                                                    </v-autocomplete>
    
                                                    <v-text-field name="curp" v-if="!switch2" v-model="curp"   label="CURP:" ></v-text-field>
    
                                                    <v-switch name="afrodecendiente" v-model="poblacionafro"   label="¿Pertenece a una poblacion afrodescendiente?:" v-if="switch2==false" color="success"  hide-details></v-switch>
    
                                                </v-flex>
    
    
    
                                            </v-layout>
                                            <v-spacer></v-spacer>
                                            <div class="text-xs-right">
                                                <v-btn color="primary" v-if="!switch2" @click.native="step = 2">Continuar</v-btn>
                                            </div>
                                        </v-container>
    
                                    </v-card>
    
    
                                </v-stepper-content>
                                <v-stepper-step :complete="step > 2" step="2"  v-if="!switch2" editable >
                                    Información complementaria
                                </v-stepper-step>
                                <v-stepper-content step="2" v-if="!switch2">
                                    <v-card color="grey lighten-5" elevation=0 class="mb-5" style="height: 800px;">
                                        <v-container grid-list-lg>
                                            <v-layout wrap justify-space-between>
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
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
                                                    <v-text-field label="Teléfono móvil:" v-if="switch2==false" v-model="telefono1"></v-text-field>
                                                    <v-text-field label="Teléfono fijo:" v-if="switch2==false" v-model="telefono2"></v-text-field>
                                                    <v-text-field label="Correo electrónico:" v-if="switch2==false" v-model="correo"></v-text-field>
                                                    <v-autocomplete name="nacionalidad"
                                                            :items="nacionalidades"
                                                            v-model="nacionalidad"
                                                            label="Nacionalidad:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
                                                    <v-autocomplete name="estado familiar"
                                                            :items="estadosciviles"
                                                            v-model="estadocivil"
                                                            label="Estado familiar:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
                                                </v-flex>
    
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                            <v-flex  xs12 md6 lg6>
    
                                                    <v-autocomplete name="ocupación"
                                                            :items="ocupaciones"
                                                            v-model="ocupacion"
                                                            label="Ocupación:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
                                                    <v-autocomplete name="nivel de estudios"
                                                            :items="nivelestudios"
                                                            v-model="nivelestudio"
                                                            label="Nivel de estudios:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
                                                    <v-autocomplete name="lengua"
                                                            :items="lenguas"
                                                            v-model="lengua"
                                                            label="Lengua:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
                                                    <v-autocomplete name="religión"
                                                            :items="religiones"
                                                            v-model="religion"
                                                            label="Religión:"
                                                            v-if="switch2==false"
                                                    ></v-autocomplete>
    
                                                    <v-autocomplete name="género"
                                                            :items="generos"
                                                            v-model="genero"
                                                            label="Género:"
                                                            v-if="switch2==false && presexuales"
                                                    ></v-autocomplete>
    
                                                    <v-switch
                                                        v-model="presexuales"
                                                        v-if="switch2==false"
                                                        label="¿Pertenece a la comunidad LGBTTTIQA?"
                                                        color="success"
                                                        hide-details></v-switch>
    
                                                    <v-switch v-model="switch1" v-if="switch2==false" label="¿Tiene alguna discapacidad?:" color="success"  hide-details />
    
                                                    <v-text-field v-model="disanterior" disabled v-show="switch1" label="Discapacidad registrada antes de la actualizacion de catalogo" ></v-text-field>
    
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
                                                    ></v-autocomplete>
                                                </v-flex>
                                            </v-layout>
                                            <div class="text-xs-right">
                                                <v-btn flat @click.native="step = 1">Anterior</v-btn>
                                                <v-btn color="primary" :loading="$store.state.loader" :disabled="$store.state.loader"  @click.native="step = 3">Continuar</v-btn>
                                            </div>
                                        </v-container>
                                    </v-card>
                                </v-stepper-content>
                                <v-stepper-step :complete="step > 3"  step="3"  editable :rules="[]" v-if="!switch2">
                                    Dirección personal
                                </v-stepper-step>
                                <v-stepper-content step="3" v-if="!switch2">
                                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                        <v-container grid-list-xl>
                                            <v-layout wrap justify-space-between>
                                                <v-flex  xs12 md5 lg5>
    
    
                                                    <v-text-field label="Calle:"
                                                                name="calle"
                                                                v-model="calle"
                                                                v-if="switch2==false"
                                                                :error-messages="errors.collect('calle')">
                                                    </v-text-field>
    
                                                    <v-text-field name="numero exterior"
                                                                    label="No. exterior:"
                                                                    v-model="noExt"
                                                                    v-if="switch2==false"
                                                                    :error-messages="errors.collect('numero exterior')">
    
                                                    </v-text-field>
                                                    <v-text-field label="No. Interior:" v-if="switch2==false"  v-model="noInt"></v-text-field>
                                                    <v-text-field label="Entre calle 1:" v-if="switch2==false"  v-model="entreCalle1"></v-text-field>
                                                    <v-text-field label="Entre calle 2:" v-if="switch2==false" v-model="entreCalle2"></v-text-field>
                                                    <v-text-field label="Referencia:"  v-if="switch2==false" v-model="referencia"></v-text-field>
                                                </v-flex>
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                                <v-flex  xs12 md6 lg6>
                                                    <v-text-field label="Pais:"
                                                                name="pais"
                                                                v-model="pais"
                                                                v-if="switch2==false"
                                                                value="México">
                                                    </v-text-field>
                                                    <v-autocomplete label="Estado:"
                                                                    name="estado"
                                                                    v-model="estadoid"
                                                                    :items="ciudades"
                                                                    v-if="switch2==false"
                                                                    return-object
                                                                    v-on:change="listarPorEstado"  >
                                                    </v-autocomplete>
    
                                                    <v-autocomplete label="Municipio:"
                                                                    name="municipio"
                                                                    v-model="municipioid"
                                                                    :items="municipios"
                                                                    v-if="switch2==false"
                                                                    return-object
                                                                    v-on:change="listarPorMunicipio">
                                                    </v-autocomplete>
                                                    <v-autocomplete label="Localidad:"
                                                                    name="localidad"
                                                                    v-model="localidadid"
                                                                    :items="localidades"
                                                                    v-if="switch2==false"
                                                                    return-object
                                                                    v-on:change="listarPorLocalidad">
                                                    </v-autocomplete>
                                                    <v-text-field
                                                        label="Código postal:"
                                                        v-if="switch2==false"
                                                        name="cp"
                                                        v-model="cp"
                                                        @keyup.enter="buscarPorCP()"  >
                                                        </v-text-field>
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
                                                    <v-btn block="" v-if="switch2==false"  @click.native="btn_geoloc2" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn>
    
    
    
                                                </v-flex>
    
                                            </v-layout>
                                            <div class="text-xs-right">
                                                <v-btn flat @click.native="step = 2">Anterior</v-btn>
                                                <v-btn color="primary"  @click.native="step = 4"  >Continuar</v-btn>
    
                                            </div>
                                        </v-container>
    
                                    </v-card>
    
                                </v-stepper-content>
                                <v-stepper-step :complete="step > 4"  step="4"  editable :rules="[]" v-if="!switch2">
                                    Dirección de notificación
                                </v-stepper-step>
                                <v-stepper-content step="4" v-if="!switch2">
                                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                        <v-container grid-list-xl>
                                            <v-layout wrap justify-space-between>
                                                <v-flex  xs12 md5 lg5>
    
                                                    <v-switch v-model="duplicarDireccion" @change="dupdiresc()" label="¿La dirección de notificación es la misma que la dirección personal?:" color="success"  hide-details></v-switch>
                                                    <v-text-field label="Calle:"
                                                                name="calle"
                                                                v-model="de_calle"
                                                                v-if="switch2==false"
                                                                :error-messages="errors.collect('calle')">
                                                    </v-text-field>
                                                    <v-text-field name="numero exterior"
                                                                    label="No. exterior:"
                                                                    v-model="de_noExt"
                                                                    v-if="switch2==false"
                                                                    :error-messages="errors.collect('numero exterior')">
    
                                                    </v-text-field>
                                                    <v-text-field label="No. Interior:" v-if="switch2==false"  v-model="de_noInt"></v-text-field>
                                                    <v-text-field label="Entre calle 1:" v-if="switch2==false"  v-model="de_entreCalle1"></v-text-field>
                                                    <v-text-field label="Entre calle 2:" v-if="switch2==false" v-model="de_entreCalle2"></v-text-field>
                                                    <v-text-field label="Referencia:"  v-if="switch2==false" v-model="de_referencia"></v-text-field>
                                                </v-flex>
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                                <v-flex  xs12 md6 lg6>
                                                    <v-text-field label="Pais:"
                                                                name="pais"
                                                                v-model="de_pais"
                                                                v-if="switch2==false"
                                                                value="México">
                                                    </v-text-field>
                                                    <v-autocomplete label="Estado:"
                                                                    name="estado"
                                                                    v-model="de_estadoid"
                                                                    :items="de_ciudades"
                                                                    v-if="switch2==false"
                                                                    return-object
                                                                    v-on:change="de_listarPorEstado"  >
                                                    </v-autocomplete>
    
                                                    <v-autocomplete label="Municipio:"
                                                                    name="municipio"
                                                                    v-model="de_municipioid"
                                                                    :items="de_municipios"
                                                                    v-if="switch2==false"
                                                                    return-object
                                                                    v-on:change="de_listarPorMunicipio">
                                                    </v-autocomplete>
                                                    <v-autocomplete label="Localidad:"
                                                                    name="localidad"
                                                                    v-model="de_localidadid"
                                                                    :items="de_localidades"
                                                                    v-if="switch2==false"
                                                                    return-object
                                                                    v-on:change="de_listarPorLocalidad">
                                                    </v-autocomplete>
                                                    <v-text-field
                                                        label="Código postal:"
                                                        v-if="switch2==false"
                                                        name="cp"
                                                        v-model="de_cp"
                                                        @keyup.enter="buscarPorCP()"  >
                                                        </v-text-field>
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
                                                    <v-btn block="" v-if="switch2==false"  @click.native="btn_geoloc01" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn>
                                                </v-flex>
    
                                            </v-layout>
                                            <div class="text-xs-right">
                                                <v-btn flat @click.native="step = 3">Anterior</v-btn>
    
    
                                            </div>
                                        </v-container>
    
                                    </v-card>
    
                                </v-stepper-content>
                                <v-stepper-step :complete="step > 5"  step="5"  editable :rules="[]" v-if="agregarPoli==true">
                                    Agregar Policia
                                </v-stepper-step>
                                <v-stepper-content step="5">
                                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                        <v-container grid-list-xl>
                                            <v-layout wrap justify-space-between>
                                                <v-flex  xs12 md5 lg5>
                                                    
                                                    <v-text-field 
                                            name="Nombre de policia" 
                                            label="*Nombre(s):" 
                                            v-model="nombrep"   
                                            v-validate="'required'"
                                            v-if="agregarPoli==true"
                                            :error-messages="errors.collect('Nombre de policia')">                                  
                                        </v-text-field>
    
                                        <v-text-field 
                                            name="apellido paterno del policia" 
                                            label="*Apellido paterno:" 
                                            v-model="apaternop" 
                                            v-validate="'required'"
                                            v-if="agregarPoli==true"
                                            :error-messages="errors.collect('apellido paterno del policia')">                    
                                        </v-text-field>
    
                                    </v-flex> 
    
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6  >
    
                                        <v-text-field 
                                            name="apellido materno del policia" 
                                            label="*Apellido materno:" 
                                            v-model="amaternop"
                                            v-validate="'required'"
                                            v-if="agregarPoli==true"
                                            :error-messages="errors.collect('apellido materno del policia')">                      
                                        </v-text-field>
    
                                        <v-select 
                                            name="institucíon"  
                                            :items="instituciones"
                                            v-model="institucion" 
                                            v-validate="'required'" 
                                            label="*Institución:"
                                            v-if="agregarPoli==true"
                                            :error-messages="errors.collect('institucíon')">
                                        </v-select>
    
                                    </v-flex>
    
                                    <v-flex class="espaciado" xs12 sm12 md12 lg12  >
                                        <v-text-field 
                                            name="informe policial" 
                                            label="*Informe policial:" 
                                            v-model="informep"
                                            v-validate="'required'"
                                            v-if="agregarPoli==true"
                                            :error-messages="errors.collect('informe policial')">                      
                                        </v-text-field>
                                                    
                                                </v-flex>
    
                                            </v-layout>
                                            <div class="text-xs-right">
    
                                            </div>
                                        </v-container>
    
                                    </v-card>
    
                                </v-stepper-content>
                                </v-stepper>
                </v-card>
            </v-dialog>
    
    
             <v-dialog v-model="modalduplicidad" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
    
                    <v-toolbar-title>Información  general de los registros que ha tenido la persona.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
    
                      <v-btn icon   @click="cerrarModalDuplicidad()">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="headersDuplicidad"
                            :items="hechos"
                            :search="search"
                            :rows-per-page-items="rowsPerPageItems"
                            :pagination.sync="pagination"
                            >
                            <template slot="items" class="white" slot-scope="props">
                            <td>{{ props.item.registradoPor }}</td>
                            <td>{{ props.item.distritoInicial }}</td>
                            <td>{{ props.item.dirSubProcuInicial}}</td>
                            <td>{{ props.item.agenciaInicial}}</td>
                            <td>{{ props.item.fechaHoraRegistro }}</td>
                            <td>{{ props.item.clasificacionPersona }}</td>
                            <td>{{ props.item.rac }}</td>
                            <td>{{ props.item.nuc }}</td>
    
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
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        <v-btn  color=success text @click.native="guardarGeolocalizacion()">
                        GUARDAR</v-btn>
                        <v-btn icon   @click="modalGeolocalizacion = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
    
                    <v-divider></v-divider>
    
                        <v-card    elevation=0 class="mb-5" height="auto">
                            <v-container grid-list-sm    >
                                <v-layout row wrap justify-center>
                                    <v-flex  xs12 md12 lg12>
                                            <gmap-autocomplete  style="width:50%;
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
                                            @place_changed="setPlace"  >
                                            </gmap-autocomplete>
    
                            <v-btn  outline color="primary" @click="addMarker">    BUSCAR</v-btn>
    
                        <br>
                                <gmap-map
                                :center="center"
                                :zoom="17"
                                style="width:100%;  height: 700px;"
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
                                ></gmap-marker>
                                </gmap-map>
                                    </v-flex>
                                </v-layout>
    
                            </v-container>
                        </v-card>
    
    
                </v-card>
            </v-dialog>
    
             <v-dialog v-model="modalGeolocalizacion01" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
    
                        <v-toolbar-title>Geolocalización.</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        <v-btn  color=success text @click.native="guardarGeolocalizacion01()">
                        GUARDAR</v-btn>
                        <v-btn icon   @click="modalGeolocalizacion01 = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
    
                    <v-divider></v-divider>
    
                        <v-card    elevation=0 class="mb-5" height="auto">
                            <v-container grid-list-sm    >
                                <v-layout row wrap justify-center>
                                    <v-flex  xs12 md12 lg12>
                                            <gmap-autocomplete  style="width:50%;
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
                                            id="mapa01"
                                            @place_changed="setPlace01"  >
                                            </gmap-autocomplete>
    
                            <v-btn  outline color="primary" @click="addMarker01">    BUSCAR</v-btn>
    
                        <br>
                                <gmap-map
                                :center="center01"
                                :zoom="17"
                                style="width:100%;  height: 700px;"
                                >
                                <gmap-marker
                                    :key="index"
                                    v-for="(m, index) in markers01"
                                    :position="m.position"
                                    @click="center01=m.position"
                                    :clickable="true"
                                    :draggable="true"
                                    @drag="updateCoordinates01"
                                    @dragend="updatecenter01"
                                ></gmap-marker>
                                </gmap-map>
                                    </v-flex>
                                </v-layout>
    
                            </v-container>
                        </v-card>
    
    
                </v-card>
            </v-dialog>
    
    
    
            <v-dialog v-model="modalGeolocalizacion2" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <v-card >
                            <v-toolbar bottom collapse dark color="primary">
    
                                <v-toolbar-title>Geolocalización.</v-toolbar-title>
                                <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="aumentarzoorm()" left fab dark small color="success">
                                                    <v-icon>add</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Aumentar zoom</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="disminuirzoom()" left fab dark small color="success">
                                                    <v-icon>remove</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Disminuir zoom</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="activarterreno()" left fab dark small color="success">
                                                    <v-icon>view_quilt</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Vista area</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="activarsatellite()" left fab dark small color="success">
                                                    <v-icon>terrain</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Satelite</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="imprim1()" left fab dark small color="success">
                                                    <v-icon>print</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Imprimir mapa</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="modalGeolocalizacion2=false" left fab dark small color="success">
                                                    <v-icon>close</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Cerrar</span>
                                        </v-tooltip>
    
                                    </v-toolbar-items>
                            </v-toolbar>
    
                                <v-divider></v-divider>
    
                                <v-card    elevation=0  height="auto">
    
                                    <gmap-map
                                    id="mapa"
                                    :center="center2"
                                    :zoom="zoom"
                                    style=" width:100%;  height: 800px;"
                                    :options="opcionesmapa"
                                    :StreetViewPanoramaOptions ="{
                                        showRoadLabels:true
                                    }"
                                    >
                                    <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mx-1" slot="activator" v-on="on" @click="modalGeolocalizacion2=false" left fab dark small color="success">
                                                    <v-icon>close</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Cerrar</span>
                                        </v-tooltip>
                                    <gmap-marker
                                        :key="index"
                                        v-for="(m, index) in markers2"
                                        :position="m.position"
                                        @click="center=m.position"
                                        :clickable="false"
                                        :draggable="false"
                                    ></gmap-marker>
    
                                    </gmap-map>
    
                                </v-card>
                        </v-card>
            </v-dialog>
    
            <v-dialog  v-model="dialogoactualizar"  max-width="700px" >
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">info</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Actualizar clasificacion de {{nombrep}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            <v-container grid-list-md text-xs-center>
                                <v-layout wrap>
                                    <v-flex  xs12 md12 lg12>
    
                                        <v-autocomplete
                                            name="clasificacion de persona"
                                            :items="clasificacionpersonas"
                                            v-model="clasificacionpersona"
                                            return-object
                                            label="Clasificación de persona:">
                                        </v-autocomplete>

                                        <v-autocomplete name="Persona Desaparecida"
                                            :items="tDesaparecidos"
                                            v-model="registro"
                                            v-validate="requeridoPD"
                                            v-show="clasificacionpersona.value == 'Victima directa' || clasificacionpersona == 'Victima directa'"
                                            label="*¿Es un tema de personas desaparecidas?:"
                                            :error-messages="errors.collect('Persona Desaparecida')">
                                        </v-autocomplete>
                                    </v-flex>
    
                                </v-layout>
                            </v-container>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  @click.native="dialogoactualizar=false" >Cerrar</v-btn>
                                <v-btn color="success"  @click.native="actualizarclasiapi" >Guardar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
    
            <v-dialog  v-model="dialogoinformacionadicional"  max-width="1000px" >
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">queue</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Actualizar/agregar información adicional de persona detenida {{nombrep}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >
    
                                        <v-autocomplete
                                            name="la detención cumple requisitos de ley?"
                                            :items="opcionesinfoadicional"
                                            v-model="cumplerequisitosley"
                                            label="La detención cumple requisitos de ley?">
                                        </v-autocomplete>
    
                                        <v-autocomplete
                                            name="se decreto libertad durante la investigación?"
                                            :items="opcionesinfoadicional"
                                            v-model="decretolibertad"
                                            v-if="cumplerequisitosley == 'Si'"
                                            label="Se decreto libertad durante la investigación?">
                                        </v-autocomplete>
    
                                        <v-autocomplete
                                            name="se dispuso su libertad?"
                                            :items="opcionesinfoadicional"
                                            v-model="dispusolibertad"
                                            v-if="cumplerequisitosley == 'No'"
                                            label="Se dispuso su libertad?">
                                        </v-autocomplete>
    
                                    </v-flex>
    
    
                                </v-layout>
                            </v-container>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  @click.native="dialogoinformacionadicional=false" >Cerrar</v-btn>
                                <v-btn color="success"  @click ="actualizarinfoadicional()" >Guardar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
    
            <v-dialog  v-model="dialogoinformacion"  max-width="1000px" >
    
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">info</v-icon>
                        </v-avatar>
    
                        <v-toolbar-title class="subheading">Información detallada</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-btn @click.native="dialogoinformacion=false" >Cerrar</v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-stepper elevation-0 v-model="step" non-linear vertical>
                            <v-stepper-step :complete="step > 1" editable step="1"   >
                                Datos de la persona.
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <v-form ref="form" >
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout wrap>
                                            <v-flex  xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nombre:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.nombre }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Clasificación de persona:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.clasificacionPersona  }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Sexo:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.sexo }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Apellido paterno:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.apellidoPaterno }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Alias:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.alias }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entidad federativa de nacimiento:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.entidadFederativa }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Apellido materno:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.apellidoMaterno }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de nacimiento:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.fechaNacimiento }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>CURP:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.curp }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-form>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 2" editable step="2"   >
                                Documento de identificación
                            </v-stepper-step>
                            <v-stepper-content step="2">
                                <v-form ref="form" >
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout wrap>
                                            <v-flex   xs12 sm12 md12 lg12 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list three-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">subject</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-4 font-weight-bold"><a>Documento de identificación:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ tdocumento }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card-text>
                                                </v-card>
                                                <v-img
                                                    v-if="rutaconsulta"
                                                    :src="rutaconsulta"
                                                    aspect-ratio="1"
                                                    class="black"
                                                    contain
                                                    max-height="1000"
                                                ></v-img>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-form>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 3" editable step="3"   >
                                Información complementaria
                            </v-stepper-step>
                            <v-stepper-content step="3">
                                <v-form ref="form" >
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout wrap>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Medio de notificación:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.medionotificacion }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Género:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.genero }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Ocupación:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.ocupacion }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Religión:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.religion }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile v-if="datospersona.discapacidad">
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tipo de discapacidad:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.tipoDiscapacidad }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Teléfono 1:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.telefono1 }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Alias:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.telefono2 }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nivel de estudios:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.nivelEstudio }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estado familiar:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.estadoCivil }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Correo electronico:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.apellidoMaterno }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Lengua:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.lengua }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nacionalidad:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.nacionalidad }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>¿Tiene alguna discapacidad ?:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.discapacidad ? "Si" : "No" }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-form>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 4" editable step="4"   >
                                Dirección personal
                            </v-stepper-step>
                            <v-stepper-content step="4">
                                <v-form ref="form" >
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout wrap>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Calle:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.calle }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Exterior:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.noext }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Interior:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.noint }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Código postal:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.cp }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Pais:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.pais }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estado:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.estado }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Municipio:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.municipio }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Localidad:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.localidad }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 1:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.entrecalle1 }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 2:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.entrecalle2 }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Referencia:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.referencia }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
    
                                </v-form>
    
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 5" editable step="5"   >
                                Dirección de notifación
                            </v-stepper-step>
                            <v-stepper-content step="5">
                                <v-form ref="form" >
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout wrap>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Calle:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.calle }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Exterior:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.noext }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Interior:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.noint }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Código postal:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.cp }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Pais:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.pais }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estado:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.estado }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Municipio:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.municipio }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Localidad:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.localidad }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex   xs6 sm6 md4 lg4 >
                                                <v-card    auto-grow elevation="0">
                                                    <v-card-text >
                                                        <v-list one-line   >
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 1:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.entrecalle1 }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 2:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.entrecalle2 }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="success">view_day</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content   >
                                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Referencia:</a></p> </v-list-tile-title>
                                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.referencia }}</a></p>  </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-form>
                            </v-stepper-content>
                        </v-stepper>
                    </v-card-text>
                </v-card>
    
            </v-dialog>
    
    
        </v-flex>
    </v-layout>
    </template>
    
    
    <script>
      import axios from 'axios'
      import VeeValidate from 'vee-validate'
      import { WebCam } from "vue-web-cam";
      import n401 from './401.vue'
      import n403 from './403.vue'
      import { error, isNull } from 'util';
      import moment from 'moment'
      import 'moment/locale/es';
      import alertify from 'alertifyjs';
    
      var assert, curp, persona;
      assert = require('assert');
      curp = require('curp.js');
    
      export default {
        components: {
          "vue-web-cam": WebCam
        },
        data: () => ({
            components: {
                n401,
                n403
            },
            showpage:true,
            e401:false,
            e403:false,
            modalduplicidad:false,
            idPersona:0,
            iniciales: '',
            hechos:[],
            headersDuplicidad: [
                { text: 'Atendio', value: 'registradoPor' },
                { text: 'Distrito', value: 'distritoInicial' },
                { text: 'Dirección o Subprocuraduria', value: 'dirSubProcuInicial' },
                { text: 'Agencia', value: 'agenciaInicial' },
                { text: 'Fecha de registro', value: 'fechaHoraRegistro',  },
                { text: 'Clasificación persona', value: 'clasificacionPersona',  },
                { text: 'RAC', value: 'rac',  },
                { text: 'NUC', value: 'nuc',  },
            ],
    
            dialog: false,
            verTP:0,
            rapid:'',
            rAtencionId:'',
            rHechoId:'',
            nuc:'',
            //*************** */
            raps:[],
            step: 1,
            //*************** */
            headers: [
                { text: 'PRCD', value: 'inicioDetenido', sortable: false },
                { text: 'Clasificación', value: 'clasificacion' },
                { text: 'Tipo', value: 'tipo' },
                { text: 'CURP', value: 'curp'},
                { text: 'Nombre', value: 'nombre' },
                { text: 'Medio de notificación', value: 'medio de notificacion' },
                { text: 'Correo electronico', value: 'correo electronico', sortable: false },
                { text: 'Telefonos', value: 'telefonos', sortable: false },
                { text: 'Opciones', value: 'opciones', sortable: false },
            ],
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 20
            },
            editedIndex: -1,
            modalAdd:0,
            geoloc:0,
            modalGeolocalizacion:0,
            modalGeolocalizacion01:0,
            //****************************** */
            center: { lat: 45.508, lng: -73.587 },
            center01: { lat: 45.508, lng: -73.587 },
            markers: [],
            places: [],
            currentPlace: null,
            markers01: [],
            places01: [],
            currentPlace01: null,
            //****************************** */
            step:1,
            //********************************/
            //CAPTURA DE DATOS
            idPersona:'',
            radios: 'Fisica',
            rfc:'',
            razonsocial:'',
            clasificacionpersona:'',
            clasificacionpersonas:[],
    
            docidentificacion:'',
            docsidentificaciones:[],
    
            sexo:'',
            rangoedad:'',
            sexos:[],
            policias:[],
            rangosedad:[],
    
            entidadFederativa:'',
            abreviacion:'',
            estados:[],
    
            //img: null,
            camera: null,
            deviceId: null,
            devices: [],
    
            imageName: '',
            imageUrl: null,
            imageFile: '',
            //DATOS PARA LA GENERACION DEL CURP
            nombres:'',
            apaterno:'',
            amaterno:'',
            alias:'',
            fnacimiento:'',
            RangoEdadTF:false,
            curp:'',
            //INFORMACION COMPLEMENTARIA
            medionotificacion:'',
            medionotificaciones:[],
    
            telefono1:'',
            telefono2:'',
            correo:'',
    
            nacionalidad:'Mexicana',
            nacionalidades:[],
    
            estadocivil:'',
            estadosciviles:[],
    
            genero:'',
            generos:[],
            registro: [],
            verR: false,
            verI: false,
            ocupacion:'',
            ocupaciones:[],
    
            nivelestudio:'',
            nivelestudios:[],
    
            lengua:'',
            lenguas:[],
    
            religion:'',
            religiones:[],
    
            switch1: false,
            switch2: false,
    
            //Variables de policia
            ratencioncontrol:'',
            nombrep:'',
            amaternop:'',
            apaternop:'',
            instituciones:[],
            institucion:'',
            informep:'',
            //--------------------
            discapacidad:'',
            disanterior:'',
            discapaciodades:[],
            presexuales:false,
    
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
            ],
            relacionado:'',
            relacion:false,
            //VARIABLES PARA LOS POLICIAS
            impuDetenido:false,
            agregarPoli:false,
            policiaDetuvo:'',
            poblacionafro:false,
            edadf:'',
           dialogoinformacion: false,
            // DIRECCION PERSONAL
            calle:'',
            noExt:'',
            noInt:'',
            entreCalle1:'',
            entreCalle2:'',
            referencia:'',
            pais:'Mexico',
    
            estado:'',
            estadoid:0,
            ciudades:[],
    
            municipio:'',
            municipioid:0,
            municipios:[],
    
    
            localidad:'',
            localidadid:0,
            localidades:[],
    
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
            //************************************** */
            message: 'no message',
            first_request: 'no request',
            second_request: 'no request',
            rac:'',
            datosprotegidos:false,
            ruta:'',
            documentoacreditas:[
                {text:"Nombramiento",value:"Nombramiento"},
                {text:"Poder notarial",value:"Poder notarial"},
                {text:"Instrumento notarial",value:"Instrumento notarial"}
            ],
            documentoacredita:'',
            dialogoinformacionadicional:false,
            cumplerequisitosley:'',
            decretolibertad:'',
            dispusolibertad:'',
            opcionesinfoadicional:[
                {text:"Si",value:"Si"},
                {text:"No",value:"No"},
            ],
            idpersona:'',
            //-----CLAIM------------------------------------------
            u_iddistrito:'',
            u_distrito:'',
            u_dirSubPro:'',
            u_idagencia:'',
            u_agencia:'',
            u_idmoduloservicio:'',
            u_modulo:'',
            u_idusuario:'',
            u_nombre:'',
            u_clave:'',
            u_rol:'',
            u_puesto:'',
            u_subproc:'',
            //----------------------------------------------------
            lat2:'',
            lng2:'',
            center2: { lat: 45.508, lng: -73.587},
            markers2: [],
            places2: [],
            currentPlace2: null,
            geoloc2:0,
            modalGeolocalizacion2:0,
            de_lat2:'',
            de_lng2:'',
            opcionesmapa:{
                zoomControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false,
                noClear:false,
                panControl:false,
                disableDefaultUI:false,
                disableDoubleClickZoom:false,
                draggable:false,
                keyboardShortcuts:false,
                mapTypeControl:false,
                noClear:false,
                panControl:false,
                rotateControl:false,
                scrollwheel:false,
                streetViewControl:false,
                clickableIcons:false,
                mapTypeId: 'roadmap',
            },
            zoom:17,
    
            //-------------------------
    
            estado:'',
            estadoid:0,
            ciudades:[],
    
            calle:'',
    
            municipio:'',
            municipioid:0,
            municipios:[],
    
            localidad:'',
            localidadid:0,
            localidades:[],
    
            lataux:'',
            lngaux:'',
            lataux01:'',
            lngaux01:'',
    
            //-------------------------
            GUID:'',
            statusActualizar:false,
            dialogoactualizar:false,
            nombrep:'',
            idrapac:'',
            datospersona:[],
            infodp:[],
            infode:[],
            rutaconsulta:'',
            tdocumento:'',
    
            sindocumento :false,
            idDoccumentoPersona:0,
            tDesaparecidos: [
            {text:"Si",value:true},
            {text:"No",value:false},
            ],
            requeridoPD: '',
            requiredRZ: '',
            personaid: ''
        }),
    
        created () {
                let me = this
                me.rHechoId=  me.$store.state.rhechoid;
                me.rAtencionId = me.$store.state.ratencionid
                me.nuc = me.$store.state.nuc;
                if (me.rHechoId== null)
                {
                        me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.',
                        function(){
    
                                me.$router.push('./umixta-carpetas')
                        })
                }
                else{
                        me.$notify('Carpeta abierta correctamente !!!','success')
                        me.listarrap();
    
                        me.u_iddistrito=me.$store.state.usuario.iddistrito;
                        me.u_distrito=me.$store.state.usuario.distrito;
                        me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
                        me.u_idagencia=me.$store.state.usuario.idagencia;
                        me.u_agencia=me.$store.state.usuario.agencia;
                        me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
                        me.u_modulo=me.$store.state.usuario.modulo;
                        me.u_idusuario=me.$store.state.usuario.idusuario;
                        me.u_nombre=me.$store.state.usuario.usuario;
                        me.u_clave=me.$store.state.usuario.clave;
                        me.u_rol=me.$store.state.usuario.rol;
                        me.u_puesto=me.$store.state.usuario.puesto;
                        me.u_subproc=me.$store.state.usuario.subProc;
                        // DATOS GENERALES
                        me.listarTipoPersona();
                        me.listarSexo();
                        me.listarPolicias();
                        me.listarRangoEdad();
                        me.listarIdentificacion();
                        me.listarEstados();
                        // INFORMACION COMPLEMENTARIA
                        me.listarMedionotificacion();
                        me.listarNacionalidad();
                        me.listarEstadoCivil();
                        me.listarGenero();
                        me.listarOcupacion();
                        me.listarNivelEstudio();
                        me.listarLengua();
                        me.listarReligion();
                        me.listarDiscapacidad();
                        // DIRECCION PERSONAL
                        me.listarCiudades();
                        // DIRECCION ESCUCHA
                        me.de_listarCiudades();
                        me.listarInstituciones();
    
                }
    
    
           // Add a request interceptor
            axios.interceptors.request.use( (config)=> {
              // Do something before request is sent
              this.$store.commit('LOADER',true);
              return config;
            }, (error)=> {
              // Do something with request error
              this.$store.commit('LOADER',false);
              return Promise.reject(error);
            });
    
              // Add a response interceptor
              axios.interceptors.response.use((response)=>{
              this.$store.commit('LOADER',false);
              // Do something with response data
              return response;
            },  (error)=> {
    
         // Do something with request error
              this.$store.commit('LOADER',false);
              return Promise.reject(error);
            });
    
    
        },//v-validate="'date_format:dd/MM/yyyy'"
        computed: {
            formTitle () {
                    return this.editedIndex === -1 ? 'Registrar a una nueva persona' : 'Actualizar informacion de la persona'
            },
            isInput3Required() {
                return (this.nombres !== this.alias || this.datosprotegidos === false || this.amaterno !== '' )
            },
            
            isInput3RequiredD() {
                return ((this.nombres !== this.alias && this.datosprotegidos !== false) || (this.datosprotegidos !== false && this.apaterno !== '' ) ||
                        (this.rangoedad === 'INFANCIA (0 A 5 AÑOS)' && this.datosprotegidos === false) || (this.rangoedad === 'NIÑEZ (6 A 12 AÑOS)' && this.datosprotegidos === false) ||
                        (this.rangoedad === 'ADOLECENCIA (13 A 17 AÑOS)' && this.datosprotegidos === false))
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
            device: function() {
                return this.devices.find(n => n.deviceId === this.deviceId);
                }
            },
        watch: {
            camera: function(id) {
            this.deviceId = id;
            },
            nombres: function(val) {
                this.obtenerIniciales();
                },
            apaterno: function(val) {
                this.obtenerIniciales();
                },
            amaterno: function(val) {
                this.obtenerIniciales();
                },
            datosprotegidos:  function(val) {
                if(val && this.alias === ''){
                    this.obtenerIniciales();
                }
            },
            impuDetenido(newValue) {
                if (!newValue) {
                this.policiaDetuvo = null;
                this.agregarPoli = false;
          }
        },
        clasificacionpersona(val){
            if(val === 'Victima directa' && this.radios === 'Fisica' && !this.switch2){
                this.requeridoPD = 'required';
                
            }else if(val !== 'Victima directa'){
                this.requeridoPD = '';
                this.registro = false;
                this.verI = false;
                this.verR = false;

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
            devices: function() {
            // Once we have a list select the first one
                const [first, ...tail] = this.devices;
                if (first) {
                    this.camera = first.deviceId;
                    this.deviceId = first.deviceId;
                }
            },
        RangoEdadTF(val){
            if(!val){
                this.fnacimiento = '';
                this.$nextTick(() => {
                    this.rangoedad = ''; // Se limpia después de que Vue actualice la interfaz
                  });
            }
        },
        relacion(val){
            if(!val){
                this.relacionado = '';
            }
        },
        switch1(val){
            if(val){
                this.discapacidad = '';
            }
        },
        switch2(val){
            if(!val){
                this.radios = 'Fisica'
                this.limpiar();
            }
        },
        presexuales(val){
            if(!val){
                this.genero = '';
            }
        }
        },
        methods:{
            cerrarcarpeta () {
                this.$store.state.rHechoId= null;
                this.$store.state.nuc= null;
                this.$router.push('./umixta-carpetas')
            },
            obtenerIniciales() {
    
                const palabrasNombre = this.nombres.split(' ');
                const inicialesNombre = palabrasNombre.map(palabra => palabra.charAt(0).toUpperCase()).join('.');
                const inicialesApellidop = this.apaterno.charAt(0).toUpperCase();
                const inicialesApellidom = this.amaterno.charAt(0).toUpperCase();
    
                if(this.datosprotegidos ){
                    if(this.nombres != this.alias)
                    {
                        this.alias = ((inicialesNombre != '' ? inicialesNombre + ".":'') + (inicialesApellidop != '' ? inicialesApellidop + ".":'') + (inicialesApellidom != '' ? inicialesApellidom + ".":''));
                    }
                    
                }
                return this.alias;
                
              },
              
            agregar(){
                this.limpiar();
                this.step = 1;
                this.modalAdd= 1;
                this.editedIndex=-1;
                this.radios = 'Fisica';
            },
            close () {
    
                this.modalAdd = 0;
                this.limpiar();
            },
            editItem (item) {
                let me=this;
                me.step = 1;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
    
                me.policiaDetuvo = []
                me.registro = me.registro.length !== 0? me.registro: false;
    
                this.$cat.get('api/RAPs/listarPoliciasDetuvieron/'+ item.personaId,configuracion).then(function(response){
                    me.policiadetuvoArray=response.data;
    
                    me.policiadetuvoArray.forEach(function(x){
                        me.policiaDetuvo.push({text: x.nombreC,value: x.personaId})
    
                    }) 
    
    
                    me.rapid= item.idRAP;
                    me.idPersona = item.personaId;
                    me.switch2 = item.statusAnonimo;
                    me.radios = item.tipoPersona;
                    if (me.radios =="Fisica"){
                        me.verTP=0;
                    }
                    else{
                    me.verTP=1;
                    }
                    me.datosprotegidos = item.datosProtegidos;
                    me.clasificacionpersona = item.clasificacionPersona;
                    me.rfc = item.rfc;
                    me.razonsocial = item.razonSocial;
                    me.nombres= item.nombre;
                    me.apaterno = item.apellidoPaterno;
                    me.amaterno = item.apellidoMaterno;
                    me.alias = item.alias;
    
                    //ESTAS SECCIONE DE CODIGO ARREGKAN EL FORMATO DE FECHA AL QUE SE USA EN LAS TABLAS
                    //DEBIDO A QUE EL TIPO DE COMPONENTE DE FECHA GUARDA LA FECHA CON - Y NO CON  /
                    const fechaParts = item.fechaNacimiento.split('/');
                    const dia = fechaParts[0];
                    const mes = fechaParts[1];
                    const anio = fechaParts[2];
                    me.fnacimiento = `${anio}-${mes}-${dia}`;
    
                    //----------------------------------------------------------------
                    me.rangoedad = item.rangoEdad;
                    me.RangoEdadTF = item.rangoEdadTF;
                    me.sexo = item.sexo;
                    me.entidadFederativa=item.entidadFederativa;
                    me.selectEFederativa(item.entidadFederativa);
                    me.docidentificacion = item.docIdentificacion;
                    me.curp = item.curp;
                    me.poblacionafro = item.poblacionAfro;
                    me.documentoacredita = item.docPoderNotarial
                    //********************************* */
    
                    var arrayMediosNotifiacion = item.medionotificacion.split(",");
                    me.medionotificacion = arrayMediosNotifiacion;
                    me.telefono1 = item.telefono1;
                    me.telefono2 = item.telefono2;
                    me.correo = item.correo;
                    me.estadocivil = item.estadoCivil;
                    me.genero = item.genero;
                    me.registro = item.registro;
                    me.verR = item.verR;
                    me.verI = item.verI;
                    me.ocupacion = item.ocupacion;
                    me.nivelestudio = item.nivelEstudio;
                    me.lengua = item.lengua;
                    me.religion = item.religion;
                    me.switch1 = item.discapacidad;
                    var arrayDiscapacidades = item.tipoDiscapacidad.split(";");
                    var primerElemento = arrayDiscapacidades[0];
                    me.disanterior = primerElemento;
                    me.presexuales = me.genero? true : false;
    
                    //Listar discapacidades
                    var arrayDiscapacidades = item.tipoDiscapacidad.split(";");
                    me.discapacidad= arrayDiscapacidades;
                    me.relacion = item.relacion,
                    me.relacionado = item.parentesco
                    me.impuDetenido = item.inicioDetenido;
                    me.listarDireccionPersonal();
                    me.listarDireccionEscucha();
                    me.editedIndex=1;
                    me.modalAdd =1;
    
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                }),
                this.$cat.get('api/DocumentosPesonas/Listar/'+ item.personaId,configuracion).then(function(response){
    
    
                        me.imageUrl = response.data.ruta;
                        me.idDoccumentoPersona = response.data.idDocumentoPersona;
                        me.sindocumento=true;
    
                }).catch(error => {
                        me.imageUrl = "";
                        me.idDoccumentoPersona = 0;
                        me.sindocumento=false;
                    if (error.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (error.response.status==403){
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (error.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')
                    }
                });
    
            },
            listarDireccionPersonal(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RAPs/ListarDP/'+ me.idPersona,configuracion).then(function(response){
                    me.calle =response.data.calle;
                    me.noInt= response.data.noint;
                    me.noExt=response.data.noext;
                    me.entreCalle1 = response.data.entrecalle1;
                    me.entreCalle2 = response.data.entrecalle2;
                    me.referencia= response.data.referencia;
                    me.estado = response.data.estado;
                    me.municipio = response.data.municipio;
                    me.localidad = response.data.localidades;
                    me.municipio=response.data.municipio;
                    me.localidad= response.data.localidad;
                    me.pais=response.data.pais;
                    me.cp=response.data.cp;
                    me.lat=response.data.lat;
                    me.lng=response.data.lng;
    
                    me.selectEstado(me.estado);
    
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarDireccionEscucha(){
    
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RAPs/ListarDE/'+ me.rapid,configuracion).then(function(response){
                    me.de_calle =response.data.calle;
                    me.de_noInt= response.data.noint;
                    me.de_noExt=response.data.noext;
                    me.de_entreCalle1 = response.data.entrecalle1;
                    me.de_entreCalle2 = response.data.entrecalle2;
                    me.de_referencia= response.data.referencia;
                    me.de_estado = response.data.estado;
                    me.de_municipio = response.data.municipio;
                    me.de_localidad = response.data.localidades;
                    me.de_municipio=response.data.municipio;
                    me.de_localidad= response.data.localidad;
                    me.de_pais=response.data.pais;
                    me.de_cp=response.data.cp;
                    me.de_lat=response.data.lat;
                    me.de_lng=response.data.lng;
                    me.de_selectEstado(me.de_estado);
    
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            selectEFederativa: function(val) {
    
                for (var i = 0; i < this.estados.length; i++) {
    
                    if (this.estados[i].text === val)
                    {
                            this.abreviacion =  new Object();
                            this.abreviacion.text =this.estados[i].text;
                            this.abreviacion.value = this.estados[i].value;
                    }
                }
            },
    
            infoItem (item) {
    
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.step = 1;
                this.$cat.get('api/RAPs/ListarDP/'+ item.personaId,configuracion).then(function(response){
                    me.infodp = response.data;
    
                    this.$cat.get('api/RAPs/ListarDE/'+ item.idRAP,configuracion).then(function(response){
                            me.infode = response.data;
                        this.$cat.get('api/DocumentosPesonas/Listar2/' +item.personaId,configuracion).then(function(response){
                            me.rutaconsulta = response.data.ruta;
                            me.tdocumento = response.data.tipoDocumento
                            me.datospersona = item;
                            me.dialogoinformacion = true;
                        }).catch(err => {
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar listar los registros!!!','error')
                            }
                        });
                    }).catch(err => {
    
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
                }).catch(err => {
    
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')
                    }
                });
    
            },
            mostrarTP(){
                this.verTP=1;
            },
            ocultarTP (){
                this.verTP=0;
            },
            limpiar(){
                this.statusActualizar=false;
                //************************************************************* */
                //step no 1
                this.switch2= false;
                this.radios= this.radios;;
                this.verTP=0;
                this.rfc="";
                this.razonsocial="";
                this.clasificacionpersona="";
                this.nombres="";
                this.apaterno="";
                this.amaterno="";
                this.fnacimiento="";
                this.rangoedad = '';
                this.sexo="";
                this.abreviacion="";
                this.alias = "";
                this.docidentificacion="";
                this.curp="";
                this.imageName="";
                this.imageFile ="";
                this.imageUrl ="";
                //************************************************************* */
                //step no2
                this.medionotificacion="";
                this.telefono1="";
                this.telefono2="";
                this.correo="";
                this.nacionalidad="Mexicana";
                this.estadocivil="";
                this.genero="";
                this.nivelestudio="";
                this.ocupacion="";
                this.lengua="";
                this.religion="";
                this.switch1= false,
                this.tipoDiscapacidad="";
                this.ruta =''
                this.documentoacredita = ""
                this.presexuales = "";
                //************************************************************* */
                //step no3
                this.calle="";
                this.noInt="";
                this.noExt="";
                this.entreCalle1="";
                this.entreCalle2="";
                this.referencia="";
                this.pais="Mexico";
                this.estadoid=0;
                this.estado="";
                this.municipioid=0;
                this.municipio="";
                this.localidadid=0;
                this.localidad="";
                this.cp="";
                this.lat="";
                this.lng="";
                    //step no4
                this.de_calle="";
                this.de_noInt="";
                this.de_noExt="";
                this.de_entreCalle1="";
                this.de_entreCalle2="";
                this.de_referencia="";
                this.de_pais="Mexico";
                this.de_estadoid=0;
                this.de_estado="";
                this.de_municipioid=0;
                this.de_municipio="";
                this.de_localidadid=0;
                this.de_localidad="";
                this.de_cp="";
                this.de_lat="";
                this.de_lng="";
                this.step=1;
                this.datosprotegidos = false;
                this.poblacionafro = false;
                this.relacion = false;
                this.impuDetenido = false;
                this.agregarPoli = false;
                this.policiaDetuvo = "";
                this.relacionado = "";
                this.edadf = "";
                this.duplicarDireccion = false;
                this.decretolibertad= "";
                this.dispusolibertad = "";
                this.cumplerequisitosley = "";
                this.discapacidad = "";
                this.requeridoPD = "";
                this.requiredRZ = "";
                this.$nextTick(() => {
                    this.registro = false;
                    this.RangoEdadTF = false;
                    this.$validator.reset();
              });       
            },
            generaredad(){
                var date = moment(this.fnacimiento, 'DD/MM/YYYY');
                return moment().diff(date, 'years',false);
            },
            listarrap(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RAPs/ListarTodos/'+ me.rAtencionId,configuracion).then(function(response){
                    me.raps=response.data;
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            // STEP 1 CAPTURA DE DATOS
    
            listarTipoPersona(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var clasificacionpersonaArray=[];
                this.$conf.get('api/ClasificacionPersonas/Listar',configuracion).then(function(response){
                    clasificacionpersonaArray=response.data;
                    clasificacionpersonaArray.map(function(x){
                        me.clasificacionpersonas.push({text: x.nombre,value: x.nombre});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarPolicias(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var policiaArray=[];
                this.$cat.get('api/RAPs/ListarPolicias/'+ me.rAtencionId,configuracion).then(function(response){
                    policiaArray=response.data;
                    policiaArray.map(function(x){
                        me.policias.push({text: x.nombreC,value: x.personaId});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            //ESTA FUNCION LLAMA A LA API PARA LISTAR LOS RANGOS DE EDADES
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            generarcurp(){
    
    
                var str = this.fnacimiento;
                var res = str.split("/");
                var curpstr = curp({
                nombre: this.nombres,
                apellido_paterno: this.apaterno,
                apellido_materno: this.amaterno,
                sexo: this.sexo,
                estado: this.abreviacion.value,
                fecha_nacimiento: res
                });
    
                this.curp = curpstr;
    
    
            },
            validadduplicidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/Personas/BuscarPersona/' +me.curp,configuracion).then(function(response){
    
    
    
                        me.idPersona = response.data.personaId;
                        me.medionotificacion= response.data.medionotificacion;
                        me.telefono1 = response.data.telefono1;
                        me.telefono2= response.data.telefono2;
                        me.correo = response.data.correo;
                        me.nacionalidad= response.data.nacionalidad;
                        me.estadocivil = response.data.estadoCivil;
                        me.genero= response.data.genero;
                        me.ocupacion= response.data.ocupacion;
                        me.nivelestudio= response.data.nivelEstudio;
                        me.lengua= response.data.lengua;
                        me.religion= response.data.religion;
                        me.switch1= response.data.discapacidad;
                        me.discapacidad= response.data.tipoDiscapacidad;
    
                        me.statusActualizar=true;
                        me.listarDireccionPersonal();
                        me.listarRAtencioPersona();
                        me.modalduplicidad=true;
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                });
    
            },
            cerrarModalDuplicidad(){
    
                this.hechos=[];
                this.modalduplicidad= false;
            },
            actualizarclasi(item){
                this.limpiar();
                this.nombrep = item.nombreCompleto
                this.idrapac = item.idRAP
                this.clasificacionpersona = item.clasificacionPersona
                this.dialogoactualizar = true
                this.registro = item.registro
                this.personaid = item.personaId
    
            },
            infoadicionalpdetenida(item){
    
                this.limpiar();
                this.nombrep = item.nombreCompleto
                this.idpersona = item.personaId
                this.cumplerequisitosley = item.cumpleRequisitoLey
                this.decretolibertad = item.decretoLibertad
                this.dispusolibertad = item.dispusoLibertad
                this.dialogoinformacionadicional = true
    
            },
            actualizarclasiapi(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var clasificacionP = !me.clasificacionpersona.value? me.clasificacionpersona: me.clasificacionpersona.value;
                me.registro = me.registro.length !== 0? me.registro: false;
                
                this.$cat.put('api/RAPs/ActualizarClasificacionD',{
    
                    'IdRAP' : me.idrapac,
                    'PersonaId': me.personaid,
                    'ClasificacionPersona' : clasificacionP,
                    'Registro' : me.registro,
                    'VerI': me.verI,
                    'VerR': me.verR
    
                },configuracion).then(function(response){
                    me.$notify('La información se actualizo correctamente !!!','success')
                    me.limpiar();
                    me.dialogoactualizar = false
                    me.listarrap();
                }).catch(err => {
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar actualizar el registro!!!','error')
                    }
                });
            },
            actualizarinfoadicional(){
    
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
    
                this.$cat.put('api/Personas/ActualizarInfoAdicionalDetenido',{
    
                    'PersonaId' : me.idpersona,
                    'CumpleRequisitoLey' : me.cumplerequisitosley,
                    'DecretoLibertad' : me.cumplerequisitosley == "Si" ? me.decretolibertad : "Na",
                    'DispusoLibertad' : me.cumplerequisitosley == "No" ? me.dispusolibertad : "Na",
    
                },configuracion).then(function(response){
                    me.$notify('La información se actualizo correctamente !!!','success')
                    me.limpiar();
                    me.dialogoinformacionadicional = false
                    me.listarrap();
                }).catch(err => {
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar actualizar el registro!!!','error')
                    }
                });
            },
            listarRAtencioPersona(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var registrosArray=[];
                this.$cat.get('api/RAPs/ListarRegistroPorPersona/'+ me.idPersona,configuracion).then(function(response){
    
                    registrosArray=response.data;
    
                    for (let i in registrosArray) {
                        var ratencionid = registrosArray[i].rAtencionId;
                        var clasificacionpersona = registrosArray[i].clasificacionPersona;
                         this.$cat.get('api/RHechoes/ListarPorrAtencionId/'+ ratencionid,configuracion).then(function(response){
    
    
                             me.hechos.push(
                                    {
                                        rHechoId: response.data.rHechoId,
                                        rAtencion: response.data.rAtencionId,
                                        registradoPor: response.data.registradoPor,
                                        distritoInicial: response.data.distritoInicial,
                                        dirSubProcuInicial: response.data.dirSubProcuInicial,
                                        agenciaInicial: response.data.agenciaInicial,
                                        agenciaid: response.data.agenciaid,
                                        fechaHoraRegistro: response.data.fechaHoraRegistro,
                                        clasificacionPersona: clasificacionpersona,
                                        fechaElevaNuc: response.data.fechaElevaNuc,
                                        fechaHoraSuceso: response.data.fechaHoraSuceso,
                                        rac: response.data.rac,
                                        nuc: response.data.nuc,
                                    });
    
    
    
                        }).catch(err => {
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar listar los registros!!!','error')
                            }
                        });
    
                    }
    
                    }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
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
            // STEP 2 INFORMACION COMPLEMENTARIA
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            // STEP 3 DIRECCION PERSONAL
    
            listarCiudades(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var ciudadesArray=[];
                this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){
                    ciudadesArray=response.data;
                    ciudadesArray.map(function(x){
                        me.ciudades.push({text: x.nombre, value:x.idEstado});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
            },
            listarPorEstado(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.estadoid.value== 0){
                    me.estado = me.estadoid.text;
                    me.estadoid = me.estadoid.value;
                }
                    var municipiosArray=[];
                    me.municipios.length = 0;
                    this.$conf.get('api/Municipios/ListarPorEstado/'+ me.estadoid,configuracion).then(function(response){
    
                        municipiosArray=response.data;
    
                        municipiosArray.map(function(x){
                        me.municipios.push({text: x.nombre,value: x.idMunicipio});
                        });
                        if (me.editedIndex == 1){
                         me.selectMunicipio(me.municipio);
                        }
                        if (me.statusActualizar==true){
                             me.selectMunicipio(me.municipio);
                        }
                    }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
    
    
            },
            listarPorMunicipio(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.municipioid.value== 0){
                me.municipio = me.municipioid.text;
                me.municipioid = me.municipioid.value;
                }
    
    
                var localidadArray=[];
                me.localidades.length = 0;
                this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioid,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.localidades.push({text: x.nombre,value: x.idLocalidad});
                    });
                     if (me.editedIndex == 1){
                          me.selectLocalidad(me.localidad);
                    }
                    if (me.statusActualizar==true){
                             me.selectLocalidad(me.localidad);
                        }
                  }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
    
    
            },
            listarPorLocalidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.localidad = me.localidadid.text;
                me.localidadid = me.localidadid.value;
                this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.localidadid,configuracion).then(function(response){
                      me.cp=response.data.cp;
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            buscarPorCP(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){
                      me.estadoid=response.data.idEstado;
                      me.listarPorEstado();
                      me.municipioid=response.data.idMunicipio;
                      me.buscarPorCpMpo()
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            buscarPorCpMpo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var localidadArray=[];
                me.localidades.length = 0;
                 this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.municipioid +',' + this.cp,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.localidades.push({text: x.nombre,value: x.idLocalidad});
                    });
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                });
            },
            selectEstado: function(val) {
    
                let me=this;
                for (var i = 0; i < me.ciudades.length; i++) {
                    if (me.ciudades[i].text === val)
                    {
                        me.estadoid=  me.ciudades[i].value;
                    }
                }
                me.listarPorEstado();
            },
            selectMunicipio: function(val) {
                let me=this;
    
                for (var i = 0; i < me.municipios.length; i++) {
                    if (me.municipios[i].text === val){
    
                         me.municipioid=  me.municipios[i].value;
                    }
                }
              me.listarPorMunicipio();
            },
            selectLocalidad: function(val) {
               let me=this;
                for (var i = 0; i < me.localidades.length; i++) {
                    if (me.localidades[i].text === val)
                    {
                        me.localidadid=  me.localidades[i].value;
                    }
    
                }
    
            },
             // APIS PARA CONSULTA DE DIRECCION ESCUCHA
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                }
                    var municipiosArray=[];
                    me.de_municipios.length = 0;
                    this.$conf.get('api/Municipios/ListarPorEstado/'+ me.de_estadoid,configuracion).then(function(response){
    
                        municipiosArray=response.data;
    
                        municipiosArray.map(function(x){
                        me.de_municipios.push({text: x.nombre,value: x.idMunicipio});
                        });
                        if (me.editedIndex == 1){
                         me.de_selectMunicipio(me.de_municipio);
                        }
                        if (me.statusActualizar==true){
                             me.de_selectMunicipio(me.municipio);
                        }
                        if (me.duplicarDireccion==true){
                             me.de_selectMunicipio(me.municipio);
                        }
                    }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
    
    
            },
            de_listarPorMunicipio(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.de_municipioid.value== 0){
                me.de_municipio = me.de_municipioid.text;
                me.de_municipioid = me.de_municipioid.value;
                }
    
    
                var localidadArray=[];
                me.de_localidades.length = 0;
                this.$conf.get('api/Localidads/MostrarPorMPO/' + me.de_municipioid,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.de_localidades.push({text: x.nombre,value: x.idLocalidad});
                    });
                     if (me.editedIndex == 1){
                          me.de_selectLocalidad(me.de_localidad);
                    }
                     if (me.statusActualizar==true){
                             me.de_selectLocalidad(me.de_localidad);
                        }
                     if (me.duplicarDireccion==true){
                        me.de_selectLocalidad(me.de_localidad);
                        }
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                });
    
    
            },
            de_listarPorLocalidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.de_localidad = me.de_localidadid.text;
                me.de_localidadid = me.de_localidadid.value;
                this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.de_localidadid,configuracion).then(function(response){
    
                      me.de_cp=response.data.cp;
    
                }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
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
            modalclose(){
                this.modalAdd=false;
                this.limpiar();
            },
            //-------------------------------------------------
            btn_geoloc2(){
                if(this.estado !='' && this.municipio != '' && this.localidad != '' && this.calle != ''){
                        this.geoloc=2;
                        this.modalGeolocalizacion = 1;
                        this.lugar = this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado
                        this.listener();
                        this.addMarkergeocoder();
                        this.geoloc=2;
                }else
                    this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')
            },
            btn_geoloc01(){
                if(this.de_estado !='' && this.de_municipio != '' && this.de_localidad != '' && this.de_calle != ''){
    
                        this.modalGeolocalizacion01 = 1;
                        this.listener01();
                        this.addMarkergeocoder01();
                }else
                    this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')
            },
            listener01(){
                //input.focus();
                let me = this;
                var map = new google.maps.Map(document.getElementById('mapa01'));
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado}, function(results, status) {
                    if (status == 'OK') {
                        me.center01.lat =+ results[0].geometry.location.lat()
                        me.center01.lng =+ results[0].geometry.location.lng()
    
                    } else {
                        alert('La dirección no fue encontrada' + status);
                    }
                })
            },
            addMarkergeocoder01() {
                        const marker = {
                            lat: this.center01.lat,
                            lng: this.center01.lng,
                        };
                        this.markers01 =[]
                        this.places01 = []
                        this.markers01.push({ position: marker });
                        this.places01.push(this.currentPlace);
                        this.center01 = marker;
                        this.currentPlace01 = null;
            },
            updateCoordinates01(location) {
                this.lataux01 = location.latLng.lat()
                this.lngaux01 = location.latLng.lng()
            },
            updatecenter01(){
                this.center01.lat = this.lataux01;
                this.center01.lng = this.lngaux01;
            },
    
            btn_geoloc1(){
                this.geoloc=1;
                this.modalGeolocalizacion = 1;
            },
            setPlace01(place) {
                    this.markers01= [],
                    this.places01= [],
                    this.currentPlace01 = place;
            },
            addMarker01() {
                    if (this.currentPlace01) {
                        const marker = {
                            lat: this.currentPlace01.geometry.location.lat(),
                            lng: this.currentPlace01.geometry.location.lng(),
    
                        };
                        this.markers01.push({ position: marker });
                        this.places01.push(this.currentPlace01);
                        this.center01 = marker;
                        this.currentPlace01 = null;
                        }
            },
            guardarGeolocalizacion01(){
    
                    if(this.lataux01 != '' && this.lngaux01 != ''){
                        this.de_lat = this.lataux01
                        this.de_lng = this.lngaux01
                    }else{
                        this.de_lat = this.markers01[0].position.lat
                        this.de_lng = this.markers01[0].position.lng
                    }
                    this.modalGeolocalizacion01=0;
            },
    
    
    //------------------------------------------------------------------------------------------
            listener(){
                //input.focus();
                let me = this;
                var map = new google.maps.Map(document.getElementById('mapa'));
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado}, function(results, status) {
                    if (status == 'OK') {
                        me.center.lat =+ results[0].geometry.location.lat()
                        me.center.lng =+ results[0].geometry.location.lng()
    
                    } else {
                        alert('La dirección no fue encontrada' + status);
                    }
                })
            },
    
    
            addMarkergeocoder() {
                        const marker = {
                            lat: this.center.lat,
                            lng: this.center.lng,
                        };
                        this.markers =[]
                        this.places = []
                        this.markers.push({ position: marker });
                        this.places.push(this.currentPlace);
                        this.center = marker;
                        this.currentPlace = null;
            },
            updateCoordinates(location) {
                this.lataux = location.latLng.lat()
                this.lngaux = location.latLng.lng()
            },
            updatecenter(){
                this.center.lat = this.lataux;
                this.center.lng = this.lngaux;
            },
    
    
    
            setPlace(place) {
                    this.markers= [],
                    this.places= [],
                    this.currentPlace = place;
            },
    
            addMarker() {
                    if (this.currentPlace) {
                        const marker = {
                            lat: this.currentPlace.geometry.location.lat(),
                            lng: this.currentPlace.geometry.location.lng(),
    
                        };
                        this.markers.push({ position: marker });
                        this.places.push(this.currentPlace);
                        this.center = marker;
                        this.currentPlace = null;
                        }
            },
    
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
    
                    };
                });
            },
            guardarGeolocalizacion(){
    
                if(this.lataux != '' && this.lngaux != ''){
                    this.lat = this.lataux
                    this.lng = this.lngaux
                }else{
                    this.lat = this.markers[0].position.lat
                    this.lng = this.markers[0].position.lng
                }
                this.modalGeolocalizacion=0;
            },
            listarInstituciones(){ 
    
                var institucionesarray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Instituciones/Listar',configuracion).then(function(response){
                    institucionesarray = response.data;
                    institucionesarray.map(function(x){
                            me.instituciones.push({text: x.nombre,value: x.idinstitucion});
                        });
                }).catch(err => { 
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')    
                        } 
                });  
            },
    
    
            //************************************** */
    
    
            setPlace(place) {
                    this.markers= [],
                    this.places= [],
                    this.currentPlace = place;
                },
            addMarker() {
                    if (this.currentPlace) {
                        const marker = {
                            lat: this.currentPlace.geometry.location.lat(),
                            lng: this.currentPlace.geometry.location.lng(),
    
                        };
                        this.markers.push({ position: marker });
                        this.places.push(this.currentPlace);
                        this.center = marker;
                        this.currentPlace = null;
                        }
                },
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
    
                    };
                });
            },
    
             //************************************* */
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
                    me.de_estado=me.estado;
                    me.de_selectEstado(me.de_estado);
                    me.de_municipio=me.municipio;
                    me.de_localidad=me.localidad;
                    me.de_cp= me.cp;
                    me.de_lat= me.lat;
                    me.de_lng=me.lng;
    
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
                }
    
            },
            guardar(){
                       this.$validator.validate().then(result => {
                        if (result) {
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                        /*---------------------------------------------------------------------------------------------------------*/
                        me.registro = me.registro.length !== 0? me.registro: false;

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
                            //
                            if (listaMediosNotificacion.substring(listaMediosNotificacion.length, listaMediosNotificacion.length - 1)==','){
                                listaMediosNotificacion = listaMediosNotificacion.substring(0, listaMediosNotificacion.length -1)
                            };
                            //listaMediosNotificacion = listaMediosNotificacion.slice(10, -1);
                        };
    
                        /*---------------------------------------------------------------------------------------------------------*/
                        //HACER POSIBLE LA SELECCION DE DISCACIDAD
    
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
                        /*---------------------------------------------------------------------------------------------------------*/
    
    
                        //ARREGLA LA FECHA PARA QUE SE GUARDEN CON /
                            const fechaParts = me.fnacimiento.split('-');
                            const dia = fechaParts[2];
                            const mes = fechaParts[1];
                            const anio = fechaParts[0];
                            me.fnacimiento = `${dia}/${mes}/${anio}`;
                            //direccionvacia.includes('null') == true
    
                            if(me.amaterno == '') me.amaterno = 'LO DESCONOCE'
                            if(me.sexo == '') me.sexo = 'LO DESCONOCE'
                            if(me.curp == '') me.curp = 'LO DESCONOCE'
                            if(me.alias == '') me.alias = 'LO DESCONOCE'
                            if(me.abreviacion == '') me.abreviacion = 'LO DESCONOCE'
                            if(me.docidentificacion == '') me.docidentificacion = 'LO DESCONOCE'
    
                        //-------------------------------------------------
                            if(me.fnacimiento != "")
                                me.edadf = me.generaredad();
                            else
                                me.edadf = 99
    
    
                            //SI LA FECHA TIENE UN VALOR INDEFINIDO POR CUARLQUIER ERROR, SE AGREGA 99
                            if(me.fnacimiento.includes('undefined') == true){
                                me.edadf = 99;
                                me.fnacimiento = '';
                            }                           
                            else  
                                me.edadf = me.generaredad();
                                                    
    
                            //ESTE IF VALORA SI EL RANGO DE EDAD CORRESPONDE AL DE UN MENOR DE EDAD SE PROTEGEN LOS DATOS
                            if(me.edadf < 18 || me.rangoedad == 'INFANCIA (0 A 5 AÑOS)' || me.rangoedad == 'NIÑEZ (6 A 12 AÑOS)'|| me.rangoedad == 'ADOLECENCIA (13 A 17 AÑOS)')
                            {
                                me.datosprotegidos = true
    
                                if(this.alias == '')
                                    me.alias=this.obtenerIniciales();
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
                            
                            
                            if(me.cp=='') me.cp =0;
                            if(me.de_cp == '') me.de_cp =0
                            if(me.noInt == '')
                                    me.noInt = 0
                            if(me.noExt == '')
                                me.noExt = 'S/N'
    
    
                            //CUANDO NO SE TRATA DE UN IMPUTADO O NO SE REQUIERE GUARDAR UN POLICIA SE COLOCA ESTE VALOR
                            //PERO CUANDO SI SE REQUIERE GUARDAR CON EL FOR DE COMPONE PARA QUE NO SALGA INDEFINIDO
                            var idPoliciaDetuvo='';
    
                            if(me.impuDetenido == false || me.agregarPoli == true)
                            {
                                idPoliciaDetuvo = '00000000-0000-0000-0000-000000000000';
                            }
                            else
                            {
                                for(var i=0; i<me.policiaDetuvo.length; i++)
                                {
                                    idPoliciaDetuvo += me.policiaDetuvo[i].value;
                                    if(i+1 != me.policiaDetuvo.length)
                                    idPoliciaDetuvo += "; ";
                                }
                            }     
                            
                            var personaPoli = me.idPersona;   
                            
                            var nombre = ''
                            var apaterno =      ''
                            var amaterno =  ''
                            var fnacimiento =  ''
                            var rfc =  ''
                            var curp =  ''
                            var rutadocumento =  ''
    
                            var descripcionRegTabI = 'Registro de persona ' + me.nombres + " " + me.apaterno + " " + me.amaterno;
    
    
    
    
                            if (me.switch2==true){
                                me.radios= 'Anonimo'
                                me.rfc= 'Anonimo'
                                me.razonsocial='Anonimo'
                                me.clasificacionpersona='Anonimo'
                                me.nombres='Anonimo'
                                me.apaterno='Anonimo'
                                me.amaterno='Anonimo'
                                me.alias="Anonimo"
                                me.fnacimiento='Anonimo'
                                me.abreviacion= {text:'Anonimo'}
                                me.docidentificacion = 'Anonimo'
                                me.curp='XXXX010101XXXXXXX1'
                                me.sexo='Anonimo'
                                me.estadocivil='Anonimo'
                                me.genero='Anonimo',
                                me.registro=0
                                me.verR=0
                                me.verI=0
                                me.telefono1='Anonimo'
                                me.telefono2='Anonimo'
                                me.correo='Anonimo'
                                listaMediosNotificacion='Anonimo'
                                me.nacionalidad='Anonimo'
                                me.ocupacion='Anonimo'
                                me.nivelestudio='Anonimo'
                                me.lengua='Anonimo'
                                me.religion='Anonimo'
                                me.switch1= false
                                me.discapacidad='Anonimo'
                                me.calle='Anonimo'
                                me.noExt='Anonimo'
                                me.noInt='Anonimo'
                                me.entreCalle1='Anonimo'
                                me.entreCalle2='Anonimo'
                                me.referencia='Anonimo'
                                me.pais='Anonimo'
                                me.estado='Anonimo'
                                me.municipio='Anonimo'
                                me.localidad='Anonimo'
                                me.cp= 0
                                me.de_calle='Anonimo'
                                me.de_noExt='Anonimo'
                                me.de_noInt='Anonimo'
                                me.de_entreCalle1='Anonimo'
                                me.de_entreCalle2='Anonimo'
                                me.de_referencia='Anonimo'
                                me.de_pais='Anonimo'
                                me.de_estado='Anonimo'
                                me.de_municipio='Anonimo'
                                me.de_localidad='Anonimo'
                                me.de_cp = 0
                                me.de_lat= 0
                                me.de_lng= 0
                            }
                            if (this.editedIndex > -1) {
                                
    
    
                                //debugger
                                //Código para eactualizar
                                if (this.imageFile){
                                        let formData = new FormData();
                                        formData.append('file', this.imageFile );
                                        var nombreCarpeta = "C" + me.nuc.substr(1);
                                        me.GUID = me.generateUUID();
    
                                        this.$cat.post('api/RAtencions/Post/'+nombreCarpeta+'/'+me.GUID,
                                            formData,
                                            {
                                            headers: {
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                            }
                                        ).then(function(response){
                                            me.ruta = response.data.ruta
    
                                            //---------CUANDO ACTUALIZA
                                           
    
    
                                            if (me.sindocumento == false)
                                            {
                                            this.$cat.post('api/DocumentosPesonas/Crear',{
                                                        'PersonaId': me.idPersona,
                                                        'TipoDocumento': me.docidentificacion,
                                                        'NombreDocumento': me.GUID,
                                                        'Descripcion': "",
                                                        'Ruta':me.ruta,
                                                        'Distrito': me.u_distrito,
                                                        'DirSubProc':me.u_dirSubPro,
                                                        'Agencia':me.u_agencia,
                                                        'Usuario': me.u_nombre,
                                                        'Puesto': me.u_puesto,
                                                    },configuracion).then(function(response){
                                                        me.$notify('La información se guardo correctamente !!!','success')
                                                    }).catch(err => {
                                                        if (err.response.status==400){
                                                            me.$notify("No es un usuario válido", 'error')
                                                        } else if (err.response.status==401){
                                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                            me.e401 = true,
                                                            me.showpage= false
                                                        } else if (err.response.status==403){
                                                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                            me.e403= true
                                                            me.showpage= false
                                                        } else if (err.response.status==404){
                                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                                        }else{
                                                            me.$notify('Error al intentar crear el  registro!!!','error')
                                                        }
                                                    });
                                            }
                                            else
                                            {
                                                this.$cat.put('api/DocumentosPesonas/Actualizar',{
                                                            'IdDocumentoPersona': me.idDoccumentoPersona,
                                                            'PersonaId': me.idPersona,
                                                            'TipoDocumento': me.docidentificacion,
                                                            'NombreDocumento': me.GUID,
                                                            'Descripcion': "",
                                                            'Ruta':me.ruta,
                                                            'Distrito': me.u_distrito,
                                                            'DirSubProc':me.u_dirSubPro,
                                                            'Agencia':me.u_agencia,
                                                            'Usuario': me.u_nombre,
                                                            'Puesto': me.u_puesto,
                                                        },configuracion).then(function(response){
                                                            me.$notify('La información se guardo correctamente !!!','success')
                                                        }).catch(err => {
                                                            if (err.response.status==400){
                                                                me.$notify("No es un usuario válido", 'error')
                                                            } else if (err.response.status==401){
                                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                                me.e401 = true,
                                                                me.showpage= false
                                                            } else if (err.response.status==403){
                                                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                                me.e403= true
                                                                me.showpage= false
                                                            } else if (err.response.status==404){
                                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                                            }else{
                                                                me.$notify('Error al intentar crear el  registro!!!','error')
                                                            }
                                                        });
                                            }
    
    
                                        })
                                        .catch(function(){
                                        });
    
    
                                        }
                                //**************************************************** */
                                //**************************************************** */
                                if(me.datosprotegidos){
                                    nombre = me.nombres;
                                    apaterno = me.apaterno;
                                    amaterno = me.amaterno;
                                    fnacimiento = me.fnacimiento;
                                    rfc = me.rfc;
                                    curp = me.curp;
                                    rutadocumento = me.ruta;
                                    if(this.alias == '')
                                    me.alias=this.obtenerIniciales();
    
    
                                    
                                    me.nombres = me.alias;
                                    me.apaterno ="";
                                    me.amaterno = "";
                                    me.rfc = "";
                                    me.curp = "";
                                    me.ruta ="";
                                }
    
    
    
                                this.$cat.put('api/RAPs/Actualizar',{
                                    'rapId': me.rapid,
                                    'clasificacionpersona': me.clasificacionpersona,
                                    'pInicio': false,
                                    //***************************** PERSONA*/
                                    'personaId': me.idPersona,
                                    'statusAnonimo': me.switch2,
                                    'tipoPersona': me.radios,
                                    'rfc': me.rfc,
                                    'razonsocial': me.razonsocial,
                                    'nombre': me.nombres,
                                    'apellidoPaterno' : me.apaterno,
                                    'apellidoMaterno' : me.amaterno,
                                    'alias': me.alias,
                                    'statusAlias': false,
                                    'rangoEdad': me.rangoedad,
                                    'rangoEdadTF': me.RangoEdadTF,
                                    'fechaNacimiento' : me.fnacimiento,
                                    'entidadFederativa': me.abreviacion.text,
                                    'docIdentificacion': me.docidentificacion,
                                    'curp': me.curp,
                                    'PoblacionAfro':me.poblacionafro,
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
                                    //Arregar aqui
                                    'tipoDiscapacidad': listaDiscapacidades,
                                    'DatosProtegidos': me.datosprotegidos,
                                    'Relacion': me.relacion,
                                    'Parentesco': me.relacionado,
                                    'InicioDetenido' : me.impuDetenido, 
                                    'PoliciaDetuvo' : idPoliciaDetuvo,
                                    'Edad': me.edadf,
                                    'DocPoderNotarial':me.documentoacredita,
                                    //***************************** DIRECCION*/
    
                                    'calle': me.calle,
                                    'noExt': me.noExt,
                                    'noInt': me.noInt,
                                    'entreCalle1': me.entreCalle1,
                                    'entreCalle2': me.entreCalle2,
                                    'referencia': me.referencia,
                                    'pais': me.pais,
                                    'estado': me.estado,
                                    'municipio': me.municipio,
                                    'localidad': me.localidad,
                                    'cp': me.cp,
                                    'lat': me.lat.toString(),
                                    'lng':me.lng.toString(),
                                    //************************************ DIRECCION ESCUCHA */
    
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
                                    'de_cp': me.de_cp,
                                    'de_lat': me.de_lat.toString(),
                                    'de_lng': me.de_lng.toString(),
                                    //*************************************/
                                },configuracion).then(function(response){
    
                                    
    
                                    if(me.datosprotegidos){
                                        //Cuando ingresas un datos protegido el valor de alias pasa a ser el del nombre (tabla persona)
                                        //Los apellidos quedan vacios pues se han guardado en datos protegidos
                                        
                                        //La condicion dice que si en esos casos ingresaste valore diferentes a los que se ponen en automatico da por entendido
                                        //que requieres actualizar esos datos (no solo uno, deben ser los 3) se actualizan los datos protegidos
                                        if(nombre != me.alias && apaterno != "" && amaterno != "")
                                        {
                                            this.$cat.post('api/DatosProtegido/Crear',{
                                            'RAPId': me.rapid,
                                            'Nombre': nombre,
                                            'APaterno': apaterno,
                                            'AMaterno': amaterno,
                                            'FechaNacimiento': fnacimiento,
                                            'CURP':curp,
                                            'RFC': rfc,
                                            'Rutadocumento':rutadocumento,
                                            'UDistrito':me.u_distrito,
                                            'USubproc': me.u_dirSubPro,
                                            'UAgencia': me.u_agencia,
                                            'Usuario': me.u_nombre,
                                            'UPuesto': me.u_puesto,
                                            'UModulo': me.u_modulo,
    
                                        }
                                        ,configuracion).then(function(response){
                                            me.$notify('La información se guardo correctamente !!!','success')
                                        }).catch(err => {
                                            if (err.response.status==400){
                                                me.$notify("No es un usuario válido", 'error')
                                            } else if (err.response.status==401){
                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage= false
                                            } else if (err.response.status==403){
                                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                me.e403= true
                                                me.showpage= false
                                            } else if (err.response.status==404){
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            }else{
                                                me.$notify('Error al intentar crear el  registro!!!','error')
                                            }
                                        });
                                        }
                                        else
                                        {
                                            //Con respecto al primer if, si no haces cambios en los nombres y apellidos te permite cambiar todo lo demas sin afectar los valores de datos protegidos
                                            //ACTUALIZACION: La funcion quedo resuelta por medio de front, sin embargo, podria funcionar como un cacheo de errores con las vistas.
                                            this.$cat.post('api/DatosProtegido/actualizar',{
                                            'RAPId': me.rapid,
                                            'FechaNacimiento': fnacimiento,
                                            'CURP':curp,
                                            'RFC': rfc,
                                            'Rutadocumento':rutadocumento,
                                            'UDistrito':me.u_distrito,
                                            'USubproc': me.u_dirSubPro,
                                            'UAgencia': me.u_agencia,
                                            'Usuario': me.u_nombre,
                                            'UPuesto': me.u_puesto,
                                            'UModulo': me.u_modulo,
    
                                        }
                                        ,configuracion).then(function(response){
                                            me.$notify('La información se guardo correctamente !!!','success')
                                        }).catch(err => {
                                            if (err.response.status==400){
                                                me.$notify("No es un usuario válido", 'error')
                                            } else if (err.response.status==401){
                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage= false
                                            } else if (err.response.status==403){
                                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                me.e403= true
                                                me.showpage= false
                                            } else if (err.response.status==404){
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            }else{
                                                me.$notify('Error al intentar crear el  registro!!!','error')
                                            }
                                        });
    
                                        }
                                    }   
    
                                    //CUANDO SE DESEA AGREGAR UN POLICIA LLAMA A LA FUNCION PARA QUE LO CREE
                                    if(me.agregarPoli == true){me.crearegistrarpolicias(personaPoli);}
                                      
                                    me.$notify('La información se guardo correctamente !!!','success')
                                    me.listarrap();
                                    
                                    me.close();
                                }).catch(err => {
                                    if (err.response.status==400){
                                        me.$notify("No es un usuario válido", 'error')
                                    } else if (err.response.status==401){
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                        me.showpage= false
                                    } else if (err.response.status==403){
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403= true
                                        me.showpage= false
                                    } else if (err.response.status==404){
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                    }else{
                                        me.$notify('Error al intentar actualizar el registro!!!','error')
                                    }
                                });
    
                            } else {
                                me.alias=this.obtenerIniciales();
    
    
                                if (me.statusActualizar==true)
                                {
                                    this.$cat.post('api/RAPs/Insertar',{
                                        'rAtencionId': me.rAtencionId,
                                        'personaId': me.idPersona,
                                        'clasificacionpersona': me.clasificacionpersona,
                                        'pInicio': false,
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
                                        'de_cp': me.de_cp,
                                        'de_lat': me.de_lat,
                                        'de_lng': me.de_lng,
                                    },configuracion).then(function(response){
                                        var rapid = response.data.rapid;
                                        this.$cat.put('api/RAPs/ActualizarPersonaDirPer',{
    
                                            //***************************** PERSONA*/
                                            'personaId': me.idPersona,
                                            'statusAnonimo': me.switch2,
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
                                            'entidadFederativa':  me.abreviacion.text,
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
                                            'pInicio': false,
                                            'Relacion': me.relacion,
                                            'Parentesco': me.relacionado,
                                            'InicioDetenido' : me.impuDetenido, 
                                            'PoliciaDetuvo' : idPoliciaDetuvo,
                                            'Edad': me.edadf,
                                            'DocPoderNotarial':me.documentoacredita,
                                            //***************************** DIRECCION*/
                                            'rapid': rapid,
                                            'calle': me.calle,
                                            'noExt': me.noExt,
                                            'noInt': me.noInt,
                                            'entreCalle1': me.entreCalle1,
                                            'entreCalle2': me.entreCalle2,
                                            'referencia': me.referencia,
                                            'pais': me.pais,
                                            'estado': me.estado,
                                            'municipio': me.municipio,
                                            'localidad': me.localidad,
                                            'cp': me.cp,
                                            'lat': me.lat,
                                            'lng':me.lng,
                                            //************************************ DIRECCION ESCUCHA */
    
                                            //************************************ */
                                        },configuracion).then(function(response){
                                            me.$notify('La información se guardo correctamente !!!','success')
                                            me.listarrap();
                                            me.close();
                                        }).catch(err => {
                                            if (err.response.status==400){
                                                me.$notify("No es un usuario válido", 'error')
                                            } else if (err.response.status==401){
                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage= false
                                            } else if (err.response.status==403){
                                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                me.e403= true
                                                me.showpage= false
                                            } else if (err.response.status==404){
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            }else{
                                                me.$notify('Error al intentar actualizar el registro!!!','error')
                                            }
                                        });
    
    
                                    }).catch(err => {
                                        if (err.response.status==400){
                                            me.$notify("No es un usuario válido", 'error')
                                        } else if (err.response.status==401){
                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                            me.e401 = true,
                                            me.showpage= false
                                        } else if (err.response.status==403){
                                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                                            me.e403= true
                                            me.showpage= false
                                        } else if (err.response.status==404){
                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                        }else{
                                            me.$notify('Error al intentar crear el  registro!!!','error')
                                        }
                                    });
                                }
                                else{
                                     //Código para guardar
                                    if (this.imageFile){
                                        let formData = new FormData();
                                        formData.append('file', this.imageFile );
                                        var nombreCarpeta = "C" + me.nuc.substr(1);
                                        me.GUID = me.generateUUID();
    
                                        this.$cat.post('api/RAtencions/Post/'+nombreCarpeta+'/'+me.GUID,
                                            formData,
                                            {
                                            headers: {
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                            }
                                        ).then(function(response){
                                            me.ruta = response.data.ruta
    
                                            if(me.cp=='') me.cp =0;
                                            if(me.de_cp == '') me.de_cp =0
                                            if(me.noInt == '')
                                            me.noInt = 0
                                            if(me.noExt == '')
                                            me.noExt = 'S/N'
    
                                            
    
                                            if(me.datosprotegidos){
                                                nombre = me.nombres;
                                                apaterno = me.apaterno;
                                                amaterno = me.amaterno;
                                                fnacimiento = me.fnacimiento;
                                                rfc = me.rfc;
                                                curp = me.curp;
                                                rutadocumento = me.ruta;
                                                me.alias=this.obtenerIniciales();
    
    
                                                me.nombres = me.alias;
                                                me.apaterno ="";
                                                me.amaterno = "";
                                                me.rfc = "";
                                                me.curp = "";
                                                me.ruta ="";
                                            }
    
                                            this.$cat.post('api/RAPs/Crear',{
    
                                                //***************************** PERSONA*/
                                                'rAtencionId': me.rAtencionId,
                                                'clasificacionpersona': me.clasificacionpersona,
                                                'pInicio': false,
    
                                                'statusAnonimo': me.switch2,
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
                                                'calle': me.calle,
                                                'noExt': me.noExt,
                                                'noInt': me.noInt,
                                                'entreCalle1': me.entreCalle1,
                                                'entreCalle2': me.entreCalle2,
                                                'referencia': me.referencia,
                                                'pais': me.pais,
                                                'estado': me.estado,
                                                'municipio': me.municipio,
                                                'localidad': me.localidad,
                                                'cp': me.cp,
                                                'lat': me.lat,
                                                'lng': me.lng,
                                                //************************************ DIRECCION ESCUCHA */
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
                                                'de_cp': me.de_cp,
                                                'de_lat': me.de_lat,
                                                'de_lng': me.de_lng,
                                                //******************************************************* */
    
                                            },configuracion).then(function(response){
    
                                                me.$notify('La información se guardo correctamente !!!','success')
    
                                                //GUARDA ID DE PERSONA QUE SE ACABA DE GENERAR
                                                var personaIdGenerado = response.data.personaid;
    
    
                                                this.$cat.post('api/DocumentosPesonas/Crear',{
                                                    'PersonaId': response.data.personaid,
                                                    'TipoDocumento': me.docidentificacion,
                                                    'NombreDocumento': me.GUID,
                                                    'Descripcion': "",
                                                    'Ruta':me.ruta,
                                                    'Distrito': me.u_distrito,
                                                    'DirSubProc':me.u_dirSubPro,
                                                    'Agencia':me.u_agencia,
                                                    'Usuario': me.u_nombre,
                                                    'Puesto': me.u_puesto,
                                                },configuracion).then(function(response){
                                                    me.$notify('La información se guardo correctamente !!!','success')
                                                }).catch(err => {
                                                    if (err.response.status==400){
                                                        me.$notify("No es un usuario válido", 'error')
                                                    } else if (err.response.status==401){
                                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                        me.e401 = true,
                                                        me.showpage= false
                                                    } else if (err.response.status==403){
                                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                        me.e403= true
                                                        me.showpage= false
                                                    } else if (err.response.status==404){
                                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                                    }else{
                                                        me.$notify('Error al intentar crear el  registro!!!','error')
                                                    }
                                                });
    
    
                                                if(me.datosprotegidos){
                                                    this.$cat.post('api/DatosProtegido/Crear',{
                                                        'RAPId': response.data.idrap,
                                                        'Nombre': nombre,
                                                        'APaterno': apaterno,
                                                        'AMaterno': amaterno,
                                                        'FechaNacimiento': fnacimiento,
                                                        'CURP':curp,
                                                        'RFC': rfc,
                                                        'Rutadocumento':rutadocumento,
                                                        'UDistrito':me.u_distrito,
                                                        'USubproc': me.u_dirSubPro,
                                                        'UAgencia': me.u_agencia,
                                                        'Usuario': me.u_nombre,
                                                        'UPuesto': me.u_puesto,
                                                        'UModulo': me.u_modulo,
    
                                                    },configuracion).then(function(response){
                                                        me.$notify('La información se guardo correctamente !!!','success')
                                                    }).catch(err => {
                                                        if (err.response.status==400){
                                                            me.$notify("No es un usuario válido", 'error')
                                                        } else if (err.response.status==401){
                                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                            me.e401 = true,
                                                            me.showpage= false
                                                        } else if (err.response.status==403){
                                                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                            me.e403= true
                                                            me.showpage= false
                                                        } else if (err.response.status==404){
                                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                                        }else{
                                                            me.$notify('Error al intentar crear el  registro!!!','error')
                                                        }
                                                    });
                                                }
                                                //LLAMA A LA FUNCION DE CREAR UN POLICIA
                                                if(me.agregarPoli == true){me.crearegistrarpolicias2(personaIdGenerado);}
                                                me.crearRegistroTableroI(descripcionRegTabI);
                                                me.listarrap();
                                                me.close();
                                        }).catch(err => {
                                                if (err.response.status==400){
                                                    me.$notify("No es un usuario válido", 'error')
                                                } else if (err.response.status==401){
                                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                    me.e401 = true,
                                                    me.showpage= false
                                                } else if (err.response.status==403){
                                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                    me.e403= true
                                                    me.showpage= false
                                                } else if (err.response.status==404){
                                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                                }else{
                                                    me.$notify('Error al intentar crear el  registro!!!','error')
                                                }
                                            });
    
    
    
                                        })
                                        .catch(function(){
                                        });
                                    }else{
    
                                            if(me.cp=='') me.cp =0;
                                            if(me.de_cp == '') me.de_cp =0
    
                                            var nombre = ''
                                            var apaterno =      ''
                                            var amaterno =  ''
                                            var fnacimiento =  ''
                                            var rfc =  ''
                                            var curp =  ''
                                            var rutadocumento =  ''
    
    
                                            if(me.datosprotegidos){
                                                nombre = me.nombres;
                                                apaterno = me.apaterno;
                                                amaterno = me.amaterno;
                                                fnacimiento = me.fnacimiento;
                                                rfc = me.rfc;
                                                curp = me.curp;
                                                rutadocumento = me.ruta;
                                                me.alias=this.obtenerIniciales();
    
    
                                                me.nombres = me.alias;
                                                me.apaterno ="";
                                                me.amaterno = "";
                                                me.fnacimiento = "";
                                                me.rfc = "";
                                                me.curp = "";
                                                me.ruta ="";
                                            }
    
                                            this.$cat.post('api/RAPs/Crear',{
    
                                        //***************************** PERSONA*/
                                        'rAtencionId': me.rAtencionId,
                                        'clasificacionpersona': me.clasificacionpersona,
                                        'pInicio': false,
                                        'statusAnonimo': me.switch2,
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
                                        'calle': me.calle,
                                        'noExt': me.noExt,
                                        'noInt': me.noInt,
                                        'entreCalle1': me.entreCalle1,
                                        'entreCalle2': me.entreCalle2,
                                        'referencia': me.referencia,
                                        'pais': me.pais,
                                        'estado': me.estado,
                                        'municipio': me.municipio,
                                        'localidad': me.localidad,
                                        'cp': me.cp,
                                        'lat': me.lat,
                                        'lng': me.lng,
                                        //************************************ DIRECCION ESCUCHA */
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
                                        'de_cp': me.de_cp,
                                        'de_lat': me.de_lat,
                                        'de_lng': me.de_lng,
                                        //******************************************************* */
    
                                    },configuracion).then(function(response){
    
                                        me.$notify('La información se guardo correctamente !!!','success')
    
                                        //GUARDA EL VALOR DE LA PERSONA QUE SE ACABA DE CREAR
                                        var personaIdGenerado = response.data.personaid;
    
    
                                        if(me.datosprotegidos){
                                            this.$cat.post('api/DatosProtegido/Crear',{
                                                'RAPId': response.data.idrap,
                                                'Nombre': nombre,
                                                'APaterno': apaterno,
                                                'AMaterno': amaterno,
                                                'FechaNacimiento': fnacimiento,
                                                'CURP':curp,
                                                'RFC': rfc,
                                                'Rutadocumento':"",
                                                'UDistrito':me.u_distrito,
                                                'USubproc': me.u_dirSubPro,
                                                'UAgencia': me.u_agencia,
                                                'Usuario': me.u_nombre,
                                                'UPuesto': me.u_puesto,
                                                'UModulo': me.u_modulo,
    
                                            },configuracion).then(function(response){
                                                me.$notify('La información se guardo correctamente !!!','success')
                                            }).catch(err => {
                                                if (err.response.status==400){
                                                    me.$notify("No es un usuario válido", 'error')
                                                } else if (err.response.status==401){
                                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                    me.e401 = true,
                                                    me.showpage= false
                                                } else if (err.response.status==403){
                                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                    me.e403= true
                                                    me.showpage= false
                                                } else if (err.response.status==404){
                                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                                }else{
                                                    me.$notify('Error al intentar crear el  registro!!!','error')
                                                }
                                            });
                                        }
    
                                        //LLAMA A LA FUNCION DE CREAR UN POLICIA
                                        if(me.agregarPoli == true){me.crearegistrarpolicias2(personaIdGenerado);}
                                        me.crearRegistroTableroI(descripcionRegTabI);
                                        me.listarrap();
                                        me.close();
                                        }).catch(err => {
                                            if (err.response.status==400){
                                                me.$notify("No es un usuario válido", 'error')
                                            } else if (err.response.status==401){
                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                me.showpage= false
                                            } else if (err.response.status==403){
                                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                                me.e403= true
                                                me.showpage= false
                                            } else if (err.response.status==404){
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            }else{
                                                me.$notify('Error al intentar crear el  registro!!!','error')
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    })
            },
            //ESTA FUNCION GENERA EL POLICIA CUANDO SE TRATA DE UN ACTUALIZACION DE IMPUTADO DONDE SE REQUIERE AGREGAR UN POLICIA QUE LO DETUVO
            crearegistrarpolicias(personaPoli){
                this.$validator.validateAll("policia").then(result => {
                    if (result) { 
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
    
                        var policiaVacio = '00000000-0000-0000-0000-000000000000'
    
                        this.$cat.post('api/RAPs/CrearPoliciaEdit',{
    
                            'PersonaId': personaPoli,                  
                            'RAtencionId': me.rAtencionId,                                
                            'nombre': me.nombrep,
                            'apellidoPaterno' : me.apaternop,
                            'apellidoMaterno' : me.amaternop,
                            'InstitutoPolicial': me.institucion,
                            'PoliciaDetuvo' : policiaVacio,
                                                  
                        },configuracion).then(function(response){ 
    
                            me.listarrap();
                            me.listarPolicias();
                            me.$notify('La información se guardo correctamente !!!','success')                 
    
                        }).catch(err => { 
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        });
                    }
                })
    
            },
            //CONSTA DE LA MISMA FUNCION ANTERIOR PERO ESTE GENERA EL POLICIA DE UNA NBUEVA ALTA
            crearegistrarpolicias2(personaIdGenerado){
                this.$validator.validateAll("policia").then(result => {
                    if (result) { 
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
    
                        var policiaVacio = '00000000-0000-0000-0000-000000000000'
    
                        this.$cat.post('api/RAPs/CrearPoliciaEdit',{
    
                            'PersonaId': personaIdGenerado,                  
                            'RAtencionId': me.rAtencionId,                                
                            'nombre': me.nombrep,
                            'apellidoPaterno' : me.apaternop,
                            'apellidoMaterno' : me.amaternop,
                            'InstitutoPolicial': me.institucion,
                            'PoliciaDetuvo' : policiaVacio,
                                                  
                        },configuracion).then(function(response){ 
    
                            me.listarrap();
                            me.listarPolicias();
                            me.$notify('La información se guardo correctamente !!!','success')                 
    
                        }).catch(err => { 
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        });
                    }
                })
    
            },
            crearRegistroTableroI(descripcionRegTabI){
                    
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
    
                        this.$cat.post('api/RegistroTableroI/Crear',{
                            'RhechoId': me.rHechoId,
                            'TipoRegistroTableroI': descripcionRegTabI,
                            'Distrito': me.u_distrito,
                            'DirSub': me.u_dirSubPro,
                            'Agencia':me.u_agencia,
                            'ModuloServicioId': me.u_idmoduloservicio,
                            'Modulo':me.u_modulo,
                            'UsuarioId':me.u_idusuario,
                            'NombreUsuario': me.u_nombre,
    
                        },configuracion).then(function(response){
                            me.$notify('La información se guardo correctamente !!!','success')
                        }).catch(err => {
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')
                            }
                        });
    
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
            pickFile () {
                this.removeImage()
                this.$refs.image.click ()
            },
            removeImage () {
                this.$refs.image.value = ''
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
    
    
                 imprim1(){
    
                    var printContents = document.getElementById('mapa').outerHTML;
                    var w = window.open();
                    w.document.write("<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>"+printContents+"<h1></div>");
                    //w.document.write(printContents);
                    w.print();
    
                },
                mostrarmapa(item){
    
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    this.$cat.get('api/RAPs/ListarDP/'+ item.personaId,configuracion).then(function(response){
                        me.center2.lat = + response.data.lat
                        me.center2.lng = + response.data.lng
                        me.addMarker2();
                        me.geoloc2=2;
                        me.modalGeolocalizacion2 = 1;
    
    
                    }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
    
                },
    
                btn_geoloc12(){
                    this.geoloc2=1;
                    this.modalGeolocalizacion2 = 1;
                },
                btn_geoloc22(){
                    this.geoloc2=2;
                    this.modalGeolocalizacion2 = 1;
                },
                setPlace2(place) {
                        this.markers2= [],
                        this.places2= [],
                        this.currentPlace2 = place;
                },
                addMarker2() {
    
                    const marker = {
                        lat: this.center2.lat,
                        lng: this.center2.lng,
    
                    };
                    this.markers2.push({ position: marker });
                    this.places2.push(this.currentPlace2);
                    this.center2 = marker;
                    this.currentPlace2 = null;
    
                },
                geolocate2: function() {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.center2 = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
    
                        };
                    });
                },
                guardarGeolocalizacion2(){
                    if(this.geoloc==1){
                        this.lat2 = this.center2.lat;
                        this.lng2 = this.center2.lng;
                        this.geoloc2=0;
                        this.modalGeolocalizacion2=0;
                    }
                    if(this.geoloc==2){
                        this.de_lat2 = this.center2.lat;
                        this.de_lng2 = this.center2.lng;
                        this.geoloc2=0;
                        this.modalGeolocalizacion2=0;
                    }
                },
                activarterreno(){
                   this.opcionesmapa.mapTypeId = 'roadmap'
                },
                activarsatellite(){
                    this.opcionesmapa.mapTypeId = 'hybrid'
                },
                aumentarzoorm(){
                    this.zoom++;
                },
                disminuirzoom(){
                    this.zoom--;
                },
            },
    
    
       }
    </script>
    <style>
    .espaciado{
        padding: 10px !important;
    }
    .btn-color{
        color: white
    }
    
    </style>
    