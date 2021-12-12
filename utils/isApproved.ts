import { ethers, BigNumber } from 'ethers'

const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'
const helper = '0x1a83d1dbF89BF12219e84050d8d1ae3D001Ea51E'

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
