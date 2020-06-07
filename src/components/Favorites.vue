<template>
  <div class="favorites">
    <div class="pitch-container">
      <div class="pitch">
        <PitchPlayer
          v-for="position in positions"
          :key="position.id"
          :positionName="position.name"
          :positionId="position.id"
          :style="setPosition(position.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PitchPlayer from "@/components/PitchPlayer";
export default {
  data: () => ({
    //
  }),
  components: {
    PitchPlayer
  },
  computed: {
    positions() {
      return this.$store.getters.positions;
    }
  },
  methods: {
    setPosition(n) {
      return `bottom: ${this.positions[n].bottom}; 
              left: ${this.positions[n].left}`;
    }
  }
};
</script>
