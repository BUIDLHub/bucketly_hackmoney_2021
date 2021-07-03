
const dotenv = require('dotenv');
dotenv.config();

require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/contracts"
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },
  networks: {
    hardhat: {
      gas: 3000000,
      gasLimit: 600000,
      blockGasLimit: 12000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
      }
    }
  }
};