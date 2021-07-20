
<template>
  <div>
    <v-navigation-drawer app clipped="true">
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

        <v-subheader style="text-transform: uppercase;">Desired Rosters</v-subheader>

        <!-- Desired Rosters -->
        <v-list-item link v-for="roster in rosters" :key="roster.id" :value="'view_roster_'+roster.id">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
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
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col
            v-for="card in 5"
            :key="card"
            cols="12">
          <v-card>
            <v-subheader>{{ card }}</v-subheader>

            <v-list two-line>
              <template v-for="n in 6">
                <v-list-item :key="n">
                  <v-list-item-avatar color="grey darken-1">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Message {{ n }}</v-list-item-title>

                    <v-list-item-subtitle>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  computed: {
    rosters() {
      return this.$store.state.desired_rosters;
    },
    active_component() {
      return '';
    },
    selected_item: {
      get() {
        return 'members';
      },
      set(page) {
        console.log(`setting page ${page}`)
        this.$router.replace({params: { page }})
      },
    }
  },

}
</script>
