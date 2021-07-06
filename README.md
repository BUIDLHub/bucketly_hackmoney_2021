# Bucketly
Relay, contracts, and UI repo

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://youtu.be/GBd2VTRmNOk">
    <img src="https://raw.githubusercontent.com/BUIDLHub/bucketly_hackmoney_2021/master/packages/frontend/src/assets/bucketly-github-logo.png" alt="Logo" width="170.55" height="200">
  </a>

  <h3 align="center">Bucketly (Hackmoney 2021)</h3>

  <p align="center">
    In bucketly, a bucketful of txns fire off all at once for cost-optimization. See the <a href="https://github.com/BUIDLHub/bucketly_hackmoney_2021/tree/master/packages/relay/build/src/contracts/contracts">bucket contracts</a> and the <a href="https://github.com/BUIDLHub/bucketly_hackmoney_2021/tree/master/packages/relay/build/src/merkle">dynamic merkle tree generation</a> to see some real bucket magic.
    <br />
    <a href="https://t.me/joinchat/Xd9ripcxvWo1YzZh">Message us on Telegram</a>
    ·
    <a href="https://youtu.be/GBd2VTRmNOk">Watch the demo</a>
    <br />
    <br />
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
<img src="https://raw.githubusercontent.com/BUIDLHub/bucketly_hackmoney_2021/master/packages/frontend/src/assets/new-diagram.png" alt="screenshot" width="650">
</div>

**What we do.** <br/>
Bucketly makes it more cost-effective to bridge assets to L2s, in this case Polygon. It batches L1 txns into a bucket with other txns. They all split the fees for bridging. Doing this helps you save 3 to 5 times as much on fees.

<br/>
<br/>

**Who this helps** <br/>
This is great for cost-optimization in high throughput integrations bridging L1 to L2. For individuals, it can be used for transfers on low cap accounts. And it can also be be used for those pesky small airdrops.

<br/>
<br/>

**How it works** <br/>
You are a depositor who wants to transfer some asset from mainnet to L2s.

1) You submit tokens into a bucket contract on Layer 1. You do this before some threshold has been met, which is basically a deadline for making it into one round of the bucket.
2) An off-chain Relay acts like a train conductor. He's monitoring the L1 contract for those deposit events.
3) This off-chain Relay then records those events in a database.
4) Once the countdown to the deadline is complete, and that reserve amount is reached, the off-chain relay generates a MerkleTree root hash using all the deposits for the current bucket. Basically a receipt of all the txns in the bucket.
5) The relay then initiates a transfer to Polygon by calling the L1 eth bucket contract.
6) The L1 bucket transfers funds to polygon on behalf of the L2 bucket address.
7) The Polygon plasma bridge confirms the transfer after some wait period.
8) You can now use the relay's API to generate a proof that the deposit happened. If you were really into it, you could even generate your own proof using all the deposit events and build your own merkletree.
9) Using that proof, you can withdraw the funds from the L2 bucket.

<br/>
<br/>

<div align="center">
<img src="https://raw.githubusercontent.com/BUIDLHub/bucketly_hackmoney_2021/master/packages/frontend/src/assets/demo.png" alt="screenshot" width="650">
</div>

**How it works** <br/>
We used hardhat for testing, we used Web3 react for the frontend, used NodeJs for the relay development, Solidity for contracts.

* build an off-chain relay
* model out a database
* deploy early contracts to L1 testnet (Goerli) and L2 Polygon
* dynamically generate merkletrees (which was tough)
* create a UI that follows the Bucketly flow


<br/>
<br/>



**With more time we would** <br/>

* Make the layer 1 bucket contract production ready
* Wire up the UI to the relay and the contracts
* Decentralize the relay
* Make fun charts to show the current threshold or progress made on the buttons
* Let you transfer from L2s back to L1
* Have more L2 options accessible
 