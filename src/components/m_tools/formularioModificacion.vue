
<script src="./formularioModificacion.js"></script>
<template>
      <v-dialog v-model="opciones.mostrar" max-width="500px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar  size="30">
              <v-icon :color="windowInfo.color" class="white lighten-2">{{ windowInfo.icon}}</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">{{ windowInfo.title}}</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    
                    <v-text-field v-if="windowInfo.extraComponents.text1"
                      name="texto1"
                      :label="formulario.texto1"
                      v-validate="'required'"
                      v-model="infoBorrado.texto1"
                      :error-messages="errors.collect('texto1')"
                    />
                    <v-text-field v-if="windowInfo.extraComponents.text2"
                      name="texto2"
                      :label="formulario.texto2"
                      v-validate="'required'"
                      v-model="infoBorrado.texto2"
                      :error-messages="errors.collect('texto2')"
                    />
                    <v-autocomplete
                      name="solicitante"
                      :items="catalogos.usuarios"
                      v-model="infoBorrado.idSolicitante"
                      label="Persona que Solicita:"
                      v-validate="'required'"
                      clearable
                      :error-messages="errors.collect('solicitante')"
                    />
                    
                    <v-text-field
                      name="razon"
                      label="Razón de modificación:"
                      v-validate="'required'"
                      v-model="infoBorrado.razon"
                      :error-messages="errors.collect('razon')"
                    />
                  
                </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="opciones.mostrar = false">Cancelar</v-btn>
                <v-btn @click.native="modificarRegistro" class="theme--dark" :color="windowInfo.color">{{ windowInfo.buttonText}}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
</template>      