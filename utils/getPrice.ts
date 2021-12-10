import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'
const router = '0x60ae616a2155ee3d9a68541ba4544862310933d4'
const wavax = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
const usdt = '0xc7198437980c041c805a1edcba50c1ce5db95118'

const abiRouter = [
  'function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) external pure returns (uint256 amountOut)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const one = BigNumber.from(10).pow(BigNumber.from(6))

  const routerContract = new ethers.Contract(router, abiRouter, provider)
  const avaxPrice: BigNumber = await routerContract.getAmountOut(
    one,
    usdt,
    wavax
  )

  const tokenPrice: BigNumber = await routerContract.getAmountOut(
    one,
    token,
    wavax
  )

  const price = avaxPrice
    .mul(tokenPrice)
    .div(BigNumber.from(10).pow(BigNumber.from(34)))

  console.log(price)

  return 0
}
