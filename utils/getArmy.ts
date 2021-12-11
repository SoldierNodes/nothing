/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers'

const token = '0x595d6A0c96d994b2642647C9d373B45d0C84F942'

const abiToken = [
  'function getNodesNames() public view returns (string memory)',
  'function getNodesCreatime() public view returns (string memory)',
  'function getNodesRewards() public view returns (string memory)',
  'function getNodesLastClaims() public view returns (string memory)',
]

export default async (provider: ethers.providers.Web3Provider) => {
  const pairContract = new ethers.Contract(token, abiToken, provider).connect(
    provider.getSigner()
  )
  const names: String = await pairContract.getNodesNames()
  const creatime: String = await pairContract.getNodesCreatime()
  const rewards: String = await pairContract.getNodesRewards()
  const claims: String = await pairContract.getNodesLastClaims()

  const nameArray = names.split('#')
  const creatimeArray = creatime.split('#').map((value) => {
    return parseInt(value)
  })
  const rewardsArray = rewards.split('#').map((value) => {
    return parseInt(value)
  })
  const claimsArray = claims.split('#').map((value) => {
    return parseInt(value)
  })

  const armies: Array<{
    name: String
    created: Number
    rewards: Number
    claims: Number
    nft: false
  }> = []

  for (let i = 0; i < nameArray.length; i++) {
    armies.push({
      name: nameArray[i],
      created: creatimeArray[i],
      rewards: rewardsArray[i],
      claims: claimsArray[i],
      nft: false,
    })
  }

  return armies
}
