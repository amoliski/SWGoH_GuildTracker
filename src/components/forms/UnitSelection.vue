<template>
    <div class="d-flex flex-row">
        <v-avatar size="50px" style="margin-right: 25px;" class="secondary mr-8">
            <img v-if="selected_image" :src="`https://swgoh.gg/${selected_image}`"/>
        </v-avatar>
        <v-autocomplete
              clearable
              auto-select-first
                v-model="internal_value"
                :items="units"
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
        props: ['value'],
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
              return this.units.find(e => e.base_id === this.value)?.image || null;
            },
          units() {
              return this.$store.state.units;
          }
        },
    }
</script>

<style scoped>

</style>
