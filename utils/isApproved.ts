import { ethers, BigNumber } from 'ethers'

const token = '0xad7476c49d3f82a144f4836aacb9b069c188b759'
const helper = '0xc1Ea0bB639611cb850e4c6D174Aca293013e7359'

const abiToken = [
  'function allowance(address owner, address spender) public view returns (uint256)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  account: String
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  const allowed: BigNumber = await pairContract.allowance(account, helper)

  return allowed.gt(BigNumber.from(0))
}
