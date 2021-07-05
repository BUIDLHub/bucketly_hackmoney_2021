import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

import { addresses } from '../util';
import L1BucketJSON from '../ABI/BucketFactory.json';

export const L1BucketContext = createContext(null);

export const L1BucketProvider = ({ children }) => {
  const [L1Bucket, setL1Bucket] = useState({});
  const [id, setId] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [threshold, setThreshold] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const { account, library } = useWeb3React();
  const { bucketL1 } = addresses;

  // uint totalAmount;
  // uint fee;

  const loadData = useCallback(async () => {
    if (library) {
        const signer = library?.getSigner()

        // L1Bucket
        const L1Bucket = new ethers.Contract(bucketL1, L1BucketJSON.abi, signer);
        setL1Bucket(L1Bucket);

        // const id = await L1Bucket.idCounter();
        // setId(id.toString());

        // const expTime = await L1Bucket.expirationTime();
        // setExpiryTime(expTime.toString());

        // const expDate = await L1Bucket.expirationDate();
        // setExpiryDate(expDate.toString());

        // const thresh = await L1Bucket.thresholdAmount();
        // setThreshold(thresh.toString());

        // const totAmount = await L1Bucket.totalAmount();
        // setTotalAmount(formatEther(totalAmount.toString()));
    }
}, [bucketL1, library])

useEffect(() => {
    loadData()
}, [account, loadData])


  return (
    // <L1BucketContext.Provider value={{ L1Bucket, id, expiryTime, expiryDate, threshold, totalAmount }}>
    <L1BucketContext.Provider value={{ L1Bucket }}>
      {children}
    </L1BucketContext.Provider>
  )
}

export const useL1Bucket = () => useContext(L1BucketContext);