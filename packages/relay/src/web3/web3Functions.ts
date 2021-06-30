import config from '../config/config';
import ethers from 'ethers';

const getL1WsProvider = () => {
  const provider = ethers.getDefaultProvider(config.web3.localProvider)
  return provider;
};

export default {
  getL1WsProvider,
}