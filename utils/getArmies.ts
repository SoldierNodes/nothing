import { ethers } from 'ethers'

const manager = '0x4Ad175CCCF81FCd89e14595EF3b3C57CAeFC7D06'

const abi = [
  'function getNodesStringOf(address _account) external view returns (string memory)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  account: String
) => {
  const contract = new ethers.Contract(manager, abi, provider)
  const armies: String = await contract.getNodesStringOf(account)

  const realArmies = armies.split(`#`).map((value: String) => {
    const values = value.split(`.`)
    return {
      id: values[0],
      name: values[1],
      mint: values[2],
      claim: values[3],
      earned: values[4],
    }
  })

  return realArmies
}
