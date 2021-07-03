const { expect } = require("chai");

describe("BucketERC20 contract", () => {
  const erc20contract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  let BucketERC20Instance;

  beforeEach(async () => {
    const BucketERC20 = await ethers.getContractFactory("BucketERC20");
    // Reminder: constructor(address _erc20Address, string memory _tokenName, uint _triggerAmount, uint _minimumReserve, uint256 _expirationTime)
    BucketERC20Instance = await BucketERC20.deploy(erc20contract, "DAI", "1000", "100", "300");
  })

  it("Check if contract is deployed properly by calling public value", async () => {
    const erc20Address = await BucketERC20Instance.erc20Address.call();
    expect(await erc20Address).to.equal(erc20contract);
  });

  it("Should emit an event when executing createBucket function", async () => {
    await expect(BucketERC20Instance.createBucket(10000))
    .to.emit(BucketERC20Instance, 'BucketCreated')
  });
  
  it("Should count the number of buckets properly", async () => {
    let bucketCount = await BucketERC20Instance.bucketIdCount.call();
    expect(bucketCount).to.equal(1);

    await BucketERC20Instance.createBucket(10000);
    bucketCount = await BucketERC20Instance.bucketIdCount.call();
    expect(bucketCount).to.equal(2);
  });
  
  it("Should set the active bucket id properly", async () => {
    let activeBucketId = await BucketERC20Instance.activeBucketId.call();
    expect(activeBucketId).to.equal(1);
    
    await BucketERC20Instance.createBucket(10000);
    activeBucketId = await BucketERC20Instance.activeBucketId.call();
    expect(activeBucketId).to.equal(2);
  });

  it("Should set bucket expirationDate properly", async () => {
    const expirationTime = await BucketERC20Instance.expirationTime.call();
    const currentExpirationDate = await BucketERC20Instance.expirationDate.call();
    
    await BucketERC20Instance.createBucket(10000);
    const newExpirationDate = await BucketERC20Instance.expirationDate.call();
    expect(parseInt(newExpirationDate)).to.greaterThan(parseInt(currentExpirationDate));
  });
});
