<template>
  <v-container class="py-8 px-6 __team_viewer__">
    <v-row v-if="active_team">
      <v-col cols="12">
        <v-card v-if="!edit_mode">
          <v-card-title>
            <v-avatar size="60px" style="margin-right: 25px; background: grey;">
              <img v-if="active_team.target_unit" :src="`${get_unit_by_id(active_team.target_unit).image}`"/>
              <v-icon size="50px" color="white" v-else>mdi-human-queue</v-icon>
            </v-avatar>
            {{ active_team.name }}
            <v-spacer/>
            <v-btn icon v-on:click="move_team_up()">
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>
            <v-btn icon v-on:click="move_team_down()">
              <v-icon>mdi-arrow-down-bold</v-icon>
            </v-btn>
            <v-btn icon v-on:click="edit_mode=true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon v-on:click="delete_team">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <ul style="padding: 5px 25px; margin-left: 25px;">
            <li><span :style="{color: active_team.include_in_progress_all ? 'green' : 'red'}">
              {{active_team.include_in_progress_all ? '': 'Not '}}Included in Full Progress Report
            </span></li>
            <li><span :style="{color: active_team.include_in_player_lookup ? 'green' : 'red'}">
              {{active_team.include_in_player_lookup ? '': 'Not '}}Included in Player Lookup
            </span></li>
          </ul>

          <v-list two-line>
            <template v-for="(unit, i) in active_team.roster">
              <v-list-item :key="unit.id">
                <v-list-item-avatar color="grey darken-1">
                  <img :src="`${get_unit_by_id(unit.unit).image}`"/>
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
        <v-card v-if="edit_mode">
          <desired_team_creator :initial_team="active_team" :id="active_team.id" @team_saved="edit_mode=false"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import desired_team_creator from './forms/DesiredTeamCreator';

export default {
  name: "TeamViewer",
  props: ['id'],
  components: {desired_team_creator},
  data() {
    return {
      edit_mode: false,
    };
  },
  watch: {
    id(){
      this.edit_mode = false;
    },
  },
  computed: {
    active_team() {
      return this.$store.getters['get_team_by_id'](this.id);
    }
  },
  methods: {
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
    async move_team_up(){
      await this.$store.dispatch('move_desired_team_up', this.id);
    },
    async move_team_down(){
      await this.$store.dispatch('move_desired_team_down', this.id);
    },
    async delete_team() {
      await this.$store.dispatch('delete_desired_team', this.id);
      this.$emit('team_deleted');
    }
  }
}
</script>
<style lang="scss">
.__team_viewer__ {
  &.container{
    max-width: 100%;
    width: 100%;
    padding: 0;;
    display: flex;
    justify-content: center;
    height: calc(100vh - 60px);
    overflow-y: auto;

    .standalone &{
      height: 100vh;
    }
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
    max-width: 1200px;
  }

}
</style>
