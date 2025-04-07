 <template>
  <v-layout row wrap  auto-grow>
    <v-flex elevation-0>
        <v-card flat color="white" grow  class="d-flex align-content-start flex-wrap" > 
            
               
                    <v-card>
                        
                        <v-card-text> 
                            <v-icon size="400px" color="accent"    >settings</v-icon> 
                        </v-card-text>
                    </v-card>
              
                     
                     <v-card  auto-grow>
                     
                        <v-card-title  class="accent" >
                           <div class="display-2 font-weight-thin" color="blue"><p color="blue">Modulo de configuración</p></div>
                        </v-card-title>
                        <v-card-text>
                          <v-list   > 
                              <p class="text-md-left">Este modulo permite ....</p> 
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon color="success">settings</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Catalogos de estrucura</a></p> </v-list-tile-title> 
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Acceso a los recursos de este ámbito, active o desactive un modulo o entidad de servicio.</a></p>  </v-list-tile-sub-title>  
                                </v-list-tile-content> 
                              </v-list-tile>
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon    color="success">security</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Catalogos de configuración</a></p> </v-list-tile-title> 
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Consulte los roles, de las entidades de servicio   administradas que tienen asignaciones de roles que les conceden acceso en este ámbito.</a></p>  </v-list-tile-sub-title>  
                                </v-list-tile-content> 
                              </v-list-tile>
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon   color="success">people_alt</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Catalogos generales</a></p> </v-list-tile-title>   
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Consulte los usuarios, los grupos, las entidades de servicio y las identidades administradas a los que se les ha denegado el acceso a acciones específicas en este ámbito.</a></p>  </v-list-tile-sub-title> 
                                </v-list-tile-content> 
                              </v-list-tile> 
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon   color="success">people_alt</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Catalogos INEGI</a></p> </v-list-tile-title>   
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Consulte los usuarios, los grupos, las entidades de servicio y las identidades administradas a los que se les ha denegado el acceso a acciones específicas en este ámbito.</a></p>  </v-list-tile-sub-title> 
                                </v-list-tile-content> 
                              </v-list-tile> 
                              <v-list-tile>  
                                <v-list-tile-action>
                                    <v-icon   color="success">people_alt</v-icon>
                                </v-list-tile-action> 
                                <v-list-tile-content>  
                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Catalogos para servicios periciales</a></p> </v-list-tile-title>   
                                    <v-list-tile-sub-title > <p color="accent" class="caption font-weight-regular"><a>Consulte los usuarios, los grupos, las entidades de servicio y las identidades administradas a los que se les ha denegado el acceso a acciones específicas en este ámbito.</a></p>  </v-list-tile-sub-title> 
                                </v-list-tile-content> 
                              </v-list-tile> 
                              <br>
                               
                          </v-list> 
                          <div>
                         
                            
                          </div>
                          
                        </v-card-text>
                    </v-card>
          
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
   

  export default {
    data(){
        return {
        }
    },
    components: {
     
    },
    methods: {
     
    },
  } 
</script>
