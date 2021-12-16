import { BigNumber, ethers } from 'ethers'

const manager = '0x94cBFBAb5be01d52b273DA19D7C6DB7AFdA737E6'
const helper = '0x34166136b7cC1B1AcA438967FFD50Bc56A19a307'

const oldmanager = '0x125AB7BA207824ECE40722070370eC5A38bBfa89'

const abi = [
  'function getNodesStringOf(address _account) external view returns (string memory)',
  'function balanceOf(address owner) public override view returns (uint256 balance)',
  'function getNodesIdsOf(address _account) public view returns (uint64[] memory)',
  'function getNameOf(uint64 _id) public view returns (string memory)',
  'function getMintOf(uint64 _id) public view returns (uint64)',
  'function getClaimOf(uint64 _id) public view returns (uint64)',
  'function getEarnedOf(uint64 _id) public view returns (uint64)',
  'function getRewardOf(uint64 _id) public view returns (uint)',
]

const abiHelper = [
  'function notMigrated(address _account) view external returns (uint)',
]

const oldabi = [
  'function _getNodesLastClaimTime(address account) external view returns (string memory)',
  'function _getNodesNames(address account) external view returns (string memory)',
  'function _getNodesCreationTime(address account) external view returns (string memory)',
]

async function* getArmies(
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  account: String
) {
  const contract = new ethers.Contract(manager, abi, provider)

  const contractXD = new ethers.Contract(helper, abiHelper, provider)
  const armiesId: Array<BigNumber> = await contract.getNodesIdsOf(account)

  for (let i = 0; i < armiesId.length; i++) {
    const id = armiesId[i]

    yield {
      id: parseInt(id.toString()),
      name: contract.getNameOf(id),
      mint: contract.getMintOf(id),
      claim: contract.getClaimOf(id),
      reward: contract.getRewardOf(id),
    }
  }

  const possibleMint = (
    (await contractXD.notMigrated(account)) as BigNumber
  ).toNumber()

  const oldContract = new ethers.Contract(oldmanager, oldabi, provider)

  try {
    const names = await oldContract._getNodesNames(account)
    const namesArray = names.split('#')
    const claims = await oldContract._getNodesLastClaimTime(account)
    const claimsArray = claims.split('#')
    const creation = await oldContract._getNodesCreationTime(account)
    const creationArray = creation.split('#')

    const timer = 1639339210
    const earned = BigNumber.from(
      parseInt(`${(parseInt(`${Date.now() / 1000}`) - timer) / 3600}`)
    )

    for (let i = 0; i < possibleMint; i++) {
      yield {
        id: -1,
        name: namesArray[i],
        mint: creationArray[i],
        claim: claimsArray[i],
        reward: earned,
      }
    }
  } catch (error) {}
}

export default getArmies
