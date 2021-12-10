import { ethers } from 'ethers'

const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'

const abiToken = ['function cashoutAll() public']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider).connect(
    provider.getSigner()
  )
  await pairContract.cashoutAll()
}
