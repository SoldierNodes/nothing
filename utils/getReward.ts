import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0x595d6a0c96d994b2642647c9d373b45d0c84f942'

const abiToken = [
  'function getRewardAmountOf(address account) public view returns (uint256)',
]

export default async (
  provider: ethers.providers.Web3Provider,
  account: String
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  const rewards: BigNumber = await pairContract.getRewardAmountOf(account)

  return parseInt(
    rewards
      .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
      .toString()
  )
}
