import BigNumberjs from 'bignumber.js';
import { BigNumber, ethers } from 'ethers';

export const convertToNumber = (value: any, decimals: number) => {
  let amount = new BigNumberjs(`${value}`);
  amount = amount.dividedBy(Math.pow(10, decimals));
  return parseFloat(`${amount}`);
};

export const bignumberMultiplier = (decimals: number) => {
  return BigNumber.from(10).pow(decimals);
};

export const bignumberToNumber = (amount: any, decimals: number) => {
  try {
    const val = BigNumber.from(amount).toNumber();
    return convertToNumber(val, decimals);
  } catch (error) {
    const result = ethers.utils.formatEther(amount);
    return parseFloat(result);
  }
};

export const formatNumber = (value: number, currency: string = "", decimal: number) => {
  if (!decimal && decimal < 0) decimal = 2;
  if (+value === 0) decimal = 0;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: decimal,
  });
  return `${formatter.format(value)}${currency ? ' ' + currency.toUpperCase() : ''}`;
};