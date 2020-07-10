<template>
  <div id="app">
    <div id="nav">
      <Navegacion />


    </div>
    <router-view />
  </div>
</template>
<script>
import Navegacion from "@/components/layout/Navegacion";
export default {
  components: {
    Navegacion
  }
};
</script>

<style lang="scss">
@import "./scss/App.scss";
</style>


