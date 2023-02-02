import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { useEffect, useState } from 'react';

import { WagmiConfig, createClient, configureChains,  } from 'wagmi'
import { bscTestnet, goerli, polygonMumbai } from 'wagmi/chains'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// 2. Configure wagmi client
const chains = [goerli, polygonMumbai, bscTestnet];
const { provider, webSocketProvider } = configureChains(chains, [walletConnectProvider({ projectId })])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        projectId,
        version: "2"
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
  // connectors: modalConnectors({
  //   appName: 'web3Modal',
  //   chains,
  //   projectId,
  //   version: "2"
  // }),
  // provider
})

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(
  wagmiClient, chains
  )
export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true)
  }, []);

  return ready ? (
    <>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal
        ethereumClient={ethereumClient}
        projectId={projectId}
      />
    </>
  ) : null;
}