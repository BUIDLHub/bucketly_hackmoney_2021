import { useWeb3React } from '@web3-react/core';

const Blob = ({ status }) => {
  return <div className={`blob ${status}`}></div>
}

const NetworkStatus = () => {
  const { active, error } = useWeb3React();

  return (
    <span className="d-inline-flex">
     {active ? <Blob status={'green'} /> :
        error ? <Blob status={'red'} /> :
        <Blob status={'orange'} />
      }
    </span>
  )
}

export default NetworkStatus;
