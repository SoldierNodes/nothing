import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'

const abiToken = [
  'function getRewardAmountOf(address account) public view returns (uint256)',
]

export default async (
  provider: ethers.providers.Web3Provider,
  account: String
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  let rewards: BigNumber = BigNumber.from(0)

  try {
    rewards = await pairContract.getRewardAmountOf(account)
  } catch (error) {}

  return parseInt(
    rewards
      .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
      .toString()
  )
}
