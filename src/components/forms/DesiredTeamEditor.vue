<template>
    <v-card class="pa-10">

        <v-card-title>
        KAM
        </v-card-title>
        <div class="d-flex flex-column align-stretch">

            <h5 class=" align-self-start">Target Unit:</h5>
            <div class="d-flex flex-row">
                <UnitSelection v-model="team_target" ></UnitSelection>
            </div>
            <h5 class="mb-5 align-self-start">Required Units:</h5>
            <template v-for="unit in desired_team_roster">
                <DesiredTeamRow
                        :key="unit.id"
                        :id="unit.id"
                        :is_ship="unit.is_ship"
                        @delete_row="delete_row"
                >
                </DesiredTeamRow>
            </template>

        </div>
        <v-card-actions class="justify-end mt-10">
            <v-btn v-on:click="add_character">Add Character</v-btn>
            <v-btn v-on:click="add_ship">Add Ship</v-btn>
            <v-btn color="primary">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DesiredTeamRow from "./DesiredTeamRow";
    import UnitSelection from "./Unit_Selection";
    import {v4 as uuid} from "uuid";


    export default {
        name: "desired_team_editor",
        components: {DesiredTeamRow, UnitSelection},
        data: () => ({
            team_target: '',
            desired_team_roster: [

            ],
        }),
        methods: {
            delete_row(id) {
                console.log({id});
              this.desired_team_roster = this.desired_team_roster.filter(
                  e => e.id !== id
              )
            },
            add_character() {
                this.desired_team_roster.push({
                    is_ship:false,
                    id:uuid(),
                })
            },
            add_ship() {
                this.desired_team_roster.push({
                    is_ship:true,
                    id: uuid(),
                })
            }
        }
    }
</script>

<style scoped>

</style>
