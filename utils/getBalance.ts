import { ethers, BigNumber } from 'ethers'

const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'

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
