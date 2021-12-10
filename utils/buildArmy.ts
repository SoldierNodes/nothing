import { ethers } from 'ethers'

const token = '0xdcc19Cef4f7e90F744899FD17Eef327C6C9676CE'

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
