import { Button } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../util';

const WalletConnect = () => {
  const { activate, deactivate, connector } = useWeb3React();
  // const currentConnector = injected
  // const activating = currentConnector === activatingConnector
  // const connected = currentConnector === connector

  return (
    <Button variant="outline-secondary" className="fw-normal rounded-0"
      onClick={() => activate(injected)}>
      Connect Wallet <img src="/assets/cube.svg" width={"20px"} alt="Cube" />
    </Button>
  );
}

export default WalletConnect;