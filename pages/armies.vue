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
        Amount of {{ armies > 1 ? 'armies' : 'army' }}: {{ armies.length }}
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
            <span class="font-bold">Earned</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Last Claim</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Id</span>
          </div>
        </div>
        <div class="h-6"></div>
        <div
          v-for="(army, index) in armies"
          :key="index"
          class="grid grid-cols-5 my-2"
        >
          <div class="flex items-center">
            <span class="font-bold">{{ army.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">{{ showDate(army.mint) }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">{{ army.earned }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">{{ showDate(army.claim) }}</span>
          </div>
          <div class="flex items-center">
            <span v-if="army.id > 0" class="font-bold">{{ army.id }}</span>
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
            @click="migrate()"
          >
            Migrate {{ selected.length }} Armies
          </button>
        </div>
      </div>
      <div
        class="bg-white border rounded-lg col-span-2 p-6 font-sans text-base normal-case"
      >
        Soldiers! We have a letter from our Generals:
        <p class="mt-4 text-xs">
          In order to provide the best experience for our players on
          SoldierNodes, we are upgrading nodes to the next level !
          <br /><br /><span class="font-bold text-sm"
            >Nodes are now NFTs !</span
          >
          <br />
          <br />

          What are the steps to follow? They're really simple. Manually click on
          "Upgrade". Your wallet provider (ex: Metamask) should pop-up. Please
          accept the transaction. If the transaction doesn't go through at first
          due or an internal error, please decrease the number of armies (nodes)
          to upgrade ! You will then be able to upgrade the rest of your armies
          (nodes) in another transaction.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BigNumber, ethers } from 'ethers'
import Vue from 'vue'
import { mapState } from 'vuex'

import migrateMe from '../utils/migrate'

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
    async migrate() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await migrateMe(provider, this.selected.length, 1639327850)
    },
  },
})
</script>
