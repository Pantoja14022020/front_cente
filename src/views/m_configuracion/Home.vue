 <template>
  <v-app id="app" v-if="isReady">

    <ConfiguracionNavDrawer/>

    <v-content class="grey lighten-4" style="padding: 0;">
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout>
            <v-flex>
              <v-card color="white" grow  class="d-flex align-content-start">
                <v-card class="primary" style="width: 30%;">                                    
                  <v-card-text class="primary" style="box-shadow: none;"> 
                    <v-icon size="330px" color="accent">settings</v-icon> 
                  </v-card-text>
                </v-card>

                <v-card style="width: 70%; box-shadow: none;" class="primary">
                  <v-card-title class="primary">
                    <div class="display-2 font-weight-thin" color="blue">
                      <p color="blue"><b>Modulo de Configuración</b></p>
                    </div>
                  </v-card-title>
                  <v-card-text class="primary">
                    <v-list class="primary"> 
                      <p class="text-md-left">Este modulo permite.........</p> 
                      <v-list-tile class="primary">  
                        <v-list-tile-action class="primary">
                          <v-icon color="success">settings</v-icon>
                        </v-list-tile-action> 
                        <v-list-tile-content>  
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold"><a>Catalogos de estrucura</a></p>
                          </v-list-tile-title> 
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular"><a>Acceso a los recursos de este ámbito, active o desactive un modulo o entidad de servicio.</a></p>
                          </v-list-tile-sub-title>  
                        </v-list-tile-content> 
                      </v-list-tile>
                      <v-list-tile>  
                        <v-list-tile-action>
                          <v-icon    color="success">security</v-icon>
                        </v-list-tile-action> 
                        <v-list-tile-content>  
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold"><a>Catalogos de configuración</a></p>
                          </v-list-tile-title> 
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular"><a>Consulte los roles, de las entidades de servicio administradas que tienen asignaciones de roles que les conceden acceso en este ámbito.</a></p>
                          </v-list-tile-sub-title>  
                        </v-list-tile-content> 
                      </v-list-tile>
                      <v-list-tile>  
                        <v-list-tile-action>
                          <v-icon   color="success">people_alt</v-icon>
                        </v-list-tile-action> 
                        <v-list-tile-content>  
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold"><a>Catalogos generales</a></p>
                          </v-list-tile-title>   
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular"><a>Consulte los usuarios, los grupos, las entidades de servicio y las identidades administradas a los que se les ha denegado el acceso a acciones específicas en este ámbito.</a></p>
                          </v-list-tile-sub-title> 
                        </v-list-tile-content> 
                      </v-list-tile> 
                      <v-list-tile>  
                        <v-list-tile-action>
                          <v-icon color="success">people_alt</v-icon>
                        </v-list-tile-action> 
                        <v-list-tile-content>  
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold"><a>Catalogos INEGI</a></p>
                          </v-list-tile-title>   
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular"><a>Consulte los usuarios, los grupos, las entidades de servicio y las identidades administradas a los que se les ha denegado el acceso a acciones específicas en este ámbito.</a></p>
                          </v-list-tile-sub-title> 
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
                  </v-card-text>
                </v-card>       
              </v-card>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import ConfiguracionNavDrawer from '../../components/m_configuracion/ConfiguracionNavDrawer.vue';

  export default {
    data(){
        return {
          isReady: false,
        }
    },
    mounted(){
        },
        created(){
          if(!localStorage.getItem("token"))
            {
              window.location.href = "/"
            }
            else 
            {
              this.isReady = true;
              this.$store.dispatch("guardarToken", localStorage.getItem("token"))
              this.$store.dispatch("setLogin", localStorage.getItem("token"))
            }
        },
    components: {
      ConfiguracionNavDrawer,
    },
    methods: {
     
    },
  } 
</script>
