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
const generate_1 = __importDefault(require("./generate"));
const concat = ethers_1.ethers.utils.concat;
const sha3 = ethers_1.ethers.utils.keccak256;
const utf8 = ethers_1.ethers.utils.toUtf8Bytes;
describe("TreeGenerator", function () {
    it("Should generate a merkle tree", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let balances = [];
            let amounts = [
                ".02",
                ".035",
                ".0238",
                ".014",
                "3.87"
            ].map(a => ethers_1.ethers.utils.parseEther(a));
            balances = amounts.map(a => {
                return {
                    address: ethers_1.ethers.Wallet.createRandom().address,
                    amount: a
                };
            });
            let { merkleTree, merkleRootHex } = generate_1.default(balances);
            console.log("Root", merkleRootHex);
            let addr = balances[2].address;
            let amt = balances[2].amount.toString();
            let idx = merkleTree.getIndex(addr);
            let test = merkleTree.getAmount(idx);
            if (test !== amt) {
                throw new Error("Amount from tree doesn't match expected amount: " + test + " != " + amt);
            }
            let proof = merkleTree.getMerkleProof(idx);
            //proof = proof.filter(p => typeof p !== 'undefined');
            console.log("Proof", proof);
        });
    });
});
