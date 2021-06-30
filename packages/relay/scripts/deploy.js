async function main() {
  const BucketFactory = await ethers.getContractFactory("BucketFactory");
  const bucketFactory = await BucketFactory.deploy();

  console.log("BucketFactory deployed to:", bucketFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
