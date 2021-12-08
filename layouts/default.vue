<template>
  <div class="background">
    <div class="min-h-screen bg-army bg-opacity-70 w-72 flex flex-col fixed">
      <div class="flex justify-center">
        <img src="/images/logo.png" class="h-28 mt-6 mr-3" alt="" />
      </div>
      <div class="flex flex-col mt-10">
        <div
          class="px-6 py-2 flex items-center cursor-pointer hover:bg-black hover:bg-opacity-20 transition"
        >
          <img src="/icons/helmet.png" class="h-10 mr-4" alt="" />
          <span class="font-ops text-2xl text-army">Buy Soldiers</span>
        </div>
        <div
          class="px-6 py-2 flex items-center cursor-pointer hover:bg-black hover:bg-opacity-20 mt-4 transition"
        >
          <img src="/icons/rank.png" class="h-10 mr-4" alt="" />
          <span class="font-ops text-2xl text-white">Constitute</span>
        </div>
        <div
          class="px-6 py-2 flex items-center cursor-pointer hover:bg-black hover:bg-opacity-20 mt-4 transition"
        >
          <img src="/icons/tank.png" class="h-10 mr-4" alt="" />
          <span class="font-ops text-2xl text-white">Your Army</span>
        </div>
        <div
          class="px-6 py-2 flex items-center cursor-pointer hover:bg-black hover:bg-opacity-20 mt-4 transition"
        >
          <img src="/icons/global.png" class="h-10 mr-4" alt="" />
          <span class="font-ops text-2xl text-white">World War</span>
        </div>
      </div>
      <div
        class="flex-grow flex justify-between px-10 items-end pb-6 text-center text-4xl text-white"
      >
        <a href="twitter.com" class="hover:text-army transition"
          ><i class="bx bxl-twitter"></i
        ></a>
        <a href="twitter.com" class="hover:text-army transition"
          ><i class="bx bxl-discord-alt"></i
        ></a>
        <a href="twitter.com" class="hover:text-army transition"
          ><i class="bx bxl-medium"></i
        ></a>
      </div>
    </div>
    <div class="min-h-screen ml-72">
      <div class="mx-6 flex flex-col">
        <div class="flex justify-end items-center mt-10">
          <div class="flex items-center">
            <button
              class="py-2 px-8 rounded-md flex items-center bg-army bg-opacity-80 hover:bg-opacity-100 text-white transition"
            >
              Connect
            </button>
          </div>
        </div>
        <Nuxt />
        <div class="h-10"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url('/images/bg.svg');
}
</style>
