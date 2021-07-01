const config = require('../build/src/config/config.js');
const bucketFactoryInterface = require('../build/src/contracts/contracts/BucketFactory.sol/BucketFactory.json');

async function main() {
  const [owner] = await ethers.getSigners();
  const BucketFactoryInstance = await new ethers.Contract(config.default.web3.bucketFactory, bucketFactoryInterface.abi, owner);
  await BucketFactoryInstance.createBucket("DAI", 10000);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
