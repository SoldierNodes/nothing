<template>
  <div class="mt-16 flex flex-col items-center">
    <div class="font-ops text-4xl">BUY NEW SOLDIERS</div>
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
            <span class="font-bold">80 M$</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Market Cap</span>
            <div class="w-10"></div>
            <span class="font-bold">50 M$</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Total Supply</span>
            <div class="w-10"></div>
            <span class="font-bold">10,000</span>
          </div>
        </div>
        <div class="w-0 h-1 md:h-0 md:w-1" />
        <div class="flex-grow p-6 bg-army bg-opacity-70 text-white text-lg">
          <div class="flex justify-between my-2">
            <span>Last 24H</span>
            <span class="font-bold">+470 %</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Symbole</span>
            <span class="font-bold">SLD</span>
          </div>
          <div class="flex justify-between my-2">
            <span>Contract</span>
            <span class="font-bold hover:underline cursor-pointer"
              >0x1334...66dba2</span
            >
          </div>
        </div>
      </div>
      <div
        class="mt-1 p-2 bg-army bg-opacity-70 text-white font-ops text-xl rounded-b-lg text-center"
      >
        <span>Balance: 12 SLD</span>
      </div>
    </div>
    <div class="w-full md:w-3/4 lg:w-5/6 xl:w-3/4 mt-4 flex">
      <div
        class="flex-1 px-6 py-2 bg-army bg-opacity-70 rounded-l-lg flex items-center justify-center"
      >
        <button
          class="border-4 border-army uppercase font-bold text-normal px-6 py-2 bg-white rounded-lg my-2 hover:bg-army hover:text-white transition"
        >
          buy on tradejoe
        </button>
      </div>
      <div class="w-1"></div>
      <div
        class="flex-1 px-6 py-2 bg-army bg-opacity-70 rounded-r-lg flex items-center justify-center"
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

export default Vue.extend({})
</script>
