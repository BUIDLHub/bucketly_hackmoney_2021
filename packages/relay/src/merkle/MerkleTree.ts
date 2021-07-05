import { BigNumberish, ethers } from "ethers";

const sha3 = ethers.utils.sha256;
const bufferToHex = ethers.utils.hexlify;
const toUTF8 = ethers.utils.toUtf8Bytes;
const concat = ethers.utils.concat;

export default class MerkleTree {
    
    balances: {[key:string]: string};
    _root: string|null;

    constructor(balances:{[key:string]:string}) {
        this.balances = balances;
        this._root = null;
        if(Object.keys(balances).length < 2) {
            throw new Error("MerkleTree and proofs only works with multiple balances");
        }
    }

    get rootHash():string {
        if(this._root) {
            return this._root;
        }
        this._root = computeRootHash(this.balances);
        return this._root;
    }

    getIndex = (address:string) => {
        address = address.toLowerCase();
        var leaves = expandLeaves(this.balances);

        for (var i = 0; i < leaves.length; i++) {
            if (i != leaves[i].index) { throw new Error('huh?'); }
            if (leaves[i].address === address) { return leaves[i].index; }
        }

        throw new Error('address not found');
    }

    getAddress = (index:number) => {
        var leaves = expandLeaves(this.balances);
        return leaves[index].address;
    }

    getAmount = (index:number) => {
        var leaves = expandLeaves(this.balances);
        return leaves[index].balance;
    }

    getMerkleProof = (index:number) => {
        return computeMerkleProof(this.balances, index);
    }
}

function reduceMerkleBranches(leaves:Array<string>) {
    var output = [];

    while (leaves.length) {
        var left = leaves.shift();
        var right = (leaves.length === 0) ? left: leaves.shift();
        if(!right) {
            throw new Error("Could not establish a right node");
        }
        if(!left) {
            throw new Error("Left is undefined"); //sould never happen
        }
        let encoded = ethers.utils.defaultAbiCoder.encode(['bytes32', 'bytes32'], [left, right]);
        output.push(ethers.utils.keccak256(encoded));
    }

    output.forEach(function(leaf) {
        leaves.push(leaf);
    });
}

var t0 = (new Date()).getTime()
function now() {
    return (new Date()).getTime() - t0;
}

function expandLeaves(balances:{[key: string]: string}) {
    var addresses = Object.keys(balances);

    addresses.sort(function(a, b) {
        var al = a.toLowerCase(), bl = b.toLowerCase();
        if (al < bl) { return -1; }
        if (al > bl) { return 1; }
        return 0;
    });

    return addresses.map(function(a, i) { return { address: a, balance: balances[a], index: i }; });
}

// ethers.utils.solidityKeccak256(types, [ leaf.index, leaf.address, leaf.balance ]);
var zeros32 = '0000000000000000000000000000000000000000000000000000000000000000';
function hash(index:number, address:string, balance:string) {
   let encoded = ethers.utils.defaultAbiCoder.encode(['uint256', 'address', 'uint256'], [index, address, balance]);
   return ethers.utils.keccak256(encoded);
}

function getLeaves(balances:{[key: string]:string}) {
    var leaves = expandLeaves(balances);

    return leaves.map(function(leaf) {
        return hash(leaf.index, leaf.address, leaf.balance);
    });
}

function computeRootHash(balances:{[key: string]: string}) {
    var leaves = getLeaves(balances);

    while (leaves.length > 1) {
        reduceMerkleBranches(leaves);
    }

    return leaves[0];
}

function computeMerkleProof(balances:{[key:string]:string}, index:number) {
    var leaves = getLeaves(balances);

    if (index == null) { throw new Error('address not found'); }

    var path = index;
    
    var proof = [ ];
    while (leaves.length > 1) {
        if ((path % 2) == 1) {
            proof.push(leaves[path - 1])
        } else {
            proof.push(leaves[path + 1])
        }

        // Reduce the merkle tree one level
        reduceMerkleBranches(leaves);

        // Move up
        path = parseInt((path / 2).toFixed(10));
    }

    return proof;
}
