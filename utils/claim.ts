import { ethers } from 'ethers'

const helper = '0x5327bc2f3B68735caf2A870DF5E488dF6cbb4508'

const abi = [
  'function claimAll(uint64[] calldata _nodes) public',
  'function claim(uint64 _node) public',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  pools: Array<Number>
) => {
  const contract = new ethers.Contract(helper, abi, provider).connect(
    provider.getSigner()
  )

  await contract.claimAll(pools)
}
