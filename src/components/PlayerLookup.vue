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
              <div v-if="search_results.name" class="pl-5">
                  <h2>
                    <a :href="`https://swgoh.gg${search_results.url}`" style="text-decoration: none;">
                      {{search_results.name}}
                    </a>
                  </h2>
                <div>
                  GP: {{formatted_gp}}
                </div>
              </div>
              <v-flex>

                <div v-for="(team, i) in rosters" :key="i">
                  <div class="d-flex flex-row ma-2 pa-3 align-center">
                    <v-avatar size="70px" style="margin-right: 25px; background: grey;">
                      <div style="height:100%; width: 100%;">
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
                    <div style="display: flex; flex-wrap: wrap">
                      <div v-for="(unit, name) in team.roster_units" :key="unit.unit"
                           class="d-flex flex-column ma-2 roster_entry">
                        <div>
                          <CollectionUnit :progress="unit" :unit="get_unit_by_id(name)" style="transform: scale(.85)"></CollectionUnit>
                        </div>
                      </div>
                    </div>
                  </div>

                  <v-divider
                      v-if="i !== rosters.length - 1"
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
    rosters() {
      return this.search_results.rosters;
    },
    data_table() {
      const headers = [

      ];
      const items = [

      ];
      return { headers, items };
    },
    formatted_gp() {
      if(this?.search_results?.gp){
        return this.search_results.gp.toLocaleString()
      }
      return '';
    }
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
  .roster_entry{
    align-items: center;
    height: 75px;
    width: 70px;
    position: relative;
    transform: translateY(-18px);
  }
}
</style>
