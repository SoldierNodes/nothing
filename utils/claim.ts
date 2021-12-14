import { ethers } from 'ethers'

const helper = '0x34166136b7cC1B1AcA438967FFD50Bc56A19a307'

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
  console.log(pools)
  await contract.claimAll(pools)
}
