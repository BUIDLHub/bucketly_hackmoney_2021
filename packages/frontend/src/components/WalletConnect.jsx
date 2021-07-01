import { Button } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../util';

const WalletConnect = () => {
  const { activate } = useWeb3React();

  return (
    <Button variant="outline-secondary" className="fw-normal rounded-0"
      onClick={() => activate(injected)}>
      Connect Wallet <img src="/assets/cube.svg" width={"20px"} alt="Cube" />
    </Button>
  );
}

export default WalletConnect;