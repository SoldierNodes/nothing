import { ethers } from 'ethers'

const helper = '0xe483812cfd0fc0d1566729da793fe0dcbea49a2f'

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
