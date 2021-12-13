import { ethers } from 'ethers'

const helper = '0x5327bc2f3B68735caf2A870DF5E488dF6cbb4508'

const abi = [
  'function createMultipleNodeWithTokensAndName(string[] memory names, uint amount) public',
  'function createNodeWithTokens(string memory name) public',
]

export default async (
  provider: ethers.providers.Web3Provider,
  amount: Number
) => {
  const contract = new ethers.Contract(helper, abi, provider).connect(
    provider.getSigner()
  )

  if (amount === 1) {
    await contract.createNodeWithTokens('V1 NODE')
  } else {
    const names: String[] = []
    for (let i = 0; i < amount; i++) {
      names.push('V1 NODE')
    }
    await contract.createMultipleNodeWithTokensAndName(names, names.length)
  }
}
