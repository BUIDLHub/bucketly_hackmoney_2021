
const {ethers} = require("hardhat");
const {setupAccounts, approveRelay} = require("./utils/accounts");
const {deployBucket, sendDepositRoot} = require("./utils/setupContracts");
const erc20 = require("./utils/erc20");

const { expect, assert} = require("chai");

const generateTree = require("../build/src/merkle/generate");


const MATIC_MAIN = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
const MATIC_WHALE = "0x7758E507850dA48cd47df1fB5F875c23E3340c50";
const MATIC_WHALE2 = "0xde6b13a8f15f973f3F7E6571243481c4Ff38fE15";

//deposit simulation from Polygon to L2Bucket contract
const DEP1 = ethers.utils.parseEther("200000");
const DEP2 = ethers.utils.parseEther("100000");

describe("MerkleTest", function() {
    this.timeout(30000);


    let props = {ethers};
    before(async function() {
        console.log("Setting up accounts...");
        props = await setupAccounts(props);
   
        console.log("Deploying bucket...");
        props = await deployBucket(props);

        console.log("Approving relay...");
        await approveRelay(props);
    });

    it("Should start", async function() {

    })
    
    context("----L2Bucket Merkle Tests----", function() {
        let whale = null;
        let rootHash = null;
        let merkleTree = null;
        before(async function() {
            

            //first, simulate that Polygon transferred funds from somewhere..we'll use the whale's
            //account
            await ethers.provider.send('hardhat_impersonateAccount', [MATIC_WHALE]);
            await ethers.provider.send('hardhat_impersonateAccount', [MATIC_WHALE2]);

            whale = await ethers.provider.getSigner(MATIC_WHALE);
            whale2 = await ethers.provider.getSigner(MATIC_WHALE2);

            console.log("Transferring to", props.l2Bucket.address);

            let txn = await erc20.transfer({
                source: whale,
                dest: props.l2Bucket.address,
                token: MATIC_MAIN, 
                amount: DEP1
            });
            console.log("Waiting for transfer1");
            let r = await txn.wait();
            if(!r.status) {
                throw new Error("Coudl not transfer funds from whale to contract");
            }

            txn = await erc20.transfer({
                source: whale2,
                dest: props.l2Bucket.address,
                token: MATIC_MAIN, 
                amount: DEP2
            });
            console.log("Waiting for transfer2");
            r = await txn.wait();
            if(!r.status) {
                throw new Error("Could not transfer funds from whale to contract");
            }

            console.log("Transfers complete");

            console.log("Generating deposit tree", generateTree);

            let {
                merkleTree: tree,
                merkleRootHex: hash
            } = generateTree.default([
                {
                    address: MATIC_WHALE,
                    amount: DEP1.toString()
                },
                {
                    address: MATIC_WHALE2,
                    amount: DEP2.toString()
                }
            ]);

            merkleTree = tree;
            rootHash = hash;

            console.log("Generated root hash", hash);

            txn = await sendDepositRoot({
                ...props,
                bucketID: 1,
                token: MATIC_MAIN,
                rootHash
            });
            console.log("Waiting on deposit root hash...");
            r = await txn.wait();
            if(!r.status) {
                throw new Error("Deposit root hash failed");
            }
            console.log("Root hash set for bucket");
        });

        it("Should redeem deposit", async function() {

            let proof = merkleTree.getMerkleProof(0);
            let proof2 = merkleTree.getMerkleProof(1);

            console.log("Attempting to redeem deposit", 0, proof);
            let txn = await props.l2Bucket.redeem(1, 0, MATIC_MAIN, MATIC_WHALE, DEP1, proof);
            let r = await txn.wait();
            if(!r.status) {
                throw new Error("Expected first redemption to succeed");
            }

            txn = await props.l2Bucket.redeem(1, 1, MATIC_MAIN, MATIC_WHALE2, DEP2, proof2);
            r = await txn.wait();
            if(!r.status) {
                throw new Error("Expected second redemption to succeed");
            }
            console.log("Last redemption receipt", r);
        })
        
    });
});