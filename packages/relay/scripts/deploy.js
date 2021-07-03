async function main() {
  const BucketERC20 = await ethers.getContractFactory("BucketERC20");
  const BucketERC20Instance = await BucketERC20.deploy();

  console.log("BucketERC20 deployed to:", BucketERC20Instance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
