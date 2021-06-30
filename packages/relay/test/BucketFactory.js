const { expect } = require("chai");

describe("Token contract", function() {
  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const [owner] = await ethers.getSigners();

    const BucketFactory = await ethers.getContractFactory("BucketFactory");

    const BucketFactoryInstance = await BucketFactory.deploy();

    const testedValue = await BucketFactoryInstance.testValue.call();
    expect(await testedValue).to.equal(42);
  });
});
