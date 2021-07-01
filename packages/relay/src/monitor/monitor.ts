import { ethers } from 'ethers';
import config from '../config/config';
import web3Functions from '../functions/web3Functions';
import bucketFactoryInterface from '../contracts/contracts/BucketFactory.sol/BucketFactory.json'

const startL1BucketFactoryMonitor = async () => {

  console.log("L1BucketFactoryMonitor started");
  const bucketFactoryAddress = config.web3.bucketFactory;
  const bucketFactoryAbi = bucketFactoryInterface.abi;
  const provider = web3Functions.getL1Provider();
  const bucketFactoryContract = new ethers.Contract(
    bucketFactoryAddress,
    bucketFactoryAbi,
    provider
  );
  bucketFactoryContract.on("BucketCreated", (token, triggerAmount, expirationDate) => {
    console.log(`New bucket created ${ token }, trigger amount: ${ triggerAmount } and expiration date: ${ expirationDate}`);
    //save into db
  });
}

export default {
  startL1BucketFactoryMonitor
}