const config = require('../build/src/config/config.js');
const BucketERC20Interface = require('../build/src/contracts/contracts/BucketERC20.sol/BucketERC20.json');

async function main() {
  const [owner] = await ethers.getSigners();

  console.log(
    "Calling contracts with the account:",
    owner.address
  );

  console.log("Account balance:", (await owner.getBalance()).toString());
  const BucketERC20Instance = await new ethers.Contract(config.default.web3.bucketL1, BucketERC20Interface.abi, owner);

  await BucketERC20Instance.makeTransfer(config.default.web3.testERC20L1, "100000000000000000");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });