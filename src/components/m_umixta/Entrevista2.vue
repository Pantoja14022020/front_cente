<template> 
 
    <v-layout row wrap>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage" elevation-2>
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Entrevista.</v-toolbar-title> 
                <v-divider class="mx-2" inset vertical></v-divider>

                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 
                <v-spacer></v-spacer> 

                <v-tooltip v-if="rAtencionId!= ''" bottom>
                    <template v-slot:activator="{ on }"> 
                        <v-btn class="mx-2" slot="activator" v-on="on" @click="dialog1 = true" fab dark small  >
                            <v-icon dark>report_problem</v-icon>
                        </v-btn>
                    </template>
                    <span>Solicitud de servicio para medidas de contención</span>
                </v-tooltip>


                <v-dialog   v-model="dialog1"  max-width="900px"> 
                
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar  size="40">
                                <v-icon class="grey lighten-2">report_problem</v-icon>
                            </v-avatar> 
                    <v-toolbar-title class="subheading">Solicitud de servicio para medidas de contención</v-toolbar-title>
                    <v-spacer></v-spacer>
                
                    
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap  >
                                <v-flex xs12 sm12 md12 class="text-md-center">
                                    <p class="headline" v-if="!sirequirio">¿Requiere medidas de contención para el imputado?</p>
                                    <v-icon v-if="!sirequirio" style="font-size: 80px;" >pan_tool</v-icon> 

                                    <v-select name="servicio requerido"   
                                        v-if="sirequirio"
                                        :items="tiposrec"
                                        v-model="tiporec" 
                                        v-validate="'required'" 
                                        label="*Servicio requerido:"
                                        :error-messages="errors.collect('servicio requerido')">
                                    </v-select> 

                                    <v-card v-if="sirequirio" elevation="0"  >
                                        <v-card-title class="accent" ><h3>Texto del documento</h3></v-card-title>
                                            <v-divider ></v-divider>
                                            <v-card-text>
                                                <v-form  > 
                                                    <vue-editor  
                                                        name="texto"
                                                        v-model="textocontencion" 
                                                        outline  height=350px;
                                                        style="max-height: 310px; overflow-y: scroll"
                                                        :editorToolbar="customToolbar"
                                                        :error-messages="errors.collect('texto')">
                                                    </vue-editor>
                                                </v-form>
                                            </v-card-text>   
                                    </v-card> 

                                </v-flex>

                                </v-layout>
                            </v-container> 
                            <br>
                            <v-card-actions>
                            <v-spacer></v-spacer> 
                                <v-btn @click.native="ActualizarNo" class="error" >No</v-btn>
                                <v-btn v-if="!sirequirio" @click.native="ActualizarSi" class="success" >Si</v-btn>
                                <v-btn v-if="sirequirio" @click.native="previsualizarpdf" class="success" >Guardar</v-btn>   
                            </v-card-actions>
                        </v-form>
                    
                    </v-card-text> 
                    </v-card>

                </v-dialog>

                <v-dialog   v-model="dialog2"  max-width="980px"> 
                    
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar  size="40">
                                <v-icon class="grey lighten-2">report_problem</v-icon>
                            </v-avatar> 
                    <v-toolbar-title class="subheading">Información detallada</v-toolbar-title>
                    <v-spacer></v-spacer>
                
                    
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap justify-space-between>
                                    <v-flex xs4 sm4 md4  >
                                    <v-layout column>
                                        <div class="subheading">Documento de identificación:</div>
                                        <v-img                                           
                                            :src="ruta" 
                                            aspect-ratio="1"
                                            class="grey lighten-2"
                                            max-width="250"
                                            max-height="160"
                                        ></v-img>
            
                                    </v-layout> 
                                    </v-flex>
                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="tvictima"
                                            label="Clasisficación de  persona:"
                                            disabled
                                        ></v-text-field>
                                    <v-text-field
                                            v-model="tipopersona"
                                            label="Tipo de persona:"
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="fnacimiento"
                                            label="Fecha de nacimiento:"
                                            disabled
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs4 sm4 md4>
                                    <v-text-field
                                            v-model="sexo"
                                            label="Sexo:"
                                            disabled
                                        ></v-text-field>
                                    <v-text-field
                                            v-model="genero"
                                            label="Género:"
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="estadocivil"
                                            label="Estado familiar:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    
                                    <v-flex xs8 sm8 md8>
                                        <v-text-field
                                            v-model="nombre" 
                                            label="Nombre completo:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex> 
                                
                                    
                                    <v-flex xs4 sm4 md4>
                                    <v-text-field
                                            v-model="medionotificacion"
                                            label="Medio de notificacion:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    
                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="nacionalidad"
                                            label="Nacionalidad:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    

                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="ocupacion"
                                            label="Ocupación:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="lengua"
                                            label="Lengua:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="religion"
                                            label="Religión:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="discapacidad"
                                            label="Tipo de discapacidad:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    <v-flex xs4 sm4 md4>
                                        <v-text-field
                                            v-model="parentesco"
                                            label="Parentesco:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field
                                            v-model="direccion"
                                            label="Dirección:"
                                            disabled
                                        ></v-text-field>
                                    
                                    </v-flex> 
                                </v-layout>
                            </v-container> 
                            <br>
                            <v-card-actions>
                                <v-spacer></v-spacer> 
                                <v-btn  @click.native="close" >Cerrar</v-btn>
                            </v-card-actions>
                        </v-form>
                    
                    </v-card-text> 
                    </v-card>

                </v-dialog>
            </v-toolbar> 
            <v-card flat color="white" grid-list-md text-md-center fluid fill-height> 
                <v-layout row> 
                    <v-flex d-flex grow>
                        <v-card >
                            <v-card-title>
                                    Información general.
                
                                <v-spacer></v-spacer>
                
                                
                                <v-tooltip bottom color="success" >
                                    <template v-slot:activator="{ on }">
                                    <v-btn  icon class="mr-3" slot="activator" v-on="on" v-on:click="detallepersona">
                                        <v-icon   >library_books</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Informacion de la victima</span>
                                </v-tooltip>


                            
                            </v-card-title>
                            <v-card-text>
        
                                <v-list two-line>
                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">folder_open</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        
                                        
                                        
                                        <v-list-tile-title>{{ rac }}</v-list-tile-title>
                                        <v-list-tile-sub-title  >RAC</v-list-tile-sub-title>
                                        
                                    </v-list-tile-content> 
                                    </v-list-tile>
                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">update</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{  fhreg }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Fecha y hora de registro</v-list-tile-sub-title>
                                    </v-list-tile-content> 
                                    </v-list-tile>

                                    <v-divider inset></v-divider>

                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">person</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ tvictima }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Tipo de persona</v-list-tile-sub-title>
                                    </v-list-tile-content> 
                                    </v-list-tile>

                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">contacts</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ curp }}</v-list-tile-title>
                                        <v-list-tile-sub-title>CURP</v-list-tile-sub-title>
                                    </v-list-tile-content> 
                                    </v-list-tile>

                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">account_circle</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ nombre}}</v-list-tile-title>
                                        <v-list-tile-sub-title>Nombre</v-list-tile-sub-title>
                                    </v-list-tile-content> 
                                    </v-list-tile>

                                    <v-divider inset></v-divider>

                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">phone</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ tel }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Telefono(s)</v-list-tile-sub-title>
                                    </v-list-tile-content> 
                                    </v-list-tile>
        
                                
        
                                    <v-divider inset></v-divider>
                        
                                    <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="info">mail</v-icon>
                                    </v-list-tile-action>
                        
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ email }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Correo</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    </v-list-tile> 

                                    <v-divider inset></v-divider>
                        
                                

                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex  d-flex> 
                            <v-card >
                                <v-card-text >
                                    <v-stepper elevation-0 v-model="step" non-linear vertical> 
                                    <v-stepper-step :complete="step > 1" step="1"   >
                                        Reseña breve segun IPH.
                                        <small>Reseña de hechos en base a IPH para que se inicie investigacion.</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="1">
                                        <v-form   data-vv-scope="form1"> 
                                            <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                                <v-container grid-list-xl>
                                                    <v-layout wrap justify-space-between>
                                                        <v-flex  xs12 md12 lg12>  
                                                        

                                                            

                                                            <p>*Reseña breve de hechos (Modo, Tiempo, Lugar y circunstancia) Excesivamente breves</p>
                                                            
                                                            <vue-editor   
                                                                outline 
                                                                :editorToolbar="customToolbar" 
                                                                v-model="reseña"
                                                                label="*Reseña breve hechos"
                                                                :error-messages="errors.collect('form1.reseña breve')"
                                                                v-validate="'required'" 
                                                                data-vv-name="reseña breve" 
                                                                required
                                                                :disabled="rp1"
                                                                data-vv-scope="form1"  >
                                                            </vue-editor>
                                                        </v-flex>
                                                        
                                                            
                                                
                                                        
                                                                                
                                                    </v-layout>
                                                    <v-spacer></v-spacer>
                                                    <div class="text-xs-right">
                                                        <v-btn   color="primary"   @click.native="guardarentrevista"  >{{btnTitle}}</v-btn>
                                                    </div>
                                                </v-container> 
                                                    
                                            </v-card>
                                        </v-form>    
                                        
                                    </v-stepper-content> 
                                    <v-stepper-step :complete="step > 2" step="2"   >
                                        Registros.
                                        <small>Datos de registro.</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="2">
                                        <v-form   data-vv-scope="formre"> 
                                            <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                                <v-container grid-list-xl>
                                                    <v-layout wrap justify-space-between>
                                                        <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                                            <v-text-field 
                                                                name="tipo de registro"   
                                                                v-model="tipo" 
                                                                v-validate="'required'" 
                                                                data-vv-scope="formre"
                                                                label="*Tipo:"
                                                                :error-messages="errors.collect('formre.tipo de registro')">
                                                            </v-text-field>

                                                            <v-text-field 
                                                                name="número de oficio" 
                                                                label="*Número de oficio:" 
                                                                v-model="numerooficio3"
                                                                v-validate="'required'"
                                                                data-vv-scope="formre"
                                                                :error-messages="errors.collect('formre.número de oficio')">                                          
                                                            </v-text-field> 

                                                        </v-flex> 

                                                        <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                                            <v-autocomplete 
                                                                name="persona"  
                                                                :items="personas"
                                                                v-model="personaId2" 
                                                                data-vv-scope="formre"
                                                                v-validate="'required'" 
                                                                label="*Persona:"
                                                                :error-messages="errors.collect('formre.persona')">
                                                            </v-autocomplete>
                                                        </v-flex>

                                                        <v-flex class="espaciado" xs12 sm12 md12 lg612 >
                                                            
                                                            <v-card elevation="0"  >
                                                                
                                                            <v-card-title  ><h3>*Texto del registro:</h3></v-card-title>
                                                            <v-divider ></v-divider>
                                                                    <v-card-text>
                                                                        <v-form > 
                                                                            <vue-editor  
                                                                                v-model="textolibrere" 
                                                                                data-vv-scope="formre"
                                                                                :editorToolbar="customToolbar"
                                                                                :error-messages="errors.collect('formre.texolibre')"> 
                                                                            </vue-editor>
                                                                        </v-form>
                                                                    </v-card-text>   
                                                            </v-card> 

                                                            <v-btn  class="ma-0"  outline="" block @click.native="generarpdfregistro"   color="primary">
                                                                <v-icon>description</v-icon>GENERAR DOCUMENTO   
                                                            </v-btn>

                                                        </v-flex>                                                              
                                                    </v-layout>
                                                    <v-spacer></v-spacer>
                                                    <div class="text-xs-right">
                                                        <v-btn flat @click.native="step = 1">Anterior</v-btn> 
                                                        <v-btn color="primary" @click.native="step = 3">Continuar</v-btn>
                                                    </div>
                                                </v-container>                                             
                                            </v-card>
                                        </v-form>    
                                        
                                    </v-stepper-content>
                                    <v-stepper-step :complete="step > 3" step="3" :rules="[() => !errors.has('serviciopericialeId') && !errors.has('textolibre')]">
                                        Solicitud de certificado médico
                                    </v-stepper-step>
                                    <v-stepper-content step="3">
                                        <v-form   data-vv-scope="form2"> 
                                            <v-card color="grey lighten-5"   elevation=0 class="mb-5" height="auto">
                                                <v-container grid-list-sm    >
                                                    <v-layout row wrap justify-center>
                                                    <v-flex  xs12 md6 lg6> 
                                                            <p class="font-weight-regular regular ">Información para la solicitud de servicios periciales en la intervencion  de atencion a victimas.</p>
                                                            

                                                             <v-autocomplete 
                                                                name="sp"
                                                                :items="sps"
                                                                v-model="sp"
                                                                label="*Servicio pericial:" 
                                                                v-validate="'required'" 
                                                                return-object
                                                                data-vv-scope="form2" 
                                                                @change="listaragencias"
                                                                :error-messages="errors.collect('form2.sp')" >
                                                            </v-autocomplete> 

                                                            <v-autocomplete 
                                                                name="agencia"
                                                                :items="agencias"
                                                                v-model="agencia"
                                                                label="*Especialidad:" 
                                                                v-validate="'required'" 
                                                                return-object
                                                                data-vv-scope="form2" 
                                                                @change="listarServiciosPericiales"
                                                                :error-messages="errors.collect('form2.agencia')" >
                                                            </v-autocomplete> 

                                                            <v-autocomplete 
                                                                    name="servicio pericial"
                                                                    :items="serviciospericiales"
                                                                    v-model="serviciopericialeId"
                                                                    label="*Servicio:" 
                                                                    data-vv-scope="form2" 
                                                                    v-validate="'required'" 
                                                                    @change="listarFiltroSP"
                                                                    return-object
                                                                    :error-messages="errors.collect('form2.servicio pericial')" >
                                                            </v-autocomplete> 


                                                            <v-autocomplete 
                                                                    return-object
                                                                    name="persona"
                                                                    :items="personas"
                                                                    v-model="personaf"
                                                                    label="*Persona registradas en el hecho:" 
                                                                    attach
                                                                    chips
                                                                    deletable-chips
                                                                    multiple
                                                                    v-on:change="listarFiltroSP"
                                                                    v-validate="'required'"   
                                                                    data-vv-scope="form2"                                                     
                                                                    :error-messages="errors.collect('form2.persona')" >
                                                            </v-autocomplete>

                                                            <v-text-field 
                                                                name="número de oficio" 
                                                                label="*Número de oficio:" 
                                                                v-model="numerooficio"
                                                                v-validate="'required'"
                                                                data-vv-scope="form2" 
                                                                :error-messages="errors.collect('form2.número de oficio')">                                          
                                                            </v-text-field>

                                                            <vue-editor  
                                                                    name="especificaciones" 
                                                                    v-model="textolibre"
                                                                    :editorToolbar="customToolbar" 
                                                                    v-validate="'required'"
                                                                    outline  height=350px;
                                                                    style="max-height: 310px; overflow-y: scroll"
                                                                    data-vv-rules="required"
                                                                    data-vv-as="textolibre"
                                                                    data-vv-scope="form2" 
                                                                    :error-messages="errors.collect('form2.especificaciones')">
                                                            </vue-editor> 
                                                            
                                                            <v-btn  class="ma-0"  outline="" block @click.native="imprimirSP"   color="primary">
                                                            <v-icon>description</v-icon>GENERAR DOCUMENTO   
                                                            </v-btn>

                                                        

                                                        </v-flex> 
                                                        
                                                        <v-flex  xs12 md6 lg6> 
                                                            <v-card  color="grey lighten-5" auto-grow elevation="0">                                
                                                                <v-card-text >
                                                                    <v-list three-line class="grey lighten-5" > 
                                                                        <p class="text-md-left">Informacion detallada del servicio pericial.</p> 
                                                                        <v-list-tile>  
                                                                            <v-list-tile-action>
                                                                                <v-icon color="success">business</v-icon>
                                                                            </v-list-tile-action> 
                                                                            <v-list-tile-content   >  
                                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Dirección o subdirección:</a></p> </v-list-tile-title> 
                                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ nombreDirSub }}</a></p>  </v-list-tile-sub-title>  
                                                                            </v-list-tile-content> 
                                                                        </v-list-tile>
                                                                        <v-list-tile>  
                                                                            <v-list-tile-action>
                                                                                <v-icon color="success">apartment</v-icon>
                                                                            </v-list-tile-action> 
                                                                            <v-list-tile-content   >  
                                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Laboratorio:</a></p> </v-list-tile-title> 
                                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ nombreAgencia }}</a></p>  </v-list-tile-sub-title>  
                                                                            </v-list-tile-content> 
                                                                        </v-list-tile>
                                                                        <v-list-tile>  
                                                                            <v-list-tile-action>
                                                                                <v-icon color="success">priority_high</v-icon>
                                                                            </v-list-tile-action> 
                                                                            <v-list-tile-content   >  
                                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Descripción</a></p> </v-list-tile-title> 
                                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ descripcion}}</a></p>  </v-list-tile-sub-title>  
                                                                            </v-list-tile-content> 
                                                                        </v-list-tile>
                                                                        <v-list-tile>  
                                                                            <v-list-tile-action>
                                                                                <v-icon    color="success">textsms</v-icon>
                                                                            </v-list-tile-action> 
                                                                            <v-list-tile-content>  
                                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Requisitos especificos</a></p> </v-list-tile-title> 
                                                                                <v-list-tile-sub-title   > <p color="accent" class="caption font-weight-regular"><a>{{ requisitos }}</a></p>  </v-list-tile-sub-title>  
                                                                            </v-list-tile-content> 
                                                                        </v-list-tile>
                                                                        
                                                                        
                                                                    </v-list>  
                                                                </v-card-text>
                                                            </v-card> 
                                                        
                                                        </v-flex> 
                                                        <v-flex  xs12 md12 lg12 style="overflow: auto">    
                                                            
                                                    </v-flex>
                                                    </v-layout>
                                                    <div class="text-xs-right">
                                                        <v-btn flat @click.native="step = 2">Anterior</v-btn> 
                                                        <v-btn color="primary" @click.native="step = 4">Continuar</v-btn>
                                                    </div> 
                                                </v-container>
                                            </v-card>
                                        </v-form>  
                                        
                                    </v-stepper-content>
                                    <v-stepper-step :complete="step > 4" step="4"  >
                                    Solicitud PI.
                                    <small>¿Solicitud a PI/Finalización?</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="4">
                                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                            <v-form ref="form" data-vv-scope="PI">
                                                <v-container grid-list-xl>
                                                    <v-layout wrap justify-space-between>
                                                        <v-flex  xs12 sm12 md6 lg6>   

                                                            <v-text-field 
                                                                name="número de oficio" 
                                                                label="*Número de oficio:" 
                                                                v-model="numerooficio2"
                                                                v-validate="'required'"
                                                                data-vv-scope="PI"
                                                                :error-messages="errors.collect('PI.número de oficio')">                                          
                                                            </v-text-field>   

                                                        </v-flex>

                                                        <v-flex  xs12 sm12 md6 lg6>  
                                                            <v-text-field 
                                                                name="asunto o tipo de oficio" 
                                                                label="*Asunto o tipo de oficio:" 
                                                                v-model="asuntooficio"
                                                                v-validate="'required'"
                                                                data-vv-scope="PI"
                                                                :error-messages="errors.collect('PI.asunto o tipo de oficio')">                                          
                                                            </v-text-field>  
                                                        </v-flex>

                                                        <v-flex  xs12 sm12 md12 lg12>   
                                                            
                                                            <v-card elevation="0"  >
                                                                
                                                            <v-card-title  ><h3>*Texto del oficio:</h3></v-card-title>
                                                            <v-divider ></v-divider>
                                                                    <v-card-text>
                                                                        <v-form > 
                                                                            <vue-editor  
                                                                                name="descripcíon"
                                                                                v-model="texto" 
                                                                                data-vv-scope="PI"
                                                                                v-validate="'required'"
                                                                                :editorToolbar="customToolbar"
                                                                                :error-messages="errors.collect('PI.descripcíon')"> 
                                                                            </vue-editor>
                                                                        </v-form>
                                                                    </v-card-text>   
                                                            </v-card> 

                                                            <v-btn  class="ma-0"  outline="" block @click.native="generarpdf"   color="primary">
                                                                <v-icon>description</v-icon>GENERAR DOCUMENTO   
                                                            </v-btn>

                                                        </v-flex>
                                                        
                                                    </v-layout>
                                                </v-container>
                                            </v-form>
                                        </v-card>
                                    <div class="text-xs-right">
                                        <v-btn flat @click.native="step = 3">Anterior</v-btn> 
                                        <v-btn color="primary"  @click="finalizar()" >Finalizar</v-btn>
                                        </div>
                                    </v-stepper-content> 
                                
                                </v-stepper>
                                </v-card-text>
                            </v-card> 
                    </v-flex>
                </v-layout>
            </v-card> 
        </v-flex>

 
            <v-dialog v-model="ModalRAC"  max-width="1000px"> 
                <v-card class="white" id="formatoRAC"  >
                    <v-card-text  >
                       
                        <div class="black--text">
                             <header>
                                 <div id="logo1">
                                     <img v-bind:src="logo1" id="imagen1">
                                </div> 
                                <div id="logo2">
                                    <img v-bind:src="logo2" id="imagen2">
                                </div>
                                
                                
                            </header>
                            
                          <br>
                            
                            <section>
                                <br>
                                <div id="datos">
                                    <p id="encabezado"  class="black--text">
                                        <b>REGISTRO DE ATENCION CIUDADANA</b>
                                        <br>
                                         <b>{{ u_dirSubPro }}</b>
                                        <br>
                                        <a class="texto">Registro de Atención Ciudadana (RAC): <strong>{{  rac }}</strong></a>
                                        <br>
                                         <a class="texto">Pachuca de Soto, Hidalgo;<strong> {{ fecha  }}.</strong></a>
                                        
                                    </p>
                                </div> 
                            </section>
                        
                            <section>
                                <div id="cuerpo">
                                    <div>
                                        
                                        <br>
                                        <b class="titulo">DATOS DEL COMPARECIENTE.</b>
                                        <br>
                                        <br>
                                        <div class="texto">
                                            <a><strong>Nombre:</strong> {{nombre}}</a> 
                                            <br>
                                            <a><strong>Domicilio:</strong> {{ direccion}}</a> 
                                            <br>
                                            <a><strong>CURP:</strong> {{ curp }}</a> 
                                            <br>
                                            <a><strong>Tipo de victima: </strong><span>{{tvictima}}</span><strong> , Datos de contacto: </strong><span >{{ tel + ", " + email }}</span></a>
                                            <br>
                                            <a><strong>Género: </strong><span>{{ genero }}</span><strong>, Sexo: </strong><span>{{ sexo }}</span><strong> , Edad: </strong><span >{{ edad }}</span><strong>, Estado familiar: </strong><span>{{ estadocivil }}</span><strong>, Nacionalidad: </strong><span>{{ nacionalidad }}</span></a>
                                            <br>
                                            <a><strong>Religión: </strong><span>{{ religion }}</span><strong>, Ocupación: </strong><span>{{ ocupacion }}</span><strong>, Lengua: </strong><span>{{ lengua }}</span></a> 
                                            <br>
                                    
                                        </div>
                                    </div>
                                </div>
                          
                                <div id="cuerpo"> 
                                    <div>    
                                        <br>
                                        <b class="titulo">BREVE NARRACION DE LOS HECHOS.</b>
                                        <br>
                                        <br>
                                         <p class="texto" v-html="reseña"> {{reseña}}</p>
                                        <br>
                                        <br>
                                         <br>
                                         <div class="titulo">
                                            <b>COMPARECIENTE.</b>
                                        </div>
                                        <br>
                                        <br>
                                        <div class="titulo">
                                            <b> {{nombre}}</b>  
                                        </div>
                                        
                                    </div> 
                                </div>
                                <footer>
                               <div id="footer">  
                                    <p class="titulo"><b>A T E N T A M E N T E.</b> 
                                    <br>
                                    <br>
                                    <br>
                                    <b>{{ u_nombre }}</b>
                                    <br>
                                    <b>{{ u_puesto }}</b>
                                    </p>

                                </div>
                            </footer>
                            </section>
                              
                            
                        </div>
                      
                    </v-card-text>

                </v-card>
               
                <div class="text-xs-right white">
                    <v-btn @click="ocultarformatoRAC()" color="success darken-1" flat>Cancelar</v-btn> 
                    <v-btn @click="crearPDF_RAC()" color="success darken-1" flat>IMPRIMIR</v-btn>
                </div>
            </v-dialog> 

            <v-dialog v-model="ModalServicioPericial"  max-width="1000px">
                  
                <v-card class="white" id="formatoSP"  >
                    <v-card-text  >
                       
                        <div class="black--text">
                            <header>
                                <div id="logo1">
                                     <img v-bind:src="logo1" id="imagen1">
                                </div> 
                                <div id="logo2">
                                    <img v-bind:src="logo2" id="imagen2">
                                </div>
                                
                            </header>
                            
                            <br>
                            <section>
                                <br>
                                <div id="datos">
                                    <p id="encabezado"  class="black--text">
                                        <b>{{ u_dirSubPro }}</b>
                                        <br>
                                        <a class="texto">Registro de Atención Ciudadana (RAC): {{  rac }}</a>
                                        <br>
                                        <a class="texto">Pachuca de Soto, Hidalgo;<strong> {{ fecha }}.</strong></a>
                                        
                                    </p>
                                </div> 
                            </section>
                            <br>
                            <section>
                                <div id="cuerpo">
                                    <div>
                                        <p class="titulo">
                                            <b>{{ responsable }}</b>
                                            <br>
                                            <b>{{ nombreDirSub }}</b>
                                        </p> 
                                        <br>
                                        <b class="titulo">PRESENTE.</b>
                                        <br>
                                        <br>
                                       <div class="texto" v-html="textolibre"></div>
                                         
                                        <br>
                                        <br>
                                         <p class="texto">Agradeciendo de antemano la atención brindada a mi petición.</p>
                                        <br>
                                        <br>
                                    </div> 
                                </div>
                            </section>
                            <br>
                            <br>
                            <footer>
                                <div id="footer">
                                    <br>
                                    <br>
                                    <p class="titulo"><b>A T E N T A M E N T E.</b> 
                                    <br>
                                    <br>
                                    <br>
                                    <b>{{ u_nombre }}</b>
                                    <br>
                                    <b>{{ u_puesto }}</b>
                                    </p>

                                </div>
                            </footer>
                        </div>
                      
                    </v-card-text>

                </v-card>
                <div class="text-xs-right white">
                    <v-btn @click=" ocultarformatoSP()" color="success darken-1" flat>Cancelar</v-btn> 
                    <v-btn @click="crearPDF_SP()" color="success darken-1" flat>Guardar e Imprmir</v-btn>
                </div>
            </v-dialog> 

            <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn color=success text @click.native="guardarcontencion()">Generar solicitud</v-btn>            
                    <v-btn icon   @click="modaldocumento = false">
                    <v-icon>close</v-icon>
                    </v-btn>

                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="modaldocumento2" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn color=success text @click.native="guardarPI()">Generar solicitud</v-btn>            
                    <v-btn icon   @click="modaldocumento2 = false">
                    <v-icon>close</v-icon>
                    </v-btn>

                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf2" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="modaldocumento3" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn color=success text @click.native="crearPDF_SP()">Generar solicitud</v-btn>            
                    <v-btn icon   @click="modaldocumento3 = false">
                    <v-icon>close</v-icon>
                    </v-btn>

                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf3" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
            </v-dialog>
            

            <v-dialog v-model="ModalDependenciaDerivacion"  max-width="1000px">
                <v-card class="white" id="formatoDD" >
                     <v-card-text  >
                       
                        <div class="black--text">
                             <header>
                                 <div id="logo1">
                                     <img v-bind:src="logo1" id="imagen1">
                                </div> 
                                <div id="logo2">
                                    <img v-bind:src="logo2" id="imagen2">
                                </div>
                                
                                
                            </header>
                            
                          
                            <br>
                            <section>
                                <br>
                                <div id="datos">
                                    <p id="encabezado"  class="black--text">
                                        <b>CARTA DE DERIVACIÓN</b>
                                        <br>
                                         <b>{{ u_dirSubPro }}</b>
                                        <br>
                                        <a class="texto">Registro de Atención Ciudadana (RAC): <strong>{{  rac }}</strong></a>
                                        <br>
                                         <a class="texto">Pachuca de Soto, Hidalgo;<strong> {{ fecha  }}.</strong></a>
                                        
                                    </p>
                                </div> 
                            </section>
                        
                            <section>
                                <div id="cuerpo">
                                    <div>
                                        
                                        <br>
                                        <b class="titulo">DATOS DEL COMPARECIENTE.</b>
                                        <br>
                                        <br>
                                        <div class="texto">
                                            <a><strong>Nombre:</strong> {{nombre}}</a> 
                                            <br>
                                            <a><strong>Domicilio:</strong> {{ direccion}}</a> 
                                            <br>
                                            <a><strong>CURP:</strong> {{ curp }}</a> 
                                            <br>
                                            <a><strong>Tipo de victima: </strong><span>{{tvictima}}</span><strong> , Datos de contacto: </strong><span >{{ tel + ", " + email }}</span></a>
                                            <br>
                                            <a><strong>Género: </strong><span>{{ genero }}</span><strong>, Sexo: </strong><span>{{ sexo }}</span><strong> , Edad: </strong><span >{{ edad }}</span><strong>, Estado familiar: </strong><span>{{ estadocivil }}</span><strong>, Nacionalidad: </strong><span>{{ nacionalidad }}</span></a>
                                            <br>
                                            <a><strong>Religión: </strong><span>{{ religion }}</span><strong>, Ocupación: </strong><span>{{ ocupacion }}</span><strong>, Lengua: </strong><span>{{ lengua }}</span></a> 
                                            <br>
                                    
                                        </div>
                                    </div>
                                </div>
                          
                                <div id="cuerpo"> 
                                    <div>    
                                        <br>
                                        <b class="titulo">BREVE NARRACION DE LOS HECHOS.</b>
                                        <br>
                                        <br>
                                         <p class="texto" v-html="reseña"> {{ reseña }}</p>
                                        <br>
                                        <a class="texto" ><strong>SE SUGIERE ACUDIR A: </strong><span>{{nombrederivacion + ", ubicado en " + direccionderivacion }} </span> </a> 
                                        <br>
                                        <br> 
                                        <a class="texto" ><strong>ANEXO: </strong><span>{{sintesis}} </span> </a> 
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        <div class="titulo">
                                            <b>COMPARECIENTE.</b>
                                        </div>
                                        <br>
                                        <br>
                                        <div class="titulo">
                                            <b> {{nombre}}</b>  
                                        </div>
                                        
                                    </div> 
                                </div>
                                <footer>
                               <div id="footer">  
                                    <p class="titulo"><b>A T E N T A M E N T E.</b> 
                                    <br>
                                    <br>
                                    <br>
                                    <b>{{ u_nombre }}</b>
                                    <br>
                                    <b>{{ u_puesto }}</b>
                                    </p>

                                </div>
                            </footer>
                            </section>
                              
                            
                        </div>
                      
                    </v-card-text>
                    
                </v-card>
                <div class="text-xs-right white">
                        <v-btn @click="ocultarformatoDD()" color="success darken-1" flat>Cancelar</v-btn> 
                        <v-btn @click="crearPDF_DD()" color="success darken-1" flat>Imprmir</v-btn>
                </div>
            </v-dialog> 

          

             
    </v-layout>

