<template>
  <div class="d-flex flex-row">
    <v-avatar size="50px" style="margin-right: 25px;" class="secondary mr-8">
      <img v-if="selected_image" :src="`${selected_image}`"/>
    </v-avatar>
    <v-autocomplete
        clearable
        auto-select-first
        v-model="internal_value"
        :items="options"
        :item-text="e => e.name"
        :item-value="e => e.base_id"
        v-on:keyup="handle_keyup"
    >
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: "Unit_Selection",
  props: {
    'value': {},
    'ships': {default: true},
    'units': {default: true},
  },
  watch: {
    internal_value(e) {
      this.$emit('input', e);
    },
    value: {
      handler(e){
        this.internal_value = e;
      },
      immediate: true,
    },
  },
  data: () => ({
    internal_value: null,
  }),
  methods: {
    handle_keyup() {

    },
  },
  computed: {
    selected_image() {
      return this.options.find(e => e.base_id === this.value)?.image || null;
    },
    options() {
      let result = [];
      if(this.units) result = [...result, ...this.$store.state.units]
      if(this.ships) result = [...result, ...this.$store.state.ships]
      return result;
    }
  },
}
</script>

<style scoped>

</style>
