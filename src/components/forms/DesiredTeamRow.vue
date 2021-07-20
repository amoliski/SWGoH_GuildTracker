<template>
    <div class="d-flex flex-column">
        <div class="d-flex flex-row align-center">
            <div class="flex-grow-1">
                <ship_selection v-model="member.unit" v-if="member.is_ship"></ship_selection>
                <unit_selection v-model="member.unit" v-else></unit_selection>
            </div>
            <div class="d-flex flex-row ml-10" v-if="member.is_ship">
                <div v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i">
                    <v-btn icon tile v-on:click="member.stars = i" style="min-width: 1.5em; width: 1.5em;">
                        <v-icon :color="member.stars >= i ? 'yellow':'grey'">mdi-star</v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="d-flex flex-row align-center ml-10" v-else>
                <v-btn
                        v-on:click="toggle_relic"
                        class="mr-5"
                >{{member.is_relic? "relic":"gear"}}</v-btn>
              <!-- Relic level -->
              <v-text-field
                    v-if="member.is_relic"
                    type="number"
                    v-model="member.relic"
                    :max='9' :min='0'
                    style="width: 3em"></v-text-field>
              <!-- Gear level -->
              <v-text-field
                    v-else
                    type="number"
                    v-model="member.gear"
                    :max="13" :min="1"
                    style="width: 3em"></v-text-field>
            </div>
            <div class="ml-10">
                <v-btn icon v-on:click="delete_row">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import unit_selection from "./UnitSelection";
    import ship_selection from "./ShipSelection";

    export default {
        name: "DesiredTeamRow",
        components: {unit_selection, ship_selection},
        props: {
            id: {},
            member: {},
        },
        methods: {
            toggle_relic() {
              if (this.member.is_relic) {
                this.member.is_relic = false;
                this.member.gear = 12;
                this.member.relic = 0;
              } else {
                this.member.is_relic = true;
                this.member.gear = 12;
                this.member.relic = 1;
              }
            },
            delete_row() {
                this.$emit('delete_row', this.id)
            }
        },
    }
</script>

<style scoped>

</style>
