<template>
  <div class="star-rating">
    <template v-for="n in 5">
      <input
        type="radio"
        :id="`${6 - n}-stars`"
        name="rating"
        v-model="localValue"
        :value="6 - n"
        :key="6 - n"
      />
      <label :for="`${6 - n}-stars`" :key="`l-${6 - n}`">&#9733;</label>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      required: true
    }
  },
  data: () => ({
    //
  }),
  computed: {
    localValue: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("value-change", value);
      }
    }
  }
};
</script>
