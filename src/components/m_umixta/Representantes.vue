<template>  
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Representantes</v-toolbar-title>   
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details />
                <v-spacer />
                <v-flex xs12 sm6 md3>  
                    <v-text-field 
                        class="font-weight-regular"
                        v-model="nuc" 
                        disabled  
                        prepend-icon="folder"
                        filled
                    />
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
                :items="representantes"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  
            >
                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.nombres + ' ' + props.item.apellidoPa + ' ' + props.item.apellidoMa }}</td>  
                    <td>{{ props.item.curp }}</td> 
                    <td>{{ props.item.cedulaProfesional }}</td>                 
                    <td>{{ props.item.medioNotificacion }}</td>  
                    <td>{{ props.item.correoElectronico}}</td>
                    <td>{{ props.item.telefono }}</td>                   
                    <td>{{ props.item.personaR }}</td>
                    <td>
                        <div v-if="props.item.tipo1 > 0">
                            <span class="blue--text">{{ calcularRepresentante(props.item.tipo1) }}</span>
                        </div>
                        <div v-else-if="props.item.tipo1 < 0">
                            <span class="red--text">{{ calcularRepresentante(props.item.tipo1) }}</span>
                        </div>
                    </td>
                    <td>
                        <div v-if="props.item.tipo2 > 0">
                            <span class="blue--text">{{ calcularRepresentante(props.item.tipo2) }}</span>
                        </div>
                        <div v-else-if="props.item.tipo2 < 0">
                            <span class="red--text">{{ calcularRepresentante(props.item.tipo2) }}</span>
                        </div>
                    </td>
                    <td class="justify-center layout px-0">    

                    <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on"  
                                    @click="agregarFHS()"
                                    >
                                    access_time
                                </v-icon> 
                            </template>
                            <span>Actualizar fecha y hora</span>
                        </v-tooltip>   

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on"  
                                    @click="actualizarstatus(props.item)"
                                    >
                                    update
                                </v-icon> 
                            </template>
                            <span>Actualizar Status T1</span>
                        </v-tooltip>

                        <div v-if="props.item.tipo2 != 0" class="justify-center layout px-0">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click="actualizarstatus2(props.item)">
                                        update
                                    </v-icon> 
                                </template>
                                <span>Actualizar Status T2</span>
                            </v-tooltip>
                        </div>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click="vizualisarImag(props.item)">
                                    contacts
                                </v-icon> 
                            </template>
                            <span>Visualizar imagen</span>
                        </v-tooltip>

                        <v-tooltip bottom>
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

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click="mostrarmapa(props.item)">
                                    location_on
                                </v-icon> 
                            </template>
                            <span>Ver dirección</span>
                        </v-tooltip>

                        <div v-if="props.item.tipo2 == 4 || props.item.tipo1 == 4" class="justify-center layout px-0">
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click="imprimirdoc(props.item)">
                                        print
                                    </v-icon> 
                                </template>
                                <span>Imprimir nombramiento y aceptación de cargo de Asesor(a) jurídico</span>
                            </v-tooltip>  
                        </div>

                        <div v-if="props.item.tipo2 == 2 || props.item.tipo1 == 2" class="justify-center layout px-0">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click="imprimirdoc2(props.item)">
                                        print
                                    </v-icon> 
                                </template>
                                <span>Imprimir nombramiento y aceptación de cargo de Defensor(a) público</span>
                            </v-tooltip>
                        </div>
                        <div v-if="props.item.tipo2 == 3 || props.item.tipo1 == 3" class="justify-center layout px-0">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click="imprimirdoc2(props.item)">
                                        print
                                    </v-icon> 
                                </template>
                                <span>Imprimir nombramiento y aceptación de cargo de Defensor(a) particular</span>
                            </v-tooltip>
                        </div>                        
                    </td>         
                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
            <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">  
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-avatar size="30">
                            <v-icon >{{ formIcon }}</v-icon>
                        </v-avatar> 
                        <v-toolbar-title class="subheading">{{ formTitle }}</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn color=success text @click.native="guardar">
                                GUARDAR INFORMACION
                            </v-btn>
                            <v-btn icon @click="modalclose()">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-stepper v-model="step" non-linear vertical>
                        <v-stepper-step 
                            :complete="step > 1" 
                            step="1" 
                            editable 
                            :rules="[() => !errors.has('tipo de persona') && !errors.has('nombre') && !errors.has('apellido paterno') && !errors.has('persona a representar') && !errors.has('tipo de representante')]">
                            Captura de datos
                            <small>Datos generales del representante.</small>
                        </v-stepper-step>
                        <v-stepper-content step="1">
                            <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap> 
                                        <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                            <v-text-field 
                                                name="nombre" 
                                                label="*Nombre(s):" 
                                                v-model="nombres"   
                                                v-validate="'required'"
                                                :error-messages="errors.collect('nombre')"
                                            />
                                            <v-text-field 
                                                name="apellido paterno" 
                                                label="*Apellido paterno:" 
                                                v-model="apaterno" 
                                                v-validate="'required'"
                                                :error-messages="errors.collect('apellido paterno')" 
                                            />
                                            <v-text-field 
                                                name="apellido materno" 
                                                label="Apellido materno:" 
                                                v-model="amaterno" 
                                            />
                                            <v-text-field 
                                                name="fecha de nacimiento" 
                                                label="Fecha de nacimiento:" 
                                                v-model="fnacimiento" 
                                                v-validate="'date_format:dd/MM/yyyy'"
                                                :error-messages="errors.collect('fecha de nacimiento')" 
                                            />
                                            <v-autocomplete
                                                name="sexo"
                                                :items="sexos"
                                                v-model="sexo"
                                                v-validate="'required'"
                                                label="*Sexo:" 
                                                :error-messages="errors.collect('sexo')" 
                                            />
                                            <v-autocomplete
                                                name="entidad federativa"
                                                :items="estados"
                                                v-model="abreviacion"
                                                label="Entidad federativa de nacimiento:" 
                                                return-object   
                                            />
                                            <v-select 
                                                name="persona a representar"  
                                                :items="personas"
                                                v-model="persona" 
                                                v-validate="'required'" 
                                                label="*Persona a representar:"
                                                attach
                                                chips
                                                deletable-chips
                                                multiple
                                                return-object   
                                                :error-messages="errors.collect('persona a representar')"
                                            />
                                            <v-text-field 
                                                name="artículos de la ley general de victimas" 
                                                label="Artículos de la ley general de victimas:" 
                                                v-if="bolaux"
                                                v-model="articulosv"
                                                v-validate="'required'"
                                                :error-messages="errors.collect('artículos de la ley general de victimas')" 
                                            />
                                        </v-flex>
                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                            <v-autocomplete
                                                name="tipo de representante"
                                                :items="trepresentantes"
                                                v-model="trepresentante"
                                                label="*Tipo de representante:" 
                                                v-validate="'required'"
                                                return-object       
                                                attach
                                                chips
                                                deletable-chips
                                                multiple
                                                @change="validar2representates()"
                                                :error-messages="errors.collect('tipo de representante')" 
                                            />
                                            <v-autocomplete 
                                                name="documento de identificación"
                                                :items="docsidentificaciones"
                                                v-model="docidentificacion"
                                                v-validate="'required'"
                                                label="*Documento de identificación:"
                                                :error-messages="errors.collect('documento de identificación')"
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
                                                            <v-avatar  size="30">
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
                                                                            <v-card  tile flat>
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small color="info" @click="onClose">
                                                                                        <v-icon >close</v-icon>
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
                                                                                    <v-btn fab small  color="info" @click="onStop">
                                                                                        <v-icon>stop</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-flex>
                                                                        <v-flex xs12 sm6 md3 order-md1 order-sm3>
                                                                            <v-card tile flat>
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab  small color="info" @click="onStart">
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
                                                            <img :src="imageUrl" height="150px" />
                                                            <pdf :src="imageUrl" height="150px" />
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
                                                @change="onFilePicked"
                                            >
                                            <v-text-field 
                                                name="curp" 
                                                v-model="curp"  
                                                v-if="switch2==false"  
                                                label="CURP:" 
                                                :error-messages="errors.collect('curp')"
                                            />
                                            <v-text-field 
                                                name="cédula profesional" 
                                                v-validate="'required'"
                                                :error-messages="errors.collect('cédula profesional')"
                                                label="*Cédula profesional:" 
                                                v-model="cedulaprofesional" 
                                            />
                                        </v-flex>                 
                                    </v-layout>
                                    <v-spacer />
                                    <div class="text-xs-right">
                                        <v-btn color="primary" @click.native="step = 2">Continuar</v-btn>
                                    </div>
                                </v-container>   
                            </v-card>
                        </v-stepper-content>    
                        <v-stepper-step :complete="step > 2" step="2" editable>
                            Información complementaria
                        </v-stepper-step>
                        <v-stepper-content step="2">
                            <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap> 
                                        <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                            <v-autocomplete 
                                                name="medio de notificación"
                                                :items="medionotificaciones"
                                                v-model="medionotificacion"
                                                label="Medio de notificación:" 
                                            />
                                            <v-text-field 
                                                label="Telefono :"  
                                                v-model="telefono1" 
                                            />
                                            <v-text-field 
                                                label="Correo electrónico:"  
                                                v-model="correo" 
                                            />
                                        </v-flex>
                                        <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                            <v-autocomplete 
                                                name="nacionalidad"
                                                :items="nacionalidades"
                                                v-model="nacionalidad" 
                                                label="Nacionalidad:"
                                            />
                                            <v-autocomplete 
                                                name="género"
                                                :items="generos"
                                                v-model="genero" 
                                                label="Género:"
                                            />
                                        </v-flex>
                                    </v-layout>
                                    <div class="text-xs-right">
                                        <v-btn flat @click.native="step = 1">Anterior</v-btn> 
                                        <v-btn color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader" @click.native="step = 3">
                                            Continuar
                                        </v-btn>
                                    </div>
                                </v-container>
                            </v-card>
                        </v-stepper-content>
                        <v-stepper-step :complete="step > 3" step="3" editable :rules="[]">
                            Dirección de notificación
                        </v-stepper-step>
                        <v-stepper-content step="3">
                            <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap> 
                                        <v-flex class="espaciado"  xs12 sm12 md6 lg6>
                                            <v-text-field 
                                                label="Calle:" 
                                                name="calle" 
                                                v-model="de_calle" 
                                                :error-messages="errors.collect('calle')" 
                                            />
                                            <v-text-field 
                                                name="numero exterior" 
                                                v-model="de_noExt" 
                                                label="Número exterior:" 
                                                :error-messages="errors.collect('numero exterior')"
                                            />
                                            <v-text-field 
                                                label="No. Interior:"    
                                                v-model="de_noInt" 
                                            />    
                                            <v-text-field 
                                                label="Entre calle 1:"   
                                                v-model="de_entreCalle1" 
                                            />   
                                            <v-text-field 
                                                label="Entre calle 2:" 
                                                v-model="de_entreCalle2" 
                                            /> 
                                            <v-text-field 
                                                label="Referencia:"   
                                                v-model="de_referencia" 
                                            /> 
                                            <v-text-field 
                                                label="Pais:" 
                                                name="pais" 
                                                v-model="de_pais" 
                                                v-if="switch2==false"
                                                value="México" 
                                            />
                                        </v-flex>
                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                            <v-autocomplete 
                                                label="Estado:" 
                                                name="estado"     
                                                v-model="de_estadoid"
                                                :items="de_ciudades"  
                                                v-if="switch2==false"
                                                return-object
                                                v-on:change="de_listarPorEstado" 
                                            />
                                            <v-autocomplete 
                                                label="Municipio:" 
                                                name="municipio" 
                                                v-model="de_municipioid" 
                                                :items="de_municipios"
                                                v-if="switch2==false"
                                                return-object  
                                                v-on:change="de_listarPorMunicipio" 
                                            />
                                            <v-autocomplete 
                                                label="Localidad:" 
                                                name="localidad" 
                                                v-model="de_localidadid" 
                                                :items="de_localidades" 
                                                v-if="switch2==false"
                                                return-object
                                                v-on:change="de_listarPorLocalidad"
                                            />
                                            <v-text-field 
                                                label="Código postal:" 
                                                v-if="switch2==false" 
                                                name="cp" 
                                                v-model="de_cp"
                                                @keyup.enter="buscarPorCP()" 
                                            />
                                            <v-layout wrap justify-space-between>
                                                <v-flex xs6 md6 lg6>
                                                    <v-text-field 
                                                        v-model="de_lat"
                                                        label="Latitud:" 
                                                        disabled
                                                    />
                                                </v-flex>
                                                <v-flex xs6 md6 lg6>
                                                    <v-text-field 
                                                        v-model="de_lng"
                                                        label="Longitud:" 
                                                        disabled 
                                                    />
                                                </v-flex>
                                            </v-layout>
                                            <v-btn block="" @click.native="btn_geoloc2" outline color="primary"><v-icon>location_on</v-icon>Croquis</v-btn>
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
                            <v-btn icon   @click="modalGeolocalizacion = false">
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
                                    <v-btn  outline color="primary" @click="addMarker">BUSCAR</v-btn>
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
                                        />
                                    </gmap-map>  
                                </v-flex>  
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogimagen" max-width="1000px">
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar size="30">
                            <v-icon class="grey lighten-2">assignment</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Imagen</v-toolbar-title>
                        <v-spacer />                  
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md text-xs-center>
                                <v-layout wrap>
                                    <v-flex  xs12 sm12 md12 lg12>
                                        Tipo de archivo : {{ tipo }}
                                        <v-img                                        
                                            :src="rutaconsulta" 
                                            aspect-ratio="1"
                                            class="black"
                                            contain                                           
                                        />
                                    </v-flex>                               
                                </v-layout>
                            </v-container>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn  @click.native="dialogimagen=false">Cerrar</v-btn>                                   
                            </v-card-actions> 
                        </v-form>
                    </v-card-text> 
                </v-card>   
            </v-dialog>
            <v-dialog v-model="modalGeolocalizacion2" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar bottom collapse dark color="primary">
                        <v-toolbar-title>Geolocalización.</v-toolbar-title>
                        <v-spacer />
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
                    <v-divider />
                    <v-card elevation=0 height="auto">
                        <gmap-map 
                            id="mapa"                             
                            :center="center2"
                            :zoom="zoom"                            
                            style=" width:100%;  height: 800px;"                            
                            :options="opcionesmapa"
                            :StreetViewPanoramaOptions="{
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
                            />
                        </gmap-map>               
                    </v-card>
                </v-card>
            </v-dialog>
            <v-dialog  v-model="modalFHS"  max-width="700px">  
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">access_time</v-icon>
                        </v-avatar> 
                    <v-toolbar-title class="subheading">Fecha y hora del suceso</v-toolbar-title>
                <v-spacer></v-spacer> 
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm6 md6  >
                                    
                                        <v-date-picker locale="es" v-model="fecha"></v-date-picker>
                                 
                                </v-flex>
                                    <v-flex xs6 sm6 md6 >
                                 
                                        <v-time-picker v-model="hora"></v-time-picker>
                              
                                </v-flex>
                            
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="closeFHS()" >Cancelar</v-btn>
                            <v-btn @click.native="guardarFHS" class="success" >Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                
                </v-card-text> 
                </v-card> 
            </v-dialog>
            <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">           
                        <v-toolbar-title>Documento.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn  color=success text @click.native="guardar()">Guardar oficio</v-btn>
                            <v-btn icon   @click="modaldocumento = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar> 
                    <v-card-text>
                        <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
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
import moment from 'moment'
import 'moment/locale/es'
import { error } from 'util';
import alertify from 'alertifyjs';
import pdf from 'vue-pdf';

