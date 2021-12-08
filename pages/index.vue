<template>
  <div class="mt-16 flex flex-col items-center">
    <div class="font-ops text-4xl">BUY NEW SOLDIERS</div>
    <div class="mt-10" />
    <div class="w-3/4">
      <div
        class="px-6 py-2 bg-army bg-opacity-70 text-white font-ops text-2xl rounded-t-lg"
      >
        Information:
      </div>
      <div class="mt-1 flex">
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
        <div class="w-1" />
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
