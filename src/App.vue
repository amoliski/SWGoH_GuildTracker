<template>
  <v-app>
    <v-app-bar app dark color="primary" clipped-left v-if="!standalone">
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
  watch: {
    '$route.query.standalone': {
      handler(n,o) {
        if (n) {
          document.body.classList.add('standalone');
        } else {
          document.body.classList.remove('standalone');
        }
      },
      immediate: true,
    }
  },
  data:() => ({
    drawer: true,
  }),
  computed: {
    standalone() {
      return !!this.$route.query.standalone;
    },
    ready() {
      return this.$store.state.ready;
    }
  },
}
</script>

<style>
.v-application header.primary {
  background-color: #5f2424 !important;
}
</style>
