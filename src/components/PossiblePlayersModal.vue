<template>
  <div class="possible-players" @click="$emit('close-modal')">
    <div class="possible-players-position" @click.stop>
      <div class="container">{{ popupData.positionName | uppercase }}</div>
    </div>
    <div class="sorting" @click.stop>
      <div class="sorting-tabs container">
        <div
          @click="changeSortValue('popularity')"
          :class="{ 'selected-tab': sortValue === 'popularity' }"
        >
          Popularity
        </div>
        <div
          @click="changeSortValue('value')"
          :class="{ 'selected-tab': sortValue === 'value' }"
        >
          Value
        </div>
        <div
          @click="changeSortValue('age')"
          :class="{ 'selected-tab': sortValue === 'age' }"
        >
          Age
        </div>
      </div>
    </div>
    <div class="position-players container">
      <Player
        v-for="player in sortedPlayers"
        :key="player.id"
        @click.stop
        :player="player"
        :positionClass="popupData.positionName"
      />
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
    sortValue: "popularity",
    sortChange: 0
  }),
  computed: {
    players() {
      return this.$store.getters.getByPitchPosition(
        this.popupData.positionName
      );
    },
    sortedPlayers() {
      this.sortChange;
      switch (this.sortValue) {
        case "popularity":
          return this.players.slice().sort((a, b) => {
            return b.rating - a.rating;
          });
        case "value":
          return this.players.slice().sort((a, b) => {
            a = parseInt(a.stats.value.replace(/[ €.]/g, ""));
            b = parseInt(b.stats.value.replace(/[ €.]/g, ""));
            return b - a;
          });
        case "age":
          return this.players.slice().sort((a, b) => {
            return b.age - a.age;
          });
      }
      return this.players;
    }
  },
  methods: {
    changeSortValue(sortValue) {
      this.sortValue = sortValue;
      this.sortChange++;
    }
  },
  filters: {
    uppercase: value => {
      return value.toUpperCase();
    }
  }
};
</script>
