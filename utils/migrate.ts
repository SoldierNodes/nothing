import { ethers } from 'ethers'

const helper = '0x34166136b7cC1B1AcA438967FFD50Bc56A19a307'

const abi = ['function migrate(uint _amount, uint _claim) external']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  amount: Number,
  claim: Number
) => {
  const contract = new ethers.Contract(helper, abi, provider).connect(
    provider.getSigner()
  )

  return await contract.migrate(amount, claim)
}
