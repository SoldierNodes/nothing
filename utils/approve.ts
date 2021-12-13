import { ethers, BigNumber } from 'ethers'

const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'
const helper = '0x5327bc2f3B68735caf2A870DF5E488dF6cbb4508'

const abiToken = [
  'function approve(address spender, uint256 amount) public returns (bool)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider).connect(
    provider.getSigner()
  )

  await pairContract.approve(
    helper,
    BigNumber.from(420)
      .mul(BigNumber.from(69))
      .mul(BigNumber.from(10).pow(BigNumber.from(50)))
  )
}
