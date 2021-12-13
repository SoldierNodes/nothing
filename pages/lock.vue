<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div class="text-white">Updating{{ dots }}</div>
    <div class="text-gray-400 text-xs mt-2">Be right back ~ 8:30 PM UTC</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'locked',
  created() {
    this.$router.push(`/`)
  },
})
</script>
