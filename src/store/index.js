import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getPitchFormation } from "@/utils/pitchPositions.js";
import { calculatePopularity, calculateAge } from "@/utils/helperFunctions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    positions: [],
    favorites: [],
    formationType: "",
    isFavoriteSelected: false
  },
  getters: {
    players: state => state.players,
    formationType: state => state.formationType,
    positions: state => state.positions,
    favorites: state => state.favorites,
    getPlayer: state => id => {
      return state.players.find(player => player.id === id);
    },
    getByPitchPosition: state => positionName => {
      return state.players.filter(player =>
        player.stats.posiblePositions.some(field => field === positionName)
      );
    },
    getGks: state => {
      return state.players.filter(player => player.stats.position === "GK");
    },
    getDefs: state => {
      const def = ["CB", "LB", "RB"];
      return state.players.filter(player =>
        def.some(field => field === player.stats.position)
      );
    },
    getMids: state => {
      const mid = ["DM", "CM", "LM", "RM", "AM"];
      return state.players.filter(player =>
        mid.some(field => field === player.stats.position)
      );
    },
    getAtts: state => {
      const att = ["CF", "LW", "RW"];
      return state.players.filter(player =>
        att.some(field => field === player.stats.position)
      );
    },
    getFavorite: state => id => {
      if (state.favorites[state.formationType]) {
        return state.favorites[state.formationType][id];
      }
      return null;
    }
  },
  mutations: {
    setPlayers(state, response) {
      response.forEach((player, i) => {
        state.players.push(player);
        state.players[i].id = i;

        state.players[i].age = calculateAge(state.players[i].stats.birthDate);
        state.players[i].popularity = calculatePopularity(
          state.players[i].playerSkills
        );
      });
    },
    setFavorites(state, favorites) {
      state.favorites = favorites;
    },
    changeFormation(state, formationType) {
      const formation = getPitchFormation(formationType);
      if (formation) {
        state.positions = formation;
      }
    },
    changeFormationType(state, formationType) {
      state.formationType = formationType;
    },
    addFavorite: function(state, { positionId, player, formationType }) {
      if (state.favorites[formationType]) {
        /* const exists = Object.keys(state.favorites[formationType]).some(
          positionId => {
            return state.favorites[formationType][positionId].id === player.id;
          }
        );

        if (!exists) */
        Vue.set(state.favorites[formationType], positionId, player);
      } else {
        Vue.set(state.favorites, formationType, { [positionId]: player });
      }
    },
    removeFavorite: function(state, { positionId, player, formationType }) {
      if (state.favorites[formationType]) {
        Vue.delete(state.favorites[formationType], positionId);
      }
      console.log(player);
    },
    updateIsFavoriteSelected(state) {
      state.isFavoriteSelected = true;
    },
    notFavoriteSelected(state) {
      state.isFavoriteSelected = false;
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
    addFavorite({ commit, dispatch }, { positionId, player, formationType }) {
      commit("addFavorite", { positionId, player, formationType });
      dispatch("notFavoriteSelected");
    },
    removeFavorite({ commit }, { positionId, player, formationType }) {
      commit("removeFavorite", { positionId, player, formationType });
    },
    fetchData({ commit }) {
      axios({
        method: "GET",
        url:
          "https://jsonblob.com/api/jsonblob/50fd5df9-8283-11ea-a9e3-ab457510f846"
      }).then(response => {
        commit("setPlayers", response.data.players);
      });
    },
    updateIsFavoriteSelected({ commit }) {
      commit("updateIsFavoriteSelected");
    },
    notFavoriteSelected({ commit }) {
      commit("notFavoriteSelected");
    }
  },
  modules: {}
});
