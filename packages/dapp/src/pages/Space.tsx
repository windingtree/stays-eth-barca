import { PageWrapper } from './PageWrapper';
import { Box, Text, Image, Carousel, Spinner, Anchor } from 'grommet';
import { useAppState } from '../store';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { BookWithDai } from '../components/buttons/BookWithDai';
import { MessageBox } from '../components/MessageBox';
import { ExternalLink } from '../components/ExternalLink';
//import * as Icons from 'grommet-icons';
import { getNetwork } from '../config';
import { centerEllipsis } from '../utils/strings';
import { useContract } from '../hooks/useContract';
import { NavLink } from 'react-router-dom';
import { utils, BigNumber as BN } from 'ethers';
//import { Header } from './MyTokens';
// import { CustomText, Title } from '../components/StayVoucherQr';
import styled from 'styled-components';
import Logger from '../utils/logger';

// Initialize logger
const logger = Logger('Space');

export const Description = styled(Text)`
  color: #0D0E0F;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-align: start;
`;

export const Contact = styled(Anchor)`
  color: #0D0E0F;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
`;

export const Space: React.FC = () => {
  const {
    account,
    lodgingFacilities,
    searchSpaces,
    // themeMode,
    searchParams,
    provider,
    ipfsNode,
    bootstrapped
  } = useAppState();

  const query = window.location.pathname.substring(7);
  const space = useMemo(() => searchSpaces.find((space) => space.id === query), [searchSpaces, query]);
  const facility = useMemo(() => lodgingFacilities.find((facility) => {
    const space = facility.spaces.find((space => space.contractData.spaceId === query))
    if (space) {
      return true
    }
    return false
  }), [query, lodgingFacilities]);

  const [contract, , errorContract] = useContract(provider, ipfsNode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [tokenId, setTokenId] = useState<string | undefined>();
  const [hash, setHash] = useState('');

  useEffect(() => {
    setError(errorContract);
  }, [errorContract]);

  const hashLink = useMemo(() => {
    const network = getNetwork()
    return hash ? `${network.blockExplorer}/tx/${hash}` : null
  }, [hash])

  const bookHandler = useCallback(
    async () => {
      try {
        setLoading(true)
        if (!contract) {
          throw new Error('Contract is not connected');
        }
        if (searchParams === undefined) {
          throw new Error('searchParams is undefined');
        }
        if (space === undefined) {
          throw new Error('space is undefined');
        }
        if (!account) {
          throw new Error('account is undefined');
        }
        if (!provider) {
          throw new Error('provider is undefined');
        }
        const balance = await provider.getBalance(account)
        const total = BN.from(space.contractData.pricePerNightWei)
          .mul(BN.from(searchParams.numberOfDays));

        // const total = Number(utils.formatUnits(space.contractData.pricePerNightWei, 'ether')) * Number(searchParams.numberOfDays);

        logger.debug('balance', balance.toString());
        logger.debug('price', total.toString());

        if (balance.lt(total)) {
          throw new Error('not enough xDAI')
        }

        setError(undefined);

        const res = await contract.book(
          space.id,
          searchParams.startDay,
          searchParams.numberOfDays,
          searchParams.roomsNumber,
          undefined,
          setHash
        );
        setTokenId(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError((error as Error).message);
      }
    },
    [account, contract, provider, searchParams, space]
  );

  const isLoading = useMemo(() => !!bootstrapped && !!contract, [bootstrapped, contract]);

  const searchQuery = useMemo(() => {
    return new URLSearchParams([
      ['startDay', String(searchParams?.startDay)],
      ['numberOfDays', String(searchParams?.numberOfDays)],
      ['roomsNumber', String(searchParams?.roomsNumber)],
    ])
  }, [searchParams]);

  const numberDays = useMemo(
    () => searchParams?.numberOfDays || 1,
    [searchParams]
  );

  const roomsNumber = useMemo(
    () => searchParams?.roomsNumber || 1,
    [searchParams]
  );

  const getPrice = useCallback(
    (nights: number, roomsNumber: number): string => {
      const perNight = BN.from(space?.contractData.pricePerNightWei ?? 0);
      return utils.formatUnits(
        perNight.mul(BN.from(nights)).mul(BN.from(roomsNumber)),
        'ether'
      );
    },
    [space]
  );

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Search',
          path: `/search?${searchQuery}`
        }
      ]}
    >
      <MessageBox type='info' show={!isLoading}>
        <Box direction='row'>
          <Box>
            The Dapp is synchronizing with the smart contract. Please wait..&nbsp;
          </Box>
          <Spinner />
        </Box>
      </MessageBox>

      <MessageBox type='info' show={!!tokenId}>
        <Box direction='row'>
          <Box>
            Booked successfully!
            <NavLink to={`/tokens?tokenId=${tokenId}`}> Check details </NavLink>
            <NavLink to='https://discord.gg/kZYnMncsg4'> Join our discord</NavLink>
          </Box>
        </Box>
      </MessageBox>

      {isLoading && !space && <Box> No space with given id </Box>}
      {isLoading && !!space && !tokenId &&
        <Box align='center' overflow='hidden'>
          <Image
            height='150'
            width='150'
            style={{ borderRadius: '50%' }}
            src={facility?.media.logo}
          />

          <Text weight={500} size='2rem' margin='small'>
            {facility?.name}
          </Text>
          <Text weight={500} size='1.5rem'>
            {space.name}
          </Text>
          {!!facility &&
              <Box align='center' justify='between' direction='row' style={{ fontSize: '1em' }} margin= 'medium'>
                <Anchor
                  size='small'
                  label={facility.address.streetAddress + ', ' + facility.address.locality}
                  href={'https://www.openstreetmap.org/search?query=' + encodeURI(facility.address.streetAddress + ', ' + facility.address.locality)}
                  target="_blank"
                  style={{ fontSize: '1em', lineHeight: '1.4em', color: 'black' }}
                />
                &nbsp;&nbsp;&nbsp;
                <Anchor
                  size='small'
                  label={facility?.contact?.website ?? ''}
                  href={facility?.contact?.website}
                  title={facility?.name}
                  target="_blank"
                  style={{ fontSize: '1em', lineHeight: '1.4em', color: 'black' }}
                />
                &nbsp;&nbsp;&nbsp;
                <Anchor
                  size='large'
                  label={facility.contact?.email}
                  href={`mailto:${facility.contact?.email}`}
                  title={facility?.name}
                  target="_blank"
                  style={{ fontSize: '1em', lineHeight: '1.4em', color: 'black' }}
                />
                <Anchor
                  size='large'
                  label={facility.contact?.phone}
                  href={`tel:${facility.contact?.phone}`}
                  title={facility?.name}
                  target="_blank"
                  style={{ fontSize: '1em', lineHeight: '1.4em', marginLeft:'0.25rem', color: 'black' }}
                />
              </Box>
          }

          <Box
            fill
            align='center'
            margin={{ bottom: 'large' }}
          >
            <Description>{space.description}</Description>
          </Box>

          <Box fill align='center' margin={{ bottom: 'xlarge' }}>
            <Carousel height='large' width='xxlarge'>
              {space.media.images?.map((space, i) =>
                <Image
                  key={i}
                  width='xlarge'
                  fit="cover"
                  alignSelf='center'
                  src={space.uri}
                />
              )}
            </Carousel>
          </Box>

          <Box fill direction='row' align='center' justify='between'>
            <Text size='xxlarge' weight='bold'>{numberDays} nights, {roomsNumber} room{roomsNumber > 1 ? 's' : ''}</Text>
            <Box align='center' margin='medium'>
              <BookWithDai
                onClick={bookHandler}
                loading={loading}
                disabled={!!tokenId}
                text={'Book for ' + getPrice(numberDays, roomsNumber) + ' xDAI'}
              />

              {hashLink !== null ?
                <ExternalLink href={hashLink} label={centerEllipsis(hash)} />
                : null}
            </Box>
          </Box>

          <Box fill pad={{ top: 'medium' }}>
            <MessageBox type='error' show={!!error}>
              <Box direction='row'>
                <Box>
                  {error}
                </Box>
              </Box>
            </MessageBox>
          </Box>
        </Box>
      }
    </PageWrapper>
  );
};
