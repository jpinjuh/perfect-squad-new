<template>
  <div class="player-container" @click.stop>
    <div class="player-panel">
      <div class="panel-header panel-header-aside">
        <fa-icon
          @click="favoritize(player)"
          :class="[
            { 'heart-clickable': $route.path === '/favorites' },
            'heart'
          ]"
          :style="{ color: !!favorite ? '#b84242' : '' }"
          icon="heart"
        />
      </div>
      <div class="panel-header panel-header-main" @click="toggleContent()">
        {{ player.name }} {{ player.lastName }}
      </div>
      <div
        class="panel-header panel-header-aside"
        :class="`${player.stats.position}-color`"
      >
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
    <PlayerDetails :id="player.id" v-if="isOpen" @close="toggleModal(isOpen)" />
  </div>
</template>

<script>
import PlayerDetails from "@/components/PlayerDetails.vue";
export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  components: {
    PlayerDetails
  },
  data: () => ({
    isVisible: false,
    isOpen: false
  }),
  computed: {
    favorite() {
      return this.$store.getters.checkFavorites(this.player.id);
    }
  },
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
    },
    favoritize(player) {
      if (this.$route.path === "/favorites") {
        const positionId = localStorage.getItem("positionId"),
          positionName = localStorage.getItem("positionName"),
          formationType = localStorage.getItem("formationType");

        if (!this.favorite) {
          this.$store.dispatch("addFavorite", {
            positionId,
            player,
            formationType,
            positionName
          });
        } else {
          this.$store.dispatch("removeFavorite", { player, formationType });
        }
      } else {
        console.log("Favorites only can be chosen on the pitch!");
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
