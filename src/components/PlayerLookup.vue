<template>
  <v-container class="py-8 px-6 __player_lookup__">
    <v-row>
      <v-col cols="12">
        <v-card id="player_lookup" style="width: max-content">
          <v-card-title v-if="!standalone">
            Player Lookup
          </v-card-title>
            <v-flex class="row pa-12 flex-column" v-if="!standalone">
              <v-text-field label="Ally Code" style="max-width: 15em" v-model="ally_code">
                <template v-slot:append>
                  <v-btn v-on:click="search"><v-icon>mdi-account-search</v-icon></v-btn>
                </template>
              </v-text-field>
              <div style="margin-top:-20px; font-size: 0.9em">
                Ex: <a style="text-decoration: none" href="javascript:void(0);" v-on:click="ally_code='979863726'">979863726</a>
              </div>
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
                  <div class="d-flex flex-column justify-center">
                    <div class="team_percent">{{get_team_progress(team)}}%</div>
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
                  </div>
                  <div style="display: flex; flex-wrap: wrap">
                    <div v-for="(unit, name) in team.roster_units" :key="unit.unit"
                         class="d-flex flex-column ma-2 roster_entry">
                      <div>
                        <CollectionUnit
                            :player_id="ally_code"
                            :progress="unit"
                            :unit="get_unit_by_id(name)"
                            style="transform: scale(.85)">
                        </CollectionUnit>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CharacterPortrait from "./CharacterPortrait";
import CollectionUnit from "./forms/CollectionUnit";
export default {
  name: "PlayerLookup",
  components: {CharacterPortrait, CollectionUnit},
  data: () => ({
    _ally_code: null,
  }),
  computed: {
    standalone() {
      return !!this.$route.query.standalone;
    },
    ally_code: {
      get() {
        return this.$route.params['id'];
      },
      set(e) {
        const cleaned = e.replace(/\D/g,'');
        this.$router.replace({params: { page: 'lookup', id: cleaned || '' }})
      },
    },
    search_results() {
      if(this.$store.state.units.length === 0){
        console.log('waiting for units')
        return {};
      }
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
    get_team_progress(team) {
     return Math.floor(
         Object.values(team.roster_units)
         .map(e=>e.current_progress)
         .reduce((i,e) => i+e, 0)/Object.keys(team.roster_units).length
     );
    },
    search(){
      const cleaned = this.ally_code.replace(/\D/g,'');
      this.$store.dispatch('user_lookup', cleaned);
    },
    get_unit_image(unit_name) {
      return this.get_unit_by_id(unit_name)?.image;
    },
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
  },
  mounted() {
    if (this.ally_code) {
      this.search();
    }
  },
}
</script>

<style lang="scss">
.__player_lookup__ {
  .standalone &{
    margin: 0;
  }
  &.container{
    max-width: 100%;
    width: 100%;
    padding: 0;;
    display: flex;
    justify-content: center;
    height: calc(100vh - 60px);
    overflow-y: auto;

    .standalone &{
      height: auto;
      max-width: unset;
      width: 2000px;
    }
  }
  .team_percent {
    font-weight: bold;
    font-size: 17px;
    text-align: center;
    margin-right: 25px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
    max-width: 1200px;
    .standalone &{
      max-width: 100%;
    }
  }
  .roster_entry{
    align-items: center;
    height: 75px;
    width: 70px;
    position: relative;
    transform: translateY(-16px);
    margin-top: 30px !important;
  }
}
</style>
