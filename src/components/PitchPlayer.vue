<template>
  <div class="pitch-circle" @click="$emit('open-popup')">
    <div class="pitch-circle-popover" v-if="!!player">
      <div>
        <img class="pitch-img" @click="$emit('open-popup')" :src="player.formationPicture"/>
        <div class="pitch-name">{{ player.lastName || player.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PitchPlayer",
  components: {},
  props: {
    positionName: {
      type: String,
      required: true
    },
    positionId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    visible: true
  }),
  computed: {
    player() {
      return this.$store.getters.getFavorite(this.positionId);
    }
  },
};
</script>
