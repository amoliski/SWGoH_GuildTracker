<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"></v-col>

      <v-col class="mb-8" style="max-width:800px">
       <desired_team_editor></desired_team_editor>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import desired_team_editor from "./forms/DesiredTeamEditor";

  export default {
    name: 'MainContent',
    components: {desired_team_editor},
    data: () => ({
    }),
  }
</script>
