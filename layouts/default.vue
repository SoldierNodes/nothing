<template>
  <div class="background relative">
    <div
      v-if="mobile && isPanelOpen"
      class="absolute h-full w-full z-10 bg-black opacity-60"
      @click="isPanelOpen = false"
    ></div>
    <transition name="slide">
      <div
        v-if="(mobile && isPanelOpen) || !mobile"
        class="min-h-screen bg-white lg:bg-army lg:bg-opacity-70 w-72 flex flex-col fixed z-20 overflow-auto"
      >
        <div class="flex justify-center">
          <img src="/images/logo.png" class="h-28 mt-6 mr-3" alt="" />
        </div>
        <div class="flex flex-col mt-10">
          <NuxtLink
            to="/"
            class="px-6 py-2 flex items-center hover:bg-black hover:bg-opacity-20 transition"
            @click.native="isPanelOpen = false"
          >
            <img src="/icons/helmet.png" class="h-10 mr-4" alt="" />
            <span class="font-ops text-2xl">Buy Soldiers</span>
          </NuxtLink>
          <NuxtLink
            to="/constitute"
            class="px-6 py-2 flex items-center hover:bg-black hover:bg-opacity-20 mt-4 transition"
            @click.native="isPanelOpen = false"
          >
            <img src="/icons/rank.png" class="h-10 mr-4" alt="" />
            <span class="font-ops text-2xl">Constitute</span>
          </NuxtLink>
          <NuxtLink
            to="/armies"
            class="px-6 py-2 flex items-center hover:bg-black hover:bg-opacity-20 mt-4 transition"
            @click.native="isPanelOpen = false"
          >
            <img src="/icons/tank.png" class="h-10 mr-4" alt="" />
            <span class="font-ops text-2xl">Your Army</span>
          </NuxtLink>
          <NuxtLink
            to="/war"
            class="px-6 py-2 flex items-center hover:bg-black hover:bg-opacity-20 mt-4 transition"
            @click.native="isPanelOpen = false"
          >
            <img src="/icons/global.png" class="h-10 mr-4" alt="" />
            <span class="font-ops text-2xl">World War</span>
          </NuxtLink>
        </div>
        <div
          class="flex-grow flex justify-between px-10 items-end pb-6 text-center text-4xl text-gray-500 lg:text-white mt-10"
        >
          <a
            href="https://twitter.com/SoldierNodes"
            class="hover:text-army transition"
            ><i class="bx bxl-twitter"></i
          ></a>
          <a
            href="http://discord.gg/soldiernodes"
            class="hover:text-army transition"
            ><i class="bx bxl-discord-alt"></i
          ></a>
          <a
            href="https://medium.com/@soldiernodes/soldiernodes-767b977e3292"
            class="hover:text-army transition"
            ><i class="bx bxl-medium"></i
          ></a>
        </div>
      </div>
    </transition>
    <div class="min-h-screen ml-0 lg:ml-72">
      <div class="mx-6 flex flex-col">
        <div class="flex justify-between items-center mt-10">
          <div class="flex items-center visible lg:invisible">
            <button
              class="h-10 w-10 rounded-md flex items-center justify-center bg-army bg-opacity-70 hover:bg-opacity-100 text-white transition"
              @click="isPanelOpen = true"
            >
              <i class="bx bx-menu"></i>
            </button>
          </div>
          <div class="flex items-center">
            <button
              class="py-2 px-8 rounded-md flex items-center bg-army bg-opacity-70 hover:bg-opacity-100 text-white transition"
              @click="isConnected ? logout() : connect()"
            >
              {{
                isConnected
                  ? `${account.substr(0, 6)}...${account.substr(
                      account.length - 6,
                      account.length
                    )}`
                  : 'Connect'
              }}
            </button>
          </div>
        </div>
        <Nuxt />
        <div class="h-10"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BigNumber, ethers } from 'ethers'
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

import getBalance from '../utils/getBalance'
import getArmies from '../utils/getArmies'
import getRewards from '../utils/getReward'
import isApproved from '../utils/isApproved'

