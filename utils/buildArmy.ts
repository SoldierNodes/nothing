import { ethers } from 'ethers'

const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'

const abiToken = ['function createNodeWithTokens(string memory name) public']

export default async (
  provider: ethers.providers.Web3Provider,
  name: String
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider).connect(
    provider.getSigner()
  )
  await pairContract.createNodeWithTokens(name)
}
