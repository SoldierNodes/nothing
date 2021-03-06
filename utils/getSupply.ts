import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0xad7476c49D3f82a144f4836aACb9b069c188b759'

const abiToken = ['function totalSupply() external view returns (uint256)']

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const pairContract = new ethers.Contract(token, abiToken, provider)
  const totalSupply: BigNumber = await pairContract.totalSupply()

  return parseFloat(
    parseFloat(
      totalSupply
        .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
        .toString()
    ).toFixed(2)
  )
}
