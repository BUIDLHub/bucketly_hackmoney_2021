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
const startL1BucketFactoryMonitor = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("L1BucketFactoryMonitor started");
    const bucketFactoryAddress = config_1.default.web3.bucketFactory;
    const bucketFactoryAbi = BucketERC20_json_1.default.abi;
    const provider = web3Functions_1.default.getL1Provider();
    const bucketFactoryContract = new ethers_1.ethers.Contract(bucketFactoryAddress, bucketFactoryAbi, provider);
    bucketFactoryContract.on("BucketCreated", (id, token, triggerAmount, expirationDate) => {
        console.log(`New bucket created ${token}, trigger amount: ${triggerAmount} and expiration date: ${expirationDate}`);
        //save into db
        dbFunctions_1.default.insertNewBucket(id, token, expirationDate, 0, triggerAmount);
    });
});
exports.default = {
    startL1BucketFactoryMonitor
};
