import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const manager = '0x94cBFBAb5be01d52b273DA19D7C6DB7AFdA737E6'

const abi = ['function getRewardOf(uint64 _id) public view returns (uint)']

export default async (
  provider: ethers.providers.Web3Provider,
  armies: Array<{ id: Number }>
) => {
  const contract = new ethers.Contract(manager, abi, provider)
  let rewards: BigNumber = BigNumber.from(0)

  for (let i = 0; i < armies.length; i++) {
    const army = armies[i]
    try {
      rewards = rewards.add(await contract.getRewardOf(army.id))
    } catch (error) {}
  }

  return parseInt(
    rewards
      .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
      .toString()
  )
}
