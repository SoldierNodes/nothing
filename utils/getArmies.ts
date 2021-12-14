import { BigNumber, ethers } from 'ethers'

const manager = '0x94cBFBAb5be01d52b273DA19D7C6DB7AFdA737E6'
const helper = '0x34166136b7cC1B1AcA438967FFD50Bc56A19a307'

const oldmanager = '0x125AB7BA207824ECE40722070370eC5A38bBfa89'

const abi = [
  'function getNodesStringOf(address _account) external view returns (string memory)',
]

const abiHelper = [
  'function notMigrated(address _account) view external returns (uint)',
]

const oldabi = [
  'function _getNodesLastClaimTime(address account) external view returns (string memory)',
  'function _getNodesNames(address account) external view returns (string memory)',
  'function _getNodesCreationTime(address account) external view returns (string memory)',
]

export default async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  account: String
) => {
  const contract = new ethers.Contract(manager, abi, provider)

  const contractXD = new ethers.Contract(helper, abiHelper, provider)
  const armies: String = await contract.getNodesStringOf(account)
  const possibleMint = (
    (await contractXD.notMigrated(account)) as BigNumber
  ).toNumber()

  let realArmies: any = []

  if (armies !== '') {
    realArmies = armies.split(`#`).map((value: String) => {
      const values = value.split(`.`)
      return {
        id: values[0],
        name: values[1],
        mint: values[2],
        claim: values[3],
        earned: values[4],
      }
    })
  }

  const oldContract = new ethers.Contract(oldmanager, oldabi, provider)

  const notMigrated = []

  try {
    const names = await oldContract._getNodesNames(account)
    const namesArray = names.split('#')
    const claims = await oldContract._getNodesLastClaimTime(account)
    const claimsArray = claims.split('#')
    const creation = await oldContract._getNodesCreationTime(account)
    const creationArray = creation.split('#')

    for (let i = 0; i < possibleMint; i++) {
      notMigrated.push({
        id: -1,
        name: namesArray[i],
        mint: creationArray[i],
        claim: claimsArray[i],
        earned: 2,
      })
    }
  } catch (error) {}

  return [...notMigrated, ...realArmies]
}
