<template>
  <v-container style="max-width: 600px;">
    <v-card>
      <Desired_team_editor></Desired_team_editor>
    </v-card>
  </v-container>
</template>

<script>
import Desired_team_editor from "./forms/DesiredTeamEditor";
export default {
  name: "TeamBuilder",
  components: {Desired_team_editor},
  props: ['id'],
  computed: {
    active_team() {
      return this.$store.getters['get_team_by_id'](this.id);
    }
  },
  methods: {
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
  }
}
</script>

