import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)
const API_BASE='https://amoliski.pythonanywhere.com/dathbot';
//const API_BASE='http://localhost:6969';

export default new Vuex.Store({
  state: {
    ships: [],
    units: [],
    guild_members: [],
    desired_rosters: [],
    roster_progress: [],
    search_result: {},
    ready: false,
  },
  mutations: {
    set_ships(state, ship_list){
      Vue.set(state, 'ships', ship_list);
    },
    set_search_results(state, search_result){
      Vue.set(state, 'search_result', search_result);
    },
    set_units(state, ship_list){
      Vue.set(state, 'units', ship_list);
    },
    set_desired_rosters(state, ship_list){
      Vue.set(state, 'desired_rosters', ship_list);
    },
    set_roster_progress(state, roster_progress){
      Vue.set(state, 'roster_progress', roster_progress);
    },
    set_guild_members(state, members){
      Vue.set(state, 'guild_members', members);
    },
    set_ready(state, ready) {
      state.ready = ready;
    }
  },
  getters: {
    get_team_by_id(state) {
      return (id) => {
        return state.desired_rosters.find(e => e.id === id);
      }
    },
    get_unit_by_id(state) {
      return (id) => {
        return [...state.units, ...state.ships].find(e => e['base_id'] === id);
      }
    },
    get_user_name_by_id(state) {
      return (id) => {
        return state.guild_members.find(e => String(e.ally_code) === String(id)).name;
      }
    }
  },
  actions: {
    async refresh({ dispatch, commit }) {
      await dispatch('load_ships');
      await dispatch('load_units');
      await dispatch('load_guild');
      await dispatch('load_roster_progress');
      await dispatch('load_desired_rosters');
      commit('set_ready', true);
    },
    async user_lookup({ commit }, ally_code) {
      try {
        const result = await axios.get(`${API_BASE}/api/user_lookup/${ally_code}`);
        commit('set_search_results', result.data);
      } catch {
        commit('set_search_results', {})
      }
    },
    async load_ships({ commit }){
      const result = await axios.get(`${API_BASE}/api/ships`)
      commit('set_ships', result.data);
    },
    async load_units({ commit }){
      const result = await axios.get(`${API_BASE}/api/chars`)
      commit('set_units', result.data);
    },
    async load_desired_rosters({ commit }){
      const result = await axios.get(`${API_BASE}/api/desired_rosters`)
      commit('set_desired_rosters', result.data);
    },
    async load_roster_progress({ commit }){
      const result = await axios.get(`${API_BASE}/api/roster_progress`)
      commit('set_roster_progress', result.data);
    },
    async load_guild({ commit }) {
      const result = await axios.get(`${API_BASE}/api/guild_members`)
      commit('set_guild_members', result.data)
    },
    async add_desired_team({ commit, dispatch }, team){
      await axios.post(`${API_BASE}/api/desired_rosters`, {...team});
      await dispatch('refresh');
    },
    async update_desired_team({ commit, dispatch }, team){
      await axios.put(`${API_BASE}/api/desired_rosters/${team.id}`, {...team});
      await dispatch('refresh');
    },
    async delete_desired_team({ dispatch }, team_id) {
      await axios.delete(`${API_BASE}/api/desired_rosters/${team_id}`)
      await dispatch('refresh');
    },
    async move_desired_team_up({ dispatch }, team_id) {
      await axios.post(`${API_BASE}/api/move_desired_roster/${team_id}/up`)
      await dispatch('refresh');
    },
    async move_desired_team_down({ dispatch }, team_id) {
      await axios.post(`${API_BASE}/api/move_desired_roster/${team_id}/down`)
      await dispatch('refresh');
    }
  },
  modules: {
  }
})
