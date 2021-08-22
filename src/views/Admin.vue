
<template>
  <div>
    <v-navigation-drawer app clipped v-model="_drawer">
      <v-list>
       <v-list-item-group  v-model="selected_item">

        <v-subheader style="text-transform: uppercase;">Config</v-subheader>

        <!-- Member List -->
         <v-list-item link value="members">
           <v-list-item-icon>
             <v-icon>mdi-book</v-icon>
           </v-list-item-icon>
           <v-list-item-content>
             <v-list-item-title> Guild Members</v-list-item-title>
           </v-list-item-content>
         </v-list-item>

         <v-list-item link value="lookup">
           <v-list-item-icon>
             <v-icon>mdi-account-search</v-icon>
           </v-list-item-icon>
           <v-list-item-content>
             <v-list-item-title> Player Lookup</v-list-item-title>
           </v-list-item-content>
         </v-list-item>

        <v-subheader style="text-transform: uppercase;">Desired Rosters</v-subheader>

        <!-- Desired Rosters -->
        <v-list-item link v-for="roster in rosters" :key="roster.id" :value="'view_roster_'+roster.id">
          <v-list-item-icon class="mr-0">
            <v-avatar size="40px" style="margin-right: 25px; background: grey;">
              <img v-if="get_unit_by_id(roster.target_unit)" :src="`${get_unit_by_id(roster.target_unit).image}`"/>
              <v-icon v-else size="30" color="white">mdi-human-queue</v-icon>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ roster.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Add Roster -->
        <v-list-item link value="add_roster">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add Roster</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <v-main >
    <component :is="active_component" :id="params.id"/>
  </v-main>
  </div>
</template>

<script>
import TeamViewer from "../components/TeamViewer"
import TeamCreator from "../components/TeamCreator"
import GuildOverview from "../components/GuildOverview";
import PlayerLookup from "../components/PlayerLookup"

export default {

  name: 'Admin',
  methods: {
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
  },
  props: ['drawer'],
  computed: {
    standalone() {
      return !!this.$route.query.standalone;
    },
    rosters() {
      return this.$store.state.desired_rosters;
    },
    params() {
      return this.$route.params;
    },
    _drawer: {
      get() {return this.drawer},
      set(e) {this.$emit('input:drawer', e)}
    },
    active_component() {
      if(this.params['page'] && this.params['id']){
        return TeamViewer;
      }
      if(this.params.page === 'lookup') {
        return PlayerLookup;
      }
      if(this.params.page === 'add_roster') {
        return TeamCreator;
      }
      return GuildOverview;
    },
    selected_item: {
      get() {
        const page = this.params?.page;
        if (page === 'view_roster') {
          if (this.params.id){
            return `view_roster_${this.params.id}`
          } else {
            return 'members';
          }
        }
        return page || 'members';
      },
      set(page_id) {
        if (page_id && page_id.indexOf('view_roster') === 0) {
          let page = 'view_roster';
          let id = page_id.replace('view_roster_', '');
          this.$router.replace({params: { page, id }})
        } else {
          this.$router.replace({params: { page: page_id, id: null }})
        }
      },
    }
  },

}
</script>
