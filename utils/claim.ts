import { ethers } from 'ethers'

const helper = '0x1a83d1dbF89BF12219e84050d8d1ae3D001Ea51E'

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
