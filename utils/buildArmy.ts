import { ethers } from 'ethers'

const helper = '0x1a83d1dbF89BF12219e84050d8d1ae3D001Ea51E'

const abi = [
  'function createMultipleNodeWithTokensAndName(string[] memory names, uint amount) public',
  'function createNodeWithTokens(string memory name) public',
]

export default async (
  provider: ethers.providers.Web3Provider,
  names: String[]
) => {
  const contract = new ethers.Contract(helper, abi, provider).connect(
    provider.getSigner()
  )
  if (names.length === 1) {
    await contract.createNodeWithTokens(names[0])
  } else {
    await contract.createMultipleNodeWithTokensAndName(names, names.length)
  }
}
