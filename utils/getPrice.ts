import { ethers, BigNumber } from 'ethers'

const pair = '0xeD8CBD9F0cE3C6986b22002F03c6475CEb7a6256'

const abiRouter = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1,uint32 blockTimestampLast)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(pair, abiRouter, provider)
  const { reserve0, reserve1 }: { reserve0: BigNumber; reserve1: BigNumber } =
    await pairContract.getReserves()

  return parseInt(`${reserve1.mul(10 ** 14).div(reserve0)}`) / 100
}