</template>

<script>
  
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
  import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { debug } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util';


export default {
 components: {
     
        "vue2-editor": VueEditor,
        n401,
        n403
    },
  data () {
    return {
        rp1:false, 
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
        //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //-----CLAIM------------------------------------------
        u_iddistrito:this.$store.state.usuario.iddistrito,
        u_distrito:this.$store.state.usuario.distrito,
        u_dirSubPro:this.$store.state.usuario.dirSubProc,
        u_idagencia:this.$store.state.usuario.idagencia,
        u_agencia:this.$store.state.usuario.agencia,
        u_idmoduloservicio:this.$store.state.usuario.idmoduloservicio,
        u_modulo:this.$store.state.usuario.modulo,
        u_idusuario:this.$store.state.usuario.idusuario,
        u_nombre:this.$store.state.usuario.usuario,
        u_clave:this.$store.state.usuario.clave,
        u_rol:this.$store.state.usuario.rol,
        u_puesto:this.$store.state.usuario.puesto,
        u_subproc:this.$store.state.usuario.subProc, 
        //----------------------------------------------------
        showpage:true,
        e401:false,
        e403:false,
        dialog1: false,
        dialog2: false,

        switch1: false,
        switch2: false,

        step:1, 
         
        reseña:'', 

        verFormatos:0,

        checkbox1: false,
        checkbox2: false,
     
        //VALORES DEL USUARIO 
        idturno: 0,
        turno: "",
        statusReAsignado:false,
        mesa: 2,
        connection: "",   
       // VALORES DEL REGISTRO
        
        rAtencionId:0,
        rHechoId:0,
        personaId: 0,

        rac:"",
        ruta:"",
        fhreg:"",
        tvictima:"",
        curp:"",
        nombre:"",
        tel:"",
        email:"",
        tipopersona:"",
        medionotificacion:"",
        sexo:"",
        genero:"",
        fnacimiento:"",
        edad:"",
        estadocivil:"",
        nacionalidad:"",
        ocupacion:"",
        lengua:"",
        religion:"",
        discapacidad:"",
        parentesco:"",
        direccion:"",
        contencionvictima:false,
        numerooficio:'',
        numeromaximo:[],
        agencias:[],
        agencia:'',
        //
        idDDerivacion:"",
        nombrederivacion:"",
        direccionderivacion:"",
         
        dia:"",
        mes:"",
        año:"",
        hr:"", 
        fecha:"",
        
        ModalRAC:0,

        derivaciones:[],
        ModalDependenciaDerivacion:0,
        sintesis:"",

        serviciospericiales:[],
        serviciopericialeId:'',
       
        aspid:'',
        nombreAgencia:'',
        nombreDirSub:'',
        responsable:'',
        nombreServicio:'',
        descripcion:'',
        requisitos:'',
        materia:'',
        textolibre:'',
        ModalServicioPericial: 0,
        modaldocumento:false,
        agenciainfo:[],

        nuc:'',
        personas:[],
        personaf:[],
        personaf2:[],
        personaId2:'',
        numerooficio2:'',
        asuntooficio:'',
        texto:'',
        control :0,
        directorPI:'',
        comilla:'"',
        texto2:"",
        requeridocontencion:'',
        sirequirio:false,
        textolibrere:'',
        numerooficio3:'',
        tipo:'',
        tiposrec:[
            {text: "Médico",value:"Médico"},
            {text: "Psicológico",value:"Psicológico"}
        ],
        tiporec:'',
        sps:[],
        sp:'',
        modaldocumento2:false,
        modaldocumento3:false,
    }
  },
   computed: {
       btnTitle () {
            return this.rp1 === false ? 'GUARDAR Y CONTINUAR' : 'CONTINUAR'
        },  
    },

    created: function() {   
        
       
        this.llamarturno();
        this.listarLogo();
        this.listarderivacion();
        this.informacionagencia();
        this.obtenerdirectorPI();

        this.listarSP();

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
        },  (error)=> {
             // Do something with response error
          return new Promise( (resolve, reject)=> {
            this.$store.commit('LOADER',false);
            throw error;
          });

 
        });
          



      },
 
