<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Agenda</v-toolbar-title>
                    
                    <v-divider class="mx-2 pt-2" inset vertical></v-divider>
                    <v-tooltip bottom> 
                        <template v-slot:activator="{ on }"> 
                        <v-btn class="mx-2 pt-2" fab v-on="on" small color="success"  @click="$refs.calendar.prev()" >
                            <v-icon class="mt-1" dark>
                                keyboard_arrow_left
                            </v-icon>
                        </v-btn>
                        </template>
                        <span>Anterior</span>
                    </v-tooltip>

                    <v-tooltip bottom> 
                        <template v-slot:activator="{ on }"> 
                            <v-btn class="mx-2 pt-2" fab v-on="on" small color="success" @click="$refs.calendar.next()"  >
                            <v-icon class="mt-1">
                                keyboard_arrow_right
                            </v-icon>
                            </v-btn>
                        </template>
                        <span>Siguiente</span>
                    </v-tooltip> 

                    <v-divider class="mx-2" inset vertical></v-divider>

                    <v-tooltip bottom> 
                        <template v-slot:activator="{ on }"> 
                            <v-btn outline v-on="on"   small  color="primary"  @click="today2()" > 
                            HOY
                            </v-btn>
                        </template>
                        <span>Cargar al dia de hoy</span>
                    </v-tooltip> 

                    <v-spacer></v-spacer>

                    <div class="justify-center layout px-0" > 
                        <a class="headline font-weight-light"> 
                        {{ formatearfecha(today) }}
                        </a> 
                    </div>
                    <v-spacer></v-spacer>
                    <v-autocomplete
                        v-if="esCoordinador || esDirector || esAdministrador"
                        name = "modulo"
                        label="Modulo:"
                        :items="modulos"
                        v-model="modulo"                                         
                        @change="listar(modulo)">
                    </v-autocomplete>
                    <v-spacer></v-spacer>
                    <v-autocomplete
                        :items="tiposc"
                        v-model="tipoc">
                    </v-autocomplete>
                

                        

                        

                                          
        </v-toolbar>

        <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >
                        <v-sheet height="600">
                            <v-calendar
                            v-model="today"
                            color="primary"
                            :type="tipoc"
                            locale="es"
                            ref="calendar"
                            >
                            <template v-slot:day="{ date }">
                                <template v-for="event in eventsMap[date]">
                                    <v-menu
                                        :key="event.idAgenda"
                                        v-model="event.aux"
                                        full-width
                                        offset-x
                                    >
                                        <template v-slot:activator="{ on }">
                                            <div     
                                                v-if="event.tipo==2"                                                
                                                v-ripple                          
                                                class ="my-event2"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div     
                                                v-if="event.tipo==3"                                                
                                                v-ripple                          
                                                class ="my-event3"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div     
                                                v-if="event.tipo==4"                                                
                                                v-ripple                          
                                                class ="my-event4"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div     
                                                v-if="event.tipo==5"                                                
                                                v-ripple                          
                                                class ="my-event5"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div     
                                                v-if="event.tipo==6"                                                
                                                v-ripple                          
                                                class ="my-event6"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div     
                                                v-if="event.tipo==10"                                                
                                                v-ripple                          
                                                class ="my-event10"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div     
                                                v-if="event.tipo==11"                                                
                                                v-ripple                          
                                                class ="my-event11"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>  
                                            <div     
                                                v-if="event.tipo==12"                                                
                                                v-ripple                          
                                                class ="my-event12"
                                                v-on="on"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>                                     
                                        </template>
                                        <v-card
                                            color="grey lighten-4"
                                            min-width="350px"
                                            flat
                                            >
                                            <v-toolbar                          
                                                color="primary"
                                                dark
                                            >
                                                <v-toolbar-title v-html="texto(event.tipo,event.tipo2)"></v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }"> 
                                                        <v-btn  slot="activator" v-on="on" @click="dialogoact(event)" icon>
                                                            <v-icon dark>update</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Actualizar información</span>
                                                </v-tooltip>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }"> 
                                                        <v-btn  slot="activator" v-on="on" icon>
                                                            <v-icon dark>close</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Cerrar</span>
                                                </v-tooltip>
                                            </v-toolbar>
                                            
                                                <v-card-text >
                                                    <v-list one-line> 
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">cached</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Status:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.status}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">event</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de citación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ event.fechaCitacion.substring(8,10) +' de '+ obtenermes(event.fechaCitacion.substring(5,7)-1)+' del '+event.fechaCitacion.substring(0,4) }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">query_builder</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Hora citación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ event.fechaCitacion.substring(11,19)}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>  
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">vpn_key</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>NUC:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ event.nuc}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">local_library</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Agendado por:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.usuario}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile v-if="event.tipo == 10 || event.tipo == 11">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">contacts</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Observación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.dirigidoNombre}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' ">   
                                                        <v-list-tile-action>
                                                            <v-icon color="success">link</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Vinculado:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.viculada ? "Si" : "No" }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' "> 
                                                        <v-list-tile-action>
                                                            <v-icon color="success">date_range</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Plazo de la investigación complementaria:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.plazoInvestigacion}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' ">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">hourglass_empty</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Se solicito prorroga:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.prorroga ? "Si" : "No" }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' && event.prorroga ">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">update</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tiempo de la prorroga:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.tiempoProrroga}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>   
                                                                                                                                           
                                                </v-list> 
                                                </v-card-text>
                                            <v-card-actions>

                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                </template>
                            </template>


                            <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                                <template v-for="event in eventsMap[date]">
                                    <v-menu
                                        :key="event.idAgenda"
                                        v-model="event.aux"
                                        full-width
                                        offset-x
                                    >
                                        <template v-slot:activator="{ on }">
                                            <div
                                                v-if="event.tipo==2"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event2time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==3"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event3time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==4"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event4time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==5"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event5time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==6"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event6time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==10"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event10time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==11"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event11time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                            <div
                                                v-if="event.tipo==12"  
                                                :key="event.idAgenda"
                                                v-on="on"
                                                :style="{ top: timeToY(event.fechaCitacion.substring(11,17)) + 'px', height: minutesToPixels(30) + 'px' }"
                                                class="my-event12time"
                                                v-html="texto(event.tipo,event.tipo2)"
                                            ></div>
                                        
                                        </template>
                                        <v-card
                                            color="grey lighten-4"
                                            min-width="350px"
                                            flat
                                            >
                                            <v-toolbar                          
                                                color="primary"
                                                dark
                                            >
                                                <v-toolbar-title v-html="texto(event.tipo,event.tipo2)"></v-toolbar-title>
                                                <v-spacer></v-spacer>

                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }"> 
                                                        <v-btn  slot="activator" v-on="on" @click="dialogoact(event)" icon>
                                                            <v-icon dark>update</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Actualizar información</span>
                                                </v-tooltip>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }"> 
                                                        <v-btn  slot="activator" v-on="on" icon>
                                                            <v-icon dark>close</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Cerrar</span>
                                                </v-tooltip>
                                            </v-toolbar>
                                            


                                           <v-card-text >
                                                    <v-list one-line> 
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">cached</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Status:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.status}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">event</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de citación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ event.fechaCitacion.substring(8,10) +' de '+ obtenermes(event.fechaCitacion.substring(5,7)-1)+' del '+event.fechaCitacion.substring(0,4) }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">query_builder</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Hora citación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ event.fechaCitacion.substring(11,19)}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>  
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">vpn_key</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>NUC:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ event.nuc}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">local_library</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Agendado por:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.usuario}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile v-if="event.tipo == 10 || event.tipo == 11">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">contacts</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Observación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.dirigidoNombre}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' ">   
                                                        <v-list-tile-action>
                                                            <v-icon color="success">link</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Vinculado:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.viculada ? "Si" : "No" }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' "> 
                                                        <v-list-tile-action>
                                                            <v-icon color="success">date_range</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Plazo de la investigación complementaria:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.plazoInvestigacion}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile> 
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' ">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">feedback</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Se solicito prorroga:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.prorroga ? "Si" : "No" }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="(event.tipo == 2 || event.tipo == 3) && event.status == 'Realizada' && event.prorroga ">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">update</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tiempo de la prorroga:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{event.tiempoProrroga}}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>   
                                                                                                                                           
                                                </v-list> 
                                                </v-card-text>
                                            <v-card-actions>

                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                </template>
                            </template>

                            </v-calendar>
                        </v-sheet>
                    </v-flex>
                </v-layout>
            </v-container>
          

            <v-dialog  v-model="dialogoactualizar"  max-width="1000px" >

                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">update</v-icon>
                        </v-avatar>
                        
                        <v-toolbar-title class="subheading">{{titulodialogo}}</v-toolbar-title>
                        <v-spacer></v-spacer>                  
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            <v-container grid-list-md text-xs-center>
                                <v-layout wrap>
                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12 >
                                        <v-autocomplete
                                            name = "status nuevo"
                                            label="*Status nuevo:"
                                            :items="statuses"
                                            v-model="status"                                         
                                            v-validate="'required'"
                                            return-object
                                            :error-messages="errors.collect('status nuevo')">
                                        </v-autocomplete>
                                    </v-flex>  

                                    <v-flex v-if="status.value == 3 && (tipo == 4 || tipo == 5)  "  class="espaciado" xs12 sm12 md12 lg12 >
                                        <v-autocomplete
                                            name = "otorgada o rechazada"
                                            label="*Otorgada o rechazada:"
                                            :items="status2"
                                            v-model="statu2"                                         
                                            v-validate="'required'"
                                            return-object
                                            :error-messages="errors.collect('otorgada o rechazada')">
                                        </v-autocomplete>
                                    </v-flex> 

                                    <v-flex v-if="status.value == 2" class="espaciado" xs12 sm12 md6 lg6 >

                                        <v-switch
                                            color="success"
                                            v-model="pospuestoswitch"
                                            :label="`Cambiar fecha y hora: ${textosino3}`"
                                        ></v-switch>

                                    </v-flex>

                                    <v-flex v-if="status.value == 2 && pospuestoswitch" class="espaciado" xs12 sm12 md6 lg6 >

                                        <v-menu
                                            ref="menu1"
                                            v-model="menu1"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechacita"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                            name = "fecha citación"
                                                            :value="fechac"
                                                            label="*Fecha de cita:"
                                                            prepend-icon="event"
                                                            clearable 
                                                            readonly
                                                            v-on="on"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('fecha citación')"                                                            
                                                ></v-text-field>
                                            </template>
                                                <v-date-picker v-model="fechacita" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>

                                    </v-flex>    

                                    <v-flex  v-if="status.value == 2 && pospuestoswitch" class="espaciado" xs12 sm12 md6 lg6 >

                                        <v-menu
                                            ref="menu2"
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="horac"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    name="hora citación"
                                                    v-model="horac"
                                                    label="*Hora de cita:"
                                                    prepend-icon="access_time"
                                                    readonly
                                                    v-on="on"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('hora citación')"> 
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                            v-if="menu2"
                                            v-model="horac"
                                            full-width
                                            @click:minute="$refs.menu2.save(horac)"
                                            ></v-time-picker>
                                        </v-menu>   
                                    </v-flex> 

                                    <v-flex  v-if="status.value == 3 && (tipo == 2 || tipo == 3)" class="espaciado" xs12 sm12 md6 lg6 >
                                        <v-switch
                                            color="success"
                                            v-model="vinculada"
                                            :label="`Vinculado: ${textosino}`"
                                        ></v-switch>

                                        <v-switch
                                            color="success"
                                            v-model="prorroga"
                                            :label="`Se solicito prorroga ? ${textosino2}`"
                                        ></v-switch>

                                    </v-flex>

                                    <v-flex  v-if="status.value == 3 && (tipo == 2 || tipo == 3)" class="espaciado" xs12 sm12 md6 lg6 >
                                        
                                        <v-text-field name="plazo de la investigación complementaria" 
                                            label="*Plazo de la investigación complementaria:" 
                                            v-model="plazoinvestigacion"   
                                            v-validate="'required'" 
                                            :error-messages="errors.collect('plazo de la investigación complementaria')">  
                                        </v-text-field>

                                        <v-text-field name="tiempo de la prorroga" 
                                            v-if="prorroga"
                                            label="*Tiempo de la prorroga:" 
                                            v-model="tiempoprorroga"   
                                            v-validate="'required'" 
                                            :error-messages="errors.collect('tiempo de la prorroga')">  
                                        </v-text-field>
                                    </v-flex>

                                    <v-flex  xs12 xm12 md12 lg12 >
                                        <v-card elevation="0" >
                                            <v-card-title ><h3>*Descripción</h3></v-card-title>
                                                <v-divider ></v-divider>
                                                <v-card-text>
                                                    <v-form  > 
                                                        <vue-editor  
                                                            name="decripción"
                                                            v-model="descripcion" 
                                                            outline  height=350px;
                                                            style="max-height: 310px; overflow-y: scroll"
                                                            :editorToolbar="customToolbar"
                                                            :error-messages="errors.collect('decripción')">
                                                        </vue-editor>
                                                    </v-form>
                                                </v-card-text>   
                                        </v-card> 
                                    </v-flex> 

                                    <v-flex  v-if="status.value == 3 && (tipo == 2 || tipo == 3)" xs12 xm12 md12 lg12 >
                                        <v-card elevation="0" >
                                            <v-card-title ><h3>*Resumen de audiencia</h3></v-card-title>
                                                <v-divider ></v-divider>
                                                <v-card-text>
                                                    <v-form  > 
                                                        <vue-editor  
                                                            name="resumen"
                                                            v-model="resumen" 
                                                            outline  height=350px;
                                                            style="max-height: 310px; overflow-y: scroll"
                                                            :editorToolbar="customToolbar"
                                                            :error-messages="errors.collect('resumen')">
                                                        </vue-editor>
                                                    </v-form>
                                                </v-card-text>   
                                        </v-card>   
                                    </v-flex> 

                                                           
                                </v-layout>
                            </v-container>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  @click.native="dialogoactualizar=false" >Cerrar</v-btn>     
                                <v-btn color="success" @click.native="actualizar" >Guardar</v-btn>                                   
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
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util';
  import UmixtaNavDrawer from './umixtaNavDrawer.vue';

  export default {
    components: {      
        "vue2-editor": VueEditor,
        n401,
        n403,
        UmixtaNavDrawer
    },
    data: () => ({
        alert:false,
        dialog: false, 
        dialogoeditor: false,
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        statuses: [          
            { text: 'Cancelada', value: '1' }, 
            { text: 'Pospuesta', value: '2' },
            { text: 'Realizada', value: '3' },   
        ],
        status:'',
        tiposc: [          
            { text: 'Por dia', value: 'day' },
            { text: 'Por semana', value: 'week' },
            { text: 'Por mes', value: 'month' },  
        ],
        tipoc:'month' ,
        status:'',
        resumen:'',
        vinculada:false,
        plazoinvestigacion:'',
        prorroga:'',
        tiempoprorroga:'',
        descripcion:'',
        dialogoactualizar:false,
        descripcion:'',
        menu1:false,
        menu2:false,
        fechacita:'',
        fechac:'',
        horac:'',
        tipo:'',
        status2:[
            { text: 'Otorgada', value: true},
            { text: 'Rechazada', value: false },
        ],
        statu2:'',
         //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        eventos:[],
        today:'',
        titulodialogo:'',
        idagenda:'',
        modulos:[],
        modulo:'',
        aux:false,
        pospuestoswitch:false,
        informacion:[],
        //*************** */

        //*************** */
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
        headers: [

            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Modulo', value: 'modulo', sortable: true  },             
            { text: 'Imputado', value: 'nompersona' }, 
            { text: 'NUC', value: 'nuc' },
            { text: 'Fecha de Ingreso', value: 'fechaIngreso' },
            { text: 'Delito', value: 'delito' },
            { text: 'Autoridad captura',value: 'autoridadED' },       
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
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
    }),
       
    created () {
        let me = this 
                
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

                //*********************************************** */
                this.today= moment(new Date).format('YYYY-MM-DD');
                me.listarLogo();
                
                if(me.esAMPOAMP || me.esAmpoMixto || me.esAdministrador)                               
                me.listar(me.u_idmoduloservicio);

                me.listarmodulos()
                me.listarAudiencia()

      
      axios.interceptors.request.use( (config)=> {
          // Do something before request is sent 
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> { 
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject( error);
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

    },
    computed: {

        eventsMap () {
            const map = {}
            this.eventos.forEach(e =>   (map[e.fechaCitacion.substring(0,10)] = map[e.fechaCitacion.substring(0,10)] || []).push(e)           
            )
            
            return map
        },
        esAMPOAMP(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP';
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
        esAmpoMixto(){
            return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP Mixto';
        },
        textosino(){
            if(this.vinculada)
                return 'Si'; else return 'No'            
        },
        textosino2(){
            if(this.prorroga)
                return 'Si'; else return 'No'            
        },
        textosino3(){
            if(this.pospuestoswitch)
                return 'Si'; else return 'No'            
        },
    },
    watch: {
        
    },
    methods:{ 
        listarLogo(){
        
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                
            }).catch(err => { 
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403= true
                    me.showpage= false 
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros','error')    
                } 
            });
        }, 
        today2(){
            this.today= moment(new Date).format('YYYY-MM-DD');
        },
        formatearfecha: function(fecha){
            return moment(fecha).format('MMMM , YYYY');
        },
        texto(tipo,tipo2){
            if(tipo == 2) return "Audiencia inicial"
            if(tipo == 3) return "Audiencia inicial con orden de aprehension cumplida"
            if(tipo == 4) return "Audiencia Orden de Aprehension"
            if(tipo == 5) return "Audiencia Orden de Comparecencia"
            if(tipo == 6) return "Formulacion de acusacion"
            if(tipo == 7) return "Solicitud a investigación y litigación"
            if(tipo == 8) return "SOLICITUD AL CENTRO DE JUSTICIA RESTAURATIVA"
            if(tipo == 9) return "SOLICITUD A MEDIDAS CAUTELARES"
            if(tipo == 10) return tipo2
            if(tipo == 11) return tipo2
            if(tipo == 12) return "Audiencia Orden de Cateo"
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
        agregar(){
            let me = this;
            me.limpiar();
            me.dialogo = true;
        },
        dialogoact(item){

            this.limpiar()
            this.titulodialogo = this.texto(item.tipo,item.tipo2)
            this.horac = item.fechaCitacion.substring(11,16)
            this.fechacita = item.fechaCitacion.substring(0,10)
            this.fechac =item.fechaCitacion.substring(8,10) +" de "+ this.obtenermes(item.fechaCitacion.substring(5,7)-1)+
            " del "+ item.fechaCitacion.substring(0,4);
            this.descripcion = item.descripcionCitacion
            this.idagenda = item.idAgenda
            this.tipo = item.tipo

            this.vinculada = item.viculada
            this.prorroga = item.prorroga
            this.resumen = item.resumen
            this.plazoinvestigacion = item.plazoInvestigacion
            this.tiempoprorroga = item.tiempoProrroga                 
            this.informacion = item       

            this.dialogoactualizar = true;

        },
        fechainif(){          
                this.generarfecha2();
                this.$refs.menu1.save(this.fechacita);            
        },
        generarfecha2(){              
            this.fechac =this.fechacita.substring(8,10) +" de "+ this.obtenermes(this.fechacita.substring(5,7)-1)+
            " del "+ this.fechacita.substring(0,4);         
        },
        generarpdf(){
            this.texto = "<u><b>CITATORIO</b></u>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<u>DESTINATARIO:</u>"

            this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia)
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        }, 
        actualizar(){
           this.$validator.validate().then(result => {
                    if (result) { 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                             me.$IL.put('api/Agenda/Actualizar',{  

                                'IdAgenda' : me.idagenda ,
                                'DescripcionCitacion' : me.descripcion,
                                'status' : me.status.text,
                                'Viculada': me.vinculada,
                                'PlazoInvestigacion': me.plazoinvestigacion,
                                'FechaCitacion': me.informacion.fechaCitacion ,
                                'HoraCitacion' : me.informacion.horaCitacion,
                                'Prorroga': me.prorroga,
                                'TiempoProrroga': me.tiempoprorroga,
                                'Resumen': me.resumen,
                                'Status2' : me.statu2.value

                            },configuracion).then(function(response){
                                me.$notify('¡La información se guardo correctamente!','success')                                 
                                if(me.pospuestoswitch){
                                    
                                    me.$IL.post('api/Agenda/Crear',{ 

                                        'RHechoId' : me.informacion.rHechoId ,
                                        'NumeroOficio' : me.informacion.numeroOficio ,
                                        'CausaPenal': me.informacion.causaPenal,
                                        'Nuc': me.informacion.nuc,
                                        'Victimas': me.informacion.victimas,
                                        'Imputado': me.informacion.imputado,
                                        'Delitos': me.informacion.delitos,
                                        'Texto': me.informacion.texto,
                                        'FechaCitacion' : me.fechacita + " " + me.horac ,
                                        'Status' : "Agendado",
                                        'Tipo' : me.informacion.tipo,
                                        'DirigidoNombre' : me.informacion.dirigidoNombre,
                                        'DirigidoPuesto' : me.informacion.dirigidoPuesto,
                                        'ReDireccion' : me.informacion.reDireccion,
                                        'ReTelefono' : me.informacion.reTelefono,
                                        'ReCorreo' : me.informacion.reCorreo,
                                        'ArticulosSancion' : me.informacion.articulosSancion,
                                        'DireccionImputado' : me.informacion.direccionImputado,
                                        'TelefonoImputado' : me.informacion.telefonoImputado,
                                        'CorreoImputado' : me.informacion.correoImputado,
                                        'DefensorParticularImp' : me.informacion.defensorParticularImp,
                                        'DomicilioDPI' : me.informacion.domicilioDPI,
                                        'TelefonoDPI' : me.informacion.telefonoDPI,
                                        'CorreoDPI' : me.informacion.correoDPI,
                                        'InformacionVicAseJu' : me.informacion.informacionVicAseJu,
                                        'InformacionImpDeP' : me.informacion.informacionImpDeP,
                                        'InformacionImp' : me.informacion.informacionImp,
                                        'InformacionDelito' : me.informacion.informacionDelito,
                                        'HoraCitacion' : me.horac,
                                        'LugarCitacion' : me.lugarCitacion ,
                                        'DescripcionCitacion' : me.descripcion,
                                        'DireccionHecho' : me.informacion.direccionHecho,
                                        'HechosIII' : me.informacion.hechosIII,
                                        'ClasificacionjIII' : me.informacion.clasificacionjIII,
                                        'CorrelacionArtIII' : me.informacion.correlacionArtIII,
                                        'ArticuloIII' : me.informacion.articuloIII,
                                        'ModaidadesVI' : me.informacion.modaidadesVI,
                                        'AutoriaV' : me.informacion.autoriaV,
                                        'Autoria2V' : me.informacion.autoria2V,
                                        'PreceptosVI' : me.informacion.preceptosVI,
                                        'TestimonialVII' : me.informacion.testimonialVII,
                                        'PericialVII' : me.informacion.pericialVII,
                                        'DocumentalesVII' : me.informacion.documentalesVII,
                                        'MaterialVII' : me.informacion.materialVII,
                                        'AnticipadaVII' : me.informacion.anticipadaVII,
                                        'ArticulosVIII' : me.informacion.articulosVIII,
                                        'MontoVIII' : me.informacion.montoVIII,
                                        'NumeroLetraVIII' : me.informacion.numeroLetraVIII,
                                        'TestimonialVIII' : me.informacion.testimonialVIII,
                                        'PericialVIII' : me.informacion.pericialVIII,
                                        'DocumentalesVIII' : me.informacion.documentalesVIII,
                                        'MaterialVIII' : me.informacion.materialVIII,
                                        'ArticulosIX' : me.informacion.articulosIX,
                                        'PenaIX' : me.informacion.penaIX,
                                        'TestimonialesX' : me.informacion.testimonialesX,
                                        'TestimonialX' : me.informacion.testimonialX,
                                        'PericialX' : me.informacion.pericialX,
                                        'DocumentalesX' : me.informacion.documentalesX,
                                        'MaterialX' : me.informacion.materialX,
                                        'DecomisoXI' : me.informacion.decomisoXI,
                                        'PropuestaXII' : me.informacion.propuestaXII,
                                        'TerminacionXIII' : me.informacion.terminacionXIII,
                                        'Resumen' : me.informacion.resumen,
                                        'Viculada' : me.informacion.viculada,
                                        'PlazoInvestigacion' : me.informacion.plazoInvestigacion,
                                        'Prorroga' : me.informacion.prorroga,
                                        'TiempoProrroga' : me.informacion.tiempoProrroga,
                                        'PersonaPresentar' : me.informacion.personaPresentar,
                                        'Tipo2' : me.informacion.tipo2,
                                        'UDistrito' : me.informacion.uDistrito,
                                        'USubproc' : me.informacion.uSubproc,
                                        'UAgencia' : me.informacion.uAgencia,
                                        'Usuario' : me.informacion.usuario,
                                        'UPuesto' : me.informacion.uPuesto,
                                        'UModulo' : me.informacion.uModulo
                                                    
                                        
                                    },configuracion).then(function(response){
                                        me.$notify('¡La información se guardo correctamente!','success')   
                                        me.dialogoactualizar = false;
                                        if(me.modulo == "")
                                        me.listar(me.u_idmoduloservicio);                                                           
                                        else
                                        me.listar(me.modulo);
                                                                    
                                        me.limpiar();                      
                                    }).catch(err => { 
                                        if (err.response.status==400){
                                            me.$notify("No es un usuario válido", 'error')
                                        } else if (err.response.status==401){
                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                            me.e401 = true,
                                            me.showpage= false
                                        } else if (err.response.status==403){ 
                                            me.$notify("No esta autorizado para ver esta página", 'error')
                                            me.e403= true
                                            me.showpage= false 
                                        } else if (err.response.status==404){
                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                        }else{
                                            me.$notify('Error al intentar crear el  registro!!!','error')      
                                        } 
                                    });

                                }

                                

                                if(!me.pospuestoswitch){
                                    me.dialogoactualizar = false;
                                    if(me.modulo == "")
                                    me.listar(me.u_idmoduloservicio);                                                           
                                    else
                                    me.listar(me.modulo);
                                                                
                                    me.limpiar();  
                                }
                                

                            }).catch(err => { 
                                if (err.response.status==400){
                                    me.$notify("No es un usuario válido", 'error')
                                } else if (err.response.status==401){
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                    me.showpage= false
                                } else if (err.response.status==403){ 
                                    me.$notify("No esta autorizado para ver esta página", 'error')
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
        limpiar(){    
            let me = this;
            me.fechacita = ""
            me.fechac = ""
            me.horac = ""
            me.status = ""
            me.descripcion = ""
            me.prorroga = false
            me.vinculada = false
            me.plazoinvestigacion = ""
            me.tiempoprorroga = ""
            me.resumen = ""
            me.pospuestoswitch = false
        },
        listar(modulo){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
                me.$IL.get('api/Agenda/ListarTodospormodulo'+"/"+"0001-01-01"+"/"+ modulo,configuracion).then(function(response){
                    console.log(response.data);
                    me.eventos=response.data;
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        this.e401 = true,
                        this.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        this.e403= true
                        this.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('¡Error al intentar leer la lista roles!','error')   
                    } 
                });
                
        },   
        listarAudiencia (){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
                me.$IL.get('api/Agenda/ListarAudiencia').then(function(response){
                    console.log(response.data);
                    me.eventos=response.data;
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        this.e401 = true,
                        this.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        this.e403= true
                        this.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('¡Error al intentar leer la lista roles!','error')   
                    } 
                });
                
        },   
        listarmodulos(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var modulosarray = ''
                me.$conf.get('api/ModuloServicios/Listarmodulosporagencia/'+me.u_idagencia,configuracion).then(function(response){
                    //console.log(response);
                    modulosarray = response.data

                    modulosarray.forEach(function(x){
                        me.modulos.push({text: x.nombre, value: x.idModuloServicio})                       
                    })             
                        
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        this.e401 = true,
                        this.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        this.e403= true
                        this.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('¡Error al intentar leer la lista roles!','error')   
                    } 
                });
                
        },   
      } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
.my-event2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #009900;
    color: #ffffff;
    border: 1px solid #009900;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #ff9966;
    color: #ffffff;
    border: 1px solid #ff9966;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event4 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #999900;
    color: #ffffff;
    border: 1px solid 999900;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event5 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: blue;
    color: #ffffff;
    border: 1px solid blue;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event6 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: red;
    color: #ffffff;
    border: 1px solid red;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event10 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: purple;
    color: #ffffff;
    border: 1px solid purple;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event11 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: orange;
    color: #ffffff;
    border: 1px solid orange;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
.my-event12 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: lightseagreen;
    color: #ffffff;
    border: 1px solid lightseagreen;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}



.my-event2time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #009900;
    color: #ffffff;
    border: 1px solid #009900;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;

}
.my-event3time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #ff9966;
    color: #ffffff;
    border: 1px solid #ff9966;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;

}
.my-event4time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #999900;
    color: #ffffff;
    border: 1px solid 999900;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;

}
.my-event5time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: blue;
    color: #ffffff;
    border: 1px solid blue;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;
}
.my-event6time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: red;
    color: #ffffff;
    border: 1px solid red;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;
}
.my-event10time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: purple;
    color: #ffffff;
    border: 1px solid purple;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;
}
.my-event11time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;    
    border-radius: 2px;
    background-color: orange;
    color: #ffffff;
    border: 1px solid orange;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;
   
}
.my-event12time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;    
    border-radius: 2px;
    background-color: lightseagreen;
    color: #ffffff;
    border: 1px solid lightseagreen;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: absolute;
   
}

</style>