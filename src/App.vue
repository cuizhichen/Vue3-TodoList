<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./pages/Home/Index.vue";

export default defineComponent({
  name: "App",
  components: {
    Home
  }
});
</script>

<style>
#app {
  height: 100%;
}
</style>
