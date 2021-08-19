<template>
  <v-container v-if="active_team" fluid id="progress_viewer">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-avatar size="60px" style="margin-right: 25px; background: grey;">
              <img v-if="active_team.target_unit" :src="`${get_unit_by_id(active_team.target_unit).image}`"/>
              <v-icon size="50px" color="white" v-else>mdi-human-queue</v-icon>
            </v-avatar>
            {{ active_team.name }}
            <v-spacer/>
            <v-text-field
                v-if="!standalone"
                style="max-width: 300px"
                v-model="search"
                prepend-inner-icon="mdi-account-search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              dense
              :height="standalone? 'auto' : 'calc(100vh - 195px)'"
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
              <span style="white-space: nowrap;">{{header.text}}</span>
            </template>

            <!-- Progress Display -->
            <template v-slot:item.overall_progress="{item}">
              {{item.overall_progress}}
              <span style="color:green" v-if="standalone && item.progress_change">({{item.progress_change}})</span>
              <v-progress-linear :color="item.overall_progress === '100%' ? 'rgb(255,247,0)' : 'primary'"
                                 :value="clean(item.overall_progress)" :test="item"/>
            </template>

            <!-- Unit Headers -->
            <template v-for='unit in unit_names' v-slot:[`header.${unit}`]="{header}">
              <div :key="unit+'_himg'" v-if="header.image" class="pa-0 d-inline-block" style="position: relative">
              <v-avatar :size="standalone? 55 : 35" class="mb-1">
                <img :src="header.image"/>
              </v-avatar>
                <span :class="header.target_classes">
                  {{header.target_val}}
                </span>
              </div>
              <span v-else :key="unit+'_himgalt'">{{header.text}}</span>
            </template>

            <!-- Unit Display -->
            <template v-for='unit in unit_names' v-slot:[`item.${unit}`]="{item}">
              <div :key="unit+'_d1'" style="white-space: nowrap;" class="progress_cell" :class="{done:item[unit].progress===100}">
                <span  class='progress_text'>
                 {{item[unit].progress}}%
                </span>
                <span style='color: green;' :style='{"font-size": standalone ? "1.15em": "0.75em"}' v-if="item[unit].delta && !item[unit].new">
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
    standalone() {
      return !!this.$route.query.standalone;
    },
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
        {text: "% Change", value:"progress_change", sort},
        ...team.roster.map(e => {
          const unit_info = this.get_unit_by_id(e.unit);
          return {
            text: unit_info.name,
            value: e.unit,
            is_relic: e.is_relic,
            is_ship: e.is_ship,
            target_classes: this.get_header_classes(e, unit_info),
            target_val: e.is_ship? e.stars : (e.is_relic ? e.relic : e.gear),
            is_dark_side: e,
            sort:unit_sort,
            image: `${unit_info?.image}`,
        }}),
      ];
      if (this.standalone) {
        headers.splice(2,1);
      }
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
    get_header_classes(unit, unit_info) {
      const result = {
        ship: unit.is_ship,
        relic: !unit.is_ship && unit.is_relic,
        gear: !(unit.is_relic || unit.is_ship)
      };
      result[unit_info.alignment.replace(' ', '')] = true;
      return result;
    },
  },
}
</script>

<style>
th[role=columnheader]{
  white-space: nowrap;
}
.standalone table td{
  padding: 0 !important;
}
.standalone table td>.progress_cell{
  padding: 0px 16px;
}

.standalone table td>.progress_cell.done {
  background-color: #bfe2bf;
}
.standalone .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.standalone .v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.standalone .v-data-table>.v-data-table__wrapper>table>thead>tr>td {
  font-size: 1.15rem;
}

.standalone .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.standalone .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.standalone .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1.15rem;
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
.ship {
  position: absolute;
  text-indent: 10px;
  color: white;
  background: center 0 transparent url(https://swgoh.gg/static/img/star.png) no-repeat;
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

.standalone .relic{
  text-indent: 20px;
  background-position: 4.5px 5.5%;
  width: 40px;
  height: 40px;
  top: 25px;
  right: -11px;
}
.standalone .ship{
  text-indent: 18px;
  background-position: 6.5px 0;
  width: 40px;
  height: 40px;
  top: 25px;
  right: -11px;
  background-size: 86%;
  line-height: 38px;
}
</style>
