import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0x595d6a0c96d994b2642647c9d373b45d0c84f942'

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
