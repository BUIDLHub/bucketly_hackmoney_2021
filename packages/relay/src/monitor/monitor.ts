import { ethers } from 'ethers';
import config from '../config/config';
import web3Functions from '../web3/web3Functions';

const startL1BucketFactoryMonitor = async () => {

  console.log("L1BucketFactoryMonitor started");
  const bucketFactoryAddress = config.web3.bucketFactory;
  const bucketFactoryAbi = [""];
  const provider = web3Functions.getL1WsProvider();
  console.log("Provider", provider);
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