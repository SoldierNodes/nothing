import { ethers, BigNumber } from 'ethers'

const token = '0xdcc19Cef4f7e90F744899FD17Eef327C6C9676CE'

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
