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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = __importDefault(require("../config/config"));
const web3Functions_1 = __importDefault(require("../functions/web3Functions"));
const dbFunctions_1 = __importDefault(require("../functions/dbFunctions"));
const BucketERC20_json_1 = __importDefault(require("../contracts/contracts/BucketERC20.sol/BucketERC20.json"));
const bucketCreationMonitor = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("L1 bucketCreationMonitor started");
    const bucketL1Address = config_1.default.web3.bucketL1;
    const bucketL1Abi = BucketERC20_json_1.default.abi;
    const provider = web3Functions_1.default.getL1Provider();
    const bucketFactoryContract = new ethers_1.ethers.Contract(bucketL1Address, bucketL1Abi, provider);
    // event BucketCreated(address tokenAddress, uint indexed id, uint indexed triggerAmount, uint indexed expirationDate);
    bucketFactoryContract.on("BucketCreated", (tokenAddress, bucketId, triggerAmount, expirationDate) => {
        console.log(`New bucket created ${tokenAddress}, bucket id: ${bucketId}, trigger amount: ${triggerAmount} and expiration date: ${expirationDate}`);
        //save into db
        dbFunctions_1.default.insertNewBucket(tokenAddress, bucketId, expirationDate, triggerAmount);
    });
});
const depositMonitor = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("L1 depositMonitor started");
    const bucketL1Address = config_1.default.web3.bucketL1;
    const bucketL1Abi = BucketERC20_json_1.default.abi;
    const provider = web3Functions_1.default.getL1Provider();
    const bucketFactoryContract = new ethers_1.ethers.Contract(bucketL1Address, bucketL1Abi, provider);
    // event Deposit(address tokenAddress, uint indexed bucketId, uint indexed amount, address indexed depositor);
    bucketFactoryContract.on("Deposit", (tokenAddress, bucketId, amount, depositor) => {
        console.log(`New deposit ${tokenAddress}, bucket id: ${bucketId}, amount: ${amount} and depositor: ${depositor}`);
        //save into db
        dbFunctions_1.default.insertNewDeposit(tokenAddress, bucketId, amount, depositor);
    });
});
const startL1BucketMonitor = () => __awaiter(void 0, void 0, void 0, function* () {
    bucketCreationMonitor();
    depositMonitor();
});
exports.default = {
    startL1BucketMonitor
};
