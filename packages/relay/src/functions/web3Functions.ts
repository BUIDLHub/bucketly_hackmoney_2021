import config from '../config/config';
import { ethers } from 'ethers';

let provider:ethers.providers.Provider|undefined = undefined;

const getL1Provider = ():ethers.providers.Provider => {
  if(provider) {
    return provider; //cached
  }
  provider = new ethers.providers.JsonRpcProvider(config.web3.localProvider);
  return provider;
};

export default {
  getL1Provider,
}