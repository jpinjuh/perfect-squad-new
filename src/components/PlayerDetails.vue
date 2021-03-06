<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click="$emit('close')">
          <div class="modal-container player-details" @click.stop>
            <div class="close-modal-btn" @click="$emit('close')">
              <span>x</span>
            </div>
            <div class="player-details-info">
              <div>
                <div class="player-header-title">
                  <span class="player-header-name"
                    >{{ player.name }} {{ player.lastName }}</span
                  >
                  <span
                    class="player-header-position"
                    :class="`${stats.position}-bg-color`"
                    >{{ stats.position }}</span
                  >
                </div>
                <StarRating
                  :value="player.rating"
                  @value-change="updateRating($event, player.id)"
                  @player-rating="updateRating($event, player.id)"
                />
              </div>

              <div>
                <span
                  class="player-header-picture"
                  :style="bgImg(player.formationPicture)"
                ></span>
              </div>

              <div class="info-container">
                <span>{{ player.nationality | capitalize }}</span>
                <div style="width:38px; height: 25px;">
                  <img
                    style="width:100%; height: 100%; object-fit: cover;"
                    :src="player.nationalityFlag"
                  />
                </div>
              </div>

              <div class="info-container">
                <span>{{ stats.club | capitalize }}</span>
                <div style="width:22px; margin-right: 8px">
                  <img
                    style="width:100%; height: 100%; object-fit: cover;"
                    :src="player.teamCrest"
                  />
                </div>
              </div>

              <div class="info-container">
                <span>Birth Date</span>
                <span class="player-data">{{ stats.birthDate }}</span>
              </div>

              <div class="info-container">
                <span>Age</span>
                <span class="player-data">{{ player.age }}</span>
              </div>

              <div class="info-container">
                <span>Popularity</span>
                <span class="player-data">{{ calculatePopularity }}</span>
              </div>

              <div class="info-container">
                <span>Preferred Position</span>
                <span class="player-data">{{ stats.position }}</span>
              </div>

              <div class="info-container">
                <span>Positions</span>
                <span class="player-data">{{
                  stats.posiblePositions && stats.posiblePositions.join(", ")
                }}</span>
              </div>

              <div class="info-container">
                <span>Weak Foot</span>
                <span class="player-data">{{
                  stats.preferredFoot === "right" ? "Left" : "Right"
                }}</span>
              </div>

              <div class="info-container">
                <span>Value</span>
                <span class="player-data">{{ stats.value }}</span>
              </div>
            </div>
            <div class="player-details-skills">
              <div class="player-details-skills-container">
                <div v-for="(skill, i) in playerSkills" :key="i">
                  <div class="player-skill-title">
                    {{ skill.name | capitalize }}
                  </div>
                  <div class="player-skill">
                    <div
                      class="player-skill-list"
                      v-for="(oneSkill, i) in skill.skills"
                      :key="i"
                    >
                      <label class="player-skill-name" for="skill">{{
                        oneSkill.name | capitalize
                      }}</label>
                      <progress
                        class="player-skill-progress"
                        v-if="oneSkill.value"
                        id="skill"
                        :value="oneSkill.value"
                        max="100"
                      ></progress>
                      <span class="player-skill-value">{{
                        oneSkill.value
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import StarRating from "@/components/StarRating.vue";
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    StarRating
  },
  data: () => ({
    player: {},
    stats: {},
    playerSkills: {},
    rating: 0
  }),
  computed: {
    calculatePopularity() {
      const popularity = (this.rating / 5) * 100;
      return `${popularity}%`;
    }
  },
  methods: {
    bgImg(link) {
      return `background-image: url(${link});`;
    },
    updateRating(rating, playerId) {
      this.rating = rating;
      this.$store.dispatch("updatePlayerRating", { rating, playerId });
    }
  },
  filters: {
    capitalize: (value = "") => {
      return value.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  mounted() {
    this.player = this.$store.getters.getPlayer(this.id);
    this.stats = this.player.stats;
    this.playerSkills = this.player.playerSkills;
    this.rating = this.player.rating;
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_base";
// custom scrollbar for player skills container
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: $iconColor;
}

::-webkit-scrollbar-thumb {
  background-color: $barColor;
}
</style>
