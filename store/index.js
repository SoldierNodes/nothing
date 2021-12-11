import { ethers } from 'ethers'

export const state = () => ({
  isConnected: false,
  account: '',
  balance: ethers.BigNumber.from(0),
  armies: 0,
  rewards: 0,
  amriesArray: [],
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
  setRewards(state, rewards) {
    state.rewards = rewards
  },
  setArmiesArray(state, amriesArray) {
    state.amriesArray = amriesArray
  },
}
