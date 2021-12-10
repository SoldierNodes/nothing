import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'

const abiToken = [
  'function getNodeNumberOf(address account) public view returns (uint256)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  account: String
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  const armies: BigNumber = await pairContract.getNodeNumberOf(account)

  return parseInt(armies.toString())
}
