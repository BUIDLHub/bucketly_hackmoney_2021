const { expect } = require("chai");
const config = require("../build/src/config/config.js");

describe("Test BucketERC20 contract deployment and create bucket function", () => {
  let BucketERC20Instance;
  let DummyERC20Instance;
  const depositManagerContract = config.default.web3.DepositManager;
  
  beforeEach(async () => {
    // Deploy dummy ERC20 contract 
    const DummyERC20 = await ethers.getContractFactory("DummyERC20");
    DummyERC20Instance = await DummyERC20.deploy("1000000");

    // Deploy Bucket contract
    const BucketERC20 = await ethers.getContractFactory("BucketERC20");
    BucketERC20Instance = await BucketERC20.deploy(depositManagerContract, DummyERC20Instance.address, "DMY", "1000", "100", "300");
  })

  it("Check if contract is deployed properly by calling public value", async () => {
    const erc20Address = await BucketERC20Instance.erc20Address.call();
    expect(await erc20Address).to.equal(DummyERC20Instance.address);
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
    const currentExpirationDate = await BucketERC20Instance.expirationDate.call();
    
    await BucketERC20Instance.createBucket(10000);
    const newExpirationDate = await BucketERC20Instance.expirationDate.call();
    expect(parseInt(newExpirationDate)).to.greaterThan(parseInt(currentExpirationDate));
  });

  it("Should set bucket expirationDate properly", async () => {
    const currentExpirationDate = await BucketERC20Instance.expirationDate.call();
    
    await BucketERC20Instance.createBucket(10000);
    const newExpirationDate = await BucketERC20Instance.expirationDate.call();
    expect(parseInt(newExpirationDate)).to.greaterThan(parseInt(currentExpirationDate));
  });
  
  it("Should deposit erc20 properly", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1, depositor2] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "1000");
    await DummyERC20Instance.transfer(depositor2.address, "1000");

    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(depositAmount);
    const bucketBalance = await DummyERC20Instance.balanceOf(BucketERC20Instance.address);
    expect(parseInt(bucketBalance)).to.equal(100);
  });

  it("Should emit Deposit event properly", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "1000");

    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await expect(BucketERC20Instance.connect(depositor1).deposit(depositAmount))
    .to.emit(BucketERC20Instance, 'Deposit');
  });

  it("Should revert if depositor balance is insufficient", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "10");

    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount);
    await expect(BucketERC20Instance.connect(depositor1).deposit(depositAmount)).to.be.revertedWith("Insufficient balance");
  });

  it("Should revert if depositor allowance is insufficient", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "100");

    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, "10");
    await expect(BucketERC20Instance.connect(depositor1).deposit(depositAmount)).to.be.revertedWith("Insufficient allowance");
  });
});