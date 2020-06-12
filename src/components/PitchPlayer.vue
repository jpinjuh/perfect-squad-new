<template>
  <div
    class="pitch-circle"
    @click="
      $emit('open-popup');
      setItem();
    "
  >
    <div class="pitch-circle-popover" v-if="!!player">
      <div>
        <img
          class="pitch-img"
          @click="
            $emit('open-popup');
            setItem();
          "
          :src="player.formationPicture"
        />
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
      type: Number
    }
  },
  data: () => ({
    visible: true
  }),
  computed: {
    player() {
      return this.$store.getters.getFavoritePitchPlayer(
        this.positionName,
        this.positionId
      );
    }
  },
  methods: {
    setItem() {
      console.log(this.positionId);
      localStorage.setItem("positionName", this.positionName);
      localStorage.setItem("positionId", this.positionId);
    }
  }
};
</script>
