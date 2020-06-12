import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { calculateAge } from "@/utils/helperFunctions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    favorites: {},
    formationType: "",
    currentFormation: [],
    formations: [],
    possibleOpen: false
  },
  getters: {
    players: state => state.players,
    formationType: state => state.formationType,
    favorites: state => state.favorites,
    possibleOpen: state => state.possibleOpen,
    formations: state => state.formations,
    currentFormation: state => state.currentFormation,
    getPlayer: state => id => {
      return state.players.find(player => player.id === id);
    },
    getByPitchPosition: state => positionName => {
      return state.players.filter(player =>
        player.stats.posiblePositions.some(
          field => field === positionName.toUpperCase()
        )
      );
    },
    getGks: state => {
      return state.players.filter(player => player.stats.position === "GK");
    },
    getDefs: state => {
      const defs = ["CB", "LB", "RB"];
      return state.players.filter(player =>
        defs.some(field => field === player.stats.position)
      );
    },
    getMids: state => {
      const mids = ["DM", "CM", "LM", "RM", "AM"];
      return state.players.filter(player =>
        mids.some(field => field === player.stats.position)
      );
    },
    getAtts: state => {
      const atts = ["CF", "LW", "RW"];
      return state.players.filter(player =>
        atts.some(field => field === player.stats.position)
      );
    },
    getFavoritePitchPlayer: state => (positionName, positionId) => {
      if (state.favorites[state.formationType]) {
        const formation = state.favorites[state.formationType];
        if (formation[positionName]) {
          return formation[positionName][positionId];
        }
      }
      return null;
    },
    checkFavorites: state => playerId => {
      if (state.favorites[state.formationType]) {
        const formation = state.favorites[state.formationType];
        const mergedPlayers = [].concat.apply([], Object.values(formation));
        return mergedPlayers.find(favoritePlayer => {
          if (favoritePlayer) {
            return favoritePlayer.id === playerId;
          }
          return false;
        });
      }

      return null;
    }
  },
  mutations: {
    setPlayers(state, response) {
      response.forEach((player, i) => {
        state.players.push(player);
        state.players[i].id = i;
        state.players[i].rating = 0;

        state.players[i].age = calculateAge(state.players[i].stats.birthDate);
      });
    },
    setFavorites(state, favorites) {
      state.favorites = favorites;
    },
    setFormations(state, formations) {
      state.formations = formations;
    },
    changeFormation(state, formationType) {
      state.currentFormation = state.formations[formationType].positions;
    },
    changeFormationType(state, formationType) {
      state.formationType = formationType;
    },
    addFavorite: function(
      state,
      { positionId, player, formationType, positionName }
    ) {
      if (state.favorites[formationType]) {
        const formation = state.favorites[formationType];
        if (formation[positionName]) {
          Vue.set(formation[positionName], positionId, player);
        } else {
          Vue.set(formation, positionName, []);
          Vue.set(formation[positionName], positionId, player);
        }
      } else {
        Vue.set(state.favorites, formationType, { [positionName]: [] });
        Vue.set(
          state.favorites[formationType][positionName],
          positionId,
          player
        );
      }
    },
    removeFavorite: function(state, { player, formationType }) {
      if (state.favorites[formationType]) {
        const formation = state.favorites[formationType];
        if (formation[player.formationPosition]) {
          Vue.delete(
            formation[player.formationPosition],
            formation[player.formationPosition].indexOf(player)
          );
        }
      }
    },
    openPossibleModal(state) {
      state.possibleOpen = true;
    },
    closePossibleModal(state) {
      state.possibleOpen = false;
    },
    updatePlayerRating(state, { rating, playerId }) {
      Vue.set(state.players[playerId], "rating", parseInt(rating));
    },
    addPlayerFormationPosition(state, { positionName, player }) {
      state.players[player.id].formationPosition = positionName;
    }
  },
  actions: {
    changeFormation({ commit, dispatch }, formationType) {
      commit("changeFormation", formationType);
      dispatch("changeFormationType", formationType);
    },
    changeFormationType({ commit }, formationType) {
      commit("changeFormationType", formationType);
    },
    addFavorite(
      { commit, dispatch },
      { positionId, player, formationType, positionName }
    ) {
      commit("addFavorite", {
        positionId,
        player,
        formationType,
        positionName
      });
      dispatch("closePossibleModal");
      dispatch("addPlayerFormationPosition", { positionName, player });
    },
    removeFavorite({ commit }, { player, formationType }) {
      commit("removeFavorite", { player, formationType });
    },
    fetchData({ commit }) {
      axios({
        method: "GET",
        url:
          "https://jsonblob.com/api/jsonblob/50fd5df9-8283-11ea-a9e3-ab457510f846"
      }).then(response => {
        commit("setPlayers", response.data.players);
        commit("setFormations", response.data.formations);
      });
    },
    openPossibleModal({ commit }) {
      commit("openPossibleModal");
    },
    closePossibleModal({ commit }) {
      commit("closePossibleModal");
    },
    updatePlayerRating({ commit }, { rating, playerId }) {
      commit("updatePlayerRating", { rating, playerId });
    },
    addPlayerFormationPosition({ commit }, { positionName, player }) {
      commit("addPlayerFormationPosition", { positionName, player });
    }
  },
  modules: {}
});
