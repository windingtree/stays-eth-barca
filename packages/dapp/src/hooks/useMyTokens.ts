import type { providers } from 'ethers';
import type { StayToken } from 'stays-core';
import type { Web3StorageApi } from '@windingtree/ipfs-apis';
import { useState, useCallback, useEffect } from 'react';
import { useContract } from './useContract';
import Logger from '../utils/logger';

// Initialize logger
const logger = Logger('useMyTokens');

export type UseMyTokensHook = [
  tokens: StayToken[],
  loading: boolean,
  error?: string
];

export type UseGetTokenHook = [
  token: StayToken | undefined,
  facilityOwner: string | undefined,
  loading: boolean,
  error: string | undefined,
  refresh: Function
];

export const useMyTokens = (
  provider?: providers.JsonRpcProvider,
  ipfsNode?: Web3StorageApi,
  account?: string
): UseMyTokensHook => {
  const [contract,, contractError] = useContract(provider, ipfsNode);
  const [tokens, setTokens] = useState<StayToken[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const loadTokens = useCallback(
    async (owner) => {
      if (!contract || !owner) {
        return;
      }
      try {
        setError(undefined);
        setLoading(true);
        logger.debug('Start loading tokens');

        const tokensIds = await contract.getTokensOfOwner(owner);
        logger.debug('tokensIds', tokensIds);

        const tokensOfOwner = await Promise.all(
          tokensIds.map(
            tokenId => contract.getToken(tokenId)
          )
        );
        setTokens(tokensOfOwner);
        logger.debug('tokensOfOwner', tokensOfOwner);

        setLoading(false);
      } catch (err) {
        logger.error(err);
        const message = (err as Error).message || 'Unknown useMyTokens error';
        setError(message);
        setLoading(false);
      }
    },
    [contract]
  );

  useEffect(
    () => {
      setError(contractError);
    },
    [contractError]
  );

  useEffect(
    () => {
      loadTokens(account);
      return () => setTokens([]);
    },
    [loadTokens, account]
  );

  return [tokens, loading, error];
};

export const useGetToken = (
  provider?: providers.JsonRpcProvider,
  ipfsNode?: Web3StorageApi,
  tokenId?: string,
  isProviderWithAddress = true
): UseGetTokenHook => {
  const [contract,, contractError] = useContract(provider, ipfsNode, isProviderWithAddress);
  const [token, setToken] = useState<StayToken | undefined>();
  const [facilityOwner, setFacilityOwner] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getToken = useCallback(
    async (id: string | undefined) => {
      if (!contract || !id) {
        setToken(undefined);
        // setToken({
        //   tokenId: '1',
        //   owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        //   tokenUri: '',
        //   data: {
        //     name: 'Stays #1',
        //     description: 'Stay at lodging facility',
        //     image: 'https://bafybeigg7mwwpnnm6mmk3twxc4arizoyc6ijnaye3pdciwcohheo7xi7hm.ipfs.dweb.link/token-image.png',
        //     external_url: 'https://localhost:3000/space/0xC742BE735817045D0344EFB3770EACD7FE22863EE6BF1B062351235ADEE2277F',
        //     attributes: [
        //       {
        //         trait_type: 'facilityId',
        //         value: '0x75663CE0EB08ACE9FD7FFB90BCC405E494180FA0E2734A50E78E81FA67CF316B'
        //       },
        //       {
        //         trait_type: 'spaceId',
        //         value: '0xC742BE735817045D0344EFB3770EACD7FE22863EE6BF1B062351235ADEE2277F'
        //       },
        //       {
        //         trait_type: 'startDay',
        //         value: '1'
        //       },
        //       {
        //         trait_type: 'numberOfDays',
        //         value: '1'
        //       },
        //       {
        //         trait_type: 'quantity',
        //         value: '1'
        //       }
        //     ]
        //   }
        // });
        return;
      }
      try {
        setError(undefined);
        setLoading(true);

        const token = await contract.getToken(id);
        setToken(token);

        const facilityIdAttribute = token.data.attributes?.find(
          attribute => attribute.trait_type === 'facilityId'
        );

        if (!facilityIdAttribute) {
          throw new Error(
            'Unable to find facilityId in the Stay token metadata'
          );
        }

        const facility = await contract.getLodgingFacility(
          facilityIdAttribute.value
        );

        if (!facility) {
          throw new Error(
            `Unable to the lodging facility by Id: ${facilityIdAttribute.value}`
          );
        }

        setFacilityOwner(facility.contractData.owner);

        setLoading(false);
      } catch (err) {
        logger.error(err);
        const message = `Unable to get token #${id}`;
        setError(message);
        setLoading(false);
      }
    },
    [contract]
  );

  const refresh = useCallback(
    () => getToken(tokenId),
    [getToken, tokenId]
  );

  useEffect(
    () => {
      setError(contractError);
    },
    [contractError]
  );

  useEffect(
    () => {
      getToken(tokenId);
      return () => setToken(undefined);
    },
    [getToken, tokenId]
  );

  return [token, facilityOwner, loading, error, refresh];
};
