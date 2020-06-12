<template>
  <div class="favorites">
    <div class="pitch-container">
      <div class="pitch">
        <div v-if="positions.length !== 0" class="gk">
          <PitchPlayer
            @open-popup="openPopup(0, 'GK')"
            :positionName="'gk'"
            :positionId="0"
          />
        </div>
        <div
          v-for="(position, positionName) in positions"
          :key="positionName"
          :class="positionName"
        >
          <div v-for="positionId in position" :key="positionId">
            <PitchPlayer
              @open-popup="openPopup(positionId, positionName)"
              :positionName="positionName"
              :positionId="positionId"
            />
          </div>
        </div>
      </div>
    </div>
    <PossiblePlayersModal
      :popup-data="popupData"
      @close-modal="open = false"
      v-if="possibleOpen && open"
    />
  </div>
</template>

<script>
import PitchPlayer from "@/components/PitchPlayer";
import PossiblePlayersModal from "@/components/PossiblePlayersModal";
import { closeOnClickOutside } from "@/mixin.js";

export default {
  mixins: [closeOnClickOutside],
  data: () => ({
    popupData: {},
    open: false
  }),
  components: {
    PitchPlayer,
    PossiblePlayersModal
  },
  computed: {
    positions() {
      return this.$store.getters.currentFormation;
    },
    possibleOpen() {
      return this.$store.getters.possibleOpen;
    }
  },
  methods: {
    openPopup(positionId, positionName) {
      this.$store.dispatch("openPossibleModal");
      this.open = true;
      this.popupData = { positionId, positionName };
    }
  }
};
</script>
