<template>
  <div class="players">
    <div v-for="(position, index) in players" :key="index" class="players-type">
      <div class="players-type-name">
        {{ position.name }}
      </div>
      <div class="players-wrapper">
        <Player
          v-for="player in position.players"
          :key="player.id"
          :player="player"
          :color="position.color"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";
export default {
  data: () => ({
    //
  }),
  components: {
    Player
  },
  computed: {
    players() {
      return [
        { name: "GK", players: this.$store.getters.getGks, color: "#54688e" },
        { name: "DEF", players: this.$store.getters.getDefs, color: "#471321" },
        { name: "MID", players: this.$store.getters.getMids, color: "#0b8227" },
        { name: "ATT", players: this.$store.getters.getAtts, color: "#cdcf32" }
      ];
    }
  }
};
</script>
