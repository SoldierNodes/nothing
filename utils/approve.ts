import { ethers, BigNumber } from 'ethers'

const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'
const manager = '0xAaab45B47308cBc467b0a815364B15644Eb337F1'

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
    manager,
    BigNumber.from(420)
      .mul(BigNumber.from(69))
      .mul(BigNumber.from(10).pow(BigNumber.from(50)))
  )
}
