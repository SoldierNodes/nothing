import { ethers, BigNumber } from 'ethers'

const token = '0xad7476c49d3f82a144f4836aacb9b069c188b759'
const helper = '0x9a481E39afc0463E01D7ABcFe47f8D6214AcE9Dc'

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
