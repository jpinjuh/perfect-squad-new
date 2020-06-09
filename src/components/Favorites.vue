<template>
  <div class="favorites">
    <div class="pitch-container">
      <div class="pitch">
        <PitchPlayer
          @open-popup="openPopup(position.id, position.name)"
          v-for="position in positions"
          :key="position.id"
          :positionName="position.name"
          :positionId="position.id"
          :style="setPosition(position.id)"
        />
      </div>
    </div>
    <PossiblePlayersModal :popup-data="popupData" v-if="isSelected" />
  </div>
</template>

<script>
import PitchPlayer from "@/components/PitchPlayer";
import PossiblePlayersModal from "@/components/PossiblePlayersModal";
export default {
  data: () => ({
    popupData: {},
    isOpen: false
  }),
  components: {
    PitchPlayer,
    PossiblePlayersModal
  },
  computed: {
    positions() {
      return this.$store.getters.positions;
    },
    isSelected() {
      return this.$store.state.isFavoriteSelected;
    }
  },
  methods: {
    setPosition(n) {
      return `bottom: ${this.positions[n].bottom}; 
              left: ${this.positions[n].left}`;
    },
    openPopup(positionId, positionName) {
      this.$store.dispatch("updateIsFavoriteSelected");
      this.popupData = { positionId, positionName };
    }
  }
};
</script>