import QRCode from "qrcode";
import { generarQRCodeBase64 } from './crearQR';


var assert, curp, persona;
assert = require('assert');
curp = require('curp.js');  

export default {
    components: {
        "vue-web-cam": WebCam,
        pdf
    },
    data: () => ({ 
        components: {  
            n401,
            n403
        }, 
        modalFHS: 0,
        fecha: new Date().toISOString().substr(0, 10),
        hora: null,
        mes: '',
        showpage:true,
        e401:false,
        e403:false,
        modalduplicidad:false, 
        idPersona:0,
        hechos:[],   
        dialog: false, 
        verTP:0, 
        rapid:'',
        rAtencionId:'',
        rHechoId:'', 
        nuc:'',
        //*************** */
        raps:[],
        //*************** */
        headers: [
        
            { text: 'Nombre', value: 'nombre' },
            { text: 'CURP', value: 'curp'},      
            { text: 'Cedula profesional', value: 'cedulaProfesional'},        
            { text: 'Medio de notificación', value: 'medio de notificacion', sortable: false },
            { text: 'Correo electronico', value: 'correo electronico', sortable: false },
            { text: 'Telefono', value: 'telefonos', sortable: false },  
            { text: 'Persona a representar', value: 'personaR', sortable: true }, 
            { text: 'Tipo 1', value: 'tipo1', sortable: true }, 
            { text: 'Tipo 2', value: 'tipo2', sortable: true }, 
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
        //****************************** */
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null, 
        //****************************** */
        step:1, 
        //********************************/
        representantes:[],
        personas:[],
        persona:'',
        idireccionescuha:'',
        idrepresentante:'',
        dialog2:false,
        dialogimagen:false,
        rutaconsulta:'',
        tipo:'',
        trepresentantes:[],
        trepresentante:'',


        //CAPTURA DE DATOS
        idPersona:'',
        radios: 'Fisica',
        rfc:'',
        razonsocial:'',
        docidentificacion:'',
        docidentificacion2:'',
        docsidentificaciones:[], 

        sexo:'',
        sexos:[], 

        entidadFederativa:'',
        abreviacion:'',
        estados:[],   

        //img: null,
        camera: null,
        deviceId: null,
        devices: [],
        imageName: '',
        imageUrl: null,
        imageFile: [],
        imageFile2: [],
        //DATOS PARA LA GENERACION DEL CURP
        nombres:'',
        apaterno:'',
        amaterno:'',
        alias:'',
        fnacimiento:'', 
        curp:'',
        cedulaprofesional:'',
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

        religion:'',
        religiones:[], 

        switch1: false,
        switch2: false,

        discapacidad:'',
        discapaciodades:[],

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


    //-------------------------------------------------
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

        //----------------------------------------------------
        GUID:'',
        statusActualizar:false,
        modaldocumento : false,
        agenciainfo:[],
        agenciaid:'',
        texto:'',
        bolaux :false,
        articulosv:"",
        comilla:'"',
        datos:"",
        texto: 'Vista Previa',
        qrCode: null,
        docAceptacionNom: 'Nom... y acep... de cargo de',
        vistaPreviaTF: true,
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
                me.listar();
                me.listarSexo();
                me.listarIdentificacion();
                me.listarEstados();
                me.Listartrepresentantes();
                // INFORMACION COMPLEMENTARIA
                me.listarMedionotificacion();
                me.listarNacionalidad();
                me.listarEstadoCivil();
                me.listarGenero();
                me.listarPersonas();
                // DIRECCION PERSONAL 
                me.listarCiudades();
                // DIRECCION ESCUCHA 
                me.de_listarCiudades();
                me.listarLogo();
                me.listarrHecho();
            }

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
        
     // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
        });
    },
    computed: {
        formTitle () {
                return this.editedIndex === -1 ? 'Registrar a un nuevo representante' : 'Actualizar informacion del representante'
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

        devices: function() {
        // Once we have a list select the first one
            const [first, ...tail] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
    methods:{
        async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) 
        {
            let me=this; 
            var textoModificado = nuc.replace(/-/g, "~");

            var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss");
            var dia = moment(date).format("DD");
            var mes = moment(date).format("MMMM");
            var año = moment(date).format("YYYY");
            var fecha = dia + " de " + mes + " del " + año;

            
            try {
                me.qrCode = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id);

                console.log("QR Generado");
            } catch (err) {
                console.error('Error:', err);
            }
        },
        listarLogo(){
        
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;
                
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
        listarrHecho(){

            let me=this;   
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){
                me.agenciaid = response.data.agenciaid,                       
                me.informacionagencia();
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
        informacionagencia(){

            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$conf.get('api/Agencias/Listarporid/'+ me.agenciaid,configuracion).then(function(response){
                me.agenciainfo=response.data;
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
        cerrarcarpeta () {
            this.$store.state.rHechoId= null;
            this.$store.state.nuc= null;
            this.$router.push('./umixta-carpetas')
        },
        agregar(){
            this.step = 1;
            this.modalAdd= 1;
        },
        close () {
            
            this.modalAdd = 0;
            this.limpiar();
        },
        editItem (item) {
            
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.persona = []

            this.$cat.get('api/RAPs/listarrepresentados/'+ item.personaId,configuracion).then(function(response){
                me.personasArray=response.data;

                me.personasArray.forEach(function(x){
                    me.persona.push({text: x.nombreCompleto,value: x.personaId})

                }) 
            
            //*************DATOS GENERALES DEL REPRESENTANTE******************** */

                me.idrepresentante=item.idRepresentante;
                me.nombres= item.nombres;
                me.apaterno = item.apellidoPa;
                me.amaterno = item.apellidoMa;
                me.fnacimiento= item.fechaNacimiento;
                me.sexo = item.sexo;
                me.entidadFederativa=item.entidadFeNacimiento;
                me.selectEFederativa(item.entidadFeNacimiento);
                me.articulosv = item.articulosPenales;
                me.docidentificacion = item.tipoDocumento;
                me.curp = item.curp;
                me.cedulaprofesional=item.cedulaProfesional;

                //**************INFORMACION COMPLEMETARIA******************* */
            
                me.medionotificacion = item.medioNotificacion;
                me.telefono1 = item.telefono;
                me.correo = item.correoElectronico;
                me.nacionalidad = item.nacionalidad;
                me.genero = item.genero;

                //***************DIRECCION DE NOTIFICACION****************** */

                me.de_calle = item.calle;
                me.de_noExt = item.noExt;
                me.de_noInt = item.noInt;
                me.de_entreCalle1 = item.entreCalle1;
                me.de_entreCalle2 = item.entreCalle2;
                me.de_referencia = item.referencia;
                me.de_pais = item.pais;
                me.de_selectEstado(item.estado);
                me.de_estado = item.estado;
                me.de_selectMunicipio(item.municipio);
                me.de_municipio = item.municipio;
                me.de_selectLocalidad(item.localidad);
                me.de_localidad = item.localidad;
                me.de_cp = item.cp;
                me.de_lat = item.lat;
                me.de_lng = item.lng;
                //---------------------------------------------------------------
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
            me.trepresentante = []
            var cont = 1;
            this.$conf.get('api/TRepresentantes/listarrepresentantespersona/'+ item.idRepresentante,configuracion).then(function(response){
                me.trepresentantesarray=response.data;

                me.trepresentantesarray.forEach(function(x){
                    me.trepresentante.push({text: x.tipo,value: x.valor})
                    cont++;

                }) 
            
           
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
        generarfecha(){
            var fecha;
            fecha = moment().format('h:mm a')+ " horas del día "+  moment().format('DD') + " de " + moment().format('MMMM')  + " de " + moment().format("YYYY");
            return fecha;      
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
            this.editedIndex=1; 
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
            this.radios= 'Fisica';
            this.verTP=0;
            this.rfc="";
            this.razonsocial="";
            this.clasificacionpersona="";
            this.nombres="";
            this.apaterno="";
            this.amaterno="";
            this.fnacimiento="";
            this.sexo="";
            this.abreviacion="";
            this.docidentificacion="";
            this.curp="";
            this.imageName="";
            this.imageFile ="";
            this.imageUrl ="";
            this.cedulaprofesional = "";
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
            this.trepresentante = '';
            this.persona = '';
            this.$validator.reset();
            this.step=1;
            this.editedIndex=-1;
            this.articulosv = "";
            this.texto =  'Vista Previa';
            this.qrCode =  null;
            this.vistaPreviaTF =  true;
        },
        validar2representates(){
            let me = this;
            if(me.trepresentante.length>2)
            {
                me.trepresentante.pop();
                me.$notify("Maximo 2 tipos de representantes", 'error')
            }
            me.trepresentante.sort((a, b) => (a.value > b.value) ? 1 : -1)

            var entre = false

            me.trepresentante.forEach(function(registro){
                if(registro.text == "Asesor Juridico"){
                    me.bolaux = true;
                    entre = true
                }                   
            }
            )
            if(!entre)
                me.bolaux = false
        },     
        listar(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$cat.get('api/Representante/Representanteslistarporid/'+me.rHechoId,configuracion).then(function(response) {
                console.log(me.representantes)
                me.representantes = response.data;
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
        vizualisarImag(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var sexoArray=[];
            this.$cat.get('api/Representante/DocRepresentanteslistarporid/'+ item.idRepresentante,configuracion).then(function(response){
                me.rutaconsulta =  response.data.ruta    
                me.tipo = response.data.tipoDocumento
                me.dialogimagen = true;            
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
                //console.log(response.data);
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
        listarEstados(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var estadosArray=[]; 
            this.$conf.get('api/Estadoes/Listar',configuracion).then(function(response){
                //console.log(response);
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
                //console.log(response.data);
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
        agregarFHS(){
            this.modalFHS = 1;
            console.log(this.fecha)      
        },
        closeFHS(){
            this.modalFHS = 0;
        },
        guardarFHS(){
            let me=this;
            // console.log(me.fecha.substring(8,10) +" de "+ obtenermes(me.fecha.substring(5,7)-1)+" del "+me.fecha.substring(0,4)+", "+me.fecha.substring(11,19))
            console.log('fechaHoraSuceso' + me.fecha + ' ' + me.hora)
            me.closeFHS();
        },
        actualizarstatus(item){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var aux;        

            this.$cat.put('api/Representante/ActualizarStatus',{
                    'idRepresentante' : item.idRepresentante,
                    'tipo1' : -(item.tipo1),
                    'tipo2' : item.tipo2,

                    },configuracion).then(function(response){                            
                        me.$notify('La información se actualizo correctamente !!!','success')    
                        me.listar();    
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
        actualizarstatus2(item){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var aux;        
            this.$cat.put('api/Representante/ActualizarStatus',{
                    'idRepresentante' : item.idRepresentante,
                    'tipo1' : item.tipo1,
                    'tipo2' : -(item.tipo2),

                    },configuracion).then(function(response){                            
                        me.$notify('La información se actualizo correctamente !!!','success')    
                        me.listar();    
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
        onFilePicked (e) {
			const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
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
            console.log("On Started Event", stream);
        },
        onStopped(stream) {
            console.log("On Stopped Event", stream);
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {
            console.log("On Error Event", error);
        },
        onCameras(cameras) {
            this.devices = cameras;
            console.log("On Cameras Event", cameras);
        },
        onClose () {
            this.dialog = false; 
        },    
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
            console.log("On Camera Change Event", deviceId);
        }, 
        // STEP 2 INFORMACION COMPLEMENTARIA
        listarMedionotificacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var medionotificacionArray=[]; 
            this.$conf.get('api/MedioNotificacions/Listar',configuracion).then(function(response){
                //console.log(response);
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
                //console.log(response);
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
                //console.log(response);
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
        Listartrepresentantes(){
            let me=this;  
            var trepresentantearray ;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var cont = 1;
            this.$conf.get('api/TRepresentantes/Listar',configuracion).then(function(response){
                trepresentantearray=response.data;
                trepresentantearray.map(function(x){
                    me.trepresentantes.push({text: x.tipo,value: x.valor});
                    cont++;
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
        calcularRepresentante(representante){
            let me = this;
            if(representante>0){     
                for(var i=0;i<me.trepresentantes.length;i++){
                    if(representante == me.trepresentantes[i].value){
                        return me.trepresentantes[i].text + " ACTIVO"
                        
                    }                  
                }
            }else{
                for(var i=0;i<me.trepresentantes.length;i++){
                    if(-(representante) == me.trepresentantes[i].value){
                        return me.trepresentantes[i].text + " INACTIVO"
                    }                       
                }
            }
        },
        listarGenero(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var generoArray=[]; 
            this.$conf.get('api/Generoes/Listar',configuracion).then(function(response){
                //console.log(response);
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
                  //console.log(response)
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
        de_listarPorEstado(){
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
                  //console.log(response)

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
        listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var personasArray=[];
            this.$cat.get('api/RAPs/ListarTodos/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data)
                me.personal2 =response.data;
                personasArray=response.data;
                personasArray.map(function(x){
                    me.personas.push({text: x.nombreCompleto,value: x.personaId,value2: x.idRAP});                       
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
        obteneridde(){
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                this.$cat.get('api/RAPs/ListarDE/'+ me.persona.value2,configuracion).then(function(response){
                    me.idireccionescuha=response.data.idDEscucha
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
        //------------------------------------------

        btn_geoloc2(){
            
            if(this.de_estado !='' && this.de_municipio != '' && this.de_localidad != '' && this.de_calle != ''){
                if(this.de_lat == '' && this.de_lng == ''){
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                    this.lugar = this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado
                    this.listener();
                    this.addMarkergeocoder();
                }else{
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                }    
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')


        }, 
        listener(){
            //input.focus();
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.center.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
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
        btn_geoloc1(){
            this.geoloc=1;
            this.modalGeolocalizacion = 1;
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
            if(this.geoloc==2){
                if(this.lataux != '' && this.lngaux != ''){
                    this.lat = this.lataux
                    this.lng = this.lngaux
                }else{
                    this.lat = this.markers[0].position.lat
                    this.lng = this.markers[0].position.lng
                }
                
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }

        },
    
        //************************************** */
        btn_geoloc1(){
            this.geoloc=1;
            this.modalGeolocalizacion = 1;
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
            if(this.geoloc==1){
                this.lat = this.center.lat;
                this.lng = this.center.lng;
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }
            if(this.geoloc==2){
                this.de_lat = this.center.lat;
                this.de_lng = this.center.lng;
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }
    
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
        archivo(){
            console.log("ENTRANDO A ARCHIVO");
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nombreCarpeta;
            let formData = new FormData();  
            
                    formData.append('file', me.imageFile2 ); 
                    nombreCarpeta = "C" + me.nuc.substr(1);
                    me.GUID = me.generateUUID();

                    
            if (this.editedIndex > -1)
            {
                    //IF vacio para diferenciar entre una edicion y un registro nuevo.
            }

            else
            {
                                            
                    this.$cat.post('api/Representante/Post/'+nombreCarpeta+'/'+me.GUID,formData,{
                        headers: {
                        'Content-Type': 'multipart/form-data'
                            } 
                    },configuracion).then(function(response){
                    console.log('SUCCESS!!');
                    
                    this.$cat.post('api/Representante/CrearDocRepresentante',{

                        'representanteId' : me.idrepresentante,
                        'tipoDocumento' : me.docidentificacion2,
                        'nombreDocumento' : me.GUID,
                        'ruta':response.data.ruta,
                        'fecha' : me.generarfecha,
                        'uDistrito' : me.u_distrito,
                        'uSubproc' : me.u_dirSubPro,
                        'uAgencia' : me.u_agencia,
                        'uUsuario' : me.u_nombre,
                        'uPuesto' : me.u_puesto,
                        'uModulo' : me.u_modulo,                   

                    },configuracion).then(function(response){  
                        me.$notify('La información se guardo correctamente !!!','success')   
                        me.dialogarchivo = false;      
                        me.listar();
                        me.limpiar(); 
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
                        })
                        .catch(err =>// ERROR AL MANDAR EL ARCHIVO DE DOCUMENTO
                        {

                            console.log('FAILURE2!!');
                        }); 
            }

                

                 
        },
        guardar(){
                    console.log("imagen:"+this.imageName);
                    this.$validator.validate().then(result => {
                    if (result) { 
                        let me=this;
                        
                        

                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            var aux1='',aux2='';
                            var representados = "";

                            var personasnombre = "";

                        if (this.editedIndex > -1)
                            {
                                for(var i=0; i<me.persona.length; i++){
                                representados += me.persona[i].value;
                                if(i+1 != me.persona.length)
                                    representados += "; ";
                            }

                            if(me.trepresentante.length==2){
                                aux1 = me.trepresentante[0].value ;
                                aux2 = me.trepresentante[1].value;
                            }
                            else{
                                aux1 = me.trepresentante[0].value ;
                                aux2 = 0;
                            }
                            
                            if(me.de_cp == '')me.de_cp =0

                        

                            this.$cat.post('api/Representante/ActualizarRepresentante',{

                                        'representanteId' : me.idrepresentante,
                                        'rHechoId': me.rHechoId, 
                                        'PersonaId': me.persona[i],
                                        'Nombres': me.nombres,
                                        'apellidoPa' : me.apaterno,
                                        'apellidoMa' : me.amaterno,
                                        'fechaNacimiento' : me.fnacimiento,
                                        'sexo' : me.sexo,
                                        'entidadFeNacimiento': me.abreviacion.text,
                                        'tipoDocumento' : me.docidentificacion,
                                        'curp': me.curp,
                                        'medioNotificacion': me.medionotificacion,
                                        'telefono': me.telefono1,
                                        'correoElectronico': me.correo,
                                        'nacionalidad': me.nacionalidad,
                                        'genero': me.genero,
                                        'Tipo1' : aux1,
                                        'Tipo2' : aux2,
                                        'CedulaProfesional': me.cedulaprofesional,
                                        'fecha': me.generarfecha(),
                                        'uDistrito': me.u_distrito,
                                        'uSubproc' : me.u_dirSubPro,
                                        'uAgencia' : me.u_agencia,
                                        'usuario' : me.u_nombre,
                                        'uPuesto' : me.u_puesto,
                                        'uModulo' : me.u_modulo,
                                        'calle': me.de_calle,
                                        'noint': me.de_noInt,
                                        'noext': me.de_noExt,
                                        'entrecalle1': me.de_entreCalle1,
                                        'entrecalle2': me.de_entreCalle2,
                                        'referencia': me.de_referencia,
                                        'pais': me.de_pais,
                                        'estado': me.de_estado,
                                        'municipio': me.de_municipio,
                                        'localidad': me.de_localidad,
                                        'cp': me.de_cp,
                                        'lat': me.de_lat,
                                        'lng': me.de_lng,
                                        'ArticulosPenales' : me.articulosv,
                                        'representados' : representados,
                                        //--------------------------------
                                        'nombreDocumento' : me.GUID,                                       
                                        'fecha' : me.generarfecha,

                                    },configuracion).then(function(response){ 
                                        me.imageFile2 = me.imageFile
                                        //console.log(response.data)
                                        me.archivo();
                                        me.docidentificacion2 = me.docidentificacion;
                                        console.log(me.idrepresentante)
                                        me.idrepresentante = response.data.idrepresentante
                                        me.$notify('La información se guardo correctamente !!!','success') 
                                        this.$cat.put('api/RAPs/Actualizardireccionescucha',{
                                            'idDEscucha': me.idireccionescuha,
                                            'calle': me.de_calle,
                                            'noint': me.de_noInt,
                                            'noext': me.de_noExt,
                                            'entrecalle1': me.de_entreCalle1,
                                            'entrecalle2': me.de_entreCalle2,
                                            'referencia': me.de_referencia,
                                            'pais': me.de_pais,
                                            'estado': me.de_estado,
                                            'municipio': me.de_municipio,
                                            'localidad': me.de_localidad,
                                            'cp': me.de_cp,
                                            'lat': me.de_lat,
                                            'lng': me.de_lng,
                                        
                                            },configuracion).then(function(){   
                                            me.$notify('La información se actualizo correctamente !!!','success') 
                                            //******************* Archivo   
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
                                        me.listar();
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
                            
                        }else{

                            // DESDE AQUI
                            for(var i=0; i<me.persona.length; i++){
                                representados += me.persona[i].value;
                                if(i+1 != me.persona.length)
                                    representados += "; ";
                            }

                            for(var i=0; i<me.persona.length; i++){
                                personasnombre += me.persona[i].text;
                                if(i+1 != me.persona.length)
                                personasnombre += "; ";
                            }

                            var descripcionRegTabI = 'Registro de Representante ' + me.nombres + " " + me.apaterno + " " + me.amaterno + " para " + personasnombre;
                            // HASTA AQUI 

                            if(me.trepresentante.length==2){
                                aux1 = me.trepresentante[0].value ;
                                aux2 = me.trepresentante[1].value;
                            }
                            else{
                                aux1 = me.trepresentante[0].value ;
                                aux2 = 0;
                            }
                            
                            if(me.de_cp == '')me.de_cp =0

                                    this.$cat.post('api/Representante/CrearRepresentante',{
                                        
                                        //***************************** PERSONA*/ 
                                        'rHechoId': me.rHechoId, 
                                        'PersonaId': me.persona[i],
                                        'Nombres': me.nombres,
                                        'apellidoPa' : me.apaterno,
                                        'apellidoMa' : me.amaterno,
                                        'fechaNacimiento' : me.fnacimiento,
                                        'sexo' : me.sexo,
                                        'entidadFeNacimiento': me.abreviacion.text,
                                        'curp': me.curp,
                                        'medioNotificacion': me.medionotificacion,
                                        'telefono': me.telefono1,
                                        'correoElectronico': me.correo,
                                        'nacionalidad': me.nacionalidad,
                                        'genero': me.genero,
                                        'Tipo1' : aux1,
                                        'Tipo2' : aux2,
                                        'CedulaProfesional': me.cedulaprofesional,
                                        'fecha': me.generarfecha(),
                                        'uDistrito': me.u_distrito,
                                        'uSubproc' : me.u_dirSubPro,
                                        'uAgencia' : me.u_agencia,
                                        'usuario' : me.u_nombre,
                                        'uPuesto' : me.u_puesto,
                                        'uModulo' : me.u_modulo,
                                        'calle': me.de_calle,
                                        'noint': me.de_noInt,
                                        'noext': me.de_noExt,
                                        'entrecalle1': me.de_entreCalle1,
                                        'entrecalle2': me.de_entreCalle2,
                                        'referencia': me.de_referencia,
                                        'pais': me.de_pais,
                                        'estado': me.de_estado,
                                        'municipio': me.de_municipio,
                                        'localidad': me.de_localidad,
                                        'cp': me.de_cp,
                                        'lat': me.de_lat,
                                        'lng': me.de_lng,
                                        'ArticulosPenales' : me.articulosv,
                                        'representados' : representados 

                                    },configuracion).then(function(response){ 
                                        me.imageFile2 = me.imageFile
                                        //console.log(response.data)
                                        me.archivo();
                                        me.docidentificacion2 = me.docidentificacion;
                                        console.log(me.idrepresentante)
                                        me.crearRegistroTableroI(descripcionRegTabI);
                                        me.idrepresentante = response.data.idrepresentante
                                        me.$notify('La información se guardo correctamente !!!','success') 
                                        this.$cat.put('api/RAPs/Actualizardireccionescucha',{
                                            'idDEscucha': me.idireccionescuha,
                                            'calle': me.de_calle,
                                            'noint': me.de_noInt,
                                            'noext': me.de_noExt,
                                            'entrecalle1': me.de_entreCalle1,
                                            'entrecalle2': me.de_entreCalle2,
                                            'referencia': me.de_referencia,
                                            'pais': me.de_pais,
                                            'estado': me.de_estado,
                                            'municipio': me.de_municipio,
                                            'localidad': me.de_localidad,
                                            'cp': me.de_cp,
                                            'lat': me.de_lat,
                                            'lng': me.de_lng,
                                        
                                            },configuracion).then(function(){   
                                            me.$notify('La información se actualizo correctamente !!!','success') 
                                            //******************* Archivo   
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
                                        me.listar();
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
                    

                });
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

            /*
            this.$cat.get('api/RAPs/Listarpersona/'+ item.personaId,configuracion).then(function(response){

                this.$cat.get('api/RAPs/ListarDE/'+ response.data.idRAP,configuracion).then(function(response){
                
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
            });*/

            me.center2.lat = + item.lat
            me.center2.lng = + item.lng  
            me.addMarker2();
            me.geoloc2=2;
            me.modalGeolocalizacion2 = 1;
        
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
        obtenermes: function(mes){
            if(mes==0) return "Enero"
            if(mes==1) return "Febrero"
            if(mes==2) return "Marzo"
            if(mes==3) return "Abril"
            if(mes==4) return "Mayo"
            if(mes==5) return "Junio"
            if(mes==6) return "Julio"
            if(mes==7) return "Agosto"
            if(mes==8) return "Septiembre"
            if(mes==9) return "Octubre"
            if(mes==10) return "Noviembre"
            if(mes==11) return "Diciembre"
        },
        imprimirdoc(item){

            let me=this;

            var  nomdoc = me.docAceptacionNom + (item.tipo1 == 4? " Asesor Juridico": " Asesor Juridico");
            me.vistaPreviaTF = false;
            me.generarQR(nomdoc,me.nuc,item.usuario,item.fechasys,item.idRepresentante);

            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ident = "Ninguna";

            this.datos = "<b>DOMICILIO:</b> " + item.calle + ", No.Interior " + item.noInt + ", No.Exterior: " + item.noExt + ", Codigo postal " + item.cp +" "+ item.municipio + " " + item.referencia +
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<b>TELÉFONO A TRAVÉS DE CUALQUIERA DE SUS APLICACIONES:</b> "+ item.telefono+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<b>CORREO ELECTRÓNICO: </b>"+ item.correoElectronico

            me.texto = "En la ciudad de "+ item.uDistrito + " Hidalgo, siendo las "+ item.fechasys.substring(11,16) + " del día "+ item.fechasys.substring(8,10) + " de " + me.obtenermes(item.fechasys.substring(5,7)-1) + " del año " + item.fechasys.substring(0,4)+
                ", " + item.usuario + ", adscrito(a) a "+ item.uSubproc + ", hace constar que se encuentra presente el(la) C. "+ item.nombres + " " + item.apellidoPa + " " + item.apellidoMa  + ", profesionista que ha sido designado(a) por la víctima " + item.personaR + " como su Asesor jurídico en términos del artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos; 17, 105 fracción II, 109 fracción VII del Código Nacional de Procedimientos Penales. Enterado(a) del cargo conferido se identifica con "+
                item.tipoDocumento+
                " que se le devuelve dejando en su lugar copia simple, enseguida se verifica en el registro nacional de profesionistas que efectivamente se encuentra registrada la cédula profesional a su nombre. Hecho lo anterior manifestó: acepto y protesto el cargo conferido, sabedor(a) de las obligaciones que me confiere el artículo 110 del Código Nacional de Procedimientos Penales y "+
                item.articulosPenales + " Ley General de Víctimas, a quien se apercibe que en caso de incumplir con sus obligaciones puede incurrir en el hecho previsto como delito por el artículo 333 del código penal de la entidad; proporcionando los siguientes datos para notificación."+
                "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>";
                
            setTimeout(() => 
            {
                me.mostrarpdf(item.usuario,item.uPuesto,item.uAgencia,"NOMBRAMIENTO Y ACEPTACIÓN DE CARGO DE ASESOR JURÍDICO",item.personaR,item.nombres + " " + item.apellidoPa + " " + item.apellidoMa,1,item.sexo);
                me.modaldocumento = false;
            }, 1000);
                
        },
        imprimirdoc2(item){

            let me=this;

            var  nomdoc = me.docAceptacionNom + (item.tipo1 == 2 || item.tipo2 == 2? " Defensor publico": " Defensor particular");
            me.vistaPreviaTF = false;
            me.generarQR(nomdoc,me.nuc,item.usuario,item.fechasys,item.idRepresentante);

            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ident = "Ninguna";
            var pubpriv = "";
            if (item.tipo2 == 3 || item.tipo1 == 3)
                {pubpriv = "NOMBRAMIENTO Y ACEPTACIÓN DE CARGO DE DEFENSOR PARTICULAR"};
            if (item.tipo2 == 2 || item.tipo1 == 2)
                {pubpriv = "NOMBRAMIENTO Y ACEPTACIÓN DE CARGO DE DEFENSOR PÚBLICO"};
            

            this.datos = "<b>DOMICILIO:</b> " + item.calle + ", No.Interior " + item.noInt + ", No.Exterior: " + item.noExt + ", Codigo postal " + item.cp +" "+ item.municipio + " " + item.referencia +
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<b>TELÉFONO A TRAVÉS DE CUALQUIERA DE SUS APLICACIONES:</b> "+ item.telefono+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<b>CORREO ELECTRÓNICO: </b>"+ item.correoElectronico
    
            me.texto = "En la ciudad de "+ item.uDistrito + " Hidalgo, siendo las "+ item.fechasys.substring(11,16) + " del día "+ item.fechasys.substring(8,10) + " de " + me.obtenermes(item.fechasys.substring(5,7)-1) + " del año " + item.fechasys.substring(0,4)+
                ", el(la) Licenciado(a) " +  item.usuario + ", adscrito(a) a "+ item.uSubproc + ", y una vez que se le han hecho del conocimiento a la persona sujeta de investigación " + item.personaR+ ", los derechos que prevé en su favor el artículo 20 apartado B fracción VII de la Constitución Política de los Estados Unidos Mexicanos, así como el artículo 113, 115 del Código Nacional de Procedimientos Penales, es su deseo designar como abogado(a) defensor(a) a "+
                item.nombres + " " + item.apellidoPa + " " + item.apellidoMa + ", quien se identifica con cédula profesional, la cual le acredita como "+ item.cedulaProfesional + " verificado en el sistema de cédulas profesionales, que la cédula exhibida se encuentra registrada a nombre de su presentante, anexando impresión de la consulta y al hacer del conocimiento de ese profesionista el cargo que le ha sido conferido, manifiesta: acepto y protesto el cargo sabedor(a) de los derechos y las obligaciones que me confiere el artículo 117 del Código Nacional de Procedimientos Penales; a quien se apercibe que en caso de incumplir con sus obligaciones puede incurrir en el hecho previsto como delito por el artículo 333 del código penal de la entidad."

            setTimeout(() => 
            {
                me.mostrarpdf(item.usuario,item.uPuesto,item.uAgencia,pubpriv,item.personaR,item.nombres + " " + item.apellidoPa + " " + item.apellidoMa,2,item.sexo);
                me.modaldocumento = false; 
            }, 1000);

            
        },
        mostrarpdf(nombre,puesto,agencia,titulo,victima,representante,tipo,genero) 
        {
        let me = this;

        var dd = me.downloadPdf(nombre,puesto,agencia,titulo,victima,representante,tipo,genero);

        var pdfMake = require("pdfmake/build/pdfmake.js");
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        var doc = pdfMake.createPdf(dd).print();
        me.modaldocumento=true; 
        //me.limpiarQR(); 
        },
        downloadPdf(nombre,puesto,agencia,titulo,victima,representante,tipo,genero) {

            let me = this;

            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var u_subProc= this.u_subproc;
            var nuc = this.nuc;
            //***************************************************************************** */
            var expedida = "Ninguna"
            var licenciado, defensor, asesor;            

            if(genero == "H"){
                licenciado = "Licenciado"
                if (titulo == "NOMBRAMIENTO Y ACEPTACIÓN DE CARGO DE DEFENSOR PARTICULAR")
                    {defensor = "Defensor particular"}
                else
                    {defensor = "Defensor público"}                
                asesor = "Asesor Jurídico"
            }else if(genero == "M"){
                licenciado = "Licenciada"
                if (titulo == "NOMBRAMIENTO Y ACEPTACIÓN DE CARGO DE DEFENSOR PARTICULAR")
                    {defensor = "Defensora particular"}
                else
                    {defensor = "Defensora pública"}
                asesor = "Asesora Jurídica"
            }

            
                var html =htmlToPdfmake(
                    this.texto 
                );
                var html2 =htmlToPdfmake(
                    this.datos 
                );
            
            //***************************************************************************** */
            var agenciainfodr = this.agenciainfo["direccion"];
            var agenciainfotel = this.agenciainfo["telefono"];

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
                            me.vistaPreviaTF == false? 
                            {
                                image: me.qrCode,
                                width: 80, // Ajusta el ancho según tu diseño
                                height: 80, // Ajusta la altura según tu diseño
                                absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño

                            }
                        : "",

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
                        text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:"Número Único de Caso: "+ nuc,                 
                        style: 'Titulo', 
                        alignment: 'right',
                        margin: [0, 40, 72, 0] ,
                        absolutePosition: {x: 85, y: 150},                               
                    },      
                    {
                        text:
                        '\n'+titulo+'\n\n\n\n\n',                     
                        style: 'Titulo',
                    },                   
                    {
                        text: html ,                        
                        style: 'Texto',
                    },
                    {
                        text: "\n\nDatos para oír y recibir todo tipo de notificaciones:\n\n" ,                        
                        style: 'Texto',
                    },
                    {   
                        text : html2,
                        style: 'Texto',
                    },
                    tipo == 1?
                    {   
                        text : "\n\n\n\n" +victima +"\n\nVictima\n\n\n\n",
                        style: 'DePara',
                        alignment: 'left'
                    }:"",
                    tipo == 1?
                    {   
                        text : licenciado+ " " +representante+"\n\n"+asesor+"\n\n\n\n",
                        style: 'DePara',
                        alignment: 'right'
                    }:"", 
                    tipo == 2?
                    {   
                        text : "\n\n\n\n" +victima +"\n\nPERSONA SUJETA A INVESTIGACIÓN\n\n\n\n",
                        style: 'DePara',
                        alignment: 'left'
                    }:"",
                    tipo == 2?
                    {   
                        text : representante+"\n\n"+defensor+"\n\n\n\n",
                        style: 'DePara',
                        alignment: 'right'
                    }:"",
                    {
                        text: nombre +"\n\n",   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: puesto +"\n\n",   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: agencia +"\n\n",   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    me.vistaPreviaTF == false? 
                    {
                        image: me.qrCode,
                        width: 200,
                        alignment: 'center',
                        margin: [0, 15, 0, 15]
                    }
                    : "",
                    
                    
                ],
                
                styles: {
                    
                    Adscripcion:{
                        fontSize: 10,
                        bold:true
                    },
                    Fecha:{
                        fontSize: 9,
                    },
                    Nooficio:{
                        fontSize: 8,
                        bold:true
                    },
                    DePara:{
                        fontSize: 10,
                        bold:true  
                    },
                    DeParaCargo:{
                        fontSize: 9,
                        bold:true 
                    },
                    PiePagina:{
                        fontSize: 7,
                        color: 'white'
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true ,
                        alignment:'center'
                    },
                    SubTitulo:{
                        fontSize: 11,
                        semibold:true 
                    },
                    
                }
	
        };

            return dd;
        },
        
    },
        

}
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
.centrado{
    align-content: center
}
</style>
