import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'

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
