
const setupAccounts = async (props) => {
    let accounts = await ethers.getSigners();
    
    let owner = accounts[0];
    let ownerAddress = await owner.getAddress();
    let recipient = accounts[1];
    let recipientAddress = await recipient.getAddress();

    let relay = accounts[4];
    let relayAddress = await relay.getAddress();
    
    return {
        ...props,
        ethers,
        accounts,
        owner,
        ownerAddress,
        recipient,
        recipientAddress,
        relay,
        relayAddress
    }
};

const approveRelay = async props => {
    let {relayAddress,owner, l2Bucket}=props;
    console.log("Approving relay", relayAddress);
    await l2Bucket.connect(owner).addRole(l2Bucket.RELAY_ROLE(), relayAddress);
}

module.exports = {
    setupAccounts,
    approveRelay
}