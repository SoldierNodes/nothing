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
        <div class="grid grid-cols-5 gap-2">
          <div class="flex items-center">
            <span class="font-bold">Name</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Next Claim</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Id</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Pending Reward</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold">Selected</span>
          </div>
        </div>
        <div class="h-6"></div>
        <div
          v-for="(army, index) in armies"
          :key="index"
          class="grid grid-cols-5 gap-2 my-2"
        >
          <div class="flex items-center">
            <span class="font-bold">{{ army.name }}</span>
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
          <div class="flex items-center">
            <span class="font-bold">{{ army.reward }}</span>
          </div>
          <div class="flex items-center">
            <button :class="classClaim(army.id)" @click="claimIt(army.id)">
              Claim
            </button>
          </div>
        </div>
        <div class="flex justify-end mt-10">
          <button
            v-if="numberMigrate > 0"
            class="px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition"
            @click="migrate()"
          >
            Migrate {{ selected.length }} Armies
          </button>
          <button
            v-if="toClaim.length > 0"
            class="px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition"
            @click="claimNow()"
          >
            Claim {{ toClaim.length }} Armies
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
import claimMe from '../utils/claim'

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
      toClaim: [],
      now: 0,
      interval: parseInt(`${Date.now() / 1000}`),
    }
  },
  computed: {
    ...mapState(['armies', 'balance', 'amriesArray', 'isConnected']),
    classArmy() {
      return (name: string) => {
        if (this.selected.includes(name)) {
          return `px-4 py-2 text-sm font-bold bg-army border-2 border-army text-white rounded-md transition`
        } else {
          return `px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition`
        }
      }
    },
    classClaim() {
      return (id: string) => {
        if (this.toClaim.includes(id)) {
          return `px-4 py-2 text-sm font-bold bg-army border-2 border-army text-white rounded-md transition`
        } else {
          return `px-4 py-2 text-sm font-bold bg-white border-2 border-army text-black rounded-md hover:bg-army hover:text-white transition`
        }
      }
    },
    numberMigrate() {
      let toMigrate = 0
      for (let i = 0; i < this.armies.length; i++) {
        const army = this.armies[i]
        if (parseInt(army.id) < 0) {
          toMigrate = toMigrate + 1
        }
      }
      return toMigrate
    },
  },
  created() {
    this.interval = setInterval(() => {
      this.now = parseInt(`${Date.now() / 1000}`)
    }, 1000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    showSoldiers() {
      return parseInt(getBalance(this.balance))
    },
    showDate(unix: number) {
      const now = this.now
      const claimTime = unix + 3600 * 24
      let interval = claimTime - now

      if (interval < 0) {
        return `00:00:00`
      }

      let hours: string | number = parseInt(`${interval / 3600}`)
      interval = interval - hours * 3600
      if (hours < 10) {
        hours = `0${hours}`
      }
      let minutes: string | number = parseInt(`${interval / 60}`)
      interval = interval - minutes * 60
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      let seconds: string | number = parseInt(`${interval}`)
      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      return `${hours}:${minutes}:${seconds}`
    },
    select(name: string) {
      if (!this.selected.includes(name)) {
        this.selected.push(name)
      } else {
        this.selected = this.selected.filter((value: string) => value !== name)
      }
    },
    claimIt(id: string) {
      if (!this.toClaim.includes(id)) {
        this.toClaim.push(id)
      } else {
        this.toClaim = this.toClaim.filter((value: string) => value !== id)
      }
    },
    async claimNow() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const claiming = this.toClaim.map((val: string) => {
        return parseInt(val)
      })

      try {
        await claimMe(provider, claiming)
      } catch (error: any) {
        switch (error.data.message) {
          case "execution reverted: HELPER: You don't have enough reward to cash out":
            // @ts-ignore
            this.$toast.error("You don't have enough funds to cashout", {
              position: 'top-right',
              timeout: 4000,
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
            break

          default:
            // @ts-ignore
            this.$toast.error(
              'Sorry please try to claim by selecting armies in "Your Amry"',
              {
                position: 'top-right',
                timeout: 4000,
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
            break
        }
      }
    },
    async migrate() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      try {
        await migrateMe(provider, this.selected.length, 1639339210)
      } catch (error: any) {
        if (
          error.data.message ===
          "execution reverted: HELPER: You can't migrate nodes that you previously own"
        ) {
          // @ts-ignore
          this.$toast.error('You have migrated too many nodes.', {
            position: 'top-right',
            timeout: 4000,
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
          // @ts-ignore
          this.$toast.error('Something went wrong !', {
            position: 'top-right',
            timeout: 4000,
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
