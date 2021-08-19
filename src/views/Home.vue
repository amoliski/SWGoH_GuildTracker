<template>
  <div>
    <v-navigation-drawer app clipped v-model="_drawer">
      <v-list>
        <v-list-item-group  v-model="selected_item">

          <v-subheader style="text-transform: uppercase;">Desired Rosters</v-subheader>

          <!-- Desired Rosters -->
          <v-list-item link v-for="roster in rosters" :key="roster.id" :value="roster.id">
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <ProgressViewer :id="selected_item"></ProgressViewer>
    </v-main>
  </div>
</template>

<script>
import ProgressViewer from "../components/ProgressViewer";


export default {
  name: 'Home',
  components: {ProgressViewer},
  methods: {
    get_unit_by_id(unit_id) {
      return this.$store.getters['get_unit_by_id'](unit_id);
    },
  },
  props: ['drawer'],
  computed: {
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
    selected_item: {
      get() {
        const page = this.params?.id;
        if(page){
          return page;
        }
        if(this.rosters.length > 0) {
          return this.rosters[0].id;
        }
        return null;
      },
      set(page_id) {
         this.$router.replace({params: { id: page_id }})
      },
    }

  },
}
</script>
