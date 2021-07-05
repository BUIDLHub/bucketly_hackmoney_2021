import { useWeb3React } from '@web3-react/core';
import Icon from 'react-identicons';

const Address = () => {
  const { account } = useWeb3React()

  return (
    <span className="d-inline-flex align-items-center px-2 py-1">
      {account && <span className="pr-2"><Icon string={account} size={25} /></span>}
      <span>
        {account === null
          ? '-'
          : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ''}
      </span>
    </span>
  )
}

export default Address;
