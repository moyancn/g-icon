
const state = {
  globalFontSize: 48
}

const getters = {}

const mutations = {
  SET_GLOBAL_FONT_SIZE (state, val) {
    state.globalFontSize = val
    console.log('globalFontSize', state.globalFontSize)
  }
}
const actions = {
  SET_GLOBAL_FONT_SIZE ({ commit }, val) {
    commit('SET_GLOBAL_FONT_SIZE', val)
  }
}

export default { state, getters, mutations, actions }
