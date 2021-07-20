<template>
  <v-container v-if="active_team" fluid>
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
            <v-text-field
                style="max-width: 300px"
                v-model="search"
                prepend-inner-icon="mdi-account-search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              dense
              height='calc(100vh - 195px)'
              :items-per-page="-1"
              mobile-breakpoint="1"
              fixed-header
              :headers="data_table.headers"
              :items="data_table.items"
              :search="search"
              hide-default-footer
              item-key='name'>

            <!-- Progress Header -->
            <template v-slot:header.overall_progress="{header}">
              <span style="font-size:.85em; white-space: nowrap;">{{header.text}}</span>
            </template>

            <!-- Progress Display -->
            <template v-slot:item.overall_progress="{item}">
              {{item.overall_progress}}
              <v-progress-linear :color="item.overall_progress === '100%' ? 'rgb(255,247,0)' : 'primary'"
                                 :value="clean(item.overall_progress)" :test="item"></v-progress-linear>
            </template>

            <!-- Unit Headers -->
            <template v-for='unit in unit_names' v-slot:[`header.${unit}`]="{header}">
              <div :key="unit+'_himg'" v-if="header.image" class="pa-0 d-inline-block" style="position: relative">
              <v-avatar size="35" class="mb-1">
                <img :src="header.image"/>
              </v-avatar>
                <span :class="get_header_classes(unit, header)">
                  {{header.target}}
                </span>
              </div>
              <span v-else :key="unit+'_himgalt'">{{header.text}}</span>
            </template>

            <!-- Unit Display -->
            <template v-for='unit in unit_names' v-slot:[`item.${unit}`]="{item}">
              <div :key="unit+'_d1'" style="white-space: nowrap">
                <span  style='font-size: 0.85em;'>
                 {{item[unit].progress}}%
                </span>
                <span style='color: green; font-size: 0.75em;' v-if="item[unit].delta && !item[unit].new">
                  (+{{item[unit].delta}}%)
                </span>
              </div>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProgressViewer",
  props: ['id'],
  data: () => ({
    search: '',
  }),
  computed: {
    active_team() {
      return this.$store.getters['get_team_by_id'](this.id);
    },
    unit_names() {
      return this.active_team.roster.map(e => e.unit);
    },
    data_table() {
      const team = this.active_team;
      const progress = this.$store.state.roster_progress[team.id];
      const sort = (a, b) => Number(a.split('(')[0].replace('%','')) - Number(b.split('(')[0].replace('%',''));
      const unit_sort = (a, b) => a.progress - b.progress;
      const headers = [
        {text: "Player", value:"name"},
        {text: "Progress %", value:"overall_progress", sort},
        ...team.roster.map(e => ({
          text: this.get_unit_by_id(e.unit).name,
          value: e.unit,
          is_relic: e.is_relic,
          is_ship: e.is_ship,
          is_dark_side: e,
          target: e.is_ship? e.star : (e.is_relic? e.relic : e.gear),
          sort:unit_sort,
          image: `https://swgoh.gg/${this.get_unit_by_id(e.unit)?.image}`,
        })),
        {text: "Progress Change", value:"progress_change", sort}
      ];
      let items = [];
      // Process each player
      progress.forEach(player => {
        const name = this.get_player_name(player.player_id);
        const result = {name};
        const roster = player.roster_units;
        // Get individual percentages
        Object.entries(roster).forEach((roster) => {
          const [i, j] = roster;
          result[i] = {
            progress: j.current_progress,
            delta: j.current_progress - j.historic_progress,
            new: j.new || false,
          };
        })
        // Get overall progress
        const overall_progress = Object.values(roster).reduce((a,b)=>a + b.current_progress, 0)
        const historic_progress = Object.values(roster).reduce((a,b)=>a + b.historic_progress, 0)
        const overall_percentage = Math.floor(overall_progress / (Object.values(roster).length));
        const historic_percentage = Math.floor(historic_progress / (Object.values(roster).length));
        let overall_change_str = '';
        result['progress_change'] =  ``;
        if (overall_percentage > historic_percentage) {
          result['progress_change'] =  ` +${overall_percentage - historic_percentage}%`;
        }
        result['overall_progress'] = `${overall_percentage}%${overall_change_str}`;
        items.push(result);
      })
      items = items.sort((a, b) => this.clean(b.overall_progress) - this.clean(a.overall_progress))
      return {headers, items}
    },

  },
  methods: {
    clean(val){
      return val.split('(')[0].replace(/\D/g,'');
    },
    get_player_name(player_id) {
      return this.$store.getters.get_user_name_by_id(player_id);
    },
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
    async delete_team() {
      await this.$store.dispatch('delete_desired_team', this.id);
      this.$emit('team_deleted');
    },
    get_header_classes(unit, header) {
      const result = {
        ship: header.is_ship,
        relic: !header.is_ship && header.is_relic,
        gear: !(header.is_relic || header.is_ship)
      };
      result[this.get_unit_by_id(unit).alignment.replace(' ', '')] = true;
      return result;
    },
  },
}
</script>

<style>
th[role=columnheader]{
  white-space: nowrap;
}
.relic {
  position: absolute;
  text-indent: 15px;
  color: white;
  background-position: 4px -2%;
  background-image: url(https://swgoh.gg/static/img/ui/relic-badge-atlas.png);
  background-size: 100%;
  width: 28px;
  height: 28px;
  top: 11px;
  right: -5px;
  line-height: 33px;
  text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, 2px 2px 0 #000, -1px 2px 0 #000, 2px 3px 0 #000, 1px 3px 0 #000, 2px 3px 0 #000;
}
.relic.DarkSide{
  background-position: 4px 47%;
}
</style>
