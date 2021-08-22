<template>
  <div class="__player_lookup__">
    <v-container class="py-8 px-6">
     
      <v-row>
        <v-col cols="12">
          <v-card class="overflow-auto" style="max-height: calc(100vh - 140px)">
            <v-card-title>
              Player Lookup
            </v-card-title>
            <v-container>
              <v-flex class="row pa-12">
                <v-text-field label="Ally Code" style="max-width: 15em" v-model="ally_code">
                  <template v-slot:append>
                    <v-btn v-on:click="search"><v-icon>mdi-account-search</v-icon></v-btn>
                  </template>
                </v-text-field>
              </v-flex>
              <v-flex>

                <div v-for="(team, i) in search_results" :key="i">
                  <div class="d-flex flex-row ma-2 pa-3 align-center">
                    <v-avatar size="70px" style="margin-right: 25px; background: grey;">
                      <div style="height:100%; width: 100%">
                        <img v-if="get_unit_image(team.desired_roster.target_unit)"
                             :src="`${get_unit_image(team.desired_roster.target_unit)}`"/>
                        <v-icon size="50px" color="white" v-else>mdi-human-queue</v-icon>
                        <v-progress-circular
                            :rotate="-90"
                            size="70" :color="team.target_progress === 100 ? '#f3cb5a ': 'green'"
                            :value="team.target_progress" style="position: absolute; z-index:100; top:0; left: 0">
                        </v-progress-circular>
                      </div>
                    </v-avatar>
                    <div v-for="(unit, name) in team.roster_units" :key="unit.unit"
                         style="align-items: center; height: 60px; width:60px; position:relative;"
                         class="d-flex flex-column ma-2">
                      <div>
                        {{unit}}
                      <v-avatar size="60px" style="background: grey; position: absolute; top: 0; left:0;">
                        <img v-if="name" :src="`${get_unit_by_id(name).image}`" :alt="name+' portrait'"/>
                        <v-icon size="50px" color="white" v-else>mdi-human-queue</v-icon>
                      </v-avatar>
                      <v-progress-circular
                          :rotate="-90"
                          size="60" :color="unit.current_progress === 100 ? '#f3cb5a ': 'green'"
                          :value="unit.current_progress" style="position: absolute; z-index:100; top:0; left: 0">
                      </v-progress-circular>
                      </div>
                    </div>
                  </div>

                  <v-divider
                      v-if="i !== search_results.length - 1"
                      :key="`divider-${i}`"
                      inset
                  ></v-divider>
                </div>
              </v-flex>

            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CharacterPortrait from "./CharacterPortrait";
import CollectionUnit from "./forms/CollectionUnit";
export default {
  name: "PlayerLookup",
  components: {CharacterPortrait, CollectionUnit},
  data: () => ({
    ally_code: '929258674',
  }),
  computed: {
    search_results() {
      return this.$store.state.search_result;
    },
    data_table() {
      const headers = [

      ];
      const items = [

      ];
      return { headers, items };
    },
  },
  methods: {
    search(){
      this.$store.dispatch('user_lookup', this.ally_code);
    },
    get_unit_image(unit_name) {
      return this.get_unit_by_id(unit_name)?.image;
    },
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
  }
}
</script>

<style lang="scss">
.__player_lookup__ {

}
</style>
