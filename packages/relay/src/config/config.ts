const SERVER = {
  port: process.env.PORT || 8080,
}

const WEB3 = {
  bucketFactory: "0x",
  l1PolygonDeposit: "0x",
  l2PolygonDeposit: "0x",
  l1HttpProvider: "https://goerli-light.eth.linkpool.io",
  l1WsProvider: "wss://goerli-light.eth.linkpool.io/ws",
  l2HttpProvider: "https://matic-mumbai.chainstacklabs.com",
  l2WsProvider: "wss://ws-matic-mumbai.chainstacklabs.com"
}

const config = {
  server: SERVER,
  web3: WEB3
}

export default config;