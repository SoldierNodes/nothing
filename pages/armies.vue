<template>
  <div class="mt-16 flex flex-col items-center">
    <div class="font-ops text-4xl uppercase">Your army</div>
    <div class="mt-10" />
    <div
      class="w-full md:w-3/4 lg:w-5/6 xl:w-3/4 grid grid-cols-2 gap-6 text-xl font-ops uppercase"
    >
      <div
        class="bg-army bg-opacity-70 h-32 rounded-lg flex items-center justify-center text-white"
      >
        Amount of {{ armies > 1 ? 'armies' : 'army' }}: {{ armies }}
      </div>
      <div
        class="bg-army bg-opacity-70 h-32 rounded-lg flex items-center justify-center text-white"
      >
        Your soldiers: {{ showSoldiers() }}
      </div>
      <div
        class="bg-gray-300 rounded-lg col-span-2 p-6 font-sans text-base normal-case"
      >
        <div class="grid grid-cols-5">
          <div class="flex items-center">
            <span class="font-bold">Name</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Creation Date</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Reward Avaible</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Last Claim</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Is NFT</span>
          </div>
        </div>
        <div class="h-6"></div>
        <div
          v-for="(army, index) in amriesArray"
          :key="index"
          class="grid grid-cols-5 my-2"
        >
          <div class="flex items-center">
            <span class="font-bold">{{ army.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">{{ showDate(army.created) }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">{{ army.rewards }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">{{ showDate(army.claims) }}</span>
          </div>
          <div class="flex items-center">
            <span v-if="army.nft" class="font-bold">Yes</span>
            <button
              v-else
              :class="classArmy(army.name)"
              @click="select(army.name)"
            >
              Migrate
            </button>
          </div>
        </div>
        <div class="flex justify-end mt-10">
          <button
            class="px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition"
          >
            Migrate {{ selected.length }} Armies
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BigNumber, ethers } from 'ethers'
import Vue from 'vue'
import { mapState } from 'vuex'

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

export default Vue.extend<any, any, any, any>({
  data() {
    return {
      selected: [],
    }
  },
  computed: {
    ...mapState(['armies', 'balance', 'amriesArray']),
    classArmy() {
      return (name: string) => {
        if (this.selected.includes(name)) {
          return `px-4 py-2 text-sm font-bold bg-army border-2 border-army text-white rounded-md transition`
        } else {
          return `px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition`
        }
      }
    },
  },
  methods: {
    showSoldiers() {
      return parseInt(getBalance(this.balance))
    },
    showDate(unix: number) {
      const date = new Date(unix * 1000)
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    },
    select(name: string) {
      if (!this.selected.includes(name)) {
        this.selected.push(name)
      } else {
        this.selected = this.selected.filter((value: string) => value !== name)
      }
    },
  },
})
</script>
