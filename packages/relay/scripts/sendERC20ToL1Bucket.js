const config = require('../build/src/config/config.js');
const ERC20ABI = require('../test/abi/ERC20ABI.json');

async function main() {
  const [owner] = await ethers.getSigners();

  console.log(
    "Calling contracts with the account:",
    owner.address
  );

  console.log("Account balance:", (await owner.getBalance()).toString());
  const goerliTestERC20Instance = await new ethers.Contract(config.default.web3.testERC20L1, ERC20ABI, owner);
  //function createBucket(address _tokenAddress, uint _expirationTime, uint _thresholdAmount, uint _fee)
  // expirationTime : 86400 s => 24h
  // threshold : 1000 ERC20
  // fee : 1 => 0.01%
  const ownerBalance = await goerliTestERC20Instance.balanceOf(owner.address);
  console.log("ownerBalance", parseInt(ownerBalance))
  await goerliTestERC20Instance.transfer(config.default.web3.bucketL1, ownerBalance);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });