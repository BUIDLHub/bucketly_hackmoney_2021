const { expect } = require("chai");

describe("BucketFactory contract", function() {
  it("Check if contract is deployed properly by calling public value", async function() {
    const [owner] = await ethers.getSigners();

    const BucketFactory = await ethers.getContractFactory("BucketFactory");

    const BucketFactoryInstance = await BucketFactory.deploy();

    const testedValue = await BucketFactoryInstance.testValue.call();
    expect(await testedValue).to.equal(42);
    expect()
  });

  it("Should emit an event when executing createBucket function", async function() {
    const [owner] = await ethers.getSigners();

    const BucketFactory = await ethers.getContractFactory("BucketFactory");

    const BucketFactoryInstance = await BucketFactory.deploy();

    await expect(BucketFactoryInstance.createBucket("DAI", 10000))
    .to.emit(BucketFactoryInstance, 'BucketCreated')
  });
});
