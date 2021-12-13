import { ethers } from 'ethers'

const helper = '0xc1Ea0bB639611cb850e4c6D174Aca293013e7359'

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
