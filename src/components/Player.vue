<template>
  <div class="player-container">
    <div class="player-panel">
      <div class="panel-header panel-header-aside heart">&#10084;</div>
      <div class="panel-header panel-header-main" @click="toggleContent()">
        {{ player.name }} {{ player.lastName }}
      </div>
      <div class="panel-header panel-header-aside" :style="{ color: color }">
        {{ player.stats.position }}
      </div>
    </div>
    <div
      :class="[{ show: isVisible }, 'panel-content']"
      @click="toggleModal(isOpen)"
    >
      <div class="panel-content-image">
        <img :src="player.playerPicture" />
      </div>
      <div class="panel-subtitle">
        <img class="panel-subtitle-crest" :src="player.teamCrest" />
        <div class="panel-subtitle-club">
          {{ player.stats.club | uppercase }}
        </div>
      </div>
    </div>
    <PlayerDetails
      :color="color"
      :id="player.id"
      v-if="isOpen"
      @close="toggleModal(isOpen)"
    />
  </div>
</template>

<script>
import PlayerDetails from "@/components/PlayerDetails.vue";
export default {
  props: {
    player: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  components: {
    PlayerDetails
  },
  data: () => ({
    isVisible: false,
    currentPlayer: null,
    isOpen: false
  }),
  methods: {
    toggleContent() {
      const panels = document.getElementsByClassName("show");

      this.isVisible = !this.isVisible;

      panels.forEach(panel => {
        panel.classList.remove("show");
      });
    },
    toggleModal(open) {
      const body = document.getElementsByTagName("body")[0];

      if (open) {
        this.isOpen = false;
        body.classList.remove("modal-open");
      } else {
        this.isOpen = true;
        body.classList.add("modal-open");
      }
    }
  },
  filters: {
    uppercase: value => {
      return value.toUpperCase();
    }
  }
};
</script>
