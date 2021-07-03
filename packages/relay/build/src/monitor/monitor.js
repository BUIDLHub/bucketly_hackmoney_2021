"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const startL1BucketFactoryMonitor = () => __awaiter(void 0, void 0, void 0, function* () {
    /*
    console.log("L1BucketFactoryMonitor started");
    const bucketFactoryAddress = config.web3.bucketFactory;
    const bucketFactoryAbi = bucketERC20.abi;
    const provider = web3Functions.getL1Provider();
    const bucketFactoryContract = new ethers.Contract(
      bucketFactoryAddress,
      bucketFactoryAbi,
      provider
    );
    bucketFactoryContract.on("BucketCreated", (id: number, token: string, triggerAmount: number, expirationDate: number) => {
      console.log(`New bucket created ${ token }, trigger amount: ${ triggerAmount } and expiration date: ${ expirationDate}`);
      //save into db
      dbFunctions.insertNewBucket(id, token, expirationDate, 0, triggerAmount);
    });
    */
});
exports.default = {
    startL1BucketFactoryMonitor
};
