import { ethers, BigNumber } from 'ethers'

// PAIR CONTRACT
const pair = '0x6a736c7c1ef71b5f5b78511b7d84beb7a2abbdaa'

const abiRouter = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1,uint32 blockTimestampLast)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(pair, abiRouter, provider)
  const { reserve0, reserve1 }: { reserve0: BigNumber; reserve1: BigNumber } =
    await pairContract.getReserves()

  console.log(parseInt(`${reserve1.mul(10 ** 14).div(reserve0)}`) / 100)

  return parseInt(`${reserve1.mul(10 ** 14).div(reserve0)}`) / 100
}
