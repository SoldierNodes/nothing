import { ethers } from 'ethers'

const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'

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
