import { ethers } from 'ethers'

export const state = () => ({
  isConnected: false,
  account: '',
  balance: ethers.BigNumber.from(0),
  rewards: 0,
  armies: [],
  isApproved: false,
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
  setBalance(state, balance) {
    state.balance = balance
  },
  setArmies(state, armies) {
    state.armies = armies
  },
  addArmies(state, army) {
    const index = state.armies.findIndex((thearmy) => thearmy.id === army.id)
    if (index < 0) {
      state.armies = [army, ...state.armies]
    }
  },
  setRewards(state, rewards) {
    state.rewards = rewards
  },
  setApproved(state, approved) {
    state.isApproved = approved
  },
}
