"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const sha3 = ethers_1.ethers.utils.sha256;
const bufferToHex = ethers_1.ethers.utils.hexlify;
const toUTF8 = ethers_1.ethers.utils.toUtf8Bytes;
const concat = ethers_1.ethers.utils.concat;
class MerkleTree {
    constructor(balances) {
        this.getIndex = (address) => {
            address = address.toLowerCase();
            var leaves = expandLeaves(this.balances);
            for (var i = 0; i < leaves.length; i++) {
                if (i != leaves[i].index) {
                    throw new Error('huh?');
                }
                if (leaves[i].address === address) {
                    return leaves[i].index;
                }
            }
            throw new Error('address not found');
        };
        this.getAddress = (index) => {
            var leaves = expandLeaves(this.balances);
            return leaves[index].address;
        };
        this.getAmount = (index) => {
            var leaves = expandLeaves(this.balances);
            return leaves[index].balance;
        };
        this.getMerkleProof = (index) => {
            return computeMerkleProof(this.balances, index);
        };
        this.balances = balances;
        this._root = null;
        if (Object.keys(balances).length < 2) {
            throw new Error("MerkleTree and proofs only works with multiple balances");
        }
    }
    get rootHash() {
        if (this._root) {
            return this._root;
        }
        this._root = computeRootHash(this.balances);
        return this._root;
    }
}
exports.default = MerkleTree;
function reduceMerkleBranches(leaves) {
    var output = [];
    while (leaves.length) {
        var left = leaves.shift();
        var right = (leaves.length === 0) ? left : leaves.shift();
        if (!right) {
            throw new Error("Could not establish a right node");
        }
        if (!left) {
            throw new Error("Left is undefined"); //sould never happen
        }
        let encoded = ethers_1.ethers.utils.defaultAbiCoder.encode(['bytes32', 'bytes32'], [left, right]);
        output.push(ethers_1.ethers.utils.keccak256(encoded));
    }
    output.forEach(function (leaf) {
        leaves.push(leaf);
    });
}
var t0 = (new Date()).getTime();
function now() {
    return (new Date()).getTime() - t0;
}
function expandLeaves(balances) {
    var addresses = Object.keys(balances);
    addresses.sort(function (a, b) {
        var al = a.toLowerCase(), bl = b.toLowerCase();
        if (al < bl) {
            return -1;
        }
        if (al > bl) {
            return 1;
        }
        return 0;
    });
    return addresses.map(function (a, i) { return { address: a, balance: balances[a], index: i }; });
}
// ethers.utils.solidityKeccak256(types, [ leaf.index, leaf.address, leaf.balance ]);
var zeros32 = '0000000000000000000000000000000000000000000000000000000000000000';
function hash(index, address, balance) {
    let encoded = ethers_1.ethers.utils.defaultAbiCoder.encode(['uint256', 'address', 'uint256'], [index, address, balance]);
    return ethers_1.ethers.utils.keccak256(encoded);
}
function getLeaves(balances) {
    var leaves = expandLeaves(balances);
    return leaves.map(function (leaf) {
        return hash(leaf.index, leaf.address, leaf.balance);
    });
}
function computeRootHash(balances) {
    var leaves = getLeaves(balances);
    while (leaves.length > 1) {
        reduceMerkleBranches(leaves);
    }
    return leaves[0];
}
function computeMerkleProof(balances, index) {
    var leaves = getLeaves(balances);
    if (index == null) {
        throw new Error('address not found');
    }
    var path = index;
    var proof = [];
    while (leaves.length > 1) {
        if ((path % 2) == 1) {
            proof.push(leaves[path - 1]);
        }
        else {
            proof.push(leaves[path + 1]);
        }
        // Reduce the merkle tree one level
        reduceMerkleBranches(leaves);
        // Move up
        path = parseInt((path / 2).toFixed(10));
    }
    return proof;
}
