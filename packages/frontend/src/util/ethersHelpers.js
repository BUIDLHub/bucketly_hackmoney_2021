import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'

function getLibrary(provider, connector) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })


export { getLibrary, injected };