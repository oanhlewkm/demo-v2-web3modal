import { bignumberToNumber, convertToNumber, formatNumber } from '@/utils/format';
import { fetchBalance } from '@wagmi/core'
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const TOKEN_ADDRESS = "0x8318a05Eec6983537429CAB9B474FcF09Df599AF";

const Balance = () => {
  const {address} = useAccount();
  const [mainCoinSymbol, setCoinSymbol] = useState("");
  const [mainCoin, setMaiCoin ] = useState<string | number>("...");
  const [balanceToken, setBalanceToken ] = useState<null | any>(null);

  useEffect(() => {
    const fetchBalanceMainCoin = async () => {
      if (!address) return;
      const balance = await fetchBalance({
        address,
        formatUnits: 'gwei',
      });
      setMaiCoin(convertToNumber(balance.value, balance.decimals));
      setCoinSymbol(balance.symbol);
    }
    if (address) fetchBalanceMainCoin();
  }, [mainCoin, address]);

  useEffect(() => {
    const fetchBalanceToken = async () => {
      if (!address || !TOKEN_ADDRESS) return;
      try {
        const balance = await fetchBalance({
          address,
          token: TOKEN_ADDRESS
        });
        const token = {
          symbol: balance.symbol,
          balance: convertToNumber(balance.value, balance.decimals)
        }
        setBalanceToken(token); 
      } catch (error) {
      }
    }
    if (address) fetchBalanceToken();
  }, [balanceToken, address]);

  return (
    <>
      <h5>Fetch balance</h5>
      <h6>Main coin: {mainCoin} {mainCoinSymbol}</h6>
      <h6>Token: {TOKEN_ADDRESS} </h6>
      {balanceToken &&
        <h6>{formatNumber(balanceToken.balance, balanceToken.symbol, 2)}</h6>
      }
    </>
  )
}

export default Balance;
