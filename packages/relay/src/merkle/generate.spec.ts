import { ethers } from 'ethers';
import generate, {Balance} from './generate';

const concat = ethers.utils.concat;
const sha3 = ethers.utils.keccak256;
const utf8 = ethers.utils.toUtf8Bytes;

describe("TreeGenerator", function() {
    
    it("Should generate a merkle tree", async function() {
        let balances:Array<Balance> = [ ];
        let amounts = [
            ".02",
            ".035",
            ".0238",
            ".014",
            "3.87"
        ].map(a => ethers.utils.parseEther(a));

        balances = amounts.map(a => {
            return {
                address: ethers.Wallet.createRandom().address,
                amount: a
            }
        });

        let {
            merkleTree,
            merkleRootHex
        } = generate(balances);

        console.log("Root", merkleRootHex);

        let addr = balances[2].address;
        let amt = balances[2].amount.toString();
        let idx = merkleTree.getIndex(addr);
        let test = merkleTree.getAmount(idx);
        if(test !== amt) {
            throw new Error("Amount from tree doesn't match expected amount: " + test + " != " + amt);
        }

        let proof = merkleTree.getMerkleProof(idx);
        //proof = proof.filter(p => typeof p !== 'undefined');
        console.log("Proof", proof);
    })
})