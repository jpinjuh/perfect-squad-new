<template>
  <div class="possible-players" @click="closePopup()">
    <div class="possible-players-position" @click.stop>
      <div class="container">{{popupData.positionName}}</div>
    </div>
    <div class="sorting" @click.stop>
      <div class="sorting-tabs container">
        <div>Popularity</div>
        <div>Value</div>
        <div>Age</div>
      </div>
    </div>
    <div class="position-players container">
      <Player v-for="player in players" :key="player.id" @click.stop :player="player" :favorite="isFavorite(player.id)" />
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";

export default {
  name: "App",
  props: {
    popupData: {
      type: Object,
      required: true
    }
  },
  components: {
    Player
  },
  data: () => ({
    sortValue: 1
  }),
  methods: {
    closePopup() {
      this.$store.dispatch("notFavoriteSelected");
    },
    isFavorite(id) {
      if (this.favorite) {
        return this.favorite.id === id;
      }
      return false;
    },
    sortPlayers(sortValue) {
      switch (sortValue) {
        case 1:
          return this.sortByPopularity();
        case 2:
          return this.sortByValue();
        case 3:
          return this.sortByAge();
        default:
          console.log("Sorting failed!");
          break;
      }
    },
    sortByPopularity() {
      const sortedArray = this.players.sort((a, b) => {
        return b.popularity - a.popularity;
      });

      return sortedArray;
    },
    sortByValue() {
      const sortedArray = this.players.sort((a, b) => {
        a = parseInt(a.stats.value.replace(/[ €.]/g, ""));
        b = parseInt(b.stats.value.replace(/[ €.]/g, ""));
        return b - a;
      });

      return sortedArray;
    },
    sortByAge() {
      const sortedArray = this.players.sort((a, b) => {
        return b.age - a.age;
      });

      return sortedArray;
    }
  },
  computed: {
    players() {
      return this.$store.getters.getByPitchPosition(
        this.popupData.positionName
      );
    },
    favorite() {
      return this.$store.getters.getFavorite(this.popupData.positionId);
    }
  }
};
</script>
