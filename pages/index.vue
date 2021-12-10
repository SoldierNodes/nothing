<template>
  <div class="mt-16 flex flex-col items-center">
    <div class="font-ops text-4xl uppercase">BUY NEW SOLDIERS</div>
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
            <span>Price</span>
            <div class="w-10"></div>
            <span class="font-bold">{{ showNumbers(price) }} $</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Market Cap</span>
            <div class="w-10"></div>
            <span class="font-bold">{{ showNumbers(mcap) }} $</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Total Supply</span>
            <div class="w-10"></div>
            <span class="font-bold">{{ showNumbers(tsupply) }}</span>
          </div>
        </div>
        <div class="w-0 h-1 md:h-0 md:w-1" />
        <div class="flex-grow p-6 bg-army bg-opacity-70 text-white text-lg">
          <div class="flex justify-between my-2">
            <span>Name</span>
            <span class="font-bold">Soldiers</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Symbole</span>
            <span class="font-bold">$SOLDIER</span>
          </div>
          <a
            href="https://snowtrace.io/address/0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10"
            target="_blank"
            class="flex justify-between my-2"
          >
            <span>Contract</span>
            <span class="font-bold hover:underline cursor-pointer"
              >0xXXXX...XXXXXX</span
            >
          </a>
        </div>
      </div>
      <div
        class="mt-1 p-2 bg-army bg-opacity-70 text-white font-ops text-xl rounded-b-lg text-center"
      >
        <span>Balance: XX XXX</span>
      </div>
    </div>
    <div
      class="w-full md:w-3/4 lg:w-5/6 xl:w-3/4 mt-4 flex flex-col md:flex-row"
    >
      <div
        class="flex-1 px-6 py-2 bg-army bg-opacity-70 rounded-lg flex items-center justify-center"
      >
        <button
          class="border-4 border-army uppercase font-bold text-normal px-6 py-2 bg-white rounded-lg my-2 hover:bg-army hover:text-white transition"
        >
          buy on tradejoe
        </button>
      </div>
      <div class="w-0 h-1 md:h-0 md:w-1"></div>
      <div
        class="flex-1 px-6 py-2 bg-army bg-opacity-70 rounded-lg flex items-center justify-center"
      >
        <button
          class="border-4 border-army uppercase font-bold text-normal px-6 py-2 bg-white rounded-lg my-2 hover:bg-army hover:text-white transition"
        >
          show chart
        </button>
      </div>
    </div>

    <div class="text-xl mt-14 font-bold text-army text-center">
      When you buy 10 soldiers, you can create 1 Army
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ethers } from 'ethers'

import getPrice from '../utils/getPrice'
import getMCap from '../utils/getMCap'
import getSupply from '../utils/getSupply'

export default Vue.extend({
  data() {
    return {
      mobile: false,
      isPanelOpen: false,
      price: 0,
      mcap: 0,
      tsupply: 0,
      variation: 0,
    }
  },
  computed: {
    ...mapState(['isConnected', 'account']),
  },
  async mounted() {
    let provider
    if (this.isConnected) {
      // @ts-ignore
      provider = new ethers.providers.Web3Provider(window.ethereum)
    } else {
      provider = new ethers.providers.JsonRpcProvider(
        `https://api.avax.network/ext/bc/C/rpc`
      )
    }

    this.price = await getPrice(provider)
    this.mcap = await getMCap(provider)
    this.tsupply = await getSupply(provider)
  },
  methods: {
    showNumbers(number: number) {
      if (number > 1_000_000_000) {
        return `${(number / 1_000_000_000).toFixed(2)}B`
      } else if (number > 1_000_000) {
        return `${(number / 1_000_000).toFixed(2)}M`
      } else if (number > 1_000) {
        return `${(number / 1_000).toFixed(2)}k`
      } else {
        return number
      }
    },
  },
})
</script>
