import { ethers } from 'ethers'

const helper = '0x9a481E39afc0463E01D7ABcFe47f8D6214AcE9Dc'

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
    await contract.createNodeWithTokens('SORRY')
  } else {
    const names: String[] = []
    for (let i = 0; i < amount; i++) {
      names.push('SORRY')
    }
    await contract.createMultipleNodeWithTokensAndName(names, names.length)
  }
}
