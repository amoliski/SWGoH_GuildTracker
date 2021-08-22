<template>
  <v-card class="pa-10">

    <v-card-title>
      <v-text-field label="Roster Name" v-model="name"></v-text-field>
    </v-card-title>
    <div class="d-flex flex-column align-stretch">
      <h5 class=" align-self-start">Target Unit:</h5>
      <div class="d-flex flex-row">
        <UnitSelection v-model="target_unit" :ships="true" :units="true"></UnitSelection>
      </div>
      <h5 class="mb-5 align-self-start">Options:</h5>
      <v-checkbox
          v-model="include_in_player_lookup"
          label="Include in Player Lookup"
      />
      <v-checkbox
          v-model="include_in_progress_all"
          label="Include in Full Progress Report (!progress with no team argument)"
      />
      <h5 class="mb-5 align-self-start">Required Units:</h5>
      <template v-for="member in desired_team_roster">
        <DesiredTeamRow
            :key="member.id"
            :id="member.id"
            :member="member"
            @delete_row="delete_row"
        >
        </DesiredTeamRow>
      </template>

    </div>
    <v-card-actions class="justify-end mt-10">
      <v-btn v-on:click="add_character">Add Character</v-btn>
      <v-btn v-on:click="add_ship">Add Ship</v-btn>
      <v-btn v-on:click="save" color="primary">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DesiredTeamRow from "./DesiredTeamRow";
import UnitSelection from "./UnitSelection";
import {v4 as uuid} from "uuid";


export default {
  name: "desired_team_editor",
  components: {DesiredTeamRow, UnitSelection},
  props: ['initial_team', 'id'],
  data: () => ({
    target_unit: '',
    name: '',
    desired_team_roster: [],
    include_in_progress_all: true,
    include_in_player_lookup: true,
  }),
  mounted() {
    this.name = this?.initial_team?.name || '';
    this.desired_team_roster = this.initial_team?.roster || [];
    this.include_in_progress_all = this.initial_team?.include_in_progress_all || false;
    this.include_in_player_lookup = this.initial_team?.include_in_player_lookup || false;
    // Need to do on next tick or the selection component doesn't see the change for some reason...
    this.$nextTick(() => {
      this.target_unit = this?.initial_team?.target_unit || '';
    });
  },
  methods: {
    async save() {
      if(this.id){
        await this.$store.dispatch('update_desired_team', {
          target_unit: this.target_unit,
          name: this.name,
          roster: this.desired_team_roster,
          id: this.id,
          include_in_progress_all: this.include_in_progress_all,
          include_in_player_lookup: this.include_in_player_lookup,

        });
        this.$emit('team_saved');
      } else {
        await this.$store.dispatch('add_desired_team', {
          target_unit: this.target_unit,
          name: this.name,
          roster: this.desired_team_roster,
          id: uuid(),
          include_in_progress_all: this.include_in_progress_all,
          include_in_player_lookup: this.include_in_player_lookup,
        });
        this.target_unit = '';
        this.name = '';
        this.$set(this, 'desired_team_roster', []);
        this.include_in_progress_all = true;
        this.include_in_player_lookup = true;
      }
    },
    delete_row(id) {
      this.desired_team_roster = this.desired_team_roster.filter(
          e => e.id !== id
      )
    },
    add_character() {
      this.desired_team_roster.push({
        unit: '',
        is_ship:false,
        id:uuid(),
        stars: 7,
        gear: 13,
        relic: 5,
        is_relic: true,
      })
    },
    add_ship() {
      this.desired_team_roster.push({
        unit: '',
        is_ship:true,
        id: uuid(),
        stars: 7,
        gear: 13,
        relic: 5,
        is_relic: true,
      })
    }
  }
}
</script>

<style scoped>

</style>
