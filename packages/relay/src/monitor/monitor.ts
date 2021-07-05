import { ethers } from 'ethers';
import config from '../config/config';
import web3Functions from '../functions/web3Functions';
import dbFunctions from '../functions/dbFunctions';
import bucketERC20 from '../contracts/contracts/BucketERC20.sol/BucketERC20.json'

const bucketCreationMonitor = async () => {
  console.log("L1 bucketCreationMonitor started");
  const bucketL1Address = config.web3.bucketL1;
  const bucketL1Abi = bucketERC20.abi;
  const provider = web3Functions.getL1Provider();
  const bucketFactoryContract = new ethers.Contract(
    bucketL1Address,
    bucketL1Abi,
    provider
  );
  // event BucketCreated(address tokenAddress, uint indexed id, uint indexed triggerAmount, uint indexed expirationDate);
  bucketFactoryContract.on("BucketCreated", (tokenAddress: string, bucketId: number, triggerAmount: number, expirationDate: number) => {
    console.log(`New bucket created ${ tokenAddress }, bucket id: ${ bucketId }, trigger amount: ${ triggerAmount } and expiration date: ${ expirationDate}`);
    //save into db
    dbFunctions.insertNewBucket(tokenAddress, bucketId, expirationDate, triggerAmount);
  });
}

const depositMonitor = async () => {
  console.log("L1 depositMonitor started");
  const bucketL1Address = config.web3.bucketL1;
  const bucketL1Abi = bucketERC20.abi;
  const provider = web3Functions.getL1Provider();
  const bucketFactoryContract = new ethers.Contract(
    bucketL1Address,
    bucketL1Abi,
    provider
  );
  // event Deposit(address tokenAddress, uint indexed bucketId, uint indexed amount, address indexed depositor);
  bucketFactoryContract.on("Deposit", (tokenAddress: string, bucketId: number, amount: number, depositor: string) => {
    console.log(`New deposit ${ tokenAddress }, bucket id: ${ bucketId }, amount: ${ amount } and depositor: ${ depositor }`);
    //save into db
    dbFunctions.insertNewDeposit(tokenAddress, bucketId, amount, depositor);
  });
}

const startL1BucketMonitor = async () => {
  bucketCreationMonitor();
  depositMonitor();
}

export default {
  startL1BucketMonitor
}