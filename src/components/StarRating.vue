<template>
  <div class="star-rating" >
    <input type="radio" id="5-stars" @click="clicked($event)" name="rating" value="5" />
    <label for="5-stars">&#9733;</label>
    <input type="radio" id="4-stars" @click="clicked($event)" name="rating" value="4" />
    <label for="4-stars">&#9733;</label>
    <input type="radio" id="3-stars" @click="clicked($event)" name="rating" value="3" />
    <label for="3-stars">&#9733;</label>
    <input type="radio" id="2-stars" @click="clicked($event)" name="rating" value="2" />
    <label for="2-stars" >&#9733;</label>
    <input type="radio" id="1-star" @click="clicked($event)" name="rating" value="1" />
    <label for="1-star">&#9733;</label>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    ratings: [],
    playerRating: 0
  }),
  methods: {
    clicked(e) {
      this.ratings.push(parseInt(e.target.value));

      this.playerRating = this.ratings.reduce((a, b) => a + b) / this.ratings.length;
      console.log(this.playerRating);
    }
  }
};
</script>
