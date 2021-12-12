import { ethers, BigNumber } from 'ethers'

const token = '0x595d6a0c96d994b2642647c9d373b45d0c84f942'

const abiToken = [
  'function balanceOf(address account) external view returns (uint256)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  account: String
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  const balance: BigNumber = await pairContract.balanceOf(account)

  return balance
}
