<template>
  <v-container>
    <v-layout text-xs-center wrap pa-5>
      <v-flex xs12>
        <div class="display-4 accent--text medium">401</div>
        <br>
        <div class="title">NO AUTORIZADO</div>
        <br>
        <div class="subtitle-1">Lo siento pero no esta autorizado para  realizar esta acción</div>
        <br>
        <div class="subtitle-2">La solicitud requiere autenticación de usuario</div>
        <br>
       <a href="~/login">Ir  a la pagina de inicio de sesión</a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      
    })
  }
</script>

<style>

</style>
