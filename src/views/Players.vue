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
import { mapGetters } from "vuex";

export default {
  data: () => ({
    //
  }),
  components: {
    Player
  },
  computed: {
    ...mapGetters(["getGks", "getDefs", "getMids", "getAtts"]),
    players() {
      return [
        { name: "GK", players: this.getGks },
        { name: "DEF", players: this.getDefs },
        { name: "MID", players: this.getMids },
        { name: "ATT", players: this.getAtts }
      ];
    }
  }
};
</script>
