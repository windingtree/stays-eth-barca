import type { ReactNode } from 'react';
import { useEffect, useState, useCallback } from 'react';
import type { Breadcrumb } from '../components/Breadcrumbs';
import { useContext } from 'react';
import { Anchor, Box, Text, Button, ResponsiveContext } from 'grommet';
import { useAppState } from '../store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MessageBox } from '../components/MessageBox';
import { getNetwork } from '../config';
import { isMobile, browserName } from 'react-device-detect';
import { utils } from 'ethers';

const { name: allowedNetworkName } = getNetwork();

export interface PageWrapperProps {
  children: ReactNode;
  breadcrumbs?: Breadcrumb[];
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

const { chainId, rpc, name, currency } = getNetwork();

export const PageWrapper = ({ children, breadcrumbs }: PageWrapperProps) => {
  const size = useContext(ResponsiveContext);
  const { isRightNetwork } = useAppState();
  const [isSupported, setIsSupported] = useState(false)
  useEffect(() => {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });

      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(handleEthereum, 3000); // 3 seconds
    }

    function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log('Ethereum successfully detected!');
        // Access the decentralized web!
        setIsSupported(true)
      } else {
        setIsSupported(false)
        console.log('Please install MetaMask!');
      }
    }
  }, [])

  const switchNetwork = useCallback(async () => {
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: utils.hexlify(chainId) }]
        });
      } catch (e) {
        // This error code indicates that the chain has not been added to MetaMask
        if ((e as ProviderRpcError).code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: name,
                chainId: utils.hexlify(chainId),
                nativeCurrency: { name: currency, decimals: 18, symbol: currency },
                rpcUrls: [rpc]
              }
            ]
          });
        }
      }
    }
  }, [])

  return (
    <Box>
      <Box
        margin={{ left: 'auto', right: 'auto', bottom: 'xlarge' }}
        pad={{ horizontal: 'small' }}
        width={{ width: '100%', max: '1090px' }}
      >
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          size={size}
        />
        <MessageBox type='warn' show={!isRightNetwork}>
          <Box gap='small' direction='row' align='center'>
            <Text>You are connected to a wrong network. Please switch to</Text>
            <Button color='black' label={allowedNetworkName} onClick={() => switchNetwork()} />
          </Box>
        </MessageBox>
        <MessageBox type='warn' show={!isSupported && isMobile}>
          Mobile {browserName} does not support web3 apps. Open with <Anchor label='metamask' href={`https://metamask.app.link/dapp/${window.location.href}`} />
        </MessageBox>
        <MessageBox type='warn' show={!isSupported && !isMobile}>
          {browserName} does not support web3 apps. <Anchor label='Check options' href='https://metamask.io' />
        </MessageBox>
        {children}
      </Box>
    </Box>
  );
};
