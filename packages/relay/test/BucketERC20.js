const { expect } = require("chai");
const config = require("../build/src/config/config.js");
const ERC20ABI = require('./abi/ERC20ABI.json');

describe("Test BucketERC20 contract deployment and create bucket function", () => {
  let BucketERC20Instance;
  let DummyERC20Instance;
  let AccInstance;
  let goerliTestERC20 = "0x3f152B63Ec5CA5831061B2DccFb29a874C317502";
  const depositManagerContract = config.default.web3.DepositManager;
  const bucketL2Address = config.default.web3.bucketL2;
  
  beforeEach(async () => {
    // Deploy dummy ERC20 contract 
    const DummyERC20 = await ethers.getContractFactory("DummyERC20");
    DummyERC20Instance = await DummyERC20.deploy("1000000");

    let LibAccess = await ethers.getContractFactory("LibAccess");
    LibAccessInstance = await LibAccess.deploy();

    // Deploy Bucket contract
    const BucketERC20 = await ethers.getContractFactory("BucketERC20", {
      libraries: {
          LibAccess: LibAccessInstance.address,
      }
    });
    BucketERC20Instance = await BucketERC20.deploy(depositManagerContract, bucketL2Address);
  })

  it("Check if contract is deployed properly by calling public value", async () => {
    const depositManagerContractAddress = await BucketERC20Instance.depositManagerContract.call();
    expect(await depositManagerContractAddress).to.equal(depositManagerContract);
  });

  it("Should emit an event when executing createBucket function", async () => {
    await expect(BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1"))
    .to.emit(BucketERC20Instance, 'BucketCreated');
  });
  
  it("Should deposit erc20 properly", async () => {
    // Transfer 1000 tokens to each depositor first
    const depositAmount = 100;
    const [owner, depositor1, depositor2] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "1000");
    await DummyERC20Instance.transfer(depositor2.address, "1000");

    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(DummyERC20Instance.address, depositAmount);
    const bucketBalance = await DummyERC20Instance.balanceOf(BucketERC20Instance.address);
    expect(parseInt(bucketBalance)).to.equal(100);
  });

  it("Should emit Deposit event properly", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "1000");

    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await expect(BucketERC20Instance.connect(depositor1).deposit(DummyERC20Instance.address, depositAmount))
    .to.emit(BucketERC20Instance, 'Deposit');
  });

  it("Should revert if depositor balance is insufficient", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "10");

    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount);
    await expect(BucketERC20Instance.connect(depositor1).deposit(DummyERC20Instance.address, depositAmount)).to.be.revertedWith("Insufficient balance");
  });

  it("Should revert if depositor allowance is insufficient", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "100");

    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, "10");
    await expect(BucketERC20Instance.connect(depositor1).deposit(DummyERC20Instance.address, depositAmount)).to.be.revertedWith("Insufficient allowance");
  });

  it("Should refund erc20 properly", async () => {
    // Transfer 1000 tokens to each depositor first
    const depositAmount = 100;
    const [owner, depositor1, depositor2] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "1000");
    await DummyERC20Instance.transfer(depositor2.address, "1000");

    // Deposit
    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(DummyERC20Instance.address, depositAmount);
    
    // Refund
    await BucketERC20Instance.connect(depositor1).refund(DummyERC20Instance.address);
    const depositorBalance = await DummyERC20Instance.balanceOf(depositor1.address);
    expect(parseInt(depositorBalance)).to.equal(1000);
  });

  it("Should emit Withdraw event properly", async () => {
    // Transfer 1000 tokens to each depositor
    const depositAmount = 100;
    const [owner, depositor1] = await ethers.getSigners();
    await DummyERC20Instance.transfer(depositor1.address, "1000");
    
    // Deposit
    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await DummyERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(DummyERC20Instance.address, depositAmount);
    
    // Refund
    await expect(BucketERC20Instance.connect(depositor1).refund(DummyERC20Instance.address))
    .to.emit(BucketERC20Instance, 'Withdraw');
  });
  
  it("Should revert if depositor hasn't perform any deposit", async () => {
    const [owner, depositor1] = await ethers.getSigners();
    await BucketERC20Instance.createBucket(DummyERC20Instance.address, "300", "1000", "1");
    await expect(BucketERC20Instance.connect(depositor1).refund(DummyERC20Instance.address)).to.be.revertedWith("Msg.sender deposit balance is zero");
  });

  it("Should makeTransfer properly", async () => {
    let goerliTestERC20Instance = new ethers.Contract(goerliTestERC20, ERC20ABI, ethers.provider);

    // Transfer 1000 tokens to each depositor first
    const depositAmount = 1000;
    const [owner, depositor1, depositor2] = await ethers.getSigners();
    console.log("owner.address", owner.address)
    const ownerBalance = await goerliTestERC20Instance.balanceOf(owner.address);
    console.log("ownerBalance", parseInt(ownerBalance))
    await goerliTestERC20Instance.connect(owner).transfer(depositor1.address, "1000");
    await goerliTestERC20Instance.connect(owner).transfer(depositor2.address, "1000");

    // Deposits
    await BucketERC20Instance.createBucket(goerliTestERC20Instance.address, "1", "1000", "1");
    await goerliTestERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(goerliTestERC20Instance.address, depositAmount);
    await goerliTestERC20Instance.connect(depositor2).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor2).deposit(goerliTestERC20Instance.address, depositAmount);
    let bucketBalance = await goerliTestERC20Instance.balanceOf(BucketERC20Instance.address);
    console.log("bucketBalance before transfer", parseInt(bucketBalance));

    // makeTransfer
    await BucketERC20Instance.connect(owner).makeTransfer(goerliTestERC20Instance.address, depositAmount * 2);

    bucketBalance = await goerliTestERC20Instance.balanceOf(BucketERC20Instance.address);
    console.log("bucketBalance after transfer", parseInt(bucketBalance));
    
    expect(parseInt(bucketBalance)).to.equal(depositAmount * 2 / 100);
  });

  it("Should revert if threshold not reached", async () => {
    let goerliTestERC20Instance = new ethers.Contract(goerliTestERC20, ERC20ABI, ethers.provider);

    // Transfer 1000 tokens to each depositor first
    const depositAmount = 1000;
    const [owner, depositor1, depositor2] = await ethers.getSigners();
    await goerliTestERC20Instance.connect(owner).transfer(depositor1.address, "1000");
    await goerliTestERC20Instance.connect(owner).transfer(depositor2.address, "1000");

    // Deposits
    await BucketERC20Instance.createBucket(goerliTestERC20Instance.address, "1000000", "10000", "1");
    await goerliTestERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(goerliTestERC20Instance.address, depositAmount);
    await goerliTestERC20Instance.connect(depositor2).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor2).deposit(goerliTestERC20Instance.address, depositAmount);

    // makeTransfer
    await expect(BucketERC20Instance.connect(owner).makeTransfer(goerliTestERC20Instance.address, depositAmount * 2)).to.be.revertedWith("Threshold amount not reached");
  });

  it("Should makeTransfer if expirationDate is reached", async () => {
    let goerliTestERC20Instance = new ethers.Contract(goerliTestERC20, ERC20ABI, ethers.provider);

    // Transfer 1000 tokens to each depositor first
    const depositAmount = 1000;
    const [owner, depositor1, depositor2] = await ethers.getSigners();
    await goerliTestERC20Instance.connect(owner).transfer(depositor1.address, "1000");
    await goerliTestERC20Instance.connect(owner).transfer(depositor2.address, "1000");

    // Deposits
    await BucketERC20Instance.createBucket(goerliTestERC20Instance.address, "1", "3000", "1");
    await goerliTestERC20Instance.connect(depositor1).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor1).deposit(goerliTestERC20Instance.address, depositAmount);
    await goerliTestERC20Instance.connect(depositor2).approve(BucketERC20Instance.address, depositAmount)
    await BucketERC20Instance.connect(depositor2).deposit(goerliTestERC20Instance.address, depositAmount);

    // makeTransfer
    await BucketERC20Instance.connect(owner).makeTransfer(goerliTestERC20Instance.address, depositAmount * 2);

    bucketBalance = await goerliTestERC20Instance.balanceOf(BucketERC20Instance.address);
    console.log("bucketBalance after transfer", parseInt(bucketBalance));
    
    expect(parseInt(bucketBalance)).to.equal(depositAmount * 2 / 100);
  });
});

1625408717
10000000001625408712