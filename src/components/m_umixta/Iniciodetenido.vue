<template>  
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Registro con detenido</v-toolbar-title>
                
                <v-divider class="mx-2" inset vertical></v-divider>

                <v-spacer></v-spacer>
                
            </v-toolbar>
            <v-stepper v-model="step" non-linear vertical>

                <v-form ref="form" data-vv-scope="imputado">

                    <v-stepper-step :complete="step > 1" step="1" :rules="[() => !errors.has('imputado.nombre') && !errors.has('imputado.apellido paterno')]">
                        Captura de datos
                        <small>Datos generales del imputado</small>
                    </v-stepper-step>

                    <v-stepper-content step="1">

                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">

                            <v-container grid-list-lg>

                                <v-layout wrap justify-space-between>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                        
                                        <v-radio-group v-model="radios" v-if="switch2==false" row :mandatory="false">
                                            <v-radio label="Fisica" @change="ocultarTP" color="success" value="Fisica"></v-radio>
                                            <v-radio label="Moral" @change="mostrarTP" color="success" value="Moral"></v-radio> 
                                        </v-radio-group>
                                        
                                    
                                        <v-text-field 
                                            name="rfc" 
                                            label="RFC:" 
                                            v-model="rfc"   
                                            v-if="verTP==1">                                          
                                        </v-text-field>

                                        <v-text-field 
                                            name="razón social"   
                                            label="Razón social:" 
                                            v-model="razonsocial"   
                                             v-if="verTP==1"
                                            :counter="200"
                                            :maxlength="200">
                                        </v-text-field>
                                    
                                        <v-text-field 
                                            name="nombre" 
                                            label="*Nombre(s):" 
                                            v-model="nombres"   
                                            v-validate="'required'"
                                            v-if="switch2==false"
                                            data-vv-scope="imputado"
                                            :error-messages="errors.collect('imputado.nombre')">                                          
                                        </v-text-field>

                                        <v-text-field 
                                            name="apellido paterno" 
                                            label="*Apellido paterno:" 
                                            v-model="apaterno" 
                                            v-validate="'required'"
                                            v-if="switch2==false"
                                            :error-messages="errors.collect('imputado.apellido paterno')">                  
                                        </v-text-field>

                                        <v-text-field 
                                            name="apellido materno" 
                                            label="Apellido materno:" 
                                            v-model="amaterno" 
                                            v-if="switch2==false">                       
                                        </v-text-field>

                                        <v-text-field 
                                            name="alias" 
                                            label="Alias:" 
                                            v-model="alias"  
                                            v-if="switch2==false">
                                        </v-text-field>

                                        <v-text-field 
                                        name="fecha de nacimiento" 
                                        label="*Fecha de nacimiento:" 
                                        v-model="fnacimiento" 
                                        type="date"
                                        v-validate="'required'"
                                        v-if="switch2==false && RangoEdadTF == false"
                                        v-on:change="validarEdad" 
                                        :error-messages="errors.collect('fecha de nacimiento')" 
                                    />

                                    <v-switch v-model="RangoEdadTF" :label="'¿Desconoce la fecha de nacimiento? Agregar un rango de edad'"  color="success"  hide-details></v-switch>

                                    <v-autocomplete
                                                    name="rangos"
                                                    :items="rangosedad"
                                                    v-model="rangoedad"
                                                    v-validate="'required'"
                                                    label="*Rango de edad:"
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
                                        
                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                        
                                        <v-autocomplete
                                            name="entidad federativa"
                                            :items="estados"
                                            v-model="abreviacion"
                                            label="Entidad federativa de nacimiento:" 
                                            return-object  
                                            v-if="switch2==false" >
                                        </v-autocomplete> 
                                        
                                        <v-autocomplete 
                                            name="documento de identificación"
                                            :items="docsidentificaciones"
                                            v-model="docidentificacion"
                                            label="Documento de identificación:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>
                                    
                                        <br/>

                                        <v-toolbar color="primary"  dark> 
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
                                                                    <vue-web-cam 
                                                                        ref="webcam"
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
                                            <v-container fluid grid-list-md>
                                                <v-layout row wrap>
                                                    <v-flex class="text-md-center">  
                                                        <img :src="imageUrl" height="150px" />  
                                                        <pdf :src="imageUrl" height="150px" />
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-card>

                                        <v-text-field label="Selecciona la imagen del documento de identificación" @click='pickFile' v-if="switch2==false"  v-model='imageName' prepend-icon='attach_file'></v-text-field>
        
                                        <input
                                            type="file"
                                            style="display: none"
                                            ref="image"
                                            accept="image/*"
                                            @change="onFilePicked">
                                        
                                        <v-text-field name="curp" v-model="curp"  label="CURP:" ></v-text-field> 
                                    
                                        <span>Valida que no exista la duplicidad de la denuncia en otros distritos.</span>

                                        <br/> 
                                        <br/>  
                                        
                                        <v-btn block="" outline color="primary" @click.native="validadduplicidad"  v-if="switch2==false">   Validar que no exista el registro</v-btn> 

                                    </v-flex>
                                           
                                </v-layout>

                                <v-spacer></v-spacer>

                                <div class="text-xs-right">

                                   <!--  <v-btn color="primary"  @click.native="registrarpolicias">Pasar a registro de policias</v-btn> -->
                                    <v-btn color="primary"  @click.native="step = 2">Continuar</v-btn>                             
                                </div>
                                
                            </v-container>                            
                        </v-card>

                    </v-stepper-content>
                    
                    <v-stepper-step :complete="step > 2" step="2" >
                        Información complementaria
                    </v-stepper-step>

                    <v-stepper-content step="2">

                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">

                            <v-container grid-list-lg>

                                <v-layout wrap justify-space-between>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                    
                                        <v-autocomplete 
                                            name="medio de notificación"
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

                                        <v-text-field label="Telefono 1:" v-if="switch2==false" v-model="telefono1"></v-text-field>

                                        <v-text-field label="Telefono 2:" v-if="switch2==false" v-model="telefono2"></v-text-field>

                                        <v-text-field label="Correo electrónico:" v-if="switch2==false" v-model="correo"></v-text-field>

                                        <v-autocomplete 
                                            name="nacionalidad"
                                            :items="nacionalidades"
                                            v-model="nacionalidad" 
                                            label="Nacionalidad:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="estado familiar"
                                            :items="estadosciviles"
                                            v-model="estadocivil" 
                                            label="Estado familiar:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                    </v-flex> 
                                    
                                   
                                    <v-flex  xs12 md6 lg6> 

                                        <v-autocomplete 
                                            name="ocupación"
                                            :items="ocupaciones"
                                            v-model="ocupacion" 
                                            label="Ocupación:"
                                            v-if="switch2==false">
                                        </v-autocomplete>   

                                        <v-autocomplete 
                                            name="nivel de estudios"
                                            :items="nivelestudios"
                                            v-model="nivelestudio" 
                                            label="Nivel de estudios:"
                                            v-if="switch2==false">
                                        </v-autocomplete>

                                        <v-autocomplete 
                                            name="lengua"
                                            :items="lenguas"
                                            v-model="lengua" 
                                            label="Lengua:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="religión"
                                            :items="religiones"
                                            v-model="religion" 
                                            label="Religión:"
                                            v-if="switch2==false">
                                        </v-autocomplete>

                                        <v-autocomplete 
                                            name="género"
                                            :items="generos"
                                            v-model="genero" 
                                            label="Género:"
                                            v-if="presexuales">
                                        </v-autocomplete>

                                        <v-switch v-model="presexuales" v-if="switch2==false" label="¿Desea manifestar sus preferencias sexuales?:" color="success"  hide-details></v-switch>
                                        
                                        <v-switch v-model="switch1" v-if="switch2==false" label="¿Tiene alguna discapacidad?:" color="success"  hide-details></v-switch>
                                        
                                        <v-autocomplete 
                                            name="discapacidad"
                                            :items="discapaciodades"
                                            v-model="discapacidad" 
                                            label="¿Que discapacidad tiene?:" 
                                            v-show="switch1">
                                        </v-autocomplete>
                                         <!--<v-switch 
                                            v-model="registro" 
                                            v-if="switch2==false" 
                                            label="¿Es un tema de personas desaparecidas?:" 
                                            color="success"  
                                            hide-details 
                                        />
                                        <div v-show='registro'>
                                            <v-checkbox
                                                v-model="verR"
                                                color="success"
                                                :label="`Registro nacional de personas desaparecidas o no localizadas`"
                                            />
                                            <v-checkbox
                                                v-model="verI"
                                                color="success"
                                                :label="`Autoriza que la información sea pública con fines de busqueda, localización e identificación`"
                                            />
                                        </div> -->
                                    </v-flex>

                                </v-layout>

                                <div class="text-xs-right">
                                    <v-btn flat @click.native="step = 1">Anterior</v-btn> 
                                    <v-btn color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader"   @click.native="step = 3">Continuar</v-btn>
                                </div>

                            </v-container>

                        </v-card>

                    </v-stepper-content>

                    <v-stepper-step :complete="step > 3"  step="3"    :rules="[() => !errors.has('imputado.calle') && !errors.has('imputado.numero exterior') ]">
                        Dirección personal
                    </v-stepper-step>

                    <v-stepper-content step="3">

                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">

                            <v-container grid-list-lg>

                                <v-layout wrap justify-space-between>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                        
                                        <v-autocomplete
                                            name="tipo vialidad"
                                            :items="vialidades"
                                            v-model="vialidad"
                                            label="Tipo de vialidad:" 
                                        />

                                        <v-text-field 
                                            label="Nombre:" 
                                            name="calle" 
                                            v-model="calle" 
                                            v-if="switch2==false"
                                            data-vv-scope="imputado"
                                            :error-messages="errors.collect('imputado.calle')">
                                        </v-text-field>

                                        <v-text-field 
                                            name="numero exterior" 
                                            label="No. exterior:"
                                            v-model="noExt" 
                                            v-if="switch2==false"
                                            data-vv-scope="imputado"
                                            :error-messages="errors.collect('imputado.numero exterior')">                       
                                        </v-text-field> 

                                        <v-text-field label="No. Interior:" v-if="switch2==false"  v-model="noInt"></v-text-field>

                                        <v-text-field label="Entre calle 1:" v-if="switch2==false"  v-model="entreCalle1"></v-text-field>   

                                        <v-text-field label="Entre calle 2:" v-if="switch2==false" v-model="entreCalle2"></v-text-field> 

                                        <v-text-field label="Referencia:"  v-if="switch2==false" v-model="referencia"></v-text-field>  

                                    </v-flex>  

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6> 

                                        <v-text-field 
                                            label="Pais:" 
                                            name="pais" 
                                            v-model="pais" 
                                            v-if="switch2==false"
                                            value="México">
                                        </v-text-field> 

                                        <v-autocomplete 
                                            label="Estado:" 
                                            name="estado"     
                                            v-model="estadoid"
                                            :items="ciudades"  
                                            v-if="switch2==false"
                                            return-object
                                            v-on:change="listarPorEstado"> 
                                        </v-autocomplete>
                                    
                                        <v-autocomplete 
                                            label="Municipio:" 
                                            name="municipio" 
                                            v-model="municipioid" 
                                            :items="municipios"
                                            v-if="switch2==false"
                                            return-object  
                                            v-on:change="listarPorMunicipio">
                                        </v-autocomplete>

                                        <v-autocomplete 
                                            label="Localidad:" 
                                            name="localidad" 
                                            v-model="localidadid" 
                                            :items="localidades" 
                                            v-if="switch2==false"
                                            return-object
                                            v-on:change="listarPorLocalidad">
                                        </v-autocomplete>

                                        <v-autocomplete
                                            name="tipo asentamiento"
                                            :items="asentamientos"
                                            v-model="asentamiento"
                                            label="Tipo de asentamiento:" 
                                        />

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
                                                    disabled>
                                                </v-text-field> 
                                            </v-flex>

                                            <v-flex  xs6 md6 lg6>
                                                <v-text-field 
                                                    v-model="lng"
                                                    label="Longitud:" 
                                                    disabled>
                                                </v-text-field> 
                                            </v-flex>

                                        </v-layout>
                                        
                                        <v-btn block="" v-if="switch2==false" @click.native="btn_geoloc2" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn>
                                    
                                    </v-flex> 
                                
                                </v-layout>

                                <div class="text-xs-right">

                                    <v-btn flat @click.native="step = 2">Anterior</v-btn> 
                                    <v-btn color="primary"  @click.native="step = 4" :disabled='clikeado'>Continuar</v-btn>  
                                    
                                </div> 

                            </v-container>
                        
                        </v-card> 
                        
                    </v-stepper-content>

                </v-form>

                <v-form ref="form" data-vv-scope="policia">
                    
                <v-stepper-step :complete="step > 4"  step="4"    :rules="[() => !errors.has('policia.nombre') && !errors.has('policia.apellido paterno')&& !errors.has('policia.apellido materno')&& !errors.has('policia.institucíon') ]">
                    Registro de policias
                </v-stepper-step>

                <v-stepper-content step="4">

                    <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">

                        <v-container grid-list-lg>

                            <v-layout wrap justify-space-between>

                                <v-flex class="espaciado" xs12 sm12 md6 lg6> 

                                    <v-text-field 
                                        name="nombre" 
                                        label="*Nombre(s):" 
                                        v-model="nombrep"   
                                        v-validate="'required'"
                                        data-vv-scope="policia"
                                        :error-messages="errors.collect('policia.nombre')">                                  
                                    </v-text-field>

                                    <v-text-field 
                                        name="apellido paterno" 
                                        label="*Apellido paterno:" 
                                        v-model="apaternop" 
                                        v-validate="'required'"
                                        data-vv-scope="policia"
                                        :error-messages="errors.collect('policia.apellido paterno')">                    
                                    </v-text-field>

                                </v-flex> 

                                <v-flex class="espaciado" xs12 sm12 md6 lg6  >

                                    <v-text-field 
                                        name="apellido materno" 
                                        label="*Apellido materno:" 
                                        v-model="amaternop"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('policia.apellido materno')">                      
                                    </v-text-field>

                                    <v-select 
                                        name="institucíon"  
                                        :items="instituciones"
                                        v-model="institucion" 
                                        v-validate="'required'" 
                                        label="*Institución:"
                                        data-vv-scope="policia"
                                        :error-messages="errors.collect('policia.institucíon')">
                                    </v-select>

                                </v-flex>

                                <v-flex class="espaciado" xs12 sm12 md12 lg12  >
                                    <v-text-field 
                                        name="informe policial" 
                                        label="*Informe policial:" 
                                        v-model="informep"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('policia.informe policial')">                      
                                    </v-text-field>
                                </v-flex>

                            </v-layout>

                            <div class="text-xs-right">

                                 <v-btn color="primary" @click.native="step = 3">Anterior</v-btn> 
                                <v-btn color="primary"  @click.native="guardar" :disabled='clikeadof'>Finalizar registro</v-btn>  
                                
                            </div> 

                        </v-container>
                    
                    </v-card> 
                    
                </v-stepper-content>  

                </v-form>

            </v-stepper>
          
        <v-dialog v-model="ticketModal" >
            <v-card>
                <v-card-text>
                     <iframe id="iframepdf" type="application/pdf"></iframe>
                </v-card-text>
            </v-card>
        </v-dialog>

        
        <v-dialog v-model="modalduplicidad" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card>

                <v-toolbar dark color="primary">
               
                    <v-toolbar-title>Información  general de los registros que ha tenido la persona.</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-items>
                    
                        <v-btn icon   @click="cerrarModalDuplicidad">
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
                        :pagination.sync="pagination">

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
                        <v-btn  color=success text @click.native="guardarGeolocalizacion()">GUARDAR</v-btn>
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
                                    @place_changed="setPlace"  >
                                </gmap-autocomplete>

                                <v-btn  outline color="primary" @click="addMarker">    BUSCAR</v-btn>
    
                                <br>

                                <gmap-map
                                    :center="center"
                                    :zoom="17"
                                    style="width:100%;  height: 700px;">
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


        <v-dialog  v-model="dialog1"  max-width="500px"> 
                    
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="40">
                        <v-icon class="grey lighten-2">report_problem</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">Notificación</v-toolbar-title>
                    <v-spacer></v-spacer> 
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap  >
                                <v-flex xs12 sm12 md12 class="text-md-center">
                                    <p class="headline">La victima es menor de edad por favor envie este caso a Atención Especializada para Adolecentes</p>
                                    <br> 
                                    <v-icon style="font-size: 80px;" >pan_tool</v-icon> 
                                    <br> 
                                </v-flex>                                      
                            </v-layout>
                        </v-container> 
                        <br>
                        <v-card-actions>
                        <v-spacer></v-spacer>  
                            <v-btn @click.native="enviarAEPA" class="success" >Aceptar</v-btn>
                        </v-card-actions>
                    </v-form>             
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
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas' 
  import { REPL_MODE_SLOPPY } from 'repl';
  import moment from 'moment'
  import 'moment/locale/es';
  import n401 from './401.vue'
  import n403 from './403.vue'
  import pdf from 'vue-pdf'
  import { error } from 'util';
  import { generarTokenCoodenadas } from './crearTokenCoordenadas';

  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
     
    components: {
        "vue-web-cam": WebCam,
        n401,
        n403,
        pdf
    },
    data: () => ({  
        clikeado: false,
        clikeadof: false,
        modalduplicidad:false, 
        idPersona:0,
        hechos:[],
        headers: [ 
            { text: 'Atendio', value: 'registradoPor' }, 
            { text: 'Distrito', value: 'distritoInicial' }, 
            { text: 'Dirección o Subprocuraduria', value: 'dirSubProcuInicial' }, 
            { text: 'Agencia', value: 'agenciaInicial' }, 
            { text: 'Fecha de registro', value: 'fechaHoraRegistro',  },  
            { text: 'Clasificación persona', value: 'clasificacionPersona',  },  
            { text: 'RAC', value: 'rac',  },    
            { text: 'NUC', value: 'nuc',  },                                 
        ],
         search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        dialog: false, 
        dialog1: false, 
        verTP:0,
        ticketModal:0,
        WebCam:{},
      
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null, 
        lat:'',
        lng:'',

        step:1, 
        //********************************/
        //CAPTURA DE DATOS
        radios: 'Fisica',
        rfc:'',
        razonsocial:'',
        clasificacionpersona:'',
        clasificacionpersonas:[], 

        docidentificacion:'',
        docsidentificaciones:[], 

        sexo:'',
        sexos:[], 

        rangoedad:'',
        policias:[],
        rangosedad:[],
        RangoEdadTF:false,

        registro: false,
        verR: false,
        verI: false,
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
        edad:'',
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

        discapacidad:'',
        discapaciodades:[],
        numerooficio:'',
        ratencioncontrol:'',
        nombrep:'',
        amaternop:'',
        apaternop:'',
        instituciones:[],
        institucion:'',
        informep:'',
        // DIRECCION PERSONAL
        
        noExt:'',
        noInt:'',
        entreCalle1:'',
        entreCalle2:'',
        referencia:'',
        pais:'Mexico',
        vialidad:'',
        vialidades:[],
        asentamiento:'',
        asentamientos:[],
        

        cp:'', 

        message: 'no message',
        first_request: 'no request',
        second_request: 'no request',
        modalGeolocalizacion:0,

        rac:'',
        racid:'',
        datosprotegidos:false,
        ruta:'',
        presexuales:false,
        //-----------------------------------

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
        edadf:'',
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
        video: {},
        GUID:'',
        showpage:true,
        e401:false,
        e403:false,


        statusActualizar:false,
    }),
    mounted() {
        this.geolocate();
    },
    created () {
        this.u_iddistrito=this.$store.state.usuario.iddistrito;
        this.u_distrito=this.$store.state.usuario.distrito;
        this.u_dirSubPro=this.$store.state.usuario.dirSubProc;
        this.u_idagencia=this.$store.state.usuario.idagencia;
        this.u_agencia=this.$store.state.usuario.agencia;
        this.u_idmoduloservicio=this.$store.state.usuario.idmoduloservicio;
        this.u_modulo=this.$store.state.usuario.modulo;
        this.u_idusuario=this.$store.state.usuario.idusuario;
        this.u_nombre=this.$store.state.usuario.usuario;
        this.u_clave=this.$store.state.usuario.clave;
        this.u_rol=this.$store.state.usuario.rol;
        this.u_puesto=this.$store.state.usuario.puesto;
        this.u_subproc=this.$store.state.usuario.subProc;
        // DATOS GENERALES
        this.listarTipoPersona();
        this.listarSexo();
        this.listarRangoEdad();
        this.listarIdentificacion();
        this.listarEstados();
        // INFORMACION COMPLEMENTARIA
        this.listarMedionotificacion();
        this.listarNacionalidad();
        this.listarEstadoCivil();
        this.listarGenero();
        this.listarOcupacion();
        this.listarNivelEstudio();
        this.listarLengua();
        this.listarReligion();
        this.listarDiscapacidad();
        this.listarInstituciones();
        // DIRECCION PERSONAL
        this.listarVialidad();
        this.listarAsentamiento();
        this.listarCiudades();
       
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
        doSomething: function() {
            if(this.clikeado) {
                return;
            }
            this.clikeado = true;
        },
        doSomethingf: function() {
            if(this.clikeadof) {
                return;
            }
            this.clikeadof = true;
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
            this.lat = this.center.lat;
            this.lng = this.center.lng;
            this.modalGeolocalizacion=0;
      
        },
        mostrarTP(){
            this.verTP=1;
        },
        ocultarTP (){
            this.verTP=0;
        },
        limpiar(){    
            //-----------------------------------
            this.statusActualizar=false;
            this.lngaux = '';
            this.lataux = '';
            //---------------------------------
            this.statusActualiza=false;
            this.idPersona=0;
            //************************************************************* */
            //step no 1
            this.switch2= false,
            this.radios= 'Fisica';
            this.verTP=0;
            this.rfc="";
            this.razonsocial="";
            this.clasificacionpersona="";
            this.nombres="";
            this.apaterno="";
            this.amaterno="";
            this.alias="";
            this.fnacimiento="";
            this.rangoedad = '';
            this.RangoEdadTF = false;
            this.sexo="";
            this.abreviacion="";
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
            this.ruta='';
            //************************************************************* */
            //step no3
            this.vialidad="";
            this.calle="";
            this.noInt="";
            this.noExt="";
            this.entreCalle1="";
            this.entreCalle2="";
            this.referencia="";
            this.pais="Mexico";
            this.estadoid="";
            this.municipioid="";
            this.localidadid=""; 
            this.asentamiento="";
            this.cp=""; 
            this.$validator.reset();
            this.step=1;
            this.datosprotegidos = false;
            this.markers= [];
            this.places= [];
            this.lat = '';
            this.lng = '';
            this.edadf = ''
            //------------------------------------------------------------------
            
        },
        limpiar2(){
            this.nombrep = ""
            this.apaternop = ""
            this.amaternop= ""
            this.institucion = ""
            this.informep = ""
        },
        // STEP 1 CAPTURA DE DATOS
        validarEdad(){
           // debugger
            let me = this;
            var date = moment(me.fnacimiento, 'DD/MM/YYYY');
            me.edad = moment().diff(date, 'years',false);

            if (me.edad < 18){
              if (me.clasificacionpersona==='Victima directa'){
                     me.dialog1 = true;
              }
            }
        },
        enviarAEPA(){
            let me = this;
            me.dialog1 = false; 

        },
        listarTipoPersona(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var clasificacionpersonaArray=[];
            this.$conf.get('api/ClasificacionPersonas/Listar',configuracion).then(function(response){
                //console.log(response.data);
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
        //ESTA FUNCION LLAMA A LA API PARA LISTAR LOS RANGOS DE EDADES
        listarRangoEdad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var edadesArray=[];
            this.$conf.get('api/Rangoedad/Listar',configuracion).then(function(response){
                //console.log(response.data);
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
        generarcurp(){
            let me=this;
            var str = me.fnacimiento;
            var res = str.split("/"); 
            var curpstr = curp({
                nombre: me.nombres,
                apellido_paterno: me.apaterno,
                apellido_materno: me.amaterno,
                sexo: me.sexo,
                estado: me.abreviacion.value, 
                fecha_nacimiento: res
            }); 
            
            this.curp = curpstr; 
            
            
            

        },  
        validadduplicidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$cat.get('api/Personas/BuscarPersonaNombreApellidoPa/' + me.nombres + '/' + me.apaterno ,configuracion).then(function(response){

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
                me.vialidad=response.data.tipoVialidad;
                me.asentamiento=response.data.tipoAsentamiento;
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
        listarRAtencioPersona(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var registrosArray=[]; 
            this.$cat.get('api/RAPs/ListarRegistroPorPersona/'+ me.idPersona,configuracion).then(function(response){
                
                registrosArray=response.data;
 
                for (let i in registrosArray) {
                    var ratencionid = registrosArray[i].rAtencionId  ;
                     var clasificacionpersona = registrosArray[i].clasificacionPersona;
               
                     this.$cat.get('api/RHechoes/ListarPorrAtencionId/'+ ratencionid,configuracion).then(function(response){
                          
                         me.statusActualizar=true;
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
        listarVialidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Vialidades/Listar',configuracion).then(function(response){
                response.data.forEach(x => {
                    const item = {text: x.nombre, value: x.clave};
                    me.vialidades.push(item);
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
        listarAsentamiento(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Asentamiento/Listar',configuracion).then(function(response){
                response.data.forEach(x => {
                    const item = {text: x.nombre, value: x.clave};
                    me.asentamientos.push(item);
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
        listarOcupacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ocupacionArray=[]; 
            this.$conf.get('api/Ocupacions/Listar',configuracion).then(function(response){
                //console.log(response);
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
                //console.log(response);
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
                //console.log(response);
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
                //console.log(response);
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
                //console.log(response);
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
                me.municipio = '';
                me.municipioid = '';
                me.localidad = '';
                me.localidadid = '';
                me.cp = '';
            }
                var municipiosArray=[];
                me.municipios.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.estadoid,configuracion).then(function(response){
                
                    municipiosArray=response.data;
                
                    municipiosArray.map(function(x){
                    me.municipios.push({text: x.nombre,value: x.idMunicipio});  
                    }); 
                   if (me.idPersona > 0){
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
                me.localidad = '';
                me.localidadid = '';
                me.cp = '';
            } else if (!me.municipioid) {
                return;
            }

            var localidadArray=[];
            me.localidades.length = 0;
            this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioid,configuracion).then(function(response){
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.localidades.push({text: x.nombre,value: x.idLocalidad});     
                });
                 if (me.idPersona > 0){
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
            if (!me.localidadid.value == 0) {
                me.localidad = me.localidadid.text;
                me.localidadid = me.localidadid.value;
            } else if (!me.localidadid) {
                return;
            }
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
        


        //--------------------------------------------------------------------
        btn_geoloc2(){
            
            if(this.estado !='' && this.municipio != '' && this.localidad != '' && this.calle != ''){
                if(this.lat == '' && this.lng == ''){
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                    this.lugar = this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado
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
            geocoder.geocode( { 'address': this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado}, function(results, status) {
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
        generaredad(){
            var date = moment(this.fnacimiento, 'DD/MM/YYYY');
            return moment().diff(date, 'years',false);
        },
        guardar(){
             //****************************************************************************** */
            
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

/*---------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------*/
            var listaMediosNotificacion='';
            if(me.medionotificacion.length<=0)
            {
                listaMediosNotificacion='';
            }
            else
            {
                me.medionotificacion.forEach(function(notificacion)
                {
                    listaMediosNotificacion+=notificacion.text+',';                                     
                });
                listaMediosNotificacion = listaMediosNotificacion.slice(0, -1);
            }    
/*---------------------------------------------------------------------------------------------------------*/

                    if(me.amaterno == '') me.amaterno = 'LO DESCONOCE'
                    if(me.sexo == '') me.sexo = 'LO DESCONOCE'
                    if(me.curp == '') me.curp = 'LO DESCONOCE'
                    if(me.alias == '') me.alias = 'LO DESCONOCE'
                    if(me.abreviacion == '') me.abreviacion = 'LO DESCONOCE'
                    if(me.docidentificacion == '') me.docidentificacion = 'LO DESCONOCE'

/*---------------------------------------------------------------------------------------------------------*/

            this.$validator.validateAll('imputado').then(async result => {
                if (result) {

                    // Se crean las coordenadas cuando el estado tiene algo
                    if(this.estado != '') {
                        await this.generarCoordenadas();
                    }                    

                    //ARREGLA LA FECHA PARA QUE SE GUARDEN CON /
                    const fechaParts = me.fnacimiento.split('-');
                        const dia = fechaParts[2];
                        const mes = fechaParts[1];
                        const anio = fechaParts[0];
                        me.fnacimiento = `${dia}/${mes}/${anio}`;
                        //direccionvacia.includes('null') == true

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
                        me.datosprotegidos = true;
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

                        if(me.edadf == 99 && me.rangoedad == '')
                            me.rangoedad = 'LO DESCONOCE'

                        if(me.edadf >= 100)
                            me.rangoedad = 'ADULTOS MAYORES (MAS DE 60 AÑOS)'

                        var idPoliciaDetuvo='';
                        idPoliciaDetuvo = '00000000-0000-0000-0000-000000000000';


                           
                    if(me.ratencioncontrol == ""){
                 
                        this.doSomething()

                        this.$cat.post('api/Racs/GenerarRac',{
                            'distritoId': me.u_iddistrito,
                            'agenciaId': me.u_idagencia, 
                        },configuracion).then(function(response){ 
                            me.rac = response.data.rac;
                            me.racid =  response.data.idrac;
                            if (me.statusActualizar==true)
                                {
                                    if(me.lat =='')
                                    me.lat = 0;
                                    if(me.lng =='')
                                    me.lng = 0;

                                    this.$cat.post('api/RAPs/CrearRAP',{
                                        'distritoInicial': me.u_distrito,  
                                        'dirSubProcuInicial': me.u_dirSubPro,
                                        'agenciaInicial': me.u_agencia, 
                                        'agenciaId': me.u_idagencia,
                                        'racId':me.racid,  
                                        'personaId': me.idPersona, 
                                        'clasificacionpersona': me.clasificacionpersona,
                                        'pInicio': true,
                                        'modulo':me.u_modulo,
                                    },configuracion).then(function(response){ 
                                    
                                        var rac = "RAC: " +   me.rac 
                                        var fechahora = response.data.fh
                                        var notu = "A-" + response.data.notu

                                        this.$cat.put('api/Personas/Actualizar',{
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
                                            'PoliciaDetuvo' : idPoliciaDetuvo,
                                            'rangoEdad': me.rangoedad,
                                            'rangoEdadTF': me.RangoEdadTF,
                                            'fechaNacimiento' : me.fnacimiento,
                                            'entidadFederativa': me.abreviacion.text,
                                            'docIdentificacion': me.docidentificacion,
                                            'curp': me.curp,
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
                                            'tipoDiscapacidad': me.discapacidad, 
                                            'Edad': me.edadf, 
                                            //Direccion personal
                                            'tipoVialidad': me.vialidad,
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
                                            'tipoAsentamiento': me.asentamiento,
                                            'cp': me.cp,
                                            'lat': me.lat,
                                            'lng':me.lng,
                                        },configuracion).then(function(response){
                                            me.$notify('La información se guardo correctamente !!!','success') 
                                            //this.ticketModal=1;
                                        
                                            var doc = new jsPDF('p', 'mm', [200,200]);
                                            doc.setFontStyle("bold");
                                            doc.setFontSize(16);
                                            doc.text(40, 5, 'Bienvenido','center');
                                            doc.setFontStyle("normal");
                                            doc.setFontSize(12);
                                            doc.text(fechahora, 40, 15,'center');
                                            doc.setFontSize(10);
                                            doc.text(40, 25, rac, 'center'); 
                                            doc.text('Usted sera atendido con el turno:', 40, 35,'center');
                                            doc.setFontSize(35);
                                            doc.text(notu, 40, 50,'center');
                                            doc.setFontStyle("normal");
                                            doc.setFontSize(10);
                                            doc.text(40, 60, 'Hidalgo crece contigo', 'center'); 
                                            doc.autoPrint();
                                            var iframe = document.getElementById('iframepdf');
                                            iframe.src = doc.output('bloburl');
                                            //window.open(doc.output('bloburl'), '_blank');  
                                        
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

                                    if (me.imageFile){
                                        let formData = new FormData();  
                                        formData.append('file', me.imageFile );
                                        var nombreCarpeta = me.rac; 
                                        me.GUID = me.generateUUID();

                                        this.$cat.post('api/RAtencions/Post/'+nombreCarpeta+'/'+me.GUID,
                                            formData,
                                            {
                                            headers: {
                                                        'Content-Type': 'multipart/form-data'
                                                    } 
                                            }  
                                                
                                            ).then(function(response){
                                                console.log('SUCCESS!!');
                                                me.ruta = response.data.ruta

                                                if(me.cp =='')
                                                me.cp = 0
                                                if(me.curp == '')
                                                me.curp =0
                                                if(me.lat =='')
                                                me.lat =0
                                                if(me.lng == '')
                                                me.lng=0
                                                if(me.noInt == '')
                                                me.noInt = 0
                                                if(me.telefono1 == '')
                                                me.telefono1 = 0
                                                if(me.telefono2 == '')
                                                me.telefono2 = 0


                                                this.$cat.post('api/RAtencions/CrearSinTurno',{
                                                //***************************** REGISTRO DE ATENCION*/                                   
                                                    'distritoInicial': me.u_distrito,  
                                                    'agenciaInicial': me.u_agencia,
                                                    'dirSubProcuInicial': me.u_dirSubPro,
                                                    'agenciaId': me.u_idagencia,
                                                    'racId':me.racid,
                                                    'pInicio': true,
                                                    'Numerooficio': 0,
                                                    'MedioDenuncia': "Con detenido",
                                                    //***************************** PERSONA*/  
                                                    'statusAnonimo': me.switch2,
                                                    'tipoPersona': me.radios,
                                                    'rfc': me.rfc,
                                                    'razonsocial': me.razonsocial, 
                                                    'clasificacionpersona': "Imputado",
                                                    'nombre': me.nombres,
                                                    'apellidoPaterno' : me.apaterno,
                                                    'apellidoMaterno' : me.amaterno,
                                                    'alias': me.alias,
                                                    'statusAlias': false,
                                                    'PoliciaDetuvo' : idPoliciaDetuvo,
                                                    'rangoEdad': me.rangoedad,
                                                    'rangoEdadTF': me.RangoEdadTF,
                                                    'fechaNacimiento' : me.fnacimiento,
                                                    'entidadFederativa': me.abreviacion.text,
                                                    'docIdentificacion': me.docidentificacion, 
                                                    'curp': me.curp,
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
                                                    'tipoDiscapacidad': me.discapacidad, 
                                                    'DatosProtegidos': me.datosprotegidos, 
                                                    'Edad': me.edadf,
                                                    'InicioDetenido': true,
                                                    //***************************** DIRECCION*/ 
                                                    'tipoVialidad': me.vialidad,
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
                                                    'tipoAsentamiento': me.asentamiento,
                                                    'cp': me.cp,
                                                    'lat': me.lat,
                                                    'lng': me.lng,
                                                    //************************************ */
                                                    'agencia': me.u_agencia,
                                                    'usuario':me.u_nombre,
                                                    'puesto':me.u_puesto,
                                                    'modulo':me.u_modulo
                                                //************************************ */
                                                
                                            },configuracion).then(function(response){   
                                                
                                                me.$notify('La información se guardo correctamente !!!','success') 
                                                var personaIdGenerado = response.data.personaid;
                                            
                                                this.$cat.post('api/DocumentosPesonas/Crear',{

                                                    'PersonaId': response.data.personaid, 
                                                    'tipoDocumento': me.docidentificacion,
                                                    'nombreDocumento':me.GUID,
                                                    'descripcion': "",
                                                    'ruta': me.ruta,
                                                    'distrito':me.u_distrito,
                                                    'dirSubProc':me.u_dirSubPro,    
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
                                                
                                                me.ratencioncontrol = response.data.idatencion
                                                me.crearegistrarpolicias2(personaIdGenerado);
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
                                                    me.$notify('Error al intentar crear el  registro!!!','error')  
                                                } 
                                            });

                                            })
                                                .catch(function(){
                                                console.log('FAILURE2!!');
                                            }); 
                                    }else{

                                        if(me.cp =='')
                                        me.cp = 0
                                        if(me.curp == '')
                                        me.curp =0
                                        if(me.lat =='')
                                        me.lat =0
                                        if(me.lng == '')
                                        me.lng=0
                                        if(me.noInt == '')
                                        me.noInt = 0
                                        if(me.telefono1 == '')
                                        me.telefono1 = 0
                                        if(me.telefono2 == '')
                                        me.telefono2 = 0

                                        this.$cat.post('api/RAtencions/CrearSinTurno',{
                                        //***************************** REGISTRO DE ATENCION*/                                   
                                            'distritoInicial': me.u_distrito,  
                                            'agenciaInicial': me.u_agencia,
                                            'dirSubProcuInicial': me.u_dirSubPro,
                                            'agenciaId': me.u_idagencia,
                                            'racId':me.racid,
                                            'pInicio': true,
                                            'Numerooficio': 0,
                                            'MedioDenuncia': "Con detenido",
                                            //***************************** PERSONA*/  
                                            'statusAnonimo': false,
                                            'tipoPersona': me.radios,
                                            'rfc': me.rfc,
                                            'razonsocial': me.razonsocial, 
                                            'clasificacionpersona': "Imputado",
                                            'nombre': me.nombres,
                                            'apellidoPaterno' : me.apaterno,
                                            'apellidoMaterno' : me.amaterno,
                                            'alias': me.alias,
                                            'statusAlias': false,
                                            'PoliciaDetuvo' : idPoliciaDetuvo,
                                            'rangoEdad': me.rangoedad,
                                            'rangoEdadTF': me.RangoEdadTF,
                                            'fechaNacimiento' : me.fnacimiento,
                                            'entidadFederativa': me.abreviacion.text,
                                            'docIdentificacion': me.docidentificacion, 
                                            'curp': me.curp,
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
                                            'tipoDiscapacidad': me.discapacidad, 
                                            'DatosProtegidos': me.datosprotegidos,
                                            'Edad': me.edadf,  
                                            'InicioDetenido': true,                            
                                            //***************************** DIRECCION*/ 
                                            'tipoVialidad': me.vialidad,
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
                                            'tipoAsentamiento': me.asentamiento,
                                            'cp': me.cp,
                                            'lat': me.lat,
                                            'lng': me.lng,
                                            //************************************ */
                                            'agencia': me.u_agencia,
                                            'usuario':me.u_nombre,
                                            'puesto':me.u_puesto,
                                            'modulo':me.u_modulo
                                        //************************************ */
                                        
                                    },configuracion).then(function(response){   
                                        
                                            me.$notify('La información se guardo correctamente !!!','success') 
                                            var personaIdGenerado = response.data.personaid;
                                            
                                            me.ratencioncontrol = response.data.idatencion
                                            me.limpiar();
                                            me.crearegistrarpolicias2(personaIdGenerado);
                                            //me.crearegistrarpolicias();
                                            me.pasarentrevista();                                                
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


                        if (me.imageFile){

                                let formData = new FormData();  
                                formData.append('file', me.imageFile );
                                var nombreCarpeta = me.rac; 
                                me.GUID = me.generateUUID();

                                this.$cat.post('api/RAtencions/Post/'+nombreCarpeta+'/'+me.GUID,
                                    formData,
                                    {
                                    headers: {
                                                'Content-Type': 'multipart/form-data'
                                            } 
                                    }  
                                        
                                    ).then(function(response){
                                        console.log('SUCCESS!!');
                                        me.ruta = response.data.ruta

                                        if(me.cp =='')
                                        me.cp = 0
                                        if(me.curp == '')
                                        me.curp =0
                                        if(me.lat =='')
                                        me.lat =0
                                        if(me.lng == '')
                                        me.lng=0
                                        if(me.noInt == '')
                                        me.noInt = 0
                                        if(me.telefono1 == '')
                                        me.telefono1 = 0
                                        if(me.telefono2 == '')
                                        me.telefono2 = 0


                                        this.$cat.post('api/RAPs/CrearImputado',{
                                        //***************************** REGISTRO DE ATENCION*/                                   
                                            'rAtencionId': me.ratencioncontrol, 
                                            'clasificacionpersona': "Imputado",
                                            'pInicio': false,
                                            
                                            'statusAnonimo': false,
                                            'tipoPersona': me.radios,
                                            'rfc': me.rfc,
                                            'razonsocial': me.razonsocial, 
                                        
                                            'nombre': me.nombres,
                                            'apellidoPaterno' : me.apaterno,
                                            'apellidoMaterno' : me.amaterno,
                                            'alias': me.alias,
                                            'statusAlias': false,
                                            'PoliciaDetuvo' : idPoliciaDetuvo,
                                            'rangoEdad': me.rangoedad,
                                            'rangoEdadTF': me.RangoEdadTF,
                                            'fechaNacimiento' : me.fnacimiento,
                                            'entidadFederativa': me.abreviacion.text,
                                            'docIdentificacion': me.docidentificacion,
                                            'curp': me.curp,
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
                                            'tipoDiscapacidad': me.discapacidad, 
                                            'DatosProtegidos': me.datosprotegidos,
                                            'InicioDetenido': true,
                                            //***************************** DIRECCION PERSONAL */ 
                                            'tipoVialidad': me.vialidad,
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
                                            'tipoAsentamiento': me.asentamiento,
                                            'cp': me.cp,
                                            'lat': me.lat,
                                            'lng': me.lng,

                                        
                                    },configuracion).then(function(response){   
                                        
                                        me.$notify('La información se guardo correctamente !!!','success') 

                                    
                                        this.$cat.post('api/DocumentosPesonas/Crear',{

                                            'PersonaId': response.data.personaid, 
                                            'tipoDocumento': me.docidentificacion,
                                            'nombreDocumento':me.GUID,
                                            'descripcion': "",
                                            'ruta': me.ruta,
                                            'distrito':me.u_distrito,
                                            'dirSubProc':me.u_dirSubPro,    
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
                                            me.$notify('Error al intentar crear el  registro!!!','error')  
                                        } 
                                    });

                                    })
                                        .catch(function(){
                                        console.log('FAILURE2!!');
                                    }); 
                            }else{

                                if(me.cp =='')
                                me.cp = 0
                                if(me.curp == '')
                                me.curp =0
                                if(me.lat =='')
                                me.lat =0
                                if(me.lng == '')
                                me.lng=0
                                if(me.noInt == '')
                                me.noInt = 0
                                if(me.telefono1 == '')
                                me.telefono1 = 0
                                if(me.telefono2 == '')
                                me.telefono2 = 0

                                this.$cat.post('api/RAPs/CrearImputado',{
                                //***************************** REGISTRO DE ATENCION*/                                   
                                    'rAtencionId': me.ratencioncontrol, 
                                    'clasificacionpersona': "Imputado",
                                    'pInicio': false,
                                    
                                    'statusAnonimo': false,
                                    'tipoPersona': me.radios,
                                    'rfc': me.rfc,
                                    'razonsocial': me.razonsocial, 
                                
                                    'nombre': me.nombres,
                                    'apellidoPaterno' : me.apaterno,
                                    'apellidoMaterno' : me.amaterno,
                                    'alias': me.alias,
                                    'statusAlias': false,
                                    'PoliciaDetuvo' : idPoliciaDetuvo,
                                    'rangoEdad': me.rangoedad,
                                    'rangoEdadTF': me.RangoEdadTF,
                                    'fechaNacimiento' : me.fnacimiento,
                                    'entidadFederativa': me.abreviacion.text,
                                    'docIdentificacion': me.docidentificacion,
                                    'curp': me.curp,
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
                                    'tipoDiscapacidad': me.discapacidad, 
                                    'DatosProtegidos': me.datosprotegidos,
                                    'InicioDetenido': true,
                                    //***************************** DIRECCION PERSONAL */ 
                                    'tipoVialidad': me.vialidad,
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
                                    'tipoAsentamiento': me.asentamiento,
                                    'cp': me.cp,
                                    'lat': me.lat,
                                    'lng': me.lng,

                                
                            },configuracion).then(function(response){   
                                
                                me.$notify('La información se guardo correctamente !!!','success') 

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
                                        me.$notify('Error al intentar crear el  registro!!!','error')  
                                    } 
                                });

                            }



                    }
               } 
            }) 
            //****************************************************************************** */ 
        },
        registrarpolicias(){
            if(this.ratencioncontrol == ""){
                this.$notify('Debe registrar al menos un imputado','error')
            }else
                this.step = 4
        },
        crearegistrarpolicias2(personaIdGenerado){
            this.$validator.validateAll("policia").then(result => {
                if (result) { 
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};

                    var policiaVacio = '00000000-0000-0000-0000-000000000000'

                    this.$cat.post('api/RAPs/CrearPoliciaEdit',{

                        'PersonaId': personaIdGenerado,                  
                        'RAtencionId':me.ratencioncontrol,                                
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

        pasarentrevista(){
            this.doSomethingf()
            if(this.ratencioncontrol != ""){

                this.$store.state.ratencionid = this.ratencioncontrol
                this.$router.push('./umixta-entrevista2')

            }else
                this.$notify('Debe registrar al menos un imputado','error')         

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
		    } 
        },
        
       async generarCoordenadas() 
        {
            let tokenData = this.$store.state.tokenCoordenadas;

            
            if (!tokenData || !tokenData.token || Date.now() > tokenData.expirationTime) 
            {
            await generarTokenCoodenadas(this.$store);
            tokenData = this.$store.state.tokenCoordenadas;
            }

            // Si sigue sin token, abortamos coordenadas pero sin interrumpir
            if (!tokenData || !tokenData.token) {
                this.lat = '';
                this.lng = '';
                return;
            }
            
        try 
        {
            // Consultamos la api para generar coordenadas
            const responseCoordenadas = await axios.post('https://apis-backend.pgjhidalgo.gob.mx/latLon/getLocation',
            {
                id_user: tokenData.idUsuario,
                street:(this.localidad !== '' ? this.calle : ''),
                num: (this.localidad !== '' ? this.noExt : ''),
                suburb: this.localidad || '',
                zip: (this.localidad !== '' ? this.cp : ''),
                city: this.municipio || '',
                state: this.estado || '',
                systemName: tokenData.systemName,
            },
            {
                headers: {
                Authorization: `Bearer ${tokenData.token}`,
                'Content-Type': 'application/json',
                },
            }
            );

            this.lat = responseCoordenadas.data.latitude || '';
            this.lng = responseCoordenadas.data.longitude || '';
        } catch (error) 
        {
            this.lat = '';
            this.lng = '';
            this.$notify('Hubo un problema al generar las coordenadas, inténtelo más tarde', 'warning');
        }
        }
   }
</script>
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
</style>
