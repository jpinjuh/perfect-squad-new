<template>
  <div class="position">
    <div class="position-popover" v-if="visible">
      <div>
        <img class="position-img" />
        <div class="position-name">modrić</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PitchPlayer",
  components: {},
  data: () => ({
    visible: false
  })
};
</script>
