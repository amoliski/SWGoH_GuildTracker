<template>
  <v-container class="py-8 px-6">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-avatar size="60px" style="margin-right: 25px; background: grey;">
              <img v-if="active_team.target_unit" :src="`https://swgoh.gg/${get_unit_by_id(active_team.target_unit).image}`"/>
              <v-icon size="50px" color="white" v-else>mdi-human-queue</v-icon>
            </v-avatar>
            {{ active_team.name }}
            <v-spacer/>
            <v-btn icon v-on:click="delete_team">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-list two-line>
            <template v-for="(unit, i) in active_team.roster">
              <v-list-item :key="unit.id">
                <v-list-item-avatar color="grey darken-1">
                  <img :src="`https://swgoh.gg/${get_unit_by_id(unit.unit).image}`"/>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ get_unit_by_id(unit.unit).name }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <span v-if="unit.is_ship">{{unit.stars}} Star<span v-if="unit.stars !== 1">s</span></span>
                    <span v-else>Gear: {{unit.gear}} <span v-if="unit.is_relic">Relic: {{ unit.relic }}</span></span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider
                  v-if="i !== active_team.roster.length - 1"
                  :key="`divider-${i}`"
                  inset
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TeamViewer",
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
    async delete_team() {
      await this.$store.dispatch('delete_desired_team', this.id);
      this.$emit('team_deleted');
    }
  }
}
</script>

