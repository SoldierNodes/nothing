import { ethers, BigNumber } from 'ethers'

// TOKEN CONTRACT
const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'

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
