<template>
  <div>
    <div v-if="$store.state.loader" class="fullscreen-loader">
      <v-card color="primary" dark class="loader-card">
        <v-card-text>
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
      </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoaderDialog",
};
</script>

<style scoped>
.fullscreen-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.loader-card {
  width: 300px;
  padding: 5px;
  text-align: left;
}
</style>