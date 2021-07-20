<template>
  <v-app>
    <v-app-bar app dark color="primary" clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text to="/">Home</v-btn>
      <v-spacer></v-spacer>
      <v-btn text to="/admin">Admin</v-btn>
    </v-app-bar>
    <router-view :drawer="drawer" @input:drawer="drawer=$event"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('refresh');
  },
  data:() => ({
    drawer: true,
  }),
  computed: {
    ready() {
      return this.$store.state.ready;
    }
  },
}
</script>