methods: {
    listarLogo(){
        
        let me=this; 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$conf.get('api/ConfGlobals/Listar').then(function(response){
            me.logo1= response.data.logo1;
            me.logo2= response.data.logo2;
            me.logo3= response.data.logo3;
            me.logo4= response.data.logo4;
            
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
    close () {
        this.dialog1 = false; 
        this.dialog2 = false; 
    },
    listarrap(){ 
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};   
        this.$cat.get('api/RAPs/Listar/' +me.rAtencionId,configuracion).then(function(response){
            console.log(response.data);
            me.personaId = response.data.personaId;
            me.curp = response.data.curp;
            me.nombre = response.data.nombre + " " + response.data.apellidoPaterno + " " + response.data.apellidoMaterno;
            me.tel = response.data.telefono1 + " , " + response.data.telefono2;
            me.email = response.data.correo; 
            me.rac= response.data.rac; 
            me.fhreg = response.data.fechaHoraInicio;
            me.tvictima = response.data.clasificacionPersona;
            me.tipopersona= response.data.tipoPersona;
            me.sexo= response.data.sexo;
            me.genero= response.data.genero;
            me.fnacimiento= response.data.fechaNacimiento; 
            me.estadocivil = response.data.estadoCivil; 
            me.medionotificacion= response.data.medionotificacion;
            me.nacionalidad= response.data.nacionalidad;
            me.ocupacion= response.data.ocupacion;
            me.lengua= response.data.lengua;
            me.religion= response.data.religion;
            me.discapacidad= response.data.tipoDiscapacidad;
            me.parentesco=response.data.parentesco;

            me.edad = moment().diff(me.fnacimiento, 'years',false);

            me.listardireccionpersona();
            me.documentoIdentificacion();
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
    listaragencias(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var agenciasarray ='';
            me.agencias = []
            me.$conf.get('api/Agencias/ListarporDSPmedicos/'+ me.sp.value,configuracion).then(function(response){
                    agenciasarray=response.data;
                    agenciasarray.map(function(x){
                        me.agencias.push({text: x.nombre,value: x.idAgencia});
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
                    me.$notify("No hay registros previos", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            }); 
        },
    /*
    listaragencias(iddsp){
        let me=this;  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        var agenciasarray ='';
        me.$conf.get('api/Agencias/ListarporDSPDetenciones/'+ iddsp,configuracion).then(function(response){
                agenciasarray=response.data;
                agenciasarray.map(function(x){
                    me.agencias.push({text: x.nombre,value: x.idAgencia});
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
                me.$notify("No hay registros previos", 'error')
            }else{
                me.$notify('Error al intentar listar los registros!!!','error')    
            } 
        }); 
    },*/
    listardireccionpersona(){ 
        let me=this;   
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$cat.get('api/RAPs/ListarDP/' +me.personaId,configuracion).then(function(response){
            console.log(response.data);
            me.direccion = response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp
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
    documentoIdentificacion(){
        let me=this;  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header}; 
        this.$cat.get('api/DocumentosPesonas/Listar/' +me.personaId,configuracion).then(function(response){
            me.ruta = response.data.ruta;
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
    obtenerdirectorPI(){
        let me=this;  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};

            me.$controlacceso.get('api/Usuarios/DirectorPI/'+ me.u_iddistrito,configuracion).then(function(response){
                me.directorPI=response.data.nombre;
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
    ordenarpersona(){

    },
     ActualizarSi(){
        this.contencionvictima = true;
        this.sirequirio = true;     
    },
    previsualizarpdf(){
        this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia);
    },
    guardarsi(){
        this.guardarcontencion();
    },
    ActualizarNo(){
        this.contencionvictima = false;
        this.ActualizarMC();
    },
    ActualizarMC(){
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$cat.put('api/RAPs/ActualizarMC',{
            'idRAtencion':me.rAtencionId,
            'contencionVictima': me.contencionvictima
        },configuracion).then(function(response){
            me.close();
            me.listarrap();  
            me.$notify('La información se actualizo correctamente !!!','success')  
             
                            
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
    guardarcontencion(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
                function(){             
                    this.$cat.post('api/ContencionPersonas/Crear',{
                    
                    'RAtencionId': me.rAtencionId,
                    'QueRequirio': me.tiporec,   
                    'NombrePersona': me.nombre,                
                    'UDistrito': me.u_distrito,
                    'USubproc': me.u_dirSubPro,
                    'UAgencia': me.u_agencia,
                    'UUsuario': me.u_nombre,
                    'UPuesto': me.u_puesto,
                    'UModulo': me.u_modulo,

                },configuracion).then(function(response){                   
                        me.$notify('La información se guardo correctamente !!!','success') 
                        this.$cat.put('api/RAPs/ActualizarMC',{
                            'idRAtencion':me.rAtencionId,
                            'contencionVictima': me.contencionvictima
                        },configuracion).then(function(response){
                            me.close();
                            me.listarrap();  
                            me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia)
                            me.textocontencion = ""
                            me.tiporec = ""
                            me.modaldocumento = false
                            me.$notify('La información se actualizo correctamente !!!','success')  
                            
                                            
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
        },
        function(){
                alertify.warning('Verifica la información')
            }
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                

    }, 
    llamarturno(){  

        let me=this;       
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};    

        me.rAtencionId = me.$store.state.ratencionid;
               
        me.dialog1 = true
        me.listarrap();    
                                
       
    },
    detallepersona(){
       this.dialog2=true;
    },
    listarServiciosPericiales(){
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        var serviciospericialesArray=[];
        me.serviciospericiales = [];
            me.$conf.get('api/ASPs/ListarporIdagencia/'+me.agencia.value,configuracion).then(function(response){
       
                serviciospericialesArray=response.data;
                serviciospericialesArray.map(function(x){
                    me.serviciospericiales.push({text: x.nombreServicio,value: x.servicioPericialId,nodistrito:x.numeroDistrito});
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
    listarFiltroSP(){
        let me=this; 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$conf.get('api/ASPs/FiltrarStatusSP/'+ me.serviciopericialeId.value + "/" + me.agencia.value,configuracion).then(function(response){
            
            console.log(response.data);
            me.aspid = response.data.idASP;
            me.nombreAgencia = response.data.nombreAgencia;
            me.nombreDirSub= response.data.nombreDirSub;
            me.responsable = response.data.responsable;
            me.nombreServicio = response.data.nombreServicio;
            me.descripcion= response.data.descripcion;
            me.requisitos = response.data.requisitos;
            me.materia = response.data.materia;
            me.obtenernumeromaximo();
            me.listarTL();
            
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
    obtenernumeromaximo(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$cat.get('api/RDiligencias/ObtenernumeroMaximoporDistrito/'+ me.serviciopericialeId.nodistrito,configuracion).then(function(response){
                me.numeromaximo = response.data;
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
                    me.$notify("No hay registros previos", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });
    },
    desswitch1(){ 
        
         if (this.switch2==false){
            this.switch1=false;
            this.checkbox1=false;
            this.checkbox2= false;
           
            this.verFormatos=0;
        }else{
            this.switch1=false;
            this.checkbox1=false;
            this.checkbox2= false;
          
            this.verFormatos=2;
        }
    },
    desswitch2 (){
         
        if (this.switch1==false){
            this.switch2=false;
            this.checkbox1=false;
            this.checkbox2= false;
          
            this.verFormatos=0;
        }else{
            this.switch2=false;
            this.checkbox1=false;
            this.checkbox2= false;
        
            this.verFormatos=1;
        }

       
    },
    listarderivacion(){
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        var depderivacionArray=[];
        this.$conf.get('api/DependeciasDerivacions/Listar',configuracion).then(function(response){
            //console.log(response.data);
            depderivacionArray=response.data;
            depderivacionArray.map(function(x){
                me.derivaciones.push({text: x.nombre,value: x.idDDerivacion});

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
    guardarentrevista(){
       
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.dia = moment().format('DD');
        me.mes = moment().format('MMMM')
        me.año= moment().format("YYYY") 
        me.hr= moment().format('h:mm:ss a')
        me.fecha = me.dia + " de " + me.mes  + " del " + me.año 
        if (me.rp1 == true){
             me.step = 2;
        }else{
            
        if  (me.rAtencionId == 0){
             me.$notify('No es posible guardar esta información ya que aun no llama a un turno','error')  
        }
        else {
             me.$validator.validateAll('form1').then(result => {
                if (result) {
                    
                    me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios', 
                            function(){  
                                
                                this.$cat.post('api/RHechoes/CrearPI',{
                                    'agenciaid': me.u_idagencia,
                                    'ratencionid': me.rAtencionId,
                                    'moduloServicioId': me.u_idmoduloservicio,
                                    'status':false,
                                    'rbreve' : me.reseña,  
                                    'fechaReporte': me.fecha,
                                    
                                },configuracion).then(function(response){ 
                                    
                                    //-------------------------------------------

                                    this.$cat.post('api/Historialcarpeta/Crear',{

                                        'RHechoId': response.data.idRH,
                                        'Detalle': "Inicio de la investigación",
                                        'Modulo': me.u_modulo,
                                        'Agencia':me.u_agencia,
                                        'UDistrito' : me.u_distrito,  
                                        'USubproc': me.u_dirSubPro,
                                        'UAgencia': me.u_agencia,
                                        'Usuario': me.u_nombre,
                                        'UPuesto': me.u_puesto,
                                        'UModulo': me.u_modulo

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

                                    //-------------------------------------------------

                                   //if (response.statusText == "OK"){
                                        me.rp1 = true; 
                                        console.log("respuesta:",response.data)
                                        me.rHechoId = response.data.idRH;
                                   //}
                                    me.$notify('La información se guardo correctamente !!!','success')  
                                    me.listarPersonas();
                                    me.step = 2;
                                        
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
                            function(){
                                alertify.warning('Verifica la información')
                            }
                        ).set('labels', {ok:'Guardar', cancel:'Cancelar'});              
                }
         })
    
        }
        }       
    },  
    eliminarSP(arr,item){
        var i= arr.indexOf(item);
        if (i!==-1){
            arr.splice(i,1);
        }
    },
    imprimirSP( ){ 
        let me=this;
        me.dia = moment().format('DD');
        me.mes = moment().format('MMMM')
        me.año= moment().format("YYYY") 
        me.hr= moment().format('h:mm:ss a')
        me.fecha = me.dia + " de " + me.mes  + " del " + me.año
        
        if  (me.rAtencionId == 0){
             me.$notify('No es posible guardar esta información ya que aun no llama a un turno','error')  
        }
        else {
            me.$validator.validateAll('form2').then(result => {
                if (result) {
                    me.control = 0
                    me.downloadPdf3(me.u_nombre,me.u_puesto,me.u_agencia);       
                }
            }) 
        } 
    },
    listarSP(){
        let me=this;  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        var sparrays ='';
        me.$conf.get('api/SpPiLigaciones/ListarPertenecienteyGeneralSP/'+ me.$store.state.keymodulo,configuracion).then(function(response){
                sparrays=response.data;
                sparrays.map(function(x){
                    me.sps.push({text: x.dspn,value: x.dspId});
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
                me.$notify("No hay registros previos", 'error')
            }else{
                me.$notify('Error al intentar listar los registros!!!','error')    
            } 
        }); 
    },
    finalizar(){
        let me = this  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        

            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
                function(){  
            
                this.$cat.post('api/Nucs/GenerarNuc',{
                            'distritoId': me.u_iddistrito,
                            'agenciaId': me.u_idagencia, 
                },configuracion).then(function(response){ 
                   
                    me.$store.state.rhechoid= me.rHechoId;
                    me.$store.state.nuc= response.data.nuc;

                    
                    this.$cat.put('api/RHechoes/ActualizarNUC',{
                            'idrhecho': me.rHechoId,
                            'ratencionid': me.rAtencionId, 
                            'nucid': response.data.idnuc,
                     },configuracion).then(function(response){ 
                        
                        this.$cat.post('api/Historialcarpeta/Crear',{

                        'RHechoId': me.rHechoId,
                        'Detalle':  "Inicio con detenido",
                        'Modulo': me.u_modulo,
                        'Agencia':me.u_agencia,
                        'DetalleEtapa': "Creacion de en inicio con detenido",
                        'UDistrito' : me.u_distrito,
                        'USubproc': me.u_dirSubPro,
                        'UAgencia': me.u_agencia,
                        'Usuario': me.u_nombre,
                        'UPuesto': me.u_puesto,
                        'UModulo': me.u_modulo

                        },configuracion).then(function(response){


                            me.$notify('La información se guardo correctamente !!!','success')
                            me.$router.push('./entrevistainicial')

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
            
                },
                function(){
                        alertify.warning('Verifica la información')
                    }
                ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
            

    },
    guardarPI(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
              function(){
             
                
                this.$cat.post('api/Oficios/Crear',{
                    
                    'rhechoId': me.rHechoId,
                    'Texto': me.texto2,                  
                    'UDistrito': me.u_distrito,
                    'USubproc': me.u_dirSubPro,
                    'UAgencia': me.u_agencia,
                    'Usuario': me.u_nombre,
                    'UPuesto': me.u_puesto,
                    'UModulo': me.u_modulo,
                    'numeroOficio': me.numerooficio2,
                    'TipoOficio': me.asuntooficio

                },configuracion).then(function(response){  

                    me.$notify('La información se guardo correctamente !!!','success')  
                    me.mostrarpdf2(me.u_nombre,me.u_puesto,me.u_agencia);       
                    me.modaldocumento2 = false;
                    me.limpiar2(); 

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
        function(){
                alertify.warning('Verifica la información')
            }
        ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                

    }, 
    guardarregistro(){

        let me=this; 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};  
        me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
        function(){
        
            
            this.$cat.post('api/RBitacoras/Crear',{
            
                'tipo': me.tipo, 
                'rHechoId': me.rHechoId,
                'idPersona': me.personaId2,
                'descipcion': me.textolibrere,
                'distrito' :me.u_distrito,
                'dirsubproc':me.u_dirSubProc,
                'agencia':me.u_agencia,
                'usuario':me.u_nombre,
                'puesto':me.u_puesto,
                'fechareporte': "",
                'numerooficio': me.numerooficio3

            },configuracion).then(function(response){  

                me.$notify('La información se guardo correctamente !!!','success')  
                me.mostrarpdfregistro(me.u_nombre,me.u_puesto,me.u_agencia);       
                me.modaldocumento = false;
                me.limpiar3(); 

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
        function(){
            alertify.warning('Verifica la información')
        }
        ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

    },
    limpiar2(){
        this.numerooficio2 = ""
        this.texto = ""
        this.asuntooficio = ""
        this.texto2 = ""
    },
    limpiar3(){
        this.numerooficio3 = ""
        this.textolibrere = ""
        this.tipo = ""
        this.personaId2 = ""
    },
    listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var personasArray=[];
                this.$cat.get('api/RAPs/ListarTodos/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data);
                personasArray=response.data;
                personasArray.map(function(x){
                    me.personas.push({text: x.nombreCompleto,value: x.personaId});
                    
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
    selectDependencia(){
     
        let me=this; 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.$conf.get('api/DependeciasDerivacions/ListarPorDependencia/' + me.idDDerivacion,configuracion).then(function(response){
            me.nombrederivacion=response.data.nombre;
            me.direccionderivacion=response.data.direccion + "Telefono: " + response.data.telefono  + " Contacto: " + response.data.contacto ;
           
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
   
    crearPDF_RAC(){
        
            //**************************************************** */
            var quotes = document.getElementById('formatoRAC'); 
            html2canvas(quotes).then(function (canvas){
            //************************************************* */ 
            var imgWidth = 200; 
            var pageHeight = 335;  
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var imgData = canvas.toDataURL('image/jpeg', 1.0);
            var doc = new jsPDF('p', 'mm', 'legal');
            var position = 10; 

            doc.addImage(imgData, 'JPEG', 10, position , imgWidth, imgHeight );
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                
                position = heightLeft - imgHeight; 
                doc.addPage(); 
                doc.addImage(imgData, 'JPEG', 10, position , imgWidth, imgHeight -2 );
                heightLeft -= pageHeight;
            
            }
            doc.save('RegistroAtencionCiudadana.pdf');
            }); 
       
    },
    crearPDF_SP(){
       
        let me = this 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios', 
            function(){    
                me.numeromaximo.numeroMaximo++
                this.$cat.post('api/RDiligencias/CrearPI',{

                            'rHechoId':me.rHechoId,

                            'fechasolicitud': me.fecha,
                            'dirigidoa': me.responsable,
                            'dirsubpro': me.nombreDirSub,
                            'emitidopor':me.u_nombre,
                            'udirsubpro': me.u_dirSubPro,
                            'upuesto': me.u_puesto, 
                            'statusrespuesta':  "Solicitado",
                            'servicio': me.nombreServicio,
                            'especificaciones': me.textolibre,
                            
                            'aspid': me.aspid,
                            'prioridad': "Urgente", 
                            'modulo': me.u_modulo,
                            'agencia': me.u_agencia,
                            'respuestas': ' ',
                            'conIndicio': false,
                            'nuc': " ",
                            'textofinal': me.textolibre,
                            'numeroOficio': me.numerooficio,
                            'NumeroDistrito': me.serviciopericialeId.nodistrito,
                            'NodeSolicitud': me.numeromaximo.numeroMaximo,
                            'DSPDEstino': me.sp.value,
                            'DistritoId': me.u_iddistrito
                        },configuracion).then(function(response){ 
                            //***************************************************** */ 
    
                            me.$notify('La información se guardo correctamente !!!','success')
                            me.ModalServicioPericial = 0;    
                            me.mostrarpdf3(me.u_nombre,me.u_puesto,me.u_agencia);
                            me.modaldocumento3 =false;
                            //***************************************************** */
                            me.textolibre ="";
                            me.serviciopericialeId="";
                            me.textolibre="";
                            me.nombreDirSub="";
                            me.nombreAgencia="";
                            me.descripcion="";
                            me.requisitos="";
                            me.numerooficio ="";
                            me.numeromaximo = "";
                            me.agencia = ""
                            me.sp = ""
                            me.personaf = ""
                            
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
            function(){
                alertify.warning('Verifica la información')
            }
        ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
        
    },
    crearPDF_DD(){ 
        let me = this 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios', 
            function(){    
                 
                 this.$cat.post('api/RDDerivacions/CrearDD',{
                            'rHechoId': me.rHechoId,
                            'dDerivacionId': me.idDDerivacion,
                            'espesificaciones': me.sintesis,
                            'fechaDerivacion':me.fecha, 
                            'uDistrito': me.u_distrito,
                            'uDirSubPro': me.u_dirSubPro,
                            'uAgencia': me.u_agencia,
                            'uNombre':me.u_nombre,
                            'uPuesto': me.u_puesto,
                        },configuracion).then(function(response){ 
                            //**************************************************** */
                            var quotes = document.getElementById('formatoDD');
                            html2canvas(quotes).then(function (canvas){
                            //************************************************* */ 
                            var imgWidth = 200; 
                            var pageHeight = 335;  
                            var imgHeight = canvas.height * imgWidth / canvas.width;
                            var heightLeft = imgHeight;
                            var imgData = canvas.toDataURL('image/jpeg', 1.0);
                            var doc = new jsPDF('p', 'mm', 'legal');
                            var position = 10; 

                            doc.addImage(imgData, 'JPEG', 10, position , imgWidth, imgHeight );
                            heightLeft -= pageHeight;

                            while (heightLeft >= 0) {
                                
                                position = heightLeft - imgHeight; 
                                doc.addPage(); 
                                doc.addImage(imgData, 'JPEG', 10, position , imgWidth, imgHeight -2 );
                                heightLeft -= pageHeight;
                            
                            }
                                doc.save('SolicitudDependeciaDerivacion.pdf');
                            }); 
                                  
                            me.$notify('La información se guardo correctamente !!!','success')
                            me.ModalServicioPericial = 0;  
                            
                            //***************************************************** */
                            me.serviciopericialeId="";
                            me.textolibre="";
                            me.nombreDirSub="";
                            me.nombreAgencia="";
                            me.descripcion="";
                            me.requisitos="";

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
            function(){
                alertify.warning('Verifica la información')
            }
        ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
        
    },
    
    
    listarTL(){
        let me = this;
            me.personaf2 =""
            for(var i = 0; i< me.personaf.length ; i++){

                me.personaf2 += me.personaf[i].text

                if( i < me.personaf.length-1)
                me.personaf2 += ", "
            }
             var textoal ="<p>Por medio de la presente, solicito tenga a bien asignar perito(a) en materia de <strong>" + me.materia +  "</strong>, a efecto de que se sirva realizar <strong>" +  me.nombreServicio + "</strong>, a <strong>" +  me.personaf2 + ".</strong><p><br></p>Lo anterior con fundamento en los artículos 131, fracción III, 272, 273, 368 y 369 del Código Nacional del Procedimientos Penales.";
             me.textolibre =
                                "<p>PRESENTE.</p> <p><br></p>"+
                                "<p><br></p>"+textoal+"<p><br></p><p><br></p><p><br></p>"+
                                "<p>Agradeciendo de antemano la atención brindada a mi petición.</p>";
                                
    },
    generarpdf(){
        this.$validator.validateAll('PI').then(result => {
            if (result) {
                this.control = 1
                this.fechas = this.generarfecha();
                this.texto2 = this.directorPI +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.texto
                this.downloadPdf2(this.u_nombre,this.u_puesto,this.u_agencia); 
            }  
        })  
    },
    generarpdfregistro(){
        this.$validator.validateAll('formre').then(result => {
            if (result) {
                this.control = 2
                this.fechas = this.generarfecha();
                this.downloadPdfregistro(this.u_nombre,this.u_puesto,this.u_agencia); 
            }  
        })  
    },
    generarfecha(){
        var fecha;
        fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
        return fecha;      
    }, 
    informacionagencia(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
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
    mostrarpdf(nombre,puesto,agencia){

        let me=this; 
        var dd = me.downloadPdf();
        var pdfMake = require('pdfmake/build/pdfmake.js')
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.pdfMake.vfs; 
        }

        var dd = me.downloadPdf(nombre,puesto,agencia);
        var doc = pdfMake.createPdf(dd);    
        var doc = pdfMake.createPdf(dd).print();
            
    },
    downloadPdf(nombre,puesto,agencia) {

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
        var fecha = this.generarfecha();
        //***************************************************************************** */
        var html =htmlToPdfmake(
            this.textocontencion
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
                        {
                            text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                            style: 'subheaderlogo', 
                            style: 'PiePagina', 
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
                            text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                            style: 'Adscripcion',
                             absolutePosition: {x: 85, y: 95},
                        }, 
                
                
                {
                    text:
                    this.u_distrito+", Hidalgo a "+fecha + '\n\n\n',                        
                    style: 'Fecha',
                    alignment: 'right', 
                },                     
                {
                    text: html ,                        
                    style: 'Texto',
                },
                {
                    text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',   
                    alignment :'justify',                     
                    style: 'DePara',                                                           
                },
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
                    color:'white',
                },
                Texto:{
                    fontSize: 10,
                    alignment:'justify'
                },
                Titulo:{
                    fontSize: 12,
                    bold:true 
                },
                
            }

    }
           
        var doc = pdfMake.createPdf(dd);
        var f = document.getElementById('iframepdf');
        var callback = function(url) { f.setAttribute('src',url); }
        doc.getDataUrl(callback, doc);
        this.modaldocumento=true;
        return dd;
    },
    mostrarpdf3(nombre,puesto,agencia){

        let me=this; 
        var dd = me.downloadPdf3(nombre,puesto,agencia);
        var pdfMake = require('pdfmake/build/pdfmake.js')
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.pdfMake.vfs; 
        }

        var dd = me.downloadPdf3(nombre,puesto,agencia);
        var doc = pdfMake.createPdf(dd);    
        var doc = pdfMake.createPdf(dd).print();
            
    },
    downloadPdf3(nombre,puesto,agencia) {

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
        var fecha = this.generarfecha();
        //***************************************************************************** */
        var html =htmlToPdfmake(
            this.textolibre
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
                        {
                            text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                            style: 'subheaderlogo', 
                            style: 'PiePagina', 
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
                            text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                            style: 'Adscripcion',
                             absolutePosition: {x: 85, y: 95},
                        }, 
                
                
                {
                    text:
                    this.u_distrito+", Hidalgo a "+fecha + '\n\n\n',                        
                    style: 'Fecha',
                    alignment: 'right', 
                },                     
                {
                    text: html ,                        
                    style: 'Texto',
                },
                {
                    text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',   
                    alignment :'justify',                     
                    style: 'DePara',                                                           
                },
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
                    color:'white',
                },
                Texto:{
                    fontSize: 10,
                    alignment:'justify'
                },
                Titulo:{
                    fontSize: 12,
                    bold:true 
                },
                
            }

    }
           
        var doc = pdfMake.createPdf(dd);
        var f = document.getElementById('iframepdf3');
        var callback = function(url) { f.setAttribute('src',url); }
        doc.getDataUrl(callback, doc);
        this.modaldocumento3=true;
        return dd;
    },
    mostrarpdf2(nombre,puesto,agencia){

            let me=this; 
            var dd = me.downloadPdf2(nombre,puesto,agencia);
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }


            var dd = me.downloadPdf2(nombre,puesto,agencia);
            var doc = pdfMake.createPdf(dd);
            me.modaldocumento2=true;    
            
            var doc = pdfMake.createPdf(dd).print();
               
    },
    downloadPdf2(nombre,puesto,agencia) {

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
        var html =htmlToPdfmake(
            this.texto2
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
                        {
                            text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                            style: 'subheaderlogo', 
                            style: 'PiePagina', 
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
                            text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                            style: 'Adscripcion',
                            absolutePosition: {x: 85, y: 75},
                        },  
                
                {
                    text:'Número de oficio: ' +this.numerooficio2+ '\n\n'+
                    "Asunto/Tipo: "+ this.asuntooficio + '\n\n',                        
                    style: 'Nooficio',
                    alignment: 'right', 
                }, 
                {
                    text:
                    this.u_distrito+", Hidalgo a "+this.fechas+ "\n",                        
                    style: 'Fecha',
                    alignment: 'right', 
                },                               
                {
                    text: html ,                        
                    style: 'Texto',
                },
                {
                    text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',   
                    alignment :'justify',                     
                    style: 'DePara',                                                           
                },
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
                        color:'white',
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

    }
        

        
        var doc = pdfMake.createPdf(dd);
        var f = document.getElementById('iframepdf2');
        var callback = function(url) { f.setAttribute('src',url); }
        doc.getDataUrl(callback, doc);
        this.modaldocumento2=true;
        return dd;
            
        
    },
    mostrarpdfregistro(nombre,puesto,agencia){

            let me=this; 
            var dd = me.downloadPdfregistro(nombre,puesto,agencia);
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }


            var dd = me.downloadPdfregistro(nombre,puesto,agencia);
            var doc = pdfMake.createPdf(dd);
            me.modaldocumento=true;    
            
            var doc = pdfMake.createPdf(dd).print();
               
    },
    downloadPdfregistro(nombre,puesto,agencia) {

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
        var html =htmlToPdfmake(
            this.textolibrere
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
                        {
                            text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                            style: 'subheaderlogo', 
                            style: 'PiePagina', 
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
                            text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                            style: 'Adscripcion',
                            absolutePosition: {x: 85, y: 95},
                        }, 
                
                {
                    text:'Número de oficio: ' +this.numerooficio3+ '\n\n',                      
                    style: 'Nooficio',
                    alignment: 'right', 
                }, 
                {
                    text:
                    this.u_distrito+", Hidalgo a "+this.fechas+ "\n\n",                        
                    style: 'Fecha',
                    alignment: 'right', 
                },         
                '\n\n\n',
                {
                    text:  this.tipo + "\n\n\n\n\n" ,
                    style: 'Titulo'
                },                      
                {
                    text: html ,                        
                    style: 'Texto',
                },
                {
                    text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',   
                    alignment :'justify',                     
                    style: 'DePara',                                                           
                },
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
                        color:'white',
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

    }
        

        
        var doc = pdfMake.createPdf(dd);
        var f = document.getElementById('iframepdf');
        var callback = function(url) { f.setAttribute('src',url); }
        doc.getDataUrl(callback, doc);
        this.modaldocumento=true;
        return dd;
            
        
    },
    obtenerformatos(){ 
        let me=this;
        me.dia = moment().format('DD');
        me.mes = moment().format('MMMM')
        me.año= moment().format("YYYY") 
        me.hr= moment().format('h:mm:ss a')
        me.fecha = me.dia + " de " + me.mes  + " del " + me.año
        //************************************************************ */
        if (this.checkbox1==true){
            this.ModalRAC=1;
        }
        else{
            this.ModalRAC=0;
        }
        //************************************************************ */
        if (this.checkbox2==true){
            this.ModalDependenciaDerivacion=1;
           
        }
        else{
            this.ModalDependenciaDerivacion=0;
            this.incompetencia=""
        }
        //************************************************************ */
        
        //************************************************************ */ 
        
        //************************************************************ */ 
    },
    ocultarformatoRAC(){
        this.ModalRAC=0;
    },
    ocultarformatoSP(){
        this.ModalServicioPericial=0;
    },
    ocultarformatoDD(){ 
       this.ModalDependenciaDerivacion=0; 
    },  
    ocultarformatoAbstencionI(){
         this.ModalAbstencionI=0;
    },
    
    }, 
    
    
}
  
</script>

<style>
    
    #logo1 {
        float: left;
        margin-left: 2%;
        margin-right: 2%;
    }
    #logo2 {
        float: right;
        margin-left: 2%;
        margin-right: 2%;
    }
    #imagen1 {
        width: 297px;
    }
     #imagen2 {
        width: 95px;
    }
   #datos {
         
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: right;
    }

    #encabezado {
        margin-top: 100;
        text-align: right;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 27px;
    }
    #cuerpo {
     
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: justify;
    }
    .titulo {
         font-size: 22px;
    }
    .texto{
        font-size: 20px;
        
    }
    .tituloright {
         font-size: 22px;
         text-align: right;
    }
    .textoright{
        font-size: 20px;
        text-align: right;
    }
    #formato {
        text-align: left;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 20px;
    }
     #titcenter { 
        text-align: center;
    }
     section {
        clear: left;
    }

    
    #footer {
        margin-top: 20%;
        text-align: center;
    }
    .table {
         width:100%;
          margin-top: 10px;
        margin-left: 10px;
         border-collapse:collapse;
        border-spacing:30px;
      }
</style>

 


 

