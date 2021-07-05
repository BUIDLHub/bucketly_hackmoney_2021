const config = require("../build/src/config/config.js");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const LibAccess = await ethers.getContractFactory("LibAccess");
  LibAccessInstance = await LibAccess.deploy();

  // Deploy Bucket contract
  const BucketERC20 = await ethers.getContractFactory("BucketERC20", {
    libraries: {
        LibAccess: LibAccessInstance.address,
    }
  });

  const depositManagerContract = config.default.web3.DepositManager;
  const bucketL2Address = config.default.web3.bucketL2;
  const BucketERC20Instance = await BucketERC20.deploy(depositManagerContract, bucketL2Address);

  console.log("BucketERC20 deployed to:", BucketERC20Instance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
