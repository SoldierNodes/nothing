import { ethers, BigNumber } from 'ethers'

const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'
const helper = '0xe483812cfd0fc0d1566729da793fe0dcbea49a2f'

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
