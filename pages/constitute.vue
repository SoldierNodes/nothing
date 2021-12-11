<template>
  <div class="mt-16 flex flex-col items-center">
    <div class="font-ops text-4xl uppercase">Constitute your army</div>
    <div class="mt-10" />
    <div class="w-full md:w-3/4 lg:w-5/6 xl:w-3/4">
      <div
        class="px-6 py-2 bg-army bg-opacity-70 text-white font-ops text-2xl rounded-t-lg"
      >
        Information:
      </div>
      <div class="mt-1 flex flex-col md:flex-row">
        <div class="p-6 bg-army bg-opacity-70 text-white text-lg">
          <div class="flex justify-between my-2">
            <span>Account</span>
            <div class="w-10"></div>
            <span class="font-bold">{{
              isConnected
                ? `${account.substr(0, 6)}...${account.substr(
                    account.length - 6,
                    account.length
                  )}`
                : 'Connect'
            }}</span>
          </div>
          <div class="flex justify-between my-2">
            <span>{{ armies > 1 ? 'Armies' : 'Army' }}</span>
            <div class="w-10"></div>
            <span class="font-bold">{{ armies }}</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Soldiers</span>
            <div class="w-10"></div>
            <span class="font-bold">{{ showSoldiers() }}</span>
          </div>
        </div>
        <div class="w-0 h-1 md:h-0 md:w-1" />
        <div
          class="flex-grow p-6 bg-army bg-opacity-70 text-white text-lg flex items-center"
        >
          <div class="flex-grow">
            <div class="flex justify-between my-2">
              <span>Army cost</span>
              <span class="font-bold">10</span>
            </div>
            <div class="flex justify-between my-2">
              <span>Army Rewards/day</span>
              <span class="font-bold">1</span>
            </div>
            <div class="flex justify-between my-2">
              <span>Claimable</span>
              <span class="font-bold">{{ rewards }}</span>
            </div>
          </div>
          <button
            class="ml-6 px-3 py-1 text-sm font-bold bg-white border-2 border-army text-black rounded hover:bg-army hover:text-white transition"
            @click="claim()"
          >
            Claim
          </button>
        </div>
      </div>
      <div
        class="mt-1 px-6 py-3 bg-army bg-opacity-70 text-white text-xl rounded-b-lg"
      >
        <span class="font-ops">Build your army:</span>
        <div v-for="(name, index) in names" :key="index" class="flex my-2">
          <input
            v-model="name.value"
            type="text"
            placeholder="Army name"
            class="flex-grow text-sm p-2 rounded-md focus:outline-none focus:ring ring-army text-black"
          />
          <button
            class="ml-4 px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition"
            @click="remove(index)"
          >
            Remove
          </button>
        </div>
        <div class="flex justify-end">
          <button
            v-if="names.length < 10"
            class="ml-4 px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition"
            @click="add()"
          >
            Add
          </button>
          <button
            class="ml-4 px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition"
            @click="create()"
          >
            Create {{ names.length }} Armies
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ethers, BigNumber } from 'ethers'
import Vue from 'vue'
import { mapState } from 'vuex'

import claimMe from '../utils/claim'
import buildArmy from '../utils/buildArmy'

const getBalance = (value: BigNumber, fixedTo = 6) => {
  const puissance = 18 - fixedTo < 0 ? 18 : 18 - fixedTo
  let price = value
    .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(puissance)))
    .toString()
  if (price.length < fixedTo || price.length === fixedTo) {
    const diff = fixedTo - price.length
    for (let i = 0; i < diff; i++) {
      price = `0${price}`
    }
    return `0.${price}`
  } else {
    const diff = price.length - fixedTo
    return `${price.substring(0, diff)}.${price.substring(diff)}`
  }
}

export default Vue.extend<any, any, any>({
  data() {
    return {
      names: [{ value: '' }],
    }
  },
  computed: {
    ...mapState(['isConnected', 'account', 'armies', 'balance', 'rewards']),
  },
  methods: {
    showSoldiers() {
      return parseInt(getBalance(this.balance))
    },
    claim() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      claimMe(provider)
    },
    create() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      buildArmy(provider, this.names[0].value)
    },
    add() {
      if (this.names.length < 10) {
        this.names.push({ value: '' })
      }
    },
    remove(index: number) {
      if (this.names.length !== 1) {
        this.names.splice(index, 1)
      }
    },
  },
})
</script>
