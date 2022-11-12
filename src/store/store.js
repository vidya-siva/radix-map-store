import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  Lat:0.00,
  Lon:0.00,
  locN:'',
  des:'',
  activeMap:{
    isActive: false
  },
  version:'v.0.0.3'
  // center: latLng(39.903416, 32.858900),
  
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  // center: state => latLng(state.Lat,state.Lon),
  lati: state => state.Lat,
  long: state => state.Lon,
  windowData: state => state.activeMap.isActive
  


}

const mutations = {
  increment (state) {
    state.count++;
  },
  decrement (state) {
    state.count--;
  }
}



export default new Vuex.Store({
  state,
  getters,
  mutations,
})
