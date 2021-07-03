"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MerkleTree_1 = __importDefault(require("./MerkleTree"));
function default_1(balances) {
    let leafs = {};
    balances.forEach(b => {
        leafs[b.address.toLowerCase()] = b.amount.toString();
    });
    let merkleTree = new MerkleTree_1.default(leafs);
    let merkleRootHex = merkleTree.rootHash;
    return {
        merkleTree,
        merkleRootHex
    };
}
exports.default = default_1;
