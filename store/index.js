import { ethers } from 'ethers'

export const state = () => ({
  isConnected: false,
  account: '',
  balance: ethers.BigNumber.from(0),
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
}
