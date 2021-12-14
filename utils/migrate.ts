import { ethers } from 'ethers'

const helper = '0x9a481E39afc0463E01D7ABcFe47f8D6214AcE9Dc'

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
