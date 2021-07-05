const SERVER = {
  port: process.env.PORT || 8080,
}

const WEB3 = {
  bucketL1: "0xb61675b164351767e5eCDC0Cc1e78E53f7fa5bd0", // Goerli
  bucketL2: "0x33A61dF860C1170C903f5BA1eF979570C962395E", // Mumbai
  testERC20L1: "0x3f152B63Ec5CA5831061B2DccFb29a874C317502", // Goerli
  testERC20L2: "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e", // Mumbai
  RootERC20Contract: "0xeE11713Fe713b2BfF2942452517483654078154D", // Goerli
  DepositManager: "0x7850ec290A2e2F40B82Ed962eaf30591bb5f5C96", // Goerli
  ChildChainContract: "0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e", // Mumbai
  l1HttpProvider: "https://goerli-light.eth.linkpool.io",
  l1WsProvider: "wss://goerli-light.eth.linkpool.io/ws",
  l2HttpProvider: "https://matic-mumbai.chainstacklabs.com",
  l2WsProvider: "wss://ws-matic-mumbai.chainstacklabs.com",
  localProvider: "http://127.0.0.1:8545/"
}

const DB = {
  dbname: "bucketlyMainDB",
  bucketsTableName: "bucketsTable",
  depositsTableName: "depositsTable"
}

const config = {
  server: SERVER,
  web3: WEB3,
  db: DB
}

export default config;