import { BigNumberish } from "ethers";
import MerkleTree from './MerkleTree';

export interface Balance {
    address: string;
    amount: BigNumberish;
}


export default function(balances:Array<Balance>) {

    let leafs: {[key:string]:string} = {};
    balances.forEach(b => {
        leafs[b.address.toLowerCase()] = b.amount.toString();
    });

    let merkleTree = new MerkleTree(leafs);
    let merkleRootHex = merkleTree.rootHash;
    return {
        merkleTree,
        merkleRootHex
    }
}