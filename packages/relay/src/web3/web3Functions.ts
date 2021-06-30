import config from '../config/config';
import ethers from 'ethers';

const getL1WsProvider = () => {
  const provider = new ethers.providers.WebSocketProvider(config.web3.l1WsProvider, 5);
  return provider;
};

export default {
  getL1WsProvider,
}