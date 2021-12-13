import { ethers } from 'ethers'

const helper = '0xc1Ea0bB639611cb850e4c6D174Aca293013e7359'

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