export default Vue.extend({
  data() {
    return {
      mobile: false,
      isPanelOpen: false,
    }
  },
  computed: {
    ...mapState(['isConnected', 'account', 'armies']),
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', this.resize)
      // eslint-disable-next-line nuxt/no-globals-in-created
      if (window.innerWidth < 1024) {
        this.mobile = true
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    ...mapMutations([
      'login',
      'logout',
      'setAddress',
      'setBalance',
      'setArmies',
      'setRewards',
      'setApproved',
      'addArmies',
    ]),
    resize(_: any) {
      if (window.innerWidth < 1024) {
        this.mobile = true
      } else {
        this.mobile = false
      }
    },
    async connect() {
      // @ts-ignore
      const ethereum = window.ethereum

      // @ts-ignore
      this.$toast('Connecting...', {
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false,
      })

      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        const goodChainid = '0xa86a'
        if (chainId === goodChainid) {
          this.setAddress(accounts[0])
          ethereum.on('accountsChanged', (accounts: string[]) => {
            if (accounts[0] === undefined) {
              // @ts-ignore
              this.$toast('Account Changed. Reaload !', {
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: 'button',
                icon: true,
                rtl: false,
              })
              window.location.reload()
            } else {
              // @ts-ignore
              this.$toast('Account Switched', {
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: 'button',
                icon: true,
                rtl: false,
              })
              this.setAddress(accounts[0])
            }
          })
          ethereum.on('chainChanged', () => {
            // @ts-ignore
            this.$toast('Network Changed. Reaload !', {
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: true,
              rtl: false,
            })
            window.location.reload()
          })
          this.login()

          const provider = new ethers.providers.Web3Provider(ethereum)

          try {
            this.setBalance(await getBalance(provider, this.account))
            this.setRewards(await getRewards(provider, this.armies))
            this.setApproved(await isApproved(provider, this.account))

            const armies = await getArmies(provider, this.account)

            let isDone = false
            while (!isDone) {
              const army = await armies.next()
              isDone = army.done ? army.done : false
              ;(async () => {
                if (army.value) {
                  const [name, mint, claim, reward] = await Promise.all([
                    army.value.name,
                    army.value.mint,
                    army.value.claim,
                    army.value.reward,
                  ])
                  this.addArmies({
                    id: army.value.id,
                    name,
                    mint: parseInt(mint.toString()),
                    claim: parseInt(claim.toString()),
                    reward: parseInt(
                      reward
                        .div(BigNumber.from(10).pow(BigNumber.from(18)))
                        .toString()
                    ),
                  })
                }
              })()
            }
          } catch (error) {}

          // @ts-ignore
          this.$toast.success('Connected Successfully', {
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        } else {
          try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: goodChainid }],
            })
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: goodChainid,
                      chainName: 'Avalanche Network',
                      nativeCurrency: {
                        name: 'Avalanche',
                        symbol: 'AVAX',
                        decimals: 18,
                      },
                      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                      blockExplorerUrls: ['https://snowtrace.io/'],
                    },
                  ],
                })
              } catch (addError) {
                // @ts-ignore
                this.$toast.error('Wrong Network', {
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: 'button',
                  icon: true,
                  rtl: false,
                })
              }
            } else {
              // @ts-ignore
              this.$toast.error('Wrong Network', {
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: 'button',
                icon: true,
                rtl: false,
              })
            }
          }
        }
      } catch (error: any) {
        if (error.code === 4001) {
          // @ts-ignore
          this.$toast.error(
            'To gain access to the dApp, you must first connect your wallet',
            {
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: true,
              rtl: false,
            }
          )
        } else {
          // @ts-ignore
          this.$toast.error('Please install MetaMask', {
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        }
      }
    },
  },
})
</script>

<style lang="scss">
.background {
  background-image: url('/images/bg.svg');
  background-size: cover;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #130f40;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}

a {
  span {
    @apply text-gray-500 lg:text-white;
  }
}

a.nuxt-link-exact-active {
  span {
    @apply text-army;
  }
}
</style>
