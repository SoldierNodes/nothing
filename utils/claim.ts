import { ethers } from 'ethers'

const helper = '0x9a481E39afc0463E01D7ABcFe47f8D6214AcE9Dc'

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
