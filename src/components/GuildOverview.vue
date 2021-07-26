<template>
  <div class="__guild_overview__">
    <v-container class="py-8 px-6" >
      <v-row>
        <v-col cols="12">
          <v-card class='overflow-auto' style="max-height: calc(100vh - 115px)">
            <v-card-title>
              Guild Members ({{guild_members.length}}/50)
            </v-card-title>
            <v-list>
              <template v-for="member in guild_members">
                <v-list-item :key="member.ally_code">
                  <span style="opacity: .5;" class="mr-15">{{ member.ally_code }}</span>
                  <span><a :href="member.url">{{member.name}}</a></span>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "GuildOverview",
  computed: {
    guild_members() {
      return this.$store.state.guild_members;
    },
  },
}
</script>

<style lang="scss">
.__guild_overview__ {

}
</style>
