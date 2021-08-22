<template>
  <v-container style="max-width: 1200px;">
    <v-card>
      <desired_team_creator></desired_team_creator>
    </v-card>
  </v-container>
</template>

<script>
import desired_team_creator from "./forms/DesiredTeamCreator";
export default {
  name: "TeamCreator",
  components: {desired_team_creator},
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

