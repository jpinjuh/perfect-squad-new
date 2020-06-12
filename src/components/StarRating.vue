<template>
  <div class="star-rating">
    <input
      type="radio"
      id="5-stars"
      name="rating"
      v-model="localValue"
      value="5"
    />
    <label for="5-stars">&#9733;</label>
    <input
      type="radio"
      id="4-stars"
      name="rating"
      v-model="localValue"
      value="4"
    />
    <label for="4-stars">&#9733;</label>
    <input
      type="radio"
      id="3-stars"
      name="rating"
      v-model="localValue"
      value="3"
    />
    <label for="3-stars">&#9733;</label>
    <input
      type="radio"
      id="2-stars"
      name="rating"
      v-model="localValue"
      value="2"
    />
    <label for="2-stars">&#9733;</label>
    <input
      type="radio"
      id="1-star"
      name="rating"
      v-model="localValue"
      value="1"
    />
    <label for="1-star">&#9733;</label>
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
