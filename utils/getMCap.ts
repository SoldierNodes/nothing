import { ethers, BigNumber } from 'ethers'

import getPrice from './getPrice'

const token = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'

const abiToken = ['function totalSupply() external view returns (uint256)']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  const totalSupply: BigNumber = await pairContract.totalSupply()
  const price = await getPrice(provider)

  return parseFloat(
    parseFloat(
      `${ethers.BigNumber.from(parseInt(`${price}`))
        .mul(totalSupply)
        .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
        .toString()}`
    ).toFixed(2)
  )
}
