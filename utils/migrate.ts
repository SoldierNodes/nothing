import { ethers } from 'ethers'

const helper = '0x5327bc2f3B68735caf2A870DF5E488dF6cbb4508'

const abi = ['function migrate(uint _amount, uint _claim) external']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  amount: Number,
  claim: Number
) => {
  const contract = new ethers.Contract(helper, abi, provider).connect(
    provider.getSigner()
  )

  await contract.migrate(amount, claim)
}
