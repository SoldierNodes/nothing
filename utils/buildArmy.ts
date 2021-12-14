import { ethers } from 'ethers'

const helper = '0x34166136b7cC1B1AcA438967FFD50Bc56A19a307'

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
    return await contract.createNodeWithTokens('V2 NODE')
  } else {
    const names: String[] = []
    for (let i = 0; i < amount; i++) {
      names.push('V2 NODE')
    }
    return await contract.createMultipleNodeWithTokensAndName(
      names,
      names.length
    )
  }
}
