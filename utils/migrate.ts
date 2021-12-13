import { ethers } from 'ethers'

const helper = '0x1a83d1dbF89BF12219e84050d8d1ae3D001Ea51E'

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
