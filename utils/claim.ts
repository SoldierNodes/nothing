import { ethers } from 'ethers'

const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'

const abiToken = ['function cashoutAll() public']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider).connect(
    provider.getSigner()
  )
  await pairContract.cashoutAll()
}
