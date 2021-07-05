const config = require('../build/src/config/config.js');
const BucketERC20Interface = require('../build/src/contracts/contracts/BucketERC20.sol/BucketERC20.json');

async function main() {
  const [owner] = await ethers.getSigners();
  const BucketERC20Instance = await new ethers.Contract(config.default.web3.bucketL1, BucketERC20Interface.abi, owner);
  //function createBucket(address _tokenAddress, uint _expirationTime, uint _thresholdAmount, uint _fee)
  // expirationTime : 86400 s => 24h
  // threshold : 1000 ERC20
  // fee : 1 => 0.01%
  await BucketERC20Instance.createBucket(config.default.web3.testERC20L1, "86400", 1000, 1);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
