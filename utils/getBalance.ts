import { ethers, BigNumber } from 'ethers'

const token = '0xdcc19Cef4f7e90F744899FD17Eef327C6C9676CE'

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
