export const state = () => ({
  isConnected: false,
  account: '',
})

export const mutations = {
  login(state) {
    state.isConnected = true
  },
  logout(state) {
    state.isConnected = false
  },
  setAddress(state, address) {
    state.account = address
  },
}
