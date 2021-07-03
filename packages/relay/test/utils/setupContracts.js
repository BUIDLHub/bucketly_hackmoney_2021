
const deploy = require('../../src/utils/deployUtils'); 


const deployBucket = async function(props) {
    console.log("---- Deploying L2Bucket ----");
    props = await deploy.setupL2Bucket(props);
    let {deployCosts} = props;
    console.log("Total deploy costs", deployCosts.toString());
    return props;
}

const sendDepositRoot = async function(props) {
    console.log("Sending deposit root");
    let {
        owner,
        bucketID,
        token,
        rootHash,
        l2Bucket
    } = props;
    return l2Bucket.connect(owner).addDepositMerkleRoot(bucketID, token, rootHash);
}

module.exports = {
    deployBucket,
    sendDepositRoot
}