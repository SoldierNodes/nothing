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
        class="bg-gray-300 h-32 rounded-lg flex items-center justify-center col-span-2"
      >
        Coming Soon...
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

export default Vue.extend({
  computed: { ...mapState(['armies', 'balance']) },
  methods: {
    showSoldiers() {
      return parseInt(getBalance(this.balance))
    },
  },
})
</script>
