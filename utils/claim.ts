import { ethers } from 'ethers'

const token = '0xdcc19Cef4f7e90F744899FD17Eef327C6C9676CE'

const abiToken = ['function cashoutAll() public']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider).connect(
    provider.getSigner()
  )
  await pairContract.cashoutAll()
}
