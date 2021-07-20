<template>
    <v-card class="pa-10">

        <v-card-title>
        <v-text-field label="Roster Name" v-model="name"></v-text-field>
        </v-card-title>
        <div class="d-flex flex-column align-stretch">

            <h5 class=" align-self-start">Target Unit:</h5>
            <div class="d-flex flex-row">
                <UnitSelection v-model="team_target" ></UnitSelection>
            </div>
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
        data: () => ({
            team_target: '',
            name: '',
            desired_team_roster: [],
        }),
        methods: {
            async save() {
              await this.$store.dispatch('add_desired_team', {
                target_unit: this.team_target,
                name: this.name,
                roster: this.desired_team_roster,
                id: uuid(),
              });
              this.team_target = '';
              this.name = '';
              this.$set(this, 'desired_team_roster', []);
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
