// const config = require("../build/src/config/config.js");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const LibAccess = await ethers.getContractFactory("LibAccess");
  LibAccessInstance = await LibAccess.deploy();

  const LibMerkle = await ethers.getContractFactory("LibMerkle");
  LibMerkleInstance = await LibMerkle.deploy();

  // Deploy Bucket contract
  const L2Bucket = await ethers.getContractFactory("L2Bucket", {
    libraries: {
        LibAccess: LibAccessInstance.address,
        LibMerkle: LibMerkleInstance.address
    }
  });

  const L2BucketInstance = await L2Bucket.deploy();

  console.log("L2BucketInstance deployed to:", L2BucketInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
